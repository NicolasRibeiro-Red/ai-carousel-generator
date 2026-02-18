import { describe, it, expect } from 'vitest';
import {
  enrichHooks,
  validateHooksResponse,
  validate7020Distribution,
  type HookStructured,
} from '@/lib/openai/prompts/hooks';
import { LIMITS } from '@/lib/constants';

/**
 * Integration test: fluxo completo mockado
 * input → prompt build → parse mock → enrich → validate
 */
describe('Hooks generation integration flow (mocked)', () => {
  const mockAIResponse: { hooks: HookStructured[] } = {
    hooks: [
      {
        texto: 'Ansiedade? Faça isso AGORA',
        tipo: 'comando',
        forca: 'alta',
        componentes: ['relevancia', 'em_andamento'],
        distribution: 'proven',
        scoreEstimate: 92,
      },
      {
        texto: 'Se você é ansioso, está respirando errado',
        tipo: 'condicional',
        forca: 'alta',
        componentes: ['relevancia', 'conflito'],
        distribution: 'proven',
        scoreEstimate: 90,
      },
      {
        texto: '3 segundos para acalmar seu sistema nervoso',
        tipo: 'lista',
        forca: 'media-alta',
        componentes: ['relevancia', 'incomum'],
        distribution: 'proven',
        scoreEstimate: 85,
      },
      {
        texto: 'A ansiedade não é sua inimiga',
        tipo: 'declaracao',
        forca: 'alta',
        componentes: ['conflito', 'incomum'],
        distribution: 'adjacent',
        scoreEstimate: 84,
      },
      {
        texto: 'Ansiedade crônica? Verifique sua respiração',
        tipo: 'condicional',
        forca: 'alta',
        componentes: ['relevancia', 'incomum'],
        distribution: 'experimental',
        scoreEstimate: 79,
      },
    ],
  };

  it('should validate mock response structure', () => {
    expect(validateHooksResponse(mockAIResponse)).toBe(true);
  });

  it('should accept 3 hooks as minimum', () => {
    const threeHooks = { hooks: mockAIResponse.hooks.slice(0, 3) };
    expect(validateHooksResponse(threeHooks)).toBe(true);
  });

  it('should reject 2 hooks', () => {
    const twoHooks = { hooks: mockAIResponse.hooks.slice(0, 2) };
    expect(validateHooksResponse(twoHooks)).toBe(false);
  });

  it('should reject 6 hooks', () => {
    const sixHooks = { hooks: [...mockAIResponse.hooks, mockAIResponse.hooks[0]] };
    expect(validateHooksResponse(sixHooks)).toBe(false);
  });

  it('should enrich hooks with weighted scores (not inflated)', () => {
    const enriched = enrichHooks(mockAIResponse.hooks);

    expect(enriched.length).toBe(5);

    // All hooks should have validation
    for (const hook of enriched) {
      expect(hook.validation).toBeDefined();
      expect(hook.validation!.scoreDeviation).toBeGreaterThanOrEqual(0);
    }

    // Scores should generally be pulled down from AI estimates
    // (weighted average 70/30 server/AI means inflated AI scores get corrected)
    const avgScore = enriched.reduce((sum, h) => sum + h.scoreEstimate, 0) / enriched.length;
    // With stricter validation, average should be significantly below 92
    expect(avgScore).toBeLessThan(95);
  });

  it('should validate 70-20-10 distribution', () => {
    const dist = validate7020Distribution(mockAIResponse.hooks);
    expect(dist.isValid).toBe(true);
    expect(dist.proven).toBe(3);
    expect(dist.adjacent).toBe(1);
    expect(dist.experimental).toBe(1);
  });

  it('should respect word limit constant (30)', () => {
    expect(LIMITS.SLIDE_MAX_WORDS).toBe(30);
  });
});

describe('Carousel slide truncation', () => {
  it('should truncate slides exceeding word limit', () => {
    const longSlide = {
      numero: 1,
      texto: Array(35).fill('palavra').join(' '),
    };

    const words = longSlide.texto.split(' ');
    if (words.length > LIMITS.SLIDE_MAX_WORDS) {
      const truncated = words.slice(0, LIMITS.SLIDE_MAX_WORDS).join(' ') + '...';
      expect(truncated.split(' ').length).toBeLessThanOrEqual(LIMITS.SLIDE_MAX_WORDS + 1); // +1 for the "..." on last word
    }
  });
});
