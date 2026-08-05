export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    service: "taijifu-academy",
    status: "ok",
    persistenceConfigured: Boolean(process.env.DATABASE_URL),
    authBridgeConfigured: Boolean(process.env.TAIJIFU_AUTH_BRIDGE_SECRET),
    demoAuthEnabled: process.env.TAIJIFU_ENABLE_DEMO_AUTH === "true",
  });
}
