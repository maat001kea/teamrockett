"use client"; 

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs"; 
import { useRouter } from "next/navigation"; 

export default function ForgotPasswordPage() {
  // Clerk-funktioner og router initialiseres
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

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
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("reset"); // Gå videre til næste trin: kode + ny adgangskode
    } catch (err) {
      setError(err.errors?.[0]?.message || "Noget gik galt.");
    }
  };

  // Andet trin: bruger indtaster kode + ny adgangskode for at nulstille
  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      // Hvis alt lykkes, log brugeren ind og send til forsiden
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("Verifikation mislykkedes.");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Noget gik galt.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-70">
      <div className="max-w-md w-full space-y-6 p-6 border rounded shadow-sm bg-white text-center">
        <h1 className="text-2xl font-bold">Gendan adgangskode</h1>

        {/* Vis første trin: brugeren anmoder om kode via e-mail */}
        {step === "request" ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
              Send nulstillingskode
            </button>
          </form>
        ) : (
          // Andet trin: brugeren indtaster kode og ny adgangskode
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="text"
              placeholder="Verifikationskode"
              className="w-full border p-2"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Ny adgangskode"
              className="w-full border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
