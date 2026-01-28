'use client';

import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HookCardProps {
  hook: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function HookCard({
  hook,
  index,
  isSelected,
  onSelect,
  disabled,
}: HookCardProps) {
  return (
    <Card
      role="option"
      aria-selected={isSelected}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        'p-4 cursor-pointer transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        isSelected
          ? 'border-primary border-2 bg-primary/5 shadow-md'
          : 'border-border hover:border-primary/50',
        disabled && 'opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none'
      )}
      onClick={disabled ? undefined : onSelect}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-start gap-4">
        {/* Index/Check */}
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
            isSelected
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {isSelected ? <Check className="w-4 h-4" /> : index}
        </div>

        {/* Hook Text */}
        <p
          className={cn(
            'text-lg leading-relaxed pt-1',
            isSelected && 'font-medium'
          )}
        >
          {hook}
        </p>
      </div>
    </Card>
  );
}
