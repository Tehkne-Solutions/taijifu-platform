import { answerTaijifuQuery, type AiSurface } from "@taijifu/ai";
import { completeAiGeneration, createAiGeneration, ensureAiConversation, failAiGeneration } from "@taijifu/db/ai";
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

  const conversationId = body.conversationId ? String(body.conversationId) : `AIC-${crypto.randomUUID()}`;
  const generationId = `AIG-${crypto.randomUUID()}`;
  const beltId = body.beltId ? String(body.beltId) : undefined;
  const pathId = body.pathId ? String(body.pathId) : undefined;
  const nucleusId = body.nucleusId ? String(body.nucleusId) : undefined;
  await ensureAiConversation({ id: conversationId, userId: auth.profile.id, surface, dojoId, title: query.slice(0,80), contextSnapshot: { dojoId, beltId, pathId, nucleusId } });
  await createAiGeneration({ id: generationId, conversationId, userId: auth.profile.id, surface, query });

  try {
    const result = await answerTaijifuQuery({ query, surface, beltId, pathId, nucleusId, maxSources: 10 });
    const sources = result.context.sources.map((hit,index)=>({ref:`S${index+1}`,tier:hit.document.tier,canonicalEntityId:hit.document.canonicalEntityId,title:hit.document.title}));
    await completeAiGeneration({ id:generationId, answer:result.answer, mode:result.mode, model:result.model, canonRelease:result.context.canonRelease, officialPositionAvailable:result.context.officialPositionAvailable, sourceRefs:sources, usage:result.usage, estimatedCostMicrousd:result.estimatedCostMicrousd });
    return Response.json({ conversationId, generationId, answer: result.answer, mode: result.mode, canonRelease: result.context.canonRelease, officialPositionAvailable: result.context.officialPositionAvailable, usage: result.usage, estimatedCostMicrousd: result.estimatedCostMicrousd, sources });
  } catch (error) {
    await failAiGeneration(generationId,"generation-failed");
    console.error("dojo-ai-generation-failed", { generationId, surface, error });
    return Response.json({ error:"generation-failed", generationId }, { status:500 });
  }
}
