"use client";
import React, {useLayoutEffect, useState} from 'react'
import Image from "next/image";
import {images} from "@/constants";
import {AnimatePresence, motion} from "motion/react";

type Props = {
    title: string,
    subtitle: string
}


function IntroSlide({title, subtitle} : Props) {

    const [isVisible, setIsVisible] = useState(true)

    useLayoutEffect(() => {
        setTimeout(() => {
            setIsVisible(false)
        }, 3000)
    }, []);

  return isVisible ? (
      <AnimatePresence mode={"wait"}>
    <motion.div className='absolute overflow-hidden top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen bg-white'
                exit={{y:"-100%"}}
                transition={{duration: 0.25, ease: "easeIn"}}
    >
      <div className="content flex flex-col items-center gap-4 z-40">
        <motion.h1 className="text-bg text-4xl font-black text-center uppercase text-balance md:text-6xl md:max-w-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1,  ease: "easeOut" }}
                   exit={{ opacity: 0, scale: 0 }}
        >{title}</motion.h1>

          <motion.div className="h-[2px] w-36 bg-slate-900 origin-center"
            initial={{width:0}}
            animate={{width:144}}
            transition={{duration: 0.5, ease:"easeInOut"}}
                      exit={{ width:0 }}
          ></motion.div>

        <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.25,  ease: "easeOut" }}
            exit={{ opacity: 0, scale: 0 }}
            
        className="text-black text-xl text-center z-40 w-7/12 capitalize">
            {subtitle}
        </motion.p>
      </div>

        <div className="absolute top-0 left-0 w-full overflow-hidden h-60  ">
            <Image src={images.makeupBanner} alt={"bannerTop"} className="object-fill origin-center scale-[1.35] -mt-8 transition-all
            md:object-contain md:scale-[.7] md:rotate-12 md:origin-top-right md:mt-10 md:absolute md:right-0 md:top-0  "/>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden h-60 ">
            <Image src={images.makeupBanner} alt={"bannerTop"} className="object-fill origin-center scale-[1.35] mt-6 transition-all rotate-180
             md:absolute md:-left-24 md:-bottom-24 md:scale-[0.8] md:rotate-12
            "/>
        </div>

    </motion.div>
      </AnimatePresence>
  ) : null
}

export default IntroSlide
