import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Badge from "@/components/ui/badge";

export type TrayectoriaProps = SliceComponentProps<Content.TrayectoriaSlice>;

const Trayectoria: FC<TrayectoriaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-[#0b1625] md:py-24"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            {slice.primary.badge_text && (
              <Badge variant="accent" className="mb-5">
                {slice.primary.badge_text}
              </Badge>
            )}
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading1: ({ children }) => (
                  <h2 className="font-primary text-3xl font-extrabold leading-tight tracking-tight text-night dark:text-white md:text-4xl">
                    {children}
                  </h2>
                ),
                heading2: ({ children }) => (
                  <h2 className="font-primary text-3xl font-extrabold leading-tight tracking-tight text-night dark:text-white md:text-4xl">
                    {children}
                  </h2>
                ),
                paragraph: ({ children }) => (
                  <h2 className="font-primary text-3xl font-extrabold leading-tight tracking-tight text-night dark:text-white md:text-4xl">
                    {children}
                  </h2>
                ),
              }}
            />
            <div className="mt-6 font-secondary text-base leading-relaxed text-gray-600 dark:text-gray-300">
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-4">{children}</p>
                  ),
                }}
              />
            </div>
            {slice.primary.image && (
              <PrismicNextImage
                field={slice.primary.image}
                className="mt-8 aspect-video w-full rounded-3xl object-cover shadow-xl"
              />
            )}
          </div>

          {slice.primary.milestones.length > 0 && (
            <ol className="relative flex flex-col gap-7 border-l-2 border-accent/40 pl-7 md:pl-10">
              {slice.primary.milestones.map((milestone, index) => (
                <li key={`${milestone.year}-${index}`} className="relative">
                  <span className="absolute -left-[2.1rem] top-1 h-4 w-4 rounded-full border-4 border-slate-50 bg-accent dark:border-[#0b1625] md:-left-[2.65rem]" />
                  {milestone.year && (
                    <p className="font-primary text-sm font-bold tracking-widest text-accent">
                      {milestone.year}
                    </p>
                  )}
                  {milestone.title && (
                    <h3 className="mt-1 font-primary text-xl font-bold text-night dark:text-white">
                      {milestone.title}
                    </h3>
                  )}
                  {milestone.description && (
                    <p className="mt-2 font-secondary leading-relaxed text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trayectoria;
