// ==========================================
// Canvas Slide Renderer
// ==========================================

import { CANVAS, THEME_COLORS } from '@/lib/constants';
import {
  drawAvatar,
  drawHeader,
  drawContent,
  drawFooter,
  drawSlideIndicatorDots,
} from './components';
import type { Slide, TwitterTheme } from '@/types';

// ==========================================
// Types
// ==========================================

export interface RenderOptions {
  slide: Slide;
  totalSlides: number;
  theme: TwitterTheme;
  profilePhoto: string | null;
  displayName: string;
  username: string;
  verified: boolean;
}

// ==========================================
// Main Renderer
// ==========================================

/**
 * Render a single slide to canvas
 */
export async function renderSlideToCanvas(options: RenderOptions): Promise<HTMLCanvasElement> {
  const { slide, totalSlides, theme, profilePhoto, displayName, username, verified } = options;
  const colors = THEME_COLORS[theme];

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS.WIDTH;
  canvas.height = CANVAS.HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);

  let currentY = CANVAS.PADDING;

  // ============ HEADER: Avatar + Name + Username ============
  await drawAvatar({
    ctx,
    x: CANVAS.PADDING,
    y: currentY,
    size: CANVAS.AVATAR_SIZE,
    profilePhoto,
    displayName,
    username,
    colors,
  });

  drawHeader({
    ctx,
    x: CANVAS.PADDING + CANVAS.AVATAR_SIZE + 24,
    y: currentY,
    displayName,
    username,
    verified,
    colors,
  });

  currentY += CANVAS.AVATAR_SIZE + 60;

  // ============ MAIN CONTENT: Tweet text ============
  const textAreaTop = currentY;
  const textAreaBottom = CANVAS.HEIGHT - 180; // Space for footer

  drawContent({
    ctx,
    text: slide.texto,
    textAreaTop,
    textAreaBottom,
    padding: CANVAS.PADDING,
    colors,
  });

  // ============ FOOTER: Timestamp + Slide indicator ============
  drawFooter({
    ctx,
    y: CANVAS.HEIGHT - 140,
    padding: CANVAS.PADDING,
    slideNumber: slide.numero,
    totalSlides,
    colors,
  });

  // ============ SLIDE INDICATOR DOTS ============
  drawSlideIndicatorDots({
    ctx,
    y: CANVAS.HEIGHT - 60,
    currentSlide: slide.numero,
    totalSlides,
    colors,
  });

  return canvas;
}

/**
 * Convert canvas to blob
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Render slide to blob
 */
export async function renderSlideToBlob(options: RenderOptions): Promise<Blob> {
  const canvas = await renderSlideToCanvas(options);
  return canvasToBlob(canvas);
}
