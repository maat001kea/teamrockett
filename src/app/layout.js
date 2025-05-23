import { ClerkProvider } from "@clerk/nextjs";
import { Playfair_Display, Noto_Sans } from "next/font/google";
import dynamic from "next/dynamic"; // 👈 tilføj dette
import Footer from "./components/Footer";
import "./globals.css";

// Dynamisk import af Header, så Clerk ikke fejler under SSR
const Header = dynamic(() => import("./components/Header"), { ssr: false });

const playfair = Playfair_Display({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notosans = Noto_Sans({
  weight: ["200", "900"],
  subsets: ["latin"],
  variable: "--font-notosans",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={`${playfair.variable} ${notosans.variable}`}>
        <body suppressHydrationWarning>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
