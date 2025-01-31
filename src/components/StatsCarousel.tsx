import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { BookOpenText, PiggyBank, Users } from 'lucide-react'
import Link from 'next/link'
import TotalRevenue from './TotalRevenue'
import TotalBookings from './TotalBookings'
import ConfirmedBookings from './ConfirmedBookings'
import CompletedBookings from './CompletedBookings'

type Props = {}

function StatsCarousel({}: Props) {
  return (
    <section>
       <Carousel>
            <CarouselContent>

              <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <Link href={'/admin/clients'}>
                <div className={`"group  flex  my-2 relative flex-col items-left gap-4 font-semibold text-amber-50 bg-amber-700 hover:bg-amber-700 transition-all overflow-hidden hover:shadow-md hover:shadow-amber-800 rounded-lg p-4 text-ellipsis"`}>
                  <div className="flex gap-4 items-center">
                      <Users className=" md:block"/>
                      <div>
                      <p>Total Clients</p>
                      <p className='text-xs  md:block'>You have recorded so far</p>
                      </div>
                    </div>
                    <h4 className='text-xl md:text-4xl font-black'>14</h4>
                    <Users className='absolute bottom-5 right-5 opacity-5 scale-[400%]'/>
                </div>
                </Link>
              </CarouselItem>
            {/* ------------------------------------------------------ */}

            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <Link href={'/admin/bookings'}>
                <div className={`"group  flex my-2 relative flex-col items-left gap-4 font-semibold text-amber-50 bg-amber-700 hover:bg-amber-700 transition-all overflow-hidden hover:shadow-md hover:shadow-amber-800 rounded-lg p-4 text-ellipsis"`}>
                  <div className="flex gap-4 items-center">
                  <BookOpenText className=" md:block"/>
                      <div>
                      <p>Confirmed Bookings</p>
                      <p className='text-xs  md:block text-gray-200'>deposit has been made already</p>
                      </div>
                    </div>
                    <ConfirmedBookings />
                    <BookOpenText className='absolute bottom-5 right-5 opacity-5 scale-[400%]'/>
                </div>
                </Link>
              </CarouselItem>
            {/* ------------------------------------------------------ */}

            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <Link href={'/admin/bookings'}>
                <div className={`"group  flex my-2 relative flex-col items-left gap-4 font-semibold text-amber-50 bg-amber-700 hover:bg-amber-700 transition-all overflow- hover:shadow-md hover:shadow-amber-800 rounded-lg p-4 text-ellipsis"`}>
                  <div className="flex gap-4 items-center">
                  <BookOpenText className=" md:block"/>
                      <div>
                      <p>Completed Bookings</p>
                      <p className='text-xs  md:block text-gray-200'>fully paid up. Services rendered.</p>
                      </div>
                    </div>
                    <CompletedBookings />
                    <BookOpenText className='absolute bottom-5 right-5 opacity-5 scale-[400%]'/>
                </div>
                </Link>
              </CarouselItem>
            {/* ------------------------------------------------------ */}

            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer">
                <Link href={'/admin/bookings'}>
                <div className={`"group  flex my-2 relative flex-col items-left gap-4 font-semibold text-amber-50 bg-amber-700 hover:bg-amber-700 transition-all overflow- hover:shadow-md hover:shadow-amber-800 rounded-lg p-4 text-ellipsis"`}>
                  <div className="flex gap-4 items-center">
                  <PiggyBank className=" md:block"/>
                      <div>
                      <p>Total Revenue</p>
                      <p className='text-xs md:block text-gray-200'>total payments recieved.</p>
                      </div>
                    </div>
                    <TotalRevenue />
                    <PiggyBank className='absolute bottom-5 right-5 opacity-5 scale-[400%]'/>
                </div>
                </Link>
              </CarouselItem>
            {/* ------------------------------------------------------ */}


            </CarouselContent>
          </Carousel>
    </section>
  )
}

export default StatsCarousel