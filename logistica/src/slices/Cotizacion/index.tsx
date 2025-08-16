"use client";
import { FC } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { MapIcon, PhoneIcon, ClockIcon } from "lucide-react";

export type CotizacionProps = SliceComponentProps<Content.CotizacionSlice>;

// Selecciona el icono según el nombre que viene en `titulo`
function getIcon(iconName: KeyTextField) {
  switch (iconName) {
    case "map":
      return <MapIcon className="w-5 h-5 mr-2 text-yellow-600" />;
    case "phone":
      return <PhoneIcon className="w-5 h-5 mr-2 text-yellow-600" />;
    case "clock":
      return <ClockIcon className="w-5 h-5 mr-2 text-yellow-600" />;
    default:
      return null;
  }
}

const Cotizacion: FC<CotizacionProps> = ({ slice }) => {
  const opcionesServicios = slice.primary.servicios ?? [];
  const predeterminado = (slice.primary.servicio as string | null) ?? undefined;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container px-4 mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-8 p-5 m-8">
        {/* Columna izquierda */}
        <div className="">
          {/* Encabezados */}
          <div className="">
          <PrismicRichText
            field={slice.primary.contactenos}
            components={{
              paragraph: ({ children }) => (
                <p className="text-6xl font-light leading-tight">
                  {children}
                </p>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.horas}
            components={{
              paragraph: ({ children }) => (
                <p className="text-6xl text-yellow-400 font-bold">{children}</p>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.dias}
            components={{
              paragraph: ({ children }) => (
                <p className="text-6xl font-bold">{children}</p>
              ),
            }}
          />
          </div>
          {/* Información de contacto */}
          <div className="space-y-4">
            {slice.primary.contenido?.map((item, index) => {
              const icon = getIcon(item.titulo);

              // Construye el contenido: icono + texto
              const content = (
                <div className="flex items-center">
                  {icon}
                  <span className="text-gray-600 hover:text-gray-800 transition">
                    {item.info}
                  </span>
                </div>
              );

              return item.activo && item.link ? (
                // Solo envuelve en link si `activo` es true y hay enlace
                <PrismicNextLink key={index} field={item.link}>
                  {content}
                </PrismicNextLink>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </div>

        {/* Columna derecha (formulario) */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold mb-2">
            <PrismicRichText
              field={slice.primary.cotizacion}
              components={{
                heading3: ({ children }) => (
                  <span className="text-yellow-600">{children}</span>
                ),
              }}
            />
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
            autoComplete="off"
          >
            <input
              type="email"
              required
              placeholder="example@email.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
            />

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



            <select
              required
              defaultValue={predeterminado}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
            >
              {opcionesServicios.map((item, idx) => (
                <option key={idx} value={item.servicio ?? ""}>
                  {item.servicio}
                </option>
              ))}
            </select>

            <input
              type="date"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
            />

            <textarea
              required
              placeholder="Escriba aquí"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
              rows={4}
            />

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section >
  );
};

export default Cotizacion;
