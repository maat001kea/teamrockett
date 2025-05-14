"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllEvents, updateEvent } from "@/lib/api";
import BackButton from "../../components/BackButton";
import KunstListe from "@/app/components/KunstListe."; // sørg for at stien er korrekt

export default function ChangeEventPage({ params }) {
  const { id } = params;
  const router = useRouter();

  // Formularfelter
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    locationId: "",
    curator: "",
  });

  // Valgte kunstværker [{ id, title, image }]
  const [artworks, setArtworks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hent eksisterende event og SMK-data
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const events = await getAllEvents();
        const found = events.find((e) => e.id === id);
        if (!found) throw new Error("Event ikke fundet.");

        setForm({
          title: found.title,
          description: found.description,
          date: found.date,
          locationId: found.location?.id || "",
          curator: found.curator || "",
        });

        const artworkIds = found.artworkIds || [];

        // Hent værkinfo fra SMK for hvert ID
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
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddArtwork = (artwork) => {
    if (!artworks.find((a) => a.id === artwork.id)) {
      setArtworks([...artworks, artwork]);
    }
  };

  const handleRemoveArtwork = (id) => {
    setArtworks(artworks.filter((a) => a.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEvent(id, {
        ...form,
        artworkIds: artworks.map((a) => a.id), // kun ID'er sendes
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

      {/* Formular til eventfelter */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Titel</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block font-semibold">Beskrivelse</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-semibold">Dato</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>

          <div className="w-1/2">
            <label className="block font-semibold">Lokation ID</label>
            <input type="text" name="locationId" value={form.locationId} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Kurator</label>
          <input type="text" name="curator" value={form.curator} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Vis valgte værker med title + image */}
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

      {/* Vælg værker fra SMK */}
      <KunstListe onAddArtwork={handleAddArtwork} onRemoveArtwork={handleRemoveArtwork} selectedArtworks={artworks.map((a) => a.id)} />
    </div>
  );
}
