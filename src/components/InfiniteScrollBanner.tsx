import React from "react";

const InfiniteScrollBanner = ({className=""}: {className: string}) => {
  const textItems = ["BRIDAL", "EVERY OCCASION", "SOFT GLAM", "COMPLEMENTS"];

  return (
    <div className={`infinite-scroll-banner overflow-hidden whitespace-nowrap bg-light py-4 ${className}`}>
      <div className="scrolling-text flex gap-8 md:gap-20 animate-scroll">
        {Array(10)
          .fill(textItems)
          .flat()
          .map((text, index) => (
            <span
              key={index}
              className="text-lg md:text-2xl font-sans font-thin tracking-widest uppercase text-dark"
            >
              {text}
            </span>
          ))}
      </div>
    </div>
  );
};

export default InfiniteScrollBanner;