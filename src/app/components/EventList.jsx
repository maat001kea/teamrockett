//mappe alle events i localhost

"use client";

import React, { useEffect, useState } from "react";

// Dette er en komponent der henter events og viser dem
export default function EventList() {
  // Her gemmer vi listen af events i en state
  const [events, setEvents] = useState([]);

  // Her gemmer vi det brugeren skriver i formularen
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    locationId: "",
    curator: "",
    description: "",
    artworkIds: "",
  });

  // Denne funktion henter alle events fra backend
  const fetchEvents = () => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => setEvents(data)) // gem i state
      .catch((err) => console.log("Fejl ved hentning:", err));
  };

  // Brug useEffect til at hente events, når siden loader
  useEffect(() => {
    fetchEvents();
  }, []);

  // Denne funktion opdaterer formData, når brugeren skriver i felterne
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Denne funktion sender et nyt event til serveren
  const handleCreate = () => {
    // artworkIds skal være et array
    const dataToSend = {
      ...formData,
      artworkIds: formData.artworkIds.split(",").map((id) => id.trim()),
    };

    //---------------------------------------------------------------------------------------------------
    // virker det så lave en knap der poster et event
    //---------------------------------------------------------------------------------------------------

    fetch("http://localhost:8080/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Event blev oprettet!");
        // Nulstil formular
        setFormData({
          title: "",
          date: "",
          locationId: "",
          curator: "",
          description: "",
          artworkIds: "",
        });
        // Hent listen igen
        fetchEvents();
      })
      .catch((err) => console.log("Fejl ved oprettelse:", err));
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Opret nyt event</h2>

      {/* Formular til oprettelse */}
      <input name="title" placeholder="Titel" value={formData.title} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="date" placeholder="Dato (fx 2025-05-15)" value={formData.date} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="locationId" placeholder="Lokation ID" value={formData.locationId} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="curator" placeholder="Kurator" value={formData.curator} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <textarea name="description" placeholder="Beskrivelse" value={formData.description} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />
      <input name="artworkIds" placeholder="Artwork IDs (fx KS1,KS2)" value={formData.artworkIds} onChange={handleChange} style={{ display: "block", marginBottom: "10px", width: "100%" }} />

      <button onClick={handleCreate} style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", cursor: "pointer" }}>
        Opret Event
      </button>

      <hr style={{ margin: "2rem 0" }} />

      {/* Her vises alle events */}
      <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Events</h2>
      {events.map((event) => (
        <div key={event.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{event.title}</h3>
          <p>
            <strong>Dato:</strong> {event.date}
          </p>
          <p>
            <strong>Kurator:</strong> {event.curator}
          </p>
          <p>
            <strong>Lokation:</strong> {event.location?.name || "Ukendt"}
          </p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

// når jeg poster skal jeg bare tænk på at smide data over,
//hvis det virer, kan jeg så sætte et form op som jeg kan inpute info ind

// VIGTIGT TJEK ALTID I THUNDER CLIENT INDEN DU LIGGER NOGET UP
