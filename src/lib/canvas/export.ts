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

// Instagram carousel dimensions
const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;

// Twitter theme colors
const THEMES = {
  light: {
    background: '#FFFFFF',
    cardBg: '#FFFFFF',
    text: '#0F1419',
    textSecondary: '#536471',
    border: '#EFF3F4',
    metrics: '#536471',
  },
  dim: {
    background: '#15202B',
    cardBg: '#15202B',
    text: '#F7F9F9',
    textSecondary: '#8B98A5',
    border: '#38444D',
    metrics: '#8B98A5',
  },
  dark: {
    background: '#000000',
    cardBg: '#000000',
    text: '#E7E9EA',
    textSecondary: '#71767B',
    border: '#2F3336',
    metrics: '#71767B',
  },
};

// Generate random engagement metrics
function generateMetrics() {
  const views = Math.floor(Math.random() * 900000) + 100000;
  const likes = Math.floor(views * (Math.random() * 0.05 + 0.02));
  const retweets = Math.floor(likes * (Math.random() * 0.3 + 0.1));
  const replies = Math.floor(retweets * (Math.random() * 0.5 + 0.2));
  const bookmarks = Math.floor(likes * (Math.random() * 0.1 + 0.02));

  return {
    views: formatNumber(views),
    likes: formatNumber(likes),
    retweets: formatNumber(retweets),
    replies: formatNumber(replies),
    bookmarks: formatNumber(bookmarks),
  };
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

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
  maxWidth: number,
  lineHeight: number
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

// Native Canvas rendering
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
  const metrics = generateMetrics();

  const canvas = document.createElement('canvas');
  canvas.width = SLIDE_WIDTH;
  canvas.height = SLIDE_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);

  // Card dimensions
  const padding = 60;
  const cardX = padding;
  const cardY = padding;
  const cardWidth = SLIDE_WIDTH - padding * 2;
  const cardHeight = SLIDE_HEIGHT - padding * 2 - 40; // Leave space for dots

  // Card background with border
  ctx.fillStyle = colors.cardBg;
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 16);
  ctx.fill();

  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  roundRect(ctx, cardX, cardY, cardWidth, cardHeight, 16);
  ctx.stroke();

  // Content area
  const contentPadding = 30;
  const contentX = cardX + contentPadding;
  let currentY = cardY + contentPadding;

  // Avatar
  const avatarSize = 56;
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
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
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
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      (displayName || username).slice(0, 2).toUpperCase(),
      contentX + avatarSize / 2,
      currentY + avatarSize / 2
    );
  }
  ctx.restore();

  // Name and username
  const nameX = contentX + avatarSize + 15;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // Display name
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(displayName || username, nameX, currentY + 8);

  // Verified badge (simple blue circle with check)
  if (verified) {
    const badgeX = nameX + ctx.measureText(displayName || username).width + 8;
    ctx.fillStyle = '#1D9BF0';
    ctx.beginPath();
    ctx.arc(badgeX + 10, currentY + 18, 10, 0, Math.PI * 2);
    ctx.fill();
    // Check mark
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(badgeX + 5, currentY + 18);
    ctx.lineTo(badgeX + 9, currentY + 22);
    ctx.lineTo(badgeX + 15, currentY + 14);
    ctx.stroke();
  }

  // Username
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const usernameText = username.startsWith('@') ? username : `@${username}`;
  ctx.fillText(usernameText, nameX, currentY + 34);

  currentY += avatarSize + 40;

  // Tweet content - centered vertically
  const textAreaTop = currentY;
  const textAreaBottom = cardY + cardHeight - 200; // Leave space for footer
  const textAreaHeight = textAreaBottom - textAreaTop;

  // Determine font size based on text length
  let fontSize: number;
  if (slide.texto.length > 200) {
    fontSize = 36;
  } else if (slide.texto.length > 150) {
    fontSize = 42;
  } else if (slide.texto.length > 100) {
    fontSize = 48;
  } else if (slide.texto.length > 60) {
    fontSize = 56;
  } else {
    fontSize = 64;
  }

  ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.fillStyle = colors.text;

  const maxTextWidth = cardWidth - contentPadding * 2;
  const lineHeight = fontSize * 1.4;
  const lines = wrapText(ctx, slide.texto, maxTextWidth, lineHeight);
  const totalTextHeight = lines.length * lineHeight;

  // Center text vertically
  const textStartY = textAreaTop + (textAreaHeight - totalTextHeight) / 2;

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  lines.forEach((line, index) => {
    ctx.fillText(line, contentX, textStartY + index * lineHeight);
  });

  // Footer area
  currentY = cardY + cardHeight - 180;

  // Timestamp
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const timestamp = `${displayHours}:${minutes} ${ampm} · ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  ctx.fillText(timestamp, contentX, currentY);

  // Divider
  currentY += 35;
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentX, currentY);
  ctx.lineTo(cardX + cardWidth - contentPadding, currentY);
  ctx.stroke();

  // Views
  currentY += 20;
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(metrics.views, contentX, currentY);
  ctx.fillStyle = colors.textSecondary;
  ctx.font = '17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(' Views', contentX + ctx.measureText(metrics.views).width + 5, currentY);

  // Divider
  currentY += 35;
  ctx.strokeStyle = colors.border;
  ctx.beginPath();
  ctx.moveTo(contentX, currentY);
  ctx.lineTo(cardX + cardWidth - contentPadding, currentY);
  ctx.stroke();

  // Metrics row
  currentY += 20;
  ctx.fillStyle = colors.metrics;
  ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const metricsSpacing = (cardWidth - contentPadding * 2) / 5;
  const metricsList = [metrics.replies, metrics.retweets, metrics.likes, metrics.bookmarks, ''];
  metricsList.forEach((value, index) => {
    ctx.fillText(value, contentX + index * metricsSpacing, currentY);
  });

  // Slide indicator dots at bottom
  const dotsY = SLIDE_HEIGHT - 35;
  const dotSpacing = 12;
  const activeDotWidth = 24;
  const inactiveDotWidth = 8;
  const dotHeight = 8;

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
    roundRect(ctx, dotX, dotsY, width, dotHeight, 4);
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
      0.95
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
    zip.file(`breathai_slide_${slide.numero}.png`, blob);
  }

  // Generate zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });

  // Trigger download
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `breathai_carrossel_${Date.now()}.zip`;
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
  a.download = `breathai_slide_${slide.numero}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
