// ==========================================
// Store Types
// ==========================================

import type { Carousel, CarouselConfig, TwitterTheme } from './carousel.types';
import type { HookDetailed } from './hook.types';

// ==========================================
// Form Types
// ==========================================

export interface IdeaFormData {
  ideia: string;
  objetivo: CarouselConfig['objetivo'];
  tom: CarouselConfig['tom'];
  emojis: CarouselConfig['emojis'];
  slides_count: number;
  auto_slides: boolean; // Let AI determine optimal slide count
}

// ==========================================
// Carousel Store
// ==========================================

export interface CarouselStore {
  // Form data
  formData: IdeaFormData;
  setFormData: (data: Partial<IdeaFormData>) => void;
  resetFormData: () => void;

  // Hooks
  hooks: string[];
  hooksDetailed: HookDetailed[];
  setHooks: (hooks: string[], hooksDetailed?: HookDetailed[]) => void;
  selectedHook: string | null;
  setSelectedHook: (hook: string | null) => void;
  hookRegenerations: number;
  incrementHookRegenerations: () => void;
  resetHookRegenerations: () => void;

  // Carousel
  carousel: Carousel | null;
  setCarousel: (carousel: Carousel | null) => void;
  updateSlideText: (slideNumber: number, newText: string) => void;
  deleteSlide: (slideNumber: number) => void;

  // Customization
  profilePhoto: string | null;
  setProfilePhoto: (url: string | null) => void;
  displayName: string;
  setDisplayName: (name: string) => void;
  username: string;
  setUsername: (username: string) => void;
  verified: boolean;
  setVerified: (verified: boolean) => void;
  theme: TwitterTheme;
  setTheme: (theme: TwitterTheme) => void;

  // Loading states
  isGeneratingHooks: boolean;
  setIsGeneratingHooks: (loading: boolean) => void;
  isGeneratingCarousel: boolean;
  setIsGeneratingCarousel: (loading: boolean) => void;

  // Reset all
  resetAll: () => void;
}
