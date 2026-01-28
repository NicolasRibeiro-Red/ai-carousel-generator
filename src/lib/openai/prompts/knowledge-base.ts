// ==========================================
// BASE DE CONHECIMENTO - COMPATIBILIDADE
// Redireciona para a nova estrutura modular
// ==========================================

// Re-export from modular structure for backwards compatibility
export { IBREATHWORK_KNOWLEDGE_BASE } from './knowledge-base/ibreathwork-core';

export {
  HORMOZI_METHODOLOGY,
  HORMOZI_SWIPE_FILE,
  getHooksByTheme,
  getHooksBy7020Rule,
  calculateHookScore,
  detectTheme,
  type SwipeFileHook,
  type HookDistribution,
} from './knowledge-base/hormozi-hooks';

// Combined knowledge base - import directly to avoid circular reference
import { IBREATHWORK_KNOWLEDGE_BASE as KB } from './knowledge-base/ibreathwork-core';
import { HORMOZI_METHODOLOGY as HM } from './knowledge-base/hormozi-hooks';

export const COMBINED_KNOWLEDGE_BASE = `
${KB}

---

${HM}
`;
