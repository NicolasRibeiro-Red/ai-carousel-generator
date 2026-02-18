// ==========================================
// REFERÊNCIAS CIENTÍFICAS - BREATHWORK
// Estudos peer-reviewed sobre respiração
// ==========================================

export interface ScientificReference {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  keyFindings: string[];
  topics: string[]; // ansiedade, sono, vfc, energia, foco, respiracao_nasal, sistema_nervoso
  reliability: 'peer-reviewed' | 'meta-analysis' | 'systematic-review';
}

export const SCIENTIFIC_REFERENCES: ScientificReference[] = [
  // ========================================
  // RESPIRAÇÃO LENTA E SISTEMA NERVOSO
  // ========================================
  {
    id: 'russo-2017',
    title: 'The physiological effects of slow breathing in the healthy human',
    authors: ['Russo, M.A.', 'Santarelli, D.M.', 'O\'Rourke, D.'],
    journal: 'Breathe',
    year: 2017,
    doi: '10.1183/20734735.009817',
    keyFindings: [
      'Respiração lenta (6 respirações/min) aumenta a atividade parassimpática',
      'Melhora a variabilidade da frequência cardíaca (VFC)',
      'Reduz a pressão arterial e aumenta a sensibilidade do barorreflexo',
      'Promove bem-estar psicológico e reduz ansiedade'
    ],
    topics: ['sistema_nervoso', 'vfc', 'ansiedade'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'zaccaro-2018',
    title: 'How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing',
    authors: ['Zaccaro, A.', 'Piarulli, A.', 'Laurino, M.', 'et al.'],
    journal: 'Frontiers in Human Neuroscience',
    year: 2018,
    doi: '10.3389/fnhum.2018.00353',
    keyFindings: [
      'Respiração lenta aumenta conforto, relaxamento, prazer e vigor',
      'Reduz sintomas de excitação, ansiedade, depressão, raiva e confusão',
      'Associada a aumento de ondas alfa e diminuição de ondas theta no EEG',
      'Efeitos mediados pelo nervo vago e modulação autonômica'
    ],
    topics: ['sistema_nervoso', 'ansiedade', 'energia'],
    reliability: 'systematic-review'
  },
  {
    id: 'gerritsen-2018',
    title: 'Breath of Life: The Respiratory Vagal Stimulation Model of Contemplative Activity',
    authors: ['Gerritsen, R.J.S.', 'Band, G.P.H.'],
    journal: 'Frontiers in Human Neuroscience',
    year: 2018,
    doi: '10.3389/fnhum.2018.00397',
    keyFindings: [
      'Práticas contemplativas funcionam via estimulação vagal respiratória',
      'Expiração prolongada ativa o sistema nervoso parassimpático',
      'Respiração lenta é o mecanismo comum entre meditação, yoga e tai chi',
      'Tono vagal elevado associado a melhor regulação emocional'
    ],
    topics: ['sistema_nervoso', 'ansiedade'],
    reliability: 'peer-reviewed'
  },

  // ========================================
  // ANSIEDADE E RESPIRAÇÃO
  // ========================================
  {
    id: 'brown-gerbarg-2005',
    title: 'Sudarshan Kriya Yogic Breathing in the Treatment of Stress, Anxiety, and Depression',
    authors: ['Brown, R.P.', 'Gerbarg, P.L.'],
    journal: 'Journal of Alternative and Complementary Medicine',
    year: 2005,
    doi: '10.1089/acm.2005.11.711',
    keyFindings: [
      'Sudarshan Kriya eficaz para depressão, ansiedade e TEPT',
      'Melhora regulação do sistema nervoso autônomo',
      'Reduz níveis de cortisol e aumenta prolactina',
      'Resultados comparáveis a medicamentos em alguns estudos'
    ],
    topics: ['ansiedade', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'ma-2017',
    title: 'The Effect of Diaphragmatic Breathing on Attention, Negative Affect and Stress in Healthy Adults',
    authors: ['Ma, X.', 'Yue, Z.Q.', 'Gong, Z.Q.', 'et al.'],
    journal: 'Frontiers in Psychology',
    year: 2017,
    doi: '10.3389/fpsyg.2017.00874',
    keyFindings: [
      'Respiração diafragmática reduz cortisol significativamente',
      'Melhora atenção e reduz afeto negativo',
      'Intervenção de baixo custo e alto benefício',
      '20 sessões de treino produzem resultados duradouros'
    ],
    topics: ['ansiedade', 'foco'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'hopper-2019',
    title: 'Effectiveness of diaphragmatic breathing for reducing physiological and psychological stress in adults',
    authors: ['Hopper, S.I.', 'Murray, S.L.', 'Ferrara, L.R.', 'Singleton, J.K.'],
    journal: 'JBI Database of Systematic Reviews',
    year: 2019,
    doi: '10.11124/JBISRIR-2017-003848',
    keyFindings: [
      'Respiração diafragmática reduz estresse fisiológico e psicológico',
      'Eficaz para redução de pressão arterial e frequência cardíaca',
      'Benefícios observados em populações clínicas e saudáveis',
      'Recomendada como intervenção de primeira linha para estresse'
    ],
    topics: ['ansiedade', 'sistema_nervoso'],
    reliability: 'systematic-review'
  },

  // ========================================
  // VFC / HRV E COERÊNCIA CARDÍACA
  // ========================================
  {
    id: 'lehrer-2014',
    title: 'Heart Rate Variability Biofeedback: How and Why Does It Work?',
    authors: ['Lehrer, P.M.', 'Gevirtz, R.'],
    journal: 'Frontiers in Psychology',
    year: 2014,
    doi: '10.3389/fpsyg.2014.00756',
    keyFindings: [
      'Biofeedback de VFC eficaz para ansiedade, depressão e asma',
      'Respiração em ~6 rpm maximiza amplitude de VFC',
      'Treina o sistema barorreflexo e melhora regulação autonômica',
      'Efeitos duradouros após período de treinamento'
    ],
    topics: ['vfc', 'ansiedade', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'mccraty-2015',
    title: 'Heart Rate Variability: New Perspectives on Physiological Mechanisms, Assessment of Self-regulatory Capacity, and Health Risk',
    authors: ['McCraty, R.', 'Shaffer, F.'],
    journal: 'Global Advances in Health and Medicine',
    year: 2015,
    doi: '10.7453/gahmj.2014.073',
    keyFindings: [
      'VFC é indicador de saúde e resiliência do sistema nervoso',
      'Coerência cardíaca associada a melhor desempenho cognitivo',
      'Respiração coerente (0.1 Hz / 6 rpm) otimiza VFC',
      'VFC baixa prediz mortalidade e morbidade cardiovascular'
    ],
    topics: ['vfc', 'sistema_nervoso', 'foco'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'shaffer-ginsberg-2017',
    title: 'An Overview of Heart Rate Variability Metrics and Norms',
    authors: ['Shaffer, F.', 'Ginsberg, J.P.'],
    journal: 'Frontiers in Public Health',
    year: 2017,
    doi: '10.3389/fpubh.2017.00258',
    keyFindings: [
      'VFC é biomarcador de saúde e capacidade adaptativa',
      'Respiração lenta é intervenção mais eficaz para aumentar VFC',
      'Normas estabelecidas para diferentes faixas etárias',
      'VFC pode ser melhorada com treinamento respiratório'
    ],
    topics: ['vfc', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },

  // ========================================
  // SONO E RESPIRAÇÃO
  // ========================================
  {
    id: 'jerath-2006',
    title: 'Physiology of long pranayamic breathing: Neural respiratory elements may provide a mechanism that explains how slow deep breathing shifts the autonomic nervous system',
    authors: ['Jerath, R.', 'Edry, J.W.', 'Barnes, V.A.', 'Jerath, V.'],
    journal: 'Medical Hypotheses',
    year: 2006,
    doi: '10.1016/j.mehy.2006.02.042',
    keyFindings: [
      'Respiração lenta ativa o sistema nervoso parassimpático',
      'Facilita transição para estados de relaxamento profundo',
      'Mecanismo envolve reflexos pulmonares e modulação vagal',
      'Base fisiológica para efeitos do pranayama no sono'
    ],
    topics: ['sono', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'tsai-2015',
    title: 'The Effect of Yoga Exercise on Improving Depression, Anxiety, and Fatigue in Women with Breast Cancer',
    authors: ['Tsai, H.J.', 'Kuo, T.B.', 'Lee, G.S.', 'Yang, C.C.'],
    journal: 'Journal of Nursing Research',
    year: 2015,
    doi: '10.1097/jnr.0000000000000044',
    keyFindings: [
      'Exercícios respiratórios melhoram qualidade do sono',
      'Redução de fadiga e melhora de humor',
      'Efeitos mediados por modulação autonômica',
      'Prática regular produz benefícios cumulativos'
    ],
    topics: ['sono', 'ansiedade', 'energia'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'vierra-2022',
    title: 'Effects of sleep deprivation and 4-7-8 breathing control on heart rate variability, blood pressure, blood glucose, and endothelial function in healthy young adults',
    authors: ['Vierra, J.', 'Boonla, O.', 'Prasertsri, P.'],
    journal: 'Physiological Reports',
    year: 2022,
    doi: '10.14814/phy2.15389',
    keyFindings: [
      'Técnica 4-7-8 melhora VFC após privação de sono',
      'Reduz pressão arterial e melhora função endotelial',
      'Atenua efeitos negativos da falta de sono',
      'Prática simples com benefícios cardiovasculares'
    ],
    topics: ['sono', 'vfc', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },

  // ========================================
  // RESPIRAÇÃO NASAL
  // ========================================
  {
    id: 'lundberg-1995',
    title: 'Inhalation of nasally derived nitric oxide modulates pulmonary function in humans',
    authors: ['Lundberg, J.O.', 'Settergren, G.', 'Gelinder, S.', 'et al.'],
    journal: 'Acta Physiologica Scandinavica',
    year: 1995,
    doi: '10.1111/j.1748-1716.1995.tb09960.x',
    keyFindings: [
      'Seios paranasais produzem óxido nítrico (NO)',
      'Respiração nasal aumenta NO nos pulmões em 6x vs bucal',
      'NO tem efeitos broncodilatadores e vasodilatadores',
      'Respiração nasal otimiza oxigenação sanguínea'
    ],
    topics: ['respiracao_nasal', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'bresolin-1983',
    title: 'Mouth breathing and its relationship to some oral and medical conditions',
    authors: ['Bresolin, D.', 'Shapiro, P.A.', 'Shapiro, G.G.', 'et al.'],
    journal: 'Journal of Dentistry for Children',
    year: 1983,
    doi: 'N/A',
    keyFindings: [
      'Respiração bucal associada a problemas ortodônticos',
      'Afeta desenvolvimento craniofacial em crianças',
      'Relacionada a distúrbios do sono e apneia',
      'Respiração nasal essencial para desenvolvimento saudável'
    ],
    topics: ['respiracao_nasal', 'sono'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'recinto-2017',
    title: 'Effects of Nasal or Oral Breathing on Anaerobic Power Output and Metabolic Responses',
    authors: ['Recinto, C.', 'Efthemeou, T.', 'Boffelli, P.T.', 'Navalta, J.W.'],
    journal: 'International Journal of Exercise Science',
    year: 2017,
    doi: 'N/A - PMID: 28966711',
    keyFindings: [
      'Respiração nasal durante exercício reduz ventilação necessária',
      'Maior eficiência de troca gasosa com respiração nasal',
      'Atletas podem se beneficiar de treino de respiração nasal',
      'Respiração nasal reduz percepção de esforço'
    ],
    topics: ['respiracao_nasal', 'energia'],
    reliability: 'peer-reviewed'
  },

  // ========================================
  // BOX BREATHING E FOCO
  // ========================================
  {
    id: 'balban-2023',
    title: 'Brief structured respiration practices enhance mood and reduce physiological arousal',
    authors: ['Balban, M.Y.', 'Neri, E.', 'Kogon, M.M.', 'et al.'],
    journal: 'Cell Reports Medicine',
    year: 2023,
    doi: '10.1016/j.xcrm.2022.100895',
    keyFindings: [
      'Suspiro cíclico (expiração prolongada) mais eficaz que meditação mindfulness',
      '5 minutos diários suficientes para efeitos significativos',
      'Reduz ansiedade e melhora humor de forma duradoura',
      'Controle ativo da respiração supera técnicas passivas'
    ],
    topics: ['ansiedade', 'foco', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'prinsloo-2011',
    title: 'The effect of short duration heart rate variability (HRV) biofeedback on cognitive performance during laboratory induced cognitive stress',
    authors: ['Prinsloo, G.E.', 'Rauch, H.G.L.', 'Lambert, M.I.', 'et al.'],
    journal: 'Applied Cognitive Psychology',
    year: 2011,
    doi: '10.1002/acp.1750',
    keyFindings: [
      'Biofeedback de VFC melhora desempenho cognitivo sob estresse',
      'Sessões curtas (10 min) produzem efeitos significativos',
      'Respiração controlada reduz impacto do estresse na cognição',
      'Aplicável em ambientes de alta demanda (militares, executivos)'
    ],
    topics: ['foco', 'vfc', 'ansiedade'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'goessl-2017',
    title: 'The effect of heart rate variability biofeedback training on stress and anxiety: a meta-analysis',
    authors: ['Goessl, V.C.', 'Curtiss, J.E.', 'Hofmann, S.G.'],
    journal: 'Psychological Medicine',
    year: 2017,
    doi: '10.1017/S0033291717001003',
    keyFindings: [
      'Biofeedback de VFC tem efeito grande em redução de estresse (g=0.81)',
      'Efeito moderado-grande para ansiedade (g=0.53)',
      'Eficaz tanto em populações clínicas quanto saudáveis',
      'Respiração é componente central do treinamento de VFC'
    ],
    topics: ['ansiedade', 'vfc', 'foco'],
    reliability: 'meta-analysis'
  },

  // ========================================
  // NERVO VAGO E SISTEMA NERVOSO
  // ========================================
  {
    id: 'porges-2011',
    title: 'The Polyvagal Perspective',
    authors: ['Porges, S.W.'],
    journal: 'Biological Psychology',
    year: 2011,
    doi: '10.1016/j.biopsycho.2006.06.009',
    keyFindings: [
      'Teoria Polivagal explica estados de segurança, perigo e ameaça vital',
      'Sistema de engajamento social depende do tono vagal',
      'Respiração modula atividade vagal e estados emocionais',
      'Base neurofisiológica para efeitos de breathwork'
    ],
    topics: ['sistema_nervoso', 'ansiedade'],
    reliability: 'peer-reviewed'
  },
  {
    id: 'laborde-2017',
    title: 'Heart Rate Variability and Cardiac Vagal Tone in Psychophysiological Research',
    authors: ['Laborde, S.', 'Mosley, E.', 'Thayer, J.F.'],
    journal: 'Frontiers in Psychology',
    year: 2017,
    doi: '10.3389/fpsyg.2017.00213',
    keyFindings: [
      'VFC como índice de tono vagal cardíaco',
      'Maior VFC associada a melhor autorregulação',
      'Respiração é principal modulador de VFC de curto prazo',
      'Diretrizes para uso de VFC em pesquisa'
    ],
    topics: ['vfc', 'sistema_nervoso'],
    reliability: 'peer-reviewed'
  }
];

/**
 * Filtra referências científicas por tópicos
 * @param topics - Array de tópicos para filtrar (ansiedade, sono, vfc, energia, foco, respiracao_nasal, sistema_nervoso)
 * @param limit - Número máximo de referências a retornar (opcional)
 * @returns Array de referências que correspondem aos tópicos
 */
export function getReferencesForTopics(
  topics: string[],
  limit?: number
): ScientificReference[] {
  const normalizedTopics = topics.map(t => t.toLowerCase().trim());

  const filtered = SCIENTIFIC_REFERENCES.filter(ref =>
    ref.topics.some(refTopic =>
      normalizedTopics.some(topic =>
        refTopic.toLowerCase().includes(topic) || topic.includes(refTopic.toLowerCase())
      )
    )
  );

  // Ordena por relevância (mais tópicos correspondentes primeiro)
  const sorted = filtered.sort((a, b) => {
    const aMatches = a.topics.filter(t =>
      normalizedTopics.some(nt => t.toLowerCase().includes(nt) || nt.includes(t.toLowerCase()))
    ).length;
    const bMatches = b.topics.filter(t =>
      normalizedTopics.some(nt => t.toLowerCase().includes(nt) || nt.includes(t.toLowerCase()))
    ).length;
    return bMatches - aMatches;
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Obtém referências por nível de confiabilidade
 * @param reliability - Tipo de confiabilidade desejada
 * @returns Array de referências com o nível de confiabilidade especificado
 */
export function getReferencesByReliability(
  reliability: 'peer-reviewed' | 'meta-analysis' | 'systematic-review'
): ScientificReference[] {
  return SCIENTIFIC_REFERENCES.filter(ref => ref.reliability === reliability);
}

/**
 * Obtém uma referência específica por ID
 * @param id - ID da referência (ex: 'russo-2017')
 * @returns A referência encontrada ou undefined
 */
export function getReferenceById(id: string): ScientificReference | undefined {
  return SCIENTIFIC_REFERENCES.find(ref => ref.id === id);
}

/**
 * Formata uma referência no estilo APA
 * @param ref - Referência científica
 * @returns String formatada no estilo APA
 */
export function formatReferenceAPA(ref: ScientificReference): string {
  const authorList = ref.authors.length > 2
    ? `${ref.authors[0]} et al.`
    : ref.authors.join(' & ');

  return `${authorList} (${ref.year}). ${ref.title}. ${ref.journal}. DOI: ${ref.doi}`;
}

/**
 * Obtém citação curta para uso em carrosséis
 * @param ref - Referência científica
 * @returns String de citação curta (ex: "Russo et al., 2017")
 */
export function getShortCitation(ref: ScientificReference): string {
  const firstAuthor = ref.authors[0].split(',')[0];
  const suffix = ref.authors.length > 1 ? ' et al.' : '';
  return `${firstAuthor}${suffix}, ${ref.year}`;
}

// Mapeamento de tópicos para português
export const TOPIC_LABELS: Record<string, string> = {
  ansiedade: 'Ansiedade',
  sono: 'Sono',
  vfc: 'Variabilidade da Frequência Cardíaca',
  energia: 'Energia',
  foco: 'Foco e Concentração',
  respiracao_nasal: 'Respiração Nasal',
  sistema_nervoso: 'Sistema Nervoso'
};

// Estatísticas da base de referências
export const REFERENCES_STATS = {
  total: SCIENTIFIC_REFERENCES.length,
  byReliability: {
    'peer-reviewed': SCIENTIFIC_REFERENCES.filter(r => r.reliability === 'peer-reviewed').length,
    'meta-analysis': SCIENTIFIC_REFERENCES.filter(r => r.reliability === 'meta-analysis').length,
    'systematic-review': SCIENTIFIC_REFERENCES.filter(r => r.reliability === 'systematic-review').length
  },
  yearRange: {
    oldest: Math.min(...SCIENTIFIC_REFERENCES.map(r => r.year)),
    newest: Math.max(...SCIENTIFIC_REFERENCES.map(r => r.year))
  }
};
