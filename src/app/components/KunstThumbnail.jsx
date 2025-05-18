"use client";
import React, { useState, useEffect } from "react";
import dummy from "../assets/dummy.webp";

const KunstThumbnail = ({ images }) => {
  const fallbackImage = dummy.src;
  const [mainLoading, setMainLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(images || fallbackImage);
  const [validatedThumbnails, setValidatedThumbnails] = useState([]);

  useEffect(() => {
    const updateImageState = async () => {
      if (images.length > 0) {
        // Tjek hvis img er valid
        const isValidImage = await checkImageValidity(images);
        if (isValidImage) {
          setSelectedImage(images);
        } else {
          setSelectedImage(fallbackImage);
        }
      } else {
        setSelectedImage(fallbackImage);
      }
      setMainLoading(false); // stop loading efter img kommer frem
    };

    updateImageState();
  }, [images]);

  // Function for at tjekke img url er valid
  const checkImageValidity = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  //Atid vis tre thumbnails billeder
  const displayImages = images.length > 0 ? [images, images, images] : [fallbackImage, fallbackImage, fallbackImage];

  return (
    <div className="">
      {/* hoved Image */}
      <div className="relative aspect-square mb-4  flex items-center justify-center">
        {mainLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
            <span className="text-gray-600 text-sm">Loading...</span>
          </div>
        )}
        <img src={selectedImage} alt="Main image" className="w-full h-full object-cover" />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 pb-4 ">
        {displayImages.map((img, index) => (
          <div key={index} className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer" onClick={() => setSelectedImage(img || fallbackImage)}>
            <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover hover:opacity-80" onError={(e) => (e.target.src = fallbackImage)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KunstThumbnail;
