import { BookingRecord, Status } from '@/types'
import React from 'react'
import * as motion from "framer-motion/client";
import { format } from "@formkit/tempo"
import StatusBadge from './StatusBadge';

type TBookingCard = {
  booking: BookingRecord
}

export default function BookingCard({booking}: TBookingCard) {
  return (
    <motion.article id={booking.id.toString()}
    className="p-5 flex items-start justify-between bg-amber-100 rounded-md relative opacity-0 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-200"
        animate={{ opacity: 1 }}
    >
      <div className="left">
      <p className='text-xs text-slate-500'>Booking #{booking.id}</p>
      <h1 className='font-bold text-amber-950'>{booking.customer?.name}</h1>
      <h2 className='text-sm'>{format(booking.booking_date, "full")}</h2>
      </div>

      <div className="right space-y-4">
        <p className='font-extrabold text-amber-950' >{format(booking.booking_date, { time: "short" })}</p>
        <StatusBadge status={booking.status as Status}/>
      </div>
    </motion.article>
  )
}