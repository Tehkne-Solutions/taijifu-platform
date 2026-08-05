const siteBase = process.env.TAIJIFU_SITE_URL?.replace(/\/$/, "");
const academyBase = process.env.TAIJIFU_ACADEMY_URL?.replace(/\/$/, "");

if (!siteBase || !academyBase) {
  console.error("TAIJIFU_PRODUCTION_SMOKE=BLOCKED");
  console.error("required=TAIJIFU_SITE_URL,TAIJIFU_ACADEMY_URL");
  process.exit(1);
}

async function check(label, url, expectedStatus = 200) {
  const response = await fetch(url, { headers: { accept: "application/json" }, redirect: "follow" });
  let body = null;
  try { body = await response.json(); } catch { body = null; }
  if (response.status !== expectedStatus) {
    throw new Error(`${label} expected ${expectedStatus}, got ${response.status}: ${JSON.stringify(body)}`);
  }
  console.log(`${label}=PASS`);
  return body;
}

await check("site_health", `${siteBase}/api/health`);
await check("academy_health", `${academyBase}/api/health`);
await check("academy_readiness", `${academyBase}/api/readiness`);

console.log("TAIJIFU_PRODUCTION_SMOKE=PASS");
