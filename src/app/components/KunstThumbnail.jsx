"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const KunstThumbnail = ({ images = [], main }) => {
  const [selectedImage, setSelectedImage] = useState(main);

  useEffect(() => {
    if (!main && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [main, images]);

  // Altid vis 3 billeder
  // Hvis der ikke er billeder, vis hovedbilledet 3 gange
  // Hvis der kun er ét billede, vis det 3 gange
  // Ellers vis de første tre billeder
  const displayImages = images.length === 0 ? [main, main, main] : images.length === 1 ? [images[0], images[0], images[0]] : images.slice(0, 3);

  return (
    <div className="bg-myorangedark">
      {/* hoved img */}
      <div className="relative aspect-square mb-4 bg-my-orangedark">
        <Image src={selectedImage} alt="Main image" fill className="object-cover" priority />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 pb-4  bg-my-orangedark">
        {displayImages.map((img, index) => (
          <div key={index} className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer bg-my-orangedark" onClick={() => setSelectedImage(img)}>
            <Image src={img} alt={`Thumbnail ${index}`} fill className=" object-cover hover:opacity-80 " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KunstThumbnail;
