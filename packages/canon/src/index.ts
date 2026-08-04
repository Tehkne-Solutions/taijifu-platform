import beltsData from "../data/belts.json";
import pathsData from "../data/paths.json";
import basesData from "../data/bases.json";
import releaseData from "../data/release.json";
import nucleiData from "./nuclei";
import type { Belt, Path, Nucleus, CanonRelease } from "./types";

export type { Belt, Path, Nucleus, CanonRelease, CanonStatus } from "./types";
export const belts = beltsData as Belt[];
export const paths = pathsData as Path[];
export const nuclei = nucleiData as Nucleus[];
export const bases = basesData;
export const canonRelease = releaseData as CanonRelease;

const beltIds = new Set(belts.map((x) => x.id));
const pathIds = new Set(paths.map((x) => x.id));
const nucleusIds = new Set(nuclei.map((x) => x.id));
export function isCanonicalEntityId(id: string): boolean { return beltIds.has(id) || pathIds.has(id) || nucleusIds.has(id) || bases.some((x) => x.id === id); }
export function getCanonicalNextBeltId(currentBeltId: string): string | null { const current=belts.find((x)=>x.id===currentBeltId&&x.status==="current"); if(!current)return null; return belts.find((x)=>x.order===current.order+1&&x.status==="current")?.id??null; }
