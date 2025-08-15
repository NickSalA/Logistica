import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import {
  MapIcon,
  PhoneIcon,
  ClockIcon,
} from "lucide-react"; // Ejemplo de iconos importados
import { KeyTextField } from "@prismicio/client";
/**
 * Props for `Cotizacion`.
 */
export type CotizacionProps = SliceComponentProps<Content.CotizacionSlice>;

  function getIcon(iconName: KeyTextField) {
    switch (iconName) {
      case "map":
        return <MapIcon className="w-5 h-5 mr-2" />;
      case "phone":
        return <PhoneIcon className="w-5 h-5 mr-2" />;
      case "clock":
        return <ClockIcon className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  }
/**
 * Component for "Cotizacion" Slices.
 */
const Cotizacion: FC<CotizacionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container px-4 mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div className="space-y-4">
          {/* Encabezado de contacto */}
          <PrismicRichText field={slice.primary.contactenos} components={{
            heading2: ({ children }) => (<h2 className="text-2xl font-bold leading-tight">{children}</h2>
            )
          }} />
          <PrismicRichText field={slice.primary.horas} components={{
            paragraph: ({ children }) => (<p className="text-gray-600">{children}</p>
            )
          }} />
          {/* Información destacada: dirección, teléfono, horario */}
          <PrismicRichText field={slice.primary.dias} components={{
            paragraph: ({ children }) => (<p className="text-gray-600">{children}</p>
            )
          }} />

          {/* Información de contacto: dirección, teléfono, horario */}
          <div className="" >
            {slice.primary.contenido.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                {getIcon(item.titulo)}
              <PrismicNextLink key={index} field={item.link} className="flex items-center text-gray-600 hover:text-gray-800 transition">
                {item.info}
              </PrismicNextLink>
            </div>
            ))}
          </div>
          {/* Columna derecha */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            {/* Título del formulario */}
            <h3 className="text-xl font-semibold mb-2">
              <PrismicRichText field={slice.primary.cotizacion} components={{
                heading3: ({ children }) => (<span className="text-yellow-600">{children}</span>)
              }} />
            </h3>
          </div>
          {/* Formulario de cotización */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Campo de email */}
            <input
              type="email"
              required
              placeholder="example@email.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
            />

            {/* Grupo de inputs: celular y DNI/RUC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                required
                placeholder="Ingrese su número"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
              />
              <input
                type="text"
                required
                placeholder="Ingrese su DNI o RUC"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
              />
            </div>

            {/* Selector de servicio (opciones provenientes de Prismic) */}
            <select
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
            >
              {/* Renderiza las opciones definidas en tu campo select */}
              {Array.isArray(slice.primary.servicio)
                ? slice.primary.servicio.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))
                : slice.primary.servicio && (
                  <option value={slice.primary.servicio}>
                    {slice.primary.servicio}
                  </option>
                )}
            </select>

            {/* Fecha del servicio */}
            <input
              type="date"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
            />

            {/* Mensaje */}
            <textarea
              required
              placeholder="Escriba aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
              rows={4}
            />

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cotizacion;
