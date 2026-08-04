import { readPrincipalFromRequest } from "@taijifu/auth";
import { ensureUserProfile, isDatabaseConfigured, listEvidence, submitTraversal } from "@taijifu/db";

export async function POST(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "official-persistence-not-configured" }, { status: 503 });
  const profile = await ensureUserProfile(principal.externalAuthId, principal.displayName);
  const body = await request.json() as { beltId?: string; reflection?: string };
  const beltId = String(body.beltId ?? "");
  if (beltId !== profile.currentBeltId) return Response.json({ error: "belt-mismatch" }, { status: 409 });
  const reflection = String(body.reflection ?? "").trim();
  if (reflection.length < 20) return Response.json({ error: "reflection-too-short" }, { status: 400 });
  const evidence = await listEvidence(profile.id);
  const attempt = await submitTraversal({
    id: `TRV-${crypto.randomUUID()}`,
    userId: profile.id,
    beltId,
    reflection,
    evidenceSnapshot: evidence.map(({ id, canonicalEntityId, status, kind, createdAt }) => ({ id, canonicalEntityId, status, kind, createdAt })),
  });
  return Response.json({ traversal: attempt, promotionGranted: false, decisionRequired: true }, { status: 201 });
}
