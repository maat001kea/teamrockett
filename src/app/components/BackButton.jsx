// "use client";

// import { useRouter } from "next/navigation";

// import { useState } from "react";
// import Spinner from "../components/Spinner";
// export default function BackButton() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleBack = () => {
//     setLoading(true);

//     setTimeout(() => {
//       if (typeof window !== "undefined" && window.history.length > 2) {
//         router.back();
//       } else {
//         router.push("/events");
//       }
//     }, 100); // kunstig forsinkelse
//   };

//   return (
//     <button onClick={handleBack} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-200 border border-gray-300 transition disabled:opacity-50">
//       {loading ? (
//         <>
//           <Spinner />
//           <span>Går tilbage...</span>
//         </>
//       ) : (
//         <>
//           <span>Tilbage</span>
//         </>
//       )}
//     </button>
//   );
// }
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
    <button onClick={handleBack} disabled={loading} className="flex items-center gap-2 px-2 py-1 text-my-blue hover:text-my-blue-dark disabled:opacity-50 focus:outline-none" style={{ background: "transparent", border: "none" }} aria-label="Go back">
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
