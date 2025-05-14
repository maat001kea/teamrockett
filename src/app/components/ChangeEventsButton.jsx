"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";

export default function ChangeEventButton({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!id) return null;

  const handleClick = () => {
    setLoading(true);

    // Vent 1.5 sekund før navigation for at vise spinner
    setTimeout(() => {
      router.push(`/changeevent/${id}`);
    }, 100);
  };

  return (
    <button onClick={handleClick} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 disabled:opacity-50">
      {loading ? <Spinner /> : "Rediger Event"}
    </button>
  );
}
