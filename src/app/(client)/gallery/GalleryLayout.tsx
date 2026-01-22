"use client"

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Image from "next/image";
import * as motion from "framer-motion/client";
import {animScrollTrigger, scaleIn} from "@/lib/animations";

type Props = {
    images: string[]
}

const GalleryLayout = ({images} : Props) => {
    return (
        <main className="mx-auto w-full mb-8">
            <ResponsiveMasonry className="max-w-[900px] mx-auto"
                columnsCountBreakPoints={{350: 2, 750: 2, 900: 3}}
            >
                <Masonry>
                    {
                       images.map((image, index) => (
                            <motion.div
                                // {...animScrollTrigger(scaleIn)}
                                transition={{duration: 2, ease: "easeInOut"}}
                                key={image} className=" w-full md:w-[300px] h-full overflow-hidden hover:brightness-110 transition-all animate-in animate-ease-in-out delay-500">
                                <Image  src={image} alt="image" width={300} height={500} className="w-full rounded-xl h-full object-cover transition-all duration-500 hover:scale-110 shadow-lg " />
                            </motion.div>
                        ))
                    }
                </Masonry>
            </ResponsiveMasonry>
        </main>
    );
};
export default GalleryLayout