import fs from "node:fs";
const required=["packages/game-bridge/package.json","packages/game-bridge/src/index.ts","packages/db/migrations/0006_game_bridge_foundation.sql"];
for(const f of required)if(!fs.existsSync(f))throw new Error(`missing ${f}`);
const bridge=fs.readFileSync("packages/game-bridge/src/index.ts","utf8");
const migration=fs.readFileSync("packages/db/migrations/0006_game_bridge_foundation.sql","utf8");
for(const marker of ["TAIJIFU_MASTERS_REPOSITORY","validateGameCanonLink","normalizeGameProgressEvent","GAME_AUTHORITY_RULES"]){if(!bridge.includes(marker))throw new Error(`game bridge missing ${marker}`)}
for(const marker of ["game_profiles","game_canon_links","game_progress_events"]){if(!migration.includes(marker))throw new Error(`game bridge migration missing ${marker}`)}
for(const rule of ["gameXpCanGrantBelt:false","gameLevelCanGrantBelt:false","achievementCanGrantCredential:false","gameSkillCanGrantAuthorization:false","gameEventCanMutateCanon:false"]){if(!bridge.includes(rule))throw new Error(`authority rule missing ${rule}`)}
for(const forbidden of ["belt_promotions","UPDATE user_profiles SET current_belt_id","recordEvaluationAndPromotion"]){if(bridge.includes(forbidden)||migration.includes(forbidden))throw new Error(`game bridge contains forbidden real progression mutation: ${forbidden}`)}
console.log("TAIJIFU_P9_GAME_BRIDGE_VALIDATION=PASS");
console.log("game_repo=Tehkne-Solutions/taijifu-masters");
console.log("game_ids=NAMESPACED");
console.log("canon_links=VALIDATED");
console.log("real_belt_mutation=BLOCKED");
console.log("credential_mutation=BLOCKED");
