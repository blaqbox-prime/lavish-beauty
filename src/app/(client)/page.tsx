"use client"

import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import IntroSlide from "@/components/IntroSlide";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, {Suspense, useEffect, useLayoutEffect, useState} from "react";
import Loading from "@/app/admin/loading";
import { AnimatePresence, motion } from "motion/react"
import {images} from "@/constants";
import Link from "next/link";
import {Button} from "@/components/ui/button";


export default function Home() {



  return (
    <Suspense fallback={<Loading />}>

          <IntroSlide title={"Evelyn's Lavish Beauty"} subtitle={"Makeup that turns heads just like you do"}/>

      <main className="relative">

          <div className="relative hero w-full h-screen flex flex-col items-center justify-center gap-2 -mt-12">
              <h1 className="text-5xl font-bold text-center text-balance text-amber-800 p-4 capitalize">Makeup <br/> that Turns Heads Just Like You Do</h1>

              <motion.div className="h-[1px] w-36 mb-2 bg-slate-900 origin-center"
                          initial={{width:0}}
                          animate={{width:144}}
                          transition={{duration: 0.5, ease:"easeInOut"}}
                          exit={{ width:0 }}
              ></motion.div>

              <p
              className="text-center max-w-[300px] mb-4"
              >From Glam Makeovers to Natural Beauty Touches - Get Ready For Flawless, Unforgettable Looks tailored to your style</p>
              <Link href={"/book-now"}>
                  <Button className="bg-amber-800 hover:bg-amber-700">Book Your Glow-Up Now</Button>
              </Link>
              <Image alt={""} src={images.makeupBanner} className="absolute bottom-0 rotate-180 -z-10"/>
          </div>

      </main>
    </Suspense>
  );
}