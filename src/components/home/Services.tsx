import React from "react";
import {LongServiceCard} from "@/components/LongServiceCard";
import {images} from "@/constants";

type Props = {};

function Services({}: Props) {
  return (
    <section className="my-6 flex flex-col gap-6 items-center ">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12 h-[600px] max-w-screen-lg mx-auto">

        <LongServiceCard image={images.everyOccation} title={"For Every Occasion"}
        description={"From soft glam to full-on diva vibes, we create customized looks\n" +
            "                    for photoshoots, parties, dates, or just because! Step into your\n" +
            "                    moment with confidence and flawless beauty."}
        />
        {/* ---------------------------- */}
       <LongServiceCard image={images.bridal} title={"Bride's Special Day"}
                        description={
                        " Your wedding day is all about magic—and we’ll make sure you glow\n" +
                            "              in every memory. Our expert bridal makeup service is designed to\n" +
                            "              complement your unique features and style, making you the center\n" +
                            "              of attention, as you should be."
                        }
                        />
        {/* ---------------------------- */}
        <LongServiceCard image={images.complements} title={"Complements"} description={
            "         Want luscious locks or dreamy lashes? We’ve got just the right\n" +
            "              touch! Whether it’s sleek styling, elegant updos, or fluttery lash\n" +
            "              installs, we’ll make sure your look stays on point."
        }
                         />
      </div>
    </section>
  );
}

export default Services;
