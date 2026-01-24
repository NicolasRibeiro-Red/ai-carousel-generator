// ==========================================
// BREATHAI - Type Definitions
// ==========================================

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  profile_photo_url?: string;
  username?: string;
  is_whitelisted: boolean;
  role: 'student' | 'mentor' | 'admin';
  daily_carousel_limit: number;
  created_at: string;
  updated_at: string;
}

// Carousel Types
export interface Slide {
  numero: number;
  texto: string;
}

export interface CarouselConfig {
  objetivo: 'Educar' | 'Viralizar' | 'Engajar' | 'Vender';
  tom: 'Técnico' | 'Inspirador' | 'Direto';
  emojis: 'Nenhum' | 'Poucos' | 'Muitos';
  theme: 'light' | 'dark';
  slides_count: number;
}

export interface Carousel {
  id: string;
  user_id: string;
  original_idea: string;
  selected_hook: string;
  slides: Slide[];
  config: CarouselConfig;
  profile_photo_url?: string;
  username?: string;
  download_count: number;
  created_at: string;
  expires_at: string;
}

// Rate Limit Types
export interface RateLimit {
  id: string;
  user_id: string;
  resource: 'hooks' | 'carousels';
  count: number;
  reset_at: string;
  created_at: string;
}

// Hook Types
export type HookTipo =
  | 'comando'
  | 'declaracao'
  | 'condicional'
  | 'lista'
  | 'pergunta_sim'
  | 'rotulo'
  | 'pergunta_aberta'
  | 'narrativa';

export type HookForca = 'alta' | 'media-alta' | 'media';

export interface HookDetailed {
  texto: string;
  tipo: HookTipo;
  forca: HookForca;
  componentes: string[];
}

// API Request/Response Types
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

// Form Types
export interface IdeaFormData {
  ideia: string;
  objetivo: CarouselConfig['objetivo'];
  tom: CarouselConfig['tom'];
  emojis: CarouselConfig['emojis'];
  slides_count: number;
  auto_slides: boolean; // Let AI determine optimal slide count
}

// Twitter-style theme options
export type TwitterTheme = 'light' | 'dim' | 'dark';

// Store Types
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

// API Error Types
export interface ApiError {
  error: string;
  code?: string;
  details?: string;
}
