import BookingService from '@/services/BookingsService'
import React from 'react'

type Props = {}

async function CompletedBookings({}: Props) {
    const bookingService = new BookingService()
    const completedBookings = await bookingService.getCompletedBookingsCount()

  return (
    <h4 className='text-2xl md:text-4xl font-black transition-all'>{completedBookings}</h4>
  )
}

export default CompletedBookings