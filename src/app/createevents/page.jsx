"use client";

import React, { useState } from "react";
import BackButton from "../components/BackButton";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    locationId: "",
    curator: "",
    description: "",
    artworkIds: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    setLoading(true);

    const dataToSend = {
      ...formData,
      artworkIds: formData.artworkIds
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    };

    try {
      await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      // Vis spinner i mindst 1.5 sekunder
      await new Promise((res) => setTimeout(res, 1500));

      alert("✅ Event blev oprettet!");
      setFormData({
        title: "",
        date: "",
        locationId: "",
        curator: "",
        description: "",
        artworkIds: "",
      });
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
      <input name="artworkIds" placeholder="Artwork IDs (fx KS1,KS2)" value={formData.artworkIds} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />

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
    </div>
  );
}
