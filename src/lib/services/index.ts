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

// Topic Detection Service
export {
  detectTopics,
  detectTopicsWithMatches,
  detectTopicsFromSlides,
  detectTopicsFromSlidesWithMatches,
  normalizeText,
  getTopicLabel,
  getAllTopics,
  type BreathworkTopic,
  type TopicDetectionResult,
  type SlideInput,
} from './topic-detection.service';

// References Service
export {
  getReferencesForTopics,
  getReferencesForCarousel,
  formatReferenceForDisplay,
  getAllReferences,
  getReferenceById,
  detectTopicsFromContent,
  type ScientificReference,
} from './references.service';
