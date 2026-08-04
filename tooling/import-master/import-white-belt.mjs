#!/usr/bin/env node
import fs from "node:fs";
const names=JSON.parse(fs.readFileSync(new URL("../../packages/canon/data/nuclei.json",import.meta.url),"utf8"));
const paths=JSON.parse(fs.readFileSync(new URL("../../packages/canon/data/paths.json",import.meta.url),"utf8"));
const whitePathIds=new Set(paths.filter(p=>p.beltId==="BELT-WHITE").map(p=>p.id));
const nuclei=names.map((name,i)=>{const order=i+1;const pathOrder=Math.ceil(order/4);return{id:`NUC-N${String(order).padStart(3,"0")}`,code:`N${String(order).padStart(3,"0")}`,name,pathId:`PATH-C${String(pathOrder).padStart(2,"0")}`};});
const white=nuclei.filter(n=>whitePathIds.has(n.pathId));
console.log(JSON.stringify({release:"TAIJIFU-CANON-1.0",belt:"BELT-WHITE",paths:[...whitePathIds],nuclei:white,policy:"canonical-entities-only; prose never creates canon silently"},null,2));
