"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllEvents, updateEvent } from "@/lib/api";
import BackButton from "../../components/BackButton";
import KunstListe from "@/app/components/KunstListe.";

// 🧩 Zod schema til validering af formularen
const eventSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  locationId: z.string().optional(),
  curator: z.string().optional(),
});

export default function ChangeEventPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [artworks, setArtworks] = useState([]); // valgte værker
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  React Hook Form setup med Zod validering
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

  // Henter eventdata og tilknyttede kunstværker
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await getAllEvents();
        const found = events.find((e) => e.id === id);
        if (!found) throw new Error("Event ikke fundet.");

        // Sæt formularfelter vha. setValue
        setValue("title", found.title);
        setValue("description", found.description);
        setValue("date", found.date);
        setValue("locationId", found.location?.id || "");
        setValue("curator", found.curator || "");

        const artworkIds = found.artworkIds || [];

        const responses = await Promise.all(
          artworkIds.map((id) =>
            fetch(`https://api.smk.dk/api/v1/art/search/?keys=${id}&object_number=${id}`)
              .then((res) => res.json())
              .then((data) => {
                const item = data.items?.[0];
                return item
                  ? {
                      id: id,
                      title: item.titles?.[0]?.title || id,
                      image: item.image_thumbnail || "",
                    }
                  : { id, title: id, image: "" };
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

  // Gemmer ændringer (valideret via RHF + Zod)
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateEvent(id, {
        ...data,
        artworkIds: artworks.map((a) => a.id),
      });
      router.push("/events");
    } catch (err) {
      setError("Kunne ikke opdatere eventet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Rediger Event</h1>

      {/* Form med React Hook Form + Zod validering */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Titel</label>
          <input {...register("title")} className="w-full p-2 border rounded" />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Beskrivelse</label>
          <textarea {...register("description")} className="w-full p-2 border rounded" />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-semibold">Dato</label>
            <input type="date" {...register("date")} className="w-full p-2 border rounded" />
            {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
          </div>

          <div className="w-1/2">
            <label className="block font-semibold">Lokation ID</label>
            <input {...register("locationId")} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Kurator</label>
          <input {...register("curator")} className="w-full p-2 border rounded" />
        </div>

        {/* Valgte kunstværker */}
        <div className="mb-4">
          <label className="block font-semibold">Valgte kunstværker:</label>
          <div className="flex flex-wrap gap-4">
            {artworks.map((art) => (
              <div key={art.id} className="relative p-2 bg-gray-100 border rounded max-w-[120px] group">
                <button
                  onClick={() => handleRemoveArtwork(art.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded 
                             opacity-100 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 
                             transition"
                  title="Fjern"
                >
                  ✕
                </button>
                <img src={art.image || "/placeholder.jpg"} alt={art.title} className="w-full h-auto mb-1 rounded" />
                <p className="text-xs font-medium break-words">{art.title}</p>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
          Gem ændringer
        </button>
      </form>

      {/* Komponent til valg af kunstværker */}
      <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
    </div>
  );
}
