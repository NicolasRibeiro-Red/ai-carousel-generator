'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCarouselStore } from '@/stores/carousel-store';
import { SlidePreview } from '@/components/carousel/slide-preview';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Download,
  Loader2,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  BadgeCheck,
} from 'lucide-react';
import { exportAllSlides } from '@/lib/canvas/export';
import type { TwitterTheme } from '@/types';

export default function PreviewPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    carousel,
    profilePhoto,
    setProfilePhoto,
    displayName,
    setDisplayName,
    username,
    setUsername,
    verified,
    setVerified,
    theme,
    setTheme,
    updateSlideText,
    deleteSlide,
    resetAll,
  } = useCarouselStore();

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Redirect if no carousel
  useEffect(() => {
    if (!carousel || !carousel.slides || carousel.slides.length === 0) {
      router.push('/');
    }
  }, [carousel, router]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setExportError('Formato nao suportado. Use JPG, PNG ou WEBP.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setExportError('Imagem muito grande. Maximo 5MB.');
      return;
    }

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setProfilePhoto(url);
    setExportError(null);
  };

  const handleExport = async () => {
    if (!carousel?.slides) return;

    setIsExporting(true);
    setExportError(null);
    setExportSuccess(false);

    try {
      await exportAllSlides({
        slides: carousel.slides,
        theme,
        profilePhoto,
        displayName: displayName || 'BreathAI',
        username: username || 'breathai',
        verified,
      });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Export error:', err);
      setExportError('Erro ao exportar slides. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleNewCarousel = () => {
    resetAll();
    router.push('/');
  };

  if (!carousel?.slides) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/hooks')}
          disabled={isExporting}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Seu carrossel esta pronto!</h1>
          <p className="text-muted-foreground">
            Personalize o estilo Twitter e baixe seus slides
          </p>
        </div>
      </div>

      {/* Customization Panel */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Row 1: Photo + Name + Username */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <Avatar
                  className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <AvatarImage src={profilePhoto || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Upload className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Foto
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Display Name */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="displayName">Nome de exibicao</Label>
                <Input
                  id="displayName"
                  placeholder="Seu Nome"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={50}
                />
              </div>

              {/* Username */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="username">@username</Label>
                <Input
                  id="username"
                  placeholder="seu_usuario"
                  value={username}
                  onChange={(e) => {
                    let value = e.target.value;
                    // Remove @ if user typed it
                    if (value.startsWith('@')) value = value.slice(1);
                    // Only allow valid characters
                    value = value.replace(/[^a-zA-Z0-9_.]/g, '');
                    setUsername(value);
                  }}
                  maxLength={30}
                />
              </div>
            </div>

            {/* Row 2: Verified + Theme */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t">
              {/* Verified Badge Toggle */}
              <div className="flex items-center gap-3">
                <Switch
                  id="verified"
                  checked={verified}
                  onCheckedChange={setVerified}
                />
                <Label htmlFor="verified" className="flex items-center gap-2 cursor-pointer">
                  <BadgeCheck className="w-5 h-5 text-[#1D9BF0]" />
                  Selo verificado
                </Label>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center gap-3">
                <Label>Tema:</Label>
                <div className="flex rounded-lg border bg-muted p-1">
                  <Button
                    variant={theme === 'light' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dim' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('dim')}
                    className="gap-2"
                  >
                    <Moon className="w-4 h-4 opacity-60" />
                    Dim
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slides Preview */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Preview dos Slides (estilo Twitter/X)</h2>
            <span className="text-sm text-muted-foreground">
              {carousel.slides.length} slides
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Clique no texto para editar. Use a lixeira para remover slides.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {carousel.slides.map((slide, index) => (
            <SlidePreview
              key={`slide-${slide.numero}-${index}`}
              slide={slide}
              totalSlides={carousel.slides.length}
              theme={theme}
              profilePhoto={profilePhoto}
              displayName={displayName || 'BreathAI'}
              username={username || 'breathai'}
              verified={verified}
              onTextChange={updateSlideText}
              onDelete={deleteSlide}
              canDelete={carousel.slides.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Messages */}
      {exportError && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200 text-sm">
          {exportError}
        </div>
      )}

      {exportSuccess && (
        <div className="p-4 rounded-lg bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 text-sm">
          {carousel.slides.length} slides baixados com sucesso!
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full h-14 text-lg font-medium"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Baixando imagens...
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Baixar Todas as Imagens
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleNewCarousel}
          disabled={isExporting}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Gerar Novo Carrossel
        </Button>
      </div>
    </div>
  );
}
