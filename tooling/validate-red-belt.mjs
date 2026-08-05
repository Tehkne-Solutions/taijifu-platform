import fs from "node:fs";
const required=[
  "packages/content/data/red-belt-content.json","packages/content/data/red-belt-slice.json",
  "apps/academy/app/components/belt-runtime.ts","apps/academy/app/components/belt-runtime-ui.tsx","apps/academy/app/components/red-runtime.ts",
  "apps/academy/app/belt/vermelha/page.tsx","apps/academy/app/belt/vermelha/[nucleus]/page.tsx","apps/academy/app/belt/vermelha/checkpoint/page.tsx","apps/academy/app/belt/vermelha/travessia/page.tsx","apps/academy/app/belt/vermelha/history/page.tsx"
];
for(const file of required)if(!fs.existsSync(file))throw new Error(`missing ${file}`);
const config=JSON.parse(fs.readFileSync("packages/content/data/red-belt-content.json","utf8"));
const slice=JSON.parse(fs.readFileSync("packages/content/data/red-belt-slice.json","utf8"));
const runtime=fs.readFileSync("apps/academy/app/components/red-runtime.ts","utf8");
const engine=fs.readFileSync("apps/academy/app/components/belt-runtime.ts","utf8");
const page=fs.readFileSync("apps/academy/app/belt/vermelha/page.tsx","utf8");
if(config.length!==12||slice.nuclei.length!==12)throw new Error("Red Belt must contain 12 nuclei");
if(slice.paths.join(",")!=="PATH-C10,PATH-C11,PATH-C12")throw new Error("Red Belt paths must be C10-C12");
for(let n=37;n<=48;n++){const id=`NUC-N${String(n).padStart(3,"0")}`;if(!config.some(x=>x.id===id))throw new Error(`missing ${id}`);}
for(const marker of ["BELT-RED","BELT-GREEN","nucleusStart:37","PATH-C10","PATH-C11","PATH-C12"]){if(!runtime.includes(marker))throw new Error(`Red runtime missing ${marker}`);}
for(const marker of ["promotionGranted:false","decisionRequired:true","submitTraversal","completePathCheckpoint"]){if(!engine.includes(marker))throw new Error(`generic belt engine missing ${marker}`);}
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(engine))throw new Error("client-side generic belt promotion mutation detected");
for(const marker of ["Faixa 04 · Vermelha","Manifestar.","C10–C12","/belt/vermelha/travessia"]){if(!page.includes(marker))throw new Error(`Red page missing ${marker}`);}
console.log("TAIJIFU_RED_BELT_VALIDATION=PASS");
console.log("belt=BELT-RED");console.log("paths=C10-C12");console.log("nuclei=N037-N048");console.log("learning_steps=36");console.log("runtime=GENERIC_BELT_ENGINE");console.log("automatic_promotion_to_green=BLOCKED");
