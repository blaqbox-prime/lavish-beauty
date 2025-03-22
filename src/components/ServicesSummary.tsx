import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import supabase from '@/database/supabase';
import * as motion from "framer-motion/client";
import { Tables } from '@/database/database';
import Link from 'next/link';
import ServiceCard from './ServiceCard';
import ServicesService from '@/services/ServicesService';
import { Plus } from 'lucide-react';

type Props = {}

async function ServicesSummary({}: Props) {

    // TODO: add getAllCategories to ServicesService
    const { data, error } = await supabase
        .from('categories')
        .select('*')
    
    if(error){
        return null;
    }

    const categories = data;

  // await getTop5Services()
    const servicesService = new ServicesService()
    const services: any[] | null = await servicesService.getTop5Services(); //services
  
    return (
    <Card className="overflow-y-auto">
        <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <h2>Top 5 Services</h2>
          <Link href="/admin/services/new" className="bg-amber-600 text-white p-1 rounded-full">
            <Plus />
          </Link>
          </CardTitle>
        <CardDescription>Manage your services</CardDescription>
      </CardHeader>

        <CardContent>
        <motion.section title="services available">
        <motion.section
                className="grid grid-cols-2 gap-4 mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
              >
                {services && services
                  .map((service: Tables<"services">) => {
                    return (
                      <Link href={'/admin/services/'+service.id} key={service.id} className={''}>
                      <ServiceCard service={service} key={service.id} />
                      </Link>
                    )
                  })}
              
              </motion.section>
      </motion.section>
        </CardContent>

    </Card>
  )
}

export default ServicesSummary