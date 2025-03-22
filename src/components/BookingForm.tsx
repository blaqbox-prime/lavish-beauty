"use client";

import React, {useEffect, useMemo, useState} from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export const dynamic = "force-dynamic";

import { BookingRecord, ServiceRecord, Status } from "@/types";

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
import supabase from "@/database/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { format } from "@formkit/tempo";
import ServicesService from "@/services/ServicesService";
import ClientService from "@/services/ClientsService";
import { DatePickerWithPresets } from "./DatePickerWithPresets";
import TimePicker from "./TimePicker";
import { ZAR } from "@/lib/utils";
import LocationPicker, { AVAILABLE_LOCATIONS } from "./LocationPicker";
import ServicesPicker from "./ServicesPicker";
import LoadingAnimation from "./LoadingAnimation";
import { Enums, Tables, TablesInsert } from "@/database/database";
import { forEach } from "lodash";
import BookingService from "@/services/BookingsService";
import { sendNotification } from "@/services/MailServices";

const formSchema = z.object({
  customer: z.number().min(1),
  date: z.date().min(new Date()),
  time: z.string().time(),
  services: z.array(z.number().min(1)),
  location: z.enum(AVAILABLE_LOCATIONS as [string, ...string[]]),
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
      date:
        booking == null
          ? addDays(new Date(), 1)
          : new Date(booking.booking_date),
      time:
        booking == null
          ? format(addDays(new Date(), 1), { time: "short" })
          : format(new Date(booking.booking_date), { time: "short" }),
      services: booking == null ? [] : [],
      status: booking == null ? "pending" : booking.status as Status,
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  // states --------------------------------------------------
  const [loading, setLoading] = React.useState(false);
  const [clients, setclients] = useState<any | null>([]);
  const [services, setServices] = useState<ServiceRecord[] | null>([]);
  const clientService = useMemo(() => new ClientService(), []);
  const servicesService = useMemo(() => new ServicesService(), []);
  const bookingService = new BookingService();
  
  // Get Form's Drop down menu options ----------------------------
  useEffect(() => {
    // fetch services
    const fetchServicesOptions = async () => {
      const services = await servicesService.getAllServices();
      if (services != null) {
        setServices(services);
      }
    };
    // fetch users
    const fetchUsersOptions = async () => {
      const clients = await clientService.getAllClients();
      if (clients != null) {
        setclients(clients);
      }
    };

    

    fetchServicesOptions();
    fetchUsersOptions();
  }, [clientService, servicesService]);

  // Set Services Default ---------------------------

  // Event Handlers ------------------------------------------

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    console.log(values);

    const bookingDate = values.date
    bookingDate.setHours(Number(values.time.split(':')[0]))
    bookingDate.setMinutes(Number(values.time.split(':')[1]))

    const bookingInfo = {
      customer_id: values.customer,
      booking_date: bookingDate.toISOString(),
      status: values.status,
      location: values.location as Enums<'Location'>,
    }

    const booking: BookingRecord | null = await bookingService.createBooking(bookingInfo);

    const bookedServicesInfo: any[] = []
    
    if(booking){
      forEach(values.services, (service_id) => {
        bookedServicesInfo.push({
          booking_id: booking.id,
          service_id,
        })
      })

      // Record services
      forEach(bookedServicesInfo, async (bookedService) => {
        await bookingService.createBookedService(bookedService)
      })

      setLoading(false)
      await sendNotification(booking)
      toast({
        title: "Booking created successfully",
        description: `Booking with ID: ${booking?.id} has been created`,
      });

      router.push(`/admin/bookings/`);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="font-bold text-2xl">Booking Form</h1>
        <p>Create a new appointment</p>

        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Client" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients?.map((client: any) => (
                    <SelectItem key={client.id} value={`${client.id}`}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Who is the booking for?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* List of Services */}

        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose services</FormLabel>
              <ServicesPicker field={field} onChange={field.onChange}/>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Booking date ---------------------------------------------------- */}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment date</FormLabel>
              <FormControl>
                <DatePickerWithPresets
                  onChange={field.onChange}
                  defaultDate={field.value}
                />
              </FormControl>
              <FormDescription>When is the appointment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Booking Time Slot ------------------------------------------------------------------------ */}

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <FormControl>
                <TimePicker 
                selectedDate={form.getValues('date')}
                onChange={(value) => {
                  const time = value.concat(":00")
                  field.onChange(time)
                  }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <LocationPicker onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        { services && <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <p className="text-slate-800">
              Deposit required:{" "}
              <span className="text-amber-900">
                {services.length == 0
                  ? "R0.00"
                  : ZAR.format(
                      services
                      .filter((service: ServiceRecord) =>
                        form.getValues('services').includes(service.id)
                      )
                      .reduce(
                        (total: number, service: ServiceRecord) =>
                          total + service.price,
                        0
                      ) * 0.5
                    )}
              </span>
            </p>
            <p className="text-lg font-bold">
              Booking total:{" "}
              <span className="text-amber-900">
                {services?.length == 0
                  ? "R0.00"
                  : ZAR.format(
                      services
                        ?.filter((service: ServiceRecord) =>
                          form.getValues('services').includes(service.id)
                        )
                        .reduce(
                          (total: number, service: ServiceRecord) =>
                            total + service.price,
                          0
                        )
                    )}
              </span>
            </p>
          </div>

          <Button type="submit" disabled={loading} className="bg-amber-800 text-white">{loading ? <LoadingAnimation className="" size={24} /> : "Confirm Booking"}</Button>

        </div>}
      </form>
    </Form>
  );
}

export default BookingForm;
