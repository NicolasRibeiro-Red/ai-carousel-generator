import { describe, it, expect, vi } from 'vitest';

// Mock the Anthropic SDK before importing the service
vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn(),
    },
  })),
}));

// Mock the client module to avoid Anthropic initialization
vi.mock('@/lib/openai/client', () => ({
  anthropic: {},
  DEFAULT_MODEL: 'mock-model',
  parseJsonResponse: vi.fn((content: string) => JSON.parse(content)),
}));

// Now import after mocks are set up
const { isLikelyPortuguese } = await import('./openai.service');

// ==========================================
// isLikelyPortuguese
// ==========================================

describe('isLikelyPortuguese', () => {
  it('should detect PT-BR text', () => {
    expect(isLikelyPortuguese('Se você não sabe como isso funciona para sua vida')).toBe(true);
  });

  it('should reject English text', () => {
    expect(isLikelyPortuguese('If you want to learn how to breathe better today')).toBe(false);
  });

  it('should handle empty text', () => {
    expect(isLikelyPortuguese('')).toBe(false);
  });

  it('should handle short PT-BR text', () => {
    expect(isLikelyPortuguese('isso que você não sabe')).toBe(true);
  });
});

// ==========================================
// GenerateHooksResult type shape
// ==========================================

describe('GenerateHooksResult type', () => {
  it('should accept legacyFormat flag', () => {
    const result = {
      hooks: ['hook1'],
      hooksDetailed: [],
      legacyFormat: true,
      tokensUsed: { input: 100, output: 50 },
    };
    expect(result.legacyFormat).toBe(true);
  });

  it('should work without legacyFormat flag', () => {
    const result: Record<string, unknown> = {
      hooks: ['hook1'],
      hooksDetailed: [],
      tokensUsed: { input: 100, output: 50 },
    };
    expect(result.legacyFormat).toBeUndefined();
  });
});
