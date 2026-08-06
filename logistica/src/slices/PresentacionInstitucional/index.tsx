import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Badge from "@/components/ui/badge";

export type PresentacionInstitucionalProps =
  SliceComponentProps<Content.PresentacionInstitucionalSlice>;

const PresentacionInstitucional: FC<PresentacionInstitucionalProps> = ({
  slice,
}) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 transition-colors duration-300 dark:bg-night-dark md:py-24"
    >
      <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 flex flex-col items-start lg:order-1">
          {slice.primary.badge_text && (
            <Badge variant="accent" className="mb-5">
              {slice.primary.badge_text}
            </Badge>
          )}
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-primary text-3xl font-extrabold leading-tight tracking-tight text-night dark:text-white md:text-4xl lg:text-5xl">
                  {children}
                </h1>
              ),
              heading2: ({ children }) => (
                <h2 className="font-primary text-3xl font-extrabold leading-tight tracking-tight text-night dark:text-white md:text-4xl lg:text-5xl">
                  {children}
                </h2>
              ),
              paragraph: ({ children }) => (
                <h1 className="font-primary text-3xl font-extrabold leading-tight tracking-tight text-night dark:text-white md:text-4xl lg:text-5xl">
                  {children}
                </h1>
              ),
            }}
          />
          <div className="mt-6 max-w-2xl font-secondary text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className="mb-4">{children}</p>,
              }}
            />
          </div>
        </div>

        {slice.primary.image && (
          <div className="order-1 relative lg:order-2">
            <div className="absolute -inset-4 -z-10 rounded-4xl bg-accent/15 blur-2xl" />
            <PrismicNextImage
              field={slice.primary.image}
              className="aspect-4/3 w-full rounded-4xl object-cover shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PresentacionInstitucional;
