import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import SectionHeader from "@/components/ui/section-header";

export type ExperienciaProps = SliceComponentProps<Content.ExperienciaSlice>;

const Experiencia: FC<ExperienciaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-white py-16 transition-colors duration-300 dark:bg-night-dark md:py-24"
    >
      <div className="section-container">
        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge={slice.primary.badge_text}
            title={slice.primary.title}
          />
        </div>

        <div className="flex flex-wrap justify-center overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10">
          {slice.primary.images.map((item, index) => (
            <div
              key={`${item.image.url}-${index}`}
              className="group flex min-h-32 w-1/2 items-center justify-center bg-white p-7 outline-1 outline-gray-200 -outline-offset-1 transition-colors duration-300 hover:bg-gray-50 dark:bg-white/3 dark:outline-white/10 dark:hover:bg-white/[0.07] md:min-h-40 md:w-1/3 md:p-10"
            >
              {item.image && (
                <PrismicNextImage
                  field={item.image}
                  className="h-12 w-32 object-contain grayscale opacity-65 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0 md:h-14 md:w-40"
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
