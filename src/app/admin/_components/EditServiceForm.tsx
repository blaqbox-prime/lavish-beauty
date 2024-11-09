"use client"

import React from 'react'
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ServiceRecord } from '@/types'

const formSchema = z.object({
  service_name: z.string().min(4).max(50),
  price: z.number().min(10).max(999999),
  duration_in_minutes: z.number().min(10).max(120)
})


function EditServiceForm(service: ServiceRecord | null) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          service_name: service == null ? "" : service.service_name,
          price: service == null ? 10 : service.price,
          duration_in_minutes: service == null ? 60 : service.duration_in_minutes,
        },
      })
     

  return (
    <div>EditServiceForm</div>
  )
}

export default EditServiceForm