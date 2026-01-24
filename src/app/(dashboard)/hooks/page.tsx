'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/stores/carousel-store';
import { HookList } from '@/components/hooks/hook-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, RefreshCw, Sparkles } from 'lucide-react';

const MAX_REGENERATIONS = 3;

export default function HooksPage() {
  const router = useRouter();
  const {
    hooks,
    setHooks,
    selectedHook,
    setSelectedHook,
    hookRegenerations,
    incrementHookRegenerations,
    formData,
    setCarousel,
    isGeneratingCarousel,
    setIsGeneratingCarousel,
  } = useCarouselStore();

  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if no hooks
  useEffect(() => {
    if (hooks.length === 0) {
      router.push('/');
    }
  }, [hooks, router]);

  const handleRegenerate = async () => {
    if (hookRegenerations >= MAX_REGENERATIONS) {
      setError('Limite de 3 regenerações atingido. Tente uma ideia diferente.');
      return;
    }

    setError(null);
    setIsRegenerating(true);
    setSelectedHook(null);

    try {
      const response = await fetch('/api/generate-hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ideia: formData.ideia,
          objetivo: formData.objetivo,
          tom: formData.tom,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao regenerar hooks');
        return;
      }

      // Filter out duplicates
      const newHooks = data.hooks.filter(
        (hook: string) => !hooks.includes(hook)
      );

      if (newHooks.length < 3) {
        // If too many duplicates, try to use all new hooks anyway
        setHooks(data.hooks, data.hooksDetailed);
      } else {
        // Filter hooksDetailed to match newHooks
        const newHooksDetailed = data.hooksDetailed?.filter(
          (h: { texto: string }) => newHooks.includes(h.texto)
        );
        setHooks(newHooks.slice(0, 5), newHooksDetailed?.slice(0, 5));
      }

      incrementHookRegenerations();
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleGenerateCarousel = async () => {
    if (!selectedHook) return;

    setError(null);
    setIsGeneratingCarousel(true);

    try {
      const response = await fetch('/api/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hook_escolhido: selectedHook,
          ideia_original: formData.ideia,
          config: {
            objetivo: formData.objetivo,
            tom: formData.tom,
            emojis: formData.emojis,
            slides_count: formData.slides_count,
            auto_slides: formData.auto_slides,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao gerar carrossel');
        return;
      }

      setCarousel(data);
      router.push('/preview');
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsGeneratingCarousel(false);
    }
  };

  if (hooks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/')}
          disabled={isRegenerating || isGeneratingCarousel}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Escolha o hook que mais chama atenção</h1>
          <p className="text-muted-foreground">
            Selecione o hook que você quer usar como abertura do carrossel
          </p>
        </div>
      </div>

      {/* Hook List */}
      <HookList
        hooks={hooks}
        selectedHook={selectedHook}
        onSelect={setSelectedHook}
        disabled={isRegenerating || isGeneratingCarousel}
      />

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        {/* Regenerate Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleRegenerate}
          disabled={
            isRegenerating ||
            isGeneratingCarousel ||
            hookRegenerations >= MAX_REGENERATIONS
          }
        >
          {isRegenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando novos hooks...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Gerar Outros Hooks ({MAX_REGENERATIONS - hookRegenerations} restantes)
            </>
          )}
        </Button>

        {/* Generate Carousel Button */}
        {selectedHook && (
          <Button
            size="lg"
            className="w-full h-14 text-lg font-medium"
            onClick={handleGenerateCarousel}
            disabled={isGeneratingCarousel || isRegenerating}
          >
            {isGeneratingCarousel ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Gerando carrossel...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Gerar Carrossel
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
