import BookingService from '@/services/BookingsService'
import React from 'react'

type Props = {}

async function TotalBookings({}: Props) {
    const bookingService = new BookingService()
    const totalBookings = await bookingService.getBookingsCount()

  return (
    <h4 className='text-4xl font-black'>32</h4>
  )
}

export default TotalBookings