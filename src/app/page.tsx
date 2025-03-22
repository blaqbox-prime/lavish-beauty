import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-8">
    {/* // Top-level Navigation Bar
  //  Hero Section
  //  Services Section
  //  About Section
  //  Booking Section
  //  Clients Section
  //  Testimonials Section
  //  Contact Section
  //  Footer Section */}

      <Navbar />
      <div className="flex flex-col gap-10">
          <Hero />
          <About/>
          <Services />
      </div>

    </main>
  );
}
