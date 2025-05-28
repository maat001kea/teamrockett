import { create } from "zustand";

const useStore = create((set) => ({
  events: [],

  setEvents: (newEvents) => set({ events: newEvents }),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));

export default useStore;
