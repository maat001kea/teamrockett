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

const images = [kunstone, kunsttwo, kunstthree, kunstfour, kunstfive, kunstsix, kunstseven, kunsteight, kunstnine, kunstten];
const EventGalleri = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-30 mb-20 p-7">
        {images.map((img, index) => (
          <div key={index} className="relative w-full aspect-square">
            <Image src={img} alt={`Event ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGalleri;
