import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { emailSchema } from '@/lib/validations/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email format
    const emailValidation = emailSchema.safeParse(email);
    if (!emailValidation.success) {
      return NextResponse.json(
        { error: 'Email invalido', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email is whitelisted
    const supabase = createAdminClient();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, is_whitelisted, role, name')
      .eq('email', normalizedEmail)
      .single();

    if (error || !user) {
      return NextResponse.json(
        {
          error: 'Email nao autorizado. Entre em contato com o suporte.',
          code: 'EMAIL_NOT_FOUND',
        },
        { status: 403 }
      );
    }

    if (!user.is_whitelisted) {
      return NextResponse.json(
        {
          error: 'Email nao autorizado. Entre em contato com o suporte.',
          code: 'EMAIL_NOT_WHITELISTED',
        },
        { status: 403 }
      );
    }

    // Create simple session cookie
    const sessionData = {
      user_id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      logged_in_at: new Date().toISOString(),
    };

    const response = NextResponse.json(
      {
        message: 'Login realizado com sucesso!',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set('breathai_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
