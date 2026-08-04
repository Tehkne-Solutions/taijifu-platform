import { isCanonicalEntityId } from "@taijifu/canon";

export const TAIJIFU_MASTERS_REPOSITORY="Tehkne-Solutions/taijifu-masters" as const;
export type GameRelation="inspired-by"|"represents"|"references";
export type GameEventType="achievement"|"skill-unlocked"|"match-completed"|"quest-completed"|"game-level";

export interface GameCanonLink{gameEntityId:string;canonicalEntityId:string;relation:GameRelation;label?:string;}
export interface GameProgressEvent{eventId:string;taijifuUserId:string;gameProfileId:string;eventType:GameEventType;gameEntityId?:string;gameXp?:number;gameLevel?:number;occurredAt:string;metadata?:Record<string,unknown>;}

export function validateGameCanonLink(link:GameCanonLink){if(!/^GAME-[A-Z0-9][A-Z0-9_-]{2,80}$/.test(link.gameEntityId))throw new Error("invalid-game-entity-id");if(!isCanonicalEntityId(link.canonicalEntityId))throw new Error("invalid-canonical-entity-id");return link;}
export function normalizeGameProgressEvent(event:GameProgressEvent){if(!event.eventId||!event.taijifuUserId||!event.gameProfileId)throw new Error("invalid-game-event");return {...event,gameXp:Math.max(0,event.gameXp??0),gameLevel:Math.max(0,event.gameLevel??0)};}

export const GAME_AUTHORITY_RULES={
  gameXpCanGrantBelt:false,
  gameLevelCanGrantBelt:false,
  achievementCanGrantCredential:false,
  gameSkillCanGrantAuthorization:false,
  gameEventCanMutateCanon:false,
} as const;
