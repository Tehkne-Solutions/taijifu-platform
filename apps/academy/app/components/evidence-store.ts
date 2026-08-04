"use client";

import type { EvidenceKind, EvidenceRecord, LearningEvent, LearningStep, WhiteBeltLocalState } from "@taijifu/evidence/types";

export const STORAGE_KEY = "taijifu:white-belt-state:v2";
const LEGACY_KEY = "taijifu:white-belt-progress:v1";
const CHANGE_EVENT = "taijifu-white-state";

export const WHITE_NUCLEUS_IDS = Array.from({ length: 12 }, (_, i) => `NUC-N${String(i + 1).padStart(3, "0")}`);
export const WHITE_PATH_IDS = ["PATH-C01", "PATH-C02", "PATH-C03"] as const;

export const emptyState = (): WhiteBeltLocalState => ({
  schemaVersion: 2,
  progress: {},
  evidence: [],
  pathCheckpoints: {},
  traversal: { status: "locked" },
  events: [],
});

function event(type: LearningEvent["type"], detail: string, canonicalEntityId?: string): LearningEvent {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    type,
    canonicalEntityId,
    detail,
  };
}

function migrateLegacy(): WhiteBeltLocalState | null {
  const raw = window.localStorage.getItem(LEGACY_KEY);
  if (!raw) return null;
  try {
    const progress = JSON.parse(raw) as WhiteBeltLocalState["progress"];
    const state = emptyState();
    state.progress = progress;
    state.events.unshift(event("evidence-recorded", "Estado de progresso migrado do vertical slice v1."));
    window.localStorage.removeItem(LEGACY_KEY);
    return state;
  } catch {
    return null;
  }
}

export function readWhiteState(): WhiteBeltLocalState {
  if (typeof window === "undefined") return emptyState();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const migrated = migrateLegacy();
    if (migrated) {
      writeWhiteState(migrated);
      return migrated;
    }
    return emptyState();
  }
  try {
    const parsed = JSON.parse(raw) as WhiteBeltLocalState;
    return parsed.schemaVersion === 2 ? parsed : emptyState();
  } catch {
    return emptyState();
  }
}

export function writeWhiteState(state: WhiteBeltLocalState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function subscribeWhiteState(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback as EventListener);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback as EventListener);
  };
}

export function completeLearningStep(nucleusId: string, step: LearningStep) {
  const state = readWhiteState();
  const current = state.progress[nucleusId] ?? {};
  if (current[step]) return state;
  state.progress[nucleusId] = { ...current, [step]: true };
  state.events.unshift(event("step-completed", `${nucleusId}: ${step}`, nucleusId));
  writeWhiteState(state);
  return state;
}

export function addEvidence(input: {
  kind: EvidenceKind;
  canonicalEntityId: string;
  body: string;
  pathId?: string;
  metadata?: EvidenceRecord["metadata"];
  status?: EvidenceRecord["status"];
}) {
  const state = readWhiteState();
  const record: EvidenceRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    kind: input.kind,
    status: input.status ?? "recorded",
    canonicalEntityId: input.canonicalEntityId,
    pathId: input.pathId,
    beltId: "BELT-WHITE",
    body: input.body.trim(),
    metadata: input.metadata,
  };
  state.evidence.unshift(record);
  state.events.unshift(event("evidence-recorded", `${input.kind}: ${input.canonicalEntityId}`, input.canonicalEntityId));
  writeWhiteState(state);
  return record;
}

export function isNucleusComplete(state: WhiteBeltLocalState, nucleusId: string) {
  const row = state.progress[nucleusId] ?? {};
  return Boolean(row.lesson && row.practice && row.quiz);
}

export function pathNucleusIds(pathId: string) {
  const index = WHITE_PATH_IDS.indexOf(pathId as (typeof WHITE_PATH_IDS)[number]);
  if (index < 0) return [];
  const start = index * 4;
  return WHITE_NUCLEUS_IDS.slice(start, start + 4);
}

export function isPathLearningComplete(state: WhiteBeltLocalState, pathId: string) {
  return pathNucleusIds(pathId).every((id) => isNucleusComplete(state, id));
}

export function completePathCheckpoint(pathId: string, reflection: string) {
  const state = readWhiteState();
  if (!isPathLearningComplete(state, pathId)) return { ok: false as const, reason: "learning-incomplete" };
  if (!reflection.trim()) return { ok: false as const, reason: "reflection-required" };
  state.pathCheckpoints[pathId] = true;
  const record: EvidenceRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    kind: "path-checkpoint",
    status: "recorded",
    canonicalEntityId: pathId,
    pathId,
    beltId: "BELT-WHITE",
    body: reflection.trim(),
  };
  state.evidence.unshift(record);
  state.events.unshift(event("path-checkpoint-completed", `${pathId}: checkpoint registrado`, pathId));
  if (WHITE_PATH_IDS.every((id) => state.pathCheckpoints[id]) && WHITE_NUCLEUS_IDS.every((id) => isNucleusComplete(state, id))) {
    state.traversal.status = "ready";
  }
  writeWhiteState(state);
  return { ok: true as const };
}

export function submitWhiteTraversal(reflection: string) {
  const state = readWhiteState();
  const ready = WHITE_PATH_IDS.every((id) => state.pathCheckpoints[id]) && WHITE_NUCLEUS_IDS.every((id) => isNucleusComplete(state, id));
  if (!ready) return { ok: false as const, reason: "requirements-incomplete" };
  if (!reflection.trim()) return { ok: false as const, reason: "reflection-required" };
  state.traversal = { status: "submitted", submittedAt: new Date().toISOString(), reflection: reflection.trim() };
  state.evidence.unshift({
    id: crypto.randomUUID(),
    createdAt: state.traversal.submittedAt,
    kind: "traversal-submission",
    status: "submitted",
    canonicalEntityId: "BELT-WHITE",
    beltId: "BELT-WHITE",
    body: reflection.trim(),
    metadata: { promotionGranted: false, nextBelt: "BELT-YELLOW", decisionRequired: true },
  });
  state.events.unshift(event("traversal-submitted", "Travessia Branca enviada para futura avaliação. Nenhuma promoção concedida.", "BELT-WHITE"));
  writeWhiteState(state);
  return { ok: true as const };
}

export function resetWhiteDemo() {
  const state = emptyState();
  state.events.push(event("demo-reset", "Demo da Faixa Branca reiniciada."));
  writeWhiteState(state);
}
