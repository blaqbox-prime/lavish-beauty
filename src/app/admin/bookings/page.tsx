import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import * as motion from "framer-motion/client";
import TableOfBookings from "../_components/TableOfBookings";
import { useBookings } from "@/zustand/store";

import UpcomingBookings from "../_components/UpcomingBookings";
import { filterUpcomingBookings } from "@/lib/utils";
import BookingsView from "../_components/BookingsView";
import { BookingRecord } from "@/types";



async function Bookings() {
  
  const res = await fetch("http://localhost:3000/admin/bookings/api");
  const bookings = await res.json();

  return (
    <main>
      {/* Title */}
      <motion.h1
        className="font-bold text-2xl mb-4 opacity-0"
        animate={{ opacity: 1 }}
      >
        Your Appointments
      </motion.h1>
      {/* Banner to prompt creating a booking =========================================*/}

      <motion.section
        className="p-5 bg-amber-100 rounded-md relative mb-6 opacity-0"
        animate={{ opacity: 1 }}
      >
        {/* Text */}
        <h2 className="font-bold text-xl text-amber-950 ">
          Create An Appointment
        </h2>
        <p className="text-xs mb-4">Book a new session for a client</p>
        {/* Button */}
        <Button className="bg-amber-950 hover:bg-amber-900">
          {" "}
          <Plus className="text-amber-100" /> New Booking
        </Button>
        {/* image */}
      </motion.section>

      {/* Upcoming Bookings ========================================================= */}
      <UpcomingBookings bookings={filterUpcomingBookings(bookings)} />

      <BookingsView bookings={bookings || []} />
    </main>
  );
}

export default Bookings;
