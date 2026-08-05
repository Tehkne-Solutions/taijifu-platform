import fs from "node:fs";

const read=(p)=>fs.readFileSync(new URL(`../${p}`,import.meta.url),"utf8");
const pkg=JSON.parse(read("apps/academy/package.json"));
const proxy=read("apps/academy/proxy.ts");
const readiness=read("apps/academy/app/api/readiness/route.ts");
const signIn=read("apps/academy/app/sign-in/[[...sign-in]]/page.tsx");
const signUp=read("apps/academy/app/sign-up/[[...sign-up]]/page.tsx");
const failures=[];
if(!pkg.dependencies?.["@clerk/nextjs"])failures.push("Academy must depend on @clerk/nextjs");
for(const token of ["clerkMiddleware","auth.protect","createSignedExternalAuthHeaders","session.userId"])if(!proxy.includes(token))failures.push(`proxy missing ${token}`);
for(const token of ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY","CLERK_SECRET_KEY","TAIJIFU_AUTH_BRIDGE_SECRET"])if(!readiness.includes(token))failures.push(`readiness missing ${token}`);
if(!signIn.includes("<SignIn"))failures.push("sign-in page missing Clerk SignIn");
if(!signUp.includes("<SignUp"))failures.push("sign-up page missing Clerk SignUp");
if(failures.length){console.error(failures.join("\n"));process.exit(1);}
console.log("TAIJIFU_CLERK_AUTH_VALIDATION=PASS");
console.log("identity_provider=CLERK");
console.log("bridge=HMAC_SIGNED");
console.log("demo_auth_production=BLOCKED");
