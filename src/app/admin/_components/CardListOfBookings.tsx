'use client'


import { BookingRecord } from '@/types'
import _ from 'lodash'
import React from 'react'
import BookingCard from './BookingCard'
import { useBookings } from '@/zustand/store'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type TCardListOfBookings = {
    bookings: BookingRecord[]
}

export default function CardListOfBookings({bookings = []}: TCardListOfBookings) {
  
    const NUM_PAGES = bookings.length / 10;
    const page = useBookings((state: any) => state.page)
    const start = useBookings((state: any) => state.start)
    const setPage = useBookings((state: any) => state.setPage)
    const setStart = useBookings((state: any) => state.setStart)
  
    return (
    <>
          {_.slice(bookings,start,page * 10).map((booking: BookingRecord) =>(
          <Link href={`/admin/bookings/${booking.id}`} key={booking.id.toString()}>
          <BookingCard booking={booking} />
          </Link>
        ))}
        <div className='flex p-2 gap-4 items-center justify-center w-full '>
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
            </div>

    </>
  )
}