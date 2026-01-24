import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { openai, DEFAULT_MODEL, parseJsonResponse } from '@/lib/openai/client';
import {
  HOOKS_SYSTEM_PROMPT,
  buildHooksUserPrompt,
  extractHookTexts,
  type HooksResponse,
  type HookStructured,
} from '@/lib/openai/prompts/hooks';
import { generateHooksSchema } from '@/lib/validations/schemas';

// Interface para resposta estruturada da IA
interface AIHooksResponse {
  hooks: HookStructured[];
}

// Função para parsear resposta (suporta formato antigo e novo)
function parseHooksResponse(content: string): { hooks: string[]; hooksDetailed: HookStructured[] } {
  const parsed = parseJsonResponse<AIHooksResponse | string[]>(content);

  // Formato novo: { hooks: [{ texto, tipo, forca, componentes }] }
  if (parsed && typeof parsed === 'object' && 'hooks' in parsed && Array.isArray(parsed.hooks)) {
    const hooksDetailed = parsed.hooks as HookStructured[];
    const hooks = hooksDetailed.map(h => h.texto);
    return { hooks, hooksDetailed };
  }

  // Formato antigo: ["hook1", "hook2", ...]
  if (Array.isArray(parsed)) {
    const hooks = parsed as string[];
    const hooksDetailed = hooks.map((texto, i) => ({
      texto,
      tipo: 'declaracao' as const,
      forca: i < 2 ? 'alta' as const : 'media' as const,
      componentes: [],
    }));
    return { hooks, hooksDetailed };
  }

  throw new Error('Invalid hooks response format');
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autenticado', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = generateHooksSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message || 'Dados inválidos',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    const { ideia, objetivo, tom } = validation.data;

    // Check rate limit (10 hooks per hour)
    const { data: rateLimit } = await supabase.rpc('get_rate_limit_count', {
      p_user_id: user.id,
      p_resource: 'hooks',
    });

    const hookLimit = parseInt(process.env.RATE_LIMIT_HOOKS_PER_HOUR || '10');
    if (rateLimit && rateLimit >= hookLimit) {
      return NextResponse.json(
        {
          error: `Limite de ${hookLimit} gerações por hora atingido. Tente novamente em breve.`,
          code: 'RATE_LIMIT_EXCEEDED',
        },
        { status: 429 }
      );
    }

    // Generate hooks with OpenAI
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: HOOKS_SYSTEM_PROMPT },
        { role: 'user', content: buildHooksUserPrompt(ideia, objetivo, tom) },
      ],
      max_tokens: 800, // Aumentado para suportar formato estruturado
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Erro ao gerar hooks. Tente novamente.', code: 'GENERATION_ERROR' },
        { status: 500 }
      );
    }

    // Parse JSON response (suporta formato novo e antigo)
    let hooks: string[];
    let hooksDetailed: HookStructured[];
    try {
      const result = parseHooksResponse(content);
      hooks = result.hooks;
      hooksDetailed = result.hooksDetailed;
    } catch (parseError) {
      console.error('Failed to parse hooks response:', content);
      return NextResponse.json(
        { error: 'Erro ao processar resposta da IA. Tente novamente.', code: 'PARSE_ERROR' },
        { status: 500 }
      );
    }

    // Validate hooks array
    if (!Array.isArray(hooks) || hooks.length < 3) {
      return NextResponse.json(
        { error: 'Resposta inválida da IA. Tente novamente.', code: 'INVALID_RESPONSE' },
        { status: 500 }
      );
    }

    // Increment rate limit
    await supabase.rpc('increment_rate_limit', {
      p_user_id: user.id,
      p_resource: 'hooks',
    });

    // Return hooks (mantém compatibilidade + adiciona metadados)
    return NextResponse.json({
      hooks: hooks.slice(0, 5), // Array de strings para compatibilidade
      hooksDetailed: hooksDetailed.slice(0, 5), // Array com metadados completos
      timestamp: new Date().toISOString(),
      tokens_used: {
        input: completion.usage?.prompt_tokens || 0,
        output: completion.usage?.completion_tokens || 0,
      },
    });
  } catch (error) {
    console.error('Generate hooks error:', error);

    // Handle OpenAI specific errors
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Limite de requisições da IA atingido. Aguarde 1 minuto.', code: 'API_RATE_LIMIT' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
