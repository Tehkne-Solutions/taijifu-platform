export type LearningStep = "lesson" | "practice" | "quiz";

export type EvidenceKind =
  | "reflection"
  | "practice-note"
  | "checkpoint"
  | "path-checkpoint"
  | "traversal-submission";

export type EvidenceStatus = "draft" | "recorded" | "ready-for-review" | "submitted";

export interface EvidenceRecord {
  id: string;
  createdAt: string;
  kind: EvidenceKind;
  status: EvidenceStatus;
  canonicalEntityId: string;
  pathId?: string;
  beltId: string;
  body: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface LearningEvent {
  id: string;
  createdAt: string;
  type: "step-completed" | "evidence-recorded" | "path-checkpoint-completed" | "traversal-submitted" | "demo-reset";
  canonicalEntityId?: string;
  detail: string;
}

export interface BeltLocalState {
  schemaVersion: 2;
  progress: Record<string, Partial<Record<LearningStep, boolean>>>;
  evidence: EvidenceRecord[];
  pathCheckpoints: Record<string, boolean>;
  traversal: {
    status: "locked" | "ready" | "submitted";
    submittedAt?: string;
    reflection?: string;
  };
  events: LearningEvent[];
}

export type WhiteBeltLocalState = BeltLocalState;
export type YellowBeltLocalState = BeltLocalState;
