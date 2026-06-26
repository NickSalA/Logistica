"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Award, Shield, Users, Zap, LucideIcon, ChevronUp, ChevronDown } from "lucide-react";

// Mapping Prismic card_icon names to Lucide Icon components
const iconMap: Record<string, LucideIcon> = {
  award: Award,
  shield: Shield,
  users: Users,
  zap: Zap,
};

function getIcon(iconName: string | null): LucideIcon {
  if (!iconName) return Award;
  const key = iconName.toLowerCase().trim();
  return iconMap[key] || Award;
}

/**
 * Props for `Beneficios`.
 */
export type BeneficiosProps = SliceComponentProps<Content.BeneficiosSlice>;

/**
 * Component for "Beneficios" Slices.
 */
const Beneficios: FC<BeneficiosProps> = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Círculo decorativo de fondo */}
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-night/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Cabecera de la Sección */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          {slice.primary.badge_text && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-primary uppercase tracking-wider mb-4">
              {slice.primary.badge_text}
            </div>
          )}

          {slice.primary.title && (
            <div className="max-w-3xl">
              <PrismicRichText 
                field={slice.primary.title} 
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
                  )
                }}
              />
            </div>
          )}

          {slice.primary.subtitle && (
            <p className="font-secondary text-sm md:text-base leading-relaxed text-gray-500 max-w-2xl mt-4">
              {slice.primary.subtitle}
            </p>
          )}
        </div>

        {/* Grilla de Tarjetas de Beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {slice.primary.cards?.map((item, index) => {
            const IconComponent = getIcon(item.card_icon);
            const isActive = activeIndex === index;

            return (
              <div 
                key={index}
                onClick={() => handleCardClick(index)}
                className={`group relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out bg-night-dark cursor-pointer select-none ${
                  isActive ? "-translate-y-2 shadow-2xl ring-2 ring-accent" : ""
                }`}
              >
                {/* Imagen de fondo en escala de grises con zoom al hover */}
                {item.card_image && (
                  <div className="absolute inset-0 w-full h-full">
                    <PrismicNextImage 
                      field={item.card_image} 
                      className={`absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-in-out ${
                        isActive ? "grayscale-0 scale-105 opacity-35" : "grayscale group-hover:grayscale-0"
                      }`}
                    />
                  </div>
                )}

                {/* Degradado oscuro para asegurar la legibilidad del texto */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 z-10 ${
                  isActive 
                    ? "from-night-dark via-night-dark/95 to-night-dark/70" 
                    : "from-night-dark via-night/45 to-transparent opacity-85 group-hover:opacity-90"
                }`} />

                {/* Contenido flotante */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-20">
                  
                  {/* Píldora del Icono y Número */}
                  <div className="w-full flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1 rounded-full bg-night-dark/70 backdrop-blur-md border border-white/10 shadow-inner">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10">
                        <IconComponent className="w-3 h-3 text-white" strokeWidth={2.5} />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-accent font-primary uppercase">
                        {item.card_number && `${item.card_number} · `}{item.card_tag}
                      </span>
                    </div>

                    {/* Indicador de expansión */}
                    <div className="text-white/60 group-hover:text-white transition-colors">
                      {isActive ? (
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                      ) : (
                        <ChevronUp className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>

                  {/* Título de la Tarjeta */}
                  {item.card_title && (
                    <h3 className={`font-primary text-white text-lg md:text-xl font-bold mt-4 leading-snug transition-colors duration-300 ${
                      isActive ? "text-accent" : "group-hover:text-accent"
                    }`}>
                      {item.card_title}
                    </h3>
                  )}

                  {/* Descripción del Beneficio (Se expande suavemente al hacer clic) */}
                  <p className={`font-secondary text-white/80 text-xs md:text-sm leading-relaxed transition-all duration-500 overflow-hidden ${
                    isActive 
                      ? "opacity-100 max-h-28 mt-3 translate-y-0" 
                      : "opacity-0 max-h-0 translate-y-4 pointer-events-none"
                  }`}>
                    {item.card_description}
                  </p>

                  {/* Línea de acento amarilla animada */}
                  <div className={`h-1 bg-accent mt-4 rounded-full transition-all duration-500 ease-out ${
                    isActive ? "w-24" : "w-12 group-hover:w-24"
                  }`} />

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Beneficios;
