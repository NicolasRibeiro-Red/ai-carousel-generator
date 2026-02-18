import { describe, it, expect } from 'vitest';
import {
  CANVAS,
  THEME_COLORS,
  LIMITS,
  OPENAI,
  FONT_SIZE_THRESHOLDS,
  DOTS,
  ERROR_CODES,
  ERROR_MESSAGES,
} from './constants';

describe('Constants', () => {
  describe('CANVAS', () => {
    it('should have correct Instagram dimensions', () => {
      expect(CANVAS.WIDTH).toBe(1080);
      expect(CANVAS.HEIGHT).toBe(1350);
    });

    it('should have reasonable padding', () => {
      expect(CANVAS.PADDING).toBeGreaterThan(0);
      expect(CANVAS.PADDING).toBeLessThan(CANVAS.WIDTH / 4);
    });

    it('should have avatar size', () => {
      expect(CANVAS.AVATAR_SIZE).toBeGreaterThan(0);
    });
  });

  describe('THEME_COLORS', () => {
    it('should have light, dim, and dark themes', () => {
      expect(THEME_COLORS.light).toBeDefined();
      expect(THEME_COLORS.dim).toBeDefined();
      expect(THEME_COLORS.dark).toBeDefined();
    });

    it('should have all required color properties', () => {
      const requiredProps = ['background', 'text', 'textSecondary', 'border'];

      for (const theme of Object.values(THEME_COLORS)) {
        for (const prop of requiredProps) {
          expect(theme).toHaveProperty(prop);
          expect(theme[prop as keyof typeof theme]).toMatch(/^#[0-9A-Fa-f]{6}$/);
        }
      }
    });

    it('should have contrasting text colors', () => {
      // Light theme should have dark text
      expect(THEME_COLORS.light.background).toBe('#FFFFFF');
      expect(THEME_COLORS.light.text).not.toBe('#FFFFFF');

      // Dark theme should have light text
      expect(THEME_COLORS.dark.background).toBe('#000000');
      expect(THEME_COLORS.dark.text).not.toBe('#000000');
    });
  });

  describe('LIMITS', () => {
    it('should have valid idea length limits', () => {
      expect(LIMITS.IDEA_MIN_LENGTH).toBeLessThan(LIMITS.IDEA_MAX_LENGTH);
      expect(LIMITS.IDEA_MIN_LENGTH).toBeGreaterThan(0);
    });

    it('should have valid slide limits', () => {
      expect(LIMITS.MIN_SLIDES).toBeLessThan(LIMITS.MAX_SLIDES);
      expect(LIMITS.DEFAULT_SLIDES).toBeGreaterThanOrEqual(LIMITS.MIN_SLIDES);
      expect(LIMITS.DEFAULT_SLIDES).toBeLessThanOrEqual(LIMITS.MAX_SLIDES);
    });

    it('should have valid word limits', () => {
      expect(LIMITS.SLIDE_MAX_WORDS).toBe(30);
    });

    it('should have valid hook limits', () => {
      expect(LIMITS.MIN_HOOKS).toBeLessThan(LIMITS.MAX_HOOKS);
    });
  });

  describe('AI_CONFIG (OPENAI)', () => {
    it('should have default model', () => {
      expect(OPENAI.DEFAULT_MODEL).toBe('claude-sonnet-4-20250514');
    });

    it('should have valid token limits', () => {
      expect(OPENAI.HOOKS_MAX_TOKENS).toBe(1200);
      expect(OPENAI.CAROUSEL_MAX_TOKENS).toBeGreaterThan(OPENAI.HOOKS_MAX_TOKENS);
    });

    it('should have correct temperature values', () => {
      expect(OPENAI.HOOKS_TEMPERATURE).toBe(0.8);
      expect(OPENAI.CAROUSEL_TEMPERATURE).toBe(0.7);
    });
  });

  describe('FONT_SIZE_THRESHOLDS', () => {
    it('should be sorted by maxLength ascending', () => {
      for (let i = 1; i < FONT_SIZE_THRESHOLDS.length; i++) {
        expect(FONT_SIZE_THRESHOLDS[i].maxLength).toBeGreaterThan(
          FONT_SIZE_THRESHOLDS[i - 1].maxLength
        );
      }
    });

    it('should have decreasing font sizes for longer text', () => {
      for (let i = 1; i < FONT_SIZE_THRESHOLDS.length; i++) {
        expect(FONT_SIZE_THRESHOLDS[i].fontSize).toBeLessThanOrEqual(
          FONT_SIZE_THRESHOLDS[i - 1].fontSize
        );
      }
    });

    it('should end with Infinity', () => {
      const last = FONT_SIZE_THRESHOLDS[FONT_SIZE_THRESHOLDS.length - 1];
      expect(last.maxLength).toBe(Infinity);
    });
  });

  describe('DOTS', () => {
    it('should have valid dimensions', () => {
      expect(DOTS.ACTIVE_WIDTH).toBeGreaterThan(DOTS.INACTIVE_WIDTH);
      expect(DOTS.HEIGHT).toBeGreaterThan(0);
      expect(DOTS.RADIUS).toBeLessThanOrEqual(DOTS.HEIGHT / 2);
    });
  });

  describe('ERROR_CODES', () => {
    it('should have unique error codes', () => {
      const codes = Object.values(ERROR_CODES);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('should have a message for each common error code', () => {
      expect(ERROR_MESSAGES.UNAUTHORIZED).toBeDefined();
      expect(ERROR_MESSAGES.INVALID_INPUT).toBeDefined();
      expect(ERROR_MESSAGES.INTERNAL_ERROR).toBeDefined();
    });

    it('should have non-empty messages', () => {
      for (const message of Object.values(ERROR_MESSAGES)) {
        expect(message.length).toBeGreaterThan(0);
      }
    });
  });
});
