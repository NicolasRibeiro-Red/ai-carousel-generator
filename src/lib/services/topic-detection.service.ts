// ==========================================
// Topic Detection Service
// ==========================================
// Detects Breathwork topics in text content
// for carousel slides, hooks, and ideas

// ==========================================
// Types
// ==========================================

export type BreathworkTopic =
  | 'ansiedade'
  | 'sono'
  | 'vfc'
  | 'energia'
  | 'foco'
  | 'respiracao_nasal'
  | 'sistema_nervoso'
  | 'relaxamento'
  | 'estresse';

export interface TopicDetectionResult {
  topics: BreathworkTopic[];
  matches: Record<BreathworkTopic, string[]>;
}

export interface SlideInput {
  texto: string;
}

// ==========================================
// Topic Keywords Mapping (PT-BR)
// ==========================================

const TOPIC_KEYWORDS: Record<BreathworkTopic, string[]> = {
  ansiedade: [
    'ansiedade',
    'ansioso',
    'ansiosa',
    'panico',
    'nervoso',
    'nervosa',
    'preocupacao',
    'apreensao',
    'medo',
    'angustia',
    'crise',
    'ataque',
    'transtorno',
    'tag',
    'generalizada',
    'aflicao',
    'inquietacao',
    'tensao',
  ],
  sono: [
    'sono',
    'dormir',
    'insonia',
    'acordar',
    'noite',
    'descanso',
    'sonolencia',
    'ronco',
    '4-7-8',
    'despertar',
    'madrugada',
    'adormecer',
    'soneca',
    'circadiano',
    'melatonina',
    'rem',
    'profundo',
    'leve',
    'qualidade do sono',
    'disturbio',
    'apneia',
  ],
  vfc: [
    'vfc',
    'variabilidade',
    'frequencia cardiaca',
    'hrv',
    'heart rate variability',
    'batimentos',
    'coracao',
    'cardiaco',
    'cardiaca',
    'coherencia cardiaca',
    'coerencia',
    'biofeedback',
    'autonomo',
    'autonomico',
  ],
  energia: [
    'energia',
    'energetico',
    'energetica',
    'disposicao',
    'vitalidade',
    'vigor',
    'cansaco',
    'fadiga',
    'esgotamento',
    'exausto',
    'exausta',
    'burnout',
    'revitalizar',
    'revigorar',
    'animo',
    'estimulante',
    'despertar energia',
    'boost',
    'produtividade',
  ],
  foco: [
    'foco',
    'concentracao',
    'atencao',
    'clareza',
    'mental',
    'cognitivo',
    'cognitiva',
    'produtivo',
    'produtiva',
    'distracao',
    'tdah',
    'deficit',
    'memoria',
    'raciocinio',
    'pensamento',
    'alerta',
    'mindfulness',
    'presente',
    'aqui e agora',
  ],
  respiracao_nasal: [
    'nasal',
    'nariz',
    'narinas',
    'narina',
    'oxido nitrico',
    'filtrar',
    'umidificar',
    'respiracao pelo nariz',
    'boca fechada',
    'tape',
    'fita',
    'mouth taping',
    'oral',
    'bucal',
    'desvio de septo',
    'congestao',
    'entupido',
    'obstrucao',
  ],
  sistema_nervoso: [
    'sistema nervoso',
    'simpatico',
    'parassimpatico',
    'vago',
    'vagal',
    'nervo vago',
    'autonomo',
    'autonomico',
    'fight or flight',
    'luta ou fuga',
    'rest and digest',
    'descanso e digestao',
    'regulacao',
    'desregulado',
    'ativacao',
    'hiperativacao',
    'dorsal',
    'ventral',
    'polyvagal',
    'polivagal',
  ],
  relaxamento: [
    'relaxamento',
    'relaxar',
    'relaxado',
    'relaxada',
    'calma',
    'calmo',
    'tranquilo',
    'tranquila',
    'paz',
    'serenidade',
    'equilibrio',
    'harmonia',
    'bem-estar',
    'descansar',
    'alivio',
    'leveza',
    'suave',
    'gentil',
    'soltar',
    'liberar',
  ],
  estresse: [
    'estresse',
    'stress',
    'estressado',
    'estressada',
    'pressao',
    'sobrecarga',
    'tensao',
    'tenso',
    'tensa',
    'cortisol',
    'adrenalina',
    'cronico',
    'cronica',
    'agudo',
    'aguda',
    'ocupacional',
    'trabalho',
    'demanda',
    'deadline',
    'urgencia',
  ],
};

// ==========================================
// Text Normalization
// ==========================================

/**
 * Normalizes text for robust keyword matching
 * - Converts to lowercase
 * - Removes accents/diacritics
 * - Normalizes whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, ' ') // Replace special chars with space
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// ==========================================
// Topic Detection Functions
// ==========================================

/**
 * Detects all Breathwork topics present in the given text
 * @param text - The text to analyze
 * @returns Array of detected topics (unique, sorted)
 */
export function detectTopics(text: string): BreathworkTopic[] {
  const result = detectTopicsWithMatches(text);
  return result.topics;
}

/**
 * Detects topics with detailed match information
 * @param text - The text to analyze
 * @returns Object with topics array and matches record
 */
export function detectTopicsWithMatches(text: string): TopicDetectionResult {
  const normalizedText = normalizeText(text);
  const matches: Record<BreathworkTopic, string[]> = {
    ansiedade: [],
    sono: [],
    vfc: [],
    energia: [],
    foco: [],
    respiracao_nasal: [],
    sistema_nervoso: [],
    relaxamento: [],
    estresse: [],
  };

  const topics: BreathworkTopic[] = [];

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS) as [BreathworkTopic, string[]][]) {
    const matchedKeywords: string[] = [];

    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);
      // Use word boundary matching for single words, contains for phrases
      if (normalizedKeyword.includes(' ')) {
        // Multi-word phrase: check if contained
        if (normalizedText.includes(normalizedKeyword)) {
          matchedKeywords.push(keyword);
        }
      } else {
        // Single word: use word boundary regex
        const regex = new RegExp(`\\b${escapeRegex(normalizedKeyword)}\\b`);
        if (regex.test(normalizedText)) {
          matchedKeywords.push(keyword);
        }
      }
    }

    if (matchedKeywords.length > 0) {
      topics.push(topic);
      matches[topic] = matchedKeywords;
    }
  }

  return {
    topics: topics.sort(),
    matches,
  };
}

/**
 * Detects topics from an array of slides
 * Combines all slide text and returns unique topics
 * @param slides - Array of slide objects with texto property
 * @returns Array of detected topics (unique, sorted)
 */
export function detectTopicsFromSlides(slides: SlideInput[]): BreathworkTopic[] {
  const combinedText = slides.map((slide) => slide.texto).join(' ');
  return detectTopics(combinedText);
}

/**
 * Detects topics from slides with detailed match information
 * @param slides - Array of slide objects with texto property
 * @returns Object with topics array and matches record
 */
export function detectTopicsFromSlidesWithMatches(slides: SlideInput[]): TopicDetectionResult {
  const combinedText = slides.map((slide) => slide.texto).join(' ');
  return detectTopicsWithMatches(combinedText);
}

/**
 * Gets human-readable topic labels in Portuguese
 */
export function getTopicLabel(topic: BreathworkTopic): string {
  const labels: Record<BreathworkTopic, string> = {
    ansiedade: 'Ansiedade',
    sono: 'Sono',
    vfc: 'Variabilidade da Frequência Cardíaca',
    energia: 'Energia',
    foco: 'Foco e Concentração',
    respiracao_nasal: 'Respiração Nasal',
    sistema_nervoso: 'Sistema Nervoso',
    relaxamento: 'Relaxamento',
    estresse: 'Estresse',
  };
  return labels[topic];
}

/**
 * Gets all available topics
 */
export function getAllTopics(): BreathworkTopic[] {
  return Object.keys(TOPIC_KEYWORDS) as BreathworkTopic[];
}

// ==========================================
// Utility Functions
// ==========================================

/**
 * Escapes special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
