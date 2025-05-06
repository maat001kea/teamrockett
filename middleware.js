// // src/middleware.ts

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Liste over offentlige ruter
// const isPublicRoute = createRouteMatcher([
//   "/", // Forside
//   "/events(.*)", // Eksempel på events-rute
//   "/sign-in(.*)", // Clerk login
//   "/sign-up(.*)", // Clerk signup
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth().protect(); // Beskyt alle andre ruter
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)", // Beskyt alt undtagen systemfiler og statiske filer
//     "/api/(.*)", // Beskyt også API-ruter
//   ],
// };

// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/login", "/signup", "/products(.*)"], // de ruter kræver ikke login
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // alt andet bliver tjekket for Clerk-session
};
