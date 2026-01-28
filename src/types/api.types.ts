// ==========================================
// API Request/Response Types
// ==========================================

import type { CarouselConfig, Slide } from './carousel.types';
import type { HookDetailed } from './hook.types';

// ==========================================
// Generate Hooks
// ==========================================

export interface GenerateHooksRequest {
  ideia: string;
  objetivo: CarouselConfig['objetivo'];
  tom: CarouselConfig['tom'];
}

export interface GenerateHooksResponse {
  hooks: string[];
  hooksDetailed?: HookDetailed[];
  timestamp: string;
  tokens_used?: {
    input: number;
    output: number;
  };
}

// ==========================================
// Generate Carousel
// ==========================================

export interface GenerateCarouselRequest {
  hook_escolhido: string;
  ideia_original: string;
  config: Omit<CarouselConfig, 'theme'>;
}

export interface GenerateCarouselResponse {
  carousel_id: string;
  slides: Slide[];
  config: CarouselConfig;
  created_at: string;
  tokens_used?: {
    input: number;
    output: number;
  };
}

// ==========================================
// API Errors
// ==========================================

export interface ApiError {
  error: string;
  code?: string;
  details?: string;
}
