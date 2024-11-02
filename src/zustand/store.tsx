import {create} from 'zustand'

export const useBookings = create((set) => ({
    bookings: [],
    getBookings: async () => {
        fetch('/admin/bookings/api')
        .then(res => res.json())
        .then(bookings => set({bookings}))
    }
}))


