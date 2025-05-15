// components/PopupModal.jsx
"use client";

export default function PopupModal({ type, message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-80 text-center relative">
        <h2 className={`text-lg font-bold mb-2 ${type === "success" ? "text-green-600" : "text-red-600"}`}>{type === "success" ? "Tilmelding fuldført!" : "Fejl ved tilmelding"}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button onClick={onClose} className="mt-2 px-4 py-2 bg-[#D97C2B] hover:bg-[#FFA04E] text-white rounded font-noto">
          Luk
        </button>
      </div>
    </div>
  );
}
