import fs from "node:fs";
import path from "node:path";
const root=process.cwd();
const readJson=(p)=>JSON.parse(fs.readFileSync(path.join(root,p),"utf8"));
const bases=readJson("packages/canon/data/bases.json");
const belts=readJson("packages/canon/data/belts.json");
const paths=readJson("packages/canon/data/paths.json");
const nuclei=readJson("packages/canon/data/nuclei.json");
const nodes=readJson("packages/content/data/content-nodes.json").filter(x=>x.status==="published");
const policy=fs.readFileSync(path.join(root,"packages/ai/src/policy.ts"),"utf8");
const retrieval=fs.readFileSync(path.join(root,"packages/ai/src/retrieval.ts"),"utf8");
const answer=fs.readFileSync(path.join(root,"packages/ai/src/answer.ts"),"utf8");
const expected=bases.length+belts.filter(x=>x.status==="current").length+paths.filter(x=>x.status==="current").length+nuclei.filter(x=>x.status==="current").length+nodes.length;
if(expected!==210) throw new Error(`unexpected RAG corpus size ${expected}`);
for(const marker of ["CURRENT CANON > APPROVED CONTENT > RESEARCH > HISTORICAL","Não há posição canônica vigente suficientemente definida","Não invente definições","Não conceda faixa"]){if(!policy.includes(marker))throw new Error(`missing AI policy marker: ${marker}`)}
for(const [tier,weight] of [["current-canon",1000],["approved-content",500],["research",100],["historical",10]]){const quoted=`\"${tier}\": ${weight}`;const bare=`${tier}: ${weight}`;if(!retrieval.includes(quoted)&&!retrieval.includes(bare))throw new Error(`missing tier weight ${tier}`)}
if(answer.includes("model: \"")||answer.includes("model:'"))throw new Error("AI model must not be hardcoded");
if(!answer.includes("process.env.TAIJIFU_AI_MODEL"))throw new Error("TAIJIFU_AI_MODEL env is required for model mode");
if(!answer.includes("officialPositionAvailable"))throw new Error("answer path does not gate official position");
console.log("TAIJIFU_AI_RAG_VALIDATION=PASS");
console.log(`rag_documents=${expected}`);
console.log("priority=CURRENT_CANON>APPROVED>RESEARCH>HISTORICAL");
console.log("model=ENV_CONFIGURED_ONLY");
console.log("no_canon_position=EXPLICIT");
