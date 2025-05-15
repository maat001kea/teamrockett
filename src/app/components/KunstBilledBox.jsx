"use client";
import React from "react";
import dummy from "../assets/dummy.webp"; // fallback image
import KunstThumbnail from "./KunstThumbnail";

const KunstBilledeBox = ({ data }) => {
  const item = data.items[0];

  // console.log("Item data:", item);

  // Try to get the image, otherwise use fallback
  const hasImage = item?.has_image;
  // or .src or similar, depending on your data

  const imageUrl = hasImage ? item.image_thumbnail : dummy;

  return (
    <div>
      <KunstThumbnail images={imageUrl} />
    </div>
  );
};

export default KunstBilledeBox;
