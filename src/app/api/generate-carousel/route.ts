import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { openai, DEFAULT_MODEL, parseJsonResponse } from '@/lib/openai/client';
import { CAROUSEL_SYSTEM_PROMPT, buildCarouselUserPrompt } from '@/lib/openai/prompts/carousel';
import { generateCarouselSchema } from '@/lib/validations/schemas';
import type { Slide } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Get session from cookie
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Nao autenticado', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = generateCarouselSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message || 'Dados invalidos',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    const { hook_escolhido, ideia_original, config } = validation.data;

    // Generate carousel with OpenAI
    const autoSlides = config.auto_slides ?? true;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: CAROUSEL_SYSTEM_PROMPT },
        {
          role: 'user',
          content: buildCarouselUserPrompt(
            hook_escolhido,
            ideia_original,
            config.objetivo,
            config.tom,
            config.emojis,
            config.slides_count,
            autoSlides
          )
        },
      ],
      max_tokens: 2500,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'Erro ao gerar carrossel. Tente novamente.', code: 'GENERATION_ERROR' },
        { status: 500 }
      );
    }

    // Parse JSON response
    let slides: Slide[];
    try {
      slides = parseJsonResponse<Slide[]>(content);
    } catch (parseError) {
      console.error('Failed to parse carousel response:', content);
      return NextResponse.json(
        { error: 'Erro ao processar resposta da IA. Tente novamente.', code: 'PARSE_ERROR' },
        { status: 500 }
      );
    }

    // Validate slides array
    if (!Array.isArray(slides) || slides.length < 5) {
      return NextResponse.json(
        { error: 'Resposta invalida da IA. Tente novamente.', code: 'INVALID_RESPONSE' },
        { status: 500 }
      );
    }

    // Truncate slides that exceed word limit
    slides = slides.map((slide) => {
      const words = slide.texto.split(' ');
      if (words.length > 35) {
        return {
          ...slide,
          texto: words.slice(0, 30).join(' ') + '...',
        };
      }
      return slide;
    });

    const carouselConfig = {
      ...config,
      theme: 'dark' as const,
    };

    // Return carousel data
    return NextResponse.json({
      carousel_id: 'carousel-' + Date.now(),
      slides,
      config: carouselConfig,
      created_at: new Date().toISOString(),
      tokens_used: {
        input: completion.usage?.prompt_tokens || 0,
        output: completion.usage?.completion_tokens || 0,
      },
    });
  } catch (error) {
    console.error('Generate carousel error:', error);

    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Limite de requisicoes da IA atingido. Aguarde 1 minuto.', code: 'API_RATE_LIMIT' },
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
