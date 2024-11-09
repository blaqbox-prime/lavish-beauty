
import React from 'react'
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import * as motion from "framer-motion/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditServiceForm from '../_components/EditServiceForm';




type Props = {}

function page({}: Props) {
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
      {/* Banner to prompt creating a booking =========================================*/}

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
        

       <Dialog >
        <DialogTrigger className="bg-amber-950 hover:bg-amber-900 text-white flex items-center gap-2 px-4 py-2 rounded-md text-sm" >
                  {" "}
          <Plus className="text-amber-100" size={16}/> New Service
        
        </DialogTrigger>
        <DialogContent >
        <DialogHeader>
          <DialogTitle>Create A New Service</DialogTitle>
          <DialogDescription>Add a new service offering to your business</DialogDescription>
        </DialogHeader>

          {/* The FORM */}
          <EditServiceForm service={null} />

        </DialogContent>


       </Dialog>


        {/* image */}
      </motion.section>

    </motion.main>
  );
}

export default page