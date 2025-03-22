import {Tables, TablesInsert} from "@/database/database";
import supabase from "@/database/supabase"
import {BookingRecord} from "@/types";
import _ from "lodash";

export default class BookingService {

  // Get all bookings after the Current Date.
  async getUpcomingBookings(){
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
  async getBookingDetails(id: string | number) {
    const { data: booking, error } = await supabase
        .from("bookings")
        .select("*, customer(*)")
        .eq("id", id)
        .single();
    console.log(booking);

    const { data: services, error: servicesError } = await supabase
        .from("booked_service")
        .select("*, service:services(*)")
        .eq("booking_id", Number(id));


    if(error || servicesError){
      console.log(error?.message,servicesError?.message)
      throw new Error('Failed to fetch booking details')
    }

    return {booking, services};

  }

// Delete a Booking
  async deleteBooking(id: string | number) {
    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {console.log(error)}

    return !error;
  }

// Update Booking status
  async updateBookingStatus (id: string | number, status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'missed'): Promise<boolean>{
    const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

    if (error) {console.log(error)}

    return !error
  }

// Get All Bookings For a Single Client
  async getBookingsByClientID(clientID: string): Promise<BookingRecord[] | null> {
    const { data, error } = await supabase
        .from("bookings")
        .select("*, customer(name, email)")
        .eq("customer_id", clientID)
        .order("booking_date", { ascending: false });

    if (error) { console.log(error); return null }

    return data;
  }

// Update a booking by Adding a service
  async addServiceToBooking (booking_id: number,service_id: number){
    const { data, error } = await supabase
        .from("booked_service")
        .insert({ booking_id, service_id })
        .select()

    if (error) { console.log(error); return null}
    return data;
  }

  // Update a booking by Adding a service
  async removeServiceFromBooking(booking_id: number, service_id: number) {
    const { data, error } = await supabase
        .from("booked_service")
        .delete()
        .eq("booking_id", booking_id)
        .eq("service_id", service_id)
        .select()

    if (error) { console.log(error); return null}
    return data;
  }

  // Create A New Booking
  async createBooking(booking: TablesInsert<'bookings'>) : Promise<BookingRecord | null> {
    const { data, error } = await supabase
        .from("bookings")
        .insert(booking)
        .select('*, customer(*)')

    if (error) { console.log(error); return null}
    return data[0];
  }

  async createBookedService(bookedService: TablesInsert<'booked_service'>) {
    const {data, error} = await supabase
        .from("booked_service")
        .insert(bookedService)
        .single()

    return data;
  }

  // Get Booking By ID
  async getBookingByID(id: string | number): Promise<BookingRecord | null>{
    const { data: booking, error } = await supabase
        .from("bookings")
        .select("*, customer(*)")
        .eq("id", id)
        .single();

    if (error) { console.log(error); return null }

    return booking;

  }

  // Get Total Number of Bookings
  async getBookingsCount(): Promise<number>{
    const { data, error } = await supabase
        .from("bookings")
        .select('*')

    return data?.length || 0;
  }

  // Get Total Number of completed Bookings
  async getCompletedBookingsCount(): Promise<number>{
    const { data, error } = await supabase
        .from("bookings")
        .select('*')
        .eq('status', 'completed')

    return data?.length || 0;
  }

  //Get Total Number of Confirmed Bookings
  async getConfirmedBookingsCount (): Promise<number> {
    const { data, error } = await supabase
        .from("bookings")
        .select('*')
        .eq('status', 'completed')

    return data?.length || 0;
  }

//   Get All Bookings
  async getAllBookings(limit?: number) : Promise<any[]> {
    const { data, error } = await supabase
        .from('bookings')
        .select(`*, customer(*) , services:booked_service(services(*))`)
        .limit(limit || 50)
        .order('booking_date',{ascending: false})


    if(error){
      console.error("error")
      return []
    }

    return data.map((item: any) => ({
      ...item,
      services: _.map(item.services, (bookedService: any) => bookedService.services),
    }));
  }

}

