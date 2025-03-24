import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

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
    >
      <div className="w-1/4 opacity-80 bg-night rounded-lg" >
      <PrismicRichText field={slice.primary.main_info} components={{
        heading1: ({children}) => (
          <h1 className="font-primary text-5xl text-white">{children}</h1>
        ) 
      }}/>
      <PrismicRichText field={slice.primary.name} components={{
        heading1: ({children}) => (
          <h1 className="font-primary text-5xl text-white">{children}</h1>
        )
      }}/>
      </div>
      
      <PrismicNextLink field={slice.primary.button_right_link} className="top 1/2 ">
        {slice.primary.button_right}
      </PrismicNextLink>
      <PrismicNextLink field={slice.primary.button_left_link}>
      {slice.primary.button_left}
      </PrismicNextLink>
      <PrismicNextImage field={slice.primary.images} />
    </section>
  );
};

export default Inicio;
