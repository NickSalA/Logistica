"use client";

import { useState } from "react";
import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

type NavBarProps = {
    settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();

    return (
        <nav aria-label="Main navigation" className="p-2">
            <div className="flex flex-col md:flex-row justify-between mx-auto px-4 md:items-center w-full">
                {/* Logo + Hamburguesa */}
                <div className="flex justify-between items-center w-full md:w-auto">
                    <Link href="/" className="z-50" onClick={() => setIsOpen(false)}>
                        <PrismicNextImage field={settings.data.data_title} className="h-12 w-auto md:h-16" />
                    </Link>

                    <button
                        type="button"
                        className="md:hidden p-2 text-night"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu size={32} />
                        <span className="sr-only">Abrir menú</span>
                    </button>
                </div>

                {/* Menú móvil */}
                <div
                    className={clsx(
                        " fixed inset-0 z-40 flex flex-col items-end bg-[#f5f5f5] opacity-95 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
                        isOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <button
                        type="button"
                        className="absolute right-4 top-4 block p-2 text-3xl text-night"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={32} />
                        <span className="sr-only">Cerrar menú</span>
                    </button>

                    <div className="w-full flex flex-col items-end gap-6 mt-12 text-2xl font-primary font-semibold">
                        {settings.data.nav.map((item) => {
                            if (item.special) {
                                return (
                                    <PrismicNextLink
                                        field={item.link}
                                        key={item.label}
                                        className={clsx(
                                            "p-4 hover:underline active:bg-gray-300 active:rounded-2xl", pathName.includes(asLink(item.link) || "") ? "text-night" : ""
                                        )}>
                                        {item.label}
                                    </PrismicNextLink>
                                );
                            }
                            return (
                                <PrismicNextLink
                                    key={item.label}
                                    field={item.link}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "p-4 hover:underline active:bg-gray-300 active:rounded-2xl",
                                        pathName.includes(asLink(item.link) || "") ? "text-night" : ""
                                    )}
                                >
                                    {item.label}
                                </PrismicNextLink>
                            );
                        })
                        }
                    </div>
                </div>

                {/* Menú escritorio */}
                <ul className="hidden md:flex gap-4 text-md font-primary font-semibold">
                    {settings.data.nav.map((item) => {
                        if (item.special) {
                            return (
                                <li key={item.label}>
                                    <PrismicNextLink
                                        field={item.link}
                                        className={clsx(
                                            "hover:underline p-4 active:bg-gray-100 active:rounded-3xl ",
                                            pathName.includes(asLink(item.link) || "") ? "text-night" : ""
                                        )}
                                    >
                                        {item.label}
                                    </PrismicNextLink>
                                </li>
                            );
                        }
                        return (
                            <li key={item.label}>
                                <PrismicNextLink
                                    field={item.link}
                                    className={clsx(
                                        "p-4 hover:underline active:bg-gray-100 active:rounded-3xl ",
                                        pathName.includes(asLink(item.link) || "") ? "text-night" : ""
                                    )}
                                >
                                    {item.label}
                                </PrismicNextLink>
                            </li>
                        );
                    })
                    }
                </ul>
            </div>
        </nav>
    );
}
