"use client";
import React from "react";
import kunsttwo from "../assets/kunsttwo.png";
import KunstThumbnail from "./KunstThumbnail";

const KunstBilledeBox = () => {
  const images = [kunsttwo];

  return (
    <div>
      <KunstThumbnail images={images} main={kunsttwo} />
    </div>
  );
};

export default KunstBilledeBox;
