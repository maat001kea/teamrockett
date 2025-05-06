import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/login", "/signup", "/products(.*)"], // Dine offentlige ruter
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Matcher alt, bortset fra _next og assets
};
