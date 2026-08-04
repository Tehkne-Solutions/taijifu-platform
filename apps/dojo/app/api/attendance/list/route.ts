import { getDojoSession,listSessionAttendance } from "@taijifu/db/dojo";
import { requireDojoRole } from "../../../lib/server";
export async function GET(request:Request){
  const url=new URL(request.url);const dojoId=url.searchParams.get("dojoId")??"";const sessionId=url.searchParams.get("sessionId")??"";
  const auth=await requireDojoRole(request,dojoId,["instructor","evaluator","guardian","admin"]);if("error" in auth)return auth.error;
  const session=await getDojoSession(sessionId,dojoId);if(!session)return Response.json({error:"session-not-found"},{status:404});
  return Response.json({session,attendance:await listSessionAttendance(sessionId)});
}
