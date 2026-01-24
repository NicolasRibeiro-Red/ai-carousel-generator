-- ==========================================
-- BREATHAI - Initial Database Schema
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- USERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  profile_photo_url TEXT,
  username TEXT,
  is_whitelisted BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'admin')),
  daily_carousel_limit INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Index for whitelist filtering
CREATE INDEX IF NOT EXISTS idx_users_whitelisted ON users(is_whitelisted) WHERE is_whitelisted = TRUE;

-- ==========================================
-- CAROUSELS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS carousels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  original_idea TEXT NOT NULL,
  selected_hook TEXT NOT NULL,
  slides JSONB NOT NULL,
  config JSONB NOT NULL,
  profile_photo_url TEXT,
  username TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '90 days'
);

-- Index for user carousels
CREATE INDEX IF NOT EXISTS idx_carousels_user ON carousels(user_id);

-- Index for sorting by creation date
CREATE INDEX IF NOT EXISTS idx_carousels_created ON carousels(created_at DESC);

-- Index for expiration cleanup
CREATE INDEX IF NOT EXISTS idx_carousels_expires ON carousels(expires_at);

-- ==========================================
-- RATE LIMITS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource TEXT NOT NULL CHECK (resource IN ('hooks', 'carousels')),
  count INTEGER DEFAULT 0,
  reset_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Unique index for user+resource+date combination
CREATE UNIQUE INDEX IF NOT EXISTS idx_rate_limits_user_resource_date
  ON rate_limits(user_id, resource, DATE(reset_at));

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment rate limit
CREATE OR REPLACE FUNCTION increment_rate_limit(
  p_user_id UUID,
  p_resource TEXT
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
  v_reset_at TIMESTAMP WITH TIME ZONE := DATE_TRUNC('day', NOW()) + INTERVAL '1 day';
BEGIN
  -- For hooks, reset hourly
  IF p_resource = 'hooks' THEN
    v_reset_at := DATE_TRUNC('hour', NOW()) + INTERVAL '1 hour';
  END IF;

  -- Upsert rate limit
  INSERT INTO rate_limits (user_id, resource, count, reset_at)
  VALUES (p_user_id, p_resource, 1, v_reset_at)
  ON CONFLICT (user_id, resource, DATE(reset_at))
  DO UPDATE SET count = rate_limits.count + 1
  RETURNING count INTO v_count;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get current rate limit count
CREATE OR REPLACE FUNCTION get_rate_limit_count(
  p_user_id UUID,
  p_resource TEXT
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COALESCE(count, 0) INTO v_count
  FROM rate_limits
  WHERE user_id = p_user_id
    AND resource = p_resource
    AND reset_at > NOW();

  RETURN COALESCE(v_count, 0);
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousels ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Carousels policies
CREATE POLICY "Users can view own carousels"
  ON carousels FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own carousels"
  ON carousels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own carousels"
  ON carousels FOR UPDATE
  USING (auth.uid() = user_id);

-- Mentors can view all carousels
CREATE POLICY "Mentors can view all carousels"
  ON carousels FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('mentor', 'admin')
    )
  );

-- Rate limits policies
CREATE POLICY "Users can view own rate limits"
  ON rate_limits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rate limits"
  ON rate_limits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own rate limits"
  ON rate_limits FOR UPDATE
  USING (auth.uid() = user_id);

-- ==========================================
-- STORAGE BUCKET (run in Supabase Dashboard)
-- ==========================================
-- Note: Execute this in Supabase Dashboard > Storage
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('profile-photos', 'profile-photos', true);

-- Storage policy for profile photos
-- CREATE POLICY "Users can upload own photos"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
