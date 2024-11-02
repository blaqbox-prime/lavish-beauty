"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import React, { useEffect } from "react";
import * as motion from "framer-motion/client";
import TableOfBookings from "../_components/TableOfBookings";
import { useBookings } from "@/zustand/store";

type Props = {};

function Bookings() {
  const getBookings = useBookings((state: any) => state.getBookings);
  const bookings = useBookings((state: any) => state.bookings);

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <main>
      {/* Title */}
      <motion.h1
        className="font-bold text-2xl mb-4 opacity-0"
        animate={{ opacity: 1 }}
      >
        Your Appointments
      </motion.h1>
      {/* Banner to prompt creating a booking */}

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

      {/* Filters for the list => start date, end date, search box search btn */}

      <section title="filters" className="md:flex items-center gap-4 w-full ">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-4  md:flex">
          <motion.div
            className="grid w-full md:w-fit max-w-sm items-center gap-1.5 opacity-0"
            animate={{ opacity: 1 }}
          >
            <Label htmlFor="start_date">Start date</Label>
            <Input
              type="date"
              id="start_date"
              placeholder="Select start date"
            />
          </motion.div>
          <motion.div
            className="grid w-full md:w-fit max-w-sm items-center gap-1.5 opacity-0"
            animate={{ opacity: 1 }}
          >
            <Label htmlFor="end_date">End date</Label>
            <Input type="date" id="end_date" placeholder="Select end date" />
          </motion.div>
        </div>
        {/* Search box */}
        <motion.div
          className="grid grid-cols-4 gap-4 opacity-0 md:flex md:flex-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Input
            type="search"
            placeholder="Search client name"
            className="col-span-3 md:flex-1 w-full"
          />
          <Button
            className="bg-amber-950 hover:bg-amber-900 col-span-1 "
            type="submit"
          >
            {" "}
            <Search /> Search
          </Button>
        </motion.div>
      </section>

      {/* Table of bookings */}
      <motion.div
        className="opacity-0 md:flex md:flex-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TableOfBookings bookings={bookings || []} />
      </motion.div>
    </main>
  );
}

export default Bookings;
