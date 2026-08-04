export interface UserProfileRow{id:string;externalAuthId:string;displayName?:string|null;currentBeltId:string}
export interface EvidenceRecordRow{id:string;userId:string;kind:string;status:string;canonicalEntityId:string;pathId?:string|null;beltId:string;body:string;metadata:Record<string,unknown>;createdAt:string}
export interface TraversalAttemptRow{id:string;userId:string;beltId:string;status:"submitted"|"under-review"|"approved"|"rejected"|"cancelled";reflection:string;evidenceSnapshot:unknown[];submittedAt:string}
export interface EvaluatorGrantRow{credentialId:string;credentialType:string;credentialScope:string;authorizationId:string;authorizationType:string;authorizationScope:string}
