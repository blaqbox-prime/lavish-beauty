import React from 'react'
import ServicesService from "@/services/ServicesService";
import {ServiceRecord} from "@/types";
import {ZAR} from "@/lib/utils";
import * as motion from "framer-motion/client";
import ServicesLayout from "@/app/(client)/services/ServicesLayout";
import SectionHeading from "@/components/ui/SectionHeading";

type Props = {}



async function ServicesPage({}: Props) {
    const service = new ServicesService()
  // get services
  const services = await service.getAllServices();
  console.log(services)
  return (
    <main className="mx-8">
        <SectionHeading  title="Our Services" subtitle={
            "From glam makeovers to natural beauty touches\n" +
            "            get ready for flawless, unforgettable looks tailored to your style."
        }/>
        <ServicesLayout services={services}/>
    </main>
  )
}

export default ServicesPage