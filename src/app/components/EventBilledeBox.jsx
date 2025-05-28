"use client";
import React, { useState } from "react";
import Image from "next/image";
import singleevent from "../assets/singleevent.png";

const EventBilledeBox = ({ imageUrl }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || singleevent.src);

  return (
    <div className="w-full relative aspect-video lg:aspect-[4/3] lg:h-[500px]">
      <Image src={imgSrc} alt="Event" fill className="object-cover px-4 lg:px-0" onError={() => setImgSrc(singleevent.src)} />
    </div>
  );
};

export default EventBilledeBox;
