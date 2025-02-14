import React from 'react'
import * as motion from "framer-motion/client";
import { Bookmark } from 'lucide-react';

type Props = {}

function Hero({}: Props) {
  return (
    <motion.div className=' my-3 h-[450px] flex flex-col gap-4 justify-center p-4 relative items-center text-center'
    
    >
        <motion.h1 className='font-playfair text-8xl text-amber-800'
        initial={{opacity: 0, y: 10}}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut"},
        }}
        >
        Makeup That Turns Heads <br /> Just Like You Do
        </motion.h1>
        <motion.p className='w-1/2 text-xl capitalize'
        initial={{opacity: 0, y: 10}}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", delay: 0.3},
        }}
        >From glam makeovers to natural beauty touches <br /> get ready for flawless, unforgettable looks tailored to your style.</motion.p>
        <motion.div className="group mt-3 w-fit cursor-pointer transition-all duration-500 border-2 border-amber-800 hover:border-white flex gap-2 p-3 font-bold text-white hover:text-amber-800 rounded-md bg-amber-800 hover:bg-white"
        initial={{opacity: 0, y: 10}}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut", delay: 1},
        }}
        >
          <Bookmark className='group-hover:fill-amber-800 transition-all duration-200 font-bold'/>
          Book Appointment
        </motion.div>
        {/* <motion.img src="/assets/images/hero-banner.jpg" alt="banner" className='absolute top-0 right-0 h-96 w-full object-cover -z-10 opacity-75' 
        initial={{opacity: 0}}
        animate={{
          opacity: 0.50,
          y: 0,
          transition: { duration: 0.5, ease: "easeInOut"},
        }}
        /> */}
    </motion.div>
  )
}

export default Hero