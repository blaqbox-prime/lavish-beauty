import React from "react";
import Image from "next/image";
import {images} from "@/constants";

type Props = {
    image: any,
    title: string,
    description: string,
}

export const LongServiceCard = ({image, title, description}: Props) => {
    return (
        <div className="group relative w-full h-full">
            <Image
                src={image}
                alt={title}
                className="z-0 w-full h-full object-cover"
            />
            <div className="z-10 absolute bottom-0 overflow-hidden p-2">
                <h2 className="text-3xl mb-2 font-playfair">{title}</h2>
                <p className="">
                    {description}
                </p>
            </div>
        </div>
    );
};
