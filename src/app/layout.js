// src/app/layout.js eller src/pages/_app.js
import { ClerkProvider } from "@clerk/nextjs";
import { Playfair_Display, Noto_Sans } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

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
    <ClerkProvider>
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
