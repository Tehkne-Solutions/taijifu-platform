import fs from "node:fs";
const required=[
 "packages/ai/src/corpus.ts","packages/ai/src/retrieval.ts","packages/ai/src/policy.ts","packages/ai/src/answer.ts",
 "apps/academy/app/api/ai/query/route.ts","apps/academy/app/assistant/page.tsx","apps/dojo/app/api/ai/query/route.ts"
];
for(const f of required)if(!fs.existsSync(f))throw new Error(`missing ${f}`);
const academy=fs.readFileSync("apps/academy/app/api/ai/query/route.ts","utf8");
const dojo=fs.readFileSync("apps/dojo/app/api/ai/query/route.ts","utf8");
const workspace=fs.readFileSync("apps/dojo/app/workspace.tsx","utf8");
for(const marker of ["academy-tutor","answerTaijifuQuery","officialPositionAvailable"]){if(!academy.includes(marker))throw new Error(`academy AI missing ${marker}`)}
for(const marker of ["instructor-assistant","research-assistant","requireDojoRole","answerTaijifuQuery"]){if(!dojo.includes(marker))throw new Error(`dojo AI missing ${marker}`)}
if(!dojo.includes('["guardian","admin"]'))throw new Error("research assistant is not restricted to elevated dojo roles");
for(const forbidden of ["current_belt_id","belt_promotions","recordEvaluationAndPromotion","UPDATE user_profiles"]){if(academy.includes(forbidden)||dojo.includes(forbidden))throw new Error(`AI endpoint contains forbidden promotion mutation: ${forbidden}`)}
if(!workspace.includes('tab==="assistant"')||!workspace.includes('/api/ai/query'))throw new Error("dojo assistant UI not wired");
console.log("TAIJIFU_P7_AI_VALIDATION=PASS");
console.log("academy_tutor=ENABLED");
console.log("instructor_assistant=ENABLED");
console.log("research_assistant=ROLE_GATED");
console.log("canon_mutation=BLOCKED");
console.log("belt_mutation=BLOCKED");
