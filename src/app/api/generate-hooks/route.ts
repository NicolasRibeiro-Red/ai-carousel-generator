import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, AuthError } from '@/lib/supabase/auth';
import { generateHooks } from '@/lib/services';
import { generateHooksSchema } from '@/lib/validations/schemas';
import { logger } from '@/lib/logger';
import { ERROR_CODES, ERROR_MESSAGES } from '@/lib/constants';

// Force dynamic to ensure env vars are available at runtime
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  logger.apiRequest('/api/generate-hooks', 'POST');

  try {
    // Authenticate user
    const user = await requireAuth();

    // Parse and validate request body
    const body = await request.json();
    const validation = generateHooksSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message || ERROR_MESSAGES.INVALID_INPUT,
          code: ERROR_CODES.INVALID_INPUT,
        },
        { status: 400 }
      );
    }

    const { ideia, objetivo, tom } = validation.data;

    // Generate hooks using service
    const result = await generateHooks({ ideia, objetivo, tom });

    logger.apiResponse('/api/generate-hooks', 200, Date.now() - startTime);

    return NextResponse.json({
      hooks: result.hooks,
      hooksDetailed: result.hooksDetailed,
      timestamp: new Date().toISOString(),
      tokens_used: result.tokensUsed,
    });
  } catch (error) {
    logger.apiError('/api/generate-hooks', error as Error);

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

    // Handle config error
    if (errorMessage.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { error: 'Erro de configuração da API OpenAI', code: ERROR_CODES.CONFIG_ERROR, details: errorMessage },
        { status: 500 }
      );
    }

    // Handle parse/validation errors from service
    if (errorMessage.includes('Invalid hooks') || errorMessage.includes('parse')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.PARSE_ERROR, code: ERROR_CODES.PARSE_ERROR },
        { status: 500 }
      );
    }

    // Handle no content error
    if (errorMessage.includes('No content')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.GENERATION_ERROR_HOOKS, code: ERROR_CODES.GENERATION_ERROR },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR, code: ERROR_CODES.INTERNAL_ERROR, details: errorMessage },
      { status: 500 }
    );
  }
}
