import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { parseJsonResponse } from '@/lib/openai/client';

// Force dynamic to ensure env vars are available at runtime
export const dynamic = 'force-dynamic';
import {
  HOOKS_SYSTEM_PROMPT,
  buildHooksUserPrompt,
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
    // Get session from Supabase
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Nao autenticado', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = generateHooksSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message || 'Dados invalidos',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    const { ideia, objetivo, tom } = validation.data;

    // Create OpenAI client at runtime to ensure env vars are available
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY?.trim(),
    });
    const model = (process.env.OPENAI_MODEL || 'gpt-4o').trim();

    // Generate hooks with OpenAI
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: HOOKS_SYSTEM_PROMPT },
        { role: 'user', content: buildHooksUserPrompt(ideia, objetivo, tom) },
      ],
      max_tokens: 800,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Erro ao gerar hooks. Tente novamente.', code: 'GENERATION_ERROR' },
        { status: 500 }
      );
    }

    // Parse JSON response
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
        { error: 'Resposta invalida da IA. Tente novamente.', code: 'INVALID_RESPONSE' },
        { status: 500 }
      );
    }

    // Return hooks
    return NextResponse.json({
      hooks: hooks.slice(0, 5),
      hooksDetailed: hooksDetailed.slice(0, 5),
      timestamp: new Date().toISOString(),
      tokens_used: {
        input: completion.usage?.prompt_tokens || 0,
        output: completion.usage?.completion_tokens || 0,
      },
    });
  } catch (error) {
    console.error('Generate hooks error:', error);

    // Return detailed error in development/for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';

    console.error('Error details:', { message: errorMessage, stack: errorStack });

    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Limite de requisicoes da IA atingido. Aguarde 1 minuto.', code: 'API_RATE_LIMIT' },
          { status: 429 }
        );
      }

      // Return more specific error for debugging
      if (error.message.includes('OPENAI_API_KEY')) {
        return NextResponse.json(
          { error: 'Erro de configuracao da API OpenAI', code: 'CONFIG_ERROR', details: errorMessage },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor', code: 'INTERNAL_ERROR', details: errorMessage },
      { status: 500 }
    );
  }
}
