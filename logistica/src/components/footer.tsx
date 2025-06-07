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
        <footer>
            <div className="flex flex-col md:grid md:grid-cols-4 w-full py-4 px-4 mx-auto md:gap-12 md:items-start items-center lg:text-md md:text-xs sm:text-md">
                {/* Logo */}
                <div className="flex md:flex-col gap-4 items-center md:px-8 self-center py-4 md:py-0">
                    <Link href="/">
                        <PrismicNextImage field={settings.data.data_title} className="" />
                    </Link>
                    <PrismicRichText field={settings.data.description} components={{
                        paragraph: ({ children }) => (
                            <p className="hidden md:flex text-center md:text-xs lg:text-sm font-primary font-medium">{children}</p>
                        )
                    }} />
                </div>
                {/* Links */}
                <div className="flex md:flex-col flex-row gap-12 md:gap-4 md:justify-start md:pl-12 py-4 md:py-0">
                    <div className="hidden md:flex font-semibold"><p>Conocenos</p></div>
                    {settings.data.nav.map((item, index) => (
                        <PrismicNextLink key={index} field={item.link} className="hover:opacity-80 transition font-semibold md:font-normal">
                            {item.label}
                        </PrismicNextLink>
                    ))}
                </div>
                {/* Contacto */}
                <div className="flex flex-col gap-4 justify-center py-4 md:py-0">
                    <div className="hidden md:flex font-semibold"><p>Contáctanos</p></div>
                    <div className="flex flex-row items-center">
                        <Mail size={32} className="mr-2" />
                        <div className="flex flex-col">
                            {settings.data.correo.map((item, index) => (
                                <PrismicNextLink key={index} field={item.correo} className="hover:opacity-80 transition">
                                    {item.nombre}
                                </PrismicNextLink>
                            ))
                            }
                        </div>
                    </div>
                    <div className="flex md:flex-row items-center">
                        <Phone size={32} className="mr-2 justify-start" />
                        <div className="flex flex-col self-center text-center items-center w-full">
                            {settings.data.telefono.map((item, index) => (
                                <PrismicNextLink key={index} field={item.telefono} className="hover:opacity-80 transition md:self-start self-center">
                                    {item.nombre}
                                </PrismicNextLink>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-col gap-4 justify-start py-4 md:py-0">
                    {/* Redes sociales */}
                    <div className="hidden md:flex font-semibold"><p>Conectar</p></div>
                    <div className="flex flex-row gap-6 "> {settings.data.redes.map((item, index) => (
                        <PrismicNextLink key={index} field={item.red} className="hover:opacity-80 transition">
                            {getIcon(item.nombre)}
                        </PrismicNextLink>
                    ))}</div>
                </div>
            </div>
            {/* Derechos */}
            <div>
                <div className="w-full h-[0.1] flex flex-grow bg-black mt-4 basis-1/4 rounded-lg"></div>
                <PrismicRichText field={settings.data.derechos} components={{
                    paragraph: ({ children }) => (
                        <p className="text-center text-sm font-primary font-semibold p-4">{children}</p>
                    )
                }} />
            </div>
        </footer>
    )
}
