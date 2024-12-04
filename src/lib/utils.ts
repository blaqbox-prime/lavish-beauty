import { BookingRecord } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export function filterUpcomingBookings(bookings: BookingRecord[]) : BookingRecord[]{
  // Current date 
  const currentDate = new Date().toISOString().split('T')[0]; 
  // Function to filter objects 
  return bookings.filter(booking => new Date(booking.booking_date) > new Date(currentDate))
  .sort((a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime());
}

export const ZAR = new Intl.NumberFormat('en-za', {
  style: 'currency',
  currency: 'ZAR',
});

export const greeting = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good Morning,";
  } else if (hour < 17) {
    return "Good Afternoon, ";
  } else {
    return "Good Evening, ";
  }
};

export const  BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed", "missed"]