"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { deleteImage } from "@/lib/upload";

export default function BucketGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    const { data, error } = await supabase.storage.from("artworks").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      console.error("Fejl ved hentning:", error);
      return;
    }

    const imageObjects = data.map((file) => ({
      name: file.name,
      url: supabase.storage.from("artworks").getPublicUrl(file.name).data.publicUrl,
    }));

    setImages(imageObjects);
  };

  const handleDelete = async (filename) => {
    const confirmed = window.confirm(`Slet billede: ${filename}?`);
    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteImage(filename);
      setImages((prev) => prev.filter((img) => img.name !== filename));
    } catch (err) {
      console.error("Fejl ved sletning:", err);
      alert("Kunne ikke slette billedet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Billeder i artworks-bucket</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map(({ name, url }) => (
          <div key={name} className="relative group">
            <img src={url} alt={name} className="rounded shadow w-full" />
            <button onClick={() => handleDelete(name)} disabled={loading} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Slet
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
