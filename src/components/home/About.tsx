import React from "react";
import * as motion from "framer-motion/client";
import { Brush } from "lucide-react";

type Props = {};

function About({}: Props) {
  return (
    <section className="py-8  mb-6 relative">
      <div className="flex items-center justify-center text-left gap-4 max-w-4xl mx-auto mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="font-playfair text-6xl w-[600px] ">
            Meet Evelyn - The Magic Behind The Brushes
          </h2>
          <p className="text-lg max-w-lg">
            With a passion for artistry and a knack for enhancing natural
            beauty, Evelyn has spent 3 years transforming faces and boosting
            confidence. Whether it's your big day, a night out, or just
            because—you deserve to look as radiant as you feel. From subtle
            elegance to bold statement looks, every brushstroke is tailored to
            celebrate you.
          </p>

          <motion.div
            className=" group mt-3 w-fit cursor-pointer transition-all duration-500 border-2 border-amber-800 hover:border-white flex gap-2 p-2 font-bold text-white hover:text-amber-800 rounded-md bg-amber-800 hover:bg-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut", delay: 1 },
            }}
          >
            My Portfolio of Looks
          </motion.div>
        </div>

        <img
          className="object-cover h-96 scale-110"
          src="/assets/images/person.png"
          alt="photo"
        />
      </div>
    </section>
  );
}

export default About;
