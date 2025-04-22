"use client";

import React, {useEffect, useMemo, useState} from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { BookingRecord, BookingStatus, ServiceRecord, Status } from "@/types";

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
import { Input } from "./ui/input";
import CustomButton from "./CustomButton";

const formSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().regex(/^[0-9]/i, 'Only numbers are allowed').max(10),
    date: z.date().min(new Date()),
    time: z.string().time(),
    services: z.array(z.number().min(1)),
    location: z.enum(AVAILABLE_LOCATIONS as [string, ...string[]]),
    status: z.enum(["pending", "confirmed", "cancelled", "completed", "missed"]),
});

type ClientBookingForm = {

};

function ClientBookingForm({className}: {className?:string}) {
    // Hooks -----------------------------------------------
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            services: [],
            status: BookingStatus.PENDING,
        },
    });
    const { toast } = useToast();
    const router = useRouter();

    // states --------------------------------------------------
    const [loading, setLoading] = React.useState(false);
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


        fetchServicesOptions();
    }, [clientService, servicesService]);


    // Event Handlers ------------------------------------------

    const createNewClient = async (client: any) => {
        const clientInfo: TablesInsert<'customer'> = {
            name: client.name + " " + client.lastName,
            email: client.email,
            phone: client.phone,
            created_at: new Date().toISOString(),
        };

        return await clientService.createClient(clientInfo);
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // setLoading(true);
        console.log(values);

        const clientInfo = {
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
        }


        const existsingClient = await clientService.getClientByEmail(clientInfo.email);
        console.log('Existing client: ', existsingClient)
        let client: any;
        if(!existsingClient){
            client = createNewClient(clientInfo);
            toast({
                title: `Hello ${clientInfo.name}`,
                description: "Thank you for booking with us",
                variant: "default",
                
            });
        } else {
            client = existsingClient;
            
            if(!(client.email == clientInfo.email && client.phone == clientInfo.phone && client.name.includes(clientInfo.name) && client.name.includes(clientInfo.lastName))){
                toast({
                    title: "Error creating booking",
                    description: "Email and/or phone number already in use",
                    variant: "destructive",
                    
                });
                return;
            } else {
                toast({
                    title: `Welcome back ${clientInfo.name}`,
                    description: "Thank you for booking with us again",
                    variant: "default",})
            }           

        }

        console.log(client)

        const bookingDate = values.date
        bookingDate.setHours(Number(values.time.split(':')[0]))
        bookingDate.setMinutes(Number(values.time.split(':')[1]))

        const bookingInfo = {
            customer_id: client?.id,
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
                description: `Please check your email for booking confirmation`,
            });

            router.push(`/admin/bookings/`);
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Your Name..." {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Your Surname..." {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                                <FormControl>
                                <Input placeholder="Your email address" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone No.</FormLabel>
                                <FormControl>
                                <Input placeholder="Your Cell Number" {...field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>

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

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    className="w-full"
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
                                 className="w-full"
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
               </div>

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <LocationPicker onChange={field.onChange} className="w-full" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                { services && <div className="flex justify-between items-center flex-col md:flex-row">
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

export default ClientBookingForm;
