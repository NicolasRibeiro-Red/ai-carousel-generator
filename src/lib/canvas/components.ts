// ==========================================
// Canvas Component Renderers
// ==========================================

import { loadImage, clipCircle, roundRect, wrapText, getFont } from './primitives';
import { CANVAS, THEME_COLORS, TWITTER_BLUE, FONT_SIZE_THRESHOLDS, LINE_HEIGHT_MULTIPLIER, DOTS } from '@/lib/constants';
import type { TwitterTheme } from '@/types';

type ThemeColors = typeof THEME_COLORS[TwitterTheme];

// ==========================================
// Avatar Component
// ==========================================

export interface AvatarOptions {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  profilePhoto: string | null;
  displayName: string;
  username: string;
  colors: ThemeColors;
}

export async function drawAvatar(options: AvatarOptions): Promise<void> {
  const { ctx, x, y, size, profilePhoto, displayName, username, colors } = options;

  ctx.save();
  clipCircle(ctx, x + size / 2, y + size / 2, size / 2);

  if (profilePhoto) {
    try {
      const img = await loadImage(profilePhoto);
      ctx.drawImage(img, x, y, size, size);
    } catch {
      drawAvatarFallback(ctx, x, y, size, displayName, username, colors);
    }
  } else {
    drawAvatarFallback(ctx, x, y, size, displayName, username, colors);
  }

  ctx.restore();
}

function drawAvatarFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  displayName: string,
  username: string,
  colors: ThemeColors
): void {
  ctx.fillStyle = colors.border;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = colors.textSecondary;
  ctx.font = getFont('bold', 40);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    (displayName || username).slice(0, 2).toUpperCase(),
    x + size / 2,
    y + size / 2
  );
}

// ==========================================
// Header Component (Name + Verified + Username)
// ==========================================

export interface HeaderOptions {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  displayName: string;
  username: string;
  verified: boolean;
  colors: ThemeColors;
}

export function drawHeader(options: HeaderOptions): void {
  const { ctx, x, y, displayName, username, verified, colors } = options;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Display name
  ctx.fillStyle = colors.text;
  ctx.font = getFont('bold', 36);
  ctx.fillText(displayName || username, x, y + 20);

  // Verified badge
  if (verified) {
    const nameWidth = ctx.measureText(displayName || username).width;
    drawVerifiedBadge(ctx, x + nameWidth + 12, y + 28);
  }

  // Username
  ctx.fillStyle = colors.textSecondary;
  ctx.font = getFont('normal', 30);
  const usernameText = username.startsWith('@') ? username : `@${username}`;
  ctx.fillText(usernameText, x, y + 62);
}

function drawVerifiedBadge(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  // Blue circle
  ctx.fillStyle = TWITTER_BLUE;
  ctx.beginPath();
  ctx.arc(x + 14, y + 10, 14, 0, Math.PI * 2);
  ctx.fill();

  // White check mark
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x + 7, y + 10);
  ctx.lineTo(x + 12, y + 15);
  ctx.lineTo(x + 21, y + 5);
  ctx.stroke();
}

// ==========================================
// Content Component (Tweet Text)
// ==========================================

export interface ContentOptions {
  ctx: CanvasRenderingContext2D;
  text: string;
  textAreaTop: number;
  textAreaBottom: number;
  padding: number;
  colors: ThemeColors;
}

export function drawContent(options: ContentOptions): void {
  const { ctx, text, textAreaTop, textAreaBottom, padding, colors } = options;

  const textAreaHeight = textAreaBottom - textAreaTop;
  const maxTextWidth = CANVAS.WIDTH - padding * 2;

  // Determine font size based on text length
  const fontSize = getFontSizeForText(text.length);

  ctx.font = getFont(500, fontSize);
  ctx.fillStyle = colors.text;

  const lineHeight = fontSize * LINE_HEIGHT_MULTIPLIER;
  const lines = wrapText(ctx, text, maxTextWidth);
  const totalTextHeight = lines.length * lineHeight;

  // Center text vertically in the available space
  const textStartY = textAreaTop + (textAreaHeight - totalTextHeight) / 2;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  lines.forEach((line, index) => {
    ctx.fillText(line, padding, textStartY + index * lineHeight);
  });
}

function getFontSizeForText(textLength: number): number {
  for (const { maxLength, fontSize } of FONT_SIZE_THRESHOLDS) {
    if (textLength <= maxLength) {
      return fontSize;
    }
  }
  return 42; // fallback
}

// ==========================================
// Footer Component (Timestamp + Slide Number)
// ==========================================

export interface FooterOptions {
  ctx: CanvasRenderingContext2D;
  y: number;
  padding: number;
  slideNumber: number;
  totalSlides: number;
  colors: ThemeColors;
}

export function drawFooter(options: FooterOptions): void {
  const { ctx, y, padding, slideNumber, totalSlides, colors } = options;

  ctx.fillStyle = colors.textSecondary;
  ctx.font = getFont('normal', 28);

  // Timestamp
  const timestamp = formatTimestamp();
  ctx.textAlign = 'left';
  ctx.fillText(timestamp, padding, y);

  // Slide number
  const slideText = `${slideNumber}/${totalSlides}`;
  ctx.textAlign = 'right';
  ctx.fillText(slideText, CANVAS.WIDTH - padding, y);
}

function formatTimestamp(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${displayHours}:${minutes} ${ampm} · ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

// ==========================================
// Slide Indicator Dots
// ==========================================

export interface DotsOptions {
  ctx: CanvasRenderingContext2D;
  y: number;
  currentSlide: number;
  totalSlides: number;
  colors: ThemeColors;
}

export function drawSlideIndicatorDots(options: DotsOptions): void {
  const { ctx, y, currentSlide, totalSlides, colors } = options;

  // Calculate total width of all dots
  let totalDotsWidth = 0;
  for (let i = 1; i <= totalSlides; i++) {
    totalDotsWidth += i === currentSlide ? DOTS.ACTIVE_WIDTH : DOTS.INACTIVE_WIDTH;
    if (i < totalSlides) totalDotsWidth += DOTS.SPACING;
  }

  let dotX = (CANVAS.WIDTH - totalDotsWidth) / 2;

  for (let i = 1; i <= totalSlides; i++) {
    const isActive = i === currentSlide;
    const width = isActive ? DOTS.ACTIVE_WIDTH : DOTS.INACTIVE_WIDTH;

    ctx.fillStyle = isActive ? TWITTER_BLUE : colors.border;
    roundRect(ctx, dotX, y, width, DOTS.HEIGHT, DOTS.RADIUS);
    ctx.fill();

    dotX += width + DOTS.SPACING;
  }
}
