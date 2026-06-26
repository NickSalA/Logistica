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

  // Estilo común para forzar el título a ser grande, blanco y responsivo
  const titleClass = "font-primary text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-[75vh] md:h-[90vh] flex items-center overflow-hidden"
    >
      {/* Carrusel de Fondo */}
      <div className="absolute inset-0 w-full h-full z-0 bg-night">
        {slice.primary.images.map((item, index) => (
          <PrismicNextImage
            key={index}
            field={item.image}
            className={clsx(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Degradado azul corporativo ultra oscuro para legibilidad (Gradient Overlay) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-night-dark/98 via-night-dark/70 to-night-dark/10"></div>

      {/* Contenido principal (Textos y Botones) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 xl:px-20 flex flex-col justify-center h-full">
        <div className="max-w-2xl flex flex-col gap-6">
          
          {/* Subtítulo (Amarillo) */}
          {slice.primary.subtitulo && (
            <span className="text-accent font-primary font-bold text-sm md:text-base lg:text-lg uppercase tracking-widest">
              {slice.primary.subtitulo}
            </span>
          )}

          {/* Título Principal (Forzado a ser Blanco y Grande sin importar el tag que venga de Prismic) */}
          <PrismicRichText field={slice.primary.titulo} components={{
            heading1: ({ children }) => <h1 className={titleClass}>{children}</h1>,
            heading2: ({ children }) => <h2 className={titleClass}>{children}</h2>,
            heading3: ({ children }) => <h3 className={titleClass}>{children}</h3>,
            paragraph: ({ children }) => <p className={titleClass}>{children}</p>
          }} />

          {/* Línea Separadora */}
          <div className="w-20 h-[3px] bg-accent"></div>

          {/* Descripción (Forzado a ser Blanco con opacidad) */}
          <div className="font-primary text-sm md:text-base lg:text-lg leading-relaxed text-white/80">
            <PrismicRichText field={slice.primary.descripcion} components={{
              paragraph: ({ children }) => <p className="mb-4 leading-relaxed text-white/85">{children}</p>,
              heading1: ({ children }) => <h1 className="font-bold text-white mb-2">{children}</h1>,
              heading2: ({ children }) => <h2 className="font-bold text-white mb-2">{children}</h2>,
              heading3: ({ children }) => <h3 className="font-bold text-white mb-2">{children}</h3>
            }} />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {slice.primary.texto_boton_primario && (
              <Button field={slice.primary.enlace_boton_primario} variant="accent" size="lg" className="w-full sm:w-auto">
                {slice.primary.texto_boton_primario}
              </Button>
            )}
            {slice.primary.texto_boton_secundario && (
              <Button field={slice.primary.enlace_boton_secundario} variant="outline-white" size="lg" className="w-full sm:w-auto">
                {slice.primary.texto_boton_secundario}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Controles del Carrusel (Flechas y Puntos) */}
      {totalSlides > 1 && (
        <>
          {/* Flechas abajo a la derecha */}
          <div className="absolute bottom-10 right-10 md:right-20 z-30 flex gap-4 hidden md:flex">
            <button
              onClick={() => changeSlide(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/30 transition-all backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => changeSlide(1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/30 transition-all backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicadores (Dots) al centro abajo en móvil */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30 md:hidden">
            {slice.primary.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={clsx(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50"
                )}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Inicio;
