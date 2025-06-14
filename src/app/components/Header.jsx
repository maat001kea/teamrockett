"use client";

import React from "react";
import Link from "next/link";
import logoImg from "@/app/assets/bluelogo.png";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import BurgerMenu from "./BurgerMenu";
import NavLink from "./NavLink";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background pt-5 pb-3" style={{ gridColumn: "full-bleed" }}>
      <div className="grid grid-cols-subgrid" style={{ gridColumn: "content" }}>
        <div className="flex justify-between items-center py-4 px-2 w-full ">
          {/* Logo */}
          <Link href="/" className="flex items-center whitespace-nowrap focus:outline-none">
            <motion.div
              whileTap={{
                scale: 1.2,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <Image src={logoImg} alt="Logo" width={100} height={100} className="mr-2" />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="items-center gap-10 ml-auto font-playfair hidden lg:flex">
            <NavLink href="/events">Event Liste</NavLink>

            <SignedOut>
              <NavLink href="/sign-in">Konto</NavLink>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu */}
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
