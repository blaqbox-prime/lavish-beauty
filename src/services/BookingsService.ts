import supabase from "@/database/supabase"
import { BookingRecord } from "@/types";

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

export async function getBookingDetails(id: string | number){
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

}