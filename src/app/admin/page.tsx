import GreetingTitle from '@/components/GreetingTitle';
import * as motion from "framer-motion/client";
import UpcomingBookings from '@/components/UpcomingBookings';
import { Metadata } from 'next';
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import BookingForm from '@/components/BookingForm';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import StatsCarousel from '@/components/StatsCarousel';
import BookingsSummary from '@/components/BookingsSummary';
import ServicesSummary from '@/components/ServicesSummary';

export const metadata: Metadata = {
    title: "Admin | Lavish Beauty",
    description: "Admin dashboard",
  };

function Dashboard() {
  return (
    <motion.main>
     <div className="flex mb-4 justify-between items-center transition-all animate-in">
       {/* Greeting */}
       <GreetingTitle username='Evelyn' className='text-3xl font-bold'/>
     </div>

     <motion.section
        className="p-5 bg-amber-100 rounded-md relative mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
      >
        {/* Text */}
        <h2 className="font-bold text-xl text-amber-950 ">
          Create An Appointment
        </h2>
        <p className="text-xs mb-4">Book a new session for a client</p>
        {/* Button */}
        <Dialog>
        <DialogTrigger className=" flex gap-2 p-2 text-white rounded-md bg-amber-950 hover:bg-amber-900">
          {" "}
          <Plus className="text-amber-100" /> New Booking
        </DialogTrigger>
        <DialogContent>
          <BookingForm />
        </DialogContent>
        </Dialog>
        {/* image */}
        <Image 
        src={'/assets/images/Makeup artist-bro.svg'}
        height={160}
        width={200}
        className="hidden md:block absolute -bottom-2 right-0 scale-150"
        alt='image'
        />
      </motion.section>


     {/* Stats */}
     <StatsCarousel />
     
    {/* Recent bookings */}

    <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        <div className="col-span-3">
        <BookingsSummary />
        </div>
        <div className="col-span-2">
        <ServicesSummary />
        </div>
    </section>
   
    </motion.main>
  )
}

export default Dashboard