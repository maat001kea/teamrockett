import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke logget ind" }, { status: 401 });
    }

    const { firstName, lastName } = await req.json();

    console.log("🛠️ API modtog:", { userId, firstName, lastName });

    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Clerk API-fejl:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
