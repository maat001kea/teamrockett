"use client";
import React from "react";
import dummy from "../assets/dummy.webp";
import KunstThumbnail from "./KunstThumbnail";

const KunstBilledeBox = ({ data }) => {
  const item = data.items[0];

  // console.log("Item data:", item);

  const hasImage = item?.has_image;

  const imageUrl = hasImage ? item.image_thumbnail : dummy.src;

  return (
    <div className="flex-grow  h-full">
      <KunstThumbnail images={imageUrl} />
    </div>
  );
};

export default KunstBilledeBox;
