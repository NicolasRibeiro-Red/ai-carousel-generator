'use client';

import { SelectableCard } from '@/components/ui/selectable-card';
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
    <SelectableCard
      index={index}
      isSelected={isSelected}
      onSelect={onSelect}
      disabled={disabled}
    >
      <p
        className={cn(
          'text-lg leading-relaxed pt-1',
          isSelected && 'font-medium'
        )}
      >
        {hook}
      </p>
    </SelectableCard>
  );
}
