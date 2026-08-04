export type CanonStatus = 'current' | 'historical' | 'candidate' | 'deprecated';
export type Belt = { id:string; order:number; name:string; function:string; pathIds:string[]; status:CanonStatus };
export type Path = { id:string; code:string; order:number; name:string; beltId:string; function:string; nucleusIds:string[]; status:CanonStatus };
export type Nucleus = { id:string; code:string; order:number; name:string; titleStatus:'current'|'title-pending'; pathId:string; beltId:string; status:CanonStatus };
export type CanonRelease = { id:string; version:string; status:'current'|'candidate'|'historical'; releasedAt:string; signature:string; sourceDocument:string };
