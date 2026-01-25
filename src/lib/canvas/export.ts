import JSZip from 'jszip';
import type { Slide, TwitterTheme } from '@/types';

interface ExportOptions {
  slides: Slide[];
  theme: TwitterTheme;
  profilePhoto: string | null;
  displayName: string;
  username: string;
  verified: boolean;
}

// Instagram carousel dimensions (4:5 portrait - recommended)
const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;

// Twitter theme colors
const THEMES = {
  light: {
    background: '#FFFFFF',
    text: '#0F1419',
    textSecondary: '#536471',
    border: '#EFF3F4',
  },
  dim: {
    background: '#15202B',
    text: '#F7F9F9',
    textSecondary: '#8B98A5',
    border: '#38444D',
  },
  dark: {
    background: '#000000',
    text: '#E7E9EA',
    textSecondary: '#71767B',
    border: '#2F3336',
  },
};

// Load image helper
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Word wrap helper for canvas
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

// Draw rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Native Canvas rendering - Clean style matching preview
async function renderSlideToCanvasNative(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean
): Promise<HTMLCanvasElement> {
  const colors = THEMES[theme];

  const canvas = document.createElement('canvas');
  canvas.width = SLIDE_WIDTH;
  canvas.height = SLIDE_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);

  // Content padding
  const padding = 80;
  const contentX = padding;
  let currentY = padding;

  // ============ HEADER: Avatar + Name + Username ============
  const avatarSize = 100;

  // Draw avatar circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(contentX + avatarSize / 2, currentY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (profilePhoto) {
    try {
      const img = await loadImage(profilePhoto);
      ctx.drawImage(img, contentX, currentY, avatarSize, avatarSize);
    } catch {
      // Fallback to initials
      ctx.fillStyle = colors.border;
      ctx.fillRect(contentX, currentY, avatarSize, avatarSize);
      ctx.fillStyle = colors.textSecondary;
      ctx.font = 'bold 40px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        (displayName || username).slice(0, 2).toUpperCase(),
        contentX + avatarSize / 2,
        currentY + avatarSize / 2
      );
    }
  } else {
    ctx.fillStyle = colors.border;
    ctx.fillRect(contentX, currentY, avatarSize, avatarSize);
    ctx.fillStyle = colors.textSecondary;
    ctx.font = 'bold 40px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      (displayName || username).slice(0, 2).toUpperCase(),
      contentX + avatarSize / 2,
      currentY + avatarSize / 2
    );
  }
  ctx.restore();

  // Name and username next to avatar
  const nameX = contentX + avatarSize + 24;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Display name
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(displayName || username, nameX, currentY + 20);

  // Verified badge
  if (verified) {
    const nameWidth = ctx.measureText(displayName || username).width;
    const badgeX = nameX + nameWidth + 12;
    const badgeY = currentY + 28;

    // Blue circle
    ctx.fillStyle = '#1D9BF0';
    ctx.beginPath();
    ctx.arc(badgeX + 14, badgeY + 10, 14, 0, Math.PI * 2);
    ctx.fill();

    // White check mark
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(badgeX + 7, badgeY + 10);
    ctx.lineTo(badgeX + 12, badgeY + 15);
    ctx.lineTo(badgeX + 21, badgeY + 5);
    ctx.stroke();
  }

  // Username
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const usernameText = username.startsWith('@') ? username : `@${username}`;
  ctx.fillText(usernameText, nameX, currentY + 62);

  currentY += avatarSize + 60;

  // ============ MAIN CONTENT: Tweet text ============
  const textAreaTop = currentY;
  const textAreaBottom = SLIDE_HEIGHT - 180; // Space for footer
  const textAreaHeight = textAreaBottom - textAreaTop;
  const maxTextWidth = SLIDE_WIDTH - padding * 2;

  // Determine font size based on text length
  let fontSize: number;
  if (slide.texto.length > 200) {
    fontSize = 42;
  } else if (slide.texto.length > 150) {
    fontSize = 48;
  } else if (slide.texto.length > 100) {
    fontSize = 54;
  } else if (slide.texto.length > 60) {
    fontSize = 62;
  } else {
    fontSize = 72;
  }

  ctx.font = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillStyle = colors.text;

  const lineHeight = fontSize * 1.35;
  const lines = wrapText(ctx, slide.texto, maxTextWidth);
  const totalTextHeight = lines.length * lineHeight;

  // Center text vertically in the available space
  const textStartY = textAreaTop + (textAreaHeight - totalTextHeight) / 2;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  lines.forEach((line, index) => {
    ctx.fillText(line, contentX, textStartY + index * lineHeight);
  });

  // ============ FOOTER: Timestamp + Slide indicator ============
  currentY = SLIDE_HEIGHT - 140;

  // Timestamp
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const timestamp = `${displayHours}:${minutes} ${ampm} · ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  // Center timestamp and slide number
  const slideText = `${slide.numero}/${totalSlides}`;
  const timestampWidth = ctx.measureText(timestamp).width;
  const slideTextWidth = ctx.measureText(slideText).width;

  ctx.textAlign = 'left';
  ctx.fillText(timestamp, contentX, currentY);

  ctx.textAlign = 'right';
  ctx.fillText(slideText, SLIDE_WIDTH - padding, currentY);

  // ============ SLIDE INDICATOR DOTS ============
  currentY = SLIDE_HEIGHT - 60;
  const dotSpacing = 16;
  const activeDotWidth = 32;
  const inactiveDotWidth = 12;
  const dotHeight = 12;

  // Calculate total width of all dots
  let totalDotsWidth = 0;
  for (let i = 1; i <= totalSlides; i++) {
    totalDotsWidth += i === slide.numero ? activeDotWidth : inactiveDotWidth;
    if (i < totalSlides) totalDotsWidth += dotSpacing;
  }

  let dotX = (SLIDE_WIDTH - totalDotsWidth) / 2;

  for (let i = 1; i <= totalSlides; i++) {
    const isActive = i === slide.numero;
    const width = isActive ? activeDotWidth : inactiveDotWidth;

    ctx.fillStyle = isActive ? '#1D9BF0' : colors.border;
    roundRect(ctx, dotX, currentY, width, dotHeight, 6);
    ctx.fill();

    dotX += width + dotSpacing;
  }

  return canvas;
}

// Render a single slide to blob
export async function renderSlideToBlob(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean = true
): Promise<Blob> {
  const canvas = await renderSlideToCanvasNative(
    slide,
    totalSlides,
    theme,
    profilePhoto,
    displayName,
    username,
    verified
  );

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

// Export all slides to ZIP
export async function exportSlidesToZip(options: ExportOptions): Promise<void> {
  const { slides, theme, profilePhoto, displayName, username, verified } = options;
  const zip = new JSZip();

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const blob = await renderSlideToBlob(
      slide,
      slides.length,
      theme,
      profilePhoto,
      displayName,
      username,
      verified
    );
    zip.file(`slide_${slide.numero}.png`, blob);
  }

  // Generate zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  // Trigger download
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `carrossel_${Date.now()}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Export individual slide
export async function exportSingleSlide(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean = true
): Promise<void> {
  const blob = await renderSlideToBlob(
    slide,
    totalSlides,
    theme,
    profilePhoto,
    displayName,
    username,
    verified
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `slide_${slide.numero}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
