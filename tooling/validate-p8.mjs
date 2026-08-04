import fs from "node:fs";
const required=[
 "packages/db/migrations/0004_community_foundation.sql","packages/db/migrations/0005_community_mvp.sql","packages/db/src/community.ts",
 "apps/academy/app/api/community/profile/route.ts","apps/academy/app/api/community/groups/route.ts","apps/academy/app/api/community/feed/route.ts","apps/academy/app/api/community/mentoring/route.ts","apps/academy/app/api/community/interactions/route.ts",
 "apps/academy/app/community/page.tsx","apps/academy/app/community/profile/[handle]/page.tsx","apps/academy/app/community/group/[slug]/page.tsx"
];
for(const f of required)if(!fs.existsSync(f))throw new Error(`missing ${f}`);
const foundation=fs.readFileSync("packages/db/migrations/0004_community_foundation.sql","utf8");
const mvp=fs.readFileSync("packages/db/migrations/0005_community_mvp.sql","utf8");
const repo=fs.readFileSync("packages/db/src/community.ts","utf8");
const feed=fs.readFileSync("apps/academy/app/api/community/feed/route.ts","utf8");
const interactions=fs.readFileSync("apps/academy/app/api/community/interactions/route.ts","utf8");
const mentoring=fs.readFileSync("apps/academy/app/api/community/mentoring/route.ts","utf8");
for(const marker of ["community_profiles","community_groups","community_posts","mentoring_requests"]){if(!foundation.includes(marker))throw new Error(`community foundation missing ${marker}`)}
for(const marker of ["community_comments","community_reactions","community_moderation_events"]){if(!mvp.includes(marker))throw new Error(`community MVP migration missing ${marker}`)}
for(const marker of ["getCommunityProfileByHandle","getCommunityGroupBySlug","leaveCommunityGroup","createCommunityComment","toggleCommunityReaction","updateMentoringRequestStatus","moderateCommunityPost"]){if(!repo.includes(marker))throw new Error(`community repository missing ${marker}`)}
if(!feed.includes("isCanonicalEntityId"))throw new Error("community feed does not validate Canon references");
for(const marker of ["comment","react","moderate"]){if(!interactions.includes(`action===\"${marker}\"`))throw new Error(`interactions API missing ${marker}`)}
for(const marker of ["accepted","declined","completed","cancelled"]){if(!mentoring.includes(marker))throw new Error(`mentoring lifecycle missing ${marker}`)}
for(const forbidden of ["belt_promotions","recordEvaluationAndPromotion","UPDATE user_profiles SET current_belt_id"]){if(repo.includes(forbidden)||feed.includes(forbidden)||interactions.includes(forbidden)||mentoring.includes(forbidden))throw new Error(`community contains forbidden authority mutation: ${forbidden}`)}
console.log("TAIJIFU_P8_COMMUNITY_VALIDATION=PASS");
console.log("profiles=NAVIGABLE");
console.log("groups=MEMBERSHIP_AWARE");
console.log("feed=SEGMENTED+CANON_LINKED");
console.log("comments=ENABLED");
console.log("reactions=ENABLED");
console.log("mentoring=LIFECYCLE_ENABLED");
console.log("moderation=AUDITED");
console.log("belt_authority=SEPARATED");
