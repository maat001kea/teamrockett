"use client";

import { useRef } from "react";
import BucketGallery from "../components/BucketGallery";
import DeleteButton from "../components/Deletebutton";

export default function Dashboard() {
  const bucketGalleryRef = useRef(null);

  const handleDeleteFromGallery = (filename) => {
    if (bucketGalleryRef.current) {
      bucketGalleryRef.current.deleteFromGallery(filename);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <BucketGallery ref={bucketGalleryRef} />
    </div>
  );
}
