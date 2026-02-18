import { z } from 'zod';
import { containsOffensiveContent } from './offensive-words';
import { LIMITS } from '@/lib/constants';

// Idea validation schema
export const ideaSchema = z
  .string()
  .min(10, 'Descreva sua ideia com mais detalhes (mínimo 10 caracteres)')
  .max(500, 'Simplifique sua ideia (máximo 500 caracteres)')
  .refine(
    (val) => !containsOffensiveContent(val),
    'Conteúdo inadequado detectado. Reformule sua ideia.'
  );

// Username validation schema
export const usernameSchema = z
  .string()
  .max(30, 'Username deve ter no máximo 30 caracteres')
  .regex(
    /^[a-zA-Z0-9_.]*$/,
    'Use apenas letras, números, underscores e pontos'
  )
  .optional()
  .transform((val) => {
    if (!val) return val;
    // Add @ if not present
    return val.startsWith('@') ? val : `@${val}`;
  });

// Email validation schema
export const emailSchema = z
  .string()
  .email('Digite um email válido');

// Form data schema
export const ideaFormSchema = z.object({
  ideia: ideaSchema,
  objetivo: z.enum(['Educar', 'Viralizar', 'Engajar', 'Vender']),
  tom: z.enum(['Técnico', 'Inspirador', 'Direto']),
  emojis: z.enum(['Nenhum', 'Poucos', 'Muitos']),
  slides_count: z.number().min(7).max(20),
});

// Generate hooks request schema
export const generateHooksSchema = z.object({
  ideia: ideaSchema,
  objetivo: z.enum(['Educar', 'Viralizar', 'Engajar', 'Vender']),
  tom: z.enum(['Técnico', 'Inspirador', 'Direto']),
});

// Generate carousel request schema
export const generateCarouselSchema = z.object({
  hook_escolhido: z.string().min(1, 'Selecione um hook'),
  ideia_original: ideaSchema,
  config: z.object({
    objetivo: z.enum(['Educar', 'Viralizar', 'Engajar', 'Vender']),
    tom: z.enum(['Técnico', 'Inspirador', 'Direto']),
    emojis: z.enum(['Nenhum', 'Poucos', 'Muitos']),
    slides_count: z.number().min(7).max(20),
    auto_slides: z.boolean().optional().default(true),
  }),
});

// Slide schema
export const slideSchema = z.object({
  numero: z.number(),
  texto: z.string().refine(
    (val) => val.split(' ').length <= LIMITS.SLIDE_MAX_WORDS,
    'Slide excede o limite de palavras'
  ),
});

// Type exports
export type IdeaFormSchema = z.infer<typeof ideaFormSchema>;
export type GenerateHooksSchema = z.infer<typeof generateHooksSchema>;
export type GenerateCarouselSchema = z.infer<typeof generateCarouselSchema>;
export type SlideSchema = z.infer<typeof slideSchema>;
