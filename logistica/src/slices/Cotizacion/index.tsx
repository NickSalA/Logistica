import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Cotizacion`.
 */
export type CotizacionProps = SliceComponentProps<Content.CotizacionSlice>;

/**
 * Component for "Cotizacion" Slices.
 */
const Cotizacion: FC<CotizacionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for cotizacion (variation: {slice.variation}) Slices
    </section>
  );
};

export default Cotizacion;
