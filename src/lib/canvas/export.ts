// ==========================================
// Canvas Export - Legacy API (for backwards compatibility)
// ==========================================

// Re-export everything from the modular structure
export {
  renderSlideToBlob,
  exportAllSlides,
  exportSingleSlide,
  type ExportOptions,
  type RenderOptions,
} from './index';

// Keep the old export structure for any existing imports
import { exportAllSlides as _exportAllSlides, exportSingleSlide as _exportSingleSlide } from './downloader';
import { renderSlideToBlob as _renderSlideToBlob } from './renderer';

// Legacy named exports (deprecated - use named imports from './index' instead)
export const legacyRenderSlideToBlob = _renderSlideToBlob;
export const legacyExportAllSlides = _exportAllSlides;
export const legacyExportSingleSlide = _exportSingleSlide;
