"use client";
import Image from "next/image";
import React from "react";
import image from "../assets/heropic.png";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-start px-8 py-16 space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold font-playfair leading-tight text-[#2B346B]">
          STATENS <span className="text-[#2B346B]">MUSEUM</span> FOR KUNST
        </h1>
        <h2 className="text-lg sm:text-xl font-noto text-[#2B346B]">Vi bevarer og formidler historien gennem kunst og kultur</h2>
        <button className="bg-[#D97C2B] hover:bg-[#FFA04E] text-white px-6 py-2 rounded-md transition font-noto font-regular">See events</button>
      </div>

      <div className="relative w-full h-[400px] md:h-auto">
        <Image src={image} alt="Hero" fill className="object-contain md:object-cover" priority />
      </div>
    </section>
  );
};

export default HeroSection;
