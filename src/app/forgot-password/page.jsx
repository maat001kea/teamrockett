"use client";

// Clerk Docs
// https://clerk.com/docs/nextjs

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  // Clerk funktioner og router initialiseres
  const { isLoaded, signIn, setActive } = useSignIn(); // Clerk useSignIn hook - https://clerk.com/docs/hooks/use-sign-in
  const router = useRouter(); // Next.js useRouter hook - https://nextjs.org/docs/pages/api-reference/functions/use-router

  // State til email, kode, ny adgangskode og fejl
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("request"); // To trin: "request" eller "reset"
  const [error, setError] = useState("");

  // Første trin: send nulstillingskode til brugerens e-mail
  const handleRequest = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn.create({
        strategy: "reset_password_email_code", // Clerk strategi til reset - https://clerk.com/docs/hooks/use-sign-in#reset-password
        identifier: email,
      });
      setStep("reset"); // Gå videre til næste trin: kode + ny adgangskode
    } catch (err) {
      console.error("Fejl ved anmodning:", err);
      setError(err.errors?.[0]?.message || "Noget gik galt.");
    }
  };

  // Andet trin: bruger indtaster kode + ny adgangskode for at nulstille
  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code", // Clerk strategi til bekræftelse - https://clerk.com/docs/hooks/use-sign-in#reset-password
        code,
        password,
      });

      // Hvis alt lykkes, log brugeren ind og send til forsiden
      if (result.status === "complete") {
        console.log("Adgangskode nulstillet. Session ID:", result.createdSessionId);
        await setActive({ session: result.createdSessionId }); // Sæt session - https://clerk.com/docs/hooks/use-sign-in#set-active
        router.push("/"); // Naviger til forside
      } else {
        setError("Verifikation mislykkedes.");
      }
    } catch (err) {
      console.error("Fejl ved nulstilling:", err);
      setError(err.errors?.[0]?.message || "Noget gik galt.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-70">
      <div className="max-w-md w-full space-y-6 p-6 border rounded shadow-sm bg-white text-center">
        <h1 className="text-2xl font-bold">Gendan adgangskode</h1>

        {/* Første trin: brugeren anmoder om nulstillingskode */}
        {step === "request" ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log("Email ændret:", e.target.value);
              }}
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
              Send nulstillingskode
            </button>
          </form>
        ) : (
          // Andet trin: bruger indtaster verifikationskode og ny adgangskode
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="text"
              placeholder="Verifikationskode"
              className="w-full border p-2"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                console.log("Kode ændret:", e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="Ny adgangskode"
              className="w-full border p-2"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log("Ny adgangskode ændret");
              }}
              required
            />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
              Nulstil adgangskode
            </button>
          </form>
        )}

        {/* Fejlmeddelelse vises, hvis noget går galt */}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
