'use client';

import { useCarouselStore } from '@/stores/carousel-store';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, Settings2, Wand2, Mic, Square } from 'lucide-react';

interface IdeaFormProps {
  onSubmit: () => void;
  error?: string | null;
}

export function IdeaForm({ onSubmit, error }: IdeaFormProps) {
  const {
    formData,
    setFormData,
    isGeneratingHooks,
  } = useCarouselStore();

  const {
    isRecording,
    isTranscribing,
    error: audioError,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  const charCount = formData.ideia.length;
  const isValid = charCount >= 10 && charCount <= 500;
  const isOverLimit = charCount > 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isGeneratingHooks) {
      onSubmit();
    }
  };

  const handleAudioToggle = async () => {
    if (isRecording) {
      const transcription = await stopRecording();
      if (transcription) {
        // Append transcription to existing text or set as new text
        const newText = formData.ideia
          ? `${formData.ideia} ${transcription}`
          : transcription;
        setFormData({ ideia: newText.slice(0, 500) });
      }
    } else {
      await startRecording();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Main Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="ideia" className="text-base font-medium">
                Qual sua ideia? <span className="text-destructive">*</span>
              </Label>
              <Button
                type="button"
                variant={isRecording ? 'destructive' : 'outline'}
                size="sm"
                onClick={handleAudioToggle}
                disabled={isGeneratingHooks || isTranscribing}
                className="gap-2"
              >
                {isTranscribing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transcrevendo...
                  </>
                ) : isRecording ? (
                  <>
                    <Square className="w-4 h-4" />
                    Parar
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Gravar Audio
                  </>
                )}
              </Button>
            </div>
            <div className="relative">
              <Textarea
                id="ideia"
                placeholder="Ex: Como usar respiração para controlar ansiedade no trabalho"
                value={formData.ideia}
                onChange={(e) => setFormData({ ideia: e.target.value })}
                disabled={isGeneratingHooks || isRecording || isTranscribing}
                className={`min-h-[120px] text-base resize-none ${
                  isRecording ? 'border-destructive animate-pulse' : ''
                }`}
                maxLength={550}
              />
              {isRecording && (
                <div className="absolute top-2 right-2 flex items-center gap-2 text-destructive text-sm">
                  <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  Gravando...
                </div>
              )}
            </div>
            {(audioError || error) && (
              <div className="p-3 rounded-lg bg-error-subtle text-error-subtle-foreground text-sm">
                {audioError || error}
              </div>
            )}
            <div className="flex justify-between items-center">
              <span
                aria-live="polite"
                aria-atomic="true"
                className={`text-sm ${
                  isOverLimit
                    ? 'text-destructive'
                    : charCount >= 10
                    ? 'text-success'
                    : 'text-muted-foreground'
                }`}
              >
                {charCount}/500 caracteres
              </span>
              {charCount > 0 && charCount < 10 && (
                <span className="text-sm text-warning">
                  Mínimo 10 caracteres
                </span>
              )}
            </div>
          </div>

          {/* Advanced Settings Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="settings" className="border-none">
              <AccordionTrigger className="hover:no-underline py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Settings2 className="w-4 h-4" />
                  Configurações Avançadas (opcional)
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-6">
                {/* Objetivo */}
                <div className="space-y-2">
                  <Label htmlFor="objetivo">Objetivo</Label>
                  <Select
                    value={formData.objetivo}
                    onValueChange={(value) =>
                      setFormData({
                        objetivo: value as typeof formData.objetivo,
                      })
                    }
                    disabled={isGeneratingHooks}
                  >
                    <SelectTrigger id="objetivo">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Educar">Educar</SelectItem>
                      <SelectItem value="Viralizar">Viralizar</SelectItem>
                      <SelectItem value="Engajar">Engajar</SelectItem>
                      <SelectItem value="Vender">Vender</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tom */}
                <div className="space-y-2">
                  <Label htmlFor="tom">Tom</Label>
                  <Select
                    value={formData.tom}
                    onValueChange={(value) =>
                      setFormData({ tom: value as typeof formData.tom })
                    }
                    disabled={isGeneratingHooks}
                  >
                    <SelectTrigger id="tom">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Técnico">Técnico</SelectItem>
                      <SelectItem value="Inspirador">Inspirador</SelectItem>
                      <SelectItem value="Direto">Direto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Emojis */}
                <div className="space-y-2">
                  <Label htmlFor="emojis">Emojis</Label>
                  <Select
                    value={formData.emojis}
                    onValueChange={(value) =>
                      setFormData({ emojis: value as typeof formData.emojis })
                    }
                    disabled={isGeneratingHooks}
                  >
                    <SelectTrigger id="emojis">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nenhum">Nenhum</SelectItem>
                      <SelectItem value="Poucos">Poucos</SelectItem>
                      <SelectItem value="Muitos">Muitos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Slides Count */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Quantidade de Slides</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="auto-slides"
                        checked={formData.auto_slides}
                        onCheckedChange={(checked) =>
                          setFormData({ auto_slides: checked })
                        }
                        disabled={isGeneratingHooks}
                      />
                      <Label
                        htmlFor="auto-slides"
                        className="flex items-center gap-1.5 text-sm cursor-pointer"
                      >
                        <Wand2 className="w-4 h-4 text-primary" />
                        Automatico
                      </Label>
                    </div>
                  </div>

                  {formData.auto_slides ? (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        A IA vai determinar a quantidade ideal de slides (7-15) baseado no conteudo da sua ideia.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-end">
                        <span className="text-sm font-medium">
                          {formData.slides_count} slides
                        </span>
                      </div>
                      <Slider
                        value={[formData.slides_count]}
                        onValueChange={([value]) =>
                          setFormData({ slides_count: value })
                        }
                        min={7}
                        max={20}
                        step={1}
                        disabled={isGeneratingHooks}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>7</span>
                        <span>20</span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-14 text-lg font-medium"
        disabled={!isValid || isGeneratingHooks || isRecording || isTranscribing}
      >
        {isGeneratingHooks ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gerando hooks...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Gerar Hooks Virais
          </>
        )}
      </Button>
    </form>
  );
}
