
import { BookingRecord } from "@/types";
import React from "react";
import * as motion from "framer-motion/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { format } from "@formkit/tempo";
import { User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { BASE_URL } from "@/lib/utils";
import { NextResponse } from "next/server";
import supabase from "@/database/supabase";
import { getUpcomingBookings } from "@/services/BookingsService";

type TUpcomingBookings = {
  bookings: BookingRecord[];
};


export default async function UpcomingBookings() {
  
  
  const bookings: BookingRecord[] = await getUpcomingBookings()

  if (!bookings || bookings.length == 0) {
    return null
  }

  return (
    <motion.section className="mb-6"
    >
      <motion.h1
        className="font-bold text-2xl mb-4"
        animate={{ opacity: 1 }}
      >
        Upcoming Bookings
      </motion.h1>

      <Carousel>
        <CarouselContent>
          {bookings &&
            bookings.map((booking: BookingRecord, idx: number) => (
              <CarouselItem
                key={booking.id.toString() || idx}
                className="sm:basis-1/2 lg:basis-1/4 cursor-pointer"
              >
                <article className="p-5 bg-amber-900 hover:bg-amber-800 rounded-md relative flex h-44 items-start justify-between">
                  <div className="left flex flex-col h-full justify-between">
                    <div className="flex-1">
                      <h1 className="font-black text-2xl opacity-30 text-amber-100">
                        {format(booking.booking_date, { time: "short" })}
                      </h1>
                      <p className="text-sm -mt-1 text-amber-100">
                        {format(booking.booking_date, "full")}
                      </p>
                    </div>
                    <p className="flex gap-1 items-center text-amber-50">
                      {" "}
                      <User /> {booking.customer?.name}
                    </p>
                    <h1 className="font-black text-7xl opacity-5 text-amber-500 absolute -bottom-4 -right-8">
                      {format(booking.booking_date, { time: "short" })}
                    </h1>
                  </div>
                  <div className="absolute top-[1rem] right-[1rem]">
                    <StatusBadge status={booking.status} />
                  </div>
                </article>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </motion.section>
  );
}
