"use client";

import React, { useState } from "react";
import BackButton from "../components/BackButton";
import KunstListe from "../components/KunstListe.";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🧩 Zod schema til validering af formularfelter
const eventSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  locationId: z.string().optional(),
  curator: z.string().optional(),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
});

export default function EventForm() {
  const [artworks, setArtworks] = useState([]); // valgte kunstværker
  const [loading, setLoading] = useState(false);

  // ⚙️ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      date: "",
      locationId: "",
      curator: "",
      description: "",
    },
  });

  // Tilføjer et kunstværk
  const handleAddArtwork = (artwork) => {
    if (!artworks.find((a) => a.id === artwork.id)) {
      setArtworks([...artworks, artwork]);
    }
  };

  // Fjerner et værk
  const handleRemoveArtwork = (id) => {
    setArtworks(artworks.filter((a) => a.id !== id));
  };

  // Tømmer hele listen
  const handleClearAllArtworks = () => {
    setArtworks([]);
  };

  // Opretter event via POST request
  const onSubmit = async (data) => {
    setLoading(true);

    const dataToSend = {
      ...data,
      artworkIds: artworks.map((a) => a.id),
    };

    try {
      console.log("DATA TIL BACKEND:", dataToSend);

      await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      await new Promise((res) => setTimeout(res, 100));
      alert("✅ Event blev oprettet!");

      reset(); // nulstil formularen
      setArtworks([]); // nulstil værkerne
    } catch (err) {
      console.error("❌ Fejl ved oprettelse:", err);
      alert("Der opstod en fejl ved oprettelsen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <BackButton />
      <h2 className="text-xl font-bold mb-4">Opret nyt event</h2>

      {/* Formularfelter */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Titel" className="block w-full p-2 border rounded" />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

        <input type="date" {...register("date")} placeholder="Dato" className="block w-full p-2 border rounded" />
        {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}

        <input {...register("locationId")} placeholder="Lokation ID" className="block w-full p-2 border rounded" />

        <input {...register("curator")} placeholder="Kurator" className="block w-full p-2 border rounded" />

        <textarea {...register("description")} placeholder="Beskrivelse" className="block w-full p-2 border rounded" />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

        {/* Vis valgte kunstværker */}
        <div>
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

                <img src={art.image} alt={art.title} className="w-full h-auto mb-1 rounded" />
                <p className="text-xs font-medium break-words">{art.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Knapper */}
        <div className="flex gap-4">
          <button type="submit" disabled={loading} className={`px-4 py-2 flex items-center justify-center gap-2 rounded text-white transition ${loading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-800"}`}>
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z" />
                </svg>
                Opretter...
              </>
            ) : (
              "Opret Event"
            )}
          </button>

          <button type="button" onClick={handleClearAllArtworks} disabled={artworks.length === 0} className={`px-4 py-2 rounded text-white transition ${artworks.length === 0 ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
            Slet alle værker
          </button>
        </div>
      </form>

      {/* SMK værk-komponent */}
      <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
    </div>
  );
}
