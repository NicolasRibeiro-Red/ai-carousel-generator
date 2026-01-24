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
        { error: 'Email inválido', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    // Check if email is whitelisted
    const supabase = createAdminClient();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, is_whitelisted, role')
      .eq('email', email.toLowerCase())
      .single();

    if (error || !user) {
      // User doesn't exist - not whitelisted
      return NextResponse.json(
        {
          error: 'Email não autorizado. Se você é aluno do curso, entre em contato com o suporte.',
          code: 'EMAIL_NOT_WHITELISTED',
        },
        { status: 403 }
      );
    }

    if (!user.is_whitelisted) {
      return NextResponse.json(
        {
          error: 'Email não autorizado. Se você é aluno do curso, entre em contato com o suporte.',
          code: 'EMAIL_NOT_WHITELISTED',
        },
        { status: 403 }
      );
    }

    // Email is whitelisted
    return NextResponse.json(
      {
        message: 'Email autorizado. Enviando link de acesso...',
        email: email.toLowerCase(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
