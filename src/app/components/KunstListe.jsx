//Kan jeg tag og lave et liste fra databasen smk
// af f.eks 50 thing uden den crasher

"use client";

import React, { useEffect, useState } from "react";

export default function EventListe() {
  const [events, setEvents] = useState([]);

  // Hent events når siden loader
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Hentede events:", data);
        setEvents(data);
      })
      .catch((err) => {
        console.error("Fejl ved hentning af events:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}>Events fra din lokale database</h2>

      {events.length === 0 ? (
        <p>Ingen events fundet.</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p>
              <strong>Kurator:</strong> {event.curator}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

// vhsi jeg har en list kan jeg sorte den på et eller anden måde

//VIGTIGSTE LAVE DE 2 ØVERSTE PÅ BEGGE SIDER
