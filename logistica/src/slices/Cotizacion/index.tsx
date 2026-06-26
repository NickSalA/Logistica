"use client";
import { FC } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { MapPin, PhoneIcon, ClockIcon } from "lucide-react";

export type CotizacionProps = SliceComponentProps<Content.CotizacionSlice>;

// Selecciona el icono según el nombre que viene en `titulo`
function getIcon(iconName: KeyTextField) {
  switch (iconName) {
    case "map":
      return <MapPin className="w-6 h-6 md:w-10 md:h-10 mr-2 text-accent flex-shrink-0" />;
    case "phone":
      return <PhoneIcon className="w-6 h-6 md:w-10 md:h-10 mr-2 text-accent flex-shrink-0" />;
    case "clock":
      return <ClockIcon className="w-6 h-6 md:w-10 md:h-10 mr-2 text-accent flex-shrink-0" />;
    default:
      return null;
  }
}

const Cotizacion: FC<CotizacionProps> = ({ slice }) => {
  const opcionesServicios = slice.primary.servicios ?? [];
  const predeterminado = (slice.primary.servicio as string | null) ?? undefined;
  
  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent";
  const submitButtonClass = "w-full bg-charcoal text-white py-2 px-4 rounded hover:bg-accent hover:text-night transition-colors text-sm font-semibold cursor-pointer";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container px-4 mx-auto"
    >
      {/* Mobile: Layout vertical con dos bloques superpuestos */}
      <div className="block md:hidden relative p-4">
        {/* Bloque superior: Información de contacto */}
        <div className="bg-sand rounded-3xl p-8 m-4 pb-12">
          {/* Encabezados */}
          <div className="mb-6">
            <PrismicRichText
              field={slice.primary.contactenos}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-3xl font-light leading-tight text-night">
                    {children}
                  </p>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.horas}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-3xl text-accent font-bold">{children}</p>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.dias}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-3xl font-bold text-night">{children}</p>
                ),
              }}
            />
          </div>

          {/* Información de contacto */}
          <div className="mt-4">
            {slice.primary.contenido?.map((item, index) => {
              const icon = getIcon(item.titulo);

              const content = (
                <div className="flex items-center mb-4">
                  {icon}
                  <span className="text-gray-700 hover:text-gray-900 font-bold transition text-lg">
                    {item.info}
                  </span>
                </div>
              );

              return item.activo && item.link ? (
                <PrismicNextLink key={index} field={item.link}>
                  {content}
                </PrismicNextLink>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </div>

        {/* Bloque inferior superpuesto: Formulario */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl relative z-10 -mt-12">
          <h3 className="text-lg font-semibold mb-4">
            <PrismicRichText
              field={slice.primary.cotizacion}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-accent text-2xl font-bold">{children}</p>
                ),
              }}
            />
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
            autoComplete="off"
          >
            <div>
              <p className="mb-2 text-sm">E-mail:<span className="text-red-500">*</span></p>
              <input
                type="email"
                required
                placeholder="example@email.com"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="mb-2 text-sm">Celular:</p>
                <input
                  type="tel"
                  required
                  placeholder="Ingrese su número aquí"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-sm">DNI o RUC:<span className="text-red-500">*</span></p>
                <input
                  type="text"
                  required
                  placeholder="Ingrese su DNI aquí"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm">Tipo de servicio:<span className="text-red-500">*</span></p>
              <select
                required
                defaultValue={predeterminado}
                className={inputClass}
              >
                {opcionesServicios.map((item, idx) => (
                  <option key={idx} value={item.servicio ?? ""}>
                    {item.servicio}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm">Fecha del servicio:<span className="text-red-500">*</span></p>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                required
                placeholder="dd/mm/yyyy"
                className={inputClass}
              />
            </div>

            <div>
              <p className="mb-2 text-sm">Mensaje:<span className="text-red-500">*</span></p>
              <textarea
                required
                placeholder="Escriba aquí"
                className={`${inputClass} min-h-20 resize-none`}
                rows={3}
              />
            </div>

            <button
              type="submit"
              className={submitButtonClass}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Desktop: Layout original de dos columnas */}
      <div className="hidden md:block">
        <div className="relative grid md:grid-cols-2 gap-0 p-5 m-8">
          {/* Columna izquierda */}
          <div className="bg-sand p-8 rounded-3xl md:pr-16 m-4">
            {/* Encabezados */}
            <div className="mb-8">
              <PrismicRichText
                field={slice.primary.contactenos}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-6xl font-light leading-tight text-night">
                      {children}
                    </p>
                  ),
                }}
              />
              <PrismicRichText
                field={slice.primary.horas}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-6xl text-accent font-bold">{children}</p>
                  ),
                }}
              />
              <PrismicRichText
                field={slice.primary.dias}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-6xl font-bold text-night">{children}</p>
                  ),
                }}
              />
            </div>
            {/* Información de contacto */}
            <div className="mt-12">
              {slice.primary.contenido?.map((item, index) => {
                const icon = getIcon(item.titulo);

                const content = (
                  <div className="flex items-center mb-12">
                    {icon}
                    <span className="text-gray-700 hover:text-gray-900 font-bold transition text-xl">
                      {item.info}
                    </span>
                  </div>
                );

                return item.activo && item.link ? (
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
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative z-10 md:-ml-8 space-y-6">
            <h3 className="text-xl font-semibold mb-6 text-center">
              <PrismicRichText
                field={slice.primary.cotizacion}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-accent text-3xl font-bold">{children}</p>
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
                  autoComplete="email"
                  placeholder="example@email.com"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <p className="mb-2">Celular:</p>
                  <input
                    type="tel"
                    required
                    placeholder="Ingrese su número aquí"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mb-2">DNI o RUC:<span className="text-red-500">*</span></p>
                  <input
                    type="text"
                    required
                    placeholder="Ingrese su DNI aquí"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <p className="mb-2">Tipo de servicio:<span className="text-red-500">*</span></p>
                <select
                  required
                  defaultValue={predeterminado}
                  className={inputClass}
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
                  className={inputClass}
                />
              </div>

              <div>
                <p className="mb-2">Mensaje:<span className="text-red-500">*</span></p>
                <textarea
                  required
                  placeholder="Escriba aquí"
                  className={`${inputClass} max-h-32 min-h-32`}
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className={submitButtonClass}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Cotizacion;