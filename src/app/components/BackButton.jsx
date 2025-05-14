"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
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
    }, 100); // kunstig forsinkelse
  };

  return (
    <button onClick={handleBack} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-200 border border-gray-300 transition disabled:opacity-50">
      {loading ? (
        <>
          <Spinner />
          <span>Går tilbage...</span>
        </>
      ) : (
        <>
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Tilbage</span>
        </>
      )}
    </button>
  );
}
