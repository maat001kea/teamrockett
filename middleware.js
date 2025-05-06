// Importér Clerk’s middlewarefunktion – bruges til at beskytte ruter
import { clerkMiddleware } from "@clerk/nextjs/server";

// Konfigurer middleware'en
export default clerkMiddleware({
  // 📂 Disse ruter er offentlige og kræver ikke login
  publicRoutes: ["/", "/login", "/signup", "/products(.*)"], // produkter + undermapper
});

// 📌 Matcher alle ruter undtagen statiske filer og Next.js systemfiler
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
