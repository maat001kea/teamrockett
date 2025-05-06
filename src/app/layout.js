// src/app/layout.js eller src/pages/_app.js
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins, Lexend } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const lexend = Lexend({
  weight: ["200", "800"],
  subsets: ["latin"],
  variable: "--font-lexend",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} ${lexend.variable}`}>
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
