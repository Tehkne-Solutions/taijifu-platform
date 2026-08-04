import { generateText } from "ai";
import { activeCanonRelease } from "./corpus";
import { buildSystemPrompt, highestTier, officialPositionAvailable, surfacePolicy } from "./policy";
import { retrieveTaijifuContext } from "./retrieval";
import type { ContextPack, TaijifuAiAnswer, TaijifuAiRequest } from "./types";

function groundedExtract(context:ContextPack):string{
  if(!context.officialPositionAvailable) return "Não há posição canônica vigente suficientemente definida para este ponto.";
  const primary=context.sources.filter((x)=>x.document.tier==="current-canon").slice(0,3);
  return primary.map((x)=>`${x.document.title}: ${x.document.text}`).join("\n\n");
}

export function buildContextPack(request:TaijifuAiRequest):ContextPack{
  const sources=retrieveTaijifuContext(request);
  return {query:request.query,surface:request.surface,canonRelease:activeCanonRelease,sources,highestTier:highestTier(sources),officialPositionAvailable:officialPositionAvailable(sources),systemPolicy:surfacePolicy(request.surface)};
}

export async function answerTaijifuQuery(request:TaijifuAiRequest):Promise<TaijifuAiAnswer>{
  const context=buildContextPack(request);
  if(!context.officialPositionAvailable){return {answer:"Não há posição canônica vigente suficientemente definida para este ponto.",mode:"no-canon-position",context};}
  const model=process.env.TAIJIFU_AI_MODEL;
  const gatewayConfigured=Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN);
  if(!model || !gatewayConfigured){return {answer:groundedExtract(context),mode:"grounded-extract",context};}
  const result=await generateText({model,system:buildSystemPrompt(context),prompt:`Pergunta do usuário: ${request.query}\nResponda em português do Brasil. Cite as fontes no formato [S1], [S2] apenas quando forem usadas.`});
  return {answer:result.text,mode:"model",context,model};
}
