import { FC } from "react";
import { asLink, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ArrowDown } from "lucide-react";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

export type PresentacionInstitucionalProps =
  SliceComponentProps<Content.PresentacionInstitucionalSlice>;

const PresentacionInstitucional: FC<PresentacionInstitucionalProps> = ({
  slice,
}) => {
  const ctaHref = asLink(slice.primary.cta_link);
  const ctaAnchor = ctaHref?.startsWith("#") ? ctaHref : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-white pb-20 pt-32 transition-colors duration-300 dark:bg-night-dark md:pb-28 md:pt-40"
    >
      <div className="absolute -right-32 top-20 -z-10 h-md w-md rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 -z-10 size-md rounded-full bg-night/5 blur-3xl dark:bg-accent/5" />

      <div className="section-container grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          {slice.primary.badge_text && (
            <Badge variant="accent" className="mb-6">
              {slice.primary.badge_text}
            </Badge>
          )}

          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="font-primary text-4xl font-extrabold leading-[1.08] tracking-tight text-night dark:text-white sm:text-5xl lg:text-6xl">
                  {children}
                </h1>
              ),
              heading2: ({ children }) => (
                <h1 className="font-primary text-4xl font-extrabold leading-[1.08] tracking-tight text-night dark:text-white sm:text-5xl lg:text-6xl">
                  {children}
                </h1>
              ),
              paragraph: ({ children }) => (
                <h1 className="font-primary text-4xl font-extrabold leading-[1.08] tracking-tight text-night dark:text-white sm:text-5xl lg:text-6xl">
                  {children}
                </h1>
              ),
            }}
          />

          <div className="mt-7 max-w-2xl border-l-2 border-accent pl-5 font-secondary text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className="mb-4">{children}</p>,
              }}
            />
          </div>

          {slice.primary.cta_label && isFilled.link(slice.primary.cta_link) && (
            <div className="mt-8">
              <Button
                {...(ctaAnchor
                  ? { href: ctaAnchor }
                  : { field: slice.primary.cta_link })}
                variant="accent"
                className="group rounded-full px-7 py-3.5 shadow-lg"
              >
                {slice.primary.cta_label}
                <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </Button>
            </div>
          )}
        </div>

        <div className="relative lg:col-span-6">
          {slice.primary.image && (
            <div className="relative overflow-hidden rounded-4xl border border-gray-200 bg-white p-2 shadow-2xl transition-colors dark:border-white/15 dark:bg-white/5">
              <PrismicNextImage
                field={slice.primary.image}
                priority
                className="aspect-4/3 w-full rounded-[1.7rem] object-cover"
              />
            </div>
          )}
          <div className="absolute -bottom-5 -left-5 -z-10 h-28 w-28 rounded-3xl border border-accent/35 bg-accent/15" />
        </div>
      </div>
    </section>
  );
};

export default PresentacionInstitucional;
