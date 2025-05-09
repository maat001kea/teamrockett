"use client";
import React from "react";
import Image from "next/image";
import singleevent from "../assets/singleevent.png";

const EventBilledeBox = () => {
  return (
    <div className="w-full relative aspect-video ">
      {/* <Image src={singleevent} alt="Event" width={500} height={200} className="object-cover  h-auto" /> */}
      // <Image src={singleevent} alt="Event" fill className="object-cover" priority />
    </div>
  );
};

export default EventBilledeBox;
