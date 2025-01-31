
import { Plus } from "lucide-react";
import * as motion from "framer-motion/client";
import UpcomingBookings from "@/components/UpcomingBookings";
import BookingsView from "@/components/BookingsView";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookingForm from "@/components/BookingForm";


function Bookings() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 },
      }}
    >
      {/* Title */}
      <motion.h1
        className="font-bold text-2xl mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
      >
        Your Appointments
      </motion.h1>
      {/* Banner to prompt creating a booking =========================================*/}

      <motion.section
        className="p-5 bg-amber-100 rounded-md relative mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
      >
        {/* Text */}
        <h2 className="font-bold text-xl text-amber-950 ">
          Create An Appointment
        </h2>
        <p className="text-xs mb-4">Book a new session for a client</p>
        {/* Button */}
        <Dialog>
        <DialogTrigger className=" flex gap-2 p-2 text-white rounded-md bg-amber-950 hover:bg-amber-900">
          {" "}
          <Plus className="text-amber-100" /> New Booking
        </DialogTrigger>
        <DialogContent>
          <BookingForm />
        </DialogContent>
        </Dialog>
        {/* image */}
      </motion.section>

      {/* Upcoming Bookings ========================================================= */}
      <UpcomingBookings />

      <BookingsView />
    </motion.main>
  );
}

export default Bookings;
