"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";export const dynamic = 'force-dynamic'

import { BookingRecord, ServiceRecord } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import supabase from "@/database/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/database/database";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { addDays } from "date-fns";
import { format } from "@formkit/tempo";
import { getAllServices } from "@/services/ServicesService";
import { getAllClients } from "@/services/ClientsService";

const formSchema = z.object({
  customer: z.number().min(1),
  date: z.date().min(new Date()),
  time: z.string().time(),
  services: z.array(z.number().min(1)),
  status: z.enum(["pending", "confirmed", "cancelled", "completed", "missed"]),
});

type BookingForm = {
  booking?: BookingRecord | null;
};

function BookingForm({ booking }: BookingForm) {

  // Hooks -----------------------------------------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: booking == null ? -1 : booking.customer_id,
      date: booking == null ? addDays(new Date(), 1) : new Date(booking.booking_date),
      time: booking == null ? format(addDays(new Date(), 1), { time: "short" }) : format(new Date(booking.booking_date), { time: "short" } ),
      services: booking == null ? [] : [],
      status: booking == null ? "pending" : booking.status,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  // states --------------------------------------------------
  const [loading, setLoading] = React.useState(false);
  const [clients, setclients] = useState<any | null>([]);
  const [services, setServices] = useState<any | null>([]);

  // Get Form's Drop down menu options ----------------------------

  useEffect(() => {
       // fetch services
       const fetchServicesOptions = async () => {
           const services = await getAllServices();
           if (services != null) {
               setServices(services);
           }
       }
    // fetch users
    const fetchUsersOptions = async () => {
        const clients = await getAllClients()
        if (clients != null) {
            setclients(clients)
        }
    }

    fetchServicesOptions()
    fetchUsersOptions()

  }, []);

  // Set Services Default ---------------------------


  // Event Handlers ------------------------------------------

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

      </form>
    </Form>
  );
}

export default BookingForm;
