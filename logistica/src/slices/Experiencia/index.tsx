import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import SectionHeader from "@/components/ui/section-header";

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
      className="bg-slate-50 dark:bg-[#0b1625] pt-12 pb-16 md:pt-16 md:pb-24 relative overflow-hidden transition-colors duration-300"
    >
      <div className="section-container mb-6 md:mb-16">
        <SectionHeader
          badge={slice.primary.badge_text}
          title={slice.primary.title}
        />
      </div>

      {/* Marquesina Infinita de Logotipos (Ticker) */}
      <div className="relative w-full overflow-hidden bg-slate-50 dark:bg-[#0b1625] before:absolute before:left-0 before:top-0 before:w-16 md:before:w-32 before:h-full before:bg-linear-to-r before:from-slate-50 dark:before:from-[#0b1625] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:w-16 md:after:w-32 after:h-full after:bg-linear-to-l after:from-slate-50 dark:after:from-[#0b1625] after:to-transparent after:z-10 transition-colors duration-300">
        {/* Track de la marquesina con animación infinita */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-16 md:gap-24 px-8">
          {duplicatedLogos.map((item, index) => (
            <div
              key={index}
              className="w-32 md:w-48 h-12 md:h-16 flex items-center justify-center shrink-0 group cursor-default"
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
