export type ContentNodeType="article"|"lesson"|"quiz"|"guided-practice"|"video"|"instructor-card"|"kids-view"|"lifetime-view"|"ai-context";
export type Audience="public"|"adult"|"kids"|"youth"|"lifetime"|"instructor"|"research";
export type Difficulty="foundation"|"developing"|"advanced"|"mastery";
export type ContentStatus="draft"|"published"|"archived";
export type ContentEdgeType="teaches"|"assesses"|"practices"|"next"|"view-of"|"references";
export interface ContentNodeBase{id:string;canonicalEntityId:string;type:ContentNodeType;title:string;summary?:string;audience:Audience[];difficulty:Difficulty;durationMinutes?:number;status:ContentStatus;version:string;beltId?:string;pathId?:string}
export interface ContentEdge{from:string;type:ContentEdgeType;to:string}
export interface ContentSlice{sliceId:string;canonRelease:string;beltId:string;paths:string[];nuclei:string[];entryNode:string;status:ContentStatus;version:string}
