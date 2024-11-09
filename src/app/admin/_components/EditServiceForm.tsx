"use client";

import React, { useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ServiceRecord } from "@/types";

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
import supabase from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  service_name: z.string().min(4).max(50),
  price: z.coerce.number().min(10).max(999999),
  duration_in_minutes: z.coerce.number().min(10).max(120),
});

type ServiceForm = {
  service?: ServiceRecord | null;
};

function EditServiceForm({ service }: ServiceForm) {
  // Hooks -----------------------------------------------
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_name: service == null ? "" : service.service_name,
      price: service == null ? 500 : service.price,
      duration_in_minutes: service == null ? 60 : service.duration_in_minutes,
    },
  });

  const { toast } = useToast();

  // states --------------------------------------------------
  const [loading, setLoading] = React.useState(false);
  const [previewImages, setPreviewImages] = useState<any | null>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // Upload the image and return a public URL of that image
    setLoading(true);
    const imagePicker = document.getElementById(
      "imagePicker"
    ) as HTMLInputElement;
    const files = imagePicker?.files;
    // upload images and get urls
    const images = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const { data, error } = await supabase.storage
          .from("pictures")
          .upload(`public/${file.name}`, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          toast({
            title: `Something went wrong uploading ${file.name}: `,
            description: error.message,
          });
          setLoading(false);
          return;
        }

        const imagePath = data.path;

        // record the full record into the profiles table
        const {
          data: { publicUrl },
        } = supabase.storage.from("pictures").getPublicUrl(imagePath);
        //add the public url to the images array
        images.push(publicUrl);
      }

      if (service != null) {
        const { data, error } = await supabase
        .from("services")
        .update({
          service_name: values.service_name,
          price: values.price,
          duration_in_minutes: values.duration_in_minutes,
          image: images[0],
        }).eq("id", service.id);

        if (error) {
          toast({
            title: "Failed to Update service",
            description: error.message,
            variant: "destructive",
          });
        }

        toast({
          title: "Success",
          description: "Service Updated successfully",
        });

    } else {
        const { data, error } = await supabase
        .from("services")
        .insert({
          service_name: values.service_name,
          price: values.price,
          duration_in_minutes: values.duration_in_minutes,
          image: images[0],
        });

        if (error) {
          toast({
            title: "Failed to create service",
            description: error.message,
            variant: "destructive",
          });
        }

        console.log(data)

        toast({
          title: "Success",
          description: "Service Created successfully",
        });

        form.reset();
        setPreviewImages([]);
    }
  }
    setLoading(false);
    
  }

  const handleFileSelect = (event: { target: any }) => {
    const imagePicker = event.target;
    const files = imagePicker.files;

    // Clear any existing preview images
    setPreviewImages([]);

    if (!files.length) {
      toast({ title: "No files selected", variant: "default" });
      return;
    } // Handle no files selected gracefully

    const previewImages: any[] = []; // Array to store preview URLs
    const allowedMimeTypes = ["image/jpeg", "image/png"]; // Allowed image types

    // Loop through selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type
      if (!allowedMimeTypes.includes(file.type)) {
        toast({
          title: `Invalid file type: ${file.name}`,
          variant: "destructive",
        });
        console.error(`Invalid file type: ${file.name}`);
        continue; // Skip to next file if invalid type
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          previewImages.push(e.target.result);
          setPreviewImages(previewImages);
        }
      };
      reader.readAsDataURL(file); // Read the file into a data URL for preview
    }
    // set the first image as the cover image
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Service Name */}
        <FormField
          control={form.control}
          name="service_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Bridal Makeup" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Price */}

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number"  {...field} />
              </FormControl>
              <FormDescription>Service price in Rands</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration */}

        <FormField
          control={form.control}
          name="duration_in_minutes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={30}
                  max={120}
                  step={30}
                  placeholder="500.00"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                How long does this take? (in increments of 30 mins)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center w-full">
          <FormLabel
            htmlFor="imagePicker"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:hover:border-amber-500 dark:hover:bg-amber-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="imagePicker"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
          </FormLabel>
        </div>
        {/* Preview Images */}
        {previewImages.length > 0 && (
          <>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
              {previewImages.map(
                (
                  previewImage: string | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <li key={index}>
                    <img
                      src={previewImage}
                      alt={`Uploaded image ${index}`}
                      className={`object-cover object-center rounded-md shadow-sm h-48 w-full shadow-slate-400 animate-in fade-in-25 ease-in-out`}
                    />
                  </li>
                )
              )}
            </ul>
          </>
        )}

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            disabled={loading}
            className="border-amber-200 hover:bg-amber-50"
            type="reset"
            onClick={() => {
              form.reset();
              setPreviewImages([]);
            }}
          >
            Reset
          </Button>
          <Button type="submit" disabled={loading} className="bg-amber-950 hover:bg-amber-900">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditServiceForm;
