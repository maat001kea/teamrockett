"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllEvents, updateEvent } from "@/lib/api";
import { supabase } from "../../../lib/supabaseClient";
import BackButton from "../../components/BackButton";
import KunstListe from "@/app/components/KunstListe";
import AnimatedButton from "../../components/AnimatedButton";

const eventSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  locationId: z.string().optional(),
  curator: z.string().optional(),
});

export default function ChangeEventPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [artworks, setArtworks] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      locationId: "",
      curator: "",
    },
  });

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await getAllEvents();
        const found = events.find((e) => e.id === id);
        if (!found) throw new Error("Event ikke fundet.");

        setValue("title", found.title);
        setValue("description", found.description);
        setValue("date", found.date);
        setValue("locationId", found.location?.id || "");
        setValue("curator", found.curator || "");

        setImageUrl(found.imageUrl || "");
        setImagePath(found.imagePath || "");

        const artworkIds = found.artworkIds || [];
        const responses = await Promise.all(
          artworkIds.map((id) =>
            fetch(`https://api.smk.dk/api/v1/art/search/?keys=${id}&object_number=${id}`)
              .then((res) => res.json())
              .then((data) => {
                const item = data.items?.[0];
                return item ? { id, title: item.titles?.[0]?.title || id, image: item.image_thumbnail || "" } : { id, title: id, image: "" };
              })
          )
        );
        setArtworks(responses);
      } catch (err) {
        setError(err.message);
      }
    };

    loadEvent();
  }, [id, setValue]);

  const handleAddArtwork = (artwork) => {
    if (!artworks.find((a) => a.id === artwork.id)) {
      setArtworks([...artworks, artwork]);
    }
  };

  const handleRemoveArtwork = (id) => {
    setArtworks(artworks.filter((a) => a.id !== id));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    // 🧹 Slet tidligere billede hvis det eksisterer
    if (imagePath) {
      const { error: deleteError } = await supabase.storage.from("events").remove([imagePath]);
      if (deleteError) {
        console.warn("Kunne ikke slette tidligere billede:", deleteError.message);
      }
    }

    const ext = file.name.split(".").pop();
    const name = `${Date.now()}.${ext}`;
    const path = `events/${name}`;

    const { error } = await supabase.storage.from("events").upload(path, file);
    if (error) {
      alert("Fejl ved upload:", error.message);
      return;
    }

    const { data } = supabase.storage.from("events").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setImagePath(path);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateEvent(id, {
        ...data,
        imageUrl,
        imagePath,
        artworkIds: artworks.map((a) => a.id),
      });
      alert("Event opdateret!");
      router.push("/events");
    } catch (err) {
      setError("Kunne ikke opdatere eventet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold">
        <BackButton />
      </div>

      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-8 font-playfair text-my-blue">Rediger Event</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("title")} placeholder="Titel" className="block w-full p-2 border" />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

          <textarea {...register("description")} placeholder="Beskrivelse" className="block w-full p-2 border" />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

          <div className="flex gap-4">
            <div className="w-1/2">
              <input type="date" {...register("date")} className="w-full p-2 border" />
              {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
            </div>
            <div className="w-1/2">
              <input {...register("locationId")} placeholder="Lokation ID" className="w-full p-2 border" />
            </div>
          </div>

          <input {...register("curator")} placeholder="Kurator" className="block w-full p-2 border" />

          <div className="mb-4">
            <label className="block mb-1 text-sm">Event billede:</label>
            {imageUrl && (
              <div className="relative inline-block">
                <img src={imageUrl} alt="Valgt billede" className="mt-2 max-w-xs rounded border shadow cursor-pointer" onClick={() => fileInputRef.current?.click()} />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" ref={fileInputRef} />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Valgte kunstværker:</label>
            <div className="flex flex-wrap gap-4">
              {artworks.map((art) => (
                <div key={art.id} className="relative p-2 bg-gray-100 border max-w-[120px] group">
                  <button onClick={() => handleRemoveArtwork(art.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded" title="Fjern">
                    ✕
                  </button>
                  <img src={art.image || "/placeholder.jpg"} alt={art.title} className="w-full h-auto mb-1" />
                  <p className="text-xs font-medium break-words">{art.title}</p>
                </div>
              ))}
            </div>
          </div>

          <AnimatedButton type="submit" disabled={loading}>
            Gem ændringer
          </AnimatedButton>
        </form>
      </div>

      <div className="w-full px-6">
        <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
      </div>
    </>
  );
}
