import { createHmac, timingSafeEqual } from "node:crypto";

export interface AuthenticatedPrincipal {
  externalAuthId: string;
  displayName?: string;
  mode: "signed-demo-session" | "external-provider";
}

function decodeCookieValue(value: string): string | null {
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  const secret = process.env.TAIJIFU_SESSION_SECRET;
  if (!secret) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return Buffer.from(payload, "base64url").toString("utf8");
}

export function readPrincipalFromRequest(request: Request): AuthenticatedPrincipal | null {
  const external = request.headers.get("x-taijifu-auth-sub");
  if (external) {
    return {
      externalAuthId: external,
      displayName: request.headers.get("x-taijifu-auth-name") ?? undefined,
      mode: "external-provider",
    };
  }

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
  const secret = process.env.TAIJIFU_SESSION_SECRET;
  if (!secret) throw new Error("TAIJIFU_SESSION_SECRET is required");
  const payload = Buffer.from(`${externalAuthId}|${displayName}`, "utf8").toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
