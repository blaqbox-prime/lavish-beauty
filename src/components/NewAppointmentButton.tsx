import React from 'react'
import * as motion from "framer-motion/client";
import BookingForm from "@/components/BookingForm";
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Plus } from 'lucide-react';


type Props = {
    className?: string
}

function NewAppointmentButton({className = ""}: Props) {
  return (
    <div>
        <Dialog>
        <DialogTrigger className=" flex gap-2 p-2 text-white rounded-md bg-amber-950 hover:bg-amber-900">
          {" "}
          <Plus className="text-amber-100" /> New Booking
        </DialogTrigger>
        <DialogContent>
          <BookingForm />
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default NewAppointmentButton