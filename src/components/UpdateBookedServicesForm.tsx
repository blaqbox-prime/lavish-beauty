"use client";

import { getAllServices } from "@/services/ServicesService";
import { ServiceRecord } from "@/types";
import React, { useEffect, useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import _ from "lodash";
import ServiceCard from "./ServiceCard";
import { ScrollArea } from "./ui/scroll-area";
import { ZAR } from "@/lib/utils";
import { Trash2Icon} from "lucide-react";
import { addServiceToBooking, removeServiceFromBooking } from "@/services/BookingsService";
import { toast } from "@/hooks/use-toast";
import LoadingAnimation from "./LoadingAnimation";

type Props = {
  booked_services: any;
  booking_id: string | number
};

function UpdateBookedServicesForm({ booked_services, booking_id}: Props) {
  console.log(booked_services);

  let booked_ids : number[] = booked_services.map((service: any) => service.service.id)
  const [selectedServices, setselectedServices] = useState(booked_ids);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // get services
    const fetchServices = async () => {
      setLoading(true);
      const data = await getAllServices();
      if (data) {
        console.log(data)
        setServices(data);
      } else {
        console.log("Failed to fetch services");
      }
      setLoading(false);
    };

    fetchServices()
  }, []);

  const handleAddServiceToBooking = async (service_id: number) => {
    setLoading(true)

    const booked_service = await addServiceToBooking(booking_id as number, service_id)
    
    if (booked_service){
      setselectedServices([...selectedServices, service_id])
      const service = services.find(s => s.id === service_id)
      toast({
        title: "Service added successfully",
        description: `${service?.service_name} has been added to the booking`,
      })
    }

    setLoading(false)
    
  }

  const handleRemoveServiceFromBooking = async (service_id: number) => {

    setLoading(true)

    const removed_service = await removeServiceFromBooking(booking_id as number, service_id)
    
    if (removed_service){
      setselectedServices(_.filter(selectedServices, (id) => id != service_id))
      const service = services.find(s => s.id === service_id)
      toast({
        title: "Service removed successfully",
        description: `${service?.service_name} has been removed from the booking`,
         variant: "destructive"
      })
    }
    setLoading(false)
  }

  return (
    <ScrollArea className="h-[500px]" >
      <DialogHeader>
        <DialogTitle>Update Booked Services</DialogTitle>
        <DialogDescription>
          Add or remove services from booking
        </DialogDescription>
      </DialogHeader>

        <section className="my-4">
            <h2 className=" font-bold mb-2">Selected</h2>
            <section title="options" className="grid grid-cols-2 gap-6">
                { 
                services.map((service: ServiceRecord) => {
                    if(selectedServices.includes(service.id)) return <article key={service.id} className="group relative" onClick={() => {handleRemoveServiceFromBooking(service.id)}}>
                      <Trash2Icon className={`"absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white transition-all opacity-0 group-hover:opacity-100" ${loading && 'hidden'}`} />
                      <LoadingAnimation size={48} className={`"absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white transition-all opacity-0 group-hover:opacity-100" hidden ${loading && 'block'}`} />
                      <ServiceCard service={service} key={service.id} className="hover:bg-red-900 transition-colors cursor-not-allowed"/></article>
                })}
            </section>
        </section>

        <Separator className="my-3"/>
        <section className="my-4">
            <h2 className="font-bold mb-2">Available Services</h2>
            <section title="options" className="grid grid-cols-2 gap-6">
                { 
                services.map((service: ServiceRecord) => {
                    if(!selectedServices.includes(service.id)) return <span key={service.id} onClick={() => {handleAddServiceToBooking(service.id)}} aria-disabled={loading}><ServiceCard service={service} key={service.id} className={`${loading ? 'cursor-not-allowed pointer-events-none filter grayscale transition-all' : ''}`}/></span>
                })}
            </section>
        </section>


<h3 className="my-3 font-medium text-lg">
  Services Total: 
  <span className="text-amber-900 font-bold ml-2">
    {services.length == 0 ? "R0.00" : ZAR.format(services
      .filter((service: ServiceRecord) => selectedServices.includes(service.id))
      .reduce((total: number, service: ServiceRecord) => total + service.price, 0)
    )}
  </span>
</h3>

    </ScrollArea>
  );
}

export default UpdateBookedServicesForm;
