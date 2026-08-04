import { readPrincipalFromRequest } from "@taijifu/auth";
import { ensureUserProfile, isDatabaseConfigured } from "@taijifu/db";
import { hasDojoRole } from "@taijifu/db/dojo";

export async function requirePrincipal(request: Request) {
  const principal=readPrincipalFromRequest(request);
  if (!principal) return { error: Response.json({error:"unauthorized"},{status:401}) } as const;
  if (!isDatabaseConfigured()) return { error: Response.json({error:"official-persistence-not-configured"},{status:503}) } as const;
  const profile=await ensureUserProfile(principal.externalAuthId,principal.displayName);
  return { profile, principal } as const;
}

export async function requireDojoRole(request:Request,dojoId:string,roles:("instructor"|"evaluator"|"guardian"|"admin")[]) {
  const auth=await requirePrincipal(request);
  if ("error" in auth) return auth;
  if (!(await hasDojoRole(auth.profile.id,dojoId,roles))) return { error: Response.json({error:"dojo-role-required"},{status:403}) } as const;
  return auth;
}
