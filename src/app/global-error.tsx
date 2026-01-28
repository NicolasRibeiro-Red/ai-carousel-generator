'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
        }}>
          <div style={{
            maxWidth: '28rem',
            width: '100%',
            textAlign: 'center',
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" x2="12" y1="9" y2="13" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
              </svg>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Erro critico
            </h1>
            <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>
              Ocorreu um erro critico na aplicacao. Por favor, recarregue a pagina.
            </p>

            {error.digest && (
              <p style={{
                fontSize: '0.75rem',
                color: '#71717a',
                fontFamily: 'monospace',
                marginBottom: '1.5rem',
              }}>
                Erro: {error.digest}
              </p>
            )}

            <button
              onClick={reset}
              style={{
                backgroundColor: '#fafafa',
                color: '#0a0a0a',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Recarregar pagina
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
