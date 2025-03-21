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
      <PrismicRichText field={slice.primary.main_info} components={{
        heading1: ({children}) => (
          <h1 className="font-montserrat text-7xl">{children}</h1>
        )
      }}/>
      <PrismicRichText field={slice.primary.name} />
      <PrismicNextLink field={slice.primary.button_right_link}>
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
