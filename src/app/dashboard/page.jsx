"use client";

import { useUser } from "@clerk/nextjs"; // Clerk hook til at få adgang til den aktuelle bruger
import { useEffect, useState } from "react";

export default function Dashboard() {
  // Henter brugeren og tjekker om Clerk er klar
  const { user, isLoaded } = useUser();

  // State til inputfelt, beskeder og visning af navn
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");

  // Når brugeren er klar, gem visningsnavn i local state
  useEffect(() => {
    if (user?.firstName) {
      setDisplayName(user.firstName);
    }
  }, [user]);

  // Hvis Clerk ikke er klar endnu, vis "Indlæser..."
  if (!isLoaded) return <p>Indlæser...</p>;

  // Hvis brugeren ikke er logget ind, vis besked
  if (!user) return <p>Du er ikke logget ind.</p>;

  // Funktion til at opdatere brugerens navn
  const handleUpdateProfile = async () => {
    try {
      if (!fullName.trim()) {
        setMessage("Indtast et navn.");
        return;
      }

      // Del input op i fornavn og evt. efternavn
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Kald API-route for at opdatere navn server-side med Clerk SDK
      const res = await fetch("/api/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Ukendt fejl");
      }

      // Efter opdatering: hent nyeste brugerdata fra Clerk
      await user.reload();
      setDisplayName(user.firstName);

      setMessage("✅ Navn opdateret!");
    } catch (err) {
      console.error("❌ Opdateringsfejl:", err);
      setMessage(`⚠️ ${err.message || "Noget gik galt under opdatering."}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Din brugerprofil</h1>

      {/* Sektion med billede, navn og email */}
      <div className="flex items-center gap-4 mb-6">
        <img src={user.imageUrl} alt="Profilbillede" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <p className="text-lg font-semibold">{displayName || "Ingen navn"}</p>
          <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress || "Ingen e-mail"}</p>
        </div>
      </div>

      {/* Formular til at opdatere navn */}
      <div className="space-y-2">
        <input type="text" placeholder="Nyt navn (fx Mahmoud Said)" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border p-2 w-full" />
        <button type="button" onClick={handleUpdateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">
          Opdater navn
        </button>
      </div>

      {/* Vis succes- eller fejlbesked */}
      {message && <p className={message.startsWith("✅") ? "text-green-600" : "text-red-600"}>{message}</p>}
    </div>
  );
}
