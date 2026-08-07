import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Badge from "@/components/ui/badge";

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
      className="bg-surface-muted dark:bg-surface-dark py-16 md:py-24 scroll-mt-24 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Cabecera Estilizada */}
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-12">
          {slice.primary.badge_text && (
            <Badge variant="accent" className="mb-4">
              {slice.primary.badge_text}
            </Badge>
          )}

          {slice.primary.title && (
            <div className="max-w-3xl">
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night dark:text-white tracking-tight uppercase leading-snug transition-colors duration-300">
                      {children}
                    </h2>
                  ),
                  // Fallback en caso de que pongan Heading 1 por error
                  heading1: ({ children }) => (
                    <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night dark:text-white tracking-tight uppercase leading-snug transition-colors duration-300">
                      {children}
                    </h2>
                  ),
                }}
              />
            </div>
          )}
        </div>

        {/* Contenedor del Mapa */}
        <div className="relative w-full max-w-6xl mx-auto h-100 md:h-125 rounded-4xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 group bg-gray-100 dark:bg-white/5 transition-colors duration-300">
          <iframe
            title="Ubicación de Logística Trasandes en Google Maps"
            className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            src={`https://maps.google.com/maps?q=${slice.primary.map.latitude},${slice.primary.map.longitude}&hl=es;z=15&output=embed`}
            allowFullScreen
            loading="lazy"
          />
          {/* Overlay sutil para evitar que el mapa sea demasiado brillante antes del hover */}
          <div className="absolute inset-0 bg-night/5 dark:bg-night-dark/30 pointer-events-none group-hover:bg-transparent transition-colors duration-700" />
        </div>
      </div>
    </section>
  );
};

export default Mapa;
