// src/app/api/update-name/route.js
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = auth();
  const { firstName, lastName } = await req.json();

  if (!userId) {
    return new Response("Ikke logget ind", { status: 401 });
  }

  try {
    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Clerk API fejl:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
