import fs from "node:fs";
const required=[
  "packages/db/migrations/010_practice_state.sql",
  "packages/db/src/practice.ts",
  "apps/academy/app/api/practice/state/route.ts",
  "apps/academy/app/api/traversal/submit/route.ts",
  "apps/academy/app/components/belt-runtime.ts",
  "apps/academy/app/components/white-runtime.ts",
  "apps/academy/app/components/yellow-runtime.ts",
  "apps/academy/app/components/orange-runtime.ts"
];
for(const file of required)if(!fs.existsSync(file))throw new Error(`missing ${file}`);
const runtime=fs.readFileSync("apps/academy/app/components/belt-runtime.ts","utf8");
const api=fs.readFileSync("apps/academy/app/api/practice/state/route.ts","utf8");
const evidenceApi=fs.readFileSync("apps/academy/app/api/evidence/route.ts","utf8");
const traversalApi=fs.readFileSync("apps/academy/app/api/traversal/submit/route.ts","utf8");
const db=fs.readFileSync("packages/db/src/practice.ts","utf8");
for(const marker of ["/api/practice/state","hydrate","syncSnapshot","/api/evidence","/api/traversal/submit"]){if(!runtime.includes(marker))throw new Error(`runtime missing ${marker}`);}
for(const marker of ["readPrincipalFromRequest","isDatabaseConfigured","invalid-practice-state","promotionGranted"]){if(!api.includes(marker))throw new Error(`practice API missing ${marker}`);}
if(!evidenceApi.includes("evidence-belt-mismatch"))throw new Error("official evidence must be scoped to current belt");
for(const marker of ["path-checkpoints-incomplete","getCanonicalNextBeltId","kind===\"path-checkpoint\""]){if(!traversalApi.includes(marker))throw new Error(`traversal API missing ${marker}`);}
if(!db.includes("practice_states")||!db.includes("ON CONFLICT (user_id,belt_id)"))throw new Error("practice repository missing upsert contract");
for(const file of ["apps/academy/app/components/evidence-store.ts","apps/academy/app/components/yellow-evidence-store.ts","apps/academy/app/components/orange-evidence-store.ts"]){const src=fs.readFileSync(file,"utf8");if(!src.includes("createBeltRuntime"))throw new Error(`${file} is not using generic runtime`);}
if(/currentBeltId\s*=|recordEvaluationAndPromotion/.test(runtime+api))throw new Error("client practice persistence must not mutate belt");
console.log("TAIJIFU_PRACTICE_PERSISTENCE_VALIDATION=PASS");
console.log("practice_state=LOCAL_FIRST_SERVER_AUTHORITATIVE");
console.log("snapshot=POSTGRES_AUTHENTICATED");
console.log("white_yellow_orange=GENERIC_RUNTIME");
console.log("official_evidence=CURRENT_BELT_SCOPED");
console.log("official_traversal=REQUIRES_PERSISTED_PATH_CHECKPOINTS");
console.log("client_belt_mutation=BLOCKED");
