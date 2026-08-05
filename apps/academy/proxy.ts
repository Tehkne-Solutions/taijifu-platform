import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createSignedExternalAuthHeaders } from "@taijifu/auth";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/health(.*)",
  "/api/readiness(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) return NextResponse.next();
  const session = await auth();
  if (!session.userId) {
    await auth.protect();
    return NextResponse.next();
  }
  const requestHeaders = new Headers(request.headers);
  const signed = createSignedExternalAuthHeaders({ externalAuthId: session.userId });
  for (const [name, value] of Object.entries(signed)) requestHeaders.set(name, value);
  return NextResponse.next({ request: { headers: requestHeaders } });
}, { frontendApiProxy: { enabled: true } });

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
