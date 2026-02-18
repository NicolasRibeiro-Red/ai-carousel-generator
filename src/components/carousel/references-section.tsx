'use client';

import { BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/status-badge';
import type { ScientificReference } from '@/types';

interface ReferencesSectionProps {
  references: ScientificReference[];
}

function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return `${authors[0]} et al.`;
}

const reliabilityConfig: Record<
  ScientificReference['reliability'],
  { label: string; variant: 'info' | 'warning' | 'success' }
> = {
  'peer-reviewed': { label: 'Revisado por Pares', variant: 'info' },
  'meta-analysis': { label: 'Meta-analise', variant: 'warning' },
  'systematic-review': { label: 'Revisao Sistematica', variant: 'success' },
};

export function ReferencesSection({ references }: ReferencesSectionProps) {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="w-5 h-5" />
          Referencias Cientificas
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Artigos cientificos utilizados para embasar o conteudo deste carrossel
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {references.map((ref) => {
          const config = reliabilityConfig[ref.reliability];
          return (
            <div
              key={ref.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-medium text-sm leading-tight">
                    {ref.title}
                  </h4>
                  <StatusBadge variant={config.variant} label={config.label} />
                </div>

                <p className="text-sm text-muted-foreground">
                  {formatAuthors(ref.authors)} ({ref.year}). <em>{ref.journal}</em>
                </p>

                {ref.keyFindings && ref.keyFindings.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Principais descobertas:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {ref.keyFindings.slice(0, 2).map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-primary">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ref.doi && (
                  <a
                    href={`https://doi.org/${ref.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    DOI: {ref.doi}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
