export type BeltId = "BELT-WHITE" | "BELT-YELLOW" | "BELT-ORANGE" | "BELT-RED" | "BELT-GREEN" | "BELT-CYAN" | "BELT-BLUE" | "BELT-VIOLET" | "BELT-BROWN" | "BELT-BLACK";

const NEXT_BELT: Partial<Record<BeltId, BeltId>> = {
  "BELT-WHITE": "BELT-YELLOW",
  "BELT-YELLOW": "BELT-ORANGE",
  "BELT-ORANGE": "BELT-RED",
  "BELT-RED": "BELT-GREEN",
  "BELT-GREEN": "BELT-CYAN",
  "BELT-CYAN": "BELT-BLUE",
  "BELT-BLUE": "BELT-VIOLET",
  "BELT-VIOLET": "BELT-BROWN",
  "BELT-BROWN": "BELT-BLACK",
};

export interface PromotionDecisionInput {
  traversalStatus: "submitted" | "under-review" | "approved" | "rejected" | "cancelled";
  evaluatorHasCredential: boolean;
  evaluatorHasAuthorization: boolean;
  evaluatorDecision: "approve" | "reject" | "needs-more-evidence";
  currentBeltId: BeltId;
  targetBeltId: BeltId;
}

export function assertPromotionGate(input: PromotionDecisionInput): void {
  if (input.traversalStatus !== "submitted" && input.traversalStatus !== "under-review") throw new Error("Traversal is not reviewable");
  if (!input.evaluatorHasCredential) throw new Error("Evaluator credential required");
  if (!input.evaluatorHasAuthorization) throw new Error("Evaluator authorization required");
  if (input.evaluatorDecision !== "approve") throw new Error("Only an explicit evaluator approval can promote a belt");
  const expected = NEXT_BELT[input.currentBeltId];
  if (!expected || expected !== input.targetBeltId) throw new Error("Target belt is not the canonical next belt");
}

export function canClientPromoteBelt(): false {
  return false;
}
