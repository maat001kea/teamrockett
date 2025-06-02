"use client";
import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import dummy from "../assets/dummy.webp";
import lightgray from "../assets/lightgray.svg";

const KunstThumbnail = ({ images }) => {
  const fallbackImage = dummy.src;
  const [mainLoading, setMainLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(fallbackImage);

  useEffect(() => {
    const updateImageState = async () => {
      if (images && images.length > 0) {
        const isValidImage = await checkImageValidity(images);
        setSelectedImage(isValidImage ? images : fallbackImage);
      } else {
        setSelectedImage(fallbackImage);
      }
    };

    updateImageState();
  }, [images]);

  const checkImageValidity = (url) => {
    return new Promise((resolve) => {
      const img = new Image(); // or just `new Image()` if no conflict
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  return (
    <div className="relative aspect-square w-full max-w-[600px] mx-auto">
      {mainLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
          <span className="text-gray-600 text-sm">Loading...</span>
        </div>
      )}

      <NextImage
        src={selectedImage}
        alt="Main image"
        fill
        priority={true}
        className="object-cover z-0"
        onLoad={() => setMainLoading(false)}
        onError={() => {
          setSelectedImage(fallbackImage);
          setMainLoading(false);
        }}
      />

      <NextImage src={lightgray} alt="Museum Frame" fill className="absolute inset-0 z-20 pointer-events-none scale-[1.22] max-[400px]:hidden" style={{ transformOrigin: "center" }} />
    </div>
  );
};

export default KunstThumbnail;
