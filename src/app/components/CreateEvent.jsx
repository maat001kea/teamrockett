"use client";

import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";
import KunstListe from "./KunstListe";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTrash, FaCheck } from "react-icons/fa";
import AnimatedButton from "./AnimatedButton";
import Spinner from "./Spinner";
import { uploadImage, deleteImage } from "@/lib/upload"; // ✅ tilføjet

// Validering
const eventSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  locationId: z.string().optional(),
  curator: z.string().optional(),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
});

const CreateEvent = (props) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // ✅ tilføjet
  const [uploadedImageName, setUploadedImageName] = useState(null); // ✅ tilføjet

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

  const onSubmit = async (data) => {
    setLoading(true);

    const dataToSend = {
      ...data,
      artworkIds: artworks.map((a) => a.id),
      image: uploadedImageUrl || null, // ✅ billede med
    };

    const response = await fetch("https://async-exhibit-server-2awc.onrender.com/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      alert("Event blev oprettet!");
      reset();
      setArtworks([]);
      setUploadedImageUrl(null); // ✅ ryd billede
      setUploadedImageName(null);
    } else {
      const errorText = await response.text();
      console.error("Fejl fra server:", errorText);
      alert("Event blev ikke oprettet. Server svarede med fejl.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold">
        <BackButton />
      </div>
      <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow mt-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-8 font-playfair text-my-blue">Opret Nyt Event</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-my-blue">
          <input {...register("title")} placeholder="Titel" className="block w-full p-2 border text-my-blue font-sans" />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

          <div className="flex gap-4">
            <div className="w-1/2">
              <select {...register("date")} className="block w-full p-2 border text-my-blue font-sans">
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
              <select {...register("locationId")} className="block w-full p-2 border text-my-blue font-sans">
                <option value="">Vælg lokation</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <input {...register("curator")} placeholder="Kurator" className="block w-full p-2 border text-my-blue font-sans" />
          <textarea {...register("description")} placeholder="Beskrivelse" className="block w-full p-2 border text-my-blue font-sans" />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}

          {/* Billedupload */}
          <div>
            <label className="block font-sans text-gray-600">Upload billede:</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                  const url = await uploadImage(file);
                  setUploadedImageUrl(url);
                  setUploadedImageName(url.split("/").pop());
                } catch (err) {
                  alert("Fejl ved upload");
                  console.error(err);
                }
              }}
            />
            {uploadedImageUrl && (
              <div className="mt-2">
                <img src={uploadedImageUrl} alt="Uploaded" className="w-32 rounded" />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteImage(uploadedImageName);
                      setUploadedImageUrl(null);
                      setUploadedImageName(null);
                    } catch (err) {
                      alert("Kunne ikke slette billede");
                    }
                  }}
                  className="mt-1 text-sm text-red-600 underline"
                >
                  Slet billede
                </button>
              </div>
            )}
          </div>

          {/* Valgte kunstværker */}
          <div>
            <label className="block font-sans text-gray-600">Valgte kunstværker:</label>
            <div className="flex flex-wrap gap-4">
              {artworks.map((art) => (
                <div key={art.id} className="relative p-2 bg-gray-100 border max-w-[120px] group">
                  <button onClick={() => handleRemoveArtwork(art.id)} className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded transition" title="Fjern">
                    ✕
                  </button>
                  <img src={art.image} alt={art.title} className="w-full h-auto mb-1 rounded" />
                  <p className="text-xs font-medium break-words">{art.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Knapper */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <AnimatedButton type="submit" disabled={loading} className={`${loading ? "cursor-wait opacity-70" : "hover:bg-[#FFA04E]"} flex items-center justify-center gap-2 w-full sm:w-auto`}>
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

            <AnimatedButton type="button" onClick={handleClearAllArtworks} disabled={artworks.length === 0} className={`text-my-orangedark border border-[#D97C2B] hover:bg-[#D97C2B] flex items-center justify-center gap-2 w-full sm:w-auto ${artworks.length === 0 ? "opacity-50 cursor-not-allowed hover:bg-white hover:text-[#D97C2B]" : ""}`}>
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
