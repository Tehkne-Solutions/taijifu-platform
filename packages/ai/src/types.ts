export type AiSurface = "academy-tutor" | "instructor-assistant" | "research-assistant";
export type SourceTier = "current-canon" | "approved-content" | "research" | "historical";

export interface RagDocument {
  id: string;
  canonicalEntityId: string;
  tier: SourceTier;
  title: string;
  text: string;
  tags: string[];
  status: "current" | "approved" | "research" | "historical";
}

export interface RetrievalHit {
  document: RagDocument;
  score: number;
  matchedTerms: string[];
}

export interface TaijifuAiRequest {
  query: string;
  surface: AiSurface;
  beltId?: string;
  pathId?: string;
  nucleusId?: string;
  maxSources?: number;
}

export interface ContextPack {
  query: string;
  surface: AiSurface;
  canonRelease: string;
  sources: RetrievalHit[];
  highestTier: SourceTier | null;
  officialPositionAvailable: boolean;
  systemPolicy: string;
}

export interface AiUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface TaijifuAiAnswer {
  answer: string;
  mode: "model" | "grounded-extract" | "no-canon-position";
  context: ContextPack;
  model?: string;
  usage: AiUsage;
  estimatedCostMicrousd: number;
}
