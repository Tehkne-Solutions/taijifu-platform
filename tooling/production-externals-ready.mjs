const REQUIRED = [
  "VERCEL_TOKEN",
  "DATABASE_URL",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "TAIJIFU_AUTH_BRIDGE_SECRET",
];
const TEAM_ID = process.env.VERCEL_TEAM_ID || "team_GAFmMllTKaWx5iGEa8sTZJ0T";
const API = "https://api.vercel.com";

function fail(message) {
  console.error(`TAIJIFU_EXTERNALS_READY=FAIL ${message}`);
  process.exit(1);
}

for (const key of REQUIRED) {
  if (!process.env[key]) fail(`missing_env=${key}`);
}

if (String(process.env.TAIJIFU_ENABLE_DEMO_AUTH || "false").toLowerCase() === "true") {
  fail("demo_auth_must_be_off");
}

async function vercelProject(name) {
  const res = await fetch(`${API}/v9/projects/${encodeURIComponent(name)}?teamId=${encodeURIComponent(TEAM_ID)}`, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) fail(`vercel_project_check_${name}_status=${res.status}`);
  return res.json();
}

const site = await vercelProject("taijifu-site");
const academy = await vercelProject("taijifu-academy");
if (!site) fail("missing_vercel_project=taijifu-site");
if (!academy) fail("missing_vercel_project=taijifu-academy");

for (const [name, project, expectedRoot] of [
  ["taijifu-site", site, "apps/web"],
  ["taijifu-academy", academy, "apps/academy"],
]) {
  if (project.rootDirectory && project.rootDirectory !== expectedRoot) {
    fail(`wrong_root_${name}=${project.rootDirectory}`);
  }
}

console.log("TAIJIFU_EXTERNALS_READY=PASS");
console.log("vercel_projects=taijifu-site,taijifu-academy");
console.log("database_url=SET");
console.log("clerk=SET");
console.log("auth_bridge=SET");
console.log("demo_auth=OFF");
