'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/stores/carousel-store';
import { IdeaForm } from '@/components/forms/idea-form';

export default function DashboardPage() {
  const router = useRouter();
  const { setHooks, setIsGeneratingHooks, formData } = useCarouselStore();
  const [error, setError] = useState<string | null>(null);

  const handleGenerateHooks = async () => {
    setError(null);
    setIsGeneratingHooks(true);

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
        setError(data.error || 'Erro ao gerar hooks');
        return;
      }

      // Passa tanto hooks (string[]) quanto hooksDetailed para compatibilidade
      setHooks(data.hooks, data.hooksDetailed);
      router.push('/hooks');
    } catch (err) {
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Transforme sua ideia em carrossel viral
        </h1>
        <p className="text-lg text-muted-foreground">
          Em menos de 3 minutos
        </p>
      </div>

      {/* Form */}
      <IdeaForm onSubmit={handleGenerateHooks} error={error} />
    </div>
  );
}
