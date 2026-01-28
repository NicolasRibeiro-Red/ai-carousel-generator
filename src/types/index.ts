// ==========================================
// BREATHAI - Type Definitions
// Re-exports from domain-specific modules
// ==========================================

// User Domain
export type { User, RateLimit } from './user.types';

// Carousel Domain
export type {
  Slide,
  CarouselConfig,
  Carousel,
  TwitterTheme,
} from './carousel.types';

// Hook Domain
export type {
  HookTipo,
  HookForca,
  HookDetailed,
} from './hook.types';

// API Types
export type {
  GenerateHooksRequest,
  GenerateHooksResponse,
  GenerateCarouselRequest,
  GenerateCarouselResponse,
  ApiError,
} from './api.types';

// Store Types
export type {
  IdeaFormData,
  CarouselStore,
} from './store.types';
