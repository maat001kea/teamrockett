// import { SignIn } from "@clerk/nextjs";

// export default function LoginPage() {
//   return (
//     <div className="m-auto">
//       <h1>Log ind</h1>
//       <SignIn path="/login" routing="path" />
//     </div>
//   );
// }

"use client"; // Sikrer at denne komponent kun kører i browseren

import { useSignIn } from "@clerk/nextjs"; // Clerk hook til login
import { useRouter } from "next/navigation"; // Bruges til navigation efter login
import { useState } from "react";

export default function CustomLogin() {
  // Clerk's hook til at håndtere login
  const { isLoaded, signIn, setActive } = useSignIn();

  // State til email, kodeord og fejlbesked
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Router til at navigere brugeren efter login

  // Funktion der håndterer login
  const handleLogin = async (e) => {
    e.preventDefault(); // Forhindrer at siden genindlæses

    console.log("Login form submitted");

    // Clerk skal være indlæst før vi kan bruge det
    if (!isLoaded) {
      console.log("Clerk not ready");
      return;
    }

    try {
      // Forsøg at logge ind med Clerk
      const result = await signIn.create({
        identifier: email, // email eller brugernavn
        password,
      });

      // Hvis login lykkedes
      if (result.status === "complete") {
        // Sæt den aktive session
        await setActive({ session: result.createdSessionId });
        console.log("Login successful!");

        // Navigér brugeren videre til produkter
        router.push("/products");
      } else {
        // Hvis Clerk ikke returnerede komplet status
        console.log("Login not complete:", result);
        setError("Noget gik galt. Prøv igen.");
      }
    } catch (err) {
      // Fang fejl (fx forkert email eller kode)
      console.error("Login error:", err);
      setError("Forkert email eller adgangskode");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log ind</h1>

      {/* Login-formularen */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {/* Emailfelt */}
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />

        {/* Adgangskodefelt */}
        <input type="password" placeholder="Adgangskode" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {/* Fejlbesked vises hvis der opstår fejl */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Login-knap */}
        <button type="submit" className="bg-orange-500 text-white py-2 rounded">
          Log ind
        </button>
      </form>
    </div>
  );
}
