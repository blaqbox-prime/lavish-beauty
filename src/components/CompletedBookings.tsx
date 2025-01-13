import { getBookingsCount, getCompletedBookingsCount } from '@/services/BookingsService'
import React from 'react'

type Props = {}

async function CompletedBookings({}: Props) {

    const completedBookings = await getCompletedBookingsCount()

  return (
    <h4 className='text-2xl md:text-4xl font-black transition-all'>{completedBookings}</h4>
  )
}

export default CompletedBookings