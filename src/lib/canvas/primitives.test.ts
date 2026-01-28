import { describe, it, expect, vi } from 'vitest';
import { wrapText, getFont } from './primitives';
import { FONT_STACK } from '@/lib/constants';

describe('Canvas Primitives', () => {
  describe('wrapText', () => {
    it('should return single line for short text', () => {
      const mockCtx = {
        measureText: vi.fn().mockReturnValue({ width: 50 }),
      } as unknown as CanvasRenderingContext2D;

      const lines = wrapText(mockCtx, 'Hello world', 200);
      expect(lines).toEqual(['Hello world']);
    });

    it('should wrap long text into multiple lines', () => {
      const mockCtx = {
        measureText: vi.fn((text: string) => ({ width: text.length * 10 })),
      } as unknown as CanvasRenderingContext2D;

      const lines = wrapText(mockCtx, 'This is a longer text that should wrap', 100);
      expect(lines.length).toBeGreaterThan(1);
    });

    it('should handle empty text', () => {
      const mockCtx = {
        measureText: vi.fn().mockReturnValue({ width: 0 }),
      } as unknown as CanvasRenderingContext2D;

      const lines = wrapText(mockCtx, '', 200);
      expect(lines).toEqual([]);
    });

    it('should handle single word', () => {
      const mockCtx = {
        measureText: vi.fn().mockReturnValue({ width: 50 }),
      } as unknown as CanvasRenderingContext2D;

      const lines = wrapText(mockCtx, 'Hello', 200);
      expect(lines).toEqual(['Hello']);
    });

    it('should handle text with multiple spaces', () => {
      const mockCtx = {
        measureText: vi.fn().mockReturnValue({ width: 50 }),
      } as unknown as CanvasRenderingContext2D;

      const lines = wrapText(mockCtx, 'Hello   world', 200);
      expect(lines.join(' ')).toContain('Hello');
      expect(lines.join(' ')).toContain('world');
    });
  });

  describe('getFont', () => {
    it('should return font string with weight and size', () => {
      const font = getFont('bold', 24);
      expect(font).toBe(`bold 24px ${FONT_STACK}`);
    });

    it('should handle numeric weight', () => {
      const font = getFont(500, 18);
      expect(font).toBe(`500 18px ${FONT_STACK}`);
    });

    it('should handle normal weight', () => {
      const font = getFont('normal', 16);
      expect(font).toBe(`normal 16px ${FONT_STACK}`);
    });
  });
});
