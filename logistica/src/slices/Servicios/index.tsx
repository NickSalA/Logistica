import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
/**
 * Props for `Servicios`.
 */
export type ServiciosProps = SliceComponentProps<Content.ServiciosSlice>;

/**
 * Component for "Servicios" Slices.
 */
const Servicios: FC<ServiciosProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Escritorio */}
      {/*Lado izquierdo*/}
      <div className="flex flex-col items-center justify-center p-8">
        <PrismicRichText field={slice.primary.titulo_1} components={{ heading1: ({ children }) => <h1 className="text-4xl font-bold text-center mb-4">{children}</h1> }} />
        <PrismicRichText field={slice.primary.titulo_2} components={{ heading1: ({ children }) => <h1 className="text-4xl font-bold text-center mb-4">{children}</h1> }} />
        <PrismicRichText field={slice.primary.subtitulo} components={{ heading2: ({ children }) => <h2 className="text-2xl font-semibold text-center mb-4">{children}</h2> }} />
        {slice.primary.servicios.map((item, index) => (
          <div key={index}>
            <PrismicRichText field={item.titulo} components={{ paragraph: ({ children }) => <p className="text-lg text-center mb-2">{children}</p> }} />
            <p>→</p>
            <PrismicRichText field={item.contenido} components={{ paragraph: ({ children }) => <p className="text-base text-center mb-6">{children}</p> }} />
          </div>
        ))}
        <PrismicNextLink field={slice.primary.boton}> 
          {slice.primary.contenido_boton}
        </PrismicNextLink>
      </div>
      {/*Lado derecho*/}
      {/* Móvil */}
    </section>
  );
};

export default Servicios;
