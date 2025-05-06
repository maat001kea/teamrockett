"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user?.firstName) {
      setDisplayName(user.firstName);
    }
  }, [user]);

  if (!isLoaded) return <p>Indlæser...</p>;
  if (!user) return <p>Du er ikke logget ind.</p>;

  const handleUpdateProfile = async () => {
    try {
      if (!fullName.trim()) {
        setMessage("Indtast et navn.");
        return;
      }

      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const res = await fetch("/api/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Ukendt fejl");
      }

      // 🔄 Hent nyeste Clerk-data
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

      <div className="flex items-center gap-4 mb-6">
        <img src={user.imageUrl} alt="Profilbillede" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <p className="text-lg font-semibold">{displayName || "Ingen navn"}</p>
          <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress || "Ingen e-mail"}</p>
        </div>
      </div>

      <div className="space-y-2">
        <input type="text" placeholder="Nyt navn (fx Mahmoud Said)" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border p-2 w-full" />
        <button type="button" onClick={handleUpdateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">
          Opdater navn
        </button>
      </div>

      {message && <p className={message.startsWith("✅") ? "text-green-600" : "text-red-600"}>{message}</p>}
    </div>
  );
}
