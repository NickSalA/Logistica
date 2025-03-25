import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {ChevronLeft, ChevronRight} from 'lucide-react';

/**
 * Props for `Inicio`.
 */
export type InicioProps = SliceComponentProps<Content.InicioSlice>;

/**
 * Component for "Inicio" Slices.
 */
const Inicio: FC<InicioProps> = ({ slice }) => {



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-[40vh] md:h-screen items-center flex"
    >
      {slice.primary.images.map((item, index) => (
      <PrismicNextImage field={item.image} key={index} className="relative h-full md:h-screen"/>
      ))}
      <div className="absolute w-11/12 opacity-80 bg-night rounded-lg py-2 px-4 md:p-4 left-1/2 top-4 transform -translate-x-1/2 md:transform-none md:translate-0 md:left-2 md:top-8 md:w-1/3" >
        <PrismicRichText field={slice.primary.main_info} components={{
          heading1: ({children}) => (
            <h1 className="font-primary text-xl md:text-3xl text-white font-semibold mb-1.5">{children}</h1>
          ) 
        }}/>
        <div className="w-full h-0.5 rounded-lg bg-white"></div>
        <PrismicRichText field={slice.primary.name} components={{
          heading1: ({children}) => (
            <h1 className="font-primary text-lg md:text-2xl text-white font-semibold text-right mt-1.5">{children}</h1>
          )
        }}/>
      </div>
      
      <PrismicNextLink field={slice.primary.button_right_link} className="top-1/2 transform -translate-y-1/2 absolute right-0.5 md:right-4">
        <ChevronRight size={48} className="md:size-24 text-white" />
      </PrismicNextLink>
      <PrismicNextLink field={slice.primary.button_left_link} className="top-1/2 transform -translate-y-1/2 absolute left-0.5 md:left-4">
        <ChevronLeft size={48}  className="md:size-24 text-white" />
      </PrismicNextLink>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slice.items.map((_, index) => (
          <div 
            key={index} 
            className={`w-2 h-2 bg-white rounded-full ${
              index === currentSlide ? 'opacity-100' : 'opacity-50'
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Inicio;
