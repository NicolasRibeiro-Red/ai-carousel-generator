// ==========================================
// Supabase Auth Helper for API Routes
// ==========================================

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { User } from '@supabase/supabase-js';

export interface AuthResult {
  user: User | null;
  error: string | null;
}

/**
 * Get authenticated user from Supabase session
 * Consolidates the repeated Supabase client creation pattern
 */
export async function getAuthenticatedUser(): Promise<AuthResult> {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore cookie setting errors in Server Components
            }
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return { user: null, error: error.message };
    }

    return { user, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    return { user: null, error: message };
  }
}

/**
 * Require authenticated user or throw
 * Use in API routes that require authentication
 */
export async function requireAuth(): Promise<User> {
  const { user, error } = await getAuthenticatedUser();

  if (!user) {
    throw new AuthError(error || 'Not authenticated');
  }

  return user;
}

/**
 * Custom error class for auth failures
 */
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
