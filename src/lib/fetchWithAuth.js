// import { getToken } from "@clerk/nextjs/server";

// // En hjelpsfunksjon for å gjøre autentiserte fetch-kall fra server-side kode
// export async function fetchWithAuth(url, options = {}) {
//   const token = await getToken({ template: "default" }); // Henter en autentiseringstoken fra Clerk (med default template)

//   return fetch(url, {
//     ...options, // Beholder alle opsjonene som ble sendt inn
//     headers: {
//       ...(options.headers || {}), // Slår sammen eventuelle egendefinerte headers
//       Authorization: `Bearer ${token}`, // Legger til Authorization-header med Bearer-token
//       "Content-Type": "application/json", // Setter Content-Type til JSON (kan overstyres om nødvendig)
//     },
//   });
// }
