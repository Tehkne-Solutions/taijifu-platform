# Vercel deployment contract

A Taijifu Platform deve ser implantada como dois projetos Vercel independentes apontando para o mesmo monorepo.

## 1. Site Oficial

Produto: fonte pública e oficial de informação do Taijifu.

- Projeto sugerido: `taijifu-site`
- Root Directory: `apps/web`
- Framework: Next.js
- Build Command: `pnpm --filter @taijifu/web build`
- Install Command: `pnpm install --frozen-lockfile`
- Node.js: 22.x
- Banco/Auth: não obrigatórios
- Consome: `@taijifu/canon` e `@taijifu/content`

O Site Oficial não deve compartilhar projeto Vercel, domínio de runtime ou secrets do App de prática.

## 2. App / Academy

Produto: experiência autenticada de estudo, prática, evidência e Travessia.

- Projeto sugerido: `taijifu-academy`
- Root Directory: `apps/academy`
- Framework: Next.js
- Build Command: `pnpm --filter @taijifu/academy build`
- Install Command: `pnpm install --frozen-lockfile`
- Node.js: 22.x

### Variáveis obrigatórias para produção

- `DATABASE_URL`
- `TAIJIFU_AUTH_BRIDGE_SECRET`

### Variáveis opcionais / por capacidade

- `TAIJIFU_AI_MODEL`
- `AI_GATEWAY_API_KEY`
- `TAIJIFU_SESSION_SECRET` somente quando `TAIJIFU_ENABLE_DEMO_AUTH=true`
- `TAIJIFU_ENABLE_DEMO_AUTH=false` em produção

O App deve falhar fechado quando a persistência oficial não estiver configurada. A identidade externa só pode ser aceita quando assinada pelo bridge de autenticação confiável.

## 3. Separação obrigatória

- `apps/web` = informação pública.
- `apps/academy` = prática autenticada.
- outros jogos/produtos não são destinos da Taijifu Platform.
- não reutilizar o projeto Vercel `taijifu-masters`.
- não compartilhar secrets do Academy com o Site Oficial sem necessidade explícita.

## 4. Git integration

Os dois projetos devem conectar o repositório `Tehkne-Solutions/taijifu-platform` e usar `main` como production branch. Preview deployments devem ser gerados por PR/branch.

## 5. Release gate

Antes de promover qualquer deployment:

```bash
npm run validate
pnpm typecheck
pnpm build
```

Para Academy, além dos gates acima, confirmar:

- migrations aplicadas;
- `DATABASE_URL` funcional;
- bridge de autenticação configurado;
- demo auth desabilitado em produção;
- `/api/practice/state` autenticado;
- `/api/evidence` autenticado;
- `/api/traversal/submit` autenticado;
- Promotion Gate preservado.

Assinatura institucional: **Tehkné Solutions**.
