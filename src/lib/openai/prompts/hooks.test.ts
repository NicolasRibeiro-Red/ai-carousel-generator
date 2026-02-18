import { describe, it, expect } from 'vitest';
import {
  validateHook,
  enrichHooks,
  validate7020Distribution,
  type HookStructured,
} from './hooks';
import { detectTheme, detectThemeMulti } from './knowledge-base/hormozi-hooks';

// ==========================================
// Helper: create a mock HookStructured
// ==========================================

function makeHook(overrides: Partial<HookStructured> = {}): HookStructured {
  return {
    texto: 'Ansiedade? Faça isso AGORA',
    tipo: 'comando',
    forca: 'alta',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreEstimate: 92,
    ...overrides,
  };
}

// ==========================================
// validateHook
// ==========================================

describe('validateHook', () => {
  it('should detect callout on condicional type', () => {
    const hook = makeHook({ tipo: 'condicional', texto: 'Se você é ansioso, está respirando errado' });
    const result = validateHook(hook);
    expect(result.hasCallOut).toBe(true);
  });

  it('should detect callout on rotulo type', () => {
    const hook = makeHook({ tipo: 'rotulo', texto: 'Ansiosos, tenho um presente pra vocês' });
    const result = validateHook(hook);
    expect(result.hasCallOut).toBe(true);
  });

  it('should NOT auto-pass callout just because of generic "voce"', () => {
    const hook = makeHook({
      tipo: 'declaracao',
      texto: 'Você respira ERRADO a vida toda',
    });
    const result = validateHook(hook);
    // "Você" alone is not enough — it's a declaracao, not a callout type
    expect(result.hasCallOut).toBe(false);
  });

  it('should detect value promise with transformation words', () => {
    const hook = makeHook({ texto: '3 segundos para mudar seu sistema nervoso' });
    const result = validateHook(hook);
    expect(result.hasValuePromise).toBe(true);
  });

  it('should detect value promise with numbers + time units', () => {
    const hook = makeHook({ texto: '60 segundos para sair do modo pânico' });
    const result = validateHook(hook);
    expect(result.hasValuePromise).toBe(true);
  });

  it('should NOT auto-pass value promise just because of type', () => {
    // A "declaracao" with no value-promise keywords should fail
    const hook = makeHook({
      tipo: 'declaracao',
      texto: 'CO2 não é seu inimigo',
    });
    const result = validateHook(hook);
    expect(result.hasValuePromise).toBe(false);
  });

  it('should count words correctly', () => {
    const hook = makeHook({ texto: 'uma dois tres quatro cinco' });
    const result = validateHook(hook);
    expect(result.wordCount).toBe(5);
  });

  it('should validate viral components', () => {
    const hook = makeHook({ componentes: ['relevancia'] });
    const result = validateHook(hook);
    expect(result.hasViralComponents).toBe(false);
  });

  it('should have scoreDeviation of 0 (populated later by enrichHooks)', () => {
    const hook = makeHook();
    const result = validateHook(hook);
    expect(result.scoreDeviation).toBe(0);
  });
});

// ==========================================
// enrichHooks — score inflation fix
// ==========================================

describe('enrichHooks', () => {
  it('should use weighted average instead of Math.max', () => {
    // AI gives inflated score of 95, server calculates lower
    const hook = makeHook({
      texto: 'CO2 não é seu inimigo',
      tipo: 'declaracao',
      componentes: ['conflito'],
      scoreEstimate: 95,
    });

    const [enriched] = enrichHooks([hook]);

    // Server score for this hook is low (no callout, 1 component)
    // Weighted avg should be < 95 (the AI inflated score)
    expect(enriched.scoreEstimate).toBeLessThan(95);
  });

  it('should calculate scoreDeviation', () => {
    const hook = makeHook({ scoreEstimate: 95 });
    const [enriched] = enrichHooks([hook]);
    expect(enriched.validation!.scoreDeviation).toBeGreaterThanOrEqual(0);
  });

  it('should produce realistic scores (not all 90+)', () => {
    const hooks: HookStructured[] = [
      makeHook({ texto: 'dica genérica de respiração', tipo: 'declaracao', componentes: ['relevancia'], scoreEstimate: 92 }),
      makeHook({ texto: 'outra dica qualquer', tipo: 'pergunta_aberta', componentes: [], scoreEstimate: 88 }),
      makeHook({ texto: 'Se ansioso, respire', tipo: 'condicional', componentes: ['relevancia', 'conflito'], scoreEstimate: 90 }),
    ];

    const enriched = enrichHooks(hooks);
    const avgScore = enriched.reduce((sum, h) => sum + h.scoreEstimate, 0) / enriched.length;

    // Average should be pulled down from 90 by server scoring
    expect(avgScore).toBeLessThan(90);
  });
});

// ==========================================
// validate7020Distribution
// ==========================================

describe('validate7020Distribution', () => {
  it('should validate correct 70-20-10 distribution with total=5', () => {
    const hooks: HookStructured[] = [
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'adjacent' }),
      makeHook({ distribution: 'experimental' }),
    ];

    const result = validate7020Distribution(hooks);
    expect(result.isValid).toBe(true);
    expect(result.proven).toBe(3);
    expect(result.adjacent).toBe(1);
    expect(result.experimental).toBe(1);
  });

  it('should reject distribution with no adjacent', () => {
    const hooks: HookStructured[] = [
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'proven' }),
      makeHook({ distribution: 'experimental' }),
    ];

    const result = validate7020Distribution(hooks);
    expect(result.isValid).toBe(false);
  });
});

// ==========================================
// detectTheme
// ==========================================

describe('detectTheme', () => {
  it('should return string for single theme', () => {
    const result = detectTheme('técnica para reduzir ansiedade');
    expect(typeof result).toBe('string');
    expect(result).toBe('ansiedade');
  });

  it('should return geral when no theme matches', () => {
    const result = detectTheme('algo completamente diferente');
    expect(result).toBe('geral');
  });
});

// ==========================================
// detectThemeMulti
// ==========================================

describe('detectThemeMulti', () => {
  it('should detect single theme', () => {
    const result = detectThemeMulti('técnica para reduzir ansiedade');
    expect(result.primary).toBe('ansiedade');
    expect(result.secondary).toEqual([]);
    expect(result.all).toEqual(['ansiedade']);
  });

  it('should detect multiple themes', () => {
    const result = detectThemeMulti('ansiedade e sono com respiração nasal');
    expect(result.primary).toBe('ansiedade');
    expect(result.secondary.length).toBeGreaterThan(0);
    expect(result.all.length).toBeGreaterThan(1);
  });

  it('should return geral when no theme matches', () => {
    const result = detectThemeMulti('algo completamente diferente');
    expect(result.primary).toBe('geral');
    expect(result.secondary).toEqual([]);
    expect(result.all).toEqual(['geral']);
  });
});
