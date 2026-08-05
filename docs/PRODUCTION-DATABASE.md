# Taijifu Academy — Production Database Contract

Institutional signature: **Tehkné Solutions**

## Scope

The Academy uses standard PostgreSQL through `DATABASE_URL`. The application must remain provider-portable. Neon is the recommended production path on Vercel because it is the current native Postgres integration, but no application code may depend on Neon-specific APIs.

## Production invariants

- Dedicated database for `taijifu-academy` only.
- Never share the database with games or other Tehkné products.
- `DATABASE_URL` is server-only and must never be exposed to client code.
- Production schema changes run only through `npm run db:migrate`.
- Migrations are tracked by `schema_migrations` and must be idempotent.
- Every production migration requires the protected GitHub `production` environment and explicit confirmation.
- Backup / point-in-time recovery must be enabled according to the selected provider/plan before public launch.
- Before destructive migrations, create and verify a restore point/branch/snapshot.

## Neon / Vercel recommended setup

1. Install Neon for the `taijifu-academy` Vercel project only.
2. Ensure the integration injects `DATABASE_URL` into Preview and Production.
3. Do not attach the database to `taijifu-site`.
4. Run the database preflight.
5. Apply migrations through the protected workflow.
6. Verify Academy `/api/readiness` returns `ready` after auth is also configured.

## Commands

```bash
npm run db:preflight
npm run db:migrate
```

## Rollback discipline

The SQL migration set is forward-only. Rollback is operational, not ad-hoc SQL reversal:

1. stop writes / place release on HOLD;
2. restore the provider recovery point or database branch created before the migration;
3. redeploy the last known-good application commit;
4. run `/api/readiness` and smoke tests;
5. reopen writes only after validation.

Never manually change belt, credential, authorization, evidence, or traversal records to emulate rollback.