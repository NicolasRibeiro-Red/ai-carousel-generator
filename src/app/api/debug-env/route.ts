import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Check which env vars are available (without exposing values)
  const envStatus = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'SET (' + process.env.ANTHROPIC_API_KEY.slice(0, 10) + '...)' : 'NOT SET',
    AI_MODEL: process.env.AI_MODEL || 'NOT SET (using default)',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'SET (' + process.env.OPENAI_API_KEY.slice(0, 7) + '...)' : 'NOT SET (Whisper disabled)',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: 'Environment variables status',
    status: envStatus,
    timestamp: new Date().toISOString(),
  });
}
