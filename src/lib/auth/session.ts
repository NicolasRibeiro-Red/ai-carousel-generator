import { cookies } from 'next/headers';

export interface Session {
  user_id: string;
  email: string;
  role: string;
  name: string | null;
  logged_in_at: string;
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('breathai_session');

    if (!sessionCookie?.value) {
      return null;
    }

    const session = JSON.parse(sessionCookie.value) as Session;

    if (!session.user_id || !session.email) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('breathai_session');
}
