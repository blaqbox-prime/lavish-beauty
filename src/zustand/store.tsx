import page from "@/app/admin/services/page";
import { BookingRecord } from "@/types";
import { addDays } from "date-fns";
import { Function } from "lodash";
import { create } from "zustand";

export const useBookings = create((set) => ({
  bookings: [],
  setBookings: (bookings: []) => set({bookings}),
  getBookings: async () => {
    fetch("/admin/bookings/api")
      .then((res) => res.json())
      .then((bookings) => set({ bookings }));
  },

  page: 1,
  setPage: (pageNumber: number) => set({ page: pageNumber }),
  start: 0,
  setStart: (newStartPosition: number) => set({ start: newStartPosition }),

  // filters
  startDate: new Date(),
  setStartDate: (startDate: Date) => {
    if (!startDate) {
      set({ startDate: new Date() });
    } else set({ startDate });
  },

  endDate: addDays(new Date(), 31),
  setEndDate: (newEndDate: Date) => {
    if (!newEndDate) {
      set({ endDate: addDays(new Date(), 30) });
    } else set({ endDate: newEndDate });
  },
}));
