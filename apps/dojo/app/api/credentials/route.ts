import { listDojoStaffGrants } from "@taijifu/db/dojo";
import { requireDojoRole } from "../../lib/server";
export async function GET(request:Request){const dojoId=new URL(request.url).searchParams.get("dojoId")??"";const auth=await requireDojoRole(request,dojoId,["guardian","admin"]);if("error" in auth)return auth.error;return Response.json({staff:await listDojoStaffGrants(dojoId),authorityModel:"role+credential+authorization"});}
