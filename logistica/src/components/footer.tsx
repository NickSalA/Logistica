import { createClient } from "@/prismicio";
import { KeyTextField } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import SocialIcon from "@/components/icon";
import { Phone, Mail } from "lucide-react"
import Link from "next/link";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    function getIcon(nombre: KeyTextField) {
        switch (nombre) {
            case "facebook":
                return <SocialIcon platform="facebook" className="w-8 h-8 object-contain" />;
            case "instagram":
                return <SocialIcon platform="instagram" className="w-8 h-8 object-contain" />;
            case "linkedin":
                return <SocialIcon platform="linkedin" className="w-8 h-8 object-contain" />;
            default:
                return null;
        }
    }

    return (
        <footer className="bg-white dark:bg-night-dark relative transition-colors duration-300">
            {/* Separador Degradado Premium */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"></div>
            
            {/* Contenedor Principal */}
            <div className="container mx-auto px-6 md:px-12 xl:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    
                    {/* Columna 1: Marca y Descripción */}
                    <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
                        <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                            <PrismicNextImage field={settings.data.data_title} className="h-16 w-auto object-contain" />
                        </Link>
                        <PrismicRichText 
                            field={settings.data.description} 
                            components={{
                                paragraph: ({ children }) => (
                                    <p className="font-secondary text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-sm">
                                        {children}
                                    </p>
                                )
                            }} 
                        />
                    </div>

                    {/* Columna 2: Enlaces (Conócenos) */}
                    <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
                        <h4 className="font-primary text-night dark:text-white font-bold uppercase tracking-wider text-sm">
                            Conócenos
                        </h4>
                        <nav className="flex flex-col gap-3">
                            {settings.data.nav.map((item, index) => (
                                <PrismicNextLink 
                                    key={index} 
                                    field={item.link} 
                                    className="font-secondary text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300"
                                >
                                    {item.label}
                                </PrismicNextLink>
                            ))}
                        </nav>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
                        <h4 className="font-primary text-night dark:text-white font-bold uppercase tracking-wider text-sm">
                            Contáctanos
                        </h4>
                        <div className="flex flex-col gap-4 w-full">
                            {/* Correos */}
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <div className="mt-0.5 text-accent">
                                    <Mail size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    {settings.data.correo.map((item, index) => (
                                        <PrismicNextLink 
                                            key={index} 
                                            field={item.correo} 
                                            className="font-secondary text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300"
                                        >
                                            {item.nombre}
                                        </PrismicNextLink>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Teléfonos */}
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                                <div className="mt-0.5 text-accent">
                                    <Phone size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    {settings.data.telefono.map((item, index) => (
                                        <PrismicNextLink 
                                            key={index} 
                                            field={item.telefono} 
                                            className="font-secondary text-sm text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300"
                                        >
                                            {item.nombre}
                                        </PrismicNextLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna 4: Redes Sociales */}
                    <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
                        <h4 className="font-primary text-night dark:text-white font-bold uppercase tracking-wider text-sm">
                            Conectar
                        </h4>
                        <div className="flex flex-row gap-5">
                            {settings.data.redes.map((item, index) => (
                                <PrismicNextLink 
                                    key={index} 
                                    field={item.red} 
                                    className="hover:-translate-y-1.5 hover:scale-110 transition-transform duration-300 drop-shadow-sm hover:drop-shadow-md"
                                    aria-label={`Visitar ${item.nombre}`}
                                >
                                    {getIcon(item.nombre)}
                                </PrismicNextLink>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Barra de Derechos (Copyright) */}
            <div className="bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
                <div className="container mx-auto px-6 md:px-12 xl:px-20 py-6">
                    <PrismicRichText 
                        field={settings.data.derechos} 
                        components={{
                            paragraph: ({ children }) => (
                                <p className="text-center font-secondary text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {children}
                                </p>
                            )
                        }} 
                    />
                </div>
            </div>
        </footer>
    );
}
