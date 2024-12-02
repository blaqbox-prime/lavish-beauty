import React from "react";
import supabase from "@/database/supabase";
import { NextResponse } from "next/server";
import * as motion from "framer-motion/client";
import DeleteServiceButton from "@/components/DeleteServiceButton";
import EditServiceForm from "@/components/EditServiceForm";
import Error from 'next/error'
import { getServiceById } from "@/services/ServicesService";


async function ServicePage({ params }: { params: { id: string } }) {
 
  const service = await getServiceById(params.id)

  if (!service) {
    return <Error statusCode={404} />
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.5 },
      }}
    >
      <div className="flex items-center justify-between">
        <motion.h1
          className="font-bold text-2xl mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          Edit Service:{" "}
          <span className="text-amber-900">{service.service_name}</span>
        </motion.h1>

        <DeleteServiceButton service={service} />
      </div>
      <EditServiceForm service={service} />
    </motion.main>
  );
}

export default ServicePage;
