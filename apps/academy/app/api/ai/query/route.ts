import { readPrincipalFromRequest } from "@taijifu/auth";
import { answerTaijifuQuery, type AiSurface } from "@taijifu/ai";
import { ensureUserProfile, isDatabaseConfigured } from "@taijifu/db";
import { completeAiGeneration, createAiGeneration, ensureAiConversation, failAiGeneration } from "@taijifu/db/ai";

const SURFACES = new Set<AiSurface>(["academy-tutor"]);

export async function POST(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "ai-persistence-not-configured" }, { status: 503 });

  const body = await request.json() as Record<string, unknown>;
  const query = String(body.query ?? "").trim();
  const surface = String(body.surface ?? "academy-tutor") as AiSurface;
  if (!SURFACES.has(surface)) return Response.json({ error: "surface-not-allowed" }, { status: 403 });
  if (query.length < 3 || query.length > 1200) return Response.json({ error: "invalid-query-length" }, { status: 400 });

  const profile = await ensureUserProfile(principal.externalAuthId, principal.displayName);
  const conversationId = body.conversationId ? String(body.conversationId) : `AIC-${crypto.randomUUID()}`;
  const generationId = `AIG-${crypto.randomUUID()}`;
  const pathId = body.pathId ? String(body.pathId) : undefined;
  const nucleusId = body.nucleusId ? String(body.nucleusId) : undefined;

  await ensureAiConversation({
    id: conversationId,
    userId: profile.id,
    surface,
    title: query.slice(0, 80),
    contextSnapshot: { beltId: profile.currentBeltId, pathId, nucleusId, authMode: principal.mode },
  });
  await createAiGeneration({ id: generationId, conversationId, userId: profile.id, surface, query });

  try {
    const result = await answerTaijifuQuery({ query, surface, beltId: profile.currentBeltId, pathId, nucleusId, maxSources: 8 });
    const sources = result.context.sources.map((hit, index) => ({
      ref: `S${index + 1}`,
      tier: hit.document.tier,
      canonicalEntityId: hit.document.canonicalEntityId,
      title: hit.document.title,
    }));
    await completeAiGeneration({
      id: generationId,
      answer: result.answer,
      mode: result.mode,
      model: result.model,
      canonRelease: result.context.canonRelease,
      officialPositionAvailable: result.context.officialPositionAvailable,
      sourceRefs: sources,
      usage: result.usage,
      estimatedCostMicrousd: result.estimatedCostMicrousd,
    });
    return Response.json({ conversationId, generationId, answer: result.answer, mode: result.mode, canonRelease: result.context.canonRelease, officialPositionAvailable: result.context.officialPositionAvailable, usage: result.usage, estimatedCostMicrousd: result.estimatedCostMicrousd, sources });
  } catch (error) {
    await failAiGeneration(generationId, "generation-failed");
    console.error("academy-ai-generation-failed", { generationId, error });
    return Response.json({ error: "generation-failed", generationId }, { status: 500 });
  }
}
