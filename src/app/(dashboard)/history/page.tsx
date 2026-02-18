'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, Clock, Loader2 } from 'lucide-react';
import type { Carousel } from '@/types';

export default function HistoryPage() {
  const router = useRouter();
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCarousels() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('carousels')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          setError('Erro ao carregar histórico');
          return;
        }

        setCarousels(data || []);
      } catch (err) {
        setError('Erro ao conectar com o servidor');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCarousels();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Meus Carrosséis</h1>
          <p className="text-muted-foreground">
            Últimos 10 carrosséis gerados
          </p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-error-subtle text-error-subtle-foreground text-sm">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && carousels.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              Você ainda não gerou nenhum carrossel.
            </p>
            <Button onClick={() => router.push('/')}>
              Criar Primeiro Carrossel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Carousels List */}
      {!isLoading && carousels.length > 0 && (
        <div className="space-y-4">
          {carousels.map((carousel) => (
            <Card key={carousel.id} className="hover-lift">
              <CardContent className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Hook */}
                    <h3 className="font-medium truncate">
                      {carousel.selected_hook}
                    </h3>

                    {/* Idea */}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {carousel.original_idea}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(carousel.created_at)}
                      </span>
                      <span>
                        {carousel.slides?.length || 0} slides
                      </span>
                    </div>
                  </div>

                  {/* Download count badge */}
                  {carousel.download_count > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Download className="w-3 h-3" />
                      {carousel.download_count}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
