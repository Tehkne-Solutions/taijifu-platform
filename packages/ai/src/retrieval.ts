import { canonCorpus } from "./corpus";
import type { RagDocument, RetrievalHit, SourceTier, TaijifuAiRequest } from "./types";

const TIER_WEIGHT: Record<SourceTier, number> = {
  "current-canon": 1000,
  "approved-content": 500,
  research: 100,
  historical: 10,
};

function normalize(value:string){return value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
function terms(value:string){return [...new Set(normalize(value).split(/[^a-z0-9-]+/).filter((x)=>x.length>2))];}

function scoreDocument(doc:RagDocument, query:string, request:TaijifuAiRequest): RetrievalHit | null {
  const q=terms(query); const hay=normalize(`${doc.title} ${doc.text} ${doc.tags.join(" ")} ${doc.canonicalEntityId}`);
  const matched=q.filter((t)=>hay.includes(t));
  const exactId=normalize(query).includes(normalize(doc.canonicalEntityId));
  const contextBoost=[request.nucleusId,request.pathId,request.beltId].filter(Boolean).includes(doc.canonicalEntityId) ? 80 : 0;
  const score=TIER_WEIGHT[doc.tier]+matched.length*12+(exactId?160:0)+contextBoost;
  if (!matched.length && !exactId && !contextBoost) return null;
  return {document:doc,score,matchedTerms:matched};
}

export function retrieveTaijifuContext(request:TaijifuAiRequest, corpus:RagDocument[]=canonCorpus): RetrievalHit[] {
  const max=Math.max(1,Math.min(request.maxSources??8,12));
  return corpus.map((d)=>scoreDocument(d,request.query,request)).filter((x):x is RetrievalHit=>Boolean(x)).sort((a,b)=>b.score-a.score).slice(0,max);
}
