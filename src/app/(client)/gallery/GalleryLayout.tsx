"use client"

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Image from "next/image";

type Props = {
    images: string[]
}

const GalleryLayout = ({images} : Props) => {
    return (
        <main className="mx-auto w-full  ">
            <ResponsiveMasonry className="max-w-[900px] mx-auto"
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry>
                    {
                       images.map((image, index) => (
                            <div key={index} className=" w-full md:w-[300px] h-full overflow-hidden hover:brightness-110 transition-all animate-in animate-ease-in-out delay-500">
                                <Image  src={image} alt="image" className="w-full rounded-xl h-full object-cover transition-all duration-500 hover:scale-110 shadow-lg " />
                            </div>
                        ))
                    }
                </Masonry>
            </ResponsiveMasonry>
        </main>
    );
};
export default GalleryLayout