// ==========================================
// Carousel Domain Types
// ==========================================

import type { ScientificReference } from './api.types';

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
  scientific_references?: ScientificReference[];
}

// Twitter-style theme options
export type TwitterTheme = 'light' | 'dim' | 'dark';
