import type { BeltLocalState, EvidenceKind, EvidenceRecord, LearningEvent, LearningStep } from "@taijifu/evidence/types";

export type BeltRuntimeConfig={
  slug:string; beltId:string; nextBeltId:string; label:string; functionName:string;
  nucleusStart:number; nucleusCount:number; pathIds:readonly string[];
};

export function createBeltRuntime(config:BeltRuntimeConfig){
  const storageKey=`taijifu:${config.slug}-belt-state:v2`;
  const changeEvent=`taijifu-${config.slug}-state`;
  const nucleusIds=Array.from({length:config.nucleusCount},(_,i)=>`NUC-N${String(i+config.nucleusStart).padStart(3,"0")}`);
  const emptyState=():BeltLocalState=>({schemaVersion:2,progress:{},evidence:[],pathCheckpoints:{},traversal:{status:"locked"},events:[]});
  const makeEvent=(type:LearningEvent["type"],detail:string,canonicalEntityId?:string):LearningEvent=>({id:crypto.randomUUID(),createdAt:new Date().toISOString(),type,canonicalEntityId,detail});
  const read=():BeltLocalState=>{if(typeof window==="undefined")return emptyState();const raw=window.localStorage.getItem(storageKey);if(!raw)return emptyState();try{const parsed=JSON.parse(raw) as BeltLocalState;return parsed.schemaVersion===2?parsed:emptyState();}catch{return emptyState();}};
  const write=(state:BeltLocalState)=>{window.localStorage.setItem(storageKey,JSON.stringify(state));window.dispatchEvent(new CustomEvent(changeEvent));};
  const subscribe=(callback:()=>void)=>{window.addEventListener("storage",callback);window.addEventListener(changeEvent,callback as EventListener);return()=>{window.removeEventListener("storage",callback);window.removeEventListener(changeEvent,callback as EventListener);};};
  const completeStep=(nucleusId:string,step:LearningStep)=>{const state=read();const current=state.progress[nucleusId]??{};if(current[step])return state;state.progress[nucleusId]={...current,[step]:true};state.events.unshift(makeEvent("step-completed",`${nucleusId}: ${step}`,nucleusId));write(state);return state;};
  const addEvidence=(input:{kind:EvidenceKind;canonicalEntityId:string;body:string;pathId?:string;metadata?:EvidenceRecord["metadata"];status?:EvidenceRecord["status"]})=>{const state=read();const record:EvidenceRecord={id:crypto.randomUUID(),createdAt:new Date().toISOString(),kind:input.kind,status:input.status??"recorded",canonicalEntityId:input.canonicalEntityId,pathId:input.pathId,beltId:config.beltId,body:input.body.trim(),metadata:input.metadata};state.evidence.unshift(record);state.events.unshift(makeEvent("evidence-recorded",`${input.kind}: ${input.canonicalEntityId}`,input.canonicalEntityId));write(state);return record;};
  const isNucleusComplete=(state:BeltLocalState,nucleusId:string)=>{const row=state.progress[nucleusId]??{};return Boolean(row.lesson&&row.practice&&row.quiz);};
  const pathNucleusIds=(pathId:string)=>{const index=config.pathIds.indexOf(pathId);if(index<0)return[];return nucleusIds.slice(index*4,index*4+4);};
  const completePathCheckpoint=(pathId:string,reflection:string)=>{const state=read();const ids=pathNucleusIds(pathId);if(!ids.every(id=>isNucleusComplete(state,id)))return{ok:false as const,reason:"learning-incomplete"};if(!reflection.trim())return{ok:false as const,reason:"reflection-required"};state.pathCheckpoints[pathId]=true;state.evidence.unshift({id:crypto.randomUUID(),createdAt:new Date().toISOString(),kind:"path-checkpoint",status:"recorded",canonicalEntityId:pathId,pathId,beltId:config.beltId,body:reflection.trim()});state.events.unshift(makeEvent("path-checkpoint-completed",`${pathId}: checkpoint registrado`,pathId));if(config.pathIds.every(id=>state.pathCheckpoints[id])&&nucleusIds.every(id=>isNucleusComplete(state,id)))state.traversal.status="ready";write(state);return{ok:true as const};};
  const submitTraversal=(reflection:string)=>{const state=read();const ready=config.pathIds.every(id=>state.pathCheckpoints[id])&&nucleusIds.every(id=>isNucleusComplete(state,id));if(!ready)return{ok:false as const,reason:"requirements-incomplete"};if(!reflection.trim())return{ok:false as const,reason:"reflection-required"};const submittedAt=new Date().toISOString();state.traversal={status:"submitted",submittedAt,reflection:reflection.trim()};state.evidence.unshift({id:crypto.randomUUID(),createdAt:submittedAt,kind:"traversal-submission",status:"submitted",canonicalEntityId:config.beltId,beltId:config.beltId,body:reflection.trim(),metadata:{promotionGranted:false,nextBelt:config.nextBeltId,decisionRequired:true}});state.events.unshift(makeEvent("traversal-submitted",`Travessia ${config.label} enviada para futura avaliação. Nenhuma promoção concedida.`,config.beltId));write(state);return{ok:true as const};};
  const reset=()=>{const state=emptyState();state.events.push(makeEvent("demo-reset",`Demo da Faixa ${config.label} reiniciada.`));write(state);};
  return{config,storageKey,nucleusIds,emptyState,read,write,subscribe,completeStep,addEvidence,isNucleusComplete,pathNucleusIds,completePathCheckpoint,submitTraversal,reset};
}
