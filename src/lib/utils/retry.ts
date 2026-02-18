// ==========================================
// RETRY UTILITY - Generic retry with backoff
// ==========================================

import { logger } from '@/lib/logger';

export interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  temperatureReduction?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

export interface RetryContext {
  attempt: number;
  temperatureAdjustment: number;
}

/**
 * Wraps an async function with retry logic.
 * Uses linear backoff and optional temperature reduction per retry.
 */
export async function withRetry<T>(
  fn: (ctx: RetryContext) => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 2,
    baseDelayMs = 1000,
    temperatureReduction = 0.15,
    onRetry,
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const ctx: RetryContext = {
        attempt,
        temperatureAdjustment: (attempt - 1) * temperatureReduction,
      };
      return await fn(ctx);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxAttempts) {
        const delay = baseDelayMs * attempt;
        logger.warn(`Retry attempt ${attempt}/${maxAttempts}`, {
          error: lastError.message,
          nextDelayMs: delay,
        });

        if (onRetry) {
          onRetry(attempt, lastError);
        }

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}
