import { readPrincipalFromRequest } from "@taijifu/auth";
import { ensureUserProfile, isDatabaseConfigured } from "@taijifu/db";
import { getAiUsageSummary, listAiConversations, listAiGenerations } from "@taijifu/db/ai";

export async function GET(request: Request) {
  const principal = readPrincipalFromRequest(request);
  if (!principal) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "ai-persistence-not-configured" }, { status: 503 });
  const profile = await ensureUserProfile(principal.externalAuthId, principal.displayName);
  const url = new URL(request.url);
  const conversationId = url.searchParams.get("conversationId");
  if (conversationId) {
    return Response.json({ conversationId, generations: await listAiGenerations(profile.id, conversationId) });
  }
  const [conversations, usage] = await Promise.all([listAiConversations(profile.id), getAiUsageSummary(profile.id)]);
  return Response.json({ conversations, usage });
}
