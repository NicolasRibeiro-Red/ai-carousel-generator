// ==========================================
// AI Service Layer (Anthropic Claude)
// ==========================================

import Anthropic from '@anthropic-ai/sdk';
import { parseJsonResponse } from '@/lib/openai/client';
import { logger } from '@/lib/logger';
import { AI_CONFIG, LIMITS } from '@/lib/constants';
import { withRetry } from '@/lib/utils/retry';
import {
  HOOKS_SYSTEM_PROMPT,
  buildHooksUserPrompt,
  enrichHooks,
  type HookStructured,
} from '@/lib/openai/prompts/hooks';
import {
  CAROUSEL_SYSTEM_PROMPT,
  buildCarouselUserPrompt,
} from '@/lib/openai/prompts/carousel';
import type { Slide, CarouselConfig } from '@/types';

// ==========================================
// Types
// ==========================================

export interface GenerateHooksParams {
  ideia: string;
  objetivo: CarouselConfig['objetivo'];
  tom: CarouselConfig['tom'];
}

export interface GenerateHooksResult {
  hooks: string[];
  hooksDetailed: HookStructured[];
  legacyFormat?: boolean;
  tokensUsed: {
    input: number;
    output: number;
  };
}

export interface GenerateCarouselParams {
  hookEscolhido: string;
  ideiaOriginal: string;
  objetivo: CarouselConfig['objetivo'];
  tom: CarouselConfig['tom'];
  emojis: CarouselConfig['emojis'];
  slidesCount: number;
  autoSlides: boolean;
}

export interface GenerateCarouselResult {
  slides: Slide[];
  tokensUsed: {
    input: number;
    output: number;
  };
}

// ==========================================
// Anthropic Client Factory
// ==========================================

function createAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }
  return new Anthropic({ apiKey });
}

function getModel(): string {
  return (process.env.AI_MODEL || AI_CONFIG.DEFAULT_MODEL).trim();
}

// ==========================================
// Hooks Response Parser
// ==========================================

interface AIHooksResponse {
  hooks: HookStructured[];
}

interface ParsedHooksResult {
  hooks: string[];
  hooksDetailed: HookStructured[];
  legacyFormat: boolean;
}

function parseHooksResponse(content: string): ParsedHooksResult {
  const parsed = parseJsonResponse<AIHooksResponse | string[]>(content);

  // New format: { hooks: [{ texto, tipo, forca, componentes }] }
  if (parsed && typeof parsed === 'object' && 'hooks' in parsed && Array.isArray(parsed.hooks)) {
    const hooksDetailed = parsed.hooks as HookStructured[];
    const hooks = hooksDetailed.map(h => h.texto);
    return { hooks, hooksDetailed, legacyFormat: false };
  }

  // Legacy format: ["hook1", "hook2", ...]
  if (Array.isArray(parsed)) {
    logger.warn('Legacy hooks format detected — scores set to 0, enrichment will calculate');
    const hooks = parsed as string[];
    const hooksDetailed: HookStructured[] = hooks.map((texto) => ({
      texto,
      tipo: 'declaracao' as const,
      forca: 'media' as const,
      componentes: [],
      distribution: 'proven' as const,
      scoreEstimate: 0,
    }));
    return { hooks, hooksDetailed, legacyFormat: true };
  }

  throw new Error('Invalid hooks response format');
}

// ==========================================
// Language Check
// ==========================================

const PT_BR_INDICATOR_WORDS = [
  'que', 'de', 'para', 'com', 'não', 'uma', 'seu', 'sua',
  'como', 'isso', 'você', 'por', 'mais', 'esse', 'essa',
];

/**
 * Soft check: returns true if ≥15% of words are PT-BR indicators.
 */
export function isLikelyPortuguese(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/);
  if (words.length === 0) return false;
  const ptCount = words.filter(w => PT_BR_INDICATOR_WORDS.includes(w)).length;
  return (ptCount / words.length) >= 0.15;
}

// ==========================================
// Service Functions
// ==========================================

/**
 * Generate hooks using Anthropic Claude (with retry)
 */
export async function generateHooks(params: GenerateHooksParams): Promise<GenerateHooksResult> {
  const { ideia, objetivo, tom } = params;

  return withRetry(
    async (ctx) => {
      const client = createAnthropicClient();
      const model = getModel();
      const temperature = Math.max(0.1, AI_CONFIG.HOOKS_TEMPERATURE - ctx.temperatureAdjustment);

      const response = await client.messages.create({
        model,
        max_tokens: AI_CONFIG.HOOKS_MAX_TOKENS,
        temperature,
        system: HOOKS_SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: buildHooksUserPrompt(ideia, objetivo, tom) },
        ],
      });

      const textBlock = response.content.find(block => block.type === 'text');
      const content = textBlock?.text;
      if (!content) {
        throw new Error('No content in AI response');
      }

      const { hooks, hooksDetailed, legacyFormat } = parseHooksResponse(content);

      // Validate hook count: min 3, max 5
      if (!Array.isArray(hooks) || hooks.length < 3 || hooks.length > 5) {
        throw new Error(`Invalid hooks count: ${hooks?.length ?? 0} (expected 3-5)`);
      }

      const enrichedHooks = enrichHooks(hooksDetailed.slice(0, 5));

      // Soft language warning
      const allTexts = enrichedHooks.map(h => h.texto).join(' ');
      if (!isLikelyPortuguese(allTexts)) {
        logger.warn('Generated hooks may not be in PT-BR', {
          sample: enrichedHooks[0]?.texto,
        });
      }

      return {
        hooks: enrichedHooks.map(h => h.texto),
        hooksDetailed: enrichedHooks,
        ...(legacyFormat ? { legacyFormat: true } : {}),
        tokensUsed: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
        },
      };
    },
    {
      maxAttempts: 2,
      baseDelayMs: 1000,
      temperatureReduction: 0.15,
    }
  );
}

/**
 * Generate carousel slides using Anthropic Claude (with retry)
 */
export async function generateCarousel(params: GenerateCarouselParams): Promise<GenerateCarouselResult> {
  const { hookEscolhido, ideiaOriginal, objetivo, tom, emojis, slidesCount, autoSlides } = params;

  return withRetry(
    async (ctx) => {
      const client = createAnthropicClient();
      const model = getModel();
      const temperature = Math.max(0.1, AI_CONFIG.CAROUSEL_TEMPERATURE - ctx.temperatureAdjustment);

      const response = await client.messages.create({
        model,
        max_tokens: AI_CONFIG.CAROUSEL_MAX_TOKENS,
        temperature,
        system: CAROUSEL_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: buildCarouselUserPrompt(
              hookEscolhido,
              ideiaOriginal,
              objetivo,
              tom,
              emojis,
              slidesCount,
              autoSlides
            ),
          },
        ],
      });

      const textBlock = response.content.find(block => block.type === 'text');
      const content = textBlock?.text;
      if (!content) {
        throw new Error('No content in AI response');
      }

      let slides: Slide[];
      try {
        slides = parseJsonResponse<Slide[]>(content);
      } catch (parseError) {
        logger.error('Failed to parse carousel response', { content }, parseError as Error);
        throw new Error('Failed to parse carousel response');
      }

      if (!Array.isArray(slides) || slides.length < 5) {
        throw new Error('Invalid carousel response: less than 5 slides');
      }

      // Truncate slides that exceed word limit
      slides = slides.map((slide) => {
        const words = slide.texto.split(' ');
        if (words.length > LIMITS.SLIDE_MAX_WORDS) {
          return {
            ...slide,
            texto: words.slice(0, LIMITS.SLIDE_MAX_WORDS).join(' ') + '...',
          };
        }
        return slide;
      });

      return {
        slides,
        tokensUsed: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
        },
      };
    },
    {
      maxAttempts: 2,
      baseDelayMs: 1000,
      temperatureReduction: 0.15,
    }
  );
}
