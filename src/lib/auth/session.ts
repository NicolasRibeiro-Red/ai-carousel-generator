import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export interface Session {
  user_id: string;
  email: string;
}

export async function getSession(): Promise<Session | null> {
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
              // Ignore errors in Server Components
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return {
      user_id: user.id,
      email: user.email || '',
    };
  } catch {
    return null;
  }
}
