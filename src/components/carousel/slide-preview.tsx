'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Download, Loader2, Check, BadgeCheck, Pencil, Trash2 } from 'lucide-react';
import { renderSlideToBlob } from '@/lib/canvas/export';
import type { Slide, TwitterTheme } from '@/types';

// Twitter theme colors for preview
const THEMES = {
  light: {
    background: '#FFFFFF',
    text: '#0F1419',
    textSecondary: '#536471',
    border: '#EFF3F4',
  },
  dim: {
    background: '#15202B',
    text: '#F7F9F9',
    textSecondary: '#8B98A5',
    border: '#38444D',
  },
  dark: {
    background: '#000000',
    text: '#E7E9EA',
    textSecondary: '#71767B',
    border: '#2F3336',
  },
};

interface SlidePreviewProps {
  slide: Slide;
  totalSlides: number;
  theme: TwitterTheme;
  profilePhoto: string | null;
  displayName: string;
  username: string;
  verified: boolean;
  onTextChange?: (slideNumber: number, newText: string) => void;
  onDelete?: (slideNumber: number) => void;
  canDelete?: boolean;
}

export function SlidePreview({
  slide,
  totalSlides,
  theme,
  profilePhoto,
  displayName,
  username,
  verified,
  onTextChange,
  onDelete,
  canDelete = true,
}: SlidePreviewProps) {
  const colors = THEMES[theme];
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(slide.texto);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync editText with slide.texto when it changes externally
  useEffect(() => {
    setEditText(slide.texto);
  }, [slide.texto]);

  // Auto-focus and select text when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditText(slide.texto);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (editText.trim() !== slide.texto && onTextChange) {
      onTextChange(slide.numero, editText.trim());
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(slide.texto);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
    // Don't save on Enter since users might want multi-line text
  };

  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    console.log('Starting download for slide:', slide.numero);
    console.log('Theme:', theme);
    console.log('Profile photo:', profilePhoto);
    console.log('Display name:', displayName);
    console.log('Username:', username);

    try {
      const blob = await renderSlideToBlob(
        slide,
        totalSlides,
        theme,
        profilePhoto,
        displayName,
        username,
        verified
      );

      console.log('Blob created:', blob.size, 'bytes');

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `slide_${slide.numero}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (error) {
      console.error('Download error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      setDownloadError(errorMsg);
      alert('Erro ao baixar: ' + errorMsg);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Twitter-style card preview */}
      <div
        className="relative aspect-[4/5] rounded-xl overflow-hidden border shadow-sm"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}
      >
        {/* Card content */}
        <div className="h-full flex flex-col p-4">
          {/* Header with profile */}
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={profilePhoto || undefined} />
              <AvatarFallback
                className="text-xs font-bold"
                style={{
                  backgroundColor: colors.border,
                  color: colors.textSecondary,
                }}
              >
                {(displayName || username).slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span
                  className="font-bold text-sm truncate"
                  style={{ color: colors.text }}
                >
                  {displayName || username}
                </span>
                {verified && (
                  <BadgeCheck className="w-4 h-4 text-[#1D9BF0] flex-shrink-0" />
                )}
              </div>
              <span
                className="text-xs"
                style={{ color: colors.textSecondary }}
              >
                {username.startsWith('@') ? username : `@${username}`}
              </span>
            </div>
          </div>

          {/* Tweet content - Editable */}
          <div className="flex-1 flex items-center py-4 relative group">
            {isEditing ? (
              <div className="w-full h-full flex flex-col">
                <textarea
                  ref={textareaRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    'flex-1 w-full resize-none bg-transparent border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]',
                    editText.length > 100
                      ? 'text-sm'
                      : editText.length > 60
                        ? 'text-base'
                        : 'text-lg'
                  )}
                  style={{
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                  placeholder="Digite o texto do slide..."
                />
                <div className="flex justify-between items-center mt-2">
                  <span
                    className="text-xs"
                    style={{ color: colors.textSecondary }}
                  >
                    {editText.split(' ').filter(Boolean).length} palavras
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 px-2 text-xs bg-[#1D9BF0] hover:bg-[#1A8CD8]"
                      onClick={handleSaveEdit}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p
                  className={cn(
                    'leading-relaxed cursor-pointer hover:opacity-80 transition-opacity',
                    slide.texto.length > 100
                      ? 'text-sm'
                      : slide.texto.length > 60
                        ? 'text-base'
                        : 'text-lg'
                  )}
                  style={{ color: colors.text }}
                  onClick={handleStartEditing}
                  title="Clique para editar"
                >
                  {slide.texto}
                </p>
                {/* Edit indicator on hover */}
                <button
                  onClick={handleStartEditing}
                  className="absolute top-0 right-0 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: colors.border,
                    color: colors.textSecondary,
                  }}
                  title="Editar texto"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Footer: timestamp + metrics preview */}
          <div
            className="text-xs pt-3 border-t"
            style={{
              color: colors.textSecondary,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center justify-between">
              <span>
                {new Date().toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
                {' · '}
                {new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>{slide.numero}/{totalSlides}</span>
            </div>
          </div>
        </div>

        {/* Slide indicator dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: Math.min(totalSlides, 10) }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1 rounded-full transition-all',
                i + 1 === slide.numero ? 'w-4 bg-[#1D9BF0]' : 'w-1'
              )}
              style={{
                backgroundColor: i + 1 === slide.numero ? '#1D9BF0' : colors.border,
              }}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleDownload}
          disabled={isDownloading || isEditing}
        >
          {isDownloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : downloaded ? (
            <>
              <Check className="w-4 h-4 mr-1 text-green-500" />
              Salvo!
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-1" />
              Baixar
            </>
          )}
        </Button>

        {/* Delete Button */}
        {onDelete && canDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(slide.numero)}
            disabled={isDownloading || isEditing}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
