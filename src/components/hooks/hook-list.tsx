'use client';

import { HookCard } from './hook-card';

interface HookListProps {
  hooks: string[];
  selectedHook: string | null;
  onSelect: (hook: string | null) => void;
  disabled?: boolean;
}

export function HookList({
  hooks,
  selectedHook,
  onSelect,
  disabled,
}: HookListProps) {
  const handleSelect = (hook: string) => {
    if (disabled) return;
    // Toggle selection
    onSelect(selectedHook === hook ? null : hook);
  };

  return (
    <div className="space-y-3">
      {hooks.map((hook, index) => (
        <HookCard
          key={`${hook}-${index}`}
          hook={hook}
          index={index + 1}
          isSelected={selectedHook === hook}
          onSelect={() => handleSelect(hook)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
