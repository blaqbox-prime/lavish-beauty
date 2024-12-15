'use client'
import { toast } from '@/hooks/use-toast';
import { sendBookingReminder, sendDepositReminder } from '@/services/MailServices';
import { BookingRecord } from '@/types';
import React, { useState } from 'react'
import {
    AlarmClock,
    CalendarDays,
    HandCoins,
    Palette,
  } from "lucide-react";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import ActionCard from "@/components/ActionCard";
  import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RescheduleForm from './RescheduleForm';
import UpdateBookedServicesForm from './UpdateBookedServicesForm';
import { DepositData } from '@/emails/DepositReminder';
import { addDay } from '@formkit/tempo';
import supabase from '@/database/supabase';
import _ from 'lodash';
import LoadingAnimation from './LoadingAnimation';



function BookingActions({booking, services}: {booking: BookingRecord, services: any}) {

    const [loading, setLoading] = useState<boolean>(false)

    const handleBookingReminder = async() => {
        setLoading(true)
        await sendBookingReminder(booking);
        toast({
          title: "Booking Reminder Sent",
          description: "A reminder has been sent to the client for this booking.",
        })
        setLoading(false)
      }

      const handleDepositReminder = async() => {
        setLoading(true)

        // Loading notification
        toast({
          description: <div className='flex items-center gap-2'>< LoadingAnimation size={24}/>Sending email notification</div>,
        })

        // get services
        const {data, error} = await supabase.from('booked_service')
        .select('booking_id, service:services(price)')
        .eq('booking_id', booking.id)
        
        const depositAmnt = _.reduce(data, (total, item: any) => total + item.service?.price,0) * 0.5

        console.log('services: ', data, depositAmnt)

        const depositData : DepositData = {
            name: booking.customer?.name,
            deadline_date: addDay(booking.booking_date, -1),
            deposit: depositAmnt
          }

        await sendDepositReminder(depositData,booking.customer?.email);

        toast({
          title: "Deposit Reminder Sent",
          description: "A reminder has been sent to the client for this booking.",
        })
        setLoading(false)
      }
    

  return (
    <section className="my-8">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <ActionCard
                    disabled={loading}
                      title="Reschedule Appointment"
                      icon={<CalendarDays />}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <RescheduleForm />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
              <Dialog>
              <DialogTrigger asChild>

                <ActionCard
                disabled={loading} title="Update Booked Services" icon={<Palette />} />
                </DialogTrigger>
                  <DialogContent>
                    <UpdateBookedServicesForm booked_services={services}  booking_id={booking.id}/>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <ActionCard
                disabled={loading}
                  title="Send Booking Reminder"
                  icon={<AlarmClock />}
                  onClick={handleBookingReminder}
                />
              </CarouselItem>
              <CarouselItem
                className={`sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer ${
                  !booking.status.toLocaleLowerCase().includes("pending") &&
                  "cursor-not-allowed hidden"
                }`}
              >
                <ActionCard
                disabled={loading}
                  title="Send Payment Reminder"
                  icon={<HandCoins />}
                  onClick={handleDepositReminder}
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
  )
}

export default BookingActions