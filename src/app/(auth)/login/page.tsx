'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao fazer login');
        setIsLoading(false);
        return;
      }

      // Login successful - force full page reload to pick up cookie
      window.location.href = '/';
    } catch {
      setError('Erro ao conectar. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">BreathAI</CardTitle>
        <CardDescription className="text-base">
          Transforme suas ideias em carrosseis virais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="h-12"
            />
          </div>

          {error && (
            <div className="p-4 rounded-lg text-sm bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Acesso exclusivo para alunos iBreathwork
        </p>
      </CardContent>
    </Card>
  );
}
