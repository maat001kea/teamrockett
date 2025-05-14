"use client";

import { useState } from "react";
import { deleteEvent } from "@/lib/api";

export default function DeleteButton({ id }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på, at du vil slette?");
    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteEvent(id);

      // Vis spinner i mindst 1.5 sekunder
      await new Promise((res) => setTimeout(res, 100));

      window.location.reload(); // eller brug callback fx onDelete(id)
    } catch (e) {
      alert("❌ Kunne ikke slette event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className={`px-4 py-2 flex items-center justify-center gap-2 rounded text-white transition ${loading ? "bg-red-400 cursor-wait" : "bg-red-600 hover:bg-red-800"}`}>
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z" />
          </svg>
          Sletter...
        </>
      ) : (
        "Slet"
      )}
    </button>
  );
}
