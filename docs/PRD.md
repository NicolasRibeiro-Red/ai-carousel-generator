# PRD: BreathAI

**Versão:** 1.0  
**Data:** 23 de Janeiro de 2026  
**Status:** Aprovado para Desenvolvimento MVP  
**Autor:** Nicolas (Product Developer)  
**Stakeholder Principal:** Mentor iBreathwork + Alunos do Curso

---

## 1. VISÃO GERAL

### 1.1 Resumo Executivo

BreathAI é uma ferramenta web interna que transforma ideias simples sobre o método iBreathwork em carrosséis prontos para publicação no Instagram. A aplicação utiliza IA (Claude Sonnet 4) treinada no estilo Alex Hormozi adaptado ao método do mentor, gerando conteúdo viral em 3 etapas simples: Input → Escolha de Hook → Download. O objetivo é quebrar o bloqueio criativo de alunos que dominam o conhecimento mas travam na produção de conteúdo.

**Problema que Resolve:**  
Alunos do curso iBreathwork estudam neurociência da respiração mas ficam paralisados ao tentar criar conteúdo para redes sociais (síndrome do impostor + bloqueio criativo).

**Solução Proposta:**  
Ferramenta que reduz a fricção de "ideia para post publicável" de horas para menos de 3 minutos, usando IA para gerar hooks virais e estruturar carrosséis seguindo frameworks de copywriting comprovados.

### 1.2 Problema

**Contexto:**  
- Alunos investem tempo estudando o método iBreathwork (neurociência da respiração, protocolos terapêuticos, aplicações clínicas)
- Dominam o conteúdo técnico mas não sabem "traduzir" conhecimento em conteúdo viral
- Síndrome do impostor: "não sou bom com conteúdo", "não sei escrever", "não tenho ideias"
- Resultado: conhecimento adquirido não se transforma em autoridade nas redes sociais

**Dores Específicas:**
1. **Bloqueio da página em branco:** Não sabem por onde começar um carrossel
2. **Falta de estrutura:** Posts desorganizados, sem narrativa clara
3. **Sem viralização:** Conteúdo técnico demais, não atrai atenção
4. **Inconsistência:** Postam uma vez e desistem por falta de ideias
5. **Design como barreira:** Mesmo com texto pronto, travam no Canva/design

**Validação do Problema:**  
- Observação direta: alunos ativos no curso mas sem presença nas redes
- Feedback qualitativo: "eu sei o conteúdo, mas não sei criar posts"
- Potencial de teste: mentor validará com 3 alunos antes do desenvolvimento completo

### 1.3 Solução Proposta

**Como Funciona (Fluxo de 3 Etapas):**

**ETAPA 1 - INPUT (30 segundos):**  
Usuário digita uma ideia simples (ex: "dicas para controlar ansiedade") e define configurações opcionais (tom, objetivo, emojis, quantidade de slides).

**ETAPA 2 - HOOK (15 segundos):**  
IA gera 3-5 hooks virais baseados em 8 tipos de abertura comprovados. Usuário escolhe o preferido e clica em "Gerar Carrossel".

**ETAPA 3 - DOWNLOAD (2 minutos):**  
IA cria carrossel completo (8 slides) seguindo framework Hook → Reter → Recompensar. Usuário personaliza foto de perfil, username, tema (claro/escuro) e baixa todos os slides em PNG otimizado para Instagram.

**Diferenciais:**
- ✅ **Máxima simplicidade:** Apenas 1 campo obrigatório (a ideia)
- ✅ **Velocidade:** Menos de 3 minutos do início ao download
- ✅ **Qualidade de IA:** Clone do estilo Alex Hormozi + método iBreathwork
- ✅ **Sem design manual:** Preview WYSIWYG, export automático
- ✅ **Baixo risco:** Ferramenta interna, sem monetização inicial

### 1.4 Métricas de Sucesso

| Métrica | Meta MVP (Fase 1) | Como Medir | Meta Fase 2 (Alunos) |
|---------|-------------------|------------|----------------------|
| **Taxa de Conversão (Ideia → Download)** | 90% | Analytics de funil | 80% |
| **Tempo Médio por Carrossel** | < 3 minutos | Timestamp de início e fim | < 2 minutos |
| **Carrosséis Publicáveis sem Edição** | 70% (7/10) | Feedback qualitativo do mentor | 60% |
| **Frequência de Uso (Mentor)** | 10 carrosséis em 1 semana | Contagem de exports | 1/semana per aluno |
| **Taxa de Publicação Real** | N/A (só mentor) | Manual | 50% (gera E publica) |
| **NPS (Net Promoter Score)** | N/A | N/A | 8+/10 |
| **Custo de API por Carrossel** | < $0.04 | Logs da Anthropic API | < $0.03 |
| **Economia de Tempo Reportada** | 2+ horas/semana | Survey pós-teste | 3+ horas/semana |

**Métricas de Qualidade (Qualitativas):**
- Mentor aprova 7/10 carrosséis sem edições
- Hooks gerados são "no estilo do mentor"
- Alunos reportam: "agora consigo postar consistentemente"
- Aumento de posts com branding iBreathwork nas redes

---

## 2. ESCOPO

### 2.1 Dentro do Escopo (MVP - Fase 1)

**INTERFACE:**
- ✅ **Tela 1 - Formulário de Input:**
  - Campo textarea: "Qual sua ideia?" (obrigatório)
  - Accordion colapsável com configurações opcionais:
    - Dropdown: Objetivo (Educar | Viralizar | Engajar | Vender)
    - Dropdown: Tom (Técnico | Inspirador | Direto)
    - Dropdown: Emojis (Nenhum | Poucos | Muitos)
    - Slider: Quantidade de slides (7-20, default 8)
  - Botão primário: "Gerar Hooks"

- ✅ **Tela 2 - Seleção de Hook:**
  - IA gera 3-5 hooks virais (loading state 3-5 segundos)
  - Cards clicáveis com preview de cada hook
  - Botão secundário: "Gerar Outros Hooks" (regenerar)
  - Botão primário: "Gerar Carrossel" (após seleção de hook)

- ✅ **Tela 3 - Preview & Download:**
  - Preview visual dos 8 slides (estilo Twitter)
  - Controles globais:
    - Upload de foto de perfil (circular, 80x80px)
    - Input text: @username
    - Toggle: Tema Claro | Escuro
  - Botão primário: "Baixar Todos os Slides" (ZIP ou individual)
  - Botão secundário: "Gerar Novo Carrossel"

**BACKEND:**
- ✅ Integração com Anthropic Claude Sonnet 4 API
- ✅ Sistema de prompts com few-shot learning (exemplos do mentor)
- ✅ Geração de hooks baseada em 8 tipos virais
- ✅ Geração de carrossel completo (8 slides) com framework estruturado
- ✅ Validação de input (máximo de caracteres, sanitização)
- ✅ Rate limiting básico (5 carrosséis por usuário por dia)

**EXPORT:**
- ✅ Rendering de slides em HTML Canvas
- ✅ Export PNG em alta resolução (1080x1350px portrait)
- ✅ Download individual por slide ou ZIP com todos
- ✅ Metadados embarcados (username, data, tema)

**AUTENTICAÇÃO (Mínimo Viável):**
- ✅ Login simples com email (Supabase Auth ou Clerk)
- ✅ Whitelist de emails permitidos (mentor + lista de alunos)
- ✅ Sem cadastro aberto (controle total de acesso)

**PERSISTÊNCIA:**
- ✅ Salvar histórico de carrosséis gerados (últimos 10)
- ✅ Associar foto de perfil ao usuário (reutilizar)
- ✅ Salvar username padrão por usuário

### 2.2 Fora do Escopo (Futuro - Fase 2+)

**INTERFACE AVANÇADA:**
- ❌ Editor de texto por slide (aceitar ou regenerar tudo no MVP)
- ❌ Drag & drop de elementos
- ❌ Posicionamento customizado de texto/imagem
- ❌ Customização de cores além de claro/escuro
- ❌ Múltiplos templates visuais
- ❌ Preview de como ficará no feed do Instagram

**FEATURES DE PRODUTIVIDADE:**
- ❌ Calendário de conteúdo / agendamento
- ❌ Sugestões de ideias baseadas em tendências
- ❌ Biblioteca de hooks por categoria
- ❌ Analytics de performance (likes, shares)
- ❌ A/B testing de hooks

**INTEGRAÇÕES:**
- ❌ Publicação direta no Instagram (Meta API)
- ❌ Integração com Google Drive / Dropbox
- ❌ Webhook para n8n (automações)
- ❌ Export para PDF / PowerPoint

**IA AVANÇADA:**
- ❌ RAG com documentação completa do método iBreathwork
- ❌ Fine-tuning de modelo customizado
- ❌ Geração de imagens com Midjourney/DALL-E
- ❌ Análise semântica de posts de concorrentes

**MONETIZAÇÃO:**
- ❌ Sistema de créditos/pagamento
- ❌ Planos (free/pro)
- ❌ Licenciamento para outros mentores

### 2.3 Dependências

| Dependência | Tipo | Status | Impacto | Nota |
|-------------|------|--------|---------|------|
| **Anthropic API Key** | Externa | ⚠️ Pendente | Bloqueante | Solicitar key antes do dev |
| **Exemplos de Hooks do Mentor** | Conteúdo | ⚠️ Pendente | Crítico | Necessário para few-shot learning |
| **Whitelist de Emails dos Alunos** | Conteúdo | ⚠️ Pendente | Médio | Pode ser adicionado depois |
| **Mockup Visual Aprovado** | Design | ⚠️ Pendente | Bloqueante | 3 exemplos de slides necessários |
| **Validação com 3 Alunos** | Pesquisa | 🟡 Opcional | Baixo | Recomendado mas não bloqueante |
| **Supabase Projeto Configurado** | Infra | ✅ Pode criar | Baixo | 5 minutos de setup |
| **Domínio/Hospedagem** | Infra | ✅ Vercel grátis | Baixo | Deploy automático |

**Riscos de Dependências:**
- 🔴 **Alto:** Se Anthropic API ficar indisponível → Fallback para OpenAI (GPT-4)
- 🟡 **Médio:** Se mentor não fornecer exemplos → Usar hooks genéricos (qualidade menor)
- 🟢 **Baixo:** Rate limit da API → Implementar fila / retry logic

---

## 3. USUÁRIO

### 3.1 Persona Principal

**Nome:** Marina Terapêutica  
**Idade:** 35 anos  
**Profissão:** Psicóloga especializada em terapias integrativas  
**Localização:** São Paulo, SP  
**Contexto:** Aluna ativa do curso iBreathwork, 60% de progresso

**Perfil:**
- Formação acadêmica sólida em psicologia clínica
- Atende 15-20 pacientes por semana em consultório próprio
- Interesse crescente em neurociência aplicada à terapia
- Quer se posicionar como autoridade em breathwork terapêutico
- Instagram com 1.200 seguidores (mostly pacientes e colegas)

**Dores:**
- **"Não sei criar conteúdo:"** Domina a teoria mas trava ao escrever posts
- **Síndrome do impostor:** "Ainda estou aprendendo, não posso ensinar"
- **Falta de tempo:** Atendimentos tomam todo o dia, sobra pouco para marketing
- **Canva é um desafio:** Acha as ferramentas de design complexas e frustrantes
- **Inconsistência:** Postou 3 vezes em 2024, depois abandonou

**Objetivos:**
- Postar 1-2x por semana de forma consistente
- Educar seguidores sobre breathwork sem parecer "guru"
- Atrair pacientes interessados em terapias integrativas
- Construir autoridade gradual (não viralizar a todo custo)

**Contexto de Uso:**
- **Quando:** Domingos à noite (prepara semana) ou intervalos entre pacientes
- **Onde:** Notebook em casa ou celular no consultório
- **Frequência esperada:** 2-3 carrosséis por semana (ideal)
- **Nível técnico:** Intermediário (usa Instagram, Google Docs, Notion)

**Citações:**
> "Eu sei explicar HRV para um paciente, mas não sei transformar isso em post."

> "Quando abro o Canva fico 2 horas tentando e desisto."

> "Se alguém me desse o texto pronto, eu publicaria."

### 3.2 Jornada do Usuário

```
SITUAÇÃO ATUAL (Sem BreathAI)
┌─────────────────────────────────────────────────────────────┐
│ 1. Decide criar conteúdo (motivação inicial)                │
│    ↓ Tempo: Domingo 20h                                     │
│ 2. Abre Google Docs para escrever                           │
│    ↓ Bloqueio: "Sobre o que escrever?"                      │
│ 3. Pesquisa no Google "ideias de posts breathwork"          │
│    ↓ Tempo gasto: 30 minutos                                │
│ 4. Tenta escrever texto do zero                             │
│    ↓ Bloqueio: "Isso está ruim, ninguém vai ler"           │
│ 5. Desiste ou escreve texto técnico demais                  │
│    ↓ Frustração: Alta                                       │
│ 6. Se continuar: Abre Canva                                 │
│    ↓ Bloqueio: "Qual template? Como deixar bonito?"        │
│ 7. Luta com design por 1-2 horas                            │
│    ↓ Resultado: 1 slide mal feito ou abandono              │
│ 8. Não publica OU publica algo que não gera engajamento    │
│    ↓ Sensação: "Não sou boa com conteúdo"                  │
│                                                             │
│ TEMPO TOTAL: 2-3 horas                                      │
│ TAXA DE CONCLUSÃO: 20%                                      │
│ SATISFAÇÃO: 2/10                                            │
└─────────────────────────────────────────────────────────────┘

SITUAÇÃO COM BREATHAI
┌─────────────────────────────────────────────────────────────┐
│ 1. Acessa BreathAI (bookmark salvo)                         │
│    ↓ Tempo: Domingo 20h                                     │
│ 2. Digita ideia simples: "ansiedade e respiração"           │
│    ↓ Tempo: 20 segundos                                     │
│ 3. Clica "Gerar Hooks"                                       │
│    ↓ IA processa (3 segundos)                               │
│ 4. Vê 5 hooks virais, escolhe: "Ansioso? Faça isso AGORA"   │
│    ↓ Tempo: 15 segundos                                     │
│ 5. Clica "Gerar Carrossel"                                   │
│    ↓ IA cria 8 slides estruturados (5 segundos)             │
│ 6. Preview mostra carrossel pronto (estilo Twitter)         │
│    ↓ Validação: "Nossa, ficou profissional!"                │
│ 7. Faz upload da foto, digita @username, escolhe tema       │
│    ↓ Tempo: 1 minuto                                        │
│ 8. Clica "Baixar Todos os Slides" → recebe ZIP              │
│    ↓ Tempo: 10 segundos                                     │
│ 9. Abre Instagram, faz upload do carrossel, publica         │
│    ↓ Sensação: "Finalmente consigo postar!"                 │
│                                                             │
│ TEMPO TOTAL: 2 minutos 50 segundos                          │
│ TAXA DE CONCLUSÃO: 90%                                      │
│ SATISFAÇÃO: 9/10                                            │
└─────────────────────────────────────────────────────────────┘

IMPACTO:
• Redução de 95% no tempo (3h → 3min)
• Aumento de 350% na taxa de conclusão (20% → 90%)
• Quebra de 3 bloqueios principais:
  1. Bloqueio criativo → IA sugere hooks
  2. Bloqueio de estrutura → Framework automático
  3. Bloqueio de design → Export pronto
```

### 3.3 Proposta de Valor

**Para Marina (e alunos do iBreathwork):**

> **"Transforme seu conhecimento em breathwork em carrosséis virais em menos de 3 minutos — sem bloqueio criativo, sem Canva, sem desculpas."**

**Benefícios Concretos:**
1. **Velocidade:** De horas para minutos (95% de redução)
2. **Consistência:** Postar semanalmente vira hábito sustentável
3. **Qualidade:** Hooks no estilo Alex Hormozi (comprovadamente virais)
4. **Confiança:** IA remove síndrome do impostor ("o texto está bom")
5. **Simplicidade:** Apenas 1 campo obrigatório, 3 cliques

**Proposta Emocional:**
- ✅ Menos frustração, mais criação
- ✅ Menos "não sei fazer", mais "já fiz"
- ✅ Menos perfeccionismo paralisante, mais iteração rápida

---

## 4. USER STORIES

### US-01: Gerar Hooks Virais a partir de Ideia Simples
**Prioridade:** 🔴 Must Have

**Como** aluna do curso iBreathwork  
**Quero** digitar uma ideia simples sobre respiração  
**Para que** a IA me sugira 3-5 hooks virais que chamem atenção

**Critérios de Aceitação:**
- [ ] Campo de texto aceita entre 10 e 500 caracteres
- [ ] IA retorna entre 3 e 5 hooks em menos de 5 segundos
- [ ] Cada hook tem no máximo 80 caracteres (legível em preview)
- [ ] Hooks seguem os 8 tipos virais do método (5 erros, Se você X, Faça isso antes, etc.)
- [ ] Loading state claro durante processamento ("Gerando hooks...")
- [ ] Se API falhar, exibe mensagem amigável + botão "Tentar Novamente"
- [ ] Hooks gerados são gramaticalmente corretos em português BR
- [ ] Tom dos hooks alinha com configuração escolhida (Técnico/Inspirador/Direto)

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Input vazio | Botão "Gerar Hooks" desabilitado + tooltip "Digite sua ideia primeiro" |
| Input < 10 caracteres | Mensagem: "Descreva sua ideia com mais detalhes (mínimo 10 caracteres)" |
| Input > 500 caracteres | Contador vermelho + mensagem: "Simplifique sua ideia (máximo 500 caracteres)" |
| API timeout (>10s) | Mensagem: "A IA está sobrecarregada. Tente novamente em 30 segundos." |
| API erro 500 | Mensagem: "Erro ao gerar hooks. Entre em contato com suporte." + log no Sentry |
| Sem conexão internet | Mensagem: "Verifique sua conexão e tente novamente" |

**Dados de Teste:**
```json
{
  "ideia_valida": "Como usar respiração para controlar ansiedade no trabalho",
  "ideia_curta": "ansiedade",
  "ideia_longa": "Lorem ipsum dolor sit amet... (>500 chars)",
  "ideia_ofensiva": "Como usar breathwork para [conteúdo inapropriado]"
}
```

---

### US-02: Escolher Hook Preferido Visualmente
**Prioridade:** 🔴 Must Have

**Como** aluna do curso iBreathwork  
**Quero** ver os hooks sugeridos em cards clicáveis  
**Para que** possa escolher rapidamente o mais atrativo

**Critérios de Aceitação:**
- [ ] Hooks exibidos em cards de tamanho igual (grid ou lista)
- [ ] Hover no card: borda colorida + lift suave (transform: translateY(-4px))
- [ ] Click no card: seleção visual clara (borda verde #4CAF50, ícone de checkmark)
- [ ] Apenas 1 hook pode ser selecionado por vez
- [ ] Botão "Gerar Carrossel" aparece APENAS após seleção de hook
- [ ] Cards mostram preview do texto completo (sem truncar)
- [ ] Responsivo: 1 coluna em mobile, 2-3 em desktop

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Nenhum hook selecionado | Botão "Gerar Carrossel" invisível ou desabilitado |
| Click em hook já selecionado | Desseleciona (permite trocar de ideia) |
| Click em "Gerar Outros Hooks" | Desseleciona hook atual + loading + novos hooks |

---

### US-03: Gerar Carrossel Completo com IA
**Prioridade:** 🔴 Must Have

**Como** aluna do curso iBreathwork  
**Quero** clicar em "Gerar Carrossel" após escolher o hook  
**Para que** a IA crie automaticamente 8 slides estruturados

**Critérios de Aceitação:**
- [ ] IA gera exatamente N slides (onde N = slider de quantidade, default 8)
- [ ] Slide 1: Hook escolhido pelo usuário
- [ ] Slide 2: Contexto ("Por que isso importa agora")
- [ ] Slides 3-6: Conteúdo numerado ou sequencial (dicas, passos, erros)
- [ ] Slide 7: Resumo que cumpre promessa do hook
- [ ] Slide 8: CTA baseado no objetivo (Salve/Comente/Siga)
- [ ] Cada slide tem máximo 30 palavras (legibilidade)
- [ ] Emojis inseridos conforme configuração (Nenhum/Poucos/Muitos)
- [ ] Texto alinhado ao tom escolhido (Técnico/Inspirador/Direto)
- [ ] Slides criam curiosidade progressiva (gatilho de swipe)
- [ ] Geração completa em menos de 10 segundos

**Regras de Negócio:**

| ID | Regra | Condição | Ação | Exceção |
|----|-------|----------|------|---------|
| RN-01 | Limite de palavras | Cada slide | Máximo 30 palavras | Slide 1 (hook) pode ter até 80 caracteres |
| RN-02 | Emojis por slide | Configuração "Muitos" | 2-3 emojis por slide | Slide de resumo: 1 emoji |
| RN-03 | Tom técnico | Tom = "Técnico" | Incluir termos: HRV, SNA, Nervo Vago | Não usar em TODOS os slides |
| RN-04 | CTA personalizado | Objetivo = "Vender" | CTA: "Saiba mais no link da bio" | — |
| RN-05 | Contexto neurocientífico | Sempre | Slide 2 menciona mecanismo fisiológico | — |

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| IA retorna slide com >30 palavras | Backend trunca automaticamente OU regenera o slide |
| IA retorna menos slides que solicitado | Exibe warning: "Geramos X slides em vez de Y. Gerar novamente?" |
| IA retorna conteúdo ofensivo | Filtro de moderação bloqueia + log + mensagem: "Conteúdo inadequado detectado" |
| Timeout (>15s) | Mensagem: "A geração está demorando. Aguarde mais 10s ou cancele." |

---

### US-04: Visualizar Preview dos Slides (Estilo Twitter)
**Prioridade:** 🔴 Must Have

**Como** aluna do curso iBreathwork  
**Quero** ver um preview visual de como ficará cada slide  
**Para que** possa validar antes de baixar

**Critérios de Aceitação:**
- [ ] Preview mostra TODOS os slides gerados (scroll vertical)
- [ ] Cada slide renderizado no estilo Twitter:
  - Tema Claro: fundo branco (#FFFFFF), texto preto (#000000)
  - Tema Escuro: fundo preto (#000000), texto branco (#FFFFFF)
  - Fonte: Arial ou Helvetica, tamanho 32-40px
  - Texto centralizado vertical e horizontal
  - Aspect ratio: 1080x1350px (4:5 portrait)
- [ ] Foto de perfil aparece no topo esquerdo (80x80px circular)
- [ ] Username aparece abaixo da foto (@username)
- [ ] Toggle "Tema Claro/Escuro" alterna preview em tempo real
- [ ] Preview é responsivo (reduz proporcionalmente em mobile)
- [ ] Numeração de slides visível (1/8, 2/8, etc.) no canto

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Foto de perfil não carregada | Exibe avatar padrão (círculo cinza com ícone de usuário) |
| Username vazio | Placeholder: "@seu_usuario" em cinza |
| Texto muito longo para caber | Font-size reduz dinamicamente OU quebra em 2-3 linhas |

---

### US-05: Customizar Foto de Perfil e Username
**Prioridade:** 🔴 Must Have

**Como** aluna do curso iBreathwork  
**Quero** fazer upload da minha foto e digitar meu username  
**Para que** os slides fiquem personalizados para meu Instagram

**Critérios de Aceitação:**
- [ ] Botão "Upload Foto" aceita JPG, PNG, WEBP (máx 5MB)
- [ ] Foto redimensionada automaticamente para 80x80px
- [ ] Crop circular aplicado (bordas arredondadas)
- [ ] Preview da foto atualiza em tempo real nos slides
- [ ] Campo de texto "@username" valida formato:
  - Apenas letras, números, underscores, pontos
  - Máximo 30 caracteres
  - Sempre adiciona @ no início se usuário não digitou
- [ ] Foto e username salvos no perfil do usuário (reutilizáveis)
- [ ] Botão "Remover Foto" volta ao avatar padrão

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Arquivo > 5MB | Mensagem: "Imagem muito grande. Reduza para menos de 5MB." |
| Formato inválido (ex: PDF) | Mensagem: "Formato não suportado. Use JPG, PNG ou WEBP." |
| Username com caracteres especiais | Remove automaticamente OU mensagem: "Use apenas letras, números e _" |
| Upload falha | Mensagem: "Erro ao enviar foto. Tente novamente." |

---

### US-06: Baixar Todos os Slides em PNG de Alta Resolução
**Prioridade:** 🔴 Must Have

**Como** aluna do curso iBreathwork  
**Quero** clicar em "Baixar Todos os Slides"  
**Para que** receba um ZIP com os 8 PNGs prontos para Instagram

**Critérios de Aceitação:**
- [ ] Botão "Baixar Todos os Slides" sempre visível na tela de preview
- [ ] Click inicia renderização de TODOS os slides em Canvas
- [ ] Cada slide exportado como PNG:
  - Resolução: 1080x1350px (4:5 portrait)
  - Qualidade: 95% (sem compressão visível)
  - Nome do arquivo: `breathai_slide_1.png`, `breathai_slide_2.png`, etc.
- [ ] Todos os PNGs compactados em ZIP: `breathai_carrossel_[timestamp].zip`
- [ ] Download automático via browser (sem necessidade de server-side)
- [ ] Loading state durante renderização (1-3 segundos)
- [ ] Mensagem de sucesso: "✅ 8 slides baixados com sucesso!"

**Regras de Negócio:**

| ID | Regra | Condição | Ação | Exceção |
|----|-------|----------|------|---------|
| RN-06 | Aspect ratio Instagram | Sempre | Export DEVE ser 1080x1350px | Se usuário mudar isso no futuro, validar |
| RN-07 | Qualidade PNG | Sempre | Mínimo 95% de qualidade | Não comprimir demais (evita artefatos) |
| RN-08 | Limite de tamanho | Cada PNG | Máximo 2MB por arquivo | Instagram rejeita > 8MB |

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Renderização falha em 1 slide | Retry automático 1x + mensagem de erro se persistir |
| Browser não suporta Canvas | Mensagem: "Seu navegador não é compatível. Use Chrome ou Firefox." |
| Foto de perfil não carregou | Usa avatar padrão no export (não bloqueia) |

---

### US-07: Regenerar Hooks Alternativos
**Prioridade:** 🟡 Should Have

**Como** aluna do curso iBreathwork  
**Quero** clicar em "Gerar Outros Hooks" se não gostar dos primeiros  
**Para que** tenha mais opções antes de escolher

**Critérios de Aceitação:**
- [ ] Botão "Gerar Outros Hooks" visível na tela de seleção
- [ ] Click limpa hooks atuais + loading + gera novos 3-5 hooks
- [ ] Novos hooks são DIFERENTES dos anteriores (cache/deduplicação)
- [ ] Limitado a 3 regenerações consecutivas (evitar abuso de API)
- [ ] Após 3x, mensagem: "Limite atingido. Tente uma ideia diferente."
- [ ] Histórico de hooks não é salvo (usuário escolhe e avança)

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Limite de 3 regenerações atingido | Botão desabilitado + tooltip explicativo |
| API retorna hooks idênticos | Frontend filtra duplicatas + gera novamente se <3 únicos |

---

### US-08: Salvar Histórico de Carrosséis Gerados
**Prioridade:** 🟡 Should Have

**Como** aluna do curso iBreathwork  
**Quero** que meus últimos 10 carrosséis fiquem salvos  
**Para que** possa baixar novamente ou revisar depois

**Critérios de Aceitação:**
- [ ] Após gerar carrossel, salva automaticamente no banco (Supabase)
- [ ] Campos salvos:
  - Timestamp de criação
  - Ideia original (input do usuário)
  - Hook escolhido
  - Array de textos dos 8 slides
  - Foto de perfil (URL do Supabase Storage)
  - Username
  - Tema (claro/escuro)
- [ ] Menu lateral: "Meus Carrosséis" mostra últimos 10
- [ ] Click em item do histórico: carrega preview completo
- [ ] Botão "Baixar Novamente" disponível para cada item
- [ ] Carrosséis mais antigos que 90 dias são deletados automaticamente (LGPD)

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Falha ao salvar no banco | Mensagem: "Não conseguimos salvar. Baixe agora para não perder." |
| Histórico vazio | Empty state: "Você ainda não gerou carrosséis" |

---

### US-09: Validar Acesso por Whitelist de Emails
**Prioridade:** 🔴 Must Have

**Como** administrador (mentor)  
**Quero** controlar quem pode acessar o BreathAI  
**Para que** apenas alunos do curso usem a ferramenta

**Critérios de Aceitação:**
- [ ] Login exige email + código de verificação (Supabase Magic Link ou Clerk)
- [ ] Backend valida se email está na whitelist (tabela `allowed_users`)
- [ ] Se email NÃO está na lista: mensagem "Acesso negado. Entre em contato com o suporte."
- [ ] Se email ESTÁ na lista: login bem-sucedido + redireciona para dashboard
- [ ] Administrador pode adicionar/remover emails via painel admin (fora do MVP)
- [ ] Whitelist inicial: apenas email do mentor

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Email não está na whitelist | Tela de erro amigável: "Seu email não está autorizado. Se você é aluno do curso, entre em contato." |
| Email inválido (formato errado) | Validação frontend: "Digite um email válido" |
| Tentativas excessivas (>5x) | Rate limit: "Muitas tentativas. Aguarde 10 minutos." |

---

### US-10: Rate Limit de Carrosséis por Usuário
**Prioridade:** 🟡 Should Have

**Como** administrador (mentor)  
**Quero** limitar cada usuário a 5 carrosséis por dia  
**Para que** custos de API não escalem descontroladamente

**Critérios de Aceitação:**
- [ ] Backend conta quantos carrosséis o usuário gerou nas últimas 24h
- [ ] Se < 5: permite gerar normalmente
- [ ] Se = 5: botão "Gerar Carrossel" desabilitado + mensagem:
  - "Você atingiu o limite diário de 5 carrosséis. Recarrega amanhã às [hora]."
- [ ] Reset automático às 00:00 (fuso horário do servidor)
- [ ] Contador visível no header: "3/5 carrosséis hoje"

**Casos de Erro:**

| Condição | Comportamento Esperado |
|----------|------------------------|
| Usuário tenta burlar (clear cookies) | Validação server-side impede (JWT associado ao user_id) |
| Limite especial para mentor | Mentor tem limite de 20/dia (configurável no banco) |

---

## 5. ESPECIFICAÇÕES TÉCNICAS

### 5.1 Stack Tecnológico

| Camada | Tecnologia | Versão | Justificativa |
|--------|------------|--------|---------------|
| **Linguagem (Frontend)** | TypeScript | 5.3+ | Type safety, menos bugs, melhor DX |
| **Framework (Frontend)** | Next.js | 14.2+ (App Router) | SSR, API Routes integradas, Vercel deploy |
| **UI Library** | React | 18.3+ | Ecosistema maduro, hooks, performance |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first, rápido desenvolvimento |
| **Componentes UI** | shadcn/ui | Latest | Componentes acessíveis, customizáveis |
| **Backend** | Next.js API Routes | — | Simplicidade, sem servidor separado |
| **Banco de Dados** | Supabase (PostgreSQL) | Latest | Gratuito até 500MB, Auth integrado |
| **Storage (Fotos)** | Supabase Storage | — | CDN grátis, LGPD-compliant (Brasil) |
| **Autenticação** | Supabase Auth | — | Magic links, fácil whitelist |
| **IA** | Anthropic Claude Sonnet 4 | `claude-sonnet-4-20250514` | Melhor custo/benefício, alta qualidade |
| **Rendering** | html2canvas | 1.4.1 | Client-side PNG export, leve |
| **Deploy** | Vercel | — | CI/CD automático, Edge Functions |
| **Monitoramento** | Sentry | — | Error tracking, performance monitoring |

**Alternativas Consideradas e Descartadas:**

| Alternativa | Por que NÃO escolheu |
|-------------|---------------------|
| Fabric.js para rendering | Complexo demais para MVP simples |
| Puppeteer (server-side) | Custo de infra + latência alta |
| OpenAI GPT-4 | Mais caro ($0.03/1k vs $0.015/1k) |
| Firebase Auth | Supabase já escolhido para DB |
| Clerk Auth | Overkill para whitelist simples |
| AWS Lambda | Lock-in vendor, configuração complexa |

### 5.2 Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                        │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Tela 1:     │  │  Tela 2:     │  │  Tela 3:        │  │
│  │  Formulário  │─▶│  Escolha     │─▶│  Preview &      │  │
│  │  de Input    │  │  de Hook     │  │  Download       │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│         │                   │                   │          │
│         └───────────────────┴───────────────────┘          │
│                             │                              │
│                             ▼                              │
│                    ┌─────────────────┐                     │
│                    │  State Manager  │                     │
│                    │  (React Context)│                     │
│                    └─────────────────┘                     │
│                             │                              │
└─────────────────────────────┼──────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS API ROUTES                       │
│                    (Vercel Edge Functions)                  │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ /api/generate-   │  │ /api/generate-   │               │
│  │  hooks           │  │  carousel        │               │
│  └──────────────────┘  └──────────────────┘               │
│           │                     │                          │
│           └─────────┬───────────┘                          │
│                     │                                      │
└─────────────────────┼──────────────────────────────────────┘
                      │
         ┌────────────┼────────────┐
         │            │            │
         ▼            ▼            ▼
┌──────────────┐ ┌────────────┐ ┌──────────────┐
│  Anthropic   │ │  Supabase  │ │  Supabase    │
│  API         │ │  PostgreSQL│ │  Storage     │
│  (Claude)    │ │  (Dados)   │ │  (Fotos)     │
└──────────────┘ └────────────┘ └──────────────┘
     │                │                │
     │ JSON           │ SQL            │ CDN URL
     ▼                ▼                ▼
┌─────────────────────────────────────────────┐
│          RESPONSE PARA CLIENTE              │
│  • Hooks gerados (array de strings)        │
│  • Carrossel gerado (array de 8 slides)    │
│  • Foto de perfil (URL pública do CDN)     │
└─────────────────────────────────────────────┘
```

**Fluxo de Dados Detalhado:**

**ETAPA 1 - Geração de Hooks:**
```
1. User digita ideia → Frontend valida (10-500 chars)
2. Frontend envia POST /api/generate-hooks:
   {
     "ideia": "como controlar ansiedade",
     "objetivo": "Educar",
     "tom": "Direto",
     "user_id": "uuid-123"
   }
3. Backend valida rate limit (Redis ou DB)
4. Backend chama Anthropic API:
   - System prompt + Few-shot examples do mentor
   - User prompt com ideia + configurações
5. Anthropic retorna 5 hooks em JSON
6. Backend retorna para frontend:
   {
     "hooks": [
       "5 formas de acalmar sua ansiedade em segundos",
       "Ansiedade? Faça isso AGORA",
       ...
     ],
     "timestamp": "2026-01-23T20:30:00Z"
   }
```

**ETAPA 2 - Geração de Carrossel:**
```
1. User seleciona hook → Frontend armazena no state
2. User clica "Gerar Carrossel" → Frontend envia POST /api/generate-carousel:
   {
     "hook_escolhido": "Ansiedade? Faça isso AGORA",
     "ideia_original": "como controlar ansiedade",
     "quantidade_slides": 8,
     "tom": "Direto",
     "emojis": "Poucos",
     "user_id": "uuid-123"
   }
3. Backend valida rate limit novamente
4. Backend chama Anthropic API com prompt estruturado:
   - Slide 1: Hook (já definido)
   - Slide 2: Contexto neurocientífico
   - Slides 3-6: Dicas práticas
   - Slide 7: Resumo
   - Slide 8: CTA
5. Anthropic retorna carrossel completo:
   {
     "slides": [
       {"numero": 1, "texto": "Ansiedade? Faça isso AGORA"},
       {"numero": 2, "texto": "Quando ansioso, seu corpo entra em modo luta/fuga"},
       ...
     ]
   }
6. Backend salva no Supabase (tabela `carousels`)
7. Backend retorna para frontend
```

**ETAPA 3 - Export PNG:**
```
1. User customiza foto/username → Frontend atualiza state
2. User clica "Baixar Todos" → Frontend renderiza cada slide:
   - Cria Canvas de 1080x1350px
   - Desenha fundo (branco ou preto)
   - Desenha texto centralizado (font-size ajustado)
   - Desenha foto de perfil (80x80px circular)
   - Desenha username
3. html2canvas converte Canvas → PNG Blob
4. Repete para 8 slides → Array de 8 Blobs
5. JSZip compacta Blobs → breathai_carrossel_[timestamp].zip
6. Download automático via <a> tag com href=blob URL
```

### 5.3 Modelos de Dados

#### **Tabela: `users`**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  profile_photo_url TEXT, -- URL do Supabase Storage
  username TEXT, -- @username padrão
  is_whitelisted BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'student', -- 'student' | 'mentor' | 'admin'
  daily_carousel_limit INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_whitelisted ON users(is_whitelisted) WHERE is_whitelisted = TRUE;
```

**Relacionamentos:**
- `users` 1:N `carousels` (um usuário gera múltiplos carrosséis)
- `users` 1:N `rate_limits` (controle de limites diários)

#### **Tabela: `carousels`**
```sql
CREATE TABLE carousels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  original_idea TEXT NOT NULL, -- Input do usuário
  selected_hook TEXT NOT NULL, -- Hook escolhido
  slides JSONB NOT NULL, -- Array de objetos: [{"numero": 1, "texto": "..."}]
  config JSONB NOT NULL, -- {"objetivo": "Educar", "tom": "Direto", "emojis": "Poucos", "theme": "light"}
  profile_photo_url TEXT, -- Snapshot da foto usada
  username TEXT, -- Snapshot do username usado
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '90 days' -- LGPD
);

-- Índices
CREATE INDEX idx_carousels_user ON carousels(user_id);
CREATE INDEX idx_carousels_created ON carousels(created_at DESC);
CREATE INDEX idx_carousels_expires ON carousels(expires_at);

-- Trigger para deletar automaticamente carrosséis expirados
CREATE OR REPLACE FUNCTION delete_expired_carousels()
RETURNS void AS $$
BEGIN
  DELETE FROM carousels WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Agendar execução diária (via pg_cron ou Supabase Functions)
SELECT cron.schedule('delete-expired-carousels', '0 3 * * *', 'SELECT delete_expired_carousels()');
```

**Exemplo de `slides` JSONB:**
```json
[
  {"numero": 1, "texto": "Ansiedade? Faça isso AGORA"},
  {"numero": 2, "texto": "Quando ansioso, seu corpo entra em modo luta/fuga"},
  {"numero": 3, "texto": "Dica 1: Respire lento (4 segundos inspira, 8 expira)"},
  {"numero": 4, "texto": "Dica 2: Sinta os pés no chão"},
  {"numero": 5, "texto": "Dica 3: Nomeie 5 coisas que você vê"},
  {"numero": 6, "texto": "Dica 4: Solte os ombros"},
  {"numero": 7, "texto": "Resumo: Respire + Aterrar + Observar + Relaxar"},
  {"numero": 8, "texto": "Salve para usar quando precisar"}
]
```

**Exemplo de `config` JSONB:**
```json
{
  "objetivo": "Educar",
  "tom": "Direto",
  "emojis": "Poucos",
  "theme": "light",
  "slides_count": 8
}
```

#### **Tabela: `rate_limits`**
```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource TEXT NOT NULL, -- 'hooks' | 'carousels'
  count INTEGER DEFAULT 0,
  reset_at TIMESTAMP WITH TIME ZONE NOT NULL, -- Próximo reset (00:00 do dia seguinte)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE UNIQUE INDEX idx_rate_limits_user_resource ON rate_limits(user_id, resource, DATE(reset_at));

-- Função helper para incrementar contador
CREATE OR REPLACE FUNCTION increment_rate_limit(
  p_user_id UUID,
  p_resource TEXT
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
  v_reset_at TIMESTAMP WITH TIME ZONE := DATE_TRUNC('day', NOW()) + INTERVAL '1 day';
BEGIN
  -- Upsert
  INSERT INTO rate_limits (user_id, resource, count, reset_at)
  VALUES (p_user_id, p_resource, 1, v_reset_at)
  ON CONFLICT (user_id, resource, DATE(reset_at))
  DO UPDATE SET count = rate_limits.count + 1
  RETURNING count INTO v_count;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

**Relacionamentos:**
- `rate_limits` N:1 `users` (múltiplos recursos limitados por usuário)

### 5.4 Endpoints/APIs

#### **`POST /api/auth/login`**

| Aspecto | Detalhe |
|---------|---------|
| **Descrição** | Envia magic link para email do usuário |
| **Auth** | Não requer (endpoint público) |
| **Rate Limit** | 5 tentativas por IP a cada 15 minutos |
| **Input** | `{ "email": "usuario@email.com" }` |
| **Output Sucesso** | `{ "message": "Email enviado. Verifique sua caixa de entrada." }` (200) |
| **Erros** | 400: Email inválido<br>403: Email não está na whitelist<br>429: Rate limit excedido<br>500: Erro ao enviar email |

**Exemplo de Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "marina@terapiarespiracao.com"
}
```

**Exemplo de Response (Sucesso):**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Email enviado. Verifique sua caixa de entrada.",
  "email": "marina@terapiarespiracao.com"
}
```

**Exemplo de Response (Erro - Não Autorizado):**
```json
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "Email não autorizado. Entre em contato com o suporte.",
  "code": "EMAIL_NOT_WHITELISTED"
}
```

**Lógica do Endpoint:**
```typescript
// Pseudo-código
async function POST_login(req) {
  const { email } = req.body;
  
  // Validar formato
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }
  
  // Checar whitelist
  const user = await supabase
    .from('users')
    .select('id, is_whitelisted')
    .eq('email', email)
    .single();
  
  if (!user || !user.is_whitelisted) {
    return res.status(403).json({ 
      error: "Email não autorizado. Entre em contato com o suporte.",
      code: "EMAIL_NOT_WHITELISTED"
    });
  }
  
  // Enviar magic link
  const { error } = await supabase.auth.signInWithOtp({ email });
  
  if (error) {
    return res.status(500).json({ error: "Erro ao enviar email" });
  }
  
  return res.status(200).json({ 
    message: "Email enviado. Verifique sua caixa de entrada.",
    email 
  });
}
```

---

#### **`POST /api/generate-hooks`**

| Aspecto | Detalhe |
|---------|---------|
| **Descrição** | Gera 3-5 hooks virais baseados na ideia do usuário |
| **Auth** | Requer (Bearer token do Supabase Auth) |
| **Rate Limit** | 10 gerações por usuário a cada hora |
| **Input** | `{ "ideia": string (10-500 chars), "objetivo": string, "tom": string }` |
| **Output Sucesso** | `{ "hooks": string[], "timestamp": ISO8601 }` (200) |
| **Erros** | 400: Input inválido<br>401: Não autenticado<br>429: Rate limit excedido<br>500: Erro da API de IA<br>503: IA indisponível (timeout) |

**Exemplo de Request:**
```json
POST /api/generate-hooks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "ideia": "Como usar respiração para controlar ansiedade no trabalho",
  "objetivo": "Educar",
  "tom": "Direto"
}
```

**Exemplo de Response (Sucesso):**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "hooks": [
    "5 formas de acalmar sua ansiedade em segundos",
    "Ansiedade? Faça isso AGORA",
    "Se você é ansioso, isso é pra você",
    "A verdade sobre ansiedade que ninguém te conta",
    "Você está piorando sua ansiedade sem saber"
  ],
  "timestamp": "2026-01-23T20:30:15Z",
  "tokens_used": {
    "input": 487,
    "output": 142
  }
}
```

**Prompt System para Claude:**
```
Você é um especialista em copywriting viral treinado no estilo Alex Hormozi, 
adaptado para o método iBreathwork de neurociência respiratória.

Seu objetivo: criar hooks (aberturas) que parem o scroll e gerem curiosidade.

REGRAS OBRIGATÓRIAS:
1. Hooks devem ter entre 40-80 caracteres
2. Use linguagem direta, sem floreios
3. Crie urgência ou curiosidade
4. Adapte ao contexto de breathwork/neurociência quando relevante
5. Evite jargão excessivamente técnico

TIPOS DE HOOKS VIRAIS:
1. Lista numerada: "5 erros que te impedem de [resultado]"
2. Desafio: "Você está sabotando seu [área] sem saber"
3. Urgência: "Faça isso antes de [ação] e mude sua vida"
4. Identificação: "Se você [sintoma], leia isso"
5. Autoridade: "A ciência de [tema] em X slides"
6. Promessa clara: "[Resultado] em [tempo] com [método]"
7. Contradição: "Todo mundo faz [X], mas deveriam fazer [Y]"
8. Segredo revelado: "A verdade sobre [tema] que [grupo] não conta"

EXEMPLOS DO MENTOR [Método iBreathwork]:
- "Ansiedade crônica? Sua respiração pode ser a causa"
- "5 sinais de que seu sistema nervoso está em colapso"
- "Faça isso 2 minutos antes de dormir e acorde renovado"

---

TAREFA: Gere 5 hooks virais baseados nesta ideia:
IDEIA: "{user_input.ideia}"
OBJETIVO: {user_input.objetivo}
TOM: {user_input.tom}

Retorne APENAS um array JSON com 5 strings:
["Hook 1", "Hook 2", "Hook 3", "Hook 4", "Hook 5"]
```

**Lógica do Endpoint:**
```typescript
async function POST_generate_hooks(req) {
  const user = await authenticateUser(req); // JWT validation
  
  // Validar input
  const { ideia, objetivo, tom } = req.body;
  if (!ideia || ideia.length < 10 || ideia.length > 500) {
    return res.status(400).json({ error: "Ideia deve ter entre 10 e 500 caracteres" });
  }
  
  // Checar rate limit
  const currentCount = await incrementRateLimit(user.id, 'hooks');
  if (currentCount > 10) {
    return res.status(429).json({ 
      error: "Limite de 10 gerações por hora excedido. Tente novamente em breve.",
      reset_at: "2026-01-23T21:00:00Z"
    });
  }
  
  // Chamar Claude API
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 500,
    messages: [{
      role: "user",
      content: buildHooksPrompt(ideia, objetivo, tom)
    }]
  });
  
  // Parsear JSON da resposta
  const hooks = JSON.parse(response.content[0].text);
  
  return res.status(200).json({
    hooks,
    timestamp: new Date().toISOString(),
    tokens_used: {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens
    }
  });
}
```

---

#### **`POST /api/generate-carousel`**

| Aspecto | Detalhe |
|---------|---------|
| **Descrição** | Gera carrossel completo (8 slides) baseado no hook escolhido |
| **Auth** | Requer (Bearer token do Supabase Auth) |
| **Rate Limit** | 5 gerações por usuário por dia |
| **Input** | `{ "hook_escolhido": string, "ideia_original": string, "config": {...} }` |
| **Output Sucesso** | `{ "carousel_id": UUID, "slides": [...], "config": {...} }` (200) |
| **Erros** | 400: Input inválido<br>401: Não autenticado<br>429: Limite diário excedido<br>500: Erro da API de IA |

**Exemplo de Request:**
```json
POST /api/generate-carousel
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "hook_escolhido": "Ansiedade? Faça isso AGORA",
  "ideia_original": "Como usar respiração para controlar ansiedade no trabalho",
  "config": {
    "objetivo": "Educar",
    "tom": "Direto",
    "emojis": "Poucos",
    "slides_count": 8
  }
}
```

**Exemplo de Response (Sucesso):**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "carousel_id": "550e8400-e29b-41d4-a716-446655440000",
  "slides": [
    {"numero": 1, "texto": "Ansiedade? Faça isso AGORA"},
    {"numero": 2, "texto": "Quando ansioso, seu corpo entra em modo luta/fuga 🧠"},
    {"numero": 3, "texto": "Dica 1: Respire lento (4 segundos inspira, 8 expira)"},
    {"numero": 4, "texto": "Dica 2: Sinta os pés no chão ⚓"},
    {"numero": 5, "texto": "Dica 3: Nomeie 5 coisas que você vê"},
    {"numero": 6, "texto": "Dica 4: Solte os ombros"},
    {"numero": 7, "texto": "Resumo: Respire + Aterrar + Observar + Relaxar"},
    {"numero": 8, "texto": "Salve para usar quando precisar 💾"}
  ],
  "config": {
    "objetivo": "Educar",
    "tom": "Direto",
    "emojis": "Poucos",
    "theme": "light",
    "slides_count": 8
  },
  "created_at": "2026-01-23T20:35:42Z",
  "tokens_used": {
    "input": 623,
    "output": 487
  }
}
```

**Prompt System para Claude (Geração de Carrossel):**
```
Você é um especialista em criar carrosséis virais para Instagram no estilo 
Alex Hormozi adaptado ao método iBreathwork.

ESTRUTURA OBRIGATÓRIA:
- SLIDE 1: Hook (já definido pelo usuário)
- SLIDE 2: Contexto - Por que isso importa agora (neurocientífico quando relevante)
- SLIDES 3-6: Conteúdo (dicas práticas, passos, erros comuns)
- SLIDE 7: Resumo que cumpre a promessa do hook
- SLIDE 8: CTA (call-to-action) baseado no objetivo

REGRAS DE COPYWRITING:
1. Máximo 30 palavras por slide (CRÍTICO: quebra de linha para legibilidade)
2. Uma ideia por slide (clareza)
3. Criar curiosidade progressiva (gatilho de swipe)
4. Usar numeração quando for lista (1., 2., 3...)
5. Emojis: {config.emojis} ("Nenhum" = 0, "Poucos" = 1-2 por slide, "Muitos" = 2-3)
6. Tom: {config.tom}
   - "Técnico" = Incluir termos como HRV, SNA, Nervo Vago (mas não em TODOS os slides)
   - "Inspirador" = Linguagem motivacional, metáforas
   - "Direto" = Comandos imperativos, sem rodeios

CONTEXTO DO MÉTODO IBREATHWORK:
- Foco em neurociência da respiração
- Protocolos baseados em evidências
- Aplicações para ansiedade, estresse, foco, sono, trauma
- Público: terapeutas, psicólogos, coaches, praticantes

EXEMPLOS DE SLIDES BEM ESCRITOS:
Slide 2 (Contexto): "Quando ansioso, seu corpo entra em modo luta/fuga 🧠"
Slide 3 (Dica): "Dica 1: Respire lento (4 segundos inspira, 8 expira)"
Slide 7 (Resumo): "Resumo: Respire + Aterrar + Observar + Relaxar"
Slide 8 (CTA): "Salve para usar quando precisar 💾"

---

TAREFA: Gere um carrossel completo de {config.slides_count} slides.

HOOK ESCOLHIDO: "{input.hook_escolhido}"
IDEIA ORIGINAL: "{input.ideia_original}"
OBJETIVO: {config.objetivo}
TOM: {config.tom}
EMOJIS: {config.emojis}

Retorne APENAS um array JSON:
[
  {"numero": 1, "texto": "{hook escolhido}"},
  {"numero": 2, "texto": "..."},
  ...
]

IMPORTANTE: Cada "texto" deve ter NO MÁXIMO 30 palavras.
```

**Lógica do Endpoint:**
```typescript
async function POST_generate_carousel(req) {
  const user = await authenticateUser(req);
  
  // Validar input
  const { hook_escolhido, ideia_original, config } = req.body;
  if (!hook_escolhido || !ideia_original) {
    return res.status(400).json({ error: "Hook e ideia são obrigatórios" });
  }
  
  // Checar rate limit diário
  const dailyLimit = user.daily_carousel_limit || 5;
  const currentCount = await getDailyCarouselCount(user.id);
  if (currentCount >= dailyLimit) {
    return res.status(429).json({
      error: `Limite diário de ${dailyLimit} carrosséis atingido. Recarrega amanhã.`,
      reset_at: getNextMidnight(),
      current_count: currentCount,
      limit: dailyLimit
    });
  }
  
  // Chamar Claude API
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [{
      role: "user",
      content: buildCarouselPrompt(hook_escolhido, ideia_original, config)
    }]
  });
  
  // Parsear JSON da resposta
  const slides = JSON.parse(response.content[0].text);
  
  // Validar que cada slide tem max 30 palavras
  slides.forEach(slide => {
    const wordCount = slide.texto.split(' ').length;
    if (wordCount > 30) {
      // Truncar ou lançar erro
      slide.texto = slide.texto.split(' ').slice(0, 30).join(' ') + '...';
    }
  });
  
  // Salvar no banco
  const { data: carousel } = await supabase
    .from('carousels')
    .insert({
      user_id: user.id,
      original_idea: ideia_original,
      selected_hook: hook_escolhido,
      slides: slides,
      config: config
    })
    .select()
    .single();
  
  // Incrementar contador de rate limit
  await incrementRateLimit(user.id, 'carousels');
  
  return res.status(200).json({
    carousel_id: carousel.id,
    slides: slides,
    config: config,
    created_at: carousel.created_at,
    tokens_used: {
      input: response.usage.input_tokens,
      output: response.usage.output_tokens
    }
  });
}
```

---

#### **`POST /api/upload-profile-photo`**

| Aspecto | Detalhe |
|---------|---------|
| **Descrição** | Faz upload da foto de perfil para Supabase Storage |
| **Auth** | Requer (Bearer token) |
| **Rate Limit** | 10 uploads por hora |
| **Input** | FormData com `file` (JPG/PNG/WEBP, max 5MB) |
| **Output Sucesso** | `{ "url": string, "thumbnail_url": string }` (200) |
| **Erros** | 400: Formato inválido ou arquivo muito grande<br>401: Não autenticado<br>413: Payload too large<br>500: Erro no storage |

**Exemplo de Request:**
```http
POST /api/upload-profile-photo
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="foto.jpg"
Content-Type: image/jpeg

[binary data]
------WebKitFormBoundary--
```

**Exemplo de Response (Sucesso):**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "url": "https://xyzabc.supabase.co/storage/v1/object/public/profile-photos/550e8400-e29b-41d4-a716-446655440000.jpg",
  "thumbnail_url": "https://xyzabc.supabase.co/storage/v1/object/public/profile-photos/550e8400-e29b-41d4-a716-446655440000_thumb.jpg",
  "uploaded_at": "2026-01-23T20:40:12Z"
}
```

**Lógica do Endpoint:**
```typescript
async function POST_upload_profile_photo(req) {
  const user = await authenticateUser(req);
  const file = req.files.file;
  
  // Validar formato e tamanho
  const allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedFormats.includes(file.mimetype)) {
    return res.status(400).json({ 
      error: "Formato não suportado. Use JPG, PNG ou WEBP." 
    });
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5MB
    return res.status(413).json({ 
      error: "Arquivo muito grande. Máximo 5MB." 
    });
  }
  
  // Processar imagem (redimensionar para 80x80px)
  const thumbnail = await sharp(file.data)
    .resize(80, 80, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toBuffer();
  
  // Upload para Supabase Storage
  const filename = `${user.id}.jpg`;
  const { data, error } = await supabase.storage
    .from('profile-photos')
    .upload(filename, thumbnail, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) {
    return res.status(500).json({ error: "Erro ao fazer upload" });
  }
  
  // Gerar URL pública
  const { data: urlData } = supabase.storage
    .from('profile-photos')
    .getPublicUrl(filename);
  
  // Atualizar perfil do usuário
  await supabase
    .from('users')
    .update({ profile_photo_url: urlData.publicUrl })
    .eq('id', user.id);
  
  return res.status(200).json({
    url: urlData.publicUrl,
    thumbnail_url: urlData.publicUrl,
    uploaded_at: new Date().toISOString()
  });
}
```

---

### 5.5 Regras de Negócio

| ID | Regra | Condição | Ação | Exceção |
|----|-------|----------|------|---------|
| **RN-01** | Limite de palavras por slide | Cada slide gerado | Máximo 30 palavras | Slide 1 (hook) pode ter até 80 caracteres |
| **RN-02** | Emojis por configuração | Config "Muitos" | 2-3 emojis por slide | Slide 8 (CTA): sempre 1 emoji relacionado à ação |
| **RN-03** | Tom técnico moderado | Config "Técnico" | Incluir termos: HRV, SNA, Nervo Vago, mas não em TODOS os slides | Máximo 3 slides com jargão técnico |
| **RN-04** | CTA personalizado | Baseado em "objetivo" | Educar → "Salve", Viralizar → "Compartilhe", Engajar → "Comente", Vender → "Link na bio" | — |
| **RN-05** | Contexto neurocientífico | Slide 2 sempre | Mencionar mecanismo fisiológico (ex: "sistema nervoso", "resposta ao estresse") | Só se relevante ao tema |
| **RN-06** | Aspect ratio fixo | Export de PNG | SEMPRE 1080x1350px (4:5 portrait) | Usuário NÃO pode mudar isso no MVP |
| **RN-07** | Qualidade PNG mínima | Export | Qualidade JPEG 95% (se converter) | Não comprimir demais |
| **RN-08** | Rate limit diário | Usuário comum | 5 carrosséis/dia | Mentor: 20 carrosséis/dia (configurável no DB) |
| **RN-09** | Rate limit de hooks | Por hora | 10 gerações de hooks/hora | Previne abuso de API |
| **RN-10** | Retenção de dados | Carrosséis salvos | Deletar automaticamente após 90 dias | Conformidade LGPD |
| **RN-11** | Whitelist obrigatória | Login | Apenas emails na tabela `users` com `is_whitelisted=TRUE` podem acessar | Mentor sempre tem acesso |
| **RN-12** | Foto de perfil | Upload | Redimensionar para 80x80px + crop circular | Se não houver foto, usar avatar padrão (ícone) |
| **RN-13** | Username validação | Input de texto | Apenas letras, números, underscores, pontos. Max 30 chars | Adicionar @ automaticamente se não tiver |
| **RN-14** | Geração de hooks | Quantidade | Sempre gerar 5 hooks (não 3, não 7) | Se API retornar <5, tentar novamente |
| **RN-15** | Histórico | Salvamento automático | Após gerar carrossel, salvar automaticamente no banco | Não salvar se usuário cancelar antes de ver preview |

---

## 6. UI/UX

### 6.1 Mapa de Telas

```
[Login / Auth]
    │
    ├─── [Tela 1: Formulário de Input]
    │         │
    │         ├─── [Tela 2: Seleção de Hook]
    │         │         │
    │         │         ├─── [Tela 3: Preview & Download]
    │         │         │         │
    │         │         │         ├─── [Download Completo] → FIM
    │         │         │         │
    │         │         │         └─── [Gerar Novo] → Volta para Tela 1
    │         │         │
    │         │         └─── [Gerar Outros Hooks] → Loop Tela 2
    │         │
    │         └─── [Menu Lateral: Histórico]
    │                   │
    │                   └─── [Visualizar Carrossel Anterior]
    │                             │
    │                             └─── [Baixar Novamente] → Download
    │
    └─── [Logout]
```

### 6.2 Descrição das Telas

#### **Tela 0: Login / Auth**

**Propósito:** Autenticar usuário via magic link (sem senha)

**Elementos:**
- **Logo do BreathAI** (topo centralizado)
- **Campo de input:** Email (placeholder: "seu@email.com")
- **Botão primário:** "Enviar Link de Acesso" (verde #4CAF50)
- **Texto informativo:** "Enviamos um link mágico para seu email. Clique para acessar."
- **Footer:** "Apenas alunos do curso iBreathwork podem acessar"

**Comportamento:**
- Usuário digita email → Click em "Enviar Link"
- Loading 2s → Mensagem: "Email enviado! Verifique sua caixa de entrada."
- Se email NÃO está na whitelist: "Acesso negado. Entre em contato."
- Após click no link do email: Redireciona para Tela 1

**Ações disponíveis:**
- **Enviar Link** → Chama POST /api/auth/login

---

#### **Tela 1: Formulário de Input**

**Propósito:** Capturar ideia do usuário e configurações opcionais

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  [≡] BreathAI                    [👤 Marina] [⚙️]      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [96px espaço superior]                                 │
│                                                         │
│  Transforme sua ideia em carrossel viral ✨             │ ← Heading 1
│  Em menos de 3 minutos                                  │ ← Subtitle
│                                                         │
│  [48px espaço]                                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Qual sua ideia?  *                              │   │
│  │  ┌─────────────────────────────────────────────┐│   │
│  │  │ Como usar respiração para controlar         ││   │
│  │  │ ansiedade no trabalho                       ││   │ ← Textarea
│  │  │                                             ││   │   3 linhas
│  │  └─────────────────────────────────────────────┘│   │
│  │  10/500 caracteres                              │   │ ← Contador
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [32px espaço]                                          │
│                                                         │
│  ▼ Configurações Avançadas (opcional)                   │ ← Accordion
│  ┌─────────────────────────────────────────────────┐   │   colapsado
│  │  Objetivo:  [Educar ▼]                          │   │
│  │  Tom:       [Direto ▼]                          │   │
│  │  Emojis:    [Poucos ▼]                          │   │
│  │  Slides:    [●────────] 8 slides                │   │ ← Slider 7-20
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [48px espaço]                                          │
│                                                         │
│  ╔═════════════════════════════════════════════════╗   │
│  ║          Gerar Hooks Virais                     ║   │ ← Botão primário
│  ╚═════════════════════════════════════════════════╝   │   verde #4CAF50
│                                                         │
│  [96px espaço inferior]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**
1. **Header fixo:**
   - Logo BreathAI (esquerda)
   - Avatar do usuário (direita, clicável para menu)
   - Ícone de configurações (direita)

2. **Título e subtítulo:**
   - "Transforme sua ideia em carrossel viral ✨" (text-4xl, bold)
   - "Em menos de 3 minutos" (text-lg, cinza)

3. **Campo principal:**
   - Label: "Qual sua ideia? *" (obrigatório)
   - Textarea: 3 linhas, auto-expand até 8 linhas
   - Contador de caracteres: "X/500" (verde se válido, vermelho se inválido)
   - Placeholder: "Ex: Como usar respiração para ansiedade"

4. **Accordion "Configurações Avançadas":**
   - Colapsado por default
   - Ao expandir, mostra:
     - **Objetivo:** Dropdown com 4 opções (Educar, Viralizar, Engajar, Vender)
     - **Tom:** Dropdown com 3 opções (Técnico, Inspirador, Direto)
     - **Emojis:** Dropdown com 3 opções (Nenhum, Poucos, Muitos)
     - **Quantidade de Slides:** Slider de 7 a 20 (default: 8)

5. **Botão CTA primário:**
   - "Gerar Hooks Virais"
   - Desabilitado se input < 10 caracteres
   - Click → Loading state (spinner + texto "Gerando hooks...") → Redireciona para Tela 2

**Comportamento Responsivo:**
- **Desktop (>1024px):** Max-width 800px, centralizado
- **Tablet (768-1024px):** Padding lateral 48px
- **Mobile (<768px):** Full-width, padding 24px

**Estados:**
- **Idle:** Botão habilitado, contador neutro
- **Input < 10 chars:** Botão desabilitado, contador vermelho
- **Input 10-500 chars:** Botão habilitado, contador verde
- **Input > 500 chars:** Mensagem de erro, contador vermelho, botão desabilitado
- **Loading:** Botão vira spinner, texto "Gerando hooks..."

**Ações disponíveis:**
- **Gerar Hooks Virais** → POST /api/generate-hooks → Vai para Tela 2
- **Avatar do usuário** → Dropdown menu (Meus Carrosséis, Configurações, Logout)

---

#### **Tela 2: Seleção de Hook**

**Propósito:** Exibir 5 hooks gerados e permitir seleção

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  [←] Voltar            BreathAI           [👤] [⚙️]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [64px espaço superior]                                 │
│                                                         │
│  Escolha o hook que mais chama atenção 🎣               │ ← Heading 1
│                                                         │
│  [32px espaço]                                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  1.  5 formas de acalmar sua ansiedade em       │   │ ← Hook card
│  │      segundos                                   │   │   borda cinza
│  │                                                 │   │   hover: verde
│  │  [Click para selecionar]                        │   │   click: selected
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [16px espaço]                                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ✓  Ansiedade? Faça isso AGORA                  │   │ ← Hook SELECIONADO
│  │                                                 │   │   borda verde
│  │  [Selecionado]                                  │   │   background verde claro
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [16px espaço]                                          │
│                                                         │
│  [... 3 hooks restantes ...]                            │
│                                                         │
│  [48px espaço]                                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ↻  Gerar Outros Hooks                          │   │ ← Botão secundário
│  └─────────────────────────────────────────────────┘   │   outline verde
│                                                         │
│  [16px espaço]                                          │
│                                                         │
│  ╔═════════════════════════════════════════════════╗   │
│  ║          Gerar Carrossel                        ║   │ ← Botão primário
│  ╚═════════════════════════════════════════════════╝   │   só aparece após seleção
│                                                         │
│  [64px espaço inferior]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**
1. **Header com botão voltar:**
   - Seta "←" Voltar (esquerda)
   - Logo BreathAI (centro)
   - Avatar + settings (direita)

2. **Título:**
   - "Escolha o hook que mais chama atenção 🎣"

3. **Grid/Lista de Hooks:**
   - 5 cards verticais (stack em mobile, grid 2 colunas em tablet)
   - Cada card:
     - Número do hook (1-5) em cinza
     - Texto do hook (text-xl, bold)
     - Estado padrão: borda cinza, background branco
     - Hover: borda verde, lift suave
     - Selecionado: borda verde grossa, background verde claro (#E8F5E9), ícone ✓

4. **Botão "Gerar Outros Hooks":**
   - Estilo secundário (outline verde, background transparente)
   - Limitado a 3 cliques (após isso, desabilita)

5. **Botão "Gerar Carrossel":**
   - Estilo primário (verde sólido)
   - **Só aparece** após seleção de hook
   - Click → Loading (spinner 5s) → Redireciona para Tela 3

**Comportamento:**
- **Ao carregar:** 5 hooks exibidos, nenhum selecionado
- **Click em hook:** Desseleciona anterior + seleciona novo
- **Click em "Gerar Outros":** Loading → Substitui 5 hooks por novos
- **Após 3 regenerações:** Botão desabilitado + tooltip "Limite atingido. Tente uma ideia diferente."
- **Click em "Gerar Carrossel":** Loading state (10s) → Tela 3

**Ações disponíveis:**
- **Voltar** → Retorna para Tela 1 (sem perder ideia digitada)
- **Selecionar Hook** → Marca como selecionado
- **Gerar Outros Hooks** → POST /api/generate-hooks (mesma ideia, novos hooks)
- **Gerar Carrossel** → POST /api/generate-carousel → Vai para Tela 3

---

#### **Tela 3: Preview & Download**

**Propósito:** Visualizar slides gerados e customizar antes de baixar

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  [←] Voltar            BreathAI           [👤] [⚙️]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Seu carrossel está pronto! 🎉                          │ ← Heading 1
│                                                         │
│  [32px espaço]                                          │
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │  CONTROLES DE CUSTOMIZAÇÃO                         ││
│  │                                                     ││
│  │  ┌───────────┐  [📷 Upload Foto]                   ││
│  │  │  [Avatar] │  @username: [marina_terapia]        ││
│  │  └───────────┘                                      ││
│  │                                                     ││
│  │  Tema:  ○ Claro  ● Escuro                          ││
│  │                                                     ││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  [32px espaço]                                          │
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │  PREVIEW DOS SLIDES (Scroll Vertical)              ││
│  │                                                     ││
│  │  ┌────────────────────────────┐  ← Slide 1/8       ││
│  │  │                            │                     ││
│  │  │  [Avatar]  @marina_terapia │                     ││
│  │  │                            │                     ││
│  │  │                            │                     ││
│  │  │     Ansiedade? Faça        │                     ││
│  │  │     isso AGORA             │  ← Text centralizado││
│  │  │                            │     (tema escuro:   ││
│  │  │                            │      fundo preto,   ││
│  │  │                            │      texto branco)  ││
│  │  │                            │                     ││
│  │  │                         1/8│                     ││
│  │  └────────────────────────────┘                     ││
│  │                                                     ││
│  │  [16px espaço]                                      ││
│  │                                                     ││
│  │  ┌────────────────────────────┐  ← Slide 2/8       ││
│  │  │  [Avatar]  @marina_terapia │                     ││
│  │  │                            │                     ││
│  │  │  Quando ansioso, seu corpo │                     ││
│  │  │  entra em modo luta/fuga 🧠│                     ││
│  │  │                            │                     ││
│  │  │                         2/8│                     ││
│  │  └────────────────────────────┘                     ││
│  │                                                     ││
│  │  [... slides 3-8 ...]                               ││
│  │                                                     ││
│  └────────────────────────────────────────────────────┘│
│                                                         │
│  [48px espaço]                                          │
│                                                         │
│  ╔═════════════════════════════════════════════════╗   │
│  ║    📥  Baixar Todos os Slides (ZIP)             ║   │ ← Botão primário
│  ╚═════════════════════════════════════════════════╝   │   verde
│                                                         │
│  [16px espaço]                                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ↻  Gerar Novo Carrossel                        │   │ ← Botão secundário
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [64px espaço inferior]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**
1. **Título celebratório:**
   - "Seu carrossel está pronto! 🎉"

2. **Painel de Customização (card no topo):**
   - **Upload de Foto:**
     - Preview circular 80x80px (ou avatar padrão se não houver)
     - Botão "📷 Upload Foto"
     - Click abre file picker (JPG/PNG/WEBP, max 5MB)
   - **Campo @username:**
     - Input text com placeholder "@seu_usuario"
     - Validação em tempo real (só permite letras, números, _, .)
   - **Toggle Tema:**
     - Radio buttons: ○ Claro  ● Escuro
     - Mudança em tempo real no preview

3. **Preview de Slides:**
   - Container com scroll vertical
   - Cada slide renderizado como no exemplo do Twitter:
     - **Tema Claro:** Fundo branco (#FFFFFF), texto preto (#000000)
     - **Tema Escuro:** Fundo preto (#000000), texto branco (#FFFFFF)
     - **Foto de perfil:** 80x80px circular no topo esquerdo
     - **Username:** Abaixo da foto, text-sm
     - **Texto principal:** Centralizado vertical+horizontal, font-size 32-40px
     - **Numeração:** "X/8" no canto inferior direito, text-xs
   - Aspect ratio: 1080x1350px (4:5 portrait)
   - Responsivo: reduz proporcionalmente em mobile

4. **Botão "Baixar Todos os Slides":**
   - Verde primário, ícone de download
   - Click → Loading (1-3s) → Gera ZIP com 8 PNGs → Download automático
   - Mensagem de sucesso: "✅ 8 slides baixados com sucesso!"

5. **Botão "Gerar Novo Carrossel":**
   - Secundário (outline)
   - Retorna para Tela 1

**Comportamento:**
- **Ao carregar:** Preview com foto/username do perfil do usuário (salvos)
- **Upload de foto:** Preview atualiza em tempo real em todos os slides
- **Digitação de @username:** Preview atualiza em tempo real
- **Toggle tema:** Preview alterna de branco→preto ou preto→branco instantaneamente
- **Click "Baixar":**
  - Renderiza cada slide em Canvas (1080x1350px)
  - Converte para PNG (qualidade 95%)
  - Compacta em ZIP
  - Triggera download via blob URL
  - Salva carrossel no histórico (banco de dados)

**Ações disponíveis:**
- **Voltar** → Retorna para Tela 2 (não perde carrossel gerado)
- **Upload Foto** → POST /api/upload-profile-photo
- **Baixar Todos** → Renderiza Canvas + export PNG + ZIP
- **Gerar Novo** → Retorna para Tela 1 (limpa state)

---

### 6.3 Design Direction

**Estilo Visual Geral:**
- **Minimalista e Limpo:** Inspirado no design system iBreathwork ("Breathing Space")
- **Cores Primárias:**
  - Verde botânico #4CAF50 (CTAs principais, estados ativos)
  - Branco #FFFFFF (background principal)
  - Cinza claro #F4F6F5 (backgrounds secundários)
  - Preto #000000 (texto primário, tema escuro)
- **Tipografia:**
  - Headings: Outfit (geométrica, moderna)
  - Body: Inter (alta legibilidade)
  - Tamanhos: Mínimo 16px (corpo), headings 24-40px
- **Espaçamento:**
  - Grid 8pt (8px, 16px, 24px, 32px, 48px, 64px, 96px)
  - Whitespace generoso (nunca comprimir elementos)
- **Sombras:**
  - Suaves e sutis: `box-shadow: 0 4px 6px rgba(0,0,0,0.05)`
  - Hover: lift com sombra maior
- **Border Radius:**
  - Cards: 16px
  - Botões: 12px
  - Inputs: 8px
- **Transições:**
  - 200-300ms ease-out
  - Hover effects suaves (translateY, box-shadow)

**Inspiração de Referência:**
- **Notion:** Whitespace generoso, hierarquia clara
- **Linear:** Minimalista, transições suaves
- **Twitter (Estilo dos Slides):** Texto centralizado, fundo sólido, máxima legibilidade

**Design Tokens (Tailwind CSS):**
```css
// cores
primary: '#4CAF50',
neutral: {
  50: '#FAFBFA',
  100: '#F4F6F5',
  600: '#5C6B64',
  900: '#1A2621'
},
// espaçamento
2: '8px',
4: '16px',
6: '24px',
8: '32px',
12: '48px',
16: '64px',
24: '96px',
// fontes
fontFamily: {
  display: ['Outfit', 'Inter', 'system-ui'],
  body: ['Inter', '-apple-system', 'sans-serif']
},
// border radius
borderRadius: {
  card: '16px',
  button: '12px',
  input: '8px'
}
```

---

## 7. EDGE CASES E ERROS

### 7.1 Cenários de Borda

| Cenário | Comportamento Esperado | Prioridade |
|---------|----------------------|------------|
| **IA retorna hook com >80 caracteres** | Backend trunca para 80 + "..." OU regenera automaticamente | Alta |
| **IA retorna slide com >30 palavras** | Backend trunca para 30 palavras + "..." | Alta |
| **IA retorna conteúdo ofensivo** | Filtro de moderação (palavras-chave) bloqueia + log + mensagem amigável | Alta |
| **Usuário digita ideia ofensiva** | Validação frontend + mensagem: "Conteúdo inadequado. Reformule sua ideia." | Alta |
| **Foto de perfil muito grande (>5MB)** | Validação frontend: "Imagem muito grande. Reduza para menos de 5MB." | Alta |
| **Upload de foto falha** | Retry automático 1x → Se falhar novamente: mensagem de erro + usa avatar padrão | Média |
| **Username com caracteres especiais** | Remove automaticamente caracteres inválidos em tempo real | Média |
| **Input vazio no formulário** | Botão "Gerar Hooks" desabilitado + tooltip: "Digite sua ideia primeiro" | Alta |
| **Anthropic API timeout (>15s)** | Mensagem: "A IA está demorando. Aguarde mais 10s ou tente novamente." | Alta |
| **Anthropic API erro 500** | Log no Sentry + mensagem: "Erro ao gerar. Tente novamente em alguns instantes." | Alta |
| **Anthropic API limite de rate** | Mensagem: "Limite de requisições atingido. Aguarde 1 minuto." + disable botão | Média |
| **Usuário sem conexão internet** | Mensagem: "Verifique sua conexão e tente novamente" | Alta |
| **Tentativa de login com email não whitelistado** | Tela de erro amigável: "Seu email não está autorizado. Se você é aluno, entre em contato." | Alta |
| **Tentativa de burlar rate limit (clear cookies)** | Validação server-side via JWT/user_id impede | Média |
| **Regeneração de hooks retorna hooks idênticos** | Frontend filtra duplicatas + gera automaticamente novamente se <3 únicos | Baixa |
| **Carrossel gerado com apenas 6 slides (menos que solicitado)** | Warning: "Geramos 6 slides em vez de 8. Gerar novamente?" | Média |
| **Texto do slide não cabe na tela (muito longo)** | Font-size reduz dinamicamente (min 24px) OU quebra em 2-3 linhas | Média |
| **Download de ZIP falha** | Oferece download individual slide por slide + mensagem de erro | Média |
| **Histórico vazio (primeiro acesso)** | Empty state: "Você ainda não gerou carrosséis. Comece agora!" | Baixa |
| **Carrossel expirado (>90 dias)** | Deletado automaticamente (LGPD) + não aparece no histórico | Baixa |
| **Usuário tenta gerar 6º carrossel no mesmo dia** | Mensagem: "Limite diário de 5 carrosséis atingido. Recarrega amanhã às 00:00." | Alta |
| **Mentor ultrapassa 20 carrosséis/dia** | Mensagem customizada: "Limite de 20 carrosséis atingido. Recarrega amanhã." | Média |

### 7.2 Mensagens de Erro

| Código | Situação | Mensagem para Usuário | Ação de Fallback |
|--------|----------|----------------------|------------------|
| **E001** | Input vazio | "Digite sua ideia antes de continuar" | Disable botão |
| **E002** | Input < 10 caracteres | "Descreva sua ideia com mais detalhes (mínimo 10 caracteres)" | Disable botão |
| **E003** | Input > 500 caracteres | "Simplifique sua ideia (máximo 500 caracteres)" | Contador vermelho |
| **E004** | Conteúdo ofensivo detectado | "Conteúdo inadequado detectado. Reformule sua ideia." | Block submit |
| **E005** | Anthropic API timeout | "A IA está demorando. Aguarde mais 10s ou cancele." | Botão "Cancelar" |
| **E006** | Anthropic API erro 500 | "Erro ao gerar. Tente novamente em alguns instantes." | Log Sentry |
| **E007** | Anthropic API rate limit | "Limite de requisições atingido. Aguarde 1 minuto." | Disable por 60s |
| **E008** | Email não whitelistado | "Seu email não está autorizado. Se você é aluno do curso, entre em contato." | Link para suporte |
| **E009** | Upload de foto > 5MB | "Imagem muito grande. Reduza para menos de 5MB." | Block upload |
| **E010** | Upload formato inválido | "Formato não suportado. Use JPG, PNG ou WEBP." | Block upload |
| **E011** | Rate limit diário atingido | "Você atingiu o limite de 5 carrosséis hoje. Recarrega amanhã às [hora]." | Disable botão |
| **E012** | Sem conexão internet | "Verifique sua conexão e tente novamente" | Retry button |
| **E013** | Erro ao salvar no banco | "Não conseguimos salvar. Baixe agora para não perder." | Forçar download |
| **E014** | Download de ZIP falha | "Erro ao criar ZIP. Tente baixar slides individualmente." | Download individual |
| **E015** | Username inválido | "Use apenas letras, números, underscores e pontos" | Remove chars inválidos |

### 7.3 Validações de Input

| Campo | Regras | Mensagem de Erro | Validação |
|-------|--------|------------------|-----------|
| **Ideia** | Obrigatório, 10-500 chars | "Digite sua ideia (10-500 caracteres)" | Frontend + Backend |
| **Email (Login)** | Formato de email válido | "Digite um email válido" | Frontend + Backend |
| **Email (Login)** | Deve estar na whitelist | "Email não autorizado" | Backend only |
| **@username** | Opcional, max 30 chars, apenas [a-zA-Z0-9_.] | "Use apenas letras, números, _ e ." | Frontend (real-time) |
| **Foto de perfil** | JPG/PNG/WEBP, max 5MB | "Imagem muito grande ou formato inválido" | Frontend + Backend |
| **Objetivo** | Um dos 4 valores predefinidos | N/A (dropdown fechado) | Frontend (enum) |
| **Tom** | Um dos 3 valores predefinidos | N/A (dropdown fechado) | Frontend (enum) |
| **Emojis** | Um dos 3 valores predefinidos | N/A (dropdown fechado) | Frontend (enum) |
| **Slides Count** | Integer entre 7 e 20 | N/A (slider limitado) | Frontend (range) |

**Exemplos de Validação Frontend (React Hook Form):**
```typescript
const ideiaSchema = z.string()
  .min(10, "Descreva sua ideia com mais detalhes (mínimo 10 caracteres)")
  .max(500, "Simplifique sua ideia (máximo 500 caracteres)")
  .refine(
    (val) => !containsOffensiveWords(val),
    "Conteúdo inadequado detectado. Reformule sua ideia."
  );

const usernameSchema = z.string()
  .max(30, "Username deve ter no máximo 30 caracteres")
  .regex(/^[a-zA-Z0-9_.]+$/, "Use apenas letras, números, underscores e pontos")
  .optional();

const photoSchema = z.custom<File>()
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "Imagem muito grande. Máximo 5MB."
  )
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    "Formato não suportado. Use JPG, PNG ou WEBP."
  );
```

---

## 8. SEGURANÇA

### 8.1 Autenticação

**Método:** Magic Links via Supabase Auth (sem senha)

**Fluxo:**
1. Usuário digita email na tela de login
2. Backend valida se email está na whitelist (`users.is_whitelisted = TRUE`)
3. Se autorizado: Supabase envia email com link único (válido por 1 hora)
4. Usuário clica no link → Autenticado automaticamente
5. JWT token armazenado em cookie httpOnly (seguro)

**Expiração:**
- Token JWT: 24 horas (renovável automaticamente)
- Magic link: 1 hora (uso único)

**Refresh:**
- Supabase renova token automaticamente em background
- Usuário permanece logado por 30 dias (se marcar "Lembrar-me")

**Revogação:**
- Admin pode remover email da whitelist → Próximo login falha
- Usuário pode fazer logout → Token invalidado

### 8.2 Autorização

| Role | Permissões | Limite de Carrosséis | Acesso Especial |
|------|------------|----------------------|-----------------|
| **student** | Gerar carrosséis, visualizar histórico próprio, upload de foto | 5/dia | Nenhum |
| **mentor** | Todas as permissões de student + visualizar histórico de todos os alunos | 20/dia | Dashboard admin (fora do MVP) |
| **admin** | Todas as permissões de mentor + gerenciar whitelist | Ilimitado | Painel de configurações |

**Regras de Acesso:**
- Usuário só pode ver/editar seus próprios carrosséis
- Mentor pode ver carrosséis de todos os alunos (read-only)
- Admin pode deletar qualquer carrossel

**Implementação (Supabase RLS - Row Level Security):**
```sql
-- Política: Usuários só veem seus próprios carrosséis
CREATE POLICY "Users can view own carousels"
ON carousels FOR SELECT
USING (auth.uid() = user_id);

-- Política: Mentor vê todos os carrosséis
CREATE POLICY "Mentors can view all carousels"
ON carousels FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role IN ('mentor', 'admin')
  )
);

-- Política: Usuários só podem inserir seus próprios carrosséis
CREATE POLICY "Users can insert own carousels"
ON carousels FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Política: Apenas admin pode deletar
CREATE POLICY "Only admins can delete carousels"
ON carousels FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);
```

### 8.3 Proteções

**Implementadas no MVP:**

- [x] **Rate limiting:** 
  - Hooks: 10 gerações/hora por usuário
  - Carrosséis: 5 gerações/dia por usuário (20/dia para mentor)
  - Login: 5 tentativas/15min por IP
  - Upload: 10 uploads/hora por usuário

- [x] **CORS configurado:**
  - Apenas origin permitida: `https://breathai.vercel.app`
  - Métodos: GET, POST
  - Headers: Authorization, Content-Type

- [x] **SQL Injection prevention:**
  - Supabase usa prepared statements automaticamente
  - Nunca concatenar SQL diretamente

- [x] **XSS prevention:**
  - React escapa HTML automaticamente
  - Nunca usar `dangerouslySetInnerHTML`
  - Sanitizar input de texto com DOMPurify (se necessário)

- [x] **HTTPS obrigatório:**
  - Vercel força HTTPS automaticamente
  - Redirect HTTP → HTTPS

- [x] **Dados sensíveis criptografados:**
  - Tokens JWT assinados com chave secreta (HS256)
  - Fotos de perfil: URLs públicas mas não listadas
  - Emails: armazenados em plaintext mas protegidos por RLS

**Variáveis de Ambiente (.env.local):**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # SECRET

# Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-... # SECRET

# App
NEXT_PUBLIC_APP_URL=https://breathai.vercel.app
NODE_ENV=production

# Sentry (Monitoring)
SENTRY_DSN=https://...@sentry.io/...
```

**CRITICAL:** Nunca commitar `.env` no Git. Usar `.env.example` versionado.

---

## 9. TESTES

### 9.1 Cenários de Teste Críticos

#### **Teste 1: Fluxo End-to-End Completo**

**Setup:**
- Usuário whitelistado: `marina@teste.com`
- Banco de dados limpo (sem carrosséis anteriores)

**Ação:**
1. Acessar `https://breathai.vercel.app`
2. Fazer login com `marina@teste.com`
3. Digitar ideia: "Como usar respiração para controlar ansiedade"
4. Selecionar: Objetivo=Educar, Tom=Direto, Emojis=Poucos
5. Clicar "Gerar Hooks"
6. Selecionar hook: "Ansiedade? Faça isso AGORA"
7. Clicar "Gerar Carrossel"
8. Fazer upload de foto de perfil (JPG, 500KB)
9. Digitar @username: "marina_terapia"
10. Alternar tema para Escuro
11. Clicar "Baixar Todos os Slides"

**Resultado Esperado:**
- ✅ Login bem-sucedido (magic link recebido e funciona)
- ✅ 5 hooks gerados em <5 segundos
- ✅ Carrossel de 8 slides gerado em <10 segundos
- ✅ Preview mostra tema escuro (fundo preto, texto branco)
- ✅ Foto aparece em todos os 8 slides
- ✅ @username aparece em todos os 8 slides
- ✅ Download de ZIP contém 8 arquivos PNG (1080x1350px cada)
- ✅ Carrossel salvo no banco (`carousels` table)
- ✅ Histórico mostra carrossel recém-criado

---

#### **Teste 2: Rate Limit de Carrosséis**

**Setup:**
- Usuário comum (não mentor): `aluno@teste.com`
- Banco de dados com 4 carrosséis gerados hoje por esse usuário

**Ação:**
1. Login com `aluno@teste.com`
2. Gerar 1 carrossel (5º do dia)
3. Tentar gerar 6º carrossel

**Resultado Esperado:**
- ✅ 5º carrossel é gerado normalmente
- ✅ Após 5º, botão "Gerar Carrossel" fica desabilitado
- ✅ Mensagem exibida: "Você atingiu o limite de 5 carrosséis hoje. Recarrega amanhã às 00:00."
- ✅ Tentativa de burlar via API retorna 429 (Rate Limit Exceeded)

---

#### **Teste 3: Validação de Whitelist**

**Setup:**
- Email NÃO whitelistado: `naoautorizado@teste.com`

**Ação:**
1. Tentar fazer login com `naoautorizado@teste.com`

**Resultado Esperado:**
- ✅ Mensagem: "Seu email não está autorizado. Se você é aluno do curso, entre em contato."
- ✅ Magic link NÃO é enviado
- ✅ Log de tentativa de acesso salvo no banco (auditoria)

---

#### **Teste 4: Regeneração de Hooks (Limite de 3x)**

**Setup:**
- Usuário autenticado

**Ação:**
1. Digitar ideia: "ansiedade"
2. Gerar hooks (1ª vez)
3. Clicar "Gerar Outros Hooks" (2ª vez)
4. Clicar "Gerar Outros Hooks" (3ª vez)
5. Clicar "Gerar Outros Hooks" (4ª vez - deve falhar)

**Resultado Esperado:**
- ✅ 1ª, 2ª e 3ª gerações funcionam normalmente
- ✅ Após 3ª, botão "Gerar Outros Hooks" fica desabilitado
- ✅ Mensagem: "Limite de 3 regenerações atingido. Tente uma ideia diferente."

---

#### **Teste 5: Upload de Foto com Erro**

**Setup:**
- Usuário autenticado

**Ação:**
1. Tentar fazer upload de PDF (formato inválido)
2. Tentar fazer upload de JPG de 10MB (tamanho inválido)
3. Fazer upload de JPG válido (500KB)
4. Simular falha no Supabase Storage (desligar internet)

**Resultado Esperado:**
- ✅ PDF: Mensagem "Formato não suportado. Use JPG, PNG ou WEBP."
- ✅ 10MB: Mensagem "Imagem muito grande. Reduza para menos de 5MB."
- ✅ 500KB: Upload bem-sucedido, preview atualiza
- ✅ Falha de rede: Mensagem "Erro ao enviar foto. Tente novamente." + usa avatar padrão

---

#### **Teste 6: Conteúdo Ofensivo Detectado**

**Setup:**
- Usuário autenticado
- Lista de palavras ofensivas configurada

**Ação:**
1. Digitar ideia com palavra ofensiva: "[termo ofensivo] e respiração"
2. Tentar gerar hooks

**Resultado Esperado:**
- ✅ Mensagem: "Conteúdo inadequado detectado. Reformule sua ideia."
- ✅ Botão "Gerar Hooks" desabilitado
- ✅ Log de tentativa salvo no banco (auditoria)
- ✅ API NÃO é chamada (economia de custo)

---

#### **Teste 7: Antropic API Timeout**

**Setup:**
- Simular timeout de 15s na Anthropic API (via mock ou proxy)

**Ação:**
1. Gerar hooks ou carrossel

**Resultado Esperado:**
- ✅ Loading state por 15s
- ✅ Mensagem: "A IA está demorando. Aguarde mais 10s ou cancele."
- ✅ Botão "Cancelar" aparece
- ✅ Após 25s total: Timeout definitivo + mensagem de erro
- ✅ Erro logado no Sentry

---

### 9.2 Dados de Teste

**Usuários de Teste (Whitelist):**
```json
{
  "usuarios_validos": [
    {
      "email": "mentor@ibreathwork.com",
      "role": "mentor",
      "daily_limit": 20,
      "username": "ibreathwork_oficial"
    },
    {
      "email": "marina@teste.com",
      "role": "student",
      "daily_limit": 5,
      "username": "marina_terapia"
    },
    {
      "email": "joao@teste.com",
      "role": "student",
      "daily_limit": 5,
      "username": "joao_psicologo"
    }
  ],
  "usuarios_invalidos": [
    {
      "email": "naoautorizado@teste.com",
      "esperado": "Erro de whitelist"
    },
    {
      "email": "emailinvalido",
      "esperado": "Erro de formato"
    }
  ]
}
```

**Ideias de Teste:**
```json
{
  "ideias_validas": [
    "Como usar respiração para controlar ansiedade no trabalho",
    "5 técnicas de breathwork para melhorar o sono",
    "Respiração e trauma: o que os terapeutas precisam saber",
    "HRV e variabilidade da frequência cardíaca: guia prático"
  ],
  "ideias_invalidas": [
    "ansiedade", // < 10 caracteres
    "Lorem ipsum dolor sit amet... (>500 chars)", // > 500 caracteres
    "[termo ofensivo] e respiração", // conteúdo ofensivo
    "", // vazio
    "   " // só espaços
  ]
}
```

**Fotos de Teste:**
```json
{
  "fotos_validas": [
    {
      "nome": "foto_500kb.jpg",
      "tamanho": "500KB",
      "formato": "image/jpeg"
    },
    {
      "nome": "foto_4mb.png",
      "tamanho": "4MB",
      "formato": "image/png"
    }
  ],
  "fotos_invalidas": [
    {
      "nome": "foto_10mb.jpg",
      "tamanho": "10MB",
      "erro": "Tamanho excedido"
    },
    {
      "nome": "documento.pdf",
      "tamanho": "1MB",
      "erro": "Formato inválido"
    }
  ]
}
```

---

## 10. IMPLEMENTAÇÃO

### 10.1 Ordem de Implementação

| # | Tarefa | Estimativa | Dependência | Checkpoint |
|---|--------|------------|-------------|------------|
| **1** | Setup do projeto Next.js 14 | 15min | — | `npm run dev` roda sem erros |
| **2** | Configurar Supabase (DB + Auth) | 30min | #1 | Conexão com DB funciona |
| **3** | Criar tabelas (`users`, `carousels`, `rate_limits`) | 30min | #2 | Migrations executam |
| **4** | Implementar autenticação (magic links) | 1h | #3 | Login funciona |
| **5** | Tela 1: Formulário de Input (UI + validação) | 1h | #4 | Form valida input |
| **6** | Endpoint POST /api/generate-hooks | 1h 30min | #5 | Retorna 5 hooks |
| **7** | Tela 2: Seleção de Hook (UI + estado) | 45min | #6 | Usuário pode selecionar hook |
| **8** | Endpoint POST /api/generate-carousel | 2h | #7 | Retorna 8 slides estruturados |
| **9** | Tela 3: Preview de Slides (UI estilo Twitter) | 2h | #8 | Preview renderiza corretamente |
| **10** | Upload de foto (endpoint + UI) | 1h | #9 | Foto aparece no preview |
| **11** | Rendering Canvas → PNG export | 1h 30min | #10 | 1 slide exporta como PNG |
| **12** | Export ZIP com 8 slides | 45min | #11 | Download ZIP funciona |
| **13** | Rate limiting (backend + DB) | 1h | #8 | Limite de 5/dia funciona |
| **14** | Histórico de carrosséis (backend + UI) | 1h 30min | #12 | Últimos 10 aparecem |
| **15** | Tratamento de erros (global) | 1h | #14 | Erros são amigáveis |
| **16** | Responsividade mobile | 2h | #15 | App funciona em 320px |
| **17** | Deploy na Vercel | 30min | #16 | App acessível em prod |
| **18** | Testes end-to-end (Playwright) | 2h | #17 | Fluxo completo passa |
| — | **TOTAL** | **~20 horas** | — | MVP Completo |

**Observação:** Estimativa original de "2 horas" era otimista. Tempo realista para MVP funcional: **20h** (2-3 dias de dev focado).

### 10.2 Checkpoints de Validação

| Após | Validar | Critério de Sucesso |
|------|---------|---------------------|
| **Setup inicial (#1-3)** | Projeto roda localmente | `npm run dev` + visitar `localhost:3000` sem erros |
| **Autenticação (#4)** | Login funciona | Email chega + click no link + redireciona para app |
| **Geração de Hooks (#5-6)** | IA retorna hooks | Input válido → 5 hooks exibidos em <5s |
| **Geração de Carrossel (#7-8)** | IA retorna 8 slides | Hook selecionado → 8 slides estruturados em <10s |
| **Preview (#9-10)** | Slides renderizam estilo Twitter | Preview mostra texto centralizado + foto + username |
| **Export PNG (#11-12)** | Download funciona | ZIP com 8 PNGs (1080x1350px) é baixado |
| **Rate Limiting (#13)** | Limite de 5/dia funciona | 6º carrossel é bloqueado com mensagem |
| **Responsividade (#16)** | App funciona em mobile | Testar em 320px, 768px, 1024px |
| **Deploy (#17)** | App em produção | `https://breathai.vercel.app` acessível |
| **Testes E2E (#18)** | Fluxo completo passa | Todos os 7 testes críticos (seção 9.1) passam |

**Processo de Validação:**
1. Após cada checkpoint, parar e testar manualmente
2. Se falhar: corrigir antes de avançar
3. Documentar bugs encontrados (GitHub Issues)
4. Só avançar para próximo checkpoint se atual estiver 100% funcional

### 10.3 Comandos Úteis

#### **Setup Inicial**
```bash
# Criar projeto Next.js 14
npx create-next-app@latest breathai --typescript --tailwind --app

# Instalar dependências
cd breathai
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @anthropic-ai/sdk
npm install html2canvas jszip
npm install sharp  # Processamento de imagens
npm install zod    # Validação de schemas
npm install @sentry/nextjs  # Monitoring
npm install -D @playwright/test  # E2E tests

# Inicializar Supabase
npx supabase init
npx supabase start
```

#### **Desenvolvimento**
```bash
# Rodar em desenvolvimento
npm run dev

# Rodar com logs detalhados
DEBUG=* npm run dev

# Limpar cache do Next.js
rm -rf .next
npm run dev
```

#### **Testes**
```bash
# Rodar testes unitários (Vitest)
npm run test

# Rodar testes E2E (Playwright)
npx playwright test

# Rodar testes E2E em modo UI
npx playwright test --ui

# Gerar relatório de cobertura
npm run test:coverage
```

#### **Build & Deploy**
```bash
# Build de produção (local)
npm run build

# Preview do build
npm run start

# Deploy para Vercel (automático via Git push)
git push origin main

# Deploy manual (se necessário)
vercel --prod
```

#### **Banco de Dados (Supabase)**
```bash
# Criar migration
npx supabase migration new initial_schema

# Aplicar migrations localmente
npx supabase db reset

# Aplicar migrations em produção
npx supabase db push

# Ver logs do banco
npx supabase db logs
```

#### **Debugging**
```bash
# Ver logs da Anthropic API
export DEBUG=anthropic*
npm run dev

# Ver logs do Supabase
export DEBUG=supabase*
npm run dev

# Inspecionar tamanho do bundle
npm run analyze
```

### 10.4 Variáveis de Ambiente

#### **Arquivo: `.env.local` (Desenvolvimento)**
```env
# ==============================================
# BREATHAI - Variáveis de Ambiente (LOCAL)
# ==============================================

# Supabase (Obrigatório)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic (Obrigatório)
ANTHROPIC_API_KEY=sk-ant-api03-...

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_HOOKS_PER_HOUR=10
RATE_LIMIT_CAROUSELS_PER_DAY=5
RATE_LIMIT_MENTOR_CAROUSELS_PER_DAY=20

# Sentry (Opcional - só em produção)
# SENTRY_DSN=https://...@sentry.io/...
```

#### **Arquivo: `.env.production` (Vercel)**
```env
# ==============================================
# BREATHAI - Variáveis de Ambiente (PRODUÇÃO)
# ==============================================

# Supabase (Produção)
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic (Produção)
ANTHROPIC_API_KEY=sk-ant-api03-...

# App Config
NEXT_PUBLIC_APP_URL=https://breathai.vercel.app
NODE_ENV=production

# Rate Limiting
RATE_LIMIT_HOOKS_PER_HOUR=10
RATE_LIMIT_CAROUSELS_PER_DAY=5
RATE_LIMIT_MENTOR_CAROUSELS_PER_DAY=20

# Sentry
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=sntrys_...
```

#### **Como Configurar no Vercel:**
1. Acessar dashboard do projeto no Vercel
2. Settings → Environment Variables
3. Adicionar cada variável acima (usar `.env.production` como referência)
4. Selecionar ambiente: Production
5. Redeploy para aplicar mudanças

---

## 11. NOTAS PARA O IMPLEMENTADOR

### 11.1 Decisões de Design

| Decisão | Justificativa |
|---------|---------------|
| **Next.js 14 (App Router)** | SSR para SEO, API Routes integradas, deploy fácil na Vercel |
| **Supabase Auth (Magic Links)** | Sem senha = menos fricção, ideal para whitelist interna |
| **Anthropic Claude Sonnet 4** | Melhor custo/benefício ($0.015/1k vs GPT-4 $0.03/1k), qualidade alta |
| **html2canvas (client-side rendering)** | Sem custo de servidor, preview em tempo real, latência zero |
| **Tema Claro/Escuro (estilo Twitter)** | Simplicidade do MVP, fácil de implementar, alta legibilidade |
| **Rate limit de 5 carrosséis/dia** | Protege contra custo de API, força consistência (não spam) |
| **Histórico de 90 dias** | Conformidade LGPD, não precisa armazenar indefinidamente |
| **Whitelist de emails** | Controle total de acesso, sem cadastro aberto |
| **Estilo Twitter (não iBreathwork Design System)** | Prioridade é legibilidade nos slides, não marca visual |

### 11.2 Pontos de Atenção

⚠️ **ATENÇÃO 1: Custo de API da Anthropic**

- Cada geração de hooks: ~$0.01
- Cada geração de carrossel: ~$0.02-0.04
- **Meta: < $50/mês com 100 alunos ativos**
- **Monitoramento crítico:** Implementar alertas se ultrapassar $20 em 1 semana
- **Fallback:** Se custo explodir, reduzir rate limit para 3 carrosséis/dia

⚠️ **ATENÇÃO 2: Qualidade dos Prompts de IA**

- **Prompts são o coração do produto.** Se IA gerar conteúdo ruim = produto falha.
- **Few-shot learning é essencial:** Mentor DEVE fornecer 5-10 exemplos de hooks reais.
- **Testar exaustivamente:** Gerar 50+ carrosséis com diferentes ideias antes de lançar.
- **Iterar nos prompts:** Versionar prompts (v1, v2, v3) e testar qual performa melhor.

⚠️ **ATENÇÃO 3: Rendering de Canvas em Safari**

- Safari (especialmente iOS) tem bugs com html2canvas.
- **Solução:** Testar em Safari ANTES de lançar.
- **Fallback:** Se falhar, oferecer download de texto (sem PNG) + mensagem amigável.

⚠️ **ATENÇÃO 4: Tamanho do ZIP**

- 8 slides × 2MB cada = 16MB total
- Conexões lentas podem demorar 30s+ para download
- **Solução:** Comprimir PNGs para 800-1MB cada (qualidade 90%)
- **Alternativa:** Oferecer download individual slide por slide

⚠️ **ATENÇÃO 5: LGPD e Dados Pessoais**

- Emails e fotos de perfil são dados pessoais.
- **Obrigatório:** Termo de Uso claro na primeira tela.
- **Obrigatório:** Deletar carrosséis após 90 dias (cron job diário).
- **Obrigatório:** Botão "Deletar meus dados" no perfil do usuário.

⚠️ **ATENÇÃO 6: Validação de Conteúdo Ofensivo**

- IA pode gerar conteúdo inapropriado (raro, mas possível).
- **Solução:** Lista de palavras-chave para bloquear no input.
- **Moderação:** Mentor revisa primeiros 50 carrosséis gerados.
- **Fallback:** Se IA gerar algo ofensivo, log no Sentry + notificar admin.

⚠️ **ATENÇÃO 7: Dependência da Anthropic API**

- Se API cair, app inteiro para.
- **Solução:** Implementar retry logic (3 tentativas com exponential backoff).
- **Fallback:** Se 3 tentativas falharem, oferecer "Gerar Manualmente" (apenas hooks sugeridos, usuário escreve slides).

### 11.3 Perguntas em Aberto

❓ **Pergunta 1:** Qual formato de export preferido: ZIP ou slides individuais?

- **Default sugerido:** ZIP (mais rápido para usuário)
- **Alternativa:** Botão secundário "Baixar slide por slide" (fallback se ZIP falhar)
- **Decisão:** Implementar ambos no MVP.

❓ **Pergunta 2:** Permitir edição de texto por slide ou aceitar/regenerar tudo?

- **Default sugerido:** Apenas regenerar tudo (MVP simples)
- **Alternativa:** Editor inline (cada slide editável, mais complexo)
- **Decisão:** Deixar fora do MVP. Se 30%+ dos usuários pedirem, adicionar na Fase 2.

❓ **Pergunta 3:** Quantos exemplos de hooks do mentor são necessários?

- **Default sugerido:** Mínimo 5, ideal 10
- **Alternativa:** Se mentor não fornecer, usar hooks genéricos (qualidade menor)
- **Decisão:** Mentor deve fornecer ao menos 5 antes do desenvolvimento. Bloquear dev sem isso.

❓ **Pergunta 4:** Salvar histórico de prompts usados (versionamento)?

- **Default sugerido:** Sim (tabela `prompt_versions` no banco)
- **Alternativa:** Apenas último prompt (mais simples)
- **Decisão:** Implementar versionamento simples (v1, v2, v3) para poder A/B testar.

❓ **Pergunta 5:** Implementar sistema de feedback (like/dislike em carrosséis)?

- **Default sugerido:** Sim (botão "Esse carrossel ficou bom?" após download)
- **Alternativa:** Apenas analytics quantitativos (quantos downloads)
- **Decisão:** Implementar feedback simples (👍 / 👎) + campo de texto opcional.

---

## ANEXOS

### A. Glossário

| Termo | Definição |
|-------|-----------|
| **BreathAI** | Nome da ferramenta (Breath + AI = Respiração + Inteligência Artificial) |
| **iBreathwork** | Método de neurociência respiratória criado pelo mentor |
| **Hook** | Primeira frase de um carrossel, projetada para parar o scroll e gerar curiosidade |
| **Carrossel** | Formato de post no Instagram com múltiplas imagens (slides) que o usuário swipa |
| **Magic Link** | Link único enviado por email para autenticação sem senha |
| **Whitelist** | Lista de emails autorizados a acessar o sistema |
| **Rate Limit** | Limite de requisições por tempo (ex: 5 carrosséis por dia) |
| **Few-Shot Learning** | Técnica de IA onde fornecemos poucos exemplos para treinar o modelo |
| **MVP** | Minimum Viable Product (produto mínimo viável) |
| **LGPD** | Lei Geral de Proteção de Dados (Brasil) |
| **HRV** | Heart Rate Variability (Variabilidade da Frequência Cardíaca) |
| **SNA** | Sistema Nervoso Autônomo |
| **CTA** | Call-to-Action (chamada para ação, ex: "Salve este post") |
| **JWT** | JSON Web Token (token de autenticação) |
| **RLS** | Row Level Security (segurança a nível de linha no banco) |
| **Canvas** | Elemento HTML para renderização de gráficos (usado para gerar PNG) |

### B. Referências

**Documentação Técnica:**
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [html2canvas GitHub](https://github.com/niklasvh/html2canvas)
- [Instagram Image Sizes 2026](https://eventsnotification.com/blog/instagram-image-sizes/)

**Inspiração de Produto:**
- [Canva Magic Design](https://www.canva.com/magic/) - Referência de UX para geração de design com IA
- [Taplio](https://taplio.com/) - Geração de carrosséis para LinkedIn (concorrente)
- [Buffer](https://buffer.com/) - Simplicidade de agendamento de posts

**Método iBreathwork:**
- Documentação a ser fornecida pelo mentor (filosofia, exemplos de hooks, tom de voz)
- Público-alvo: Terapeutas, psicólogos, coaches, praticantes de breathwork

**Copywriting (Alex Hormozi):**
- [Livro: $100M Offers](https://www.acquisition.com/offers)
- [YouTube: Alex Hormozi](https://www.youtube.com/@AlexHormozi) - Referência de hooks virais

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

### ANTES DE CODIFICAR (Bloqueantes):

1. ✅ **Solicitar API Key da Anthropic**
   - Criar conta em https://console.anthropic.com
   - Gerar API key
   - Adicionar em `.env.local`

2. ✅ **Coletar Exemplos de Hooks do Mentor**
   - Mínimo 5 hooks reais do método iBreathwork
   - Formato: texto puro, 1 hook por linha
   - Salvar em `/prompts/examples/hooks.txt`

3. ✅ **Aprovar Mockup Visual**
   - Criar 3 exemplos de slides no Figma/Canva:
     - Slide tema claro (fundo branco)
     - Slide tema escuro (fundo preto)
     - Preview de carrossel completo (8 slides)
   - Mentor aprova: "É isso mesmo, pode fazer"

4. ✅ **Validar Formato de Export**
   - Confirmar com mentor: 1080x1350px (portrait) ou 1080x1080px (square)?
   - Testar upload manual no Instagram para validar

5. ✅ **Definir Whitelist Inicial**
   - Email do mentor (obrigatório)
   - Emails de 3-5 alunos para teste (opcional)

### SEMANA 1 (Desenvolvimento MVP):

- **Dia 1-2:** Setup (#1-4) + Autenticação + Tela 1
- **Dia 3:** Integração IA (#6-8) + Tela 2
- **Dia 4:** Preview + Export (#9-12)
- **Dia 5:** Polimento + Testes (#15-18)

### VALIDAÇÃO PÓS-MVP:

- **Semana 2:** Mentor testa sozinho (meta: 10 carrosséis em 1 semana)
- **Semana 3:** Entrevistar 3 alunos (validar bloqueio real)
- **Semana 4:** Decidir: escalar para alunos OU pivotar

---

**FIM DO PRD v1.0**

**Status:** ✅ Aprovado para Desenvolvimento  
**Próxima Revisão:** Após validação com mentor (Fase 1)  
**Contato:** Nicolas (Product Developer)

---