import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Disse ruter kræver IKKE login
  publicRoutes: [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/kvittering",
    "/api/smk(.*)", // Hvis du laver en proxy til SMK API'et
  ],
});

// Matcher alle ruter undtagen Next.js intern (_next) og statiske filer
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
