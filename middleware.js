// src/middleware.js
import arcjet, { detectBot, shield, createMiddleware as createArcjetMiddleware } from "@arcjet/next";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Arcjet setup
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"] }),
  ],
});

// Clerk setup
const clerk = clerkMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/"],
});

// Chain Arcjet and Clerk middlewares
export default createArcjetMiddleware(aj, clerk);

// Middleware matcher
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api(.*)",
  ],
};
