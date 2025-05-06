import { auth, clerkClient } from "@clerk/nextjs/server"; // ✅ ikke fra @clerk/nextjs
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId } = auth(); // 👈 får Clerk-brugerID

  if (!userId) {
    return NextResponse.json({ error: "Bruger ikke logget ind" }, { status: 401 });
  }

  const { firstName, lastName } = await req.json();

  await clerkClient.users.updateUser(userId, {
    firstName,
    lastName,
  });

  return NextResponse.json({ success: true });
}
