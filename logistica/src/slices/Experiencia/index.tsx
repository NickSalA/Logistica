import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Experiencia`.
 */
export type ExperienciaProps = SliceComponentProps<Content.ExperienciaSlice>;

/**
 * Component for "Experiencia" Slices.
 */
const Experiencia: FC<ExperienciaProps> = ({ slice }) => {
  // Triplicamos la lista de logos para asegurar que la marquesina sea continua en pantallas anchas
  const duplicatedLogos = [
    ...slice.primary.images,
    ...slice.primary.images,
    ...slice.primary.images,
  ];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white pt-12 pb-2 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 mb-6 md:mb-16">

        {/* Cabecera Centralizada y Elegante */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Badge de Categoría / Sección */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-primary uppercase tracking-wider mb-4">
            Nuestros Clientes
          </div>

          {slice.primary.title && (
            <div className="max-w-2xl">
              <PrismicRichText
                field={slice.primary.title}
                components={{
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
      </div>

      {/* Marquesina Infinita de Logotipos (Ticker) */}
      <div className="relative w-full overflow-hidden bg-white before:absolute before:left-0 before:top-0 before:w-16 md:before:w-32 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-16 md:after:w-32 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:z-10">

        {/* Track de la marquesina con animación infinita */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-16 md:gap-24 px-8">
          {duplicatedLogos.map((item, index) => (
            <div
              key={index}
              className="w-32 md:w-48 h-12 md:h-16 flex items-center justify-center flex-shrink-0 group cursor-default"
            >
              {item.image && (
                <PrismicNextImage
                  field={item.image}
                  className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Experiencia;
