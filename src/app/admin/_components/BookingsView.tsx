"use client";

import { BookingRecord } from "@/types";
import React, { useEffect, useState } from "react";
import * as motion from "framer-motion/client";
import DateRangePicker from "./DateRangePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import TableOfBookings from "./TableOfBookings";
import CardListOfBookings from "./CardListOfBookings";
import { useBookings } from "@/zustand/store";
import Image from "next/image";
import BookingViewSkeleton from "./BookingViewSkeleton";
import _ from "lodash";
import { isAfter, isBefore } from "@formkit/tempo";

type TBookingsView = {
  bookings: BookingRecord[];
};

const BookingsView = ({}: TBookingsView) => {
  const loading = useBookings((state: any) => state.loading);
  const fromDate = useBookings((state: any) => state.startDate);
  const toDate = useBookings((state: any) => state.endDate);
  const getBookings = useBookings((state: any) => state.getBookings);
  const bookings = useBookings((state: any) => state.bookings);

  const [searchText, setSearchText] = useState("");

  const filteredBookings =
    fromDate && toDate
      ? _.filter(
          bookings,
          (booking: BookingRecord) =>
            isAfter(booking.booking_date, fromDate) &&
            isBefore(booking.booking_date, toDate)
        )
      : bookings;

  useEffect(() => {
    // Get Bookings
    getBookings();
  }, []);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
  };

  // Show when no data is available
  if (bookings.length == 0 && loading == false) {
    return (
      <div className="w-full text-center py-4 flex flex-col items-center gap-4">
        <Image
          src="/assets/images/undraw_booked.svg"
          width="200"
          height={200}
          alt="bookings"
          className="aspect-auto"
        />
        <h1 className="text-xl font-bold text-amber-950">
          No data yet. Get Started.
        </h1>
        <Button className="bg-amber-950 hover:bg-amber-900">
          {" "}
          <Plus className="text-amber-100" /> New Booking
        </Button>
      </div>
    );
  }

  // loading state
  if (loading == true) {
    return <BookingViewSkeleton />;
  } else
    return (
      <section>
        {/* Filters for the list => start date, end date, search box search btn =======================================*/}

        <section
          title="filters"
          className="md:flex items-center gap-4 w-full mb-2 "
        >
          {/* Dates */}

          <motion.div
            className="grid w-full md:w-fit items-center gap-1.5 opacity-0 mb-2 md:mb-0"
            animate={{ opacity: 1 }}
          >
            <DateRangePicker
              className="w-full"
              fromDate={fromDate}
              toDate={toDate}
            />
          </motion.div>

          {/* Search box */}
          <motion.div
            className="grid grid-cols-4 gap-4 opacity-0 md:flex md:flex-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Input
              type="search"
              placeholder="Search client name"
              className="col-span-4 md:flex-1 w-full"
              onChange={handleSearch}
              value={searchText}
              icon={<Search className="text-gray-500" size={16}/>}
            />
            
          </motion.div>
        </section>

        {/* Desktop View ==============================================================*/}
        {/* Table of bookings*/}
        <motion.div
          className="opacity-0 hidden md:flex md:flex-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TableOfBookings
            bookings={
              searchText.length > 0
                ? _.filter(filteredBookings, (booking: BookingRecord) =>
                    booking.customer?.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                : filteredBookings
            }
          />
        </motion.div>

        {/* Mobile View ============================================================*/}
        <motion.div
          className="opacity-0 md:hidden flex flex-col gap-4 mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CardListOfBookings
            bookings={
              searchText.length > 0
                ? _.filter(filteredBookings, (booking: BookingRecord) =>
                    booking.customer?.name
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                : filteredBookings
            }
          />
        </motion.div>
      </section>
    );
};

export default BookingsView;
