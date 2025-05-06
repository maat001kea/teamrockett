"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("sign-in"); // "sign-in" eller "sign-up"

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-6">{mode === "sign-in" ? "Log ind" : "Opret bruger"}</h1>

      <div className="mb-6 w-full max-w-md ml-10 mb-50">
        {mode === "sign-in" ? (
          <>
            <SignIn path="/sign-in" routing="path" />
            <p className="mt-4 text-sm text-center">
              Har du ikke en bruger?{" "}
              <button onClick={() => setMode("sign-up")} className="text-orange-500 underline">
                Opret dig her
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUp path="/sign-in" routing="path" />
            <p className="mt-4 text-sm text-center">
              Har du allerede en bruger?{" "}
              <button onClick={() => setMode("sign-in")} className="text-orange-500 underline">
                Log ind her
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
