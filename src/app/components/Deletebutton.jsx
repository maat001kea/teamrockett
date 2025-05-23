"use client";

import { useState } from "react";
import { deleteEvent } from "@/lib/api"; // denne kalder stadig din backend
import { FaTrash } from "react-icons/fa";

export default function DeleteButton({ id, imagePath }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på, at du vil slette?");
    if (!confirmed) return;

    setLoading(true);

    try {
      console.log("🗑️ Sletter event med id:", id);
      await deleteEvent(id); // sletter event fra din backend

      // 🔥 Slet billede via backend (ikke direkte via supabase client)
      if (imagePath) {
        console.log("📂 Sletter billede via backend:", imagePath);

        const response = await fetch("http://localhost:3000/events/delete-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imagePath }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn("⚠️ Fejl ved sletning af billede:", errorText);
        } else {
          console.log("✅ Billede slettet via backend");
        }
      } else {
        console.log("ℹ️ Intet billede at slette.");
      }

      await new Promise((res) => setTimeout(res, 100));
      window.location.reload();
    } catch (e) {
      alert("Kunne ikke slette event.");
      console.error("🚨 Fejl ved sletning:", e);
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
