import { BookingRecord } from "@/types";
import React from "react";
import * as motion from "framer-motion/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "@formkit/tempo";
import { User } from "lucide-react";
import StatusBadge from "./StatusBadge";

type TUpcomingBookings = {
  bookings: BookingRecord[];
};

export default function UpcomingBookings({ bookings }: TUpcomingBookings) {
  return (
    <section className="mb-6">
      <motion.h1
        className="font-bold text-2xl mb-4 opacity-0"
        animate={{ opacity: 1 }}
      >
        Upcoming Bookings
      </motion.h1>

      <Carousel>
        <CarouselContent>
          {bookings && bookings.map((booking) => (
            <CarouselItem id={booking.id.toString()} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5 ">
                <article className="p-5 bg-amber-900 rounded-md relative flex items-start justify-between">
                    <div className="left">
                    <h1 className="font-black text-2xl opacity-30 text-amber-100">{format(booking.booking_date, {time: 'short'})}</h1>
                    <p className="text-sm -mt-1 text-amber-100">{format(booking.booking_date, 'full')}</p>
                    <p className="mt-10 flex gap-1 items-center text-amber-50"> <User /> {booking.customer?.name}</p>
                    <h1 className="font-black text-7xl opacity-5 text-amber-500 absolute -bottom-4 -right-8">{format(booking.booking_date, {time: 'short'})}</h1>
                    </div>
                    <div className="right">
                        <StatusBadge status={booking.status}/>
                    </div>
                </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
