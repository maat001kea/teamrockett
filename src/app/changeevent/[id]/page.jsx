"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllEvents, updateEvent } from "@/lib/api";
import BackButton from "../../components/BackButton";
import KunstListe from "@/app/components/KunstListe";
import AnimatedButton from "../../components/AnimatedButton";

// 🧩 Zod schema: definerer krav til hvert felt i formularen
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

  const [artworks, setArtworks] = useState([]); // Valgte kunstværker gemmes her
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // React Hook Form setup med Zod validering
  const {
    register, // Binder inputfelter til RHF
    handleSubmit, // Håndterer submit + validering
    setValue, // Bruges til at pre-utfylde felter
    formState: { errors }, // Indeholder Zod-valideringsfejl
  } = useForm({
    resolver: zodResolver(eventSchema), // Bruger Zod til at validere formular
    defaultValues: {
      title: "",
      description: "",
      date: "",
      locationId: "",
      curator: "",
    },
  });

  // Henter event-data og SMK-kunstværker ved sideindlæsning
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await getAllEvents();
        const found = events.find((e) => e.id === id);
        if (!found) throw new Error("Event ikke fundet.");

        // Udfylder formularfelter
        setValue("title", found.title);
        setValue("description", found.description);
        setValue("date", found.date);
        setValue("locationId", found.location?.id || "");
        setValue("curator", found.curator || "");

        // Finder SMK-data til hvert værk-id
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

  // Når formularen sendes og valideres
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateEvent(id, {
        ...data,
        artworkIds: artworks.map((a) => a.id), // Sender kun ID’er til backend
      });
      alert(" Event opdateret!");
      router.push("/events");
    } catch (err) {
      setError("Kunne ikke opdatere eventet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <>
      <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold">
        <BackButton />
      </div>
      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow mt-6">
        {/* <BackButton /> */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-8 font-playfair text-my-blue">Redigere Event</h2>
        </div>

        {/* Form med RHF og Zod */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold font-sans text-my-blue">Titel</label>
            <input {...register("title")} className="block w-full p-2 border text-my-blue font-sans" />
            {errors.title && <p className="text-red-600 text-sm font-sans">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-semibold text-my-blue font-sans">Beskrivelse</label>
            <textarea {...register("description")} className="w-full p-2 border text-my-blue font-sans" />
            {errors.description && <p className="text-red-600 text-sm font-sans">{errors.description.message}</p>}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-semibold text-my-blue font-sans">Dato</label>
              <input type="date" {...register("date")} className="w-full p-2 border text-my-blue font-sans" />
              {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="block font-semibold text-my-blue font-sans">Lokation ID</label>
              <input {...register("locationId")} className="w-full p-2 border text-my-blue font-sans" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-my-blue font-sans">Kurator</label>
            <input {...register("curator")} className="w-full p-2 border text-my-blue font-sans" />
          </div>

          {/* Viser valgte værker */}
          <div className="mb-4">
            <label className="block font-sans text-gray-600 mb-5">Valgte kunstværker:</label>
            <div className="flex flex-wrap gap-4">
              {artworks.map((art) => (
                <div key={art.id} className="relative p-2 bg-gray-100 border max-w-[120px] group font-sans">
                  <button onClick={() => handleRemoveArtwork(art.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded opacity-100 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition" title="Fjern">
                    ✕
                  </button>
                  <img src={art.image || "/placeholder.jpg"} alt={art.title} className="w-full h-auto mb-1" />
                  <p className="text-xs font-medium break-words font-sans">{art.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white  hover:bg-green-700 disabled:opacity-50 font-sans">
            Gem ændringer
          </button> */}
          <AnimatedButton type="submit" disabled={loading}>
            Gem ændringer
          </AnimatedButton>
        </form>

        {/* Kunstværk-komponent */}
      </div>
      <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
    </>
  );
}
