import { getDojoClass,listClassMembers } from "@taijifu/db/dojo";
import { requireDojoRole } from "../../lib/server";
export async function GET(request:Request){
  const url=new URL(request.url);const dojoId=url.searchParams.get("dojoId")??"";const classId=url.searchParams.get("classId")??"";
  const auth=await requireDojoRole(request,dojoId,["instructor","evaluator","guardian","admin"]);if("error" in auth)return auth.error;
  const cls=await getDojoClass(classId,dojoId);if(!cls)return Response.json({error:"class-not-found"},{status:404});
  return Response.json({class:cls,members:await listClassMembers(classId)});
}
