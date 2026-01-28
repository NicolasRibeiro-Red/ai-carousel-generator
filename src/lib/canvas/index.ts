// ==========================================
// Canvas Module - Public API
// ==========================================

// Renderer
export {
  renderSlideToCanvas,
  renderSlideToBlob,
  canvasToBlob,
  type RenderOptions,
} from './renderer';

// Downloader
export {
  exportAllSlides,
  exportSingleSlide,
  type ExportOptions,
} from './downloader';

// Primitives (for advanced usage)
export {
  roundRect,
  loadImage,
  wrapText,
  getFont,
  drawCenteredText,
  drawCircle,
  clipCircle,
} from './primitives';

// Components (for advanced usage)
export {
  drawAvatar,
  drawHeader,
  drawContent,
  drawFooter,
  drawSlideIndicatorDots,
  type AvatarOptions,
  type HeaderOptions,
  type ContentOptions,
  type FooterOptions,
  type DotsOptions,
} from './components';
