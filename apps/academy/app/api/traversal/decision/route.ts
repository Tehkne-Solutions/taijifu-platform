import { readPrincipalFromRequest } from "@taijifu/auth";
import { ensureUserProfile, getEvaluatorGrant, getTraversal, getUserProfile, isDatabaseConfigured, recordEvaluationAndPromotion } from "@taijifu/db";
import { assertPromotionGate, type BeltId } from "@taijifu/evidence";
import { getCanonicalNextBeltId } from "@taijifu/canon";

export async function POST(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "official-persistence-not-configured" }, { status: 503 });

  const evaluator = await ensureUserProfile(principal.externalAuthId, principal.displayName);
  const body = await request.json() as {
    traversalAttemptId?: string;
    decision?: "approve" | "reject" | "needs-more-evidence";
    rationale?: string;
    targetBeltId?: BeltId;
  };

  const attempt = body.traversalAttemptId ? await getTraversal(body.traversalAttemptId) : null;
  if (!attempt) return Response.json({ error: "traversal-not-found" }, { status: 404 });
  if (attempt.userId === evaluator.id) return Response.json({ error: "self-evaluation-forbidden" }, { status: 403 });

  const practitioner = await getUserProfile(attempt.userId);
  if (!practitioner) return Response.json({ error: "practitioner-not-found" }, { status: 404 });
  if (practitioner.currentBeltId !== attempt.beltId) return Response.json({ error: "practitioner-belt-changed" }, { status: 409 });

  const grant = await getEvaluatorGrant(evaluator.id, attempt.beltId);
  if (!grant) return Response.json({ error: "evaluator-grant-required" }, { status: 403 });

  const decision = body.decision ?? "needs-more-evidence";
  const rationale = String(body.rationale ?? "").trim();
  if (rationale.length < 12) return Response.json({ error: "rationale-too-short" }, { status: 400 });

  const canonicalTarget = getCanonicalNextBeltId(attempt.beltId) as BeltId | null;
  if (!canonicalTarget) return Response.json({ error: "no-canonical-next-belt" }, { status: 409 });
  const targetBeltId = body.targetBeltId ?? canonicalTarget;
  if (targetBeltId !== canonicalTarget) return Response.json({ error: "target-belt-not-canonical-next" }, { status: 409 });

  if (decision === "approve") {
    try {
      assertPromotionGate({
        traversalStatus: attempt.status,
        evaluatorHasCredential: true,
        evaluatorHasAuthorization: true,
        evaluatorDecision: decision,
        currentBeltId: attempt.beltId as BeltId,
        targetBeltId,
      });
    } catch (error) {
      return Response.json({ error: error instanceof Error ? error.message : "promotion-gate-failed" }, { status: 403 });
    }
  }

  const result = await recordEvaluationAndPromotion({
    decisionId: `DEC-${crypto.randomUUID()}`,
    traversalAttemptId: attempt.id,
    evaluatorUserId: evaluator.id,
    evaluatorCredentialId: grant.credentialId,
    evaluatorAuthorizationId: grant.authorizationId,
    decision,
    rationale,
    userId: attempt.userId,
    fromBeltId: attempt.beltId,
    targetBeltId,
  });

  return Response.json({
    decision,
    promoted: result.promoted,
    targetBeltId: result.promoted ? targetBeltId : null,
  });
}
