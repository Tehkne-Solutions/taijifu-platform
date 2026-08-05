# Taijifu Platform — Production Deployment Contract

Assinatura: **Tehkné Solutions**

A plataforma deve ser publicada como dois projetos Vercel independentes sobre o mesmo monorepo. Outros produtos, inclusive jogos, não fazem parte deste contrato.

## 1. Site Oficial

**Responsabilidade:** fonte pública e oficial de informação e conhecimento do Taijifu.

- Vercel project sugerido: `taijifu-official`
- Repository: `Tehkne-Solutions/taijifu-platform`
- Production branch: `main`
- Root Directory: `apps/web`
- Framework: Next.js
- Install Command: usar detecção pnpm do monorepo
- Build Command: `cd ../.. && pnpm turbo run build --filter=@taijifu/web`
- Output: Next.js default

O Site Oficial não precisa de `DATABASE_URL`, autenticação ou Promotion Gate para servir o Canon público.

## 2. App de prática

**Responsabilidade:** estudo, prática guiada, progresso, evidências e Travessias.

- Vercel project sugerido: `taijifu-academy`
- Repository: `Tehkne-Solutions/taijifu-platform`
- Production branch: `main`
- Root Directory: `apps/academy`
- Framework: Next.js
- Build Command: `cd ../.. && pnpm turbo run build --filter=@taijifu/academy`
- Output: Next.js default

### Production environment required

- `DATABASE_URL`
- `TAIJIFU_AUTH_BRIDGE_SECRET`
- `TAIJIFU_ALLOW_DEMO_AUTH=0`
- `TAIJIFU_SESSION_SECRET` only if a controlled demo environment is explicitly enabled

### Identity provider adapter

The Academy backend only trusts HMAC-signed `x-taijifu-auth-*` headers. A production IdP adapter (recommended: Clerk) must authenticate the user and produce the trusted bridge identity server-side. Raw browser-provided identity headers are not trusted.

Planned Clerk variables after provisioning:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## 3. Database bootstrap

Before enabling persistent practice in production:

1. Provision PostgreSQL.
2. Set `DATABASE_URL` in the Academy project only.
3. Apply every SQL migration in `packages/db/migrations` in filename order.
4. Confirm `practice_states`, evidence, traversal, evaluation and promotion tables exist.
5. Keep `TAIJIFU_ALLOW_DEMO_AUTH=0` in production.

No application process may write a belt directly from a client request. Belt promotion remains exclusively behind the server-side Promotion Gate.

## 4. Release gate

A release is eligible for production only when the GitHub CI head for the exact commit passes:

- dependency-free structural validators;
- monorepo typecheck;
- monorepo build.

For Academy production additionally verify:

- database migrations applied;
- IdP/bridge configured;
- unauthenticated `/api/practice/state` returns `401`;
- missing persistence returns fail-closed rather than fabricating official evidence;
- official traversal cannot be submitted without persisted path checkpoints;
- no client flow can mutate `current_belt_id`.

## 5. Scope boundary

This deployment contract contains only the Taijifu knowledge platform and practice application. Games and unrelated products use separate repositories, projects, databases and domains.
