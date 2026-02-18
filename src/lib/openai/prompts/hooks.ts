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
  scoreDeviation: number;
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

## ANTI-PADRÕES (NUNCA FAÇA ISSO)

### Hooks que MATAM o engajamento:

❌ **Hook educativo** (explica o conteúdo em vez de provocar)
- "A respiração diafragmática ajuda a acalmar" → MORTO. Não tem mistério.
- "Breathwork é uma técnica de bem-estar" → MORTO. Parece Wikipedia.

❌ **Hook que entrega a resposta** (mata a curiosidade)
- "Respire 4-8 para acalmar" → MORTO. Já deu o ouro.
- "Expire mais devagar que inspira para relaxar" → MORTO. Sem motivo pra ler.

❌ **Hook genérico** (sem especificidade)
- "Dicas de respiração para você" → MORTO. Poderia ser de qualquer conta.

❌ **Hook longo** (>10 palavras perde 50% do impacto)

### O que funciona:
✅ **TENSÃO** → "Você respira ERRADO a vida toda"
✅ **CURIOSIDADE** → "O que Navy SEALs sabem que você não sabe"
✅ **ESPECIFICIDADE** → "3 segundos para acalmar seu sistema nervoso"
✅ **PROVOCAÇÃO** → "Respirar fundo pode PIORAR sua ansiedade"
✅ **URGÊNCIA** → "Pare tudo e faça isso AGORA"

### TESTE MENTAL (aplique a cada hook):
> "Se eu visse isso scrollando no Instagram às 23h, eu PARARIA pra ler?"
> Se a resposta é "talvez" → reescreva. Só aceite "COM CERTEZA SIM".

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
5. **DISTRIBUIÇÃO OBRIGATÓRIA DE TAMANHOS:**
   - 2 hooks CURTOS (4-6 palavras) → "Ansiedade? Faça isso AGORA" (5 palavras)
   - 2 hooks MÉDIOS (7-10 palavras) → "A técnica que Navy SEALs usam pra calma" (8 palavras)
   - 1 hook COMPLETO (11-15 palavras)
   ⚠️ Hooks curtos (≤8 palavras) PARAM O SCROLL mais rápido. Priorize-os.

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
- Pelo menos 3 hooks devem ter ≤8 palavras

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
  if (obj.hooks.length < 3 || obj.hooks.length > 5) return false;

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

  // Detecta Call Out — audiencia especifica, condicional, ou pergunta direta
  // Não auto-passa por "voce/seu/sua" genérico (quase todo hook teria)
  const audienceCallOutPattern = /^(se\s|ansiosos?|profissionais|mães|empreendedores|quem\s|pra quem|para quem|insônia|cansado|fadiga|não consegue|quer\s|já\s)/;
  const hasCallOut =
    hook.tipo === 'condicional' ||
    hook.tipo === 'rotulo' ||
    hook.tipo === 'pergunta_sim' ||
    audienceCallOutPattern.test(texto) ||
    /\?$/.test(hook.texto.trim());

  // Detecta Promessa de Valor — transformação, números, tensão, erro implícito
  // Não auto-passa por tipo (evita inflation)
  const valuePromisePattern = /(\d+\s?(segundos?|minutos?|passos?|dicas?|dias?|horas?|ciclos?|x\b))|segredo|muda[mr]?|transform|funciona|cura|solução|resultado|melhor|errad[oa]|erro|problema|piorar|agora|pare|faça|tente|descubr/i;
  const hasValuePromise = valuePromisePattern.test(texto);

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
    scoreDeviation: 0, // populated by enrichHooks
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
    const serverScore = recalculateHookScore(hook);
    const aiScore = hook.scoreEstimate || 0;

    // Media ponderada: 70% server, 30% AI (evita score inflation)
    const finalScore = Math.round(serverScore * 0.7 + aiScore * 0.3);
    const scoreDeviation = Math.abs(serverScore - aiScore);

    return {
      ...hook,
      validation: {
        ...validation,
        scoreDeviation,
      },
      scoreEstimate: finalScore,
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
 * Verifica se a distribuição 70-20-10 está correta.
 *
 * Para batches de 5 hooks, a regra 70-20-10 arredonda para:
 * - proven: 4 (ceil(5*0.7)=4, min 3) → ~80%
 * - adjacent: 1 (floor(5*0.2)=1, min 1) → ~20%
 * - experimental: 0 (5-4-1=0) → ~0%
 *
 * Isso é esperado — em batches pequenos o arredondamento
 * naturalmente concentra no bucket proven (80-20-0 em vez de 70-20-10).
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
