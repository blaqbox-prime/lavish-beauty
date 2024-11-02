import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

type TTableOfBookings = {
    bookings: BookingRecord[]
}

export type BookingRecord = {
   id: number,
    customer_id: number,
    booking_date: Date,
    status: "Confirmed" | "Pending deposit" | "Cancelled",
    created_at: Date, 
    customer?: CustomerRecord
}

export type CustomerRecord = {
    id: number,
      name: string,
      email: string,
      phone: string,
      created_at: Date
}

function TableOfBookings({bookings = []}: TTableOfBookings) {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Booked</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {bookings.map((booking: BookingRecord) => (
                <TableRow key={booking.id}>
                    <TableCell>{booking?.id}</TableCell>
                    <TableCell>{booking.customer?.name}</TableCell>
                    <TableCell>{booking.customer?.email || 'No email address available'}</TableCell>
                    <TableCell>{new Date(booking.booking_date).toLocaleString()}</TableCell>
                    <TableCell><Badge
                    className={`${booking.status == 'Confirmed' && 'bg-green-600 hover:bg-green-500'}
                    ${booking.status == 'Pending deposit' && 'bg-orange-600 hover:bg-orange-500'}
                    ${booking.status == 'Cancelled' && 'bg-red-600 hover:bg-red-500'}`}
                    >{booking.status}</Badge></TableCell>
                </TableRow>
            ))}
        </TableBody>

    </Table>
  )
}

export default TableOfBookings