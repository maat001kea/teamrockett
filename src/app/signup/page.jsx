"use client"; // Sikrer at komponenten kører i browseren

import { useSignUp } from "@clerk/nextjs"; // Clerk hook til at oprette bruger
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Bruges til at navigere efter login

export default function CustomSignup() {
  const { signUp, isLoaded, setActive } = useSignUp(); // Clerk hook
  const router = useRouter(); // Til navigation

  // State til inputfelter og tilstand
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(""); // Verifikationskode
  const [pendingVerification, setPendingVerification] = useState(false); // Skifter mellem formular og kode-input
  const [error, setError] = useState("");

  // Debugging: vis Clerk's signup status i konsollen
  useEffect(() => {
    if (signUp) {
      console.log("Clerk signUp status:", signUp.status);
    }
  }, [signUp]);

  // Funktion der håndterer oprettelse af bruger
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) return; // Clerk er ikke klar endnu

    try {
      // Opret bruger hos Clerk
      await signUp.create({
        emailAddress: email,
        password,
        username,
      });

      // Bed Clerk om at sende bekræftelseskode til e-mail
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true); // Skift til bekræftelseskode-formular
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.errors?.[0]?.message || "Noget gik galt under oprettelse.");
    }
  };

  // Funktion der håndterer bekræftelse af kode
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLoaded) {
      setError("Clerk ikke klar. Prøv igen.");
      return;
    }

    try {
      // Prøv at bekræfte den kode brugeren skrev
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === "complete") {
        // Gør brugeren aktiv og send dem videre til produktsiden
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/products");
      } else {
        setError("Verifikation ikke fuldført. Prøv igen.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Forkert kode. Prøv igen.");
    }
  };

  // Funktion til at sende ny kode
  const resendCode = async () => {
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      alert("Ny bekræftelseskode er sendt til din e-mail.");
    } catch (err) {
      console.error("Fejl ved gensendelse:", err);
      setError("Kunne ikke sende ny kode. Prøv igen senere.");
    }
  };

  const shouldShowCodeInput = pendingVerification;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Opret bruger</h1>

      {shouldShowCodeInput ? (
        // Formular til at bekræfte e-mail med kode
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <p>Indtast den kode vi sendte til din e-mail:</p>
          <input type="text" inputMode="numeric" autoFocus maxLength={6} placeholder="Indtast 6-cifret kode" className="border p-3 text-lg tracking-widest text-center font-mono rounded" value={code} onChange={(e) => setCode(e.target.value)} required />
          <button type="submit" className="bg-green-600 text-white py-2 rounded">
            Bekræft konto
          </button>
          <button type="button" onClick={resendCode} className="text-sm text-blue-600 underline">
            Send ny kode
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      ) : (
        // Formular til at oprette bruger
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input type="text" placeholder="Brugernavn" className="border p-2" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Adgangskode" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="bg-orange-500 text-white py-2 rounded">
            Opret konto
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
}
