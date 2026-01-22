import React from "react";

type Props = {
    title: string,
    subtitle?: string,
    className?: string
}

function SectionHeading({title, subtitle, className}: Props) {
    return <>
        <h1 className={`text-2xl md:text-4xl text-center w-full text-amber-800
            after:block after:h-[2px] after:w-[50px] after:origin-center after:bg-amber-800 after:bottom-0 after:mx-auto
            after:animate-pulse animate-infinite ${className}`}>{title}</h1>
        {subtitle && <p className={"mx-auto text-lg text-center w-[500px] mb-8 "}>{subtitle}</p>}
    </>;
}

export default SectionHeading