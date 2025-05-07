import { useFetchWithAuth } from "./fetchWithAuth";

export function useApi() {
  const fetchWithAuth = useFetchWithAuth();

  async function createEvent(data) {
    const res = await fetchWithAuth("http://localhost:3001/api/events", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Fejl ved oprettelse");
    return await res.json();
  }

  return { createEvent };
}
