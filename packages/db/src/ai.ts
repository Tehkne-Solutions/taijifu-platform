import { db } from "./index";

export interface AiConversationInput {
  id: string;
  userId: string;
  surface: "academy-tutor" | "instructor-assistant" | "research-assistant";
  dojoId?: string | null;
  title?: string | null;
  contextSnapshot?: Record<string, unknown>;
}

export async function ensureAiConversation(input: AiConversationInput) {
  const sql = db();
  const [row] = await sql`
    INSERT INTO ai_conversations (id,user_id,surface,dojo_id,title,context_snapshot)
    VALUES (${input.id},${input.userId},${input.surface},${input.dojoId ?? null},${input.title ?? null},${sql.json((input.contextSnapshot ?? {}) as any)})
    ON CONFLICT (id) DO UPDATE SET updated_at=now()
    RETURNING id,user_id,surface,dojo_id,title,context_snapshot,created_at::text,updated_at::text`;
  return row;
}

export async function createAiGeneration(input:{
  id:string;conversationId:string;userId:string;surface:string;query:string;
}) {
  const [row] = await db()`
    INSERT INTO ai_generations (id,conversation_id,user_id,surface,query,status)
    VALUES (${input.id},${input.conversationId},${input.userId},${input.surface},${input.query},'pending')
    RETURNING id,conversation_id,user_id,surface,query,status,created_at::text`;
  return row;
}

export async function completeAiGeneration(input:{
  id:string;answer:string;mode:string;model?:string;canonRelease:string;
  officialPositionAvailable:boolean;sourceRefs:unknown[];usage:Record<string,unknown>;estimatedCostMicrousd:number;
}) {
  const sql = db();
  const [row] = await sql`
    UPDATE ai_generations SET
      status='complete', answer=${input.answer}, mode=${input.mode}, model=${input.model ?? null},
      canon_release=${input.canonRelease}, official_position_available=${input.officialPositionAvailable},
      source_refs=${sql.json(input.sourceRefs as any)}, usage=${sql.json(input.usage as any)},
      estimated_cost_microusd=${input.estimatedCostMicrousd}, completed_at=now()
    WHERE id=${input.id}
    RETURNING id,status,completed_at::text`;
  return row;
}

export async function failAiGeneration(id:string,errorCode:string) {
  await db()`UPDATE ai_generations SET status='error',error_code=${errorCode},completed_at=now() WHERE id=${id}`;
}

export async function listAiConversations(userId:string,limit=30) {
  return db()`SELECT id,surface,dojo_id,title,context_snapshot,created_at::text,updated_at::text FROM ai_conversations WHERE user_id=${userId} ORDER BY updated_at DESC LIMIT ${limit}`;
}

export async function listAiGenerations(userId:string,conversationId:string,limit=100) {
  return db()`SELECT id,conversation_id,surface,query,status,answer,mode,model,canon_release,official_position_available,source_refs,usage,estimated_cost_microusd,created_at::text,completed_at::text FROM ai_generations WHERE user_id=${userId} AND conversation_id=${conversationId} ORDER BY created_at ASC LIMIT ${limit}`;
}

export async function getAiUsageSummary(userId:string,days=30) {
  const [row] = await db()`SELECT COUNT(*)::int generations,COALESCE(SUM(estimated_cost_microusd),0)::bigint estimated_cost_microusd FROM ai_generations WHERE user_id=${userId} AND status='complete' AND created_at >= now() - (${days}::text || ' days')::interval`;
  return row ?? { generations: 0, estimated_cost_microusd: 0 };
}
