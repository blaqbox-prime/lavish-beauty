import supabase from "@/database/supabase"
import { BookingRecord } from "@/types";
import { cache } from "react";


// Get all bookings after the Current Date.
export async function getUpcomingBookings(): Promise<BookingRecord[]> {
   const {data, error} = await supabase
  .from('bookings')
  .select('*, customer(*)')
  .gte('booking_date', new Date().toISOString())
  .order('booking_date',{ascending: true})

  if(error){
    throw new Error(error.message) 
  }

  return data;

}

// Get a single Bookings Details
export const getBookingDetails = cache( async (id: string | number) => {
    const { data: booking, error } = await supabase
    .from("bookings")
    .select("*, customer(*)")
    .eq("id", id)
    .single();
  console.log(booking);

  const { data: services, error: servicesError } = await supabase
    .from("booked_service")
    .select("*, services(*)")
    .eq("booking_id", Number(id));


    if(error || servicesError){
        console.log(error?.message,servicesError?.message)
      throw new Error('Failed to fetch booking details')
    }

    return {booking, services};

})

// Delete a Booking
export const deleteBooking = async (id: string | number): Promise<boolean> => {
  const { error } = await supabase
   .from("bookings")
   .delete()
   .eq("id", id);

   if (error) {console.log(error)}

  return error? false : true;
}

// Update Booking status
export const updateBookingStatus = async (id: string | number, status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'missed'): Promise<boolean> => {
  const { error } = await supabase
   .from("bookings")
   .update({ status })
   .eq("id", id);

   if (error) {console.log(error)}

  return error? false : true;
}