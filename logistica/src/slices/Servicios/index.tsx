import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Truck, Network, ClipboardCheck, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";

/**
 * Props for `Servicios`.
 */
export type ServiciosProps = SliceComponentProps<Content.ServiciosSlice>;

/**
 * Helper to get the correct icon for each service item
 */
function getServiceIcon(tituloField: any, index: number) {
  const titleText =
    tituloField && tituloField[0] && "text" in tituloField[0]
      ? (tituloField[0].text as string).toLowerCase()
      : "";

  const iconClass = "w-6 h-6 md:w-7 md:h-7 text-night transition-transform duration-300 group-hover:scale-110";

  if (titleText.includes("transporte") || titleText.includes("carga")) {
    return <Truck className={iconClass} />;
  }
  if (
    titleText.includes("logística") ||
    titleText.includes("logistica") ||
    titleText.includes("integral")
  ) {
    return <Network className={iconClass} />;
  }
  if (
    titleText.includes("proyecto") ||
    titleText.includes("gestión") ||
    titleText.includes("gestion")
  ) {
    return <ClipboardCheck className={iconClass} />;
  }

  // Fallbacks by index
  if (index === 0) return <Truck className={iconClass} />;
  if (index === 1) return <Network className={iconClass} />;
  return <ClipboardCheck className={iconClass} />;
}

/**
 * Component for "Servicios" Slices.
 */
const Servicios: FC<ServiciosProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 md:py-24 relative overflow-hidden"
    >
      {/* Círculos difuminados de fondo para dar profundidad y evitar sensación de vacío */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-night/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Columna Izquierda (8/12): Contenido, Lista de Servicios y Botón */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Badge de Categoría / Sección */}
            <Badge variant="accent" className="w-fit">
              {(slice.primary as any).badge_text || "Nuestros Servicios"}
            </Badge>

            {/* Títulos y Subtítulo */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                {slice.primary.titulo_1 && (
                  <PrismicRichText
                    field={slice.primary.titulo_1}
                    components={{
                      heading1: ({ node }) => (
                        <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-extrabold text-night uppercase tracking-tight leading-normal">
                          {node.text.split(" ").map((word, idx) => {
                            if (word.toLowerCase().includes("eficientes")) {
                              return (
                                <span
                                  key={idx}
                                  className="relative inline-block px-3 py-0.5 mx-1 rounded-xl bg-accent text-night font-black shadow-xs transform -rotate-1 hover:rotate-0 transition-all duration-300 cursor-default"
                                >
                                  {word}
                                </span>
                              );
                            }
                            return <span key={idx}>{word} </span>;
                          })}
                        </h2>
                      ),
                    }}
                  />
                )}
                {slice.primary.titulo_2 && (
                  <PrismicRichText
                    field={slice.primary.titulo_2}
                    components={{
                      heading1: ({ children }) => (
                        <h2 className="font-primary text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent uppercase tracking-tight leading-tight">
                          {children}
                        </h2>
                      ),
                    }}
                  />
                )}
              </div>

              {slice.primary.subtitulo && (
                <div className="max-w-3xl">
                  <PrismicRichText
                    field={slice.primary.subtitulo}
                    components={{
                      heading2: ({ children }) => (
                        <h3 className="font-secondary text-base md:text-lg font-bold text-night leading-relaxed">
                          {children}
                        </h3>
                      ),
                      paragraph: ({ children }) => (
                        <p className="font-secondary text-base md:text-lg font-semibold text-night leading-relaxed">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </div>
              )}
            </div>

            {/* Lista de Servicios Estructurada con Separadores y Hover */}
            <div className="flex flex-col">
              {slice.primary.servicios.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className="flex gap-4 items-start p-4 -mx-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50/80 hover:shadow-xs transition-all duration-350 group cursor-default"
                  >
                    {/* Contenedor del Icono */}
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-100 rounded-2xl flex-shrink-0 transition-colors duration-300 group-hover:bg-accent/20">
                      {getServiceIcon(item.titulo, index)}
                    </div>

                    {/* Textos del Servicio */}
                    <div className="flex flex-col pt-1">
                      <PrismicRichText
                        field={item.titulo}
                        components={{
                          paragraph: ({ children }) => (
                            <h4 className="font-primary font-bold text-night text-base md:text-lg leading-tight mb-1">
                              {children}
                            </h4>
                          ),
                        }}
                      />
                      <PrismicRichText
                        field={item.contenido}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="font-secondary text-gray-600 text-sm md:text-base leading-relaxed">
                              {children}
                            </p>
                          ),
                        }}
                      />
                    </div>
                  </div>
                  {/* Separador entre elementos de la lista */}
                  {index < slice.primary.servicios.length - 1 && (
                    <div className="h-px bg-gray-100 my-1 opacity-60" />
                  )}
                </div>
              ))}
            </div>

            {/* Botón de Acción Secundario Enmarcado */}
            {slice.primary.contenido_boton && (
              <div className="pt-2">
                <Button
                  field={slice.primary.boton}
                  variant="outline"
                  className="w-full sm:w-auto uppercase tracking-wider text-xs md:text-sm font-bold group"
                >
                  {slice.primary.contenido_boton}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Columna Derecha (4/12): Imagen Circular Premium con Aura de Acento */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            {slice.primary.imagen && (
              <div className="relative flex flex-col items-center">
                {/* Aura/Brillo decorativo difuminado en el fondo de la imagen */}
                <div className="absolute -inset-6 bg-accent/10 rounded-full blur-2xl -z-10 animate-pulse" />

                {/* Contenedor circular con borde offset y padding */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] rounded-full border border-gray-300 p-2 flex items-center justify-center bg-white shadow-xl transition-all duration-500 hover:border-accent">
                  <PrismicNextImage
                    field={slice.primary.imagen}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Leyenda / Epígrafe */}
                {slice.primary.texto_imagen && (
                  <PrismicRichText
                    field={slice.primary.texto_imagen}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="mt-6 text-xs md:text-sm text-gray-500 font-secondary italic text-center">
                          {children}
                        </p>
                      ),
                    }}
                  />
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Servicios;
