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
      return <MapIcon className="w-10 h-10 mr-2 text-yellow-600" />;
    case "phone":
      return <PhoneIcon className="w-10 h-10 mr-2 text-yellow-600" />;
    case "clock":
      return <ClockIcon className="w-10 h-10 mr-2 text-yellow-600" />;
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
      <div className="relative grid md:grid-cols-2 gap-0 p-5 m-8">
        {/* Columna izquierda */}
        <div className="bg-[#F5F5DC] p-8 rounded-3xl md:pr-16 m-4">
          {/* Encabezados */}
          <div className="mb-8">
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
          <div className="mt-12">
            {slice.primary.contenido?.map((item, index) => {
              const icon = getIcon(item.titulo);

              // Construye el contenido: icono + texto
              const content = (
                <div className="flex items-center mb-12">
                  {icon}
                  <span className="text-gray-600 hover:text-gray-800 font-bold transition text-xl">
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
        <div className="bg-white p-8 rounded-3xl shadow-2xl relative z-10 md:-ml-8 space-y-6">
          <h3 className="text-xl font-semibold mb-6 text-center">
            <PrismicRichText
              field={slice.primary.cotizacion}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-yellow-400 text-3xl">{children}</p>
                ),
              }}
            />
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
            autoComplete="off"
          > 
            <div>
              <p className="mb-2">E-mail:<span className="text-red-500">*</span></p>
              <input
                type="email"
                required
                placeholder="example@email.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="mb-2">Celular:</p>
                <input
                  type="tel"
                  required
                  placeholder="Ingrese su número aquí"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
                />
              </div>
              <div className="flex flex-col">
                <p className="mb-2">DNI o RUC:<span className="text-red-500">*</span></p>
                <input
                  type="text"
                  required
                  placeholder="Ingrese su DNI aquí"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
                />
              </div>
            </div>

            <div>
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
            </div>

            <div>
              <p className="mb-2">Fecha del servicio:<span className="text-red-500">*</span></p>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                required
                placeholder="dd/mm/yyyy"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600"
              />
            </div>

            <div>
              <p className="mb-2">Mensaje:<span className="text-red-500">*</span></p>
              <textarea
                required
                placeholder="Escriba aquí"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-600 max-h-32 min-h-32"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C2C2C] text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors"
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