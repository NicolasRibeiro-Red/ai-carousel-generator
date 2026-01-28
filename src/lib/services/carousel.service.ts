// ==========================================
// Carousel Persistence Service
// ==========================================

import { createAdminClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { CAROUSEL_EXPIRATION_DAYS } from '@/lib/constants';
import type { Slide, CarouselConfig } from '@/types';

// ==========================================
// Types
// ==========================================

export interface SaveCarouselParams {
  userId: string;
  originalIdea: string;
  selectedHook: string;
  slides: Slide[];
  config: CarouselConfig;
}

export interface SaveCarouselResult {
  carouselId: string;
  createdAt: string;
  expiresAt: string;
}

// ==========================================
// Service Functions
// ==========================================

/**
 * Save carousel to Supabase
 */
export async function saveCarousel(params: SaveCarouselParams): Promise<SaveCarouselResult> {
  const { userId, originalIdea, selectedHook, slides, config } = params;

  const createdAt = new Date().toISOString();
  const expiresAt = new Date(
    Date.now() + CAROUSEL_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  const adminClient = createAdminClient();

  const { data: savedCarousel, error: saveError } = await adminClient
    .from('carousels')
    .insert({
      user_id: userId,
      original_idea: originalIdea,
      selected_hook: selectedHook,
      slides,
      config,
      download_count: 0,
      created_at: createdAt,
      expires_at: expiresAt,
    })
    .select('id')
    .single();

  if (saveError) {
    logger.error('Failed to save carousel to Supabase', { error: saveError.message });
    // Return a fallback ID - don't fail the request just because we couldn't save
    return {
      carouselId: `carousel-${Date.now()}`,
      createdAt,
      expiresAt,
    };
  }

  return {
    carouselId: savedCarousel.id,
    createdAt,
    expiresAt,
  };
}

/**
 * Get carousel by ID
 */
export async function getCarousel(carouselId: string, userId: string) {
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('carousels')
    .select('*')
    .eq('id', carouselId)
    .eq('user_id', userId)
    .single();

  if (error) {
    logger.error('Failed to fetch carousel', { carouselId, error: error.message });
    return null;
  }

  return data;
}

/**
 * Increment download count
 */
export async function incrementDownloadCount(carouselId: string): Promise<void> {
  const adminClient = createAdminClient();

  const { error } = await adminClient.rpc('increment_download_count', {
    carousel_id: carouselId,
  });

  if (error) {
    logger.error('Failed to increment download count', { carouselId, error: error.message });
  }
}

/**
 * Get user's carousel history
 */
export async function getUserCarousels(userId: string, limit = 20) {
  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from('carousels')
    .select('id, original_idea, selected_hook, created_at, download_count')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    logger.error('Failed to fetch user carousels', { userId, error: error.message });
    return [];
  }

  return data;
}
