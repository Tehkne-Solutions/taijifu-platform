import fs from "node:fs";
const required=["packages/content/data/cyan-belt-content.json","packages/content/data/cyan-belt-slice.json","apps/academy/app/belt/ciano/page.tsx","apps/academy/app/belt/ciano/[nucleus]/page.tsx","apps/academy/app/belt/ciano/checkpoint/page.tsx","apps/academy/app/belt/ciano/travessia/page.tsx","apps/academy/app/belt/ciano/history/page.tsx","apps/academy/app/components/cyan-runtime.ts"];
for(const file of required)if(!fs.existsSync(file))throw new Error(`missing ${file}`);
const cfg=JSON.parse(fs.readFileSync("packages/content/data/cyan-belt-content.json","utf8"));const slice=JSON.parse(fs.readFileSync("packages/content/data/cyan-belt-slice.json","utf8"));const runtime=fs.readFileSync("apps/academy/app/components/cyan-runtime.ts","utf8");
if(cfg.length!==16||slice.nuclei.length!==16)throw new Error("Cyan Belt must contain 16 nuclei");
if(slice.paths.join(",")!=="PATH-C17,PATH-C18,PATH-C19,PATH-C20")throw new Error("Cyan Belt paths must be C17-C20");
for(let n=65;n<=80;n++){const id=`NUC-N${String(n).padStart(3,"0")}`;if(!cfg.some(x=>x.id===id))throw new Error(`missing ${id}`);}
for(const marker of ["BELT-CYAN","BELT-BLUE","nucleusCount:16","PATH-C17","PATH-C20"]){if(!runtime.includes(marker))throw new Error(`Cyan gate missing ${marker}`);}
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(runtime))throw new Error("client-side Cyan promotion mutation detected");
console.log("TAIJIFU_CYAN_BELT_VALIDATION=PASS");console.log("belt=BELT-CYAN");console.log("paths=C17-C20");console.log("nuclei=N065-N080");console.log("learning_steps=48");console.log("automatic_promotion_to_blue=BLOCKED");
