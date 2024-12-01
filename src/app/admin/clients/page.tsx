import React from 'react'
import * as motion from "framer-motion/client";
import { UserPlus2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EditClientForm from '@/components/NewClientForm';
import { getAllClients } from '@/services/ClientsService';

import ClientsView from '@/components/ClientsView';

type Props = {}

async function Clients({}: Props) {
  
  const clients = await getAllClients();


  
  return (
    <motion.main role='page'
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
        Clients
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
        Add a new client
        </h2>
        <p className="text-xs mb-4">Manually add a client to your clients list for future bookings</p>
        {/* Button */}
        

        <Dialog>
          <DialogTrigger className="bg-amber-950 hover:bg-amber-900 text-white flex items-center gap-2 px-4 py-2 rounded-md text-sm">
            {" "}
            <UserPlus2 className="text-amber-100" /> New Client
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Client</DialogTitle>
              <DialogDescription>
                Add a new client to your business
              </DialogDescription>
            </DialogHeader>

            {/* The FORM */}
            <EditClientForm client={null} />
          </DialogContent>
        </Dialog>

        {/* image */}
      </motion.section>

        
      <ClientsView />
    </motion.main>
  )
}

export default Clients