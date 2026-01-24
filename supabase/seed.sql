-- ==========================================
-- BREATHAI - Seed Data
-- ==========================================

-- Note: Replace with actual mentor email before running
-- This creates the initial whitelisted users

-- Admin/Mentor user (replace email)
INSERT INTO users (email, name, is_whitelisted, role, daily_carousel_limit)
VALUES
  ('mentor@ibreathwork.com', 'Mentor iBreathwork', true, 'mentor', 20)
ON CONFLICT (email) DO UPDATE SET
  is_whitelisted = true,
  role = 'mentor',
  daily_carousel_limit = 20;

-- Example student users (replace with actual emails)
-- INSERT INTO users (email, name, is_whitelisted, role)
-- VALUES
--   ('aluno1@teste.com', 'Aluno Teste 1', true, 'student'),
--   ('aluno2@teste.com', 'Aluno Teste 2', true, 'student');
