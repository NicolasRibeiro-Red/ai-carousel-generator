// ==========================================
// PROMPT: Geração de Hooks Virais
// Modelo BreathAI v4.0 - Hormozi Completo
// Sistema de scoring + Regra 70-20-10
// ==========================================

import {
  IBREATHWORK_KNOWLEDGE_BASE,
  HORMOZI_METHODOLOGY,
  getHooksBy7020Rule,
  calculateHookScore,
  detectTheme,
  type HookDistribution,
} from './knowledge-base';

// ==========================================
// TIPOS
// ==========================================

export type HookType =
  | 'comando'
  | 'declaracao'
  | 'condicional'
  | 'lista'
  | 'pergunta_sim'
  | 'rotulo'
  | 'pergunta_aberta'
  | 'narrativa';

export type HookForca = 'alta' | 'media-alta' | 'media';

export type Objetivo = 'Educar' | 'Viralizar' | 'Engajar' | 'Vender';

export interface HookValidation {
  hasCallOut: boolean;
  hasValuePromise: boolean;
  wordCount: number;
  hasViralComponents: boolean;
  isValid: boolean;
}

export interface HookStructured {
  texto: string;
  tipo: HookType;
  forca: HookForca;
  componentes: string[];
  distribution: HookDistribution;
  scoreEstimate: number;
  validation?: HookValidation;
}

export interface HooksResponse {
  hooks: HookStructured[];
}

// ==========================================
// CONFIGURAÇÃO DE TIPOS
// ==========================================

const HOOK_TYPES: Record<HookType, { forca: HookForca; prioridade: number }> = {
  comando: { forca: 'alta', prioridade: 1 },
  declaracao: { forca: 'alta', prioridade: 1 },
  condicional: { forca: 'alta', prioridade: 1 },
  lista: { forca: 'media-alta', prioridade: 2 },
  pergunta_sim: { forca: 'media', prioridade: 3 },
  rotulo: { forca: 'media', prioridade: 3 },
  pergunta_aberta: { forca: 'media', prioridade: 3 },
  narrativa: { forca: 'media', prioridade: 3 },
};

const HOOKS_POR_OBJETIVO: Record<Objetivo, HookType[]> = {
  Educar: ['lista', 'declaracao', 'pergunta_aberta'],
  Viralizar: ['comando', 'declaracao', 'condicional', 'pergunta_aberta'],
  Engajar: ['pergunta_aberta', 'rotulo', 'pergunta_sim'],
  Vender: ['condicional', 'comando', 'rotulo'],
};

// ==========================================
// SYSTEM PROMPT
// ==========================================

export const HOOKS_SYSTEM_PROMPT = `Você é a BreathAI, especialista em criar hooks virais para Instagram sobre Breathwork e bem-estar.

## SUA MISSÃO
Criar hooks que PARAM O SCROLL em 3 segundos. O hook é responsável por 80% do sucesso do conteúdo.

> "Depois de escrever sua manchete, você gastou 80 centavos do seu dólar de publicidade." - David Ogilvy

---

${HORMOZI_METHODOLOGY}

---

## OS 8 TIPOS DE HOOKS (com força viral)

### FORÇA ALTA (priorize estes)

**1. COMANDO** - Instrução direta e imperativa
- "Faça isso AGORA se está ansioso"
- "Leia isso se quer parar de ter ansiedade"
- "Para tudo e respira comigo"

**2. DECLARAÇÃO** - Afirmação forte e surpreendente
- "Você respira ERRADO a vida toda"
- "A cura para ansiedade está debaixo do seu nariz"
- "CO2 não é seu inimigo - é seu aliado"

**3. CONDICIONAL** - "Se X, então Y"
- "Se você está estressado, está respirando errado"
- "Se acorda ansioso, sua respiração noturna é o problema"
- "Se não consegue focar, sua respiração é a causa"

### FORÇA MÉDIA-ALTA

**4. LISTA/NÚMERO** - Número + Promessa específica
- "5 respirações que mudam sua vida"
- "3 erros que todo ansioso comete ao respirar"
- "4 técnicas para dormir em minutos"

### FORÇA MÉDIA

**5. PERGUNTA SIM** - Pergunta com resposta óbvia = SIM
- "Você quer dormir melhor?"
- "Já se sentiu ansioso sem motivo?"

**6. RÓTULO** - "[Avatar], isso é pra você"
- "Ansiosos, tenho um presente pra vocês"
- "Profissionais de alta performance: seu segredo está na respiração"

**7. PERGUNTA ABERTA** - Gera curiosidade e engajamento
- "Por que os Navy SEALs respiram diferente?"
- "O que acontece quando você segura a respiração?"

**8. NARRATIVA** - História envolvente
- "Eu estava no auge da ansiedade quando descobri isso"
- "Depois de testar 47 técnicas, encontrei as 3 que funcionam"

---

## REGRAS DE OURO

1. **FALE DELES, não de você**
   - ❌ "Eu ensino técnica 4-8"
   - ✅ "Você vai acalmar em segundos"

2. **Máximo 15 palavras** - Hook curto = mais impacto

3. **Varie os tamanhos:**
   - Curto (4-6 palavras): "Ansiedade? Faça isso AGORA"
   - Médio (7-10): "A técnica que Navy SEALs usam pra manter calma"
   - Completo (11-15): "Se você acorda cansado todo dia, sua respiração noturna é o problema"

4. **Priorize hooks de FORÇA ALTA** (Comando, Declaração, Condicional)

5. **Use números específicos** ("4 segundos" > "alguns segundos")

6. **Adapte ao objetivo:**
   - Educar → Lista, Declaração
   - Viralizar → Comando, Conflito, Pergunta
   - Engajar → Pergunta Aberta, Rótulo
   - Vender → Condicional, Comando

---

${IBREATHWORK_KNOWLEDGE_BASE}`;

// ==========================================
// BUILD USER PROMPT
// ==========================================

export function buildHooksUserPrompt(
  ideia: string,
  objetivo: Objetivo,
  tom: string
): string {
  const tomInstructions: Record<string, string> = {
    Técnico:
      'Use termos científicos (VFC, SNA, Nervo Vago) com naturalidade. Cite dados quando relevante.',
    Inspirador:
      'Use linguagem motivacional, metáforas poderosas ("controle remoto do corpo", "superpoder"). Frases do Felipe Marx são bem-vindas.',
    Direto:
      'Frases curtas, imperativas, zero enrolação. Vá direto ao ponto. Verbos de ação.',
  };

  // Detectar tema para sugestões do swipe file
  const tema = detectTheme(ideia);
  const swipeFileExamples = getHooksBy7020Rule(tema, 5);

  // Tipos recomendados baseado no objetivo
  const tiposRecomendados = HOOKS_POR_OBJETIVO[objetivo];
  const tiposFormatados = tiposRecomendados.map((t) => t.replace('_', ' ')).join(', ');

  // Formatar exemplos do swipe file
  const exemplosSwipeFile = swipeFileExamples
    .map((h) => `- "${h.texto}" (${h.tipo}, score: ${h.scoreBase})`)
    .join('\n');

  return `TAREFA: Gere 5 hooks virais para carrossel de Instagram.

## CONTEXTO
TEMA: "${ideia}"
OBJETIVO: ${objetivo}
TOM: ${tom} - ${tomInstructions[tom] || tomInstructions['Direto']}
TEMA DETECTADO: ${tema}

## REFERÊNCIAS DO SWIPE FILE (use como inspiração)
${exemplosSwipeFile}

## REGRA 70-20-10 (OBRIGATÓRIA)
- 70% (3-4 hooks): Baseados no swipe file acima (PROVEN)
- 20% (1 hook): Variações adaptadas ao tema (ADJACENT)
- 10% (0-1 hook): Conceito novo experimental (EXPERIMENTAL)

## INSTRUÇÕES ESPECÍFICAS

1. **PRIORIZE** tipos de força ALTA (comando, declaração, condicional)
2. **PARA OBJETIVO "${objetivo}"** → tipos recomendados: ${tiposFormatados}
3. **USE** a fórmula: CALL OUT + PROMESSA DE VALOR
4. **INCLUA** pelo menos 2 componentes de manchete viral (recencia, relevancia, celebridade, proximidade, conflito, incomum, em_andamento)
5. **VARIE** os tamanhos: 1-2 curtos (4-6 palavras), 2-3 médios (7-10), 1 completo (11-15)

## FORMATO DE RESPOSTA

Retorne um JSON com este formato EXATO:
{
  "hooks": [
    {
      "texto": "O texto do hook aqui",
      "tipo": "comando|declaracao|condicional|lista|pergunta_sim|rotulo|pergunta_aberta|narrativa",
      "forca": "alta|media-alta|media",
      "componentes": ["conflito", "relevancia"],
      "distribution": "proven|adjacent|experimental",
      "scoreEstimate": 85
    }
  ]
}

## SISTEMA DE SCORING (0-100)
Calcule o scoreEstimate baseado em:
- +20: Call Out forte e específico
- +20: Promessa de valor clara
- +15: Tipo de força alta
- +15: 3+ componentes virais
- +10: ≤10 palavras
- +10: Elemento de curiosidade/tensão
- -10: Fala de "eu" em vez de "você"
- -15: >15 palavras

## REGRAS FINAIS
- Ordene do mais viral (1) ao mais seguro (5)
- Mínimo 2 hooks de força ALTA
- Use pelo menos 4 tipos DIFERENTES
- Máximo 15 palavras por hook
- Fale DELES, não de você
- Português brasileiro natural
- Mínimo 3 hooks devem ter score ≥ 80

RESPONDA APENAS COM O JSON, sem texto adicional.`;
}

// ==========================================
// VALIDATION FUNCTIONS
// ==========================================

/**
 * Valida a estrutura da resposta de hooks
 */
export function validateHooksResponse(response: unknown): boolean {
  if (!response || typeof response !== 'object') return false;
  const obj = response as Record<string, unknown>;
  if (!Array.isArray(obj.hooks)) return false;
  if (obj.hooks.length !== 5) return false;

  return obj.hooks.every((hook: unknown) => {
    if (!hook || typeof hook !== 'object') return false;
    const h = hook as Record<string, unknown>;
    return (
      typeof h.texto === 'string' &&
      typeof h.tipo === 'string' &&
      typeof h.forca === 'string' &&
      h.texto.length > 0 &&
      h.texto.split(' ').length <= 15
    );
  });
}

/**
 * Valida um hook individual usando o checklist Hormozi
 */
export function validateHook(hook: HookStructured): HookValidation {
  const texto = hook.texto.toLowerCase();
  const wordCount = hook.texto.split(' ').length;

  // Detecta Call Out (pergunta direta, condicional, rótulo)
  const hasCallOut =
    hook.tipo === 'condicional' ||
    hook.tipo === 'rotulo' ||
    hook.tipo === 'pergunta_sim' ||
    texto.includes('você') ||
    texto.includes('seu') ||
    texto.includes('sua') ||
    /^se\s/.test(texto);

  // Detecta Promessa de Valor (benefício implícito ou explícito)
  const hasValuePromise =
    hook.tipo === 'comando' ||
    hook.tipo === 'declaracao' ||
    hook.tipo === 'lista' ||
    /\d+\s?(segundos?|minutos?|passos?|dicas?)/.test(texto) ||
    texto.includes('como') ||
    texto.includes('para') ||
    texto.includes('segredo');

  // Verifica componentes virais
  const hasViralComponents = hook.componentes && hook.componentes.length >= 2;

  // Validação geral
  const isValid =
    hasCallOut && hasValuePromise && wordCount <= 15 && hasViralComponents;

  return {
    hasCallOut,
    hasValuePromise,
    wordCount,
    hasViralComponents,
    isValid,
  };
}

/**
 * Recalcula o score de um hook usando a fórmula Hormozi
 */
export function recalculateHookScore(hook: HookStructured): number {
  const validation = validateHook(hook);

  return calculateHookScore({
    texto: hook.texto,
    tipo: hook.tipo,
    componentes: hook.componentes,
    hasCallOut: validation.hasCallOut,
    hasValuePromise: validation.hasValuePromise,
  });
}

/**
 * Enriquece hooks com validação e score recalculado
 */
export function enrichHooks(hooks: HookStructured[]): HookStructured[] {
  return hooks.map((hook) => {
    const validation = validateHook(hook);
    const recalculatedScore = recalculateHookScore(hook);

    return {
      ...hook,
      validation,
      // Use o maior entre o score estimado pela IA e o recalculado
      scoreEstimate: Math.max(hook.scoreEstimate || 0, recalculatedScore),
    };
  });
}

/**
 * Extrai apenas os textos dos hooks (compatibilidade)
 */
export function extractHookTexts(response: { hooks: Array<{ texto: string }> }): string[] {
  return response.hooks.map((h) => h.texto);
}

/**
 * Obtém a força de um tipo de hook
 */
export function getHookForca(tipo: HookType): HookForca {
  return HOOK_TYPES[tipo]?.forca || 'media';
}

/**
 * Verifica se a distribuição 70-20-10 está correta
 */
export function validate7020Distribution(hooks: HookStructured[]): {
  isValid: boolean;
  proven: number;
  adjacent: number;
  experimental: number;
} {
  const proven = hooks.filter((h) => h.distribution === 'proven').length;
  const adjacent = hooks.filter((h) => h.distribution === 'adjacent').length;
  const experimental = hooks.filter((h) => h.distribution === 'experimental').length;

  // Para 5 hooks: esperamos 3-4 proven, 1 adjacent, 0-1 experimental
  const isValid = proven >= 3 && adjacent >= 1;

  return { isValid, proven, adjacent, experimental };
}
