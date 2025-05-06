// import { SignIn } from "@clerk/nextjs";

// export default function LoginPage() {
//   return (
//     <div className="m-auto">
//       <h1>Log ind</h1>
//       <SignIn path="/login" routing="path" />
//     </div>
//   );
// }

"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    if (!isLoaded) {
      console.log("Clerk not ready");
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("Login successful!");
        router.push("/products"); // Ændr til din ønskede destination
      } else {
        console.log("Login not complete:", result);
        setError("Noget gik galt. Prøv igen.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Forkert email eller adgangskode");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log ind</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Adgangskode" className="border p-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-orange-500 text-white py-2 rounded">
          Log ind
        </button>
      </form>
    </div>
  );
}
