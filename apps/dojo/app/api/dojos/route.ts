import { listDojoMemberships } from "@taijifu/db/dojo";
import { requirePrincipal } from "../../lib/server";
export async function GET(request:Request){const auth=await requirePrincipal(request);if("error" in auth)return auth.error;return Response.json({dojos:await listDojoMemberships(auth.profile.id)});}
