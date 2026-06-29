'use client'
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "@/components/ui/button";

/**
 * Props for `Inicio`.
 */
export type InicioProps = SliceComponentProps<Content.InicioSlice>;

/**
 * Component for "Inicio" Slices.
 */
const Inicio: FC<InicioProps> = ({ slice }) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slice.primary.images.length;

  function changeSlide(index: number) {
    if (totalSlides === 0) return;
    const nextSlide = (currentSlide + index + totalSlides) % totalSlides;
    setCurrentSlide(nextSlide);
  }

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Estilo Yape: Título súper grande, centrado y con mucho impacto
  const titleClass = "font-primary text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white font-extrabold leading-[1.05] tracking-tight";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden transition-all duration-300"
    >
      {/* Carrusel de Fondo */}
      <div className="absolute inset-0 w-full h-full z-0 bg-night-dark">
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className={clsx(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Degradado Suave y Elegante para legibilidad sin oscurecer en exceso la foto */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-night-dark/100 via-night-dark/85 to-night-dark/80"></div>

      {/* Contenido principal (Textos y Botones Centrados) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 md:px-12 py-32 flex flex-col items-center text-center mt-12">

        {/* Subtítulo (Amarillo) */}
        {slice.primary.subtitulo && (
          <span className="text-accent font-primary font-bold text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] mb-6">
            {slice.primary.subtitulo}
          </span>
        )}

        {/* Título Principal (Extra Grande) */}
        <div className="mb-8">
          <PrismicRichText field={slice.primary.titulo} components={{
            heading1: ({ children }) => <h1 className={titleClass}>{children}</h1>,
            heading2: ({ children }) => <h2 className={titleClass}>{children}</h2>,
            heading3: ({ children }) => <h3 className={titleClass}>{children}</h3>,
            paragraph: ({ children }) => <p className={titleClass}>{children}</p>
          }} />
        </div>

        {/* Descripción */}
        <div className="font-primary text-base md:text-lg lg:text-xl leading-relaxed text-white/90 max-w-3xl mb-10">
          <PrismicRichText field={slice.primary.descripcion} components={{
            paragraph: ({ children }) => <p className="leading-relaxed">{children}</p>,
          }} />
        </div>

        {/* Botones estilo Yape (Redondeados con resplandor) */}
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto">
          {slice.primary.texto_boton_primario && (
            <Button
              field={slice.primary.enlace_boton_primario}
              variant="accent"
              size="lg"
              className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg shadow-[0_0_25px_rgba(255,192,0,0.5)] hover:shadow-[0_0_35px_rgba(255,192,0,0.7)] hover:-translate-y-1 transition-all rounded-full"
            >
              {slice.primary.texto_boton_primario}
            </Button>
          )}
          {slice.primary.texto_boton_secundario && (
            <Button
              field={slice.primary.enlace_boton_secundario}
              variant="outline-white"
              size="lg"
              className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 text-base md:text-lg bg-white/5 backdrop-blur-sm hover:-translate-y-1 transition-all rounded-full"
            >
              {slice.primary.texto_boton_secundario}
            </Button>
          )}
        </div>
      </div>

      {/* Controles del Carrusel (Flechas y Puntos al estilo Yape) */}
      {totalSlides > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30">
          <button
            onClick={() => changeSlide(-1)}
            className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all group"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex gap-2.5">
            {slice.primary.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={clsx(
                  "h-2 rounded-full transition-all duration-500",
                  currentSlide === idx ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Ir a imagen ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => changeSlide(1)}
            className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all group"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Inicio;
