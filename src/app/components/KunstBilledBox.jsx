// "use client";
// import React from "react";
// import kunsttwo from "../assets/kunsttwo.png";
// import KunstThumbnail from "./KunstThumbnail";

// const KunstBilledeBox = () => {
//   const images = [kunsttwo];

//   return (
//     <div>
//       <KunstThumbnail images={images} main={kunsttwo} />
//     </div>
//   );
// };

// export default KunstBilledeBox;
"use client";
import React from "react";
import kunsttwo from "../assets/kunsttwo.png"; // fallback image
import KunstThumbnail from "./KunstThumbnail";

const KunstBilledeBox = ({ data }) => {
  const item = data.items[0];

  // console.log("Item data:", item);

  // Try to get the image, otherwise use fallback
  const hasImage = item?.has_image;
  // or .src or similar, depending on your data

  const imageUrl = hasImage ? item.image_thumbnail : kunsttwo;

  return (
    <div>
      <KunstThumbnail images={imageUrl} />
    </div>
  );
};

export default KunstBilledeBox;
