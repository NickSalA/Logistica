import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Experiencia`.
 */
export type ExperienciaProps = SliceComponentProps<Content.ExperienciaSlice>;

/**
 * Component for "Experiencia" Slices.
 */
const Experiencia: FC<ExperienciaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for experiencia (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Experiencia;
