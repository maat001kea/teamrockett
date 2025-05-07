"use client"; // Gør komponenten til en klient-komponent (nødvendig for Clerk)

import { useSignIn, useSignUp } from "@clerk/nextjs"; // Clerk hooks til login og oprettelse
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"; // Viser forskelligt UI afhængig af login-status
import { useState } from "react";
import { useRouter } from "next/navigation"; // Til at skifte side efter login

export default function AuthPage() {
  // Hooks til Clerk login/signup og Next router
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();

  // UI-states
  const [view, setView] = useState("login"); // Kan være "login", "signup" eller "verify"
  const [isLoading, setIsLoading] = useState(false); // Spinner visning
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [code, setCode] = useState(""); // Bekræftelseskode til signup
  const [error, setError] = useState(""); // Fejlmeddelelse

  // Skifter mellem login/signup/verify med loader
  const changeState = (newView) => {
    setIsLoading(true);
    setTimeout(() => {
      setError("");
      setView(newView);
      setIsLoading(false);
    }, 1500);
  };

  // Login-funktion
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!signInLoaded) return;
    setError("");

    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setSignInActive({ session: result.createdSessionId });
        router.push("/"); // Redirect til forsiden efter login
      } else {
        setError("Login ikke fuldført.");
      }
    } catch (err) {
      setError("Forkert email eller adgangskode.");
    }
  };

  // Signup-funktion
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    setError("");

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" }); // Sender email-kode
      setError(""); // Ryd fejl hvis succes
      setView("verify"); // Skift til verifikations-view
    } catch (err) {
      setError(err.errors?.[0]?.message || "Noget gik galt ved oprettelse.");
    }
  };

  // Bekræft kode efter signup
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const complete = await signUp.attemptEmailAddressVerification({ code });
      if (complete.status === "complete") {
        setError(""); // Ryd fejl
        await setSignUpActive({ session: complete.createdSessionId });
        router.push("/"); // Redirect til forsiden
      } else {
        setError("Forkert kode.");
      }
    } catch (err) {
      setError("Verifikation mislykkedes.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-60">
      {/* Hvis brugeren er logget ind */}
      <SignedIn>
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Du er allerede logget ind ✅</p>
          <UserButton /> {/* Clerk's bruger-menu (log ud, profil osv.) */}
        </div>
      </SignedIn>

      {/* Hvis brugeren IKKE er logget ind */}
      <SignedOut>
        <div className="max-w-md w-full space-y-6 p-6 border rounded shadow-sm bg-white">
          <h1 className="text-2xl font-bold text-center">{view === "login" ? "Log ind" : view === "signup" ? "Opret konto" : "Bekræft kode"}</h1>

          {/* Loader-visning */}
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="text-sm text-gray-500">Skifter visning...</p>
            </div>
          ) : // Login-form
          view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Adgangskode" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />

              {/* Link til glemt kode */}
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-blue-500 underline hover:text-blue-700">
                  Glemt adgangskode?
                </a>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                Log ind
              </button>

              <p className="text-sm text-center">
                Har du ikke en bruger?{" "}
                <button type="button" onClick={() => changeState("signup")} className="text-orange-500 underline">
                  Opret konto
                </button>
              </p>
            </form>
          ) : // Signup-form
          view === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Adgangskode" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">
                Opret konto
              </button>

              <p className="text-sm text-center">
                Allerede bruger?{" "}
                <button type="button" onClick={() => changeState("login")} className="text-blue-500 underline">
                  Log ind
                </button>
              </p>
            </form>
          ) : (
            // Verifikations-form
            <form onSubmit={handleVerify} className="space-y-4">
              <input type="text" placeholder="Verifikationskode (fra email)" className="w-full border p-2" value={code} onChange={(e) => setCode(e.target.value)} required />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                Bekræft konto
              </button>
            </form>
          )}

          {/* Fejlbesked vises her */}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
      </SignedOut>
    </div>
  );
}
