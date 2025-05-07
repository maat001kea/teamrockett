import { getToken } from "@clerk/nextjs/server"; // kun i server-side filer!

export async function fetchWithAuth(url, options = {}) {
  const token = await getToken({ template: "default" });

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
