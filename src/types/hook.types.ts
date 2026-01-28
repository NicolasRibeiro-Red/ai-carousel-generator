// ==========================================
// Hook Domain Types
// ==========================================

export type HookTipo =
  | 'comando'
  | 'declaracao'
  | 'condicional'
  | 'lista'
  | 'pergunta_sim'
  | 'rotulo'
  | 'pergunta_aberta'
  | 'narrativa';

export type HookForca = 'alta' | 'media-alta' | 'media';

export type HookDistribution = 'proven' | 'adjacent' | 'experimental';

export interface HookValidation {
  hasCallOut: boolean;
  hasValuePromise: boolean;
  wordCount: number;
  isValid: boolean;
}

export interface HookDetailed {
  texto: string;
  tipo: HookTipo;
  forca: HookForca;
  componentes: string[];
  distribution?: HookDistribution;
  scoreEstimate?: number;
  validation?: HookValidation;
}
