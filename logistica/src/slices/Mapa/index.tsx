import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";

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
      className="container mx-auto px-4 sm:px-6 pb-16 md:pb-24"
    >
      {/* Cabecera Estilizada */}
      <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-12">
        {slice.primary.badge_text && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-primary uppercase tracking-wider mb-4">
            {slice.primary.badge_text}
          </div>
        )}

        {slice.primary.title && (
          <div className="max-w-3xl">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
                    {children}
                  </h2>
                ),
                // Fallback en caso de que pongan Heading 1 por error
                heading1: ({ children }) => (
                  <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
                    {children}
                  </h2>
                )
              }}
            />
          </div>
        )}
      </div>

      {/* Contenedor del Mapa */}
      <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 group bg-gray-100">
        <iframe
          className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
          src={`https://maps.google.com/maps?q=${slice.primary.map.latitude},${slice.primary.map.longitude}&hl=es;z=15&output=embed`}
          allowFullScreen
          loading="lazy"
        />
        {/* Overlay sutil para evitar que el mapa sea demasiado brillante antes del hover */}
        <div className="absolute inset-0 bg-night/5 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
      </div>
    </section>
  );
};

export default Mapa;
