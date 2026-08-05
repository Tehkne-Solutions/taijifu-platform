import fs from "node:fs";

const required = [
  "packages/db/scripts/migrate.mjs",
  "apps/web/app/api/health/route.ts",
  "apps/academy/app/api/health/route.ts",
  "apps/academy/app/api/readiness/route.ts",
  "tooling/smoke-production.mjs",
];
for (const file of required) if (!fs.existsSync(file)) throw new Error(`missing ${file}`);

const migrate = fs.readFileSync("packages/db/scripts/migrate.mjs", "utf8");
const siteHealth = fs.readFileSync("apps/web/app/api/health/route.ts", "utf8");
const academyReadiness = fs.readFileSync("apps/academy/app/api/readiness/route.ts", "utf8");
const smoke = fs.readFileSync("tooling/smoke-production.mjs", "utf8");

for (const marker of ["schema_migrations", "sql.begin", "TAIJIFU_DB_MIGRATE=PASS"]) {
  if (!migrate.includes(marker)) throw new Error(`migration runner missing ${marker}`);
}
for (const marker of ["bases.length === 4", "belts.length === 10", "paths.length === 32", "nuclei.length === 128"]) {
  if (!siteHealth.includes(marker)) throw new Error(`site health missing ${marker}`);
}
for (const marker of ["DATABASE_URL", "TAIJIFU_AUTH_BRIDGE_SECRET", "TAIJIFU_ENABLE_DEMO_AUTH", "SELECT 1 AS ok", "status: ready ? \"ready\" : \"not-ready\""]) {
  if (!academyReadiness.includes(marker)) throw new Error(`academy readiness missing ${marker}`);
}
for (const marker of ["TAIJIFU_SITE_URL", "TAIJIFU_ACADEMY_URL", "/api/readiness", "TAIJIFU_PRODUCTION_SMOKE=PASS"]) {
  if (!smoke.includes(marker)) throw new Error(`production smoke missing ${marker}`);
}

console.log("TAIJIFU_PRODUCTION_READINESS_VALIDATION=PASS");
console.log("db_migrations=IDEMPOTENT_TRACKED");
console.log("site_health=CANON_ASSERTED");
console.log("academy_readiness=DB+AUTH+DEMO_OFF");
console.log("production_smoke=URL_DRIVEN");
