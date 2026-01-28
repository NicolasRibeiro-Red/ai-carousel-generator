import { describe, it, expect } from 'vitest';
import {
  ideaSchema,
  usernameSchema,
  generateHooksSchema,
  generateCarouselSchema,
  slideSchema,
} from './schemas';

describe('ideaSchema', () => {
  it('should accept valid ideas (min 10 chars)', () => {
    const result = ideaSchema.safeParse('Uma ideia muito boa para carousel');
    expect(result.success).toBe(true);
  });

  it('should reject ideas with less than 10 characters', () => {
    const result = ideaSchema.safeParse('Curto');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('mínimo 10');
    }
  });

  it('should reject ideas with more than 500 characters', () => {
    const longIdea = 'a'.repeat(501);
    const result = ideaSchema.safeParse(longIdea);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('máximo 500');
    }
  });
});

describe('usernameSchema', () => {
  it('should accept valid usernames', () => {
    const result = usernameSchema.safeParse('usuario123');
    expect(result.success).toBe(true);
    expect(result.data).toBe('@usuario123');
  });

  it('should add @ prefix if not present', () => {
    const result = usernameSchema.safeParse('joao_silva');
    expect(result.success).toBe(true);
    expect(result.data).toBe('@joao_silva');
  });

  it('should reject @ in username (added automatically)', () => {
    // The schema adds @ automatically, so users should not include it
    const result = usernameSchema.safeParse('@joao');
    expect(result.success).toBe(false);
  });

  it('should reject usernames with invalid characters', () => {
    const result = usernameSchema.safeParse('user@name!');
    expect(result.success).toBe(false);
  });

  it('should allow empty/undefined username', () => {
    const result = usernameSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });
});

describe('generateHooksSchema', () => {
  it('should accept valid hook generation request', () => {
    const result = generateHooksSchema.safeParse({
      ideia: 'Como melhorar sua produtividade no trabalho remoto',
      objetivo: 'Educar',
      tom: 'Direto',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid objetivo', () => {
    const result = generateHooksSchema.safeParse({
      ideia: 'Uma ideia válida aqui',
      objetivo: 'InvalidOption',
      tom: 'Direto',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid tom', () => {
    const result = generateHooksSchema.safeParse({
      ideia: 'Uma ideia válida aqui',
      objetivo: 'Educar',
      tom: 'InvalidTom',
    });
    expect(result.success).toBe(false);
  });
});

describe('generateCarouselSchema', () => {
  it('should accept valid carousel generation request', () => {
    const result = generateCarouselSchema.safeParse({
      hook_escolhido: '5 dicas para melhorar sua produtividade',
      ideia_original: 'Como melhorar sua produtividade no trabalho remoto',
      config: {
        objetivo: 'Educar',
        tom: 'Direto',
        emojis: 'Poucos',
        slides_count: 7,
        auto_slides: true,
      },
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty hook', () => {
    const result = generateCarouselSchema.safeParse({
      hook_escolhido: '',
      ideia_original: 'Uma ideia válida aqui',
      config: {
        objetivo: 'Educar',
        tom: 'Direto',
        emojis: 'Poucos',
        slides_count: 7,
      },
    });
    expect(result.success).toBe(false);
  });

  it('should reject slides_count below 7', () => {
    const result = generateCarouselSchema.safeParse({
      hook_escolhido: 'Um hook válido',
      ideia_original: 'Uma ideia válida aqui',
      config: {
        objetivo: 'Educar',
        tom: 'Direto',
        emojis: 'Poucos',
        slides_count: 5,
      },
    });
    expect(result.success).toBe(false);
  });

  it('should reject slides_count above 20', () => {
    const result = generateCarouselSchema.safeParse({
      hook_escolhido: 'Um hook válido',
      ideia_original: 'Uma ideia válida aqui',
      config: {
        objetivo: 'Educar',
        tom: 'Direto',
        emojis: 'Poucos',
        slides_count: 25,
      },
    });
    expect(result.success).toBe(false);
  });

  it('should default auto_slides to true', () => {
    const result = generateCarouselSchema.safeParse({
      hook_escolhido: 'Um hook válido',
      ideia_original: 'Uma ideia válida aqui',
      config: {
        objetivo: 'Educar',
        tom: 'Direto',
        emojis: 'Poucos',
        slides_count: 7,
      },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.config.auto_slides).toBe(true);
    }
  });
});

describe('slideSchema', () => {
  it('should accept valid slide', () => {
    const result = slideSchema.safeParse({
      numero: 1,
      texto: 'Um texto simples para o slide',
    });
    expect(result.success).toBe(true);
  });

  it('should reject slide with too many words (>35)', () => {
    const longText = Array(40).fill('palavra').join(' ');
    const result = slideSchema.safeParse({
      numero: 1,
      texto: longText,
    });
    expect(result.success).toBe(false);
  });
});
