"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner"; // justér sti hvis nødvendigt

export default function CreateEventButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    // Vent 1.5 sekunder før navigation
    setTimeout(() => {
      router.push("/createevents");
    }, 100);
  };

  return (
    <button onClick={handleClick} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 disabled:opacity-50">
      {loading ? <Spinner /> : "Opret Event"}
    </button>
  );
}
