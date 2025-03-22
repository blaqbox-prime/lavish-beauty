import React from 'react'
import ServicesService from "@/services/ServicesService";
import {ServiceRecord} from "@/types";
import {ZAR} from "@/lib/utils";
import * as motion from "framer-motion/client";
import ServicesLayout from "@/app/(client)/services/ServicesLayout";

type Props = {}

async function ServicesPage({}: Props) {
    const service = new ServicesService()
  // get services
  const services = await service.getAllServices();
  console.log(services)
  return (
    <main className="mx-8">
        <h1 className={`text-4xl text-center w-full text-amber-800 my-8
            after:block after:h-[2px] after:w-[50px] after:origin-center after:bg-amber-800 after:bottom-0 after:mx-auto
            after:animate-pulse animate-infinite`}>Our Services</h1>
        <p className={"mx-auto text-lg text-center w-[500px] mb-8 "}>From glam makeovers to natural beauty touches
            get ready for flawless, unforgettable looks tailored to your style.</p>
        <ServicesLayout services={services}/>
    </main>
  )
}

export default ServicesPage