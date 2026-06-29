"use client";
import { FC } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { MapPin, PhoneIcon, ClockIcon } from "lucide-react";
import Button from "@/components/ui/button";

export type CotizacionProps = SliceComponentProps<Content.CotizacionSlice>;

// Selecciona el icono según el nombre que viene en `titulo`
function getIcon(iconName: KeyTextField) {
  switch (iconName) {
    case "map":
      return <MapPin className="w-6 h-6 md:w-8 md:h-8 mr-3 text-accent flex-shrink-0" />;
    case "phone":
      return <PhoneIcon className="w-6 h-6 md:w-8 md:h-8 mr-3 text-accent flex-shrink-0" />;
    case "clock":
      return <ClockIcon className="w-6 h-6 md:w-8 md:h-8 mr-3 text-accent flex-shrink-0" />;
    default:
      return null;
  }
}

const Cotizacion: FC<CotizacionProps> = ({ slice }) => {
  const opcionesServicios = slice.primary.servicios ?? [];
  const predeterminado = (slice.primary.servicio as string | null) ?? undefined;
  
  const inputClass = "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:bg-white dark:focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300";

  return (
    <section
      id="cotizacion"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container px-4 sm:px-6 mx-auto scroll-mt-24 pt-2 pb-12 md:py-24"
    >
      {/* Contenedor relativo para habilitar la superposición en escritorio */}
      <div className="relative max-w-6xl mx-auto">
        
        {/* Bloque de Contacto (Azul Corporativo) - Base del Layout */}
        <div className="w-full lg:w-2/3 bg-night dark:bg-night-dark text-white px-6 pt-10 pb-24 md:px-12 md:pt-12 md:pb-28 lg:py-24 lg:pl-16 lg:pr-48 rounded-3xl relative overflow-hidden z-0 shadow-lg lg:min-h-[600px] flex flex-col justify-center transition-colors duration-300">
          {/* Elemento decorativo de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
          
          <div className="relative z-10">
            {/* Encabezados */}
            <div className="mb-10">
              <PrismicRichText
                field={slice.primary.contactenos}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-sm font-bold tracking-widest text-accent uppercase mb-3">
                      {children}
                    </p>
                  ),
                }}
              />
              
              <div className="flex flex-col gap-1">
                <PrismicRichText
                  field={slice.primary.horas}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="font-primary text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none">
                        {children}
                      </p>
                    ),
                  }}
                />
                <PrismicRichText
                  field={slice.primary.dias}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="font-primary text-4xl md:text-5xl lg:text-6xl font-black text-gray-300 leading-none">
                        {children}
                      </p>
                    ),
                  }}
                />
              </div>
            </div>

            {/* Información de contacto */}
            <div className="flex flex-col gap-6">
              {slice.primary.contenido?.map((item, index) => {
                const icon = getIcon(item.titulo);

                const content = (
                  <div className="flex items-center group">
                    {icon}
                    <span className="text-gray-300 group-hover:text-white font-secondary text-base lg:text-lg transition-colors duration-300">
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
        </div>

        {/* Bloque Formulario Superpuesto */}
        <div className="w-full mx-auto lg:mx-0 lg:w-1/2 max-w-[600px] bg-white dark:bg-[#0a192f] p-6 sm:p-8 md:p-10 rounded-3xl shadow-super-strong relative z-10 -mt-16 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 transition-colors duration-300 border border-transparent dark:border-white/10">
          <div className="mb-8 text-center lg:text-left">
            <PrismicRichText
              field={slice.primary.cotizacion}
              components={{
                paragraph: ({ children }) => (
                  <h3 className="font-primary text-2xl md:text-3xl font-extrabold text-night dark:text-white uppercase tracking-tight transition-colors duration-300">
                    {children}
                  </h3>
                ),
              }}
            />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
            autoComplete="off"
          >
            <div>
              <label className="block mb-1.5 font-secondary text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {(slice.primary as any).label_email || "E-mail:"}<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="ejemplo@correo.com"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="block mb-1.5 font-secondary text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  {(slice.primary as any).label_celular || "Celular:"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ingrese número"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-1.5 font-secondary text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  {(slice.primary as any).label_documento || "DNI o RUC:"}<span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ingrese documento"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 font-secondary text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {(slice.primary as any).label_servicio || "Tipo de servicio:"}<span className="text-red-500 ml-0.5">*</span>
              </label>
              <select
                required
                defaultValue={predeterminado}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {opcionesServicios.map((item, idx) => (
                  <option key={idx} value={item.servicio ?? ""}>
                    {item.servicio}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1.5 font-secondary text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {(slice.primary as any).label_fecha || "Fecha del servicio:"}<span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-1.5 font-secondary text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {(slice.primary as any).label_mensaje || "Mensaje:"}<span className="text-red-500 ml-0.5">*</span>
              </label>
              <textarea
                required
                placeholder="¿En qué podemos ayudarle?"
                className={`${inputClass} min-h-[100px] resize-y`}
                rows={3}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full uppercase tracking-wider text-sm shadow-md">
                {(slice.primary as any).texto_boton_enviar || "Enviar Solicitud"}
              </Button>
            </div>
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default Cotizacion;