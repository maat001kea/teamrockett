"use client";

import React, { useState } from "react";
import BackButton from "../components/BackButton";
import KunstListe from "../components/KunstListe.";

export default function EventForm() {
  // Gemmer inputfelterne til eventet
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    locationId: "",
    curator: "",
    description: "",
  });

  // Gemmer de valgte kunstværker (objekter med id, titel og billede)
  const [artworks, setArtworks] = useState([]);

  const [loading, setLoading] = useState(false); // Vis "Opretter..." når der sendes data

  // Opdaterer inputfelterne i formularen
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Tilføjer et kunstværk (hvis det ikke allerede er valgt)
  const handleAddArtwork = (artwork) => {
    if (!artworks.find((a) => a.id === artwork.id)) {
      setArtworks([...artworks, artwork]);
    }
  };

  // Fjerner et kunstværk fra listen
  const handleRemoveArtwork = (id) => {
    setArtworks(artworks.filter((a) => a.id !== id));
  };

  // Fjerner alle valgte kunstværker
  const handleClearAllArtworks = () => {
    setArtworks([]);
  };

  // Opretter eventet og sender data til backend
  const handleCreate = async () => {
    setLoading(true);

    const dataToSend = {
      ...formData,
      artworks, // Sender valgte kunstværker med (inkl. id, title, image)
    };

    try {
      await fetch("http://localhost:8080/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      await new Promise((res) => setTimeout(res, 100)); // Kunstig ventetid
      alert("✅ Event blev oprettet!");

      // Nulstil formularen og værkerne
      setFormData({
        title: "",
        date: "",
        locationId: "",
        curator: "",
        description: "",
      });
      setArtworks([]);
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
      <input name="title" placeholder="Titel" value={formData.title} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <input name="date" placeholder="Dato (fx 2025-05-15)" value={formData.date} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <input name="locationId" placeholder="Lokation ID" value={formData.locationId} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <input name="curator" placeholder="Kurator" value={formData.curator} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />
      <textarea name="description" placeholder="Beskrivelse" value={formData.description} onChange={handleChange} className="block mb-3 w-full p-2 border rounded" />

      {/* Vis valgte kunstværker med titel og billede */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Valgte kunstværker:</label>
        <div className="flex flex-wrap gap-4">
          {artworks.map((art) => (
            <div key={art.id} className="relative p-2 bg-gray-100 border rounded max-w-[120px] group">
              {/* ❌ Fjern-knap – vises ved hover (desktop), altid synlig (mobil) */}
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

      {/* Knapper til opret og slet alt */}
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

        <button onClick={handleClearAllArtworks} disabled={artworks.length === 0} className={`px-4 py-2 rounded text-white transition ${artworks.length === 0 ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
          Slet alle værker
        </button>
      </div>

      {/* Komponent til at vælge værker fra SMK */}
      <KunstListe
        onAddArtwork={handleAddArtwork}
        onRemoveArtwork={handleRemoveArtwork}
        selectedArtworks={artworks.map((a) => a.id)} // Bruges til at markere valgte
      />
    </div>
  );
}
