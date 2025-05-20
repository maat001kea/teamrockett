"use client";

import { useState } from "react";
import { deleteEvent } from "@/lib/api";
import { FaTrash } from "react-icons/fa";

export default function DeleteButton({ id }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på, at du vil slette?");
    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteEvent(id);
      await new Promise((res) => setTimeout(res, 100)); // Optional delay
      window.location.reload(); // Or call a parent function like onDelete(id)
    } catch (e) {
      alert(" Kunne ikke slette event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className={`transition ${loading ? "cursor-wait" : "hover:text-[#FFA04E] text-my-orangedark"}`} style={{ backgroundColor: "transparent", padding: 0 }}>
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-my-orangedark" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z" />
        </svg>
      ) : (
        <FaTrash className="h-5 w-5" />
      )}
    </button>
  );
}
