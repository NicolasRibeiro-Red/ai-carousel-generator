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
  detectThemeMulti,
  type SwipeFileHook,
  type HookDistribution,
  type ThemeMultiResult,
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

