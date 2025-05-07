"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("request"); // 'request' eller 'reset'
  const [error, setError] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("reset");
    } catch (err) {
      setError(err.errors?.[0]?.message || "Noget gik galt.");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

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
        {step === "request" ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
              Send nulstillingskode
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input type="text" placeholder="Verifikationskode" className="w-full border p-2" value={code} onChange={(e) => setCode(e.target.value)} required />
            <input type="password" placeholder="Ny adgangskode" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
              Nulstil adgangskode
            </button>
          </form>
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
