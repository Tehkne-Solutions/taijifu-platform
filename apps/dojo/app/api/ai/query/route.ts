import { answerTaijifuQuery, type AiSurface } from "@taijifu/ai";
import { requireDojoRole } from "../../../lib/server";

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  const dojoId = String(body.dojoId ?? "");
  const surface = String(body.surface ?? "instructor-assistant") as AiSurface;
  if (surface !== "instructor-assistant" && surface !== "research-assistant") return Response.json({ error: "surface-not-allowed" }, { status: 403 });
  const roles = surface === "research-assistant" ? ["guardian","admin"] as const : ["instructor","evaluator","guardian","admin"] as const;
  const auth = await requireDojoRole(request, dojoId, [...roles]);
  if ("error" in auth) return auth.error;
  const query = String(body.query ?? "").trim();
  if (query.length < 3 || query.length > 1600) return Response.json({ error: "invalid-query-length" }, { status: 400 });
  const result = await answerTaijifuQuery({ query, surface, beltId: body.beltId ? String(body.beltId) : undefined, pathId: body.pathId ? String(body.pathId) : undefined, nucleusId: body.nucleusId ? String(body.nucleusId) : undefined, maxSources: 10 });
  return Response.json({ answer: result.answer, mode: result.mode, canonRelease: result.context.canonRelease, officialPositionAvailable: result.context.officialPositionAvailable, sources: result.context.sources.map((hit,index)=>({ref:`S${index+1}`,tier:hit.document.tier,canonicalEntityId:hit.document.canonicalEntityId,title:hit.document.title})) });
}
