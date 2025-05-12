"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllEvents, updateEvent } from "@/lib/api";

export default function ChangeEventPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    locationId: "",
    curator: "",
    artworkIds: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          artworkIds: found.artworkIds?.join(",") || "",
        });
      } catch (err) {
        setError(err.message);
      }
    };

    loadEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateEvent(id, {
        ...form,
        artworkIds: form.artworkIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
      });

      // Vis spinner i mindst 1.5 sek
      await new Promise((res) => setTimeout(res, 1500));

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
      <h1 className="text-2xl font-bold mb-4">Rediger Event</h1>

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

        <div>
          <label className="block font-semibold">Artwork IDs (komma-separeret)</label>
          <input type="text" name="artworkIds" value={form.artworkIds} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" disabled={loading} className={`px-4 py-2 flex items-center justify-center gap-2 rounded text-white transition ${loading ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700"}`}>
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z" />
              </svg>
              Gemmer...
            </>
          ) : (
            "Gem ændringer"
          )}
        </button>
      </form>
    </div>
  );
}
