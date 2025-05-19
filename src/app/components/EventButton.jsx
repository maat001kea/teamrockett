"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AnimatedButton from "./AnimatedButton";
import Modal from "./Modal";
import { bookEvent } from "@/lib/ticket";

const EventButton = (props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const ticketGet = async () => {
    setMessage("");

    if (!props.tickets || props.tickets < 1) {
      setMessage("Please select at least 1 ticket.");
      return;
    }

    const result = await bookEvent(props.id, props.tickets);

    if (result.message === "Tickets booked") {
      setMessage("Tickets booked successfully!");
      router.push(`/kvitering?id=${props.id}`);
    } else if (result.message?.toLowerCase().includes("not enough tickets")) {
      setShowModal(true);
    } else {
      setMessage(result.message || "Something went wrong.");
    }
  };

  return (
    <div className="space-y-2">
      <AnimatedButton onClick={ticketGet}>Book event</AnimatedButton>
      {message && <p className="text-sm text-gray-700">{message}</p>}

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Sorry!">
        <p className="text-sm text-gray-700">Not enough tickets available.</p>
      </Modal>
    </div>
  );
};

export default EventButton;

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import AnimatedButton from "./AnimatedButton";
// import { bookEvent } from "@/lib/ticket";

// const EventButton = (props) => {
//   const router = useRouter();
//   const [message, setMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const ticketGet = async () => {
//     setMessage(""); // Clear previous messages

//     if (!props.tickets || props.tickets < 1) {
//       setMessage("Please select at least 1 ticket.");
//       return;
//     }

//     const result = await bookEvent(props.id, props.tickets);

//     if (result.message === "Tickets booked") {
//       setMessage("Tickets booked successfully!");
//       router.push(`/kvitering?id=${props.id}`);
//     } else if (result.message?.toLowerCase().includes("not enough tickets")) {
//       setShowModal(true);
//     } else {
//       setMessage(result.message || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <AnimatedButton onClick={ticketGet}>Book event</AnimatedButton>

//       {message && <p className="text-sm text-gray-700">{message}</p>}

//       {showModal && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50"
//           style={{
//             backgroundColor: "rgba(0, 0, 0, 0.3)",
//             backdropFilter: "blur(5px)",
//             WebkitBackdropFilter: "blur(5px)",
//           }}
//         >
//           <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center space-y-4">
//             <h2 className="text-lg font-semibold">Sorry!</h2>
//             <p className="text-sm text-gray-700">Not enough tickets available.</p>
//             <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventButton;
