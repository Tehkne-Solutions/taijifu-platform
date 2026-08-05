import fs from "node:fs";

const scriptPath = "tooling/provision-vercel-projects.mjs";
const workflowPath = ".github/workflows/provision-vercel.yml";
for (const file of [scriptPath, workflowPath]) if (!fs.existsSync(file)) throw new Error(`missing ${file}`);

const script = fs.readFileSync(scriptPath, "utf8");
const workflow = fs.readFileSync(workflowPath, "utf8");

for (const marker of [
  'name: "taijifu-site", rootDirectory: "apps/web"',
  'name: "taijifu-academy", rootDirectory: "apps/academy"',
  'gitRepository: { type: "github", repo }',
  'TAIJIFU_VERCEL_APPLY',
  'TAIJIFU_VERCEL_PROVISION',
]) {
  if (!script.includes(marker)) throw new Error(`provisioner missing ${marker}`);
}

if (script.includes("taijifu-masters")) throw new Error("provisioner must not reference taijifu-masters");
for (const marker of ["workflow_dispatch", "secrets.VERCEL_TOKEN", "vars.VERCEL_TEAM_ID", "inputs.apply", "environment: production"]) {
  if (!workflow.includes(marker)) throw new Error(`workflow missing ${marker}`);
}

console.log("TAIJIFU_VERCEL_PROVISIONING_VALIDATION=PASS");
console.log("projects=taijifu-site+taijifu-academy");
console.log("mode=DRY_RUN_BY_DEFAULT");
console.log("external_products=UNTOUCHED");
