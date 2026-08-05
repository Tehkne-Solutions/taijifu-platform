"use client";
import type { EvidenceKind, EvidenceRecord, LearningStep, OrangeBeltLocalState } from "@taijifu/evidence/types";
import { createBeltRuntime } from "./belt-runtime";
import { orangeConfig } from "./orange-runtime";

const runtime=createBeltRuntime(orangeConfig);
let hydrationStarted=false;
export const ORANGE_STORAGE_KEY=runtime.storageKey;
export const ORANGE_NUCLEUS_IDS=runtime.nucleusIds;
export const ORANGE_PATH_IDS=orangeConfig.pathIds;
export const emptyOrangeState=runtime.emptyState;
export function readOrangeState():OrangeBeltLocalState{if(typeof window!=="undefined"&&!hydrationStarted){hydrationStarted=true;void runtime.hydrate();}return runtime.read();}
export const writeOrangeState=(state:OrangeBeltLocalState)=>runtime.write(state);
export const subscribeOrangeState=runtime.subscribe;
export const completeOrangeLearningStep=(nucleusId:string,step:LearningStep)=>runtime.completeStep(nucleusId,step);
export const addOrangeEvidence=(input:{kind:EvidenceKind;canonicalEntityId:string;body:string;pathId?:string;metadata?:EvidenceRecord["metadata"];status?:EvidenceRecord["status"]})=>runtime.addEvidence(input);
export const isOrangeNucleusComplete=(state:OrangeBeltLocalState,nucleusId:string)=>runtime.isNucleusComplete(state,nucleusId);
export const orangePathNucleusIds=(pathId:string)=>runtime.pathNucleusIds(pathId);
export const completeOrangePathCheckpoint=(pathId:string,reflection:string)=>runtime.completePathCheckpoint(pathId,reflection);
export const submitOrangeTraversal=(reflection:string)=>runtime.submitTraversal(reflection);
export const resetOrangeDemo=runtime.reset;
