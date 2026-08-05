"use client";
import type { EvidenceKind, EvidenceRecord, LearningStep, YellowBeltLocalState } from "@taijifu/evidence/types";
import { createBeltRuntime } from "./belt-runtime";
import { yellowConfig } from "./yellow-runtime";

const runtime=createBeltRuntime(yellowConfig);
let hydrationStarted=false;
export const YELLOW_STORAGE_KEY=runtime.storageKey;
export const YELLOW_NUCLEUS_IDS=runtime.nucleusIds;
export const YELLOW_PATH_IDS=yellowConfig.pathIds;
export const emptyYellowState=runtime.emptyState;
export function readYellowState():YellowBeltLocalState{if(typeof window!=="undefined"&&!hydrationStarted){hydrationStarted=true;void runtime.hydrate();}return runtime.read();}
export const writeYellowState=(state:YellowBeltLocalState)=>runtime.write(state);
export const subscribeYellowState=runtime.subscribe;
export const completeYellowLearningStep=(nucleusId:string,step:LearningStep)=>runtime.completeStep(nucleusId,step);
export const addYellowEvidence=(input:{kind:EvidenceKind;canonicalEntityId:string;body:string;pathId?:string;metadata?:EvidenceRecord["metadata"];status?:EvidenceRecord["status"]})=>runtime.addEvidence(input);
export const isYellowNucleusComplete=(state:YellowBeltLocalState,nucleusId:string)=>runtime.isNucleusComplete(state,nucleusId);
export const yellowPathNucleusIds=(pathId:string)=>runtime.pathNucleusIds(pathId);
export const completeYellowPathCheckpoint=(pathId:string,reflection:string)=>runtime.completePathCheckpoint(pathId,reflection);
export const submitYellowTraversal=(reflection:string)=>runtime.submitTraversal(reflection);
export const resetYellowDemo=runtime.reset;
