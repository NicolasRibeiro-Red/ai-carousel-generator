import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const paddingMap = {
  sm: 'pt-4',
  md: 'pt-6',
  lg: 'pt-8',
} as const;

const spacingMap = {
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-6',
} as const;

interface FormCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: keyof typeof paddingMap;
  spacing?: keyof typeof spacingMap;
}

export function FormCard({
  children,
  className,
  padding = 'md',
  spacing = 'md',
}: FormCardProps) {
  return (
    <Card className={className}>
      <CardContent className={cn(paddingMap[padding], spacingMap[spacing])}>
        {children}
      </CardContent>
    </Card>
  );
}
