// ==========================================
// User Domain Types
// ==========================================

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

export interface RateLimit {
  id: string;
  user_id: string;
  resource: 'hooks' | 'carousels';
  count: number;
  reset_at: string;
  created_at: string;
}
