// ==========================================
// Canvas Download Utilities
// ==========================================

import { renderSlideToBlob, type RenderOptions } from './renderer';
import { DOWNLOAD_DELAY_MS } from '@/lib/constants';
import type { Slide, TwitterTheme } from '@/types';

// ==========================================
// Types
// ==========================================

export interface ExportOptions {
  slides: Slide[];
  theme: TwitterTheme;
  profilePhoto: string | null;
  displayName: string;
  username: string;
  verified: boolean;
}

// ==========================================
// Download Functions
// ==========================================

/**
 * Trigger download of a blob
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export all slides as individual images
 */
export async function exportAllSlides(options: ExportOptions): Promise<void> {
  const { slides, theme, profilePhoto, displayName, username, verified } = options;

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];

    const renderOptions: RenderOptions = {
      slide,
      totalSlides: slides.length,
      theme,
      profilePhoto,
      displayName,
      username,
      verified,
    };

    const blob = await renderSlideToBlob(renderOptions);
    downloadBlob(blob, `slide_${slide.numero}.png`);

    // Small delay between downloads to avoid browser blocking
    if (i < slides.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DOWNLOAD_DELAY_MS));
    }
  }
}

/**
 * Export a single slide
 */
export async function exportSingleSlide(
  slide: Slide,
  totalSlides: number,
  theme: TwitterTheme,
  profilePhoto: string | null,
  displayName: string,
  username: string,
  verified: boolean = true
): Promise<void> {
  const renderOptions: RenderOptions = {
    slide,
    totalSlides,
    theme,
    profilePhoto,
    displayName,
    username,
    verified,
  };

  const blob = await renderSlideToBlob(renderOptions);
  downloadBlob(blob, `slide_${slide.numero}.png`);
}
