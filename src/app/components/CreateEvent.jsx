"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "@/app/components/BackButton";
import KunstListe from "@/app/components/KunstListe";
import AnimatedButton from "@/app/components/AnimatedButton";
import Spinner from "@/app/components/Spinner";
import ImageUploader from "@/app/components/ImageUploader";
import { supabase } from "@/lib/supabaseClient";
import { FaTrash, FaCheck } from "react-icons/fa";

const eventSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  locationId: z.string().optional(),
  curator: z.string().optional(),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
});

const CreateEvent = (props) => {
  const [artworks, setArtworks] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    setAvailableDates(props.date || []);
    setLocations(props.locations || []);
  }, [props.date, props.locations]);

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

  const handleAddArtwork = (artwork) => {
    if (!artworks.find((a) => a.id === artwork.id)) {
      setArtworks([...artworks, artwork]);
    }
  };

  const handleRemoveArtwork = (id) => {
    setArtworks(artworks.filter((a) => a.id !== id));
  };

  const handleClearAllArtworks = () => {
    setArtworks([]);
  };

  const handleDeleteImage = async () => {
    if (!imagePath) return;
    const { error } = await supabase.storage.from("events").remove([imagePath]);
    if (error) {
      alert("Kunne ikke slette billedet.");
      return;
    }
    setImageUrl(null);
    setImagePath(null);
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      alert("Du skal uploade et billede.");
      return;
    }

    setLoading(true);
    const dataToSend = {
      ...data,
      artworkIds: artworks.map((a) => a.id),
      imageUrl,
      imagePath, // ✅ Nu tilføjet her
    };

    try {
      const response = await fetch("https://async-exhibit-server-2awc.onrender.com/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Ukendt fejl ved oprettelse");
      }

      alert("Event blev oprettet!");
      reset();
      setArtworks([]);
      setImageUrl(null);
      setImagePath(null);
    } catch (err) {
      console.error("Fejl:", err.message);
      alert("Kunne ikke oprette event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold">
        <BackButton />
      </div>

      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-8 font-playfair text-my-blue">Opret Nyt Event</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-my-blue">
          <input {...register("title")} placeholder="Titel" className="block w-full p-2 border" />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

          <div className="flex gap-4">
            <div className="w-1/2">
              <select {...register("date")} className="block w-full p-2 border">
                <option value="">Vælg dato</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
              {errors.date && <p className="text-red-600 text-sm">{errors.date.message}</p>}
            </div>

            <div className="w-1/2">
              <select {...register("locationId")} className="block w-full p-2 border">
                <option value="">Vælg lokation</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input {...register("curator")} placeholder="Kurator" className="block w-full p-2 border" />
          <textarea {...register("description")} placeholder="Beskrivelse" className="block w-full p-2 border" />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

          {/* Billedupload + visning */}
          <div>
            <label className="block font-sans text-gray-600 mb-1">Upload billede:</label>
            <ImageUploader
              hideInput={!!imageUrl}
              onFileSelect={(url, path) => {
                setImageUrl(url);
                setImagePath(path);
              }}
            />
            {imageUrl && (
              <div className="relative inline-block">
                <img src={imageUrl} alt="Preview" className="mt-2 max-w-xs border rounded" />
                <button onClick={handleDeleteImage} type="button" className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs" title="Slet billede">
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Kunstværker */}
          <div>
            <label className="block font-sans text-gray-600">Valgte kunstværker:</label>
            <div className="flex flex-wrap gap-4">
              {artworks.map((art) => (
                <div key={art.id} className="relative p-2 bg-gray-100 border max-w-[120px] group">
                  <button onClick={() => handleRemoveArtwork(art.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded" title="Fjern">
                    ✕
                  </button>
                  <img src={art.image} alt={art.title} className="w-full h-auto mb-1 rounded" />
                  <p className="text-xs font-medium">{art.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <AnimatedButton type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Spinner /> Opretter...
                </>
              ) : (
                <>
                  <FaCheck /> Opret Event
                </>
              )}
            </AnimatedButton>

            <AnimatedButton type="button" onClick={handleClearAllArtworks} disabled={artworks.length === 0} className={`w-full sm:w-auto ${artworks.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
              <FaTrash /> Slet alle værker
            </AnimatedButton>
          </div>
        </form>
      </div>

      <div className="w-full px-6">
        <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
      </div>
    </div>
  );
};

export default CreateEvent;
