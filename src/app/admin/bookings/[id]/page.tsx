import React from "react";
import * as motion from "framer-motion/client";
import { format } from "@formkit/tempo";
import {
  AlarmClock,
  CalendarDays,
  HandCoins,
  MapPinHouse,
  Palette,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ActionCard from "@/components/ActionCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getBookingDetails } from "@/services/BookingsService";
import BtnCancelBooking from "@/components/BtnCancelBooking";
import StatusBadge from "@/components/StatusBadge";
import RescheduleForm from "@/components/RescheduleForm";
import ServiceCard from "@/components/ServiceCard";
import UpdateBookedServicesForm from "@/components/UpdateBookedServicesForm";

async function BookingDetails({ params }: { params: { id: string } }) {

  const {booking, services} = await getBookingDetails(params.id)
  console.log('Services for id',booking.id,services); 

  return (
    booking && (
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delayChildren: 0.3,
            staggerChildren: 0.5,
          },
        }}
      >
        <header className="relative">
          <h4 className="text-3xl font-bold text-slate-300">#{booking?.id}</h4>
          <h1 className="text-2xl font-bold">
            {booking?.customer?.name.split(" ")[0]}{" "}
            <span className="text-amber-900">
              {booking?.customer?.name.split(" ")[1]}
            </span>{" "}
          </h1>
          <p className="text-2xl font-bold">
            {format(booking.booking_date, "full")}
          </p>
          <p className="text-2xl font-bold text-amber-900">
            {format(booking.booking_date, { time: "short" })}
          </p>
          <div className="flex gap-2 text-2xl font-bold">
          <MapPinHouse />
          {booking.location}
          </div>
          <StatusBadge status={booking.status} />   

          {booking.status != 'cancelled' && <BtnCancelBooking bookingId={booking.id} />}

        </header>

        {/* Actions We Can Take */}

        <section className="my-8">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <Dialog>
                  <DialogTrigger asChild>
                    <ActionCard
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

                <ActionCard title="Update Booked Services" icon={<Palette />} />
                </DialogTrigger>
                  <DialogContent>
                    <UpdateBookedServicesForm booked_services={services}  booking_id={booking.id}/>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <ActionCard
                  title="Send Booking Reminder"
                  icon={<AlarmClock />}
                />
              </CarouselItem>
              <CarouselItem
                className={`sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer ${
                  !booking.status.toLocaleLowerCase().includes("pending") &&
                  "cursor-not-allowed hidden"
                }`}
              >
                <ActionCard
                  title="Send Payment Reminder"
                  icon={<HandCoins />}
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>

        <section title="Booked Services">
          <h2 className="text-2xl font-bold mb-2">Booked Services</h2>
          <motion.section
            className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
          >
            {/* {services && services */}
            {services &&
              services.map(({ service }) => {
                if (!service) return null;
                return (
                 
                    <ServiceCard service={service} key={service.id} />
            
                );
              })}
          </motion.section>
        </section>
      </motion.main>
    )
  );
}

export default BookingDetails;
