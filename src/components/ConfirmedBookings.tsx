import { getBookingsCount, getCompletedBookingsCount, getConfirmedBookingsCount } from '@/services/BookingsService'
import React from 'react'

type Props = {}

async function ConfirmedBookings({}: Props) {

    const confirmedBookings = await getConfirmedBookingsCount()

  return (
    <h4 className='text-2xl md:text-4xl font-black transition-all'>{confirmedBookings}</h4>
  )
}

export default ConfirmedBookings