import { db, isDatabaseConfigured } from "@taijifu/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const databaseConfigured = isDatabaseConfigured();
  const authBridgeConfigured = Boolean(process.env.TAIJIFU_AUTH_BRIDGE_SECRET);
  const demoAuthEnabled = process.env.TAIJIFU_ENABLE_DEMO_AUTH === "true";
  let databaseReachable = false;
  let databaseError: string | null = null;

  if (databaseConfigured) {
    try {
      const rows = await db()`SELECT 1 AS ok`;
      databaseReachable = rows[0]?.ok === 1;
    } catch (error) {
      databaseError = error instanceof Error ? error.message : "database-check-failed";
    }
  }

  const ready = databaseConfigured && databaseReachable && authBridgeConfigured && !demoAuthEnabled;
  return Response.json({
    service: "taijifu-academy",
    status: ready ? "ready" : "not-ready",
    checks: {
      databaseConfigured,
      databaseReachable,
      authBridgeConfigured,
      demoAuthDisabled: !demoAuthEnabled,
    },
    databaseError,
  }, { status: ready ? 200 : 503 });
}
