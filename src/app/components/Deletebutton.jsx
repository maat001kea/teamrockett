// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { deleteEvent } from "@/lib/api";
// import { deleteImage } from "@/lib/upload";
// import { FaTrash } from "react-icons/fa";

// export default function DeleteButton({ id, imageFilename }) {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleDelete = async () => {
//     const confirmed = window.confirm("Er du sikker på, at du vil slette?");
//     if (!confirmed) return;

//     setLoading(true);
//     console.log("🚨 Sletning påbegyndt");
//     console.log("🆔 Event ID:", id);
//     console.log("🖼️ Billed-filnavn:", imageFilename);

//     try {
//       console.log("📡 Sender DELETE request til API...");
//       await deleteEvent(id);
//       console.log("✅ Event slettet fra backend");

//       if (imageFilename) {
//         console.log("🗑️ Kalder deleteImage() med:", imageFilename);
//         await deleteImage(imageFilename);
//         console.log("✅ Billede slettet fra Supabase");
//       } else {
//         console.warn("⚠️ Ingen billedfilnavn angivet – billede springes over.");
//       }

//       alert("Event og billede slettet!");ww
//       router.push("/events");
//     } catch (e) {
//       console.error("❌ FEJL under sletning:", e);
//       alert("Kunne ikke slette event.");
//     } finally {
//       setLoading(false);
//       console.log("🛑 Sletningsproces afsluttet");
//     }
//   };

//   return (
//     <button onClick={handleDelete} disabled={loading} className={`transition ${loading ? "cursor-wait opacity-60" : "hover:text-[#FFA04E] text-my-orangedark"}`} style={{ backgroundColor: "transparent", padding: 0 }} title="Slet event">
//       {loading ? (
//         <svg className="animate-spin h-5 w-5 text-my-orangedark" viewBox="0 0 24 24" fill="none">
//           <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z" />
//         </svg>
//       ) : (
//         <FaTrash className="h-5 w-5" />
//       )}
//     </button>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteEvent } from "@/lib/api";
import { deleteImage } from "@/lib/upload";
import { FaTrash } from "react-icons/fa";

export default function DeleteButton({ id, imageFilename }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Er du sikker på, at du vil slette?");
    if (!confirmed) return;

    setLoading(true);
    console.log("🚨 Sletning påbegyndt");
    console.log("🆔 Event ID:", id);
    console.log("🖼️ Billed-filnavn:", imageFilename);

    try {
      console.log("📡 Sender DELETE request til API...");
      await deleteEvent(id);
      console.log("✅ Event slettet fra backend");

      if (imageFilename) {
        console.log("🗑️ Kalder deleteImage() med:", imageFilename);
        await deleteImage(imageFilename);
        console.log("✅ Billede slettet fra Supabase");
      } else {
        console.warn("⚠️ Ingen billedfilnavn angivet – billede springes over.");
      }

      alert("Event og billede slettet!");
      router.push("/events");
    } catch (e) {
      console.error("❌ FEJL under sletning:", e);
      alert("Kunne ikke slette event.");
    } finally {
      setLoading(false);
      console.log("🛑 Sletningsproces afsluttet");
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className={`transition ${loading ? "cursor-wait opacity-60" : "hover:text-[#FFA04E] text-my-orangedark"}`} style={{ backgroundColor: "transparent", padding: 0 }} title="Slet event">
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-my-orangedark" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2z" />
        </svg>
      ) : (
        <FaTrash className="h-5 w-5" />
      )}
    </button>
  );
}
