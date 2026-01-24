import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { openai, DEFAULT_MODEL, parseJsonResponse } from '@/lib/openai/client';
import { CAROUSEL_SYSTEM_PROMPT, buildCarouselUserPrompt } from '@/lib/openai/prompts/carousel';
import { generateCarouselSchema } from '@/lib/validations/schemas';
import type { Slide } from '@/types';

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
    const validation = generateCarouselSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message || 'Dados inválidos',
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      );
    }

    const { hook_escolhido, ideia_original, config } = validation.data;

    // Get user data for rate limit check
    const { data: userData } = await supabase
      .from('users')
      .select('role, daily_carousel_limit')
      .eq('id', user.id)
      .single();

    // Check rate limit (carousels per day)
    const { data: rateLimit } = await supabase.rpc('get_rate_limit_count', {
      p_user_id: user.id,
      p_resource: 'carousels',
    });

    const defaultLimit = parseInt(process.env.RATE_LIMIT_CAROUSELS_PER_DAY || '5');
    const mentorLimit = parseInt(process.env.RATE_LIMIT_MENTOR_CAROUSELS_PER_DAY || '20');
    const carouselLimit = userData?.daily_carousel_limit ||
      (userData?.role === 'mentor' ? mentorLimit : defaultLimit);

    if (rateLimit && rateLimit >= carouselLimit) {
      return NextResponse.json(
        {
          error: `Você atingiu o limite de ${carouselLimit} carrosséis hoje. Recarrega amanhã às 00:00.`,
          code: 'RATE_LIMIT_EXCEEDED',
          current_count: rateLimit,
          limit: carouselLimit,
        },
        { status: 429 }
      );
    }

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
        { error: 'Resposta inválida da IA. Tente novamente.', code: 'INVALID_RESPONSE' },
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

    // Save carousel to database
    const carouselConfig = {
      ...config,
      theme: 'dark' as const,
    };

    const { data: carousel, error: insertError } = await supabase
      .from('carousels')
      .insert({
        user_id: user.id,
        original_idea: ideia_original,
        selected_hook: hook_escolhido,
        slides: slides,
        config: carouselConfig,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to save carousel:', insertError);
      // Continue anyway - user can still download
    }

    // Increment rate limit
    await supabase.rpc('increment_rate_limit', {
      p_user_id: user.id,
      p_resource: 'carousels',
    });

    // Return carousel data
    return NextResponse.json({
      carousel_id: carousel?.id || 'temp-' + Date.now(),
      slides,
      config: carouselConfig,
      created_at: carousel?.created_at || new Date().toISOString(),
      tokens_used: {
        input: completion.usage?.prompt_tokens || 0,
        output: completion.usage?.completion_tokens || 0,
      },
    });
  } catch (error) {
    console.error('Generate carousel error:', error);

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
