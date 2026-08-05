const checks = [
  ["DATABASE_URL", Boolean(process.env.DATABASE_URL), true],
  ["TAIJIFU_AUTH_BRIDGE_SECRET", Boolean(process.env.TAIJIFU_AUTH_BRIDGE_SECRET), true],
  ["TAIJIFU_ENABLE_DEMO_AUTH=false", process.env.TAIJIFU_ENABLE_DEMO_AUTH === "false", true],
  ["AI_GATEWAY_API_KEY", Boolean(process.env.AI_GATEWAY_API_KEY), false],
  ["TAIJIFU_AI_MODEL", Boolean(process.env.TAIJIFU_AI_MODEL), false],
  ["TAIJIFU_SITE_URL", Boolean(process.env.TAIJIFU_SITE_URL), false],
  ["TAIJIFU_ACADEMY_URL", Boolean(process.env.TAIJIFU_ACADEMY_URL), false],
];

let blocked = false;
for (const [name, ok, required] of checks) {
  const status = ok ? "PASS" : required ? "BLOCKED" : "OPTIONAL_MISSING";
  console.log(`${name}=${status}`);
  if (required && !ok) blocked = true;
}

if (process.env.TAIJIFU_ENABLE_DEMO_AUTH && process.env.TAIJIFU_ENABLE_DEMO_AUTH !== "false") {
  console.error("demo_auth=MUST_BE_FALSE_IN_PRODUCTION");
  blocked = true;
}

if (blocked) {
  console.error("TAIJIFU_PRODUCTION_PREFLIGHT=BLOCKED");
  process.exit(1);
}

console.log("TAIJIFU_PRODUCTION_PREFLIGHT=PASS");
