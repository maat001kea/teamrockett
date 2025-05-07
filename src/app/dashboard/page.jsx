"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function DashboardPage() {
  const { getToken } = useAuth(); // ✅ Clerk token client-side

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken({ template: "default" }); // 🔑 hent token

      const res = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: "Dette er en test event",
          date,
          location,
          artworks: [],
        }),
      });

      const data = await res.json();
      alert("Event oprettet: " + data.title);
    } catch (err) {
      console.error(err);
      alert("Fejl: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" className="border p-2 w-full" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lokation" className="border p-2 w-full" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        Opret event
      </button>
    </form>
  );
}
