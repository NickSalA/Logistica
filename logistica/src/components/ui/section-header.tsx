import { RichTextField, KeyTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import Badge from "@/components/ui/badge";

type SectionHeaderProps = {
  badge?: KeyTextField | string;
  badgeVariant?: "accent" | "dark" | "outline";
  title?: RichTextField | string;
  subtitle?: KeyTextField | string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeader({
  badge,
  badgeVariant = "accent",
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={clsx(
        "flex flex-col mb-12 md:mb-16",
        isCenter ? "items-center justify-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {/* Badge de la Sección */}
      {badge && (
        <Badge variant={badgeVariant} className="mb-4">
          {badge}
        </Badge>
      )}

      {/* Título Principal */}
      {title && (
        <div className={clsx("max-w-3xl", isCenter && "mx-auto")}>
          {typeof title === "string" ? (
            <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
              {title}
            </h2>
          ) : (
            <PrismicRichText
              field={title}
              components={{
                heading1: ({ children }) => (
                  <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
                    {children}
                  </h2>
                ),
                heading2: ({ children }) => (
                  <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
                    {children}
                  </h2>
                ),
                heading3: ({ children }) => (
                  <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
                    {children}
                  </h2>
                ),
                paragraph: ({ children }) => (
                  <h2 className="font-primary text-2xl md:text-3xl lg:text-4xl font-extrabold text-night tracking-tight uppercase leading-snug">
                    {children}
                  </h2>
                ),
              }}
            />
          )}
        </div>
      )}

      {/* Subtítulo Descriptivo */}
      {subtitle && (
        <p className={clsx("font-secondary text-sm md:text-base leading-relaxed text-gray-500 max-w-2xl mt-4", isCenter && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
