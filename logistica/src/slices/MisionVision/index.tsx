import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Eye, Target } from "lucide-react";
import Badge from "@/components/ui/badge";

export type MisionVisionProps = SliceComponentProps<Content.MisionVisionSlice>;

const MisionVision: FC<MisionVisionProps> = ({ slice }) => {
  const hasMission =
    Boolean(slice.primary.mission_title) ||
    slice.primary.mission_description.length > 0;
  const hasVision =
    Boolean(slice.primary.vision_title) ||
    slice.primary.vision_description.length > 0;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 transition-colors duration-300 dark:bg-night-dark md:py-24"
    >
      <div className="section-container">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
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
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {hasMission && (
            <article className="rounded-3xl border border-gray-200 bg-slate-50 p-8 shadow-sm transition-colors dark:border-white/10 dark:bg-white/5 md:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-night">
                <Target aria-hidden="true" className="h-7 w-7" />
              </div>
              {slice.primary.mission_title && (
                <h3 className="font-primary text-2xl font-bold text-night dark:text-white">
                  {slice.primary.mission_title}
                </h3>
              )}
              <div className="mt-4 font-secondary leading-relaxed text-gray-600 dark:text-gray-300">
                <PrismicRichText
                  field={slice.primary.mission_description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="mb-4">{children}</p>
                    ),
                  }}
                />
              </div>
            </article>
          )}

          {hasVision && (
            <article className="rounded-3xl border border-gray-200 bg-slate-50 p-8 shadow-sm transition-colors dark:border-white/10 dark:bg-white/5 md:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-night text-white dark:bg-accent dark:text-night">
                <Eye aria-hidden="true" className="h-7 w-7" />
              </div>
              {slice.primary.vision_title && (
                <h3 className="font-primary text-2xl font-bold text-night dark:text-white">
                  {slice.primary.vision_title}
                </h3>
              )}
              <div className="mt-4 font-secondary leading-relaxed text-gray-600 dark:text-gray-300">
                <PrismicRichText
                  field={slice.primary.vision_description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="mb-4">{children}</p>
                    ),
                  }}
                />
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default MisionVision;
