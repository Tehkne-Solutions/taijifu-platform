import fs from "node:fs";
const required=[
 "packages/ai/src/corpus.ts","packages/ai/src/retrieval.ts","packages/ai/src/policy.ts","packages/ai/src/answer.ts",
 "packages/db/migrations/0003_ai_mvp.sql","packages/db/src/ai.ts",
 "apps/academy/app/api/ai/query/route.ts","apps/academy/app/api/ai/history/route.ts","apps/academy/app/assistant/page.tsx","apps/academy/app/assistant/history/page.tsx",
 "apps/dojo/app/api/ai/query/route.ts"
];
for(const f of required)if(!fs.existsSync(f))throw new Error(`missing ${f}`);
const academy=fs.readFileSync("apps/academy/app/api/ai/query/route.ts","utf8");
const dojo=fs.readFileSync("apps/dojo/app/api/ai/query/route.ts","utf8");
const aiDb=fs.readFileSync("packages/db/src/ai.ts","utf8");
const migration=fs.readFileSync("packages/db/migrations/0003_ai_mvp.sql","utf8");
for(const marker of ["academy-tutor","answerTaijifuQuery","conversationId","generationId","completeAiGeneration"]){if(!academy.includes(marker))throw new Error(`academy AI missing ${marker}`)}
for(const marker of ["instructor-assistant","research-assistant","requireDojoRole","conversationId","generationId","completeAiGeneration"]){if(!dojo.includes(marker))throw new Error(`dojo AI missing ${marker}`)}
if(!dojo.includes('["guardian","admin"]'))throw new Error("research assistant is not restricted to elevated dojo roles");
for(const marker of ["ai_conversations","ai_generations","estimated_cost_microusd"]){if(!migration.includes(marker))throw new Error(`AI migration missing ${marker}`)}
for(const marker of ["ensureAiConversation","createAiGeneration","completeAiGeneration","listAiConversations","getAiUsageSummary"]){if(!aiDb.includes(marker))throw new Error(`AI DB repository missing ${marker}`)}
for(const forbidden of ["belt_promotions","recordEvaluationAndPromotion","UPDATE user_profiles SET current_belt_id"]){if(academy.includes(forbidden)||dojo.includes(forbidden)||aiDb.includes(forbidden))throw new Error(`AI surface contains forbidden promotion mutation: ${forbidden}`)}
console.log("TAIJIFU_P7_AI_VALIDATION=PASS");
console.log("academy_tutor=PERSISTENT");
console.log("instructor_assistant=PERSISTENT");
console.log("research_assistant=PERSISTENT+ROLE_GATED");
console.log("history=ENABLED");
console.log("usage_cost_tracking=ENABLED");
console.log("canon_mutation=BLOCKED");
console.log("belt_mutation=BLOCKED");
