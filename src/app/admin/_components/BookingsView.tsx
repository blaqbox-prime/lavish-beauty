"use client"

import { BookingRecord } from '@/types'
import React from 'react'
import * as motion from "framer-motion/client";
import DateRangePicker from './DateRangePicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import TableOfBookings from './TableOfBookings';
import CardListOfBookings from './CardListOfBookings';
import { useBookings } from '@/zustand/store';

type TBookingsView = {
    bookings: BookingRecord[]
}

const BookingsView = ({bookings}: TBookingsView) => {

    const fromDate = useBookings((state: any) => state.startDate)
    const toDate = useBookings((state: any) => state.endDate)
    // const fromDate = useBookings((state: any) => state.startDate)

  return (
    <section>
        {/* Filters for the list => start date, end date, search box search btn =======================================*/}

      <section title="filters" className="md:flex items-center gap-4 w-full ">
        {/* Dates */}
        
          <motion.div
            className="grid w-full md:w-fit items-center gap-1.5 opacity-0 mb-2 "
            animate={{ opacity: 1 }}
          >
            <DateRangePicker className="w-full" fromDate={fromDate} toDate={toDate}/>
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

      {/* Desktop View ==============================================================*/}
      {/* Table of bookings*/}
      <motion.div
        className="opacity-0 hidden md:flex md:flex-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <TableOfBookings bookings={bookings || []} />
      </motion.div>

      {/* Mobile View ============================================================*/}
      <motion.div
        className="opacity-0 md:hidden flex flex-col gap-4 mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CardListOfBookings bookings={bookings || []}/>
      </motion.div>

    </section>
  )
}

export default BookingsView