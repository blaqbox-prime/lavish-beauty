import { fetchClientById as getClientById } from "@/services/ClientsService";
import React from "react";
import * as motion from "framer-motion/client";
import { NextResponse } from "next/server";
import { redirect, useRouter } from "next/navigation";
import { NextURL } from "next/dist/server/web/next-url";
import { toast } from "@/hooks/use-toast";
import { getBookingsByClientID } from "@/services/BookingsService";
import TableOfBookings from "../../_components/TableOfBookings";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ActionCard from "@/components/ActionCard";
import { AlarmClock, CalendarDays, HandCoins, Palette, User2 } from "lucide-react";
import DeleteClientButton from "@/components/DeleteClientButton";



async function ClientDetailsPage({ params }: { params: { id: string } }) {
  
  const client = await getClientById(params.id);
  console.info(client);

  if (!client) {
    return redirect('/admin/clients')
  }

  const bookings = await getBookingsByClientID(params.id);

  return (
    <motion.main
      className="relative"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 },
      }}
    >

      <DeleteClientButton client={client} className="absolute top-0 right-0"/>

      {/* Names and Personal Details*/}
      <motion.div
        className="font-bold text-2xl mb-4"
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          // dur: 4
        }}
      >
        <h1>{client?.name.split(' ')[0]} <span className="text-amber-800">{client?.name.split(' ')[1]}</span></h1>
        <a href={`mailto:${client?.email}`} className="block text-slate-800 hover:text-amber-800">{client?.email}</a>
        <a href={`tel:${client?.phone}`}className="block text-slate-800 hover:text-amber-800">{client?.phone}</a>
      </motion.div>

      {/* Actions */}

      <section className="my-8">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <ActionCard
                      title="Schedule Appointment"
                      icon={<CalendarDays />}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    {/* <RescheduleForm /> */}
                  </DialogContent>
                </Dialog>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 cursor-pointer">
                <ActionCard title="Update Client Details" icon={<User2 />} />
              </CarouselItem>
              </CarouselContent>
          </Carousel>
        </section>
      
      {/* Booking History */}

        <section>
          <h2 className="font-bold text-2xl mb-4" >Booking History</h2>
          <TableOfBookings bookings={bookings ?? []} />

          
        </section>

    </motion.main>
  );
}

export default ClientDetailsPage;
