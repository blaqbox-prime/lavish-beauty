import React from "react";
import * as motion from "framer-motion/client";
import { format } from "@formkit/tempo";
import {
  MapPinHouse,
} from "lucide-react";
import BookingService from "@/services/BookingsService";
import BtnCancelBooking from "@/components/BtnCancelBooking";
import StatusBadge from "@/components/StatusBadge";

import ServiceCard from "@/components/ServiceCard";
import BookingActions from "@/components/BookingActions";
import { Status } from "@/types";

async function BookingDetails({ params }: { params: { id: string } }) {
  const bookingService = new BookingService();

  const {booking, services} = await bookingService.getBookingDetails(params.id)
  console.log('Services for id',booking.id,services); 

  
  return (
    booking && (
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delayChildren: 0.3,
            staggerChildren: 0.5,
          },
        }}
      >
        <header className="relative">
          <h4 className="text-3xl font-bold text-slate-300">#{booking?.id}</h4>
          <h1 className="text-2xl font-bold">
            {booking?.customer?.name.split(" ")[0]}{" "}
            <span className="text-amber-900">
              {booking?.customer?.name.split(" ")[1]}
            </span>{" "}
          </h1>
          <p className="text-2xl font-bold">
            {format(booking.booking_date, "full")}
          </p>
          <p className="text-2xl font-bold text-amber-900">
            {format(booking.booking_date, { time: "short" })}
          </p>
          <div className="flex gap-2 text-2xl font-bold">
          <MapPinHouse />
          <p>{booking.location as string}</p>
          </div>
          <StatusBadge status={booking.status as Status} />   

          {booking.status != 'cancelled' && <BtnCancelBooking bookingId={booking.id} />}

        </header>

        {/* Actions We Can Take */}

        <BookingActions booking={booking} services={services}/>

        <section title="Booked Services">
          <h2 className="text-2xl font-bold mb-2">Booked Services</h2>
          <motion.section
            className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            {/* {services && services */}
            {services &&
              services.map(({ service }) => {
                if (!service) return null;
                return (
                 
                    <ServiceCard service={service} key={service.id} />
            
                );
              })}
          </motion.section>
        </section>
      </motion.main>
    )
  );
}

export default BookingDetails;
