// src/middleware.ts
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Arcjet setup
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

// Clerk setup
const clerk = clerkMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/"], // Routes that don’t need auth
});

// Export the middleware
export default async function middleware(req: Request) {
  // Run Arcjet first
  const arcjetResp = await aj(req);
  if (arcjetResp) return arcjetResp;

  // Then Clerk
  const clerkResp = await clerk(req);

  // If route is protected and user is not signed in, redirect
  if (isProtectedRoute(req) && !clerkResp) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return clerkResp ?? NextResponse.next();
}

// Middleware matcher: include all protected pages and API routes
export const config = {
  matcher: [
    "/dashboard(.*)",
    "/account(.*)",
    "/transaction(.*)",
    "/api(.*)",
  ],
};
