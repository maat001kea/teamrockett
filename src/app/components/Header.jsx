"use client";

import React from "react";
import Link from "next/link";
import logoImg from "@/app/assets/logo.png";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white" style={{ gridColumn: "full-bleed" }}>
      <div className="grid grid-cols-subgrid" style={{ gridColumn: "content" }}>
        <div className="flex justify-between items-center py-4 px-2 w-full">
          {/*  Logo */}
          <Link href="/" className="flex items-center whitespace-nowrap">
            <Image src={logoImg} alt="Logo" width={100} height={100} className="mr-2" />
          </Link>

          {/* (for store skærmer) */}
          <div className=" items-center gap-10 ml-auto font-playfair hidden lg:flex">
            <Link href="/events" className="relative text-lg font-semibold text-[#2B346B] hover:text-gray-500 transition-colors px-4 pt-2">
              Event Liste
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>

            <SignedOut>
              <Link href="/sign-in" className="text-lg font-semibold text-[#2B346B] hover:text-gray-500 transition-colors px-4 pt-2">
                Konto
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="text-lg font-semibold text-[#2B346B] hover:text-gray-500 transition-colors pt-2">
                Min side
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* kun for små skærmer */}
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
