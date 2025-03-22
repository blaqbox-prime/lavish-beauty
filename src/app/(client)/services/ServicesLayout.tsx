"use client"

import {ServiceRecord} from "@/types";
import * as motion from "framer-motion/client";
import {ZAR} from "@/lib/utils";
import React from "react";
import Image from "next/image";

type Props = {
    services: ServiceRecord[] | null
}
function ServicesLayout({services}: Props) {
    // @ts-ignore
    // @ts-ignore
    return services == null ? null :
     (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-fit mx-auto gap-8 rounded-xl"}>
            {
                services?.map((service: ServiceRecord) => (
                    <motion.article
                        key={service.id}
                        className={"md:w-[300px] group drop-shadow-md hover:text-white transition duration-100 relative h-[500px] p-4 flex flex-col items-end justify-end overflow-hidden text-right text-amber-600 "}
                    >
                        {/*Image*/}
                        <Image
                        src={service.image as string}
                        alt={service.service_name}
                        width={300}
                        height={500}
                        className={"group-hover:scale-110 transition-all duration-500 absolute top-0 bottom-0 left-0 right-0 h-full object-cover -z-20 rounded-xl"}
                        />

                        {/*overlay*/}
                        <div className={"transition duration-200 absolute -z-10 group-hover:bg-amber-500 opacity-25 h-full w-full top-0 left-0"}></div>

                        <motion.h1
                            // initial={{y: 20}}
                            // whileHover={{y:0}}
                            className={"font-bold text-2xl transition-all duration-500"}>{service.service_name}</motion.h1>
                        <section>
                            <motion.p
                                className={"group-hover:text-white transition-all duration-500 text-black"}
                            >
                                {service.category} | {ZAR.format(service.price)}
                            </motion.p>
                        </section>
                    </motion.article>
                ))
            }
        </div>
    )
}

export default ServicesLayout;