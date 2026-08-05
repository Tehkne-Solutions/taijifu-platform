# Taijifu Platform — Production Runbook

Assinatura institucional: **Tehkné Solutions**.

## Objetivo

Colocar em produção os dois destinos oficiais da Taijifu Platform sem misturar outros produtos:

- `taijifu-site` → `apps/web`
- `taijifu-academy` → `apps/academy`

O projeto `taijifu-masters` não deve ser reutilizado.

## 1. Criar os projetos Vercel

No mesmo time Vercel da Tehkné, criar dois projetos separados conectados ao repositório `Tehkne-Solutions/taijifu-platform`.

### Site Oficial

- Project name: `taijifu-site`
- Root Directory: `apps/web`
- Framework: Next.js
- Production branch: `main`

### Academy / App

- Project name: `taijifu-academy`
- Root Directory: `apps/academy`
- Framework: Next.js
- Production branch: `main`

## 2. Provisionar Postgres para o Academy

Criar banco PostgreSQL dedicado ao Academy e configurar `DATABASE_URL` apenas no projeto `taijifu-academy`.

Executar as migrations a partir do monorepo:

```bash
DATABASE_URL='postgres://...' npm run db:migrate
```

Resultado esperado:

```text
TAIJIFU_DB_MIGRATE=PASS
```

## 3. Provisionar identidade

O Academy exige um IdP real ou bridge confiável. Produção não deve usar sessão demo.

Variáveis obrigatórias no Academy:

```text
DATABASE_URL
TAIJIFU_AUTH_BRIDGE_SECRET
TAIJIFU_ENABLE_DEMO_AUTH=false
```

Se Clerk for adotado, ele deve ser configurado como produtor de identidade confiável para o boundary já existente. Não habilitar headers externos sem assinatura HMAC.

## 4. IA opcional

A IA não é requisito para readiness do App.

Quando ativada:

```text
AI_GATEWAY_API_KEY
TAIJIFU_AI_MODEL
```

Sem modelo configurado, o RAG continua em modo grounded-extract.

## 5. Preflight antes do primeiro deploy

```bash
npm run production:preflight
```

O preflight não imprime secrets; apenas informa presença/ausência e bloqueios.

## 6. Validar repositório

```bash
npm run validate
pnpm typecheck
pnpm build
```

Todos devem terminar em PASS antes do go-live.

## 7. Deploy do Site

Após criar `taijifu-site`, fazer preview e validar:

```text
GET /api/health
status=ok
bases=4
belts=10
paths=32
nuclei=128
```

O Site não deve depender de Postgres, autenticação ou IA para ficar disponível.

## 8. Deploy do Academy

Após configurar Postgres e auth:

```text
GET /api/health
status=ok
```

Depois:

```text
GET /api/readiness
status=ready
```

Readiness só pode ficar verde quando:

- Postgres está configurado;
- Postgres responde;
- `TAIJIFU_AUTH_BRIDGE_SECRET` existe;
- `TAIJIFU_ENABLE_DEMO_AUTH=false`.

## 9. Smoke de produção

Com os dois URLs reais:

```bash
TAIJIFU_SITE_URL='https://...' \
TAIJIFU_ACADEMY_URL='https://...' \
npm run production:smoke
```

Resultado esperado:

```text
TAIJIFU_PRODUCTION_SMOKE=PASS
```

## 10. Smoke autenticado do Academy

Depois do IdP real ativo, validar manualmente e por API:

1. login de praticante;
2. criação/recuperação de `user_profile`;
3. carregar progresso de faixa;
4. concluir uma etapa;
5. recarregar em nova sessão/dispositivo e confirmar persistência;
6. criar reflexão/evidência na faixa atual;
7. confirmar bloqueio de evidência oficial em faixa futura;
8. completar Path Checkpoints;
9. submeter Travessia;
10. confirmar que submissão não altera faixa;
11. confirmar que promoção só ocorre via avaliação autorizada server-side.

## 11. Critérios de go-live

```text
SITE_HEALTH=PASS
ACADEMY_HEALTH=PASS
ACADEMY_READINESS=PASS
DB_MIGRATIONS=PASS
DEMO_AUTH=OFF
AUTH_BOUNDARY=SIGNED
PRODUCTION_SMOKE=PASS
CLIENT_BELT_MUTATION=BLOCKED
AUTOMATIC_PROMOTION=BLOCKED
```

Se qualquer item falhar, o lançamento permanece `HOLD`.
