import { readPrincipalFromRequest } from "@taijifu/auth";
import { answerTaijifuQuery, type AiSurface } from "@taijifu/ai";

const SURFACES = new Set<AiSurface>(["academy-tutor"]);

export async function POST(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const query = String(body.query ?? "").trim();
  const surface = String(body.surface ?? "academy-tutor") as AiSurface;
  if (!SURFACES.has(surface)) return Response.json({ error: "surface-not-allowed" }, { status: 403 });
  if (query.length < 3 || query.length > 1200) return Response.json({ error: "invalid-query-length" }, { status: 400 });
  const result = await answerTaijifuQuery({
    query,
    surface,
    beltId: body.beltId ? String(body.beltId) : undefined,
    pathId: body.pathId ? String(body.pathId) : undefined,
    nucleusId: body.nucleusId ? String(body.nucleusId) : undefined,
    maxSources: 8,
  });
  return Response.json({
    answer: result.answer,
    mode: result.mode,
    canonRelease: result.context.canonRelease,
    officialPositionAvailable: result.context.officialPositionAvailable,
    sources: result.context.sources.map((hit, index) => ({
      ref: `S${index + 1}`,
      tier: hit.document.tier,
      canonicalEntityId: hit.document.canonicalEntityId,
      title: hit.document.title,
    })),
  });
}
