"use client";

import Link from "next/link";

export default function ChangeEventButton({ id }) {
  if (!id) return null;

  return (
    <Link href={`/changeevent/${id}`}>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">Rediger Event</button>
    </Link>
  );
}
