import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center rounded font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        info: 'bg-info/10 text-info',
        warning: 'bg-warning-subtle text-warning-subtle-foreground',
        success: 'bg-success-subtle text-success-subtle-foreground',
        error: 'bg-error-subtle text-error-subtle-foreground',
        neutral: 'bg-muted text-muted-foreground',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2 py-0.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  label: string;
  className?: string;
}

export function StatusBadge({ label, variant, size, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant, size }), className)}>
      {label}
    </span>
  );
}
