// ==========================================
// HORMOZI HOOKS METHODOLOGY + SWIPE FILE
// Alex Hormozi's Proven Viral Hook Framework
// ==========================================

export type HookDistribution = 'proven' | 'adjacent' | 'experimental';

export interface SwipeFileHook {
  id: string;
  texto: string;
  tipo: string;
  tema: string;
  componentes: string[];
  distribution: HookDistribution;
  scoreBase: number; // 0-100 base score
}

// ==========================================
// METODOLOGIA HORMOZI
// ==========================================

export const HORMOZI_METHODOLOGY = `
## A FÓRMULA HORMOZI PARA HOOKS VIRAIS

### Fórmula Mestre
**HOOK = CALL OUT + PROMESSA DE VALOR**

- **Call Out:** Identifica o público ("isso é pra mim!")
- **Promessa de Valor:** O benefício de continuar ("o que eu ganho?")

---

### Regra 70-20-10 (Distribuição)

Para máxima performance e consistência:

| Tipo | % | Descrição | Quando Usar |
|------|---|-----------|-------------|
| **PROVEN** | 70% | Hooks testados, alta conversão | Sempre - são sua base |
| **ADJACENT** | 20% | Variações de proven, adaptados | Para variedade |
| **EXPERIMENTAL** | 10% | Novos conceitos, testes | Para descobertas |

---

### Os 7 Componentes de Manchetes Virais

Todo hook viral tem pelo menos 2-3 destes:

| # | Componente | O que é | Exemplo |
|---|------------|---------|---------|
| 1 | **Recência** | O mais atual, novidade | "Acabei de descobrir..." |
| 2 | **Relevância** | Pessoalmente significativo | "Para quem sofre de..." |
| 3 | **Celebridade** | Pessoas/marcas conhecidas | "Navy SEALs usam..." |
| 4 | **Proximidade** | Perto, local, familiar | "Brasileiros estão..." |
| 5 | **Conflito** | Tensão, oposição | "O mito que te disseram" |
| 6 | **Incomum** | Estranho, raro, surpreendente | "O que ninguém conta..." |
| 7 | **Em Andamento** | História em progresso | "Estou testando há 30 dias" |

---

### Checklist de Validação (OBRIGATÓRIO)

Antes de aprovar um hook:

- [ ] **Call Out claro?** (identifica quem deve parar)
- [ ] **Promessa de Valor?** (benefício implícito ou explícito)
- [ ] **≤15 palavras?** (quanto menor, mais impacto)
- [ ] **Fala DELES?** (não de você)
- [ ] **Entendível em 3s?** (sem complexidade)
- [ ] **Gera curiosidade?** (vontade de saber mais)
- [ ] **Tem 2+ componentes virais?**

---

### Sistema de Scoring (0-100)

| Faixa | Classificação | Significado |
|-------|---------------|-------------|
| 90-100 | **Excepcional** | Hook viral garantido |
| 80-89 | **Muito Forte** | Alta probabilidade de viral |
| 70-79 | **Forte** | Boa performance esperada |
| 60-69 | **Moderado** | Aceitável, pode melhorar |
| <60 | **Fraco** | Reescrever |

**Critérios de Pontuação:**
- +20 pontos: Call Out forte e específico
- +20 pontos: Promessa de valor clara
- +15 pontos: Tipo de força alta (comando/declaração/condicional)
- +15 pontos: 3+ componentes virais
- +10 pontos: ≤10 palavras
- +10 pontos: Elemento de curiosidade/tensão
- +10 pontos: Números específicos
- -10 pontos: Fala de "eu" em vez de "você"
- -10 pontos: Vago ou genérico
- -15 pontos: >15 palavras
`;

// ==========================================
// SWIPE FILE - HOOKS TESTADOS E APROVADOS
// 121 hooks organizados por tema e tipo
// ==========================================

export const HORMOZI_SWIPE_FILE: SwipeFileHook[] = [
  // ==========================================
  // ANSIEDADE (20 hooks)
  // ==========================================
  {
    id: 'anx-001',
    texto: 'Ansiedade? Faça isso AGORA',
    tipo: 'comando',
    tema: 'ansiedade',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 92,
  },
  {
    id: 'anx-002',
    texto: 'Se você é ansioso, está respirando errado',
    tipo: 'condicional',
    tema: 'ansiedade',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 90,
  },
  {
    id: 'anx-003',
    texto: 'A cura para ansiedade está debaixo do seu nariz',
    tipo: 'declaracao',
    tema: 'ansiedade',
    componentes: ['incomum', 'proximidade'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'anx-004',
    texto: '3 segundos para acalmar seu sistema nervoso',
    tipo: 'lista',
    tema: 'ansiedade',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'anx-005',
    texto: 'Ansiosos, tenho um presente pra vocês',
    tipo: 'rotulo',
    tema: 'ansiedade',
    componentes: ['relevancia'],
    distribution: 'proven',
    scoreBase: 82,
  },
  {
    id: 'anx-006',
    texto: 'Por que respirar fundo pode PIORAR sua ansiedade',
    tipo: 'pergunta_aberta',
    tema: 'ansiedade',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 91,
  },
  {
    id: 'anx-007',
    texto: 'Já se sentiu ansioso sem motivo?',
    tipo: 'pergunta_sim',
    tema: 'ansiedade',
    componentes: ['relevancia'],
    distribution: 'proven',
    scoreBase: 78,
  },
  {
    id: 'anx-008',
    texto: 'Eu estava no auge da ansiedade quando descobri isso',
    tipo: 'narrativa',
    tema: 'ansiedade',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 80,
  },
  {
    id: 'anx-009',
    texto: 'A ansiedade não é sua inimiga - é um sinal',
    tipo: 'declaracao',
    tema: 'ansiedade',
    componentes: ['conflito', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'anx-010',
    texto: 'Pare de lutar contra a ansiedade - faça isso',
    tipo: 'comando',
    tema: 'ansiedade',
    componentes: ['conflito', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 86,
  },
  {
    id: 'anx-011',
    texto: 'Seu corpo sabe como acalmar - você está atrapalhando',
    tipo: 'declaracao',
    tema: 'ansiedade',
    componentes: ['conflito', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 85,
  },
  {
    id: 'anx-012',
    texto: '60 segundos para sair do modo pânico',
    tipo: 'lista',
    tema: 'ansiedade',
    componentes: ['relevancia', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'anx-013',
    texto: 'Ansiedade crônica? Verifique sua respiração noturna',
    tipo: 'condicional',
    tema: 'ansiedade',
    componentes: ['relevancia', 'incomum'],
    distribution: 'experimental',
    scoreBase: 79,
  },
  {
    id: 'anx-014',
    texto: 'O truque de 4 segundos que psicólogos não contam',
    tipo: 'declaracao',
    tema: 'ansiedade',
    componentes: ['incomum', 'celebridade'],
    distribution: 'experimental',
    scoreBase: 81,
  },
  {
    id: 'anx-015',
    texto: 'Antes de tomar remédio, tente isso por 7 dias',
    tipo: 'comando',
    tema: 'ansiedade',
    componentes: ['conflito', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'anx-016',
    texto: 'Seu nervo vago está gritando - você está ouvindo?',
    tipo: 'pergunta_aberta',
    tema: 'ansiedade',
    componentes: ['incomum', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'anx-017',
    texto: 'A técnica que me tirou de 10 anos de ansiedade',
    tipo: 'narrativa',
    tema: 'ansiedade',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'anx-018',
    texto: 'Crise de ansiedade? Leia isso AGORA',
    tipo: 'comando',
    tema: 'ansiedade',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 89,
  },
  {
    id: 'anx-019',
    texto: '5 sinais de que sua respiração causa ansiedade',
    tipo: 'lista',
    tema: 'ansiedade',
    componentes: ['relevancia', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'anx-020',
    texto: 'Você não tem transtorno de ansiedade - tem respiração disfuncional',
    tipo: 'declaracao',
    tema: 'ansiedade',
    componentes: ['conflito', 'incomum'],
    distribution: 'experimental',
    scoreBase: 86,
  },

  // ==========================================
  // SONO (18 hooks)
  // ==========================================
  {
    id: 'son-001',
    texto: 'Não consegue dormir? Tente isso antes de remédios',
    tipo: 'condicional',
    tema: 'sono',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 90,
  },
  {
    id: 'son-002',
    texto: 'A técnica 4-7-8 que coloca você pra dormir',
    tipo: 'declaracao',
    tema: 'sono',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'son-003',
    texto: 'Se acorda cansado, sua respiração noturna é o problema',
    tipo: 'condicional',
    tema: 'sono',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 89,
  },
  {
    id: 'son-004',
    texto: 'Durma em 5 minutos com essa técnica militar',
    tipo: 'comando',
    tema: 'sono',
    componentes: ['celebridade', 'incomum'],
    distribution: 'proven',
    scoreBase: 91,
  },
  {
    id: 'son-005',
    texto: 'Por que você acorda às 3h da manhã',
    tipo: 'pergunta_aberta',
    tema: 'sono',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'son-006',
    texto: 'Insônia? Seu sistema nervoso está em modo luta',
    tipo: 'condicional',
    tema: 'sono',
    componentes: ['relevancia', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'son-007',
    texto: '4 respirações antes de dormir mudam tudo',
    tipo: 'lista',
    tema: 'sono',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'son-008',
    texto: 'Você respira pela boca dormindo? Leia isso',
    tipo: 'condicional',
    tema: 'sono',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'son-009',
    texto: 'Se você ronca, sua vida depende disso',
    tipo: 'condicional',
    tema: 'sono',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'son-010',
    texto: 'Há 5 anos, eu dependia de remédios pra dormir',
    tipo: 'narrativa',
    tema: 'sono',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 82,
  },
  {
    id: 'son-011',
    texto: 'O erro que 90% das pessoas cometem antes de dormir',
    tipo: 'declaracao',
    tema: 'sono',
    componentes: ['relevancia', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'son-012',
    texto: 'Melatonina não é a resposta - isso é',
    tipo: 'declaracao',
    tema: 'sono',
    componentes: ['conflito', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 86,
  },
  {
    id: 'son-013',
    texto: 'Quer dormir como criança de novo?',
    tipo: 'pergunta_sim',
    tema: 'sono',
    componentes: ['relevancia', 'proximidade'],
    distribution: 'adjacent',
    scoreBase: 79,
  },
  {
    id: 'son-014',
    texto: 'O protocolo de sono que mudou minha vida',
    tipo: 'narrativa',
    tema: 'sono',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 81,
  },
  {
    id: 'son-015',
    texto: 'Antes de ir dormir, faça esses 3 passos',
    tipo: 'comando',
    tema: 'sono',
    componentes: ['relevancia'],
    distribution: 'proven',
    scoreBase: 83,
  },
  {
    id: 'son-016',
    texto: 'Sono ruim = envelhecimento acelerado',
    tipo: 'declaracao',
    tema: 'sono',
    componentes: ['conflito', 'relevancia'],
    distribution: 'experimental',
    scoreBase: 85,
  },
  {
    id: 'son-017',
    texto: 'Testei 12 técnicas de sono - só 2 funcionam',
    tipo: 'narrativa',
    tema: 'sono',
    componentes: ['em_andamento', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'son-018',
    texto: 'O segredo do sono profundo está na expiração',
    tipo: 'declaracao',
    tema: 'sono',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 84,
  },

  // ==========================================
  // ENERGIA (18 hooks)
  // ==========================================
  {
    id: 'ene-001',
    texto: 'Café? Não. Faça isso para ter energia',
    tipo: 'comando',
    tema: 'energia',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 91,
  },
  {
    id: 'ene-002',
    texto: 'A técnica que Navy SEALs usam para acordar',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['celebridade', 'incomum'],
    distribution: 'proven',
    scoreBase: 90,
  },
  {
    id: 'ene-003',
    texto: '2 segundos que mudam seu estado - sem cafeína',
    tipo: 'lista',
    tema: 'energia',
    componentes: ['incomum', 'conflito'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'ene-004',
    texto: 'Quer ter mais energia sem cafeína?',
    tipo: 'pergunta_sim',
    tema: 'energia',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 80,
  },
  {
    id: 'ene-005',
    texto: 'A manhã perfeita começa com 60 segundos',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'ene-006',
    texto: 'Fadiga crônica? Sua respiração está superficial',
    tipo: 'condicional',
    tema: 'energia',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'ene-007',
    texto: 'O despertar energético de 1 minuto',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'ene-008',
    texto: 'Se você precisa de café pra funcionar, assista isso',
    tipo: 'condicional',
    tema: 'energia',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'ene-009',
    texto: 'Energia infinita não vem de suplementos',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['conflito', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'ene-010',
    texto: '3 respirações pra sair do modo zumbi',
    tipo: 'lista',
    tema: 'energia',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'ene-011',
    texto: 'Acorde seu corpo em 30 segundos',
    tipo: 'comando',
    tema: 'energia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'ene-012',
    texto: 'Por que você se sente cansado mesmo dormindo bem',
    tipo: 'pergunta_aberta',
    tema: 'energia',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'ene-013',
    texto: 'A tarde não precisa ser uma batalha',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['relevancia', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 80,
  },
  {
    id: 'ene-014',
    texto: 'Sua bateria biológica está em modo economia',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'experimental',
    scoreBase: 81,
  },
  {
    id: 'ene-015',
    texto: 'Cansado? Seu cérebro está em modo sobrevivência',
    tipo: 'condicional',
    tema: 'energia',
    componentes: ['relevancia', 'incomum'],
    distribution: 'experimental',
    scoreBase: 83,
  },
  {
    id: 'ene-016',
    texto: 'O reset de energia que leva 90 segundos',
    tipo: 'declaracao',
    tema: 'energia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'ene-017',
    texto: 'Empreendedores: seu segredo está na respiração',
    tipo: 'rotulo',
    tema: 'energia',
    componentes: ['relevancia', 'celebridade'],
    distribution: 'adjacent',
    scoreBase: 81,
  },
  {
    id: 'ene-018',
    texto: 'Pare de depender de estimulantes - existe outro caminho',
    tipo: 'comando',
    tema: 'energia',
    componentes: ['conflito', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },

  // ==========================================
  // SISTEMA NERVOSO (15 hooks)
  // ==========================================
  {
    id: 'sn-001',
    texto: 'Você tem um SUPERPODER e não sabe',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 89,
  },
  {
    id: 'sn-002',
    texto: 'O controle remoto do seu corpo está debaixo do nariz',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['incomum', 'proximidade'],
    distribution: 'proven',
    scoreBase: 90,
  },
  {
    id: 'sn-003',
    texto: 'Simpático vs Parassimpático: qual está ganhando em você?',
    tipo: 'pergunta_aberta',
    tema: 'sistema_nervoso',
    componentes: ['conflito', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'sn-004',
    texto: 'O que seu sistema nervoso está tentando te dizer',
    tipo: 'pergunta_aberta',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'sn-005',
    texto: 'Seu corpo está em modo de emergência permanente',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'sn-006',
    texto: 'A chave do nervo vago está na sua respiração',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'sn-007',
    texto: 'Como ativar seu parassimpático em segundos',
    tipo: 'lista',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'sn-008',
    texto: 'Seu cérebro está travado no Beta - como sair disso',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'sn-009',
    texto: 'Sua mente não para? A culpa é do DMN',
    tipo: 'condicional',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 81,
  },
  {
    id: 'sn-010',
    texto: 'O reset do sistema nervoso em 4 passos',
    tipo: 'lista',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'sn-011',
    texto: 'Estresse crônico desregula TUDO - comece por aqui',
    tipo: 'comando',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'sn-012',
    texto: 'Por que seu corpo não consegue relaxar',
    tipo: 'pergunta_aberta',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'sn-013',
    texto: 'O músculo mais importante da calma',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['incomum', 'relevancia'],
    distribution: 'experimental',
    scoreBase: 80,
  },
  {
    id: 'sn-014',
    texto: 'Regulação emocional começa AQUI',
    tipo: 'comando',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'sn-015',
    texto: 'Você está em luta ou fuga agora mesmo - teste isso',
    tipo: 'declaracao',
    tema: 'sistema_nervoso',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'experimental',
    scoreBase: 83,
  },

  // ==========================================
  // CIÊNCIA / VFC (15 hooks)
  // ==========================================
  {
    id: 'sci-001',
    texto: 'O que ninguém te conta sobre CO2',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['incomum', 'conflito'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'sci-002',
    texto: 'O paradoxo: menos respiração = mais oxigênio',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 90,
  },
  {
    id: 'sci-003',
    texto: 'VFC baixa = você está envelhecendo mais rápido',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'sci-004',
    texto: 'CO2 não é seu inimigo - é seu aliado',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 89,
  },
  {
    id: 'sci-005',
    texto: 'O biomarcador que prevê doenças - e como otimizar',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'sci-006',
    texto: 'Respirar mais oxigênio NÃO é melhor',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 91,
  },
  {
    id: 'sci-007',
    texto: 'O Efeito Bohr explicado em 60 segundos',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['incomum', 'recencia'],
    distribution: 'adjacent',
    scoreBase: 81,
  },
  {
    id: 'sci-008',
    texto: 'Por que seu Apple Watch deveria medir isso',
    tipo: 'pergunta_aberta',
    tema: 'ciencia',
    componentes: ['incomum', 'proximidade'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'sci-009',
    texto: 'A ciência por trás da respiração que cura',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 83,
  },
  {
    id: 'sci-010',
    texto: 'Seu coração não deveria bater igual',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'sci-011',
    texto: '6 respirações por minuto mudam sua biologia',
    tipo: 'lista',
    tema: 'ciencia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'sci-012',
    texto: 'Se sua VFC é baixa, seu estresse é crônico',
    tipo: 'condicional',
    tema: 'ciencia',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'sci-013',
    texto: 'O teste de 30 segundos que revela sua saúde',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'sci-014',
    texto: 'Coerência cardíaca: o estado que otimiza tudo',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['incomum', 'relevancia'],
    distribution: 'experimental',
    scoreBase: 80,
  },
  {
    id: 'sci-015',
    texto: 'Os dados não mentem: respiração muda DNA',
    tipo: 'declaracao',
    tema: 'ciencia',
    componentes: ['conflito', 'incomum'],
    distribution: 'experimental',
    scoreBase: 82,
  },

  // ==========================================
  // FOCO / PRODUTIVIDADE (15 hooks)
  // ==========================================
  {
    id: 'foc-001',
    texto: 'Box Breathing: o segredo dos Navy SEALs',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['celebridade', 'incomum'],
    distribution: 'proven',
    scoreBase: 92,
  },
  {
    id: 'foc-002',
    texto: 'Se não consegue focar, sua respiração é a causa',
    tipo: 'condicional',
    tema: 'foco',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 89,
  },
  {
    id: 'foc-003',
    texto: '4 segundos que dobram sua concentração',
    tipo: 'lista',
    tema: 'foco',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'foc-004',
    texto: 'Por que os Navy SEALs respiram diferente',
    tipo: 'pergunta_aberta',
    tema: 'foco',
    componentes: ['celebridade', 'incomum'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'foc-005',
    texto: 'Profissionais de alta performance: seu segredo está aqui',
    tipo: 'rotulo',
    tema: 'foco',
    componentes: ['relevancia', 'celebridade'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'foc-006',
    texto: 'Foco inabalável em 2 minutos',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'foc-007',
    texto: 'Antes de reuniões importantes, faça isso',
    tipo: 'comando',
    tema: 'foco',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 83,
  },
  {
    id: 'foc-008',
    texto: 'O truque de concentração que CEOs usam',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['celebridade', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'foc-009',
    texto: 'Procrastinando? Sua mente está hiperativa',
    tipo: 'condicional',
    tema: 'foco',
    componentes: ['relevancia', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'foc-010',
    texto: 'Pra quem não consegue meditar: existe outra forma',
    tipo: 'rotulo',
    tema: 'foco',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'foc-011',
    texto: 'O estado de flow começa com uma respiração',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['incomum', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 81,
  },
  {
    id: 'foc-012',
    texto: 'Atenção plena em 60 segundos - sem meditar',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['conflito', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'foc-013',
    texto: 'O reset mental entre tarefas',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 82,
  },
  {
    id: 'foc-014',
    texto: 'Empreendedores estressados: isso vai mudar seu jogo',
    tipo: 'rotulo',
    tema: 'foco',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'foc-015',
    texto: 'A pausa de 4 segundos que salva decisões',
    tipo: 'declaracao',
    tema: 'foco',
    componentes: ['incomum', 'relevancia'],
    distribution: 'experimental',
    scoreBase: 80,
  },

  // ==========================================
  // RESPIRAÇÃO NASAL (12 hooks)
  // ==========================================
  {
    id: 'nas-001',
    texto: 'Se respira pela boca, está perdendo saúde',
    tipo: 'condicional',
    tema: 'respiracao_nasal',
    componentes: ['relevancia', 'conflito'],
    distribution: 'proven',
    scoreBase: 90,
  },
  {
    id: 'nas-002',
    texto: 'Você respira ERRADO a vida toda',
    tipo: 'declaracao',
    tema: 'respiracao_nasal',
    componentes: ['conflito', 'relevancia'],
    distribution: 'proven',
    scoreBase: 91,
  },
  {
    id: 'nas-003',
    texto: 'Sua respiração está te deixando doente',
    tipo: 'declaracao',
    tema: 'respiracao_nasal',
    componentes: ['conflito', 'relevancia'],
    distribution: 'proven',
    scoreBase: 88,
  },
  {
    id: 'nas-004',
    texto: '30 funções do nariz que você ignora',
    tipo: 'lista',
    tema: 'respiracao_nasal',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'nas-005',
    texto: 'Por que estamos todos respirando errado',
    tipo: 'pergunta_aberta',
    tema: 'respiracao_nasal',
    componentes: ['conflito', 'proximidade'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'nas-006',
    texto: 'Respiração bucal: o erro silencioso',
    tipo: 'declaracao',
    tema: 'respiracao_nasal',
    componentes: ['conflito', 'incomum'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'nas-007',
    texto: 'A diferença entre respirar e RESPIRAR',
    tipo: 'pergunta_aberta',
    tema: 'respiracao_nasal',
    componentes: ['incomum', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 83,
  },
  {
    id: 'nas-008',
    texto: 'O nariz faz o que a boca nunca vai fazer',
    tipo: 'declaracao',
    tema: 'respiracao_nasal',
    componentes: ['conflito', 'incomum'],
    distribution: 'adjacent',
    scoreBase: 84,
  },
  {
    id: 'nas-009',
    texto: 'Tape sua boca para dormir - sim, sério',
    tipo: 'comando',
    tema: 'respiracao_nasal',
    componentes: ['incomum', 'conflito'],
    distribution: 'experimental',
    scoreBase: 82,
  },
  {
    id: 'nas-010',
    texto: 'Óxido nítrico: o gás que você produz pelo nariz',
    tipo: 'declaracao',
    tema: 'respiracao_nasal',
    componentes: ['incomum', 'relevancia'],
    distribution: 'adjacent',
    scoreBase: 81,
  },
  {
    id: 'nas-011',
    texto: 'Nunca mais respire assim',
    tipo: 'comando',
    tema: 'respiracao_nasal',
    componentes: ['conflito', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'nas-012',
    texto: '70% das pessoas respiram disfuncionalmente - você?',
    tipo: 'declaracao',
    tema: 'respiracao_nasal',
    componentes: ['relevancia', 'incomum'],
    distribution: 'proven',
    scoreBase: 85,
  },

  // ==========================================
  // GERAL / VIRAL (8 hooks)
  // ==========================================
  {
    id: 'gen-001',
    texto: 'A coisa mais poderosa que você pode fazer hoje custa zero',
    tipo: 'declaracao',
    tema: 'geral',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 89,
  },
  {
    id: 'gen-002',
    texto: 'Para tudo e respira comigo',
    tipo: 'comando',
    tema: 'geral',
    componentes: ['em_andamento', 'proximidade'],
    distribution: 'proven',
    scoreBase: 87,
  },
  {
    id: 'gen-003',
    texto: 'Salva esse post antes que esqueça',
    tipo: 'comando',
    tema: 'geral',
    componentes: ['em_andamento', 'relevancia'],
    distribution: 'proven',
    scoreBase: 85,
  },
  {
    id: 'gen-004',
    texto: 'O que acontece quando você segura a respiração',
    tipo: 'pergunta_aberta',
    tema: 'geral',
    componentes: ['incomum', 'relevancia'],
    distribution: 'proven',
    scoreBase: 84,
  },
  {
    id: 'gen-005',
    texto: 'Depois de testar 47 técnicas, encontrei as 3 que funcionam',
    tipo: 'narrativa',
    tema: 'geral',
    componentes: ['em_andamento', 'incomum'],
    distribution: 'proven',
    scoreBase: 86,
  },
  {
    id: 'gen-006',
    texto: 'Minha primeira experiência de Breathwork foi um desastre',
    tipo: 'narrativa',
    tema: 'geral',
    componentes: ['em_andamento', 'conflito'],
    distribution: 'adjacent',
    scoreBase: 82,
  },
  {
    id: 'gen-007',
    texto: 'Mães sobrecarregadas, isso é pra vocês',
    tipo: 'rotulo',
    tema: 'geral',
    componentes: ['relevancia', 'proximidade'],
    distribution: 'proven',
    scoreBase: 83,
  },
  {
    id: 'gen-008',
    texto: 'Leia isso se quer parar de ter ansiedade',
    tipo: 'comando',
    tema: 'geral',
    componentes: ['relevancia', 'em_andamento'],
    distribution: 'proven',
    scoreBase: 88,
  },
];

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

/**
 * Retorna hooks do swipe file filtrados por tema e distribuição
 */
export function getHooksByTheme(tema: string, distribution?: HookDistribution): SwipeFileHook[] {
  let hooks = HORMOZI_SWIPE_FILE.filter(h => h.tema === tema || h.tema === 'geral');
  if (distribution) {
    hooks = hooks.filter(h => h.distribution === distribution);
  }
  return hooks.sort((a, b) => b.scoreBase - a.scoreBase);
}

/**
 * Retorna hooks por distribuição respeitando a regra 70-20-10
 */
export function getHooksBy7020Rule(tema: string, total: number = 5): SwipeFileHook[] {
  const themeHooks = HORMOZI_SWIPE_FILE.filter(h => h.tema === tema || h.tema === 'geral');

  const proven = themeHooks.filter(h => h.distribution === 'proven');
  const adjacent = themeHooks.filter(h => h.distribution === 'adjacent');
  const experimental = themeHooks.filter(h => h.distribution === 'experimental');

  // 70-20-10 distribution
  const provenCount = Math.max(Math.ceil(total * 0.7), 3); // At least 3
  const adjacentCount = Math.max(Math.floor(total * 0.2), 1); // At least 1
  const experimentalCount = Math.max(total - provenCount - adjacentCount, 0);

  return [
    ...proven.slice(0, provenCount),
    ...adjacent.slice(0, adjacentCount),
    ...experimental.slice(0, experimentalCount),
  ].slice(0, total);
}

/**
 * Calcula score de um hook baseado nos critérios Hormozi
 */
export function calculateHookScore(hook: {
  texto: string;
  tipo: string;
  componentes: string[];
  hasCallOut?: boolean;
  hasValuePromise?: boolean;
}): number {
  let score = 50; // Base score

  // +20: Call Out forte (assume true if tipo is condicional or rotulo)
  if (hook.hasCallOut || hook.tipo === 'condicional' || hook.tipo === 'rotulo') {
    score += 20;
  }

  // +20: Promessa de valor (assume based on tipo)
  if (hook.hasValuePromise || ['comando', 'declaracao', 'lista'].includes(hook.tipo)) {
    score += 20;
  }

  // +15: Tipo de força alta
  if (['comando', 'declaracao', 'condicional'].includes(hook.tipo)) {
    score += 15;
  }

  // +15: 3+ componentes virais
  if (hook.componentes.length >= 3) {
    score += 15;
  } else if (hook.componentes.length >= 2) {
    score += 10;
  }

  // +10: ≤10 palavras
  const wordCount = hook.texto.split(' ').length;
  if (wordCount <= 10) {
    score += 10;
  }

  // -15: >15 palavras
  if (wordCount > 15) {
    score -= 15;
  }

  // -10: Fala de "eu" em vez de "você" no início
  if (hook.texto.toLowerCase().startsWith('eu ')) {
    score -= 10;
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Detecta o tema de uma ideia baseado em palavras-chave
 */
export function detectTheme(ideia: string): string {
  const ideiaLower = ideia.toLowerCase();

  const themeKeywords: Record<string, string[]> = {
    ansiedade: ['ansiedade', 'ansioso', 'pânico', 'nervoso', 'preocupação', 'apreensão', 'medo'],
    sono: ['sono', 'dormir', 'insônia', 'acordar', 'noite', 'descanso', 'cansado', 'fadiga'],
    energia: ['energia', 'disposição', 'cansaço', 'café', 'acordar', 'manhã', 'produtivo'],
    sistema_nervoso: ['sistema nervoso', 'nervo vago', 'simpático', 'parassimpático', 'regulação', 'estresse'],
    ciencia: ['vfc', 'hrv', 'co2', 'oxigênio', 'bohr', 'ondas cerebrais', 'biomarcador'],
    foco: ['foco', 'concentração', 'produtividade', 'performance', 'atenção', 'meditar', 'trabalho'],
    respiracao_nasal: ['nariz', 'nasal', 'boca', 'respirar', 'respiração disfuncional'],
  };

  for (const [tema, keywords] of Object.entries(themeKeywords)) {
    for (const keyword of keywords) {
      if (ideiaLower.includes(keyword)) {
        return tema;
      }
    }
  }

  return 'geral';
}
