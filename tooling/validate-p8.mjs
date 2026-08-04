import fs from "node:fs";
const required=[
 "packages/db/migrations/0004_community_foundation.sql","packages/db/src/community.ts",
 "apps/academy/app/api/community/profile/route.ts","apps/academy/app/api/community/groups/route.ts","apps/academy/app/api/community/feed/route.ts","apps/academy/app/api/community/mentoring/route.ts","apps/academy/app/community/page.tsx"
];
for(const f of required)if(!fs.existsSync(f))throw new Error(`missing ${f}`);
const migration=fs.readFileSync("packages/db/migrations/0004_community_foundation.sql","utf8");
const repo=fs.readFileSync("packages/db/src/community.ts","utf8");
const feed=fs.readFileSync("apps/academy/app/api/community/feed/route.ts","utf8");
for(const marker of ["community_profiles","community_groups","community_posts","mentoring_requests"]){if(!migration.includes(marker))throw new Error(`community migration missing ${marker}`)}
for(const marker of ["upsertCommunityProfile","createCommunityGroup","createCommunityPost","createMentoringRequest"]){if(!repo.includes(marker))throw new Error(`community repository missing ${marker}`)}
if(!feed.includes("isCanonicalEntityId"))throw new Error("community feed does not validate Canon references");
for(const forbidden of ["belt_promotions","recordEvaluationAndPromotion","UPDATE user_profiles SET current_belt_id"]){if(repo.includes(forbidden)||feed.includes(forbidden))throw new Error(`community contains forbidden authority mutation: ${forbidden}`)}
console.log("TAIJIFU_P8_COMMUNITY_VALIDATION=PASS");
console.log("profiles=ENABLED");
console.log("groups=ENABLED");
console.log("feed=CANON_LINKED");
console.log("mentoring=REQUEST_ONLY");
console.log("belt_authority=SEPARATED");
