import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, AuthError } from '@/lib/supabase/auth';
import { generateCarousel, saveCarousel } from '@/lib/services';
import { getReferencesForCarousel } from '@/lib/services/references.service';
import { generateCarouselSchema } from '@/lib/validations/schemas';
import { logger } from '@/lib/logger';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

// Force dynamic to ensure env vars are available at runtime
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  logger.apiRequest('/api/generate-carousel', 'POST');

  try {
    // Authenticate user
    const user = await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validation = generateCarouselSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message || ERROR_MESSAGES.INVALID_INPUT,
          code: ERROR_CODES.INVALID_INPUT,
        },
        { status: 400 }
      );
    }

    const { hook_escolhido, ideia_original, config } = validation.data;
    const autoSlides = config.auto_slides ?? true;

    // Generate carousel using service
    const result = await generateCarousel({
      hookEscolhido: hook_escolhido,
      ideiaOriginal: ideia_original,
      objetivo: config.objetivo,
      tom: config.tom,
      emojis: config.emojis,
      slidesCount: config.slides_count,
      autoSlides,
    });

    const carouselConfig = {
      ...config,
      theme: 'dark' as const,
    };

    // Get scientific references based on content
    const scientificReferences = getReferencesForCarousel(
      result.slides,
      hook_escolhido,
      ideia_original,
      3 // Limit to 3 references
    );

    // Save carousel to database
    const saved = await saveCarousel({
      userId: user.id,
      originalIdea: ideia_original,
      selectedHook: hook_escolhido,
      slides: result.slides,
      config: carouselConfig,
    });

    logger.apiResponse('/api/generate-carousel', 200, Date.now() - startTime);
    logger.info('Carousel generated and saved', {
      carouselId: saved.carouselId,
      userId: user.id,
      slidesCount: result.slides.length,
      referencesCount: scientificReferences.length,
    });

    return NextResponse.json({
      carousel_id: saved.carouselId,
      slides: result.slides,
      config: carouselConfig,
      created_at: saved.createdAt,
      tokens_used: result.tokensUsed,
      scientific_references: scientificReferences.length > 0 ? scientificReferences : undefined,
    });
  } catch (error) {
    logger.apiError('/api/generate-carousel', error as Error);

    // Handle auth error
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED, code: ERROR_CODES.UNAUTHORIZED },
        { status: 401 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Handle rate limit
    if (errorMessage.includes('rate limit')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMIT, code: ERROR_CODES.API_RATE_LIMIT },
        { status: 429 }
      );
    }

    // Handle parse/validation errors from service
    if (errorMessage.includes('Invalid carousel') || errorMessage.includes('parse')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.PARSE_ERROR, code: ERROR_CODES.PARSE_ERROR },
        { status: 500 }
      );
    }

    // Handle no content error
    if (errorMessage.includes('No content')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.GENERATION_ERROR_CAROUSEL, code: ERROR_CODES.GENERATION_ERROR },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR, code: ERROR_CODES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
}
