import fs from "node:fs";

const workflowPath = ".github/workflows/production-bootstrap.yml";
if (!fs.existsSync(workflowPath)) throw new Error(`missing ${workflowPath}`);
const workflow = fs.readFileSync(workflowPath, "utf8");

for (const marker of [
  "BOOTSTRAP_TAIJIFU_PROD",
  "taijifu-site",
  "taijifu-academy",
  "apps/web",
  "apps/academy",
  "secrets.VERCEL_TOKEN",
  "secrets.DATABASE_URL",
  "secrets.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "secrets.CLERK_SECRET_KEY",
  "secrets.TAIJIFU_AUTH_BRIDGE_SECRET",
  "pnpm db:preflight",
  "pnpm db:migrate",
  "/api/readiness",
  "pnpm production:smoke",
  'TAIJIFU_ENABLE_DEMO_AUTH "false"',
  'TAIJIFU_ALLOW_DEMO_AUTH "0"',
]) {
  if (!workflow.includes(marker)) throw new Error(`production bootstrap missing ${marker}`);
}

if (workflow.includes("taijifu-masters")) throw new Error("production bootstrap must not reference taijifu-masters");
if (!workflow.includes("environment: production")) throw new Error("production bootstrap must use protected production environment");

console.log("TAIJIFU_PRODUCTION_BOOTSTRAP_VALIDATION=PASS");
console.log("site=taijifu-site/apps-web");
console.log("academy=taijifu-academy/apps-academy");
console.log("database=preflight+migrate");
console.log("auth=clerk+hmac-bridge");
console.log("demo_auth=BLOCKED");
console.log("external_products=UNTOUCHED");
