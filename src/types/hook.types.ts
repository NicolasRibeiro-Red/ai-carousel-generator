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

export interface HookDetailed {
  texto: string;
  tipo: HookTipo;
  forca: HookForca;
  componentes: string[];
}
