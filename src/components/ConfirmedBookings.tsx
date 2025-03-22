import BookingService from '@/services/BookingsService'
import React from 'react'

type Props = {}

async function ConfirmedBookings({}: Props) {
    const bookingService = new BookingService()
    const confirmedBookings = await bookingService.getConfirmedBookingsCount()

  return (
    <h4 className='text-2xl md:text-4xl font-black transition-all'>{confirmedBookings}</h4>
  )
}

export default ConfirmedBookings