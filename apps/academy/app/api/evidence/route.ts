import { readPrincipalFromRequest } from "@taijifu/auth";
import { ensureUserProfile, insertEvidence, isDatabaseConfigured, listEvidence } from "@taijifu/db";
import { isCanonicalEntityId } from "@taijifu/canon";

export async function GET(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "official-persistence-not-configured" }, { status: 503 });
  const profile = await ensureUserProfile(principal.externalAuthId, principal.displayName);
  return Response.json({ evidence: await listEvidence(profile.id) });
}

export async function POST(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "official-persistence-not-configured" }, { status: 503 });
  const profile = await ensureUserProfile(principal.externalAuthId, principal.displayName);
  const body = await request.json() as Record<string, unknown>;
  const canonicalEntityId = String(body.canonicalEntityId ?? "");
  const evidenceBody = String(body.body ?? "").trim();
  const kind = String(body.kind ?? "reflection");
  if (!isCanonicalEntityId(canonicalEntityId)) return Response.json({ error: "invalid-canonical-entity" }, { status: 400 });
  if (evidenceBody.length < 3) return Response.json({ error: "evidence-body-too-short" }, { status: 400 });
  const record = await insertEvidence({
    id: `EVD-${crypto.randomUUID()}`,
    userId: profile.id,
    kind,
    status: "recorded",
    canonicalEntityId,
    pathId: body.pathId ? String(body.pathId) : null,
    beltId: profile.currentBeltId,
    body: evidenceBody,
    metadata: typeof body.metadata === "object" && body.metadata ? body.metadata as Record<string, unknown> : {},
  });
  return Response.json({ evidence: record }, { status: 201 });
}
