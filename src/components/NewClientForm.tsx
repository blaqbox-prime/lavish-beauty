"use client";
import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ClientRecord } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import supabase from '@/database/supabase';
import { Input } from './ui/input';
import { LoaderCircle } from 'lucide-react';
import _ from 'lodash';

const formSchema = z.object({
    name: z.string({
        message: "Name must be at least 5 characters long and maximum 100 characters",
  
    }).min(5).max(100),
    email: z.string().email(),
    phone: z.string().max(9, 'Enter the last 9 digits of your phone number').regex(/^[0-9]/i, 'Only numbers are allowed'),
  });
  
  type ClientForm = {
    client?: ClientRecord | null;
  };

function EditClientForm({client}: ClientForm) {

    // Hooks -----------------------------------------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client == null ? "" : client.name,
      email: client == null ? "" : client.email,
      phone: client == null ? "" : client.phone,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  // states --------------------------------------------------
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log(values)

    const { data, error } = await supabase.from("customer").insert({
        email: values.email,
        phone: "+27".concat(values.phone),
        name: values.name,  
    });
    
    setLoading(false)

      if (error) {
        toast({
          title: "Failed to add client",
          description: error.message,
          variant: "destructive",
        });
      }

      console.log(data);

      toast({
        title: `${values.name} added successfully`,
      });

      form.reset();

  }

  return (
    <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Service Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Dineo Mashaba" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Name */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type='email' placeholder="thando@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Name */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="7449821025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
<div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            disabled={loading}
            className="border-amber-200 hover:bg-amber-50"
            type="reset"
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-amber-950 hover:bg-amber-900 transition-all"
          >
            {loading && <LoaderCircle className='animate-spin'/>}
            {loading ? "loading" : client ? "Update" : "Create"}
          </Button>
        </div>
        
         </form>
    </Form>
  )
}

export default EditClientForm