import fs from "node:fs";
const required=[
  "packages/content/data/yellow-belt-content.json",
  "packages/content/data/yellow-belt-slice.json",
  "apps/academy/app/belt/amarela/page.tsx",
  "apps/academy/app/belt/amarela/[nucleus]/page.tsx",
  "apps/academy/app/belt/amarela/checkpoint/page.tsx",
  "apps/academy/app/belt/amarela/travessia/page.tsx",
  "apps/academy/app/belt/amarela/history/page.tsx",
  "apps/academy/app/components/yellow-evidence-store.ts",
  "apps/academy/app/components/yellow-progress.tsx",
  "apps/academy/app/components/yellow-evidence.tsx"
];
for(const file of required)if(!fs.existsSync(file))throw new Error(`missing ${file}`);
const config=JSON.parse(fs.readFileSync("packages/content/data/yellow-belt-content.json","utf8"));
const slice=JSON.parse(fs.readFileSync("packages/content/data/yellow-belt-slice.json","utf8"));
const store=fs.readFileSync("apps/academy/app/components/yellow-evidence-store.ts","utf8");
const page=fs.readFileSync("apps/academy/app/belt/amarela/page.tsx","utf8");
if(config.length!==12||slice.nuclei.length!==12)throw new Error("Yellow Belt must contain 12 nuclei");
if(slice.paths.join(",")!=="PATH-C04,PATH-C05,PATH-C06")throw new Error("Yellow Belt paths must be C04-C06");
for(let n=13;n<=24;n++){const id=`NUC-N${String(n).padStart(3,"0")}`;if(!config.some(x=>x.id===id))throw new Error(`missing ${id}`);}
for(const marker of ["BELT-YELLOW","BELT-ORANGE","promotionGranted:false","decisionRequired:true","YELLOW_NUCLEUS_IDS","YELLOW_PATH_IDS"]){if(!store.includes(marker))throw new Error(`Yellow gate missing ${marker}`);}
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(store))throw new Error("client-side Yellow promotion mutation detected");
for(const marker of ["Faixa 02 · Amarela","Perceber.","C04–C06","/belt/amarela/travessia"]){if(!page.includes(marker))throw new Error(`Yellow page missing ${marker}`);}
console.log("TAIJIFU_YELLOW_BELT_VALIDATION=PASS");
console.log("belt=BELT-YELLOW");
console.log("paths=C04-C06");
console.log("nuclei=N013-N024");
console.log("learning_steps=36");
console.log("automatic_promotion_to_orange=BLOCKED");
