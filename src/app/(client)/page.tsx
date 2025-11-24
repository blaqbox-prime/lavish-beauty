"use client"

import Image from "next/image";
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { galleryImages, images } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "@/components/Navbar";
import { SplitText } from "gsap/SplitText";
import InfiniteScrollBanner from "@/components/InfiniteScrollBanner";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryLayout from "./gallery/GalleryLayout";
import ClientServiceCard from "@/components/ClientServiceCard";
import MainButton from "@/components/MainButton";
import Footer from "@/components/Footer";
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, CustomEase, SplitText);
}

export default function Home() {

  const homepage = useRef<HTMLElement | any>();
  const tl = useRef<GSAPTimeline | any>();
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);


  // Intro Animation
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({
          delay: 0.3,
          defaults: { ease: "hop" },
          onComplete: () => { gsap.set(".loader", { display: "none" }) }
        })

      // Split text
      SplitText.create([".hero-text h1", ".hero-text p"], {
        type: "words,lines",
        linesClass: "line",
        autoSplit: true,
        mask: "lines",
      });

      const counts = document.querySelectorAll(".count");
      //  Animate Loading Count ----------------------------------------------
      counts.forEach((count, idx) => {
        const digits = count.querySelectorAll(".digit h1");

        tl.current.to(digits, {
          y: "0%",
          duration: 1,
          stagger: 0.075
        }, idx * 1)

        if (idx < counts.length) {
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
          gsap.to(".divider", { opacity: 0, duration: 0.4, delay: 0.3 })
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

      tl.current.to(".line", {
        duration: 0.6,
        y: 0,
        stagger: 0.1,
      });

      tl.current.to("nav", {
        duration: 1,
        y: 0,
      });

      tl.current.to([".locations", ".cta"], {
        duration: 1,
        opacity: 1,
      }, "<");
    },
    { scope: homepage }
  );

  // Page Animations
  useGSAP( () => {
      const lenis = new Lenis({
  autoRaf: false,
});
  
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const gallerygrid = document.querySelector(".gallery-grid");
    console.log(gallerygrid);

    
    document.querySelectorAll(".img:not([data-origin])").forEach((img, index) => {
      img.setAttribute("data-origin", index % 2 === 0 ? "left" : "right");
        });

      gsap.set(".img", {
        scale: 0, force3D: true
      })

      const rows = document.querySelectorAll(".gallery-grid .row");
      rows.forEach((row, index) => {
        const rowImages = row.querySelectorAll(".img");
        
        if(rowImages.length > 0){
          row.id = `row-${index}`;
          ScrollTrigger.create({
            id: `scaleIn-${row.id}`,
            trigger: row,
            start: "top bottom",
            end: "bottom bottom-=10%",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if(self.isActive){
                const progress = self.progress;
                const easedProgress = Math.min(1, progress * 1.2);
                const scaleValue = gsap.utils.interpolate(0, 1, easedProgress);

                rowImages.forEach((img) => {
                  gsap.to(img, {scale: scaleValue, force3D: true});
                });

                if(progress > 0.95){
                  gsap.set(rowImages, {scale: 1, force3D: true});
                }
              }
            },
            onLeave: () => {
                  gsap.set(rowImages, {scale: 1, force3D: true});

            }
          })
        }
      })

  
  }, { scope: homepage })

  const IMAGES = [
    "https://images.pexels.com/photos/24293777/pexels-photo-24293777.jpeg",
    "https://images.pexels.com/photos/3863802/pexels-photo-3863802.jpeg",
    "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
    "https://images.pexels.com/photos/3065450/pexels-photo-3065450.jpeg"];

  return (

    // <IntroSlide title={"Evelyn's Lavish Beauty"} subtitle={"Makeup that turns heads just like you do"}/>

    <main className="homepage relative w-screen min-h-screen overflow-x-hidden bg-light" ref={homepage}>


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
          <div className="count">
            <div className="digit"><h1>9</h1></div>
            <div className="digit"><h1>9</h1></div>
          </div>
        </div>
      </div>


      {/* Navbar */}
      <Navbar className={"fixed z-[40] w-full p-6 max-w-screen-2xl mx-auto"} />

      {/* Hero section -------------------------------------------- */}
      <section className="hero h-screen relative top-0 left-0 w-full flex flex-col items-center justify-center text-center">
        <div className="locations z-10 absolute top-24 left-[50%] translate-x-[-50%]  md:w-1/4 bg-light/20 backdrop-blur-md text-light px-4 py-2 rounded-full text-xs shadow-lg border border-light/30">
          Serving Modimolle & Lephalale
        </div>

        <div className="relative z-10 hero-text p-6 flex flex-col gap-4 text-light md:w-[700px]">
          <h1 className="mx-auto font-playfair text-5xl md:text-7xl text-balance leading-[1.25em]">Where <span className="italic">Beauty</span> Meets <span className="italic">Confidence</span></h1>
          <p className="w-[95%] mx-auto">From flawless makeup to dreamy bridal glam and luxe hair & lash installs, Evelyn’s touch brings out the best version of you.</p>
        </div>

        <Link href={"/book-now"}>
          <Button className="cta z-10 absolute bottom-36 left-[50%] translate-x-[-50%] w-4/5 md:w-[300px] mx-auto p-4 h-12 bg-theme_primary text-dark font-bold hover:bg-accent_light rounded-full flex items-center justify-between"><span className="opacity-0 p-1 scale-125"><CaretRightIcon /></span> Reserve Your Spot <span className="bg-dark text-theme_primary rounded-full p-1 scale-125"><CaretRightIcon /></span></Button>
        </Link>

        <Image src={images.homebg} width={1920} height={1080} alt="women" className="hero-img z-0 h-screen w-screen absolute top-0 left-0 object-cover object-center brightness-75 contrast-125 " />

      </section>
      {/* Services */}
      <section className="services w-screen flex flex-col items-center">
        <InfiniteScrollBanner className="my-16" />
        <div className="flex flex-col min-h-[70vh] relative mb-24">
          <div className="services-header text-left p-6">
            <h2 className="text-8xl font-thin">Our <br /> Services</h2>
            <p className="text-lg text-gray-600 max-w-lg">Indulge in bespoke beauty services tailored to elevate your natural elegance—because every moment deserves a flawless touch.</p>
          </div>


          <div className="services-list mt-20 w-full">
            <div className="w-[95vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-24 my-6">
              <ClientServiceCard title="Look Amazing Everyday" imageSrc={IMAGES[0]} number="01" />
              <ClientServiceCard title="Your Special Day" imageSrc={IMAGES[1]} number="02" />
              <ClientServiceCard title="For All Occasions" imageSrc={IMAGES[2]} number="03" />
              <ClientServiceCard title="Live. Love. Lashes" imageSrc={IMAGES[3]} number="04" />
            </div>
          </div>
        </div>
      </section>

      {/* About us section */}
      <section className="h-screen bg-dark grid md:grid-cols-2 gap-4">
        <div className="big-image bg-accent_light relative">
        
            <div className="text-4xl font-bold text-accent_light/20 absolute z-30 origin-bottom-right bottom-[95%] right-6 -rotate-90">Founder & Lead Artist</div>
       
          <Image src={images.palesa} fill alt="Evelyn Maremane" className="object-cover object-center brightness-75 contrast-125 transition-brightness duration-1000 hover0" />
        </div>
        <div className="about-us-header text-left p-6 mt-12 relative overflow-hidden">
          <h2 className="text-8xl text-white font-thin text-right mb-4">Evelyn <br /> Maremane</h2>
          <p className="font-light text-white leading-loose text-right">
            Evelyn is a professional makeup artist and beauty therapist with over 5 years of experience in the industry. She is passionate about enhancing natural beauty and making her clients feel confident and beautiful. Evelyn specializes in bridal makeup, special occasion makeup, and everyday makeup looks. Her attention to detail and commitment to using high-quality products ensure that every client receives a flawless finish.
          </p>
          <MainButton className="capitalize mr-0 mt-8" icon={null}>Schedule an appointment with me</MainButton>
           <p className="text-9xl font-bold text-accent_light/5 absolute z-30 origin-bottom-right -bottom-9 -right-9 whitespace-nowrap opacity-50">Lead Artist</p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="gallery-grid w-screen flex flex-col items-center my-32">
        <div className="services-header text-left p-6 mb-16">
            <h2 className="text-8xl font-thin">Our <br /> Work</h2>
            <p className="text-lg text-gray-600 max-w-lg">Indulge in bespoke beauty services tailored to elevate your natural elegance—because every moment deserves a flawless touch.</p>
          </div>
        <div className="row">
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[0]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[1]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[2]} alt=""/>
            </div>
          </div>
          <div className="col">
           
          </div>
          <div className="col">
             <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[3]} alt=""/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[4]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[7]} alt=""/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[6]} alt=""/>
            </div></div>
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[5]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[8]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[9]} alt=""/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[10]} alt=""/>
            </div>
          </div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[11]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">
            
          </div>
          <div className="col">
            <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="left">
              <Image src={galleryImages[13]} alt=""/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
           
          </div>
          <div className="col">
           
          </div>
          <div className="col">
              <div className="img brightness-75 transition-brightness hover:brightness-90" data-origin="right">
              <Image src={galleryImages[12]} alt=""/>
            </div>
          </div>
          <div className="col"></div>
        </div>
        {/* <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div> */}
      </section>

      <Footer />

    </main>
    // </Suspense>
  );
}