import { NextResponse, type NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = ['/login', '/api/auth/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get('breathai_session');

  // If no session and trying to access protected route, redirect to login
  if (!sessionCookie?.value) {
    // Allow API routes to return 401 instead of redirecting
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Nao autenticado', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify session is valid JSON
  try {
    const session = JSON.parse(sessionCookie.value);
    if (!session.user_id || !session.email) {
      throw new Error('Invalid session');
    }
  } catch {
    // Invalid session, clear cookie and redirect
    const response = pathname.startsWith('/api/')
      ? NextResponse.json(
          { error: 'Sessao invalida', code: 'INVALID_SESSION' },
          { status: 401 }
        )
      : NextResponse.redirect(new URL('/login', request.url));

    response.cookies.delete('breathai_session');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
