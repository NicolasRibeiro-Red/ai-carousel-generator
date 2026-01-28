import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';
import { parseJsonResponse } from '@/lib/openai/client';
import { CAROUSEL_SYSTEM_PROMPT, buildCarouselUserPrompt } from '@/lib/openai/prompts/carousel';
import { generateCarouselSchema } from '@/lib/validations/schemas';
import { logger } from '@/lib/logger';
import { createAdminClient } from '@/lib/supabase/server';
import type { Slide } from '@/types';

// Force dynamic to ensure env vars are available at runtime
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  logger.apiRequest('/api/generate-carousel', 'POST');

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

    // Create OpenAI client at runtime to ensure env vars are available
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY?.trim(),
    });
    const model = (process.env.OPENAI_MODEL || 'gpt-4o').trim();

    // Generate carousel with OpenAI
    const autoSlides = config.auto_slides ?? true;

    const completion = await openai.chat.completions.create({
      model,
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
      logger.error('Failed to parse carousel response', { content }, parseError as Error);
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

    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

    // Save carousel to Supabase
    const adminClient = createAdminClient();
    const { data: savedCarousel, error: saveError } = await adminClient
      .from('carousels')
      .insert({
        user_id: user.id,
        original_idea: ideia_original,
        selected_hook: hook_escolhido,
        slides,
        config: carouselConfig,
        download_count: 0,
        created_at: createdAt,
        expires_at: expiresAt,
      })
      .select('id')
      .single();

    if (saveError) {
      logger.error('Failed to save carousel to Supabase', { error: saveError.message });
      // Continue anyway - don't fail the request just because we couldn't save
    }

    const carouselId = savedCarousel?.id || `carousel-${Date.now()}`;

    logger.apiResponse('/api/generate-carousel', 200, Date.now() - startTime);
    logger.info('Carousel generated and saved', { carouselId, userId: user.id, slidesCount: slides.length });

    // Return carousel data
    return NextResponse.json({
      carousel_id: carouselId,
      slides,
      config: carouselConfig,
      created_at: createdAt,
      tokens_used: {
        input: completion.usage?.prompt_tokens || 0,
        output: completion.usage?.completion_tokens || 0,
      },
    });
  } catch (error) {
    logger.apiError('/api/generate-carousel', error as Error);

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
