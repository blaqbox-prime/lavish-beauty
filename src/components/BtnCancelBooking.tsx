"use client"

import React, {useMemo, useState} from 'react'
import { Button } from './ui/button'
import { BanIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import BookingService from '@/services/BookingsService'
import LoadingAnimation from '@/components/LoadingAnimation'

type Props = {
    bookingId: string | number
}

function BtnCancelBooking({bookingId}: Props) {

    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const bookingService = useMemo(() => new BookingService(), [])

    const handleClick = async () => {
        // Call the API to cancel the booking
        setLoading(true);
        // Simulate a delay for loading animation
        const cancelled = await bookingService.updateBookingStatus(bookingId, 'cancelled')
        setLoading(false);
        // Redirect to the bookings page
        
        if (cancelled) {
            toast({
                title: "Booking cancelled successfully",
                description: `Booking #${bookingId} has been cancelled`,
            })
            router.replace('/admin/bookings')
        } else {
            toast({
                title: "Failed to cancel booking",
                description: `Failed to cancel booking #${bookingId}`,
                variant: "destructive",
            })
        }
        
    }

  return (
    <Button onClick={handleClick}
            disabled={loading}
            variant={"destructive"}
            className="absolute top-0 right-0 font-semibold"
          >
            {" "}
            {loading ? <LoadingAnimation size={14}/> : <BanIcon />} Cancel Booking
          </Button>
  )
}

export default BtnCancelBooking