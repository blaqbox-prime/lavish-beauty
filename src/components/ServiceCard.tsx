import React from 'react'
import * as motion from "framer-motion/client";
import { Tables } from '@/database/database';
import { Clock4 } from 'lucide-react';
import { ZAR } from '@/lib/utils';
import Image from 'next/image';

type Props = {
    service: Tables<"services">
    className?: string
}

function ServiceCard({service, className = ''}: Props) {
  return (
    <motion.article
                        key={service.id}
                        className={`p-5 h-44 overflow-hidden flex items-start justify-between bg-amber-50 rounded-md relative opacity-0 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-100 ${className}`}
                        animate={{ opacity: 1 }}
                      >
                        <div className="left h-full flex flex-col justify-between z-10 pointer-events-none">
                          <p className="text-xs flex gap-2 text-amber-100 bright"> <Clock4 size={14}/> {service.duration_in_minutes} minutes</p>
                            <div className="bottom ">
                              <h1 className="font-bold text-xl text-amber-900 lg:text-2xl">{service.service_name}</h1>
                              <h2 className="text-sm font-bold text-amber-950 lg:text-xl">{ZAR.format(service.price)}</h2>
                          </div>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black absolute -bottom-3 -right-3 text-amber-950 opacity-15">{ZAR.format(service.price)}</h2>
                        <Image src={service.image || ''} alt="" width={200} height={150} className="w-full h-full object-cover rounded-md absolute top-0 left-0 brightness-50 hover:brightness-90 opacity-80 transition-all " />
                        </motion.article>
  )
}

export default ServiceCard