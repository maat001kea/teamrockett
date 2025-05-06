import Image from "next/image";
import { useState, useEffect } from "react";

const ThumbnailImages = ({ images = [], main }) => {
  const [selectedImage, setSelectedImage] = useState(main);

  useEffect(() => {
    if (!main && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [main, images]);

  // Logic to ensure there are always 3 thumbnails if there's only one image and if there r more thumbnail images ,show only 3 images
  // const displayImages = images.length === 1 ? [images[0], images[0], images[0]] : images;
  const displayImages = images.length === 0 ? [main, main, main] : images.length === 1 ? [images[0], images[0], images[0]] : images.slice(0, 3);

  return (
    <div className="">
      {selectedImage && typeof selectedImage === "string" && (
        <div className="relative aspect-square ">
          <Image src={selectedImage} alt="Main product image" fill className=" object-cover" />
          {/* <span className="absolute top-2 left-2 inline-block bg-red-100 text-red-900 text-xs font-semibold px-2 py-1 rounded-full">{`${props.discount} % off`}</span> */}
        </div>
      )}

      {/* Thumbnail container with thumbnail images */}
      <div className="flex gap-4  pb-4">
        {displayImages.map((img, index) =>
          typeof img === "string" ? (
            <div key={index} className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer">
              <Image src={img} alt={`Thumbnail ${index}`} fill className="rounded-lg object-cover hover:opacity-80" onClick={() => setSelectedImage(img)} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default ThumbnailImages;
