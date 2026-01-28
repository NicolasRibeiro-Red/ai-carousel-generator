// ==========================================
// OpenAI Service Layer
// ==========================================

import OpenAI from 'openai';
import { parseJsonResponse } from '@/lib/openai/client';
import { logger } from '@/lib/logger';
import { OPENAI } from '@/lib/constants';
import {
  HOOKS_SYSTEM_PROMPT,
  buildHooksUserPrompt,
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
// OpenAI Client Factory
// ==========================================

function createOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  return new OpenAI({ apiKey });
}

function getModel(): string {
  return (process.env.OPENAI_MODEL || OPENAI.DEFAULT_MODEL).trim();
}

// ==========================================
// Hooks Response Parser
// ==========================================

interface AIHooksResponse {
  hooks: HookStructured[];
}

function parseHooksResponse(content: string): { hooks: string[]; hooksDetailed: HookStructured[] } {
  const parsed = parseJsonResponse<AIHooksResponse | string[]>(content);

  // New format: { hooks: [{ texto, tipo, forca, componentes }] }
  if (parsed && typeof parsed === 'object' && 'hooks' in parsed && Array.isArray(parsed.hooks)) {
    const hooksDetailed = parsed.hooks as HookStructured[];
    const hooks = hooksDetailed.map(h => h.texto);
    return { hooks, hooksDetailed };
  }

  // Legacy format: ["hook1", "hook2", ...]
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

// ==========================================
// Service Functions
// ==========================================

/**
 * Generate hooks using OpenAI
 */
export async function generateHooks(params: GenerateHooksParams): Promise<GenerateHooksResult> {
  const { ideia, objetivo, tom } = params;

  const openai = createOpenAIClient();
  const model = getModel();

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: HOOKS_SYSTEM_PROMPT },
      { role: 'user', content: buildHooksUserPrompt(ideia, objetivo, tom) },
    ],
    max_tokens: OPENAI.HOOKS_MAX_TOKENS,
    temperature: OPENAI.HOOKS_TEMPERATURE,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in OpenAI response');
  }

  const { hooks, hooksDetailed } = parseHooksResponse(content);

  if (!Array.isArray(hooks) || hooks.length < 3) {
    throw new Error('Invalid hooks response: less than 3 hooks');
  }

  return {
    hooks: hooks.slice(0, 5),
    hooksDetailed: hooksDetailed.slice(0, 5),
    tokensUsed: {
      input: completion.usage?.prompt_tokens || 0,
      output: completion.usage?.completion_tokens || 0,
    },
  };
}

/**
 * Generate carousel slides using OpenAI
 */
export async function generateCarousel(params: GenerateCarouselParams): Promise<GenerateCarouselResult> {
  const { hookEscolhido, ideiaOriginal, objetivo, tom, emojis, slidesCount, autoSlides } = params;

  const openai = createOpenAIClient();
  const model = getModel();

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: CAROUSEL_SYSTEM_PROMPT },
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
    max_tokens: OPENAI.CAROUSEL_MAX_TOKENS,
    temperature: OPENAI.CAROUSEL_TEMPERATURE,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in OpenAI response');
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
    if (words.length > 35) {
      return {
        ...slide,
        texto: words.slice(0, 30).join(' ') + '...',
      };
    }
    return slide;
  });

  return {
    slides,
    tokensUsed: {
      input: completion.usage?.prompt_tokens || 0,
      output: completion.usage?.completion_tokens || 0,
    },
  };
}
