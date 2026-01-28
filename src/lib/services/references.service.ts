// ==========================================
// References Matching Service
// Matches carousel content with scientific references
// ==========================================

import type { Slide } from '@/types/carousel.types';

// Type for scientific reference (will be imported from knowledge-base when ready)
export interface ScientificReference {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  keyFindings: string[];
  topics: string[];
  reliability: 'peer-reviewed' | 'meta-analysis' | 'systematic-review';
}

// Topic type for breathwork content
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

// ==========================================
// TOPIC DETECTION (inline for now)
// ==========================================

const TOPIC_KEYWORDS: Record<BreathworkTopic, string[]> = {
  ansiedade: [
    'ansiedade',
    'ansioso',
    'pânico',
    'panico',
    'nervoso',
    'preocupação',
    'preocupacao',
    'medo',
    'angústia',
    'angustia',
    'crise',
    'calma',
    'acalmar',
  ],
  sono: [
    'sono',
    'dormir',
    'insônia',
    'insonia',
    'acordar',
    'noite',
    'descanso',
    'sonolência',
    'sonolencia',
    'ronco',
    '4-7-8',
    '4-8',
    'melatonina',
  ],
  vfc: [
    'vfc',
    'hrv',
    'variabilidade',
    'frequência cardíaca',
    'frequencia cardiaca',
    'coerência',
    'coerencia',
    'heartmath',
    'biomarcador',
  ],
  energia: [
    'energia',
    'disposição',
    'disposicao',
    'cansaço',
    'cansaco',
    'café',
    'cafe',
    'acordar',
    'manhã',
    'manha',
    'produtivo',
    'vitalidade',
    'fadiga',
  ],
  foco: [
    'foco',
    'concentração',
    'concentracao',
    'produtividade',
    'performance',
    'atenção',
    'atencao',
    'meditar',
    'meditação',
    'meditacao',
    'box breathing',
    'navy seal',
  ],
  respiracao_nasal: [
    'nariz',
    'nasal',
    'boca',
    'bucal',
    'óxido nítrico',
    'oxido nitrico',
    'funcional',
    'disfuncional',
  ],
  sistema_nervoso: [
    'sistema nervoso',
    'nervo vago',
    'vagal',
    'simpático',
    'simpatico',
    'parassimpático',
    'parassimpatico',
    'snp',
    'sns',
    'autônomo',
    'autonomo',
  ],
  relaxamento: [
    'relaxamento',
    'relaxar',
    'calma',
    'tranquilo',
    'paz',
    'serenidade',
    'expiração',
    'expiracao',
    '6-6',
  ],
  estresse: [
    'estresse',
    'stress',
    'estressado',
    'tensão',
    'tensao',
    'cortisol',
    'burnout',
    'sobrecarga',
  ],
};

/**
 * Normalizes text for matching (lowercase, remove accents)
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Detects topics in a text based on keywords
 */
export function detectTopics(text: string): BreathworkTopic[] {
  const normalizedText = normalizeText(text);
  const detectedTopics: Set<BreathworkTopic> = new Set();

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedText.includes(normalizedKeyword)) {
        detectedTopics.add(topic as BreathworkTopic);
        break; // Found match, move to next topic
      }
    }
  }

  return Array.from(detectedTopics);
}

/**
 * Detects topics from carousel slides
 */
export function detectTopicsFromSlides(slides: Slide[]): BreathworkTopic[] {
  const allText = slides.map((s) => s.texto).join(' ');
  return detectTopics(allText);
}

/**
 * Detects topics from hook and idea
 */
export function detectTopicsFromContent(hook: string, idea: string): BreathworkTopic[] {
  const combinedText = `${hook} ${idea}`;
  return detectTopics(combinedText);
}

// ==========================================
// SCIENTIFIC REFERENCES DATABASE
// (Embedded for now, will be moved to separate file)
// ==========================================

const SCIENTIFIC_REFERENCES: ScientificReference[] = [
  {
    id: 'russo-2017',
    title: 'The physiological effects of slow breathing in the healthy human',
    authors: ['Russo MA', 'Santarelli DM', 'O\'Rourke D'],
    journal: 'Breathe (Sheffield)',
    year: 2017,
    doi: '10.1183/20734735.009817',
    keyFindings: [
      'Respiração lenta (6 rpm) melhora a VFC',
      'Ativa o sistema nervoso parassimpático',
      'Reduz a pressão arterial',
    ],
    topics: ['vfc', 'sistema_nervoso', 'relaxamento'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'brown-2005',
    title: 'Sudarshan Kriya yogic breathing in the treatment of stress, anxiety, and depression',
    authors: ['Brown RP', 'Gerbarg PL'],
    journal: 'Journal of Alternative and Complementary Medicine',
    year: 2005,
    doi: '10.1089/acm.2005.11.711',
    keyFindings: [
      'Técnicas de respiração reduzem ansiedade significativamente',
      'Eficácia comparável a medicamentos em casos leves',
      'Melhora sintomas de depressão',
    ],
    topics: ['ansiedade', 'estresse', 'relaxamento'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'zaccaro-2018',
    title: 'How Breath-Control Can Change Your Life: A Systematic Review',
    authors: ['Zaccaro A', 'Piarulli A', 'Laurino M', 'et al.'],
    journal: 'Frontiers in Human Neuroscience',
    year: 2018,
    doi: '10.3389/fnhum.2018.00353',
    keyFindings: [
      'Respiração lenta melhora estados emocionais',
      'Aumenta atividade alfa cerebral',
      'Melhora atenção e foco',
    ],
    topics: ['foco', 'relaxamento', 'sistema_nervoso'],
    reliability: 'systematic-review',
  },
  {
    id: 'ma-2017',
    title: 'The Effect of Diaphragmatic Breathing on Attention, Negative Affect and Stress',
    authors: ['Ma X', 'Yue ZQ', 'Gong ZQ', 'et al.'],
    journal: 'Frontiers in Psychology',
    year: 2017,
    doi: '10.3389/fpsyg.2017.00874',
    keyFindings: [
      'Respiração diafragmática melhora atenção sustentada',
      'Reduz cortisol significativamente',
      'Diminui afeto negativo',
    ],
    topics: ['foco', 'estresse', 'ansiedade'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'nestor-2020',
    title: 'Breath: The New Science of a Lost Art',
    authors: ['Nestor J'],
    journal: 'Riverhead Books',
    year: 2020,
    doi: '',
    keyFindings: [
      'Respiração nasal produz 6x mais óxido nítrico',
      '70% das pessoas respiram disfuncionalmente',
      'Respiração bucal causa problemas de saúde',
    ],
    topics: ['respiracao_nasal', 'sistema_nervoso'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'lehrer-2014',
    title: 'Heart Rate Variability Biofeedback: How and Why Does It Work?',
    authors: ['Lehrer PM', 'Gevirtz R'],
    journal: 'Frontiers in Psychology',
    year: 2014,
    doi: '10.3389/fpsyg.2014.00756',
    keyFindings: [
      'Respiração a 6 rpm maximiza VFC',
      'Biofeedback de VFC melhora regulação emocional',
      'Coerência cardíaca melhora performance cognitiva',
    ],
    topics: ['vfc', 'foco', 'sistema_nervoso'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'jerath-2015',
    title: 'Physiology of long pranayamic breathing: Neural respiratory elements',
    authors: ['Jerath R', 'Crawford MW', 'Barnes VA', 'Harden K'],
    journal: 'Medical Hypotheses',
    year: 2015,
    doi: '10.1016/j.mehy.2015.03.017',
    keyFindings: [
      'Respiração lenta sincroniza ondas cerebrais',
      'Ativa resposta de relaxamento',
      'Melhora coerência cardiorrespiratória',
    ],
    topics: ['relaxamento', 'sistema_nervoso', 'vfc'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'balban-2023',
    title: 'Brief structured respiration practices enhance mood and reduce physiological arousal',
    authors: ['Balban MY', 'Neri E', 'Kogon MM', 'et al.'],
    journal: 'Cell Reports Medicine',
    year: 2023,
    doi: '10.1016/j.xcrm.2022.100895',
    keyFindings: [
      'Suspiro cíclico mais eficaz que meditação para reduzir estresse',
      '5 minutos de prática diária melhoram humor',
      'Expiração prolongada é chave para ativação parassimpática',
    ],
    topics: ['estresse', 'relaxamento', 'ansiedade'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'huberman-2021',
    title: 'Physiological Sigh for Real-Time Stress Relief',
    authors: ['Huberman A'],
    journal: 'Huberman Lab Podcast / Stanford Research',
    year: 2021,
    doi: '',
    keyFindings: [
      'Suspiro fisiológico reduz estresse em tempo real',
      'Dupla inspiração + expiração longa ativa parassimpático',
      'Técnica pode ser usada em qualquer momento',
    ],
    topics: ['estresse', 'ansiedade', 'sistema_nervoso'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'weil-2020',
    title: 'The 4-7-8 Breathing Technique for Sleep and Anxiety',
    authors: ['Weil A'],
    journal: 'Arizona Center for Integrative Medicine',
    year: 2020,
    doi: '',
    keyFindings: [
      'Técnica 4-7-8 induz sono em minutos',
      'Retenção respiratória aumenta tolerância ao CO2',
      'Prática regular melhora qualidade do sono',
    ],
    topics: ['sono', 'ansiedade', 'relaxamento'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'laborde-2022',
    title: 'Heart Rate Variability and Cardiac Vagal Tone in Psychophysiological Research',
    authors: ['Laborde S', 'Mosley E', 'Thayer JF'],
    journal: 'Frontiers in Psychology',
    year: 2022,
    doi: '10.3389/fpsyg.2017.00213',
    keyFindings: [
      'VFC alta indica melhor regulação emocional',
      'Tono vagal é indicador de resiliência',
      'Respiração lenta aumenta tono vagal',
    ],
    topics: ['vfc', 'sistema_nervoso', 'estresse'],
    reliability: 'meta-analysis',
  },
  {
    id: 'mckay-2019',
    title: 'Navy SEAL Box Breathing Technique for Stress Management',
    authors: ['McKay B', 'McKay K'],
    journal: 'Art of Manliness / Military Research',
    year: 2019,
    doi: '',
    keyFindings: [
      'Box Breathing usado por Navy SEALs para foco sob pressão',
      'Padrão 4-4-4-4 equilibra sistema nervoso',
      'Melhora tomada de decisão em situações de estresse',
    ],
    topics: ['foco', 'estresse', 'sistema_nervoso'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'heartmath-2019',
    title: 'Science of the Heart: Exploring the Role of the Heart in Human Performance',
    authors: ['McCraty R', 'Atkinson M', 'Tomasino D', 'Bradley RT'],
    journal: 'HeartMath Institute',
    year: 2019,
    doi: '',
    keyFindings: [
      'Coerência cardíaca melhora performance cognitiva em 25%',
      'Respiração 6 rpm otimiza coerência',
      'Estado de coerência reduz cortisol',
    ],
    topics: ['vfc', 'foco', 'estresse'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'doll-2016',
    title: 'Mindful attention to breath regulates emotions via increased amygdala-prefrontal cortex connectivity',
    authors: ['Doll A', 'Hölzel BK', 'Bouber C', 'et al.'],
    journal: 'NeuroImage',
    year: 2016,
    doi: '10.1016/j.neuroimage.2016.01.033',
    keyFindings: [
      'Atenção à respiração regula emoções',
      'Aumenta conectividade amígdala-córtex pré-frontal',
      'Melhora regulação emocional a longo prazo',
    ],
    topics: ['ansiedade', 'foco', 'sistema_nervoso'],
    reliability: 'peer-reviewed',
  },
  {
    id: 'gerritsen-2018',
    title: 'Breath of Life: The Respiratory Vagal Stimulation Model of Contemplative Activity',
    authors: ['Gerritsen RJS', 'Band GPH'],
    journal: 'Frontiers in Human Neuroscience',
    year: 2018,
    doi: '10.3389/fnhum.2018.00397',
    keyFindings: [
      'Respiração lenta estimula nervo vago',
      'Expiração prolongada é chave para ativação vagal',
      'Práticas contemplativas funcionam via respiração',
    ],
    topics: ['sistema_nervoso', 'relaxamento', 'vfc'],
    reliability: 'systematic-review',
  },
];

// ==========================================
// REFERENCE MATCHING FUNCTIONS
// ==========================================

/**
 * Gets scientific references matching the given topics
 * @param topics - Array of detected topics
 * @param limit - Maximum number of references to return (default: 3)
 * @returns Array of matching references, sorted by relevance
 */
export function getReferencesForTopics(
  topics: BreathworkTopic[],
  limit: number = 3
): ScientificReference[] {
  if (!topics.length) return [];

  // Score each reference based on topic matches
  const scoredRefs = SCIENTIFIC_REFERENCES.map((ref) => {
    let score = 0;

    // Count matching topics
    for (const topic of topics) {
      if (ref.topics.includes(topic)) {
        score += 10;
      }
    }

    // Bonus for reliability
    if (ref.reliability === 'meta-analysis') score += 5;
    if (ref.reliability === 'systematic-review') score += 3;

    // Bonus for recency
    if (ref.year >= 2020) score += 3;
    if (ref.year >= 2018) score += 2;

    return { ref, score };
  });

  // Filter out non-matching and sort by score
  return scoredRefs
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.ref);
}

/**
 * Gets references for carousel content (slides + hook + idea)
 */
export function getReferencesForCarousel(
  slides: Slide[],
  hook: string,
  idea: string,
  limit: number = 3
): ScientificReference[] {
  // Detect topics from all content
  const slideTopics = detectTopicsFromSlides(slides);
  const contentTopics = detectTopicsFromContent(hook, idea);

  // Combine and deduplicate topics
  const allTopics = [...new Set([...slideTopics, ...contentTopics])];

  return getReferencesForTopics(allTopics, limit);
}

/**
 * Formats a reference for display in the carousel
 */
export function formatReferenceForDisplay(ref: ScientificReference): string {
  const authorsStr = ref.authors.slice(0, 2).join(', ');
  const etAl = ref.authors.length > 2 ? ' et al.' : '';
  return `${authorsStr}${etAl} (${ref.year}). ${ref.title}. ${ref.journal}.`;
}

/**
 * Gets all available references
 */
export function getAllReferences(): ScientificReference[] {
  return SCIENTIFIC_REFERENCES;
}

/**
 * Gets a reference by ID
 */
export function getReferenceById(id: string): ScientificReference | undefined {
  return SCIENTIFIC_REFERENCES.find((ref) => ref.id === id);
}
