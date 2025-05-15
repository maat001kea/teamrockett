// src/lib/fetchArtworks.js

import dummy from "../app/assets/dummy.webp";
// import Link from "next/link";

export const fetchArtworks = async (objectNumbers) => {
  const imagePromises = objectNumbers.map(async (id) => {
    const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`);
    const data = await response.json();
    const item = data.items?.[0];
    if (!item) return null;

    return {
      image: item.has_image ? item.image_thumbnail : dummy.src,
      objectNumber: item.object_number,
    };
  });

  const results = await Promise.all(imagePromises);
  return results.filter(Boolean);
};
// export default fetchArtworks;
