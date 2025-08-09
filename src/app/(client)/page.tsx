"use client"

import Image from "next/image";
import React, {Suspense, useEffect, useLayoutEffect, useRef, useState} from "react";
import { AnimatePresence, motion, scale, stagger } from "motion/react"
import {images} from "@/constants";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { clipPath } from "framer-motion/client";
import Navbar from "@/components/Navbar";

if(typeof window !== 'undefined'){
  gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother,CustomEase);
}

export default function Home() {

const homepage = useRef<HTMLElement | any>();
const tl = useRef<GSAPTimeline | any>();
CustomEase.create("hop", "0.9, 0, 0.1, 1");

useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          delay: 0.3,
          defaults: {ease: "hop"},
          onComplete: () => {gsap.set(".loader", {display: "none"})}
        })

        const counts = document.querySelectorAll(".count");
//  Animate Loading Count ----------------------------------------------
        counts.forEach((count, idx) => {
          const digits = count.querySelectorAll(".digit h1");

          tl.current.to(digits, {
            y: "0%",
            duration: 1,
            stagger: 0.075
          }, idx * 1)

          if(idx < counts.length){
            tl.current.to(digits, {
              y: "-120%",
              duration: 1,
              stagger: 0.075,
            }, idx * 1 + 1)
          }
        })

        // Fade out Spinner ------------------------------------
        tl.current.to(".spinner", {
          opacity: 0,
          duration: 0.3
        })

        // Animate words

        tl.current.to(".word h1", {
          y: "0%",
          duration: 1
        }, "<")

        // divider

        tl.current.to(".divider", {
          scaleY: "100%",
          duration: 1, 
          onComplete: () => {
            gsap.to(".divider", {opacity: 0, duration: 0.4, delay: 0.3})
          }
        })

        tl.current.to("#word-1 h1", {
          y: "120%",
          duration: 1,
          delay: 0.3
        })

        tl.current.to("#word-2 h1", {
          y: "-120%",
          duration: 1,
        }, "<")

        // Remove blocks to show page
        tl.current.to(".block", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          delay: 0.75,
          onStart: () => {
            gsap.to(".hero-img", {
              scale: 1, duration: 2, ease: "hop"
            })
          }
        })
    },
    { scope: homepage }
  );



  return (

          // <IntroSlide title={"Evelyn's Lavish Beauty"} subtitle={"Makeup that turns heads just like you do"}/>

      <main className="homepage relative w-screen h-screen overflow-x-hidden" ref={homepage}>
        {/* Loader */}
        <div className="loader overflow-hidden z-50 fixed text-accent_light">
          
          <div className="overlay">
            <div className="block bg-accent_dark"></div>
            <div className="block bg-accent_dark"></div>
          </div>

          <div className="intro-logo font-playfair">
            <div className="word" id="word-1">
              <h1><span>Lavish</span></h1>
            </div>
            <div className="word font-sans font-light" id="word-2">
              <h1>Beauty</h1>
            </div>
          </div>

          <div className="divider"></div>

          <div className="spinner-container">
            <div className="spinner"></div>
          </div>

          <div className="counter font-playfair">
            <div className="count">
              <div className="digit"><h1>0</h1></div>
              <div className="digit"><h1>0</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>2</h1></div>
              <div className="digit"><h1>9</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>5</h1></div>
              <div className="digit"><h1>7</h1></div>
            </div>
            <div className="count">
              <div className="digit"><h1>8</h1></div>
              <div className="digit"><h1>6</h1></div>
            </div>
            <div  className="count">
              <div className="digit"><h1>9</h1></div>
              <div className="digit"><h1>9</h1></div>
            </div>
          </div>
        </div>


        {/* Navbar */}
        {/* <div className="nav flex z-40 p-6 items-center justify-center sticky w-full" >
          <Menu className="text-light"/>
        </div> */}

        <Navbar className={"sticky z-40"}/>

        {/* Hero section -------------------------------------------- */}
        <section className="hero h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center text-center">
          <div className="z-10 absolute top-24 left-[50%] translate-x-[-50%]  md:w-1/4 bg-light/20 backdrop-blur-md text-light px-4 py-2 rounded-full text-xs shadow-lg border border-light/30">
        Serving Modimolle & Lephalale
        </div>

          <div className="relative z-10 hero-text p-6 flex flex-col gap-4 text-light md:w-[700px]">
          <h1 className="mx-auto font-playfair text-5xl md:text-7xl text-balance leading-[1.25em]">Where <span className="italic">Beauty</span> Meets <span className="italic">Confidence</span></h1>
          <p className="w-[95%] mx-auto">From flawless makeup to dreamy bridal glam and luxe hair & lash installs, Evelyn’s touch brings out the best version of you.</p>
          </div>

          <Link href={"/book-now"}>
                    <Button className="cta-btn z-10 absolute bottom-36 left-[50%] translate-x-[-50%] w-4/5 md:w-[300px] mx-auto p-4 h-12 bg-theme_primary text-dark font-bold hover:bg-accent_light rounded-full flex items-center justify-between"><span className="opacity-0 p-1 scale-125"><CaretRightIcon/></span> Reserve Your Spot <span className="bg-dark text-theme_primary rounded-full p-1 scale-125"><CaretRightIcon/></span></Button>

          </Link>

        <Image src={images.womenBg} alt="women" className="hero-img z-0 h-screen w-screen absolute top-0 left-0 object-cover object-center brightness-75 contrast-125 "/>
        </section>
      </main>
    // </Suspense>
  );
}