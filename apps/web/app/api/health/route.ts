import { bases, belts, paths, nuclei, canonRelease } from "@taijifu/canon";

export const dynamic = "force-dynamic";

export async function GET() {
  const healthy = bases.length === 4 && belts.length === 10 && paths.length === 32 && nuclei.length === 128;
  return Response.json({
    service: "taijifu-site",
    status: healthy ? "ok" : "degraded",
    canon: {
      release: canonRelease,
      bases: bases.length,
      belts: belts.length,
      paths: paths.length,
      nuclei: nuclei.length,
    },
  }, { status: healthy ? 200 : 503 });
}
