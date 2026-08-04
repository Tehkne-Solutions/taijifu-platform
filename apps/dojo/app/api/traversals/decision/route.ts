import { requireDojoRole } from "../../../lib/server";
import { getEvaluatorGrant,getTraversal,getUserProfile,recordEvaluationAndPromotion } from "@taijifu/db";
import { assertPromotionGate,type BeltId } from "@taijifu/evidence";
import { getCanonicalNextBeltId } from "@taijifu/canon";

export async function POST(request:Request){
  const body=await request.json() as {dojoId?:string;traversalAttemptId?:string;decision?:"approve"|"reject"|"needs-more-evidence";rationale?:string;targetBeltId?:BeltId};
  const dojoId=String(body.dojoId??"");
  const auth=await requireDojoRole(request,dojoId,["evaluator","admin"]);if("error" in auth)return auth.error;
  const attempt=body.traversalAttemptId?await getTraversal(body.traversalAttemptId):null;if(!attempt)return Response.json({error:"traversal-not-found"},{status:404});
  if(attempt.userId===auth.profile.id)return Response.json({error:"self-evaluation-forbidden"},{status:403});
  const practitioner=await getUserProfile(attempt.userId);if(!practitioner)return Response.json({error:"practitioner-not-found"},{status:404});
  if(practitioner.currentBeltId!==attempt.beltId)return Response.json({error:"practitioner-belt-changed"},{status:409});
  const grant=await getEvaluatorGrant(auth.profile.id,attempt.beltId);if(!grant)return Response.json({error:"evaluator-grant-required"},{status:403});
  const decision=body.decision??"needs-more-evidence";const rationale=String(body.rationale??"").trim();if(rationale.length<12)return Response.json({error:"rationale-too-short"},{status:400});
  const canonicalTarget=getCanonicalNextBeltId(attempt.beltId) as BeltId|null;if(!canonicalTarget)return Response.json({error:"no-canonical-next-belt"},{status:409});
  const targetBeltId=body.targetBeltId??canonicalTarget;if(targetBeltId!==canonicalTarget)return Response.json({error:"target-belt-not-canonical-next"},{status:409});
  if(decision==="approve"){try{assertPromotionGate({traversalStatus:attempt.status,evaluatorHasCredential:true,evaluatorHasAuthorization:true,evaluatorDecision:decision,currentBeltId:attempt.beltId as BeltId,targetBeltId});}catch(error){return Response.json({error:error instanceof Error?error.message:"promotion-gate-failed"},{status:403});}}
  const result=await recordEvaluationAndPromotion({decisionId:`DEC-${crypto.randomUUID()}`,traversalAttemptId:attempt.id,evaluatorUserId:auth.profile.id,evaluatorCredentialId:grant.credentialId,evaluatorAuthorizationId:grant.authorizationId,decision,rationale,userId:attempt.userId,fromBeltId:attempt.beltId,targetBeltId});
  return Response.json({decision,promoted:result.promoted,targetBeltId:result.promoted?targetBeltId:null,promotionGate:"server-side"});
}
