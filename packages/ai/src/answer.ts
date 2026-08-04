import { generateText } from "ai";
import { activeCanonRelease } from "./corpus";
import { buildSystemPrompt, highestTier, officialPositionAvailable, surfacePolicy } from "./policy";
import { retrieveTaijifuContext } from "./retrieval";
import type { AiUsage, ContextPack, TaijifuAiAnswer, TaijifuAiRequest } from "./types";

const ZERO_USAGE: AiUsage = { inputTokens: 0, outputTokens: 0, totalTokens: 0 };

function groundedExtract(context:ContextPack):string{
  if(!context.officialPositionAvailable) return "Não há posição canônica vigente suficientemente definida para este ponto.";
  const primary=context.sources.filter((x)=>x.document.tier==="current-canon").slice(0,3);
  return primary.map((x)=>`${x.document.title}: ${x.document.text}`).join("\n\n");
}

function normalizeUsage(raw: unknown): AiUsage {
  const usage = (raw ?? {}) as Record<string, unknown>;
  const inputTokens = Number(usage.inputTokens ?? usage.promptTokens ?? 0);
  const outputTokens = Number(usage.outputTokens ?? usage.completionTokens ?? 0);
  const totalTokens = Number(usage.totalTokens ?? inputTokens + outputTokens);
  return { inputTokens, outputTokens, totalTokens };
}

function estimateCostMicrousd(usage: AiUsage): number {
  const inputUsdPerMillion = Number(process.env.TAIJIFU_AI_INPUT_USD_PER_MILLION ?? 0);
  const outputUsdPerMillion = Number(process.env.TAIJIFU_AI_OUTPUT_USD_PER_MILLION ?? 0);
  const usd = (usage.inputTokens / 1_000_000) * inputUsdPerMillion + (usage.outputTokens / 1_000_000) * outputUsdPerMillion;
  return Math.max(0, Math.round(usd * 1_000_000));
}

export function buildContextPack(request:TaijifuAiRequest):ContextPack{
  const sources=retrieveTaijifuContext(request);
  return {query:request.query,surface:request.surface,canonRelease:activeCanonRelease,sources,highestTier:highestTier(sources),officialPositionAvailable:officialPositionAvailable(sources),systemPolicy:surfacePolicy(request.surface)};
}

export async function answerTaijifuQuery(request:TaijifuAiRequest):Promise<TaijifuAiAnswer>{
  const context=buildContextPack(request);
  if(!context.officialPositionAvailable){return {answer:"Não há posição canônica vigente suficientemente definida para este ponto.",mode:"no-canon-position",context,usage:ZERO_USAGE,estimatedCostMicrousd:0};}
  const model=process.env.TAIJIFU_AI_MODEL;
  const gatewayConfigured=Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN);
  if(!model || !gatewayConfigured){return {answer:groundedExtract(context),mode:"grounded-extract",context,usage:ZERO_USAGE,estimatedCostMicrousd:0};}
  const result=await generateText({model,system:buildSystemPrompt(context),prompt:`Pergunta do usuário: ${request.query}\nResponda em português do Brasil. Cite as fontes no formato [S1], [S2] apenas quando forem usadas.`});
  const usage=normalizeUsage(result.usage);
  return {answer:result.text,mode:"model",context,model,usage,estimatedCostMicrousd:estimateCostMicrousd(usage)};
}
