"use client";
// Clerk Docs
// https://clerk.com/docs/nextjs

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn(); // Håndterer login-flowet med Clerk - https://clerk.com/docs/hooks/use-sign-in
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp(); // Håndterer oprettelse af nye brugere med Clerk - https://clerk.com/docs/hooks/use-sign-up
  const router = useRouter(); // Next.js router hook til navigation - https://nextjs.org/docs/pages/api-reference/functions/use-router

  // Clerk komponenter til at vise UI baseret på loginstatus:
  // https://clerk.com/docs/components/control/signed-in
  // https://clerk.com/docs/components/control/signed-out
  // <SignedIn> ... </SignedIn> viser indhold for loggede brugere
  // <SignedOut> ... </SignedOut> viser indhold for ikke-loggede brugere

  // React state hooks - https://react.dev/reference/react/useState
  const [view, setView] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // React useEffect hook - https://react.dev/reference/react/useEffect
  useEffect(() => {
    if (view === "signup") {
      console.log(" CAPTCHA container vist for signup");
    }
  }, [view]);

  // Skifter mellem login/signup/verify views
  const changeState = (newView) => {
    console.log(" Skifter view til:", newView);
    setIsLoading(true);
    setTimeout(() => {
      setError("");
      setView(newView);
      setIsLoading(false);
    }, 1500);
  };

  // Håndterer login formular
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!signInLoaded) return;
    setError("");
    setIsLoading(true);
    console.log(" Login forsøges med:", { email });

    try {
      const result = await signIn.create({ identifier: email, password }); // Clerk login - https://clerk.com/docs/hooks/use-sign-in
      console.log("Login resultat:", result);

      if (result.status === "complete") {
        console.log("Login fuldført. Session ID:", result.createdSessionId);
        await setSignInActive({ session: result.createdSessionId }); // Sætter session - https://clerk.com/docs/hooks/use-sign-in#set-active
        router.push("/events");
      } else {
        setError("Login ikke fuldført.");
      }
    } catch (err) {
      console.error("Login fejl:", err);
      setError("Forkert email eller adgangskode.");
    } finally {
      setIsLoading(false);
    }
  };

  // Håndterer signup formular
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    setError("");
    setIsLoading(true);

    console.log(" Opretter bruger med:", { email });
    // CAPTCHA beskytter signup mod bots - Cloudflare Turnstile docs: https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
    try {
      const captchaToken = window.turnstile?.getResponse();
      console.log(" CAPTCHA token:", captchaToken);

      const res = await signUp.create({
        emailAddress: email,
        password,
        username: email.split("@")[0],
        captchaToken,
      }); // Clerk signup - https://clerk.com/docs/hooks/use-sign-up

      console.log(" Clerk signup respons:", res);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" }); // Forbereder verifikation - https://clerk.com/docs/hooks/use-sign-up#email-verification
      console.log(" Verifikationsmail sendt.");
      setError("");
      setView("verify");
    } catch (err) {
      console.error(" Signup fejl:", err);
      setError(err.errors?.[0]?.message || "Noget gik galt ved oprettelse.");
    } finally {
      setIsLoading(false);
    }
  };

  // Håndterer verifikation af kode
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!signUp) {
      setError("Session udløbet – start forfra.");
      return;
    }
    setIsLoading(true);
    console.log("Verificerer med kode:", code);

    try {
      const complete = await signUp.attemptEmailAddressVerification({ code: code.trim() }); // Verificerer kode - https://clerk.com/docs/hooks/use-sign-up#email-verification
      console.log("Clerk response:", complete);
      if (complete.status === "complete") {
        console.log(" Verifikation fuldført. Session ID:", complete.createdSessionId);
        setError("");
        await setSignUpActive({ session: complete.createdSessionId }); // Sætter session - https://clerk.com/docs/hooks/use-sign-up#set-active
        router.push("/dashboard");
      } else {
        setError("Forkert kode.");
      }
    } catch (err) {
      console.error(" Verifikationsfejl:", err);
      setError(err.errors?.[0]?.message || "Verifikation mislykkedes.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(" STEP:", view);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-60">
      <SignedIn>
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Du er allerede logget ind ✅</p>
          {/* Clerk UserButton - viser profil/indstillinger - https://clerk.com/docs/components/user/user-button */}
          <UserButton />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="max-w-md w-full space-y-6 p-6 border rounded shadow-sm bg-white">
          <h1 className="text-2xl font-bold text-center">{view === "login" ? "Log ind" : view === "signup" ? "Opret konto" : "Bekræft kode"}</h1>

          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="text-sm text-gray-500">Behandler...</p>
            </div>
          ) : view === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Adgangskode" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-blue-500 underline hover:text-blue-700">
                  Glemt adgangskode?
                </a>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={isLoading}>
                Log ind
              </button>
              <p className="text-sm text-center">
                Har du ikke en bruger?{" "}
                <button type="button" onClick={() => changeState("signup")} className="text-orange-500 underline">
                  Opret konto
                </button>
              </p>
            </form>
          ) : view === "signup" ? (
            <form onSubmit={handleSignup} className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Adgangskode" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {view === "signup" && <div id="clerk-captcha" key="captcha" className="my-2" />}
              <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded" disabled={isLoading}>
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
            <form onSubmit={handleVerify} className="space-y-4">
              <input type="text" placeholder="Verifikationskode (fra email)" className="w-full border p-2" value={code} onChange={(e) => setCode(e.target.value)} required />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded" disabled={isLoading}>
                Bekræft konto
              </button>
            </form>
          )}

          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
      </SignedOut>
    </div>
  );
}
