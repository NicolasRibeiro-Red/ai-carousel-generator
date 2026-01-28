// ==========================================
// Services Module - Public API
// ==========================================

// OpenAI Service
export {
  generateHooks,
  generateCarousel,
  type GenerateHooksParams,
  type GenerateHooksResult,
  type GenerateCarouselParams,
  type GenerateCarouselResult,
} from './openai.service';

// Carousel Service
export {
  saveCarousel,
  getCarousel,
  incrementDownloadCount,
  getUserCarousels,
  type SaveCarouselParams,
  type SaveCarouselResult,
} from './carousel.service';
