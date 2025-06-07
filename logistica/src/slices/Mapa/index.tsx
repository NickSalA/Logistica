import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Mapa`.
 */
export type MapaProps = SliceComponentProps<Content.MapaSlice>;

/**
 * Component for "Mapa" Slices.
 */
const Mapa: FC<MapaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-[60vh]"
    >
      <iframe className="rounded-lg border-0 w-full h-full"
        src={`https://maps.google.com/maps?q=${slice.primary.map.latitude},${slice.primary.map.longitude}&hl=es;z=14&output=embed`}
        allowFullScreen
        loading="lazy"
      >
      </iframe>
    </section>
  );
};

export default Mapa;
