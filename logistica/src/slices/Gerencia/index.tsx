import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Quote } from "lucide-react";
import Badge from "@/components/ui/badge";

export type GerenciaProps = SliceComponentProps<Content.GerenciaSlice>;

const Gerencia: FC<GerenciaProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-surface-muted py-16 transition-colors duration-300 dark:bg-surface-dark md:py-24"
    >
      <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {slice.primary.photo && (
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 -z-10 rounded-4xl bg-accent/15 blur-2xl" />
            <PrismicNextImage
              field={slice.primary.photo}
              className="aspect-4/5 w-full rounded-4xl object-cover shadow-2xl"
            />
          </div>
        )}

        <div className="flex flex-col items-start">
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
          <Quote aria-hidden="true" className="mt-7 h-9 w-9 text-accent" />
          <div className="mt-3 font-secondary text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            <PrismicRichText
              field={slice.primary.message}
              components={{
                paragraph: ({ children }) => <p className="mb-4">{children}</p>,
              }}
            />
          </div>
          {(slice.primary.name || slice.primary.role) && (
            <div className="mt-5 border-l-2 border-accent pl-4">
              {slice.primary.name && (
                <p className="font-primary text-lg font-bold text-night dark:text-white">
                  {slice.primary.name}
                </p>
              )}
              {slice.primary.role && (
                <p className="mt-1 font-secondary text-sm font-medium text-gray-500 dark:text-gray-400">
                  {slice.primary.role}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gerencia;
