// ==========================================
// KNOWLEDGE BASE - Central Export
// Combines all knowledge bases for prompts
// ==========================================

export { IBREATHWORK_KNOWLEDGE_BASE } from './ibreathwork-core';

export {
  HORMOZI_METHODOLOGY,
  HORMOZI_SWIPE_FILE,
  getHooksByTheme,
  getHooksBy7020Rule,
  calculateHookScore,
  detectTheme,
  type SwipeFileHook,
  type HookDistribution,
} from './hormozi-hooks';

// Re-export scientific references
export {
  SCIENTIFIC_REFERENCES,
  getReferencesForTopics,
  getReferenceById,
  formatReferenceAPA,
  getShortCitation,
  TOPIC_LABELS,
  REFERENCES_STATS,
  type ScientificReference,
} from './scientific-refs';

// ==========================================
// COMBINED KNOWLEDGE BASE
// ==========================================

import { IBREATHWORK_KNOWLEDGE_BASE } from './ibreathwork-core';
import { HORMOZI_METHODOLOGY } from './hormozi-hooks';

/**
 * Combined knowledge base for carousel generation
 * Includes both iBreathwork content and Hormozi methodology
 */
export const COMBINED_KNOWLEDGE_BASE = `
${IBREATHWORK_KNOWLEDGE_BASE}

---

${HORMOZI_METHODOLOGY}
`;
