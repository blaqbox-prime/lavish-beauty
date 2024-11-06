'use client'

import _ from 'lodash'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BookingRecord } from '@/types'
import React, { useEffect, useState } from 'react'
import StatusBadge from './StatusBadge'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type TTableOfBookings = {
    bookings: BookingRecord[]
}



function TableOfBookings({bookings = []}: TTableOfBookings) {
  
    const NUM_PAGES = bookings.length/10
    const [page, setPage] = useState(1)
    const [start, setStart] = useState(0)
    

    return (
    <section className='w-full'>
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
            {_.slice(bookings,start,page * 10).map((booking: BookingRecord) => (
                <TableRow key={booking.id}>
                    <TableCell>{booking?.id}</TableCell>
                    <TableCell>{booking.customer?.name}</TableCell>
                    <TableCell>{booking.customer?.email || 'No email address available'}</TableCell>
                    <TableCell>{new Date(booking.booking_date).toLocaleString()}</TableCell>
                    <TableCell>
                        <StatusBadge status={booking.status}/>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
            <TableCaption className='flex p-2 gap-4 items-center justify-center w-full '>
                <ArrowLeft className={`cursor-pointer ${page <= 1 && 'cursor-default pointer-events-none opacity-0'}`} 
                onClick={() => {
                    if(page > 1){
                        setStart(start - 10)
                    setPage(page - 1)
                    }
                }}/>
                <p>{page}</p>
                <ArrowRight className={`cursor-pointer ${page >= NUM_PAGES && 'cursor-default pointer-events-none opacity-0'}`}
                    onClick={() => {
                        if(page < NUM_PAGES){
                            setStart(start + 10)
                        setPage(page + 1)
                        }
                    }}
                    />
            </TableCaption>
    </section>
  )
}

export default TableOfBookings