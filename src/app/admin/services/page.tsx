import React from "react";

import { Plus } from "lucide-react";
import * as motion from "framer-motion/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tables } from "@/database/database";
import { BASE_URL, ZAR } from "@/lib/utils";
import Link from "next/link";
import supabase from "@/database/supabase";
import { NextResponse } from "next/server";
import ServiceCard from "@/components/ServiceCard";
import EditServiceForm from "@/components/EditServiceForm";

type Props = {};


async function getAllServices() {
  const res = await supabase
      .from('services')
      .select('*')

  const services = res.data;
  return services;
}

async function page({}: Props) {
  const { data, error } = await supabase
  .from('categories')
  .select('*')
    
  if(error){
    return NextResponse.json({"message": error.message})
  }

  const categories = data;

  const services = await getAllServices(); //services

  console.log(categories, services);

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 },
      }}
    >
      {/* Title */}
      <motion.h1
        className="font-bold text-2xl mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
      >
        Your Services
      </motion.h1>

      {/* Banner to prompt creating a Service =========================================*/}

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
          Create A New Service
        </h2>
        <p className="text-xs mb-4">Expand the services that you provide</p>
        {/* Button */}

        <Dialog>
          <DialogTrigger className="bg-amber-950 hover:bg-amber-900 text-white flex items-center gap-2 px-4 py-2 rounded-md text-sm">
            {" "}
            <Plus className="text-amber-100" size={16} /> New Service
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create A New Service</DialogTitle>
              <DialogDescription>
                Add a new service offering to your business
              </DialogDescription>
            </DialogHeader>

            {/* The FORM */}
            <EditServiceForm service={null} />
          </DialogContent>
        </Dialog>
      </motion.section>

      {/* Services List  */}
      <motion.section title="services available">
        {categories.map((category: Tables<"categories">) => {
          return (
            <section title={category.name} key={category.id}>
              <motion.h2
                className="font-bold text-2xl mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
              >
                {category.name}
              </motion.h2>

              <motion.section
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
              >
                {services && services
                  .filter((service: Tables<"services">) => service.category == category.name)
                  .map((service: Tables<"services">) => {
                    return (
                      <Link href={'/admin/services/'+service.id} key={service.id} className={''}>
                      <ServiceCard service={service} key={service.id} />
                      </Link>
                    )
                  })}
              
              </motion.section>
           
            </section>
          );
        })}
      </motion.section>
    </motion.main>
  );
}

export default page;
