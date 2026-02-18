// ==========================================
// OFFENSIVE WORDS - PT-BR Filter
// Lowercase, sem acentos (normalizados)
// ==========================================

/**
 * Lista de termos ofensivos em PT-BR.
 * Todos em lowercase e sem acentos para matching normalizado.
 */
export const OFFENSIVE_WORDS: string[] = [
  // Insultos gerais
  'merda',
  'bosta',
  'porra',
  'caralho',
  'cacete',
  'foda',
  'fodase',
  'foda-se',
  'fodido',
  'pqp',
  'vsf',
  'vtnc',

  // Termos pejorativos contra pessoas
  'idiota',
  'imbecil',
  'retardado',
  'cretino',
  'babaca',
  'otario',
  'trouxa',
  'burro',
  'estupido',
  'debil',
  'ignorante',
  'vagabundo',

  // Termos sexuais ofensivos
  'puta',
  'putaria',
  'puteiro',
  'piranha',
  'vadia',
  'vagabunda',
  'prostituta',
  'viado',
  'bicha',
  'sapatao',

  // Racismo e preconceito
  'macaco',
  'crioulo',
  'preto sujo',
  'neguinho',
  'mulato',
  'alemao',

  // Capacitismo
  'aleijado',
  'deficiente mental',
  'mongoloide',
  'demente',
  'maluco',

  // Violencia
  'matar',
  'morrer',
  'suicidio',
  'se matar',

  // Discurso de odio
  'nazista',
  'hitler',
  'genocidio',
  'holocausto',
  'terrorista',
  'terrorismo',

  // Drogas ilicitas (contexto de promocao)
  'cocaina',
  'maconha',
  'crack',
  'heroina',
  'metanfetamina',
];

/**
 * Remove acentos de uma string para matching normalizado.
 */
export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Verifica se um texto contem palavras ofensivas.
 * Normaliza acentos para evitar bypass com/sem acentos.
 */
export function containsOffensiveContent(text: string): boolean {
  const normalizedText = removeAccents(text.toLowerCase());
  return OFFENSIVE_WORDS.some(word => normalizedText.includes(word));
}
