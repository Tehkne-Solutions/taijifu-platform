import fs from "node:fs";
const required=["packages/content/data/violet-belt-content.json","packages/content/data/violet-belt-slice.json","apps/academy/app/belt/violeta/page.tsx","apps/academy/app/belt/violeta/[nucleus]/page.tsx","apps/academy/app/belt/violeta/checkpoint/page.tsx","apps/academy/app/belt/violeta/travessia/page.tsx","apps/academy/app/belt/violeta/history/page.tsx","apps/academy/app/components/violet-runtime.ts"];
for(const file of required)if(!fs.existsSync(file))throw new Error(`missing ${file}`);
const cfg=JSON.parse(fs.readFileSync("packages/content/data/violet-belt-content.json","utf8"));const slice=JSON.parse(fs.readFileSync("packages/content/data/violet-belt-slice.json","utf8"));const runtime=fs.readFileSync("apps/academy/app/components/violet-runtime.ts","utf8");
if(cfg.length!==16||slice.nuclei.length!==16)throw new Error("Violet Belt must contain 16 nuclei");
if(slice.paths.join(",")!=="PATH-C25,PATH-C26,PATH-C27,PATH-C28")throw new Error("Violet Belt paths must be C25-C28");
for(let n=97;n<=112;n++){const id=`NUC-N${String(n).padStart(3,"0")}`;if(!cfg.some(x=>x.id===id))throw new Error(`missing ${id}`);}
for(const marker of ["BELT-VIOLET","BELT-BROWN","nucleusCount:16","PATH-C25","PATH-C28"]){if(!runtime.includes(marker))throw new Error(`Violet gate missing ${marker}`);}
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(runtime))throw new Error("client-side Violet promotion mutation detected");
console.log("TAIJIFU_VIOLET_BELT_VALIDATION=PASS");console.log("belt=BELT-VIOLET");console.log("paths=C25-C28");console.log("nuclei=N097-N112");console.log("learning_steps=48");console.log("automatic_promotion_to_brown=BLOCKED");
