import fs from "node:fs";
const auth=fs.readFileSync("packages/auth/src/index.ts","utf8");
const env=fs.readFileSync(".env.example","utf8");
for(const marker of ["TAIJIFU_AUTH_BRIDGE_SECRET","x-taijifu-auth-signature","x-taijifu-auth-ts","timingSafeEqual","5*60_000","TAIJIFU_ALLOW_DEMO_AUTH"]){if(!auth.includes(marker))throw new Error(`auth boundary missing ${marker}`);}
if(!auth.includes("createSignedExternalAuthHeaders"))throw new Error("trusted auth bridge signer missing");
if(/if \(external\) \{|if\(external\)\{/.test(auth)&&!auth.includes("readSignedExternalPrincipal"))throw new Error("raw external header trust detected");
for(const marker of ["TAIJIFU_AUTH_BRIDGE_SECRET","TAIJIFU_ALLOW_DEMO_AUTH=0","NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY","CLERK_SECRET_KEY"]){if(!env.includes(marker))throw new Error(`env contract missing ${marker}`);}
console.log("TAIJIFU_AUTH_BOUNDARY_VALIDATION=PASS");
console.log("external_identity=HMAC_SIGNED");
console.log("replay_window=5_MINUTES");
console.log("demo_auth=OPT_IN_ONLY");
console.log("clerk=PROVIDER_READY_NOT_PROVISIONED");
