import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import BookingService from '@/services/BookingsService'
import DataTable from './DataTable'

type Props = {
    
}



async function BookingsSummary({}: Props) {
    const bookingService = new BookingService();
    const data = await bookingService.getAllBookings();
  
    return (
    <Card>
        <CardHeader>
        <CardTitle className="text-xl">Latest Bookings</CardTitle>
        <CardDescription>Manage your bookings</CardDescription>
      </CardHeader>

        <CardContent>
            <DataTable data={data}/>
        </CardContent>

    </Card>
  )
}

export default BookingsSummary