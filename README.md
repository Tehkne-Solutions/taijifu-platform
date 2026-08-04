# Taijifu Platform

Monorepo oficial do ecossistema digital Taijifu. O Canon é a fonte de verdade; site, Academy, Dojo, Admin, IA e integrações consomem as mesmas entidades versionadas.

## Canon 1.0

- 10 faixas
- 4 Bases
- 32 Caminhos
- 128 Núcleos
- Preta sintetiza C01–C32 / N001–N128
- `taijifu-masters` permanece repositório separado do jogo

## Validação sem dependências

```bash
node packages/canon/scripts/validate.mjs
node packages/canon/scripts/summary.mjs
```

## Bootstrap futuro

Depois de instalar dependências:

```bash
pnpm install
pnpm canon:validate
pnpm dev
```

Assinatura institucional: Tehkné Solutions.


## P2 — Content Foundation

- Content Graph com schemas para conteúdo derivado do Canon.
- Vertical Slice da Faixa Branca: C01–C03 / N001–N012.
- 36 Content Nodes: 12 Lessons, 12 Quizzes e 12 Guided Practices.
- 71 relações de grafo (`teaches`, `assesses`, `practices`, `next`).
- `npm run validate` executa Canon Validator + Content Validator sem dependências externas.
- `apps/web` possui Canon Explorer inicial.
- `apps/academy` possui dashboard e rota `/belt/branca`.

### Validação sem instalação

```bash
node packages/canon/scripts/validate.mjs
node packages/content/scripts/validate.mjs
```

O build Next.js requer instalação das dependências. O ambiente de geração P2 estava sem acesso ao registry npm, portanto o gate executado aqui é o gate estrutural independente de rede.

## P3/P4 Vertical Slice 01

- Public site redesigned around the Canon 1.0 narrative and Canon Explorer.
- Academy Faixa Branca implements the full navigation: belt → path → nucleus → lesson → checkpoint → guided practice.
- Local demo progress persists in localStorage by canonical nucleus ID.
- Progress explicitly tracks learning activities only; it never mutates belt/rank.
- 12 static nucleus routes are generated for N001–N012.

## P4/P5 White Belt Evidence Slice

The White Belt MVP now includes a versioned local evidence model (`schemaVersion: 2`), nucleus reflections, C01–C03 path checkpoints, an Evidence Timeline, and a simulated White Belt Traversal that can only reach `submitted`. Belt promotion is intentionally absent from the client state and requires a future authenticated evaluator decision.

Validation:

```bash
npm run validate
```

Expected gates include `TAIJIFU_EVIDENCE_SCHEMA_VALIDATION=PASS`, `TAIJIFU_UI_VALIDATION=PASS`, and `TAIJIFU_P45_VALIDATION=PASS`.

## P5 — Persistent Evidence Foundation

Official evidence mode now requires `DATABASE_URL` and a server-verified principal. The database migration defines user profiles, credentials, authorizations, evidence records, traversal attempts, evaluation decisions, and immutable belt-promotion records.

Promotion is server-only and fail-closed:

1. A traversal is submitted with `promotionGranted: false`.
2. The evaluator cannot evaluate their own traversal.
3. An active evaluator credential and `grade-belt` authorization are required for the belt being reviewed.
4. The target belt is derived from the current Canon order.
5. Belt drift after traversal submission invalidates the pending decision.
6. Only an explicit `approve` decision can create a `belt_promotions` row and update `user_profiles.current_belt_id` transactionally.

The existing `localStorage` flow remains demo-only and never grants a belt.

## P6 MVP — Dojo Workspace

O workspace operacional agora consome as APIs persistentes para dashboard, turmas, sessões, roster, presença, Safety e Travessias. A UI nunca atualiza faixa diretamente: decisões de Travessia reutilizam o Promotion Gate server-side do P5.

### Fluxo operacional

1. selecionar um Dojo em que o usuário possua membership ativa;
2. acompanhar métricas dinâmicas;
3. criar turmas com escopo canônico opcional;
4. criar sessões vinculadas a entidades do Canon;
5. carregar o roster da turma e fazer check-in da sessão;
6. registrar Incident, Near Miss, Hard Stop ou Safeguarding;
7. avaliar Travessias somente com role, credential e authorization válidos.

### Ambiente oficial

O P6 continua fail-closed quando `DATABASE_URL` ou autenticação oficial não estão configurados. O modo demo da Academy não concede autoridade ao Dojo.
