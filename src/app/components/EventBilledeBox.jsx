"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import singleevent from "../assets/singleevent.webp";

const EventBilledeBox = ({ imageUrl }) => {
  const fallbackImage = singleevent.src;
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImage); // til imageurl ellers vis fallback
  const [loading, setLoading] = useState(true); // håndtere loading state

  useEffect(() => {
    setLoading(true); // Altid setloading state default true
    const validateImage = (url) => {
      //det er en funktion som returnere en promise og lave en url for at vise billed hvis findes så true ellers false og vis fallback
      return new Promise((resolve) => {
        const testImg = new window.Image();
        testImg.src = url;
        testImg.onload = () => resolve(true); //billed bliver inlæses korrekt
        testImg.onerror = () => resolve(false); //billed bliver ikke indlæses
      });
    };

    const checkImage = async () => {
      if (imageUrl) {
        const isValid = await validateImage(imageUrl); //hvis image url er vis den
        setImgSrc(isValid ? imageUrl : fallbackImage); //hvis image url er ikke valid så vis fallback
      } else {
        setImgSrc(fallbackImage);
      }
    };

    checkImage();
  }, [imageUrl]);

  return (
    <div className="w-full relative aspect-video lg:aspect-[4/3] lg:h-[500px]">
      {/* Loader  */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
          <span className="text-gray-600 text-sm">Loading...</span>
        </div>
      )}

      <Image
        src={imgSrc}
        alt="Event"
        fill
        priority={true}
        className="object-cover px-4 lg:px-0 relative z-0"
        onError={() => {
          setImgSrc(fallbackImage);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default EventBilledeBox;
