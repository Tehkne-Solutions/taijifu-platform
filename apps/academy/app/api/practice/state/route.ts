import { readPrincipalFromRequest } from "@taijifu/auth";
import { ensureUserProfile, isDatabaseConfigured } from "@taijifu/db";
import { getPracticeState, upsertPracticeState } from "@taijifu/db/practice";
import { belts } from "@taijifu/canon";
import type { BeltLocalState } from "@taijifu/evidence/types";

const isBeltId=(id:string)=>belts.some(b=>b.id===id&&b.status==="current");
function validState(value:unknown):value is BeltLocalState{
  if(!value||typeof value!=="object")return false;
  const state=value as Partial<BeltLocalState>;
  if(state.schemaVersion!==2||!state.progress||typeof state.progress!=="object"||!Array.isArray(state.evidence)||!state.pathCheckpoints||typeof state.pathCheckpoints!=="object"||!Array.isArray(state.events)||!state.traversal||typeof state.traversal!=="object")return false;
  if(!["locked","ready","submitted"].includes(state.traversal.status??""))return false;
  const serialized=JSON.stringify(state);
  if(serialized.length>512_000)return false;
  if(/"currentBeltId"\s*:/.test(serialized)||/"promotionGranted"\s*:\s*true/.test(serialized))return false;
  return true;
}

export async function GET(request:Request){
  const principal=readPrincipalFromRequest(request);
  if(!principal)return Response.json({error:"unauthorized"},{status:401});
  if(!isDatabaseConfigured())return Response.json({error:"official-persistence-not-configured"},{status:503});
  const beltId=new URL(request.url).searchParams.get("beltId")??"";
  if(!isBeltId(beltId))return Response.json({error:"invalid-belt"},{status:400});
  const profile=await ensureUserProfile(principal.externalAuthId,principal.displayName);
  const record=await getPracticeState(profile.id,beltId);
  return Response.json({state:record?.state??null,updatedAt:record?.updatedAt??null,source:record?"postgres":"empty"});
}

export async function PUT(request:Request){
  const principal=readPrincipalFromRequest(request);
  if(!principal)return Response.json({error:"unauthorized"},{status:401});
  if(!isDatabaseConfigured())return Response.json({error:"official-persistence-not-configured"},{status:503});
  const body=await request.json() as {beltId?:string;state?:unknown};
  const beltId=String(body.beltId??"");
  if(!isBeltId(beltId))return Response.json({error:"invalid-belt"},{status:400});
  if(!validState(body.state))return Response.json({error:"invalid-practice-state"},{status:400});
  const profile=await ensureUserProfile(principal.externalAuthId,principal.displayName);
  const record=await upsertPracticeState({userId:profile.id,beltId,schemaVersion:2,state:body.state as unknown as Record<string,unknown>});
  return Response.json({ok:true,updatedAt:record.updatedAt,source:"postgres"});
}
