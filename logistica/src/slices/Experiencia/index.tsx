"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
/**
 * Props for `Experiencia`.
 */
export type ExperienciaProps = SliceComponentProps<Content.ExperienciaSlice>;

/**
 * Component for "Experiencia" Slices.
 */

const Experiencia: FC<ExperienciaProps> = ({ slice }) => {

  const [currentLogo, setCurrentLogo] = useState(0);
  const totallogos = slice.primary.images.length;

  function changeLogo(index: number) {
    const nextLogo = (currentLogo + index + totallogos) % totallogos;
    setCurrentLogo(nextLogo);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % totallogos);
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative items-center p-4 md:py-8"
    >
      {/* Desktop view */}
      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="hidden md:flex flex-grow basis-1/4 h-0.5 rounded-lg bg-black mx-4 md:mx-12"></div>
          <PrismicRichText field={slice.primary.title} components={{
            heading1: ({ children }) => (
              <h1 className="font-primary text-md md:text-3xl font-semibold mb-4 text-center">{children}</h1>
            )
          }} />
          <div className="hidden md:flex flex-grow basis-1/4 h-0.5 rounded-lg bg-black mx-4 md:mx-12"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-24 gap-y-12 mt-4 mx-12">
          {slice.primary.images.map((item, index) => (
            <PrismicNextImage field={item.image} key={index}
              className={clsx("hidden md:flex h-30 w-50 md:h-40 md:w-60 lg:h-60 lg:w-80 object-contain")}>
            </PrismicNextImage>
          ))}
        </div>
      </div>
      {/* Mobile view */}
      <div className="relative flex md:hidden flex-col items-center justify-center">
        <button className="absolute top-1/2 transform -translate-y-1/2 left-1 md:left-4" onClick={() => changeLogo(-1)}>
          <ChevronLeft size={48} className="cursor-pointer" />
          <span className="sr-only">boton izquierdo</span>
        </button>
        <div className="relative w-full h-40 justify-center overflow-hidden">
          {slice.primary.images.map((item, index) => (
            <PrismicNextImage
              key={index}
              field={item.image}
              className={clsx("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 object-contain transition-opacity duration-1000 ease-in-out",
                index === currentLogo ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>

        <button className="absolute top-1/2 transform -translate-y-1/2 right-1 md:right-4" onClick={() => changeLogo(1)}>
          <ChevronRight size={48} className="cursor-pointer" />
          <span className="sr-only">boton derecho</span>
        </button>

      </div>
    </section>
  );
};

export default Experiencia;
