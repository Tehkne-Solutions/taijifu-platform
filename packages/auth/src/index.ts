import { createHmac, timingSafeEqual } from "node:crypto";

export interface AuthenticatedPrincipal {
  externalAuthId: string;
  displayName?: string;
  mode: "signed-demo-session" | "external-provider";
}

const safeEqual=(left:string,right:string)=>{const a=Buffer.from(left);const b=Buffer.from(right);return a.length===b.length&&timingSafeEqual(a,b);};

function decodeCookieValue(value: string): string | null {
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  const secret = process.env.TAIJIFU_SESSION_SECRET;
  if (!secret) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  if (!safeEqual(signature, expected)) return null;
  return Buffer.from(payload, "base64url").toString("utf8");
}

function readSignedExternalPrincipal(request:Request):AuthenticatedPrincipal|null{
  const externalAuthId=request.headers.get("x-taijifu-auth-sub")?.trim();
  const displayName=request.headers.get("x-taijifu-auth-name")?.trim()||undefined;
  const timestamp=request.headers.get("x-taijifu-auth-ts")?.trim();
  const signature=request.headers.get("x-taijifu-auth-signature")?.trim();
  const secret=process.env.TAIJIFU_AUTH_BRIDGE_SECRET;
  if(!externalAuthId||!timestamp||!signature||!secret)return null;
  const unixMs=Number(timestamp);
  if(!Number.isFinite(unixMs)||Math.abs(Date.now()-unixMs)>5*60_000)return null;
  const payload=`${externalAuthId}\n${displayName??""}\n${timestamp}`;
  const expected=createHmac("sha256",secret).update(payload).digest("base64url");
  if(!safeEqual(signature,expected))return null;
  return{externalAuthId,displayName,mode:"external-provider"};
}

export function readPrincipalFromRequest(request: Request): AuthenticatedPrincipal | null {
  const external=readSignedExternalPrincipal(request);
  if(external)return external;

  if(process.env.TAIJIFU_ALLOW_DEMO_AUTH!=="1")return null;
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = cookieHeader.split(";").map((x) => x.trim()).find((x) => x.startsWith("taijifu_session="))?.split("=")[1];
  if (!token) return null;
  const decoded = decodeCookieValue(token);
  if (!decoded) return null;
  const [externalAuthId, ...nameParts] = decoded.split("|");
  if (!externalAuthId) return null;
  return { externalAuthId, displayName: nameParts.join("|") || undefined, mode: "signed-demo-session" };
}

export function createSignedDemoSession(externalAuthId: string, displayName = "Demo Practitioner"): string {
  if(process.env.TAIJIFU_ALLOW_DEMO_AUTH!=="1")throw new Error("TAIJIFU_ALLOW_DEMO_AUTH=1 is required for demo sessions");
  const secret = process.env.TAIJIFU_SESSION_SECRET;
  if (!secret) throw new Error("TAIJIFU_SESSION_SECRET is required");
  const payload = Buffer.from(`${externalAuthId}|${displayName}`, "utf8").toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function createSignedExternalAuthHeaders(input:{externalAuthId:string;displayName?:string;timestamp?:number}){
  const secret=process.env.TAIJIFU_AUTH_BRIDGE_SECRET;
  if(!secret)throw new Error("TAIJIFU_AUTH_BRIDGE_SECRET is required");
  const timestamp=String(input.timestamp??Date.now());
  const displayName=input.displayName??"";
  const payload=`${input.externalAuthId}\n${displayName}\n${timestamp}`;
  const signature=createHmac("sha256",secret).update(payload).digest("base64url");
  return{"x-taijifu-auth-sub":input.externalAuthId,"x-taijifu-auth-name":displayName,"x-taijifu-auth-ts":timestamp,"x-taijifu-auth-signature":signature};
}
