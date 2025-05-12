"use client";

import Link from "next/link";

export default function CreateEventButton() {
  return (
    <Link href="/createevents">
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">Opret Event</button>
    </Link>
  );
}
