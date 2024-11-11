import supabase from '@/database/supabase'
import React from 'react'

async function BookingDetails({params}: {params: {id: string}}) {
  
    const {data: booking, error} = await supabase
    .from("bookings")
    .select("*, customer(*)")
    .eq("id", params.id).single();

    const {data: services, error: servicesError} = await supabase
    .from("booked_service")
    .select('*, services(*)')
    .eq("booking_id", Number(params.id)); 

    console.log(services)

    return (
    <main>
        <h1>Booking Details</h1>
    </main>
  )
}

export default BookingDetails