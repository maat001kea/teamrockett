"use client";

import React, { useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    locationId: "",
    curator: "",
    description: "",
    artworkIds: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    const dataToSend = {
      ...formData,
      artworkIds: formData.artworkIds.split(",").map((id) => id.trim()),
    };

    fetch("http://localhost:8080/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Event blev oprettet!");
        setFormData({
          title: "",
          date: "",
          locationId: "",
          curator: "",
          description: "",
          artworkIds: "",
        });
      })
      .catch((err) => console.error("Fejl ved oprettelse:", err));
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Opret nyt event</h2>

      <input name="title" placeholder="Titel" value={formData.title} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="date" placeholder="Dato (fx 2025-05-15)" value={formData.date} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="locationId" placeholder="Lokation ID" value={formData.locationId} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="curator" placeholder="Kurator" value={formData.curator} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <textarea name="description" placeholder="Beskrivelse" value={formData.description} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="artworkIds" placeholder="Artwork IDs (fx KS1,KS2)" value={formData.artworkIds} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />

      <button onClick={handleCreate} style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", cursor: "pointer" }}>
        Opret Event
      </button>
    </div>
  );
}
