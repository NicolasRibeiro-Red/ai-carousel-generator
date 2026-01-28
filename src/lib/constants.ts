// ==========================================
// BREATHAI - Constants & Configuration
// ==========================================

// Canvas Export Dimensions (Instagram 4:5 portrait)
export const CANVAS = {
  WIDTH: 1080,
  HEIGHT: 1350,
  PADDING: 80,
  AVATAR_SIZE: 100,
} as const;

// Font Stack
export const FONT_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// Twitter Theme Colors
export const THEME_COLORS = {
  light: {
    background: '#FFFFFF',
    text: '#0F1419',
    textSecondary: '#536471',
    border: '#EFF3F4',
  },
  dim: {
    background: '#15202B',
    text: '#F7F9F9',
    textSecondary: '#8B98A5',
    border: '#38444D',
  },
  dark: {
    background: '#000000',
    text: '#E7E9EA',
    textSecondary: '#71767B',
    border: '#2F3336',
  },
} as const;

// Twitter Blue (Verified Badge)
export const TWITTER_BLUE = '#1D9BF0';

// Content Limits
export const LIMITS = {
  IDEA_MIN_LENGTH: 10,
  IDEA_MAX_LENGTH: 500,
  SLIDE_MAX_WORDS: 30,
  SLIDE_VALIDATION_MAX_WORDS: 35,
  MIN_HOOKS: 3,
  MAX_HOOKS: 5,
  MIN_SLIDES: 5,
  MAX_SLIDES: 20,
  DEFAULT_SLIDES: 10,
} as const;

// OpenAI Configuration
export const OPENAI = {
  DEFAULT_MODEL: 'gpt-4o',
  HOOKS_MAX_TOKENS: 800,
  HOOKS_TEMPERATURE: 0.8,
  CAROUSEL_MAX_TOKENS: 2500,
  CAROUSEL_TEMPERATURE: 0.7,
} as const;

// Font Size Thresholds for Canvas
export const FONT_SIZE_THRESHOLDS = [
  { maxLength: 60, fontSize: 72 },
  { maxLength: 100, fontSize: 62 },
  { maxLength: 150, fontSize: 54 },
  { maxLength: 200, fontSize: 48 },
  { maxLength: Infinity, fontSize: 42 },
] as const;

// Line Height Multiplier
export const LINE_HEIGHT_MULTIPLIER = 1.35;

// Slide Indicator Dots
export const DOTS = {
  SPACING: 16,
  ACTIVE_WIDTH: 32,
  INACTIVE_WIDTH: 12,
  HEIGHT: 12,
  RADIUS: 6,
} as const;

// Download Delay (ms between slide downloads)
export const DOWNLOAD_DELAY_MS = 300;

// Carousel Expiration (30 days)
export const CAROUSEL_EXPIRATION_DAYS = 30;

// API Error Codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_INPUT: 'INVALID_INPUT',
  GENERATION_ERROR: 'GENERATION_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  API_RATE_LIMIT: 'API_RATE_LIMIT',
  CONFIG_ERROR: 'CONFIG_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// Error Messages (PT-BR)
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Não autenticado',
  INVALID_INPUT: 'Dados inválidos',
  GENERATION_ERROR_HOOKS: 'Erro ao gerar hooks. Tente novamente.',
  GENERATION_ERROR_CAROUSEL: 'Erro ao gerar carrossel. Tente novamente.',
  PARSE_ERROR: 'Erro ao processar resposta da IA. Tente novamente.',
  INVALID_RESPONSE: 'Resposta inválida da IA. Tente novamente.',
  RATE_LIMIT: 'Limite de requisições da IA atingido. Aguarde 1 minuto.',
  INTERNAL_ERROR: 'Erro interno do servidor',
} as const;

export type ThemeKey = keyof typeof THEME_COLORS;
export type ErrorCode = keyof typeof ERROR_CODES;
