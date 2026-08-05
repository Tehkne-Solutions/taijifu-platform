import fs from "node:fs";

const contractPath = "docs/deploy/vercel-platform.md";
if (!fs.existsSync(contractPath)) throw new Error("missing Vercel deployment contract");
const src = fs.readFileSync(contractPath, "utf8");

for (const marker of [
  "apps/web",
  "apps/academy",
  "taijifu-site",
  "taijifu-academy",
  "DATABASE_URL",
  "TAIJIFU_AUTH_BRIDGE_SECRET",
  "TAIJIFU_ENABLE_DEMO_AUTH=false",
  "taijifu-masters",
  "npm run validate",
  "pnpm typecheck",
  "pnpm build",
]) {
  if (!src.includes(marker)) throw new Error(`deploy contract missing ${marker}`);
}

if (!src.includes("não reutilizar o projeto Vercel `taijifu-masters`")) {
  throw new Error("external game/product Vercel project must remain isolated");
}

console.log("TAIJIFU_DEPLOY_CONTRACT_VALIDATION=PASS");
console.log("site_root=apps/web");
console.log("academy_root=apps/academy");
console.log("vercel_projects=SEPARATE");
console.log("external_products=ISOLATED");
console.log("academy_auth=SIGNED_BRIDGE_REQUIRED");
