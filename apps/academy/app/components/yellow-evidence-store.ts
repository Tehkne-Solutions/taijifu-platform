"use client";

import type { EvidenceKind, EvidenceRecord, LearningEvent, LearningStep, YellowBeltLocalState } from "@taijifu/evidence/types";

export const YELLOW_STORAGE_KEY = "taijifu:yellow-belt-state:v2";
const CHANGE_EVENT = "taijifu-yellow-state";
export const YELLOW_NUCLEUS_IDS = Array.from({ length: 12 }, (_, i) => `NUC-N${String(i + 13).padStart(3, "0")}`);
export const YELLOW_PATH_IDS = ["PATH-C04", "PATH-C05", "PATH-C06"] as const;

export const emptyYellowState = (): YellowBeltLocalState => ({schemaVersion:2,progress:{},evidence:[],pathCheckpoints:{},traversal:{status:"locked"},events:[]});

function event(type:LearningEvent["type"],detail:string,canonicalEntityId?:string):LearningEvent{return{id:crypto.randomUUID(),createdAt:new Date().toISOString(),type,canonicalEntityId,detail};}

export function readYellowState():YellowBeltLocalState{
  if(typeof window==="undefined")return emptyYellowState();
  const raw=window.localStorage.getItem(YELLOW_STORAGE_KEY);if(!raw)return emptyYellowState();
  try{const parsed=JSON.parse(raw) as YellowBeltLocalState;return parsed.schemaVersion===2?parsed:emptyYellowState();}catch{return emptyYellowState();}
}
export function writeYellowState(state:YellowBeltLocalState){window.localStorage.setItem(YELLOW_STORAGE_KEY,JSON.stringify(state));window.dispatchEvent(new CustomEvent(CHANGE_EVENT));}
export function subscribeYellowState(callback:()=>void){window.addEventListener("storage",callback);window.addEventListener(CHANGE_EVENT,callback as EventListener);return()=>{window.removeEventListener("storage",callback);window.removeEventListener(CHANGE_EVENT,callback as EventListener);};}

export function completeYellowLearningStep(nucleusId:string,step:LearningStep){const state=readYellowState();const current=state.progress[nucleusId]??{};if(current[step])return state;state.progress[nucleusId]={...current,[step]:true};state.events.unshift(event("step-completed",`${nucleusId}: ${step}`,nucleusId));writeYellowState(state);return state;}

export function addYellowEvidence(input:{kind:EvidenceKind;canonicalEntityId:string;body:string;pathId?:string;metadata?:EvidenceRecord["metadata"];status?:EvidenceRecord["status"]}){
  const state=readYellowState();const record:EvidenceRecord={id:crypto.randomUUID(),createdAt:new Date().toISOString(),kind:input.kind,status:input.status??"recorded",canonicalEntityId:input.canonicalEntityId,pathId:input.pathId,beltId:"BELT-YELLOW",body:input.body.trim(),metadata:input.metadata};state.evidence.unshift(record);state.events.unshift(event("evidence-recorded",`${input.kind}: ${input.canonicalEntityId}`,input.canonicalEntityId));writeYellowState(state);return record;
}
export function isYellowNucleusComplete(state:YellowBeltLocalState,nucleusId:string){const row=state.progress[nucleusId]??{};return Boolean(row.lesson&&row.practice&&row.quiz);}
export function yellowPathNucleusIds(pathId:string){const index=YELLOW_PATH_IDS.indexOf(pathId as (typeof YELLOW_PATH_IDS)[number]);if(index<0)return[];return YELLOW_NUCLEUS_IDS.slice(index*4,index*4+4);}
export function completeYellowPathCheckpoint(pathId:string,reflection:string){const state=readYellowState();const ids=yellowPathNucleusIds(pathId);if(!ids.every(id=>isYellowNucleusComplete(state,id)))return{ok:false as const,reason:"learning-incomplete"};if(!reflection.trim())return{ok:false as const,reason:"reflection-required"};state.pathCheckpoints[pathId]=true;state.evidence.unshift({id:crypto.randomUUID(),createdAt:new Date().toISOString(),kind:"path-checkpoint",status:"recorded",canonicalEntityId:pathId,pathId,beltId:"BELT-YELLOW",body:reflection.trim()});state.events.unshift(event("path-checkpoint-completed",`${pathId}: checkpoint registrado`,pathId));if(YELLOW_PATH_IDS.every(id=>state.pathCheckpoints[id])&&YELLOW_NUCLEUS_IDS.every(id=>isYellowNucleusComplete(state,id)))state.traversal.status="ready";writeYellowState(state);return{ok:true as const};}
export function submitYellowTraversal(reflection:string){const state=readYellowState();const ready=YELLOW_PATH_IDS.every(id=>state.pathCheckpoints[id])&&YELLOW_NUCLEUS_IDS.every(id=>isYellowNucleusComplete(state,id));if(!ready)return{ok:false as const,reason:"requirements-incomplete"};if(!reflection.trim())return{ok:false as const,reason:"reflection-required"};const submittedAt=new Date().toISOString();state.traversal={status:"submitted",submittedAt,reflection:reflection.trim()};state.evidence.unshift({id:crypto.randomUUID(),createdAt:submittedAt,kind:"traversal-submission",status:"submitted",canonicalEntityId:"BELT-YELLOW",beltId:"BELT-YELLOW",body:reflection.trim(),metadata:{promotionGranted:false,nextBelt:"BELT-ORANGE",decisionRequired:true}});state.events.unshift(event("traversal-submitted","Travessia Amarela enviada para futura avaliação. Nenhuma promoção concedida.","BELT-YELLOW"));writeYellowState(state);return{ok:true as const};}
export function resetYellowDemo(){const state=emptyYellowState();state.events.push(event("demo-reset","Demo da Faixa Amarela reiniciada."));writeYellowState(state);}
