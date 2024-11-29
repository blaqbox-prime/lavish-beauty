import page from "@/app/admin/services/page";
import { fetchAllClients } from "@/services/ClientsService";
import { BookingRecord } from "@/types";
import { addDays } from "date-fns";
import { Function } from "lodash";
import { create } from "zustand";

export const useBookings = create((set) => ({
  bookings: [],
  loading: false,
  setLoading: (loading_state: boolean) => set({ loading: loading_state }),
  setBookings: (bookings: []) => set({ bookings }),
  getBookings: async () => {
    set({ loading: true });
    fetch("/admin/bookings/api")
      .then((res) => res.json())
      .then((bookings) => {
        set({ bookings });
        set({ loading: false });
      });
  },

  page: 1,
  setPage: (pageNumber: number) => set({ page: pageNumber }),
  start: 0,
  setStart: (newStartPosition: number) => set({ start: newStartPosition }),

  // filters
  startDate: null,
  setStartDate: (startDate: Date) => {
     set({ startDate });
  },

  endDate: null,
  setEndDate: (newEndDate: Date) => {
    set({ endDate: newEndDate });
  },

}));

export const useClients = create((set) => ({
  clients: [],
  loading: false,
  setLoading: (loading_state: boolean) => set({ loading: loading_state }),
  setClients: (clients: []) => set({ clients }),
  getClients: async () => {
    set({ loading: true });
    fetch('/admin/clients/api')
    .then( (res) => res.json())
    .then( (clients) => {
      set({ clients });
      set({ loading: false });
    });
  },

  page: 1,
  setPage: (pageNumber: number) => set({ page: pageNumber }),
  start: 0,
  setStart: (newStartPosition: number) => set({ start: newStartPosition }),

}));