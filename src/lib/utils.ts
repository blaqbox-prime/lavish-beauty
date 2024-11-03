import { BookingRecord } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterUpcomingBookings(bookings: BookingRecord[]) : BookingRecord[]{
  // Current date 
  const currentDate = new Date().toISOString().split('T')[0]; 
  // Function to filter objects 
  return bookings.filter(booking => new Date(booking.booking_date) > new Date(currentDate))
  .sort((a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime());
}