'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const selectableCardVariants = cva(
  'p-4 cursor-pointer hover-lift transition-colors',
  {
    variants: {
      state: {
        selected: 'border-primary border-2 bg-primary/5 shadow-botanical-lg',
        unselected: 'border-border hover:border-primary/50',
        disabled: 'opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none',
      },
    },
    defaultVariants: {
      state: 'unselected',
    },
  }
);

interface SelectableCardProps {
  children: React.ReactNode;
  index?: number;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  showIndicator?: boolean;
  className?: string;
}

export function SelectableCard({
  children,
  index,
  isSelected,
  onSelect,
  disabled = false,
  showIndicator = true,
  className,
}: SelectableCardProps) {
  const state = disabled ? 'disabled' : isSelected ? 'selected' : 'unselected';

  return (
    <Card
      role="option"
      aria-selected={isSelected}
      tabIndex={disabled ? -1 : 0}
      className={cn(selectableCardVariants({ state }), className)}
      onClick={disabled ? undefined : onSelect}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-start gap-4">
        {showIndicator && (
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
        )}
        {children}
      </div>
    </Card>
  );
}
