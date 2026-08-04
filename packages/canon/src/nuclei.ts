import names from "../data/nuclei.json";
import pathsData from "../data/paths.json";
import type { Nucleus, Path } from "./types";
const paths=pathsData as Path[];
export const nuclei:Nucleus[]=(names as string[]).map((name,index)=>{const order=index+1;const path=paths[Math.floor(index/4)];const code=`N${String(order).padStart(3,"0")}`;return{id:`NUC-${code}`,code,order,name,titleStatus:"current",pathId:path.id,beltId:path.beltId,status:"current"};});
export default nuclei;
