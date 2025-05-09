"use client";
import React from "react";
import Image from "next/image";

import kunstone from "../assets/kunstone.png";
import kunsttwo from "../assets/kunsttwo.png";
import kunstthree from "../assets/kunstthree.png";

import kunstfour from "../assets/kunstfour.png";
import kunstfive from "../assets/kunstfive.png";
import kunstsix from "../assets/kunstsix.png";
import kunstseven from "../assets/kunstseven.png";
import kunsteight from "../assets/kunsteight.png";
import kunstnine from "../assets/kunstnine.png";
import kunstten from "../assets/kunstten.png";
const EventGalleri = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 mb-10">
        <Image src={kunstone} alt="Event" className="object-cover width={100} height={100}" priority />
        <Image src={kunsttwo} alt="Event" className="object-cover width={100} height={100}" priority />
        <Image src={kunstthree} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
        <Image src={kunstfour} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
        <Image src={kunstfive} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
        <Image src={kunstsix} alt="Event" className="object-cover width={100} height={100}h-auto" priority />
        <Image src={kunstseven} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
        <Image src={kunsteight} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
        <Image src={kunstnine} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
        <Image src={kunstten} alt="Event" className="object-cover width={100} height={100} h-auto" priority />
      </div>
    </div>
  );
};

export default EventGalleri;
