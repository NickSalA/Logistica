'use client'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from "react";
import clsx from "clsx";
/**
 * Props for `Inicio`.
 */
export type InicioProps = SliceComponentProps<Content.InicioSlice>;

/**
 * Component for "Inicio" Slices.
 */
const Inicio: FC<InicioProps> = ({ slice }) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slice.primary.images.length;
  function changeSlide(index: number) {
    const nextSlide = (currentSlide + index + totalSlides) % totalSlides;
    setCurrentSlide(nextSlide);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  });


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-[50vh] md:h-screen items-center flex"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className={clsx(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>
      <div className="absolute w-7/8 opacity-80 bg-night rounded-lg px-6 py-4 left-1/2 top-4 transform -translate-x-1/2 md:transform-none md:translate-0 md:left-2 md:p-8 md:top-8 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/4">
        <PrismicRichText field={slice.primary.main_info} components={{
          heading1: ({ children }) => (
            <h1 className="font-primary text-xl md:text-3xl text-white font-semibold mb-1.5">{children}</h1>
          )
        }} />
        <div className="w-full h-0.5 rounded-lg bg-white"></div>
        <PrismicRichText field={slice.primary.name} components={{
          heading1: ({ children }) => (
            <h1 className="font-primary text-lg md:text-2xl text-white font-semibold text-right mt-1.5">{children}</h1>
          )
        }} />
      </div>
      <button className="top-1/2 transform -translate-y-1/2 absolute right-0 md:right-4" onClick={() => changeSlide(1)}>
        <ChevronRight size={48} className="md:size-16 text-white cursor-pointer" />
      </button>
      <button className="top-1/2 transform -translate-y-1/2 absolute left-0 md:left-4" onClick={() => changeSlide(-1)}>
        <ChevronLeft size={48} className="md:size-16 text-white cursor-pointer" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slice.items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 bg-white rounded-full ${index === currentSlide ? 'opacity-100' : 'opacity-50'
              }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Inicio;
