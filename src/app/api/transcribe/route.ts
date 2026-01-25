import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Get session from Supabase
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
              // Ignore
            }
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Nao autenticado', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Get audio file from form data
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Nenhum arquivo de audio enviado', code: 'NO_AUDIO' },
        { status: 400 }
      );
    }

    // Validate file size (max 25MB - Whisper limit)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Maximo 25MB.', code: 'FILE_TOO_LARGE' },
        { status: 400 }
      );
    }

    // Create OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY?.trim(),
    });

    // Transcribe audio using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'pt',
      response_format: 'text',
    });

    return NextResponse.json({
      text: transcription,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Transcription error:', error);

    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Limite de requisicoes atingido. Aguarde 1 minuto.', code: 'API_RATE_LIMIT' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Erro ao transcrever audio', code: 'TRANSCRIPTION_ERROR' },
      { status: 500 }
    );
  }
}
