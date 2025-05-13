"use client";

import React, { useState } from "react";
import BackButton from "../components/BackButton";
import KunstListe from "../components/KunstListe.";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    locationId: "",
    curator: "",
    description: "",
  });

  const [artworkIds, setArtworkIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddArtwork = (id) => {
    if (!artworkIds.includes(id)) {
      setArtworkIds([...artworkIds, id]);
    }
  };

  const handleRemoveArtwork = (id) => {
    setArtworkIds(artworkIds.filter((aid) => aid !== id));
  };

  const handleClearAllArtworks = () => {
    setArtworkIds([]);
  };

  const handleCreate = async () => {
    setLoading(true);

    const dataToSend = {
      ...formData,
      artworkIds,
    };

    try {
      await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      await new Promise((res) => setTimeout(res, 1500));
      alert("✅ Event blev oprettet!");

      setFormData({
        title: "",
        date: "",
        locationId: "",
        curator: "",
        description: "",
      });
      setArtworkIds([]);
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

      <input name="title" placeholder="Titel" value={formData.title} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <input name="date" placeholder="Dato (fx 2025-05-15)" value={formData.date} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <input name="locationId" placeholder="Lokation ID" value={formData.locationId} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <input name="curator" placeholder="Kurator" value={formData.curator} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <textarea name="description" placeholder="Beskrivelse" value={formData.description} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />

      {/* Valgte artworks vises her */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Valgte kunstværk IDs:</label>
        <div className="flex flex-wrap gap-2">
          {artworkIds.map((id) => (
            <span key={id} className="bg-gray-200 text-sm px-2 py-1 rounded">
              {id}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={handleCreate} disabled={loading} className={`px-4 py-2 flex items-center justify-center gap-2 rounded text-white transition ${loading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-800"}`}>
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

        <button onClick={handleClearAllArtworks} disabled={artworkIds.length === 0} className={`px-4 py-2 rounded text-white transition ${artworkIds.length === 0 ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
          Slet alle artworks
        </button>
      </div>

      <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworkIds} />
    </div>
  );
}
