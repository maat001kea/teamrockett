"use client";

import { useUser } from "@clerk/nextjs"; // Clerk hook til brugerinfo
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser(); // Clerk hook: henter aktiv bruger og status

  // States til navn, beskeder og billede-upload
  const [fullName, setFullName] = useState(""); // Inputfelt til nyt navn
  const [message, setMessage] = useState(""); // Feedback til bruger
  const [displayName, setDisplayName] = useState(""); // Det viste navn i UI
  const [isUploading, setIsUploading] = useState(false); // Vis spinner under upload
  const [showImageUpload, setShowImageUpload] = useState(false); // Skift mellem knap og input til billede

  // Når brugeren er klar, sæt navnet til visning
  useEffect(() => {
    if (user?.firstName) {
      setDisplayName(user.firstName);
    }
  }, [user]);

  // Vent på Clerk
  if (!isLoaded) return <p>Indlæser...</p>;
  if (!user) return <p>Du er ikke logget ind.</p>;

  // 🔁 Funktion til at opdatere navn via API
  const handleUpdateProfile = async () => {
    try {
      if (!fullName.trim()) {
        setMessage("Indtast et navn.");
        return;
      }

      // Split navn i fornavn og evt. efternavn
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      // Kald backend-route der bruger Clerk SDK server-side
      const res = await fetch("/api/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Ukendt fejl");
      }

      await user.reload(); // Hent ny brugerdata efter ændring
      setDisplayName(user.firstName);
      setMessage("✅ Navn opdateret!");
    } catch (err) {
      console.error("❌ Navnefejl:", err);
      setMessage(`⚠️ ${err.message || "Noget gik galt."}`);
    }
  };

  // 📷 Funktion til at uploade nyt profilbillede
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMessage("⚠️ Vælg et billede.");
      return;
    }

    setIsUploading(true); // Vis "Uploader..."
    setMessage(""); // Ryd gamle beskeder

    try {
      await user.setProfileImage({ file }); // Clerk SDK – opdater billede
      await user.reload(); // Opdater billede i UI
      setMessage("✅ Profilbillede opdateret!");
    } catch (err) {
      console.error("❌ Billede-fejl:", err);
      setMessage("⚠️ Kunne ikke opdatere billedet.");
    } finally {
      setIsUploading(false);
      setShowImageUpload(false); // Skjul uploadfelt igen
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Din brugerprofil</h1>

      {/* 👤 Brugerens billede og info */}
      <div className="flex items-center gap-4 mb-4">
        <img src={user.imageUrl} alt="Profilbillede" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <p className="text-lg font-semibold">{displayName || "Ingen navn"}</p>
          <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress || "Ingen e-mail"}</p>
        </div>
      </div>

      {/* 🧑‍🎨 Skift profilbillede – med knap og uploader */}
      <div className="space-y-2">
        <button onClick={() => setShowImageUpload(!showImageUpload)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded transition-colors">
          {showImageUpload ? "Annuller" : "Skift profilbillede"}
        </button>

        {/* Filinput vises hvis showImageUpload er true */}
        {showImageUpload && <input type="file" accept="image/*" onChange={handleImageUpload} className="block mt-2" />}

        {isUploading && <p className="text-sm text-blue-600">Uploader billede...</p>}
      </div>

      {/* 📝 Opdater navn */}
      <div className="space-y-2">
        <input type="text" placeholder="Nyt navn (fx Mahmoud Said)" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border p-2 w-full" />
        <button type="button" onClick={handleUpdateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">
          Opdater navn
        </button>
      </div>

      {/* 📣 Beskeder til brugeren */}
      {message && <p className={message.startsWith("✅") ? "text-green-600" : "text-red-600"}>{message}</p>}
    </div>
  );
}
