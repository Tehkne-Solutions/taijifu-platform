import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("TAIJIFU_DB_MIGRATE=BLOCKED");
  console.error("reason=DATABASE_URL_MISSING");
  process.exit(1);
}

const migrationsDir = path.resolve("packages/db/migrations");
const files = fs.readdirSync(migrationsDir)
  .filter((name) => /^\d+_.+\.sql$/.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

if (files.length === 0) throw new Error("No database migrations found");

const sql = postgres(databaseUrl, { max: 1, prepare: false });

try {
  await sql`CREATE TABLE IF NOT EXISTS schema_migrations (
    migration_name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`;

  const appliedRows = await sql`SELECT migration_name FROM schema_migrations`;
  const applied = new Set(appliedRows.map((row) => row.migration_name));
  let appliedNow = 0;

  for (const file of files) {
    if (applied.has(file)) continue;
    const source = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    await sql.begin(async (tx) => {
      await tx.unsafe(source);
      await tx`INSERT INTO schema_migrations (migration_name) VALUES (${file})`;
    });
    appliedNow += 1;
    console.log(`migration=${file}:APPLIED`);
  }

  const totalRows = await sql`SELECT count(*)::int AS count FROM schema_migrations`;
  console.log("TAIJIFU_DB_MIGRATE=PASS");
  console.log(`discovered=${files.length}`);
  console.log(`applied_now=${appliedNow}`);
  console.log(`applied_total=${totalRows[0]?.count ?? 0}`);
} finally {
  await sql.end({ timeout: 5 });
}
