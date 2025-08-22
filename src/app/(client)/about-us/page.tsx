import Navbar from '@/components/Navbar'
import React from 'react'
import {images} from "@/constants";
import Image from 'next/image';

type Props = {}

function AboutUs({}: Props) {
  return (

      <main className="bg-amber-50 text-gray-900 font-sans">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-amber-100">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-amber-800 drop-shadow">
              Evelyns Lavish Beauty
            </h1>
            <p className="text-xl text-amber-700">
              Radiate elegance. Every look. Every time.
            </p>
            <a
                href="#booking"
                className="inline-block px-6 py-3 bg-amber-700 text-white rounded-2xl shadow hover:bg-amber-800 transition"
            >
              Book an Appointment
            </a>
          </div>
          {/* Optional: Overlay image or texture for luxury feel */}
        </section>

        {/* About Evelyn */}
        <section className="py-16 px-6 md:px-20 bg-white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img
                src={images.palesa.src}
                alt="Evelyn"
                className="rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-4xl font-bold text-amber-800 mb-4">Meet Evelyn</h2>
              <p className="text-gray-700 text-lg">
                With over 3 years of hands-on experience, Evelyn brings a personal
                touch to every session — whether it’s a house call in Modimolle or
                a bridal transformation in Lephalale. Her artistry is rooted in
                enhancing your natural beauty while adding that lavish flair.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-6 md:px-20 bg-amber-50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-800">Our Services</h2>
            <p className="text-amber-700 mt-2">
              Lavish looks tailored for every moment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { title: "All Occasions", desc: "Glam up for birthdays, graduations, photoshoots and more." },
              { title: "Bridal Makeup", desc: "Timeless beauty for your big day with trials and full-day packages." },
              { title: "Extras", desc: "Add-ons like hair styling and lash installations to complete your look." }
            ].map((service) => (
                <div key={service.title} className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
                  <h3 className="text-2xl font-semibold text-amber-700 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white px-6 md:px-20">
          <h2 className="text-4xl font-bold text-center text-amber-800 mb-12">
            The Lavish Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Image
                    key={i}
                    src={images.everyOccation.src}
                    alt={`Gallery ${i}`}
                    className="rounded-xl shadow-md hover:scale-105 transition transform"
                />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-amber-100 px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-800">Client Love</h2>
            <p className="text-amber-700 mt-2">Hear from our radiant beauties</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                name: "Lebo M.",
                text: "Evelyn made me feel like royalty on my wedding day. Her attention to detail is unmatched!"
              },
              {
                name: "Thando K.",
                text: "Every occasion, I book her. She knows exactly what look works for me and nails it every time."
              }
            ].map((review, idx) => (
                <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <p className="text-gray-700 italic">“{review.text}”</p>
                  <p className="mt-4 font-semibold text-amber-700">{review.name}</p>
                </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section
            id="booking"
            className="py-20 px-6 md:px-20 bg-amber-800 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Glow?</h2>
          <p className="mb-8 text-lg">
            Book your next appointment or bridal consultation today.
          </p>
          <a
              href="/booking"
              className="inline-block bg-white text-amber-800 px-6 py-3 rounded-xl shadow hover:bg-amber-100 transition"
          >
            Schedule Now
          </a>
        </section>

        {/* Footer */}
        {/*<footer className="bg-amber-900 text-white py-10 px-6 md:px-20">*/}
        {/*  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">*/}
        {/*    <p>© {new Date().getFullYear()} Evelyns Lavish Beauty. All rights reserved.</p>*/}
        {/*    <p>Serving Modimolle & Lephalale | Instagram: @evelynslavishbeauty</p>*/}
        {/*  </div>*/}
        {/*</footer>*/}
      </main>
  )
}

export default AboutUs