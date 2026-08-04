import type { AiSurface, ContextPack, RetrievalHit, SourceTier } from "./types";

const tierRank:Record<SourceTier,number>={"current-canon":4,"approved-content":3,research:2,historical:1};

export function highestTier(hits:RetrievalHit[]):SourceTier|null{
  return hits.reduce<SourceTier|null>((best,hit)=>!best||tierRank[hit.document.tier]>tierRank[best]?hit.document.tier:best,null);
}

export function officialPositionAvailable(hits:RetrievalHit[]):boolean{
  return hits.some((x)=>x.document.tier==="current-canon");
}

export function surfacePolicy(surface:AiSurface):string{
  const role=surface==="academy-tutor"
    ? "Tutor: ensine sem conceder faixa, credencial ou substituir avaliação prática."
    : surface==="instructor-assistant"
      ? "Instrutor Assistant: ajude a planejar aulas e práticas, sempre submetidas a Safety, credenciais e autorização do instrutor."
      : "Research Assistant: separe hipótese, evidência, limitação, Context Lock e estado canônico; pesquisa não vira Canon sem Canon Change.";
  return [
    "Você é a IA oficial do ecossistema Taijifu.",
    "PRIORIDADE OBRIGATÓRIA: CURRENT CANON > APPROVED CONTENT > RESEARCH > HISTORICAL.",
    "Conteúdo histórico nunca substitui silenciosamente o Canon vigente.",
    "Se não houver fonte current-canon suficiente para afirmar uma posição oficial, diga explicitamente: 'Não há posição canônica vigente suficientemente definida para este ponto.'",
    "Não invente definições, faixas, Caminhos, Núcleos, regras de Safety, genealogias, credenciais ou autorizações.",
    "Não conceda faixa, GMT, credencial, autorização, liberação clínica ou decisão de Return to Practice.",
    role,
  ].join("\n");
}

export function renderSources(hits:RetrievalHit[]):string{
  return hits.map((h,i)=>`[S${i+1}] tier=${h.document.tier} entity=${h.document.canonicalEntityId} title=${h.document.title}\n${h.document.text}`).join("\n\n");
}

export function buildSystemPrompt(context:ContextPack):string{
  return `${context.systemPolicy}\n\nCANON RELEASE: ${context.canonRelease}\n\nFONTES RECUPERADAS:\n${renderSources(context.sources)}`;
}
