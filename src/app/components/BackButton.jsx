"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "../components/Spinner";

export default function BackButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    setLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back();
      } else {
        router.push("/events");
      }
    }, 100);
  };

  return (
    <button onClick={handleBack} disabled={loading} className="flex items-center gap-2 px-2 py-1 text-my-blue hover:text-my-orange disabled:opacity-50 focus:outline-none" style={{ background: "transparent", border: "none" }} aria-label="Go back">
      {loading ? (
        <>
          <Spinner />
          <span>Går tilbage...</span>
        </>
      ) : (
        <>
          <FaArrowLeft className="w-4 h-4" />
          <span>Tilbage</span>
        </>
      )}
    </button>
  );
}
