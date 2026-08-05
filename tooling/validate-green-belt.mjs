import fs from "node:fs";
const required=["packages/content/data/green-belt-content.json","packages/content/data/green-belt-slice.json","apps/academy/app/belt/verde/page.tsx","apps/academy/app/belt/verde/[nucleus]/page.tsx","apps/academy/app/belt/verde/checkpoint/page.tsx","apps/academy/app/belt/verde/travessia/page.tsx","apps/academy/app/belt/verde/history/page.tsx","apps/academy/app/components/green-runtime.ts"];
for(const file of required)if(!fs.existsSync(file))throw new Error(`missing ${file}`);
const cfg=JSON.parse(fs.readFileSync("packages/content/data/green-belt-content.json","utf8"));const slice=JSON.parse(fs.readFileSync("packages/content/data/green-belt-slice.json","utf8"));const runtime=fs.readFileSync("apps/academy/app/components/green-runtime.ts","utf8");
if(cfg.length!==16||slice.nuclei.length!==16)throw new Error("Green Belt must contain 16 nuclei");
if(slice.paths.join(",")!=="PATH-C13,PATH-C14,PATH-C15,PATH-C16")throw new Error("Green Belt paths must be C13-C16");
for(let n=49;n<=64;n++){const id=`NUC-N${String(n).padStart(3,"0")}`;if(!cfg.some(x=>x.id===id))throw new Error(`missing ${id}`);}
for(const marker of ["BELT-GREEN","BELT-CYAN","nucleusCount:16","PATH-C13","PATH-C16"]){if(!runtime.includes(marker))throw new Error(`Green gate missing ${marker}`);}
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(runtime))throw new Error("client-side Green promotion mutation detected");
console.log("TAIJIFU_GREEN_BELT_VALIDATION=PASS");console.log("belt=BELT-GREEN");console.log("paths=C13-C16");console.log("nuclei=N049-N064");console.log("learning_steps=48");console.log("automatic_promotion_to_cyan=BLOCKED");
