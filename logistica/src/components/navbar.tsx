"use client";

import { useState, useEffect } from "react";
import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import clsx from "clsx";
import {
    Menu,
    X,
    ChevronDown,
    Truck,
    Network,
    ClipboardCheck,
    Award,
    Shield,
    Users,
    Zap,
    LucideIcon
} from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavBarProps = {
    settings: Content.SettingsDocument;
};

const iconMap: Record<string, LucideIcon> = {
    truck: Truck,
    network: Network,
    "clipboard-check": ClipboardCheck,
    clipboardcheck: ClipboardCheck,
    award: Award,
    shield: Shield,
    users: Users,
    zap: Zap,
};

function getSubServiceIcon(iconName: string | null): LucideIcon {
    if (!iconName) return Truck;
    const key = iconName.toLowerCase().trim();
    return iconMap[key] || Truck;
}

export default function NavBar({ settings }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const checkIsActive = (link: any) => {
        const url = asLink(link);
        if (!url) return false;
        if (url === "/" && pathName === "/") return true;
        return url !== "/" && pathName.includes(url);
    };

    const serviciosMenu = settings.data.servicios_menu || [];

    const isSolid = scrolled || isOpen;

    return (
        <nav aria-label="Main navigation" className="w-full relative">
            {/* Barra Principal con Glassmorphism dinámico según scroll */}
            <div
                className={clsx(
                    "transition-all duration-300 border-b",
                    isSolid
                        ? "bg-white/85 dark:bg-night-dark/85 backdrop-blur-lg border-gray-100/80 dark:border-white/10 shadow-md py-3.5"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="section-container flex items-center justify-between">

                    {/* Logo Branding */}
                    <Link
                        href="/"
                        className="z-10 transition-transform duration-300 hover:scale-[1.02] active:scale-95 flex items-center"
                        onClick={() => setIsOpen(false)}
                    >
                        <PrismicNextImage
                            field={settings.data.data_title}
                            className="h-10 md:h-14 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Menú Escritorio */}
                    <ul className="hidden md:flex items-center gap-2 lg:gap-3 font-primary">
                        {settings.data.nav.map((item, index) => {
                            const isActive = checkIsActive(item.link);
                            const isCTA = item.label?.toLowerCase().includes("cotizar") ||
                                item.label?.toLowerCase().includes("contacto") ||
                                (index === settings.data.nav.length - 1 && !item.special);

                            // 1. Botón CTA Destacado (ej. Cotizar)
                            if (isCTA && !item.special) {
                                return (
                                    <li key={item.label} className="ml-2">
                                        <PrismicNextLink
                                            field={item.link}
                                            className="font-primary text-sm font-bold tracking-wide bg-accent text-night px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:bg-accent-hover transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 block text-center"
                                        >
                                            {item.label}
                                        </PrismicNextLink>
                                    </li>
                                );
                            }

                            // Estilos dinámicos para los enlaces según scroll
                            const linkClasses = clsx(
                                "font-primary text-sm font-semibold tracking-wide transition-all duration-300 px-4 py-2 rounded-full block",
                                isActive
                                    ? isSolid 
                                        ? "text-night dark:text-white font-bold bg-gray-100/90 dark:bg-white/10 shadow-2xs"
                                        : "text-white font-bold bg-white/20 shadow-2xs"
                                    : isSolid
                                        ? "text-gray-700 dark:text-gray-300 hover:text-night dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-white/5"
                                        : "text-white/85 hover:text-white hover:bg-white/10"
                            );

                            // 2. Menú Desplegable Dinámico desde Prismic (para Servicios)
                            if (item.special) {
                                return (
                                    <li key={item.label} className="relative group py-2">
                                        <PrismicNextLink
                                            field={item.link}
                                            className={clsx(linkClasses, "flex items-center gap-1.5")}
                                        >
                                            <span>{item.label}</span>
                                            <ChevronDown className={clsx(
                                                "w-4 h-4 transition-transform duration-300 group-hover:rotate-180",
                                                isSolid ? "text-gray-500 group-hover:text-night dark:group-hover:text-white" : "text-white/70 group-hover:text-white"
                                            )} />
                                        </PrismicNextLink>

                                        {/* Tarjeta Flotante Dropdown */}
                                        {serviciosMenu.length > 0 && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white/95 dark:bg-night-dark/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-2.5 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 z-50">
                                                <div className="flex flex-col gap-1">
                                                    {serviciosMenu.map((sub, idx) => {
                                                        const SubIcon = getSubServiceIcon(sub.icon);
                                                        return (
                                                            <PrismicNextLink
                                                                key={idx}
                                                                field={sub.link}
                                                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/10 transition-all group/sub"
                                                            >
                                                                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-night dark:text-white flex-shrink-0 group-hover/sub:bg-accent group-hover/sub:text-night transition-colors">
                                                                    <SubIcon className="w-4 h-4" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs font-bold font-primary text-night dark:text-white group-hover/sub:text-night transition-colors">
                                                                        {sub.label}
                                                                    </div>
                                                                    {sub.description && (
                                                                        <div className="text-[11px] text-gray-500 dark:text-gray-400 font-secondary leading-tight mt-0.5">
                                                                            {sub.description}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </PrismicNextLink>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            }

                            // 3. Enlace Normal
                            return (
                                <li key={item.label}>
                                    <PrismicNextLink
                                        field={item.link}
                                        className={linkClasses}
                                    >
                                        {item.label}
                                    </PrismicNextLink>
                                </li>
                            );
                        })}
                        <li className="ml-2 flex items-center">
                            <ThemeToggle isSolid={isSolid} />
                        </li>
                    </ul>

                    {/* Botón Hamburguesa y ThemeToggle Móvil */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle isSolid={isSolid} />
                        <button
                            type="button"
                            className={clsx(
                                "p-2.5 rounded-xl active:scale-95 transition-all",
                                isSolid
                                    ? "text-night dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20"
                                    : "text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                            )}
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu size={26} />
                            <span className="sr-only">Abrir menú</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable Móvil (Independiente de backdrop-blur para abarcar toda la pantalla) */}
            <div
                className={clsx(
                    "fixed inset-0 z-[100] flex flex-col bg-white dark:bg-night-dark px-6 py-6 transition-all duration-300 ease-in-out md:hidden overflow-y-auto h-screen w-screen",
                    isOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
                )}
            >
                {/* Cabecera del Menú Móvil */}
                <div className="flex justify-between items-center w-full border-b border-gray-100 dark:border-white/10 pb-4 flex-shrink-0">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <PrismicNextImage
                            field={settings.data.data_title}
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    <button
                        type="button"
                        className="p-2.5 rounded-full text-night dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 active:scale-95 transition-all"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={26} />
                        <span className="sr-only">Cerrar menú</span>
                    </button>
                </div>

                {/* Lista de Enlaces Móviles */}
                <div className="flex flex-col gap-3 mt-6 w-full pb-12 flex-grow">
                    {settings.data.nav.map((item, index) => {
                        const isActive = checkIsActive(item.link);
                        const isCTA = item.label?.toLowerCase().includes("cotizar") ||
                            item.label?.toLowerCase().includes("contacto") ||
                            (index === settings.data.nav.length - 1 && !item.special);

                        // Botón CTA Móvil
                        if (isCTA && !item.special) {
                            return (
                                <div key={item.label} className="mt-4 w-full">
                                    <PrismicNextLink
                                        field={item.link}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full text-center font-primary text-base font-bold tracking-wide bg-accent text-night py-3.5 px-6 rounded-2xl shadow-md active:scale-[0.98] transition-all block"
                                    >
                                        {item.label}
                                    </PrismicNextLink>
                                </div>
                            );
                        }

                        // Acordeón Desplegable Dinámico en Móvil
                        if (item.special) {
                            return (
                                <div key={item.label} className="flex flex-col w-full bg-gray-50/80 dark:bg-white/5 rounded-2xl p-3 border border-gray-100 dark:border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                                        className="flex items-center justify-between w-full px-2 py-1 font-primary text-base font-bold text-night dark:text-white"
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDown className={clsx("w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300", mobileDropdownOpen && "rotate-180")} />
                                    </button>

                                    {mobileDropdownOpen && serviciosMenu.length > 0 && (
                                        <div className="flex flex-col gap-2 mt-3 pt-2 border-t border-gray-200/60 dark:border-white/10">
                                            {serviciosMenu.map((sub, idx) => {
                                                const SubIcon = getSubServiceIcon(sub.icon);
                                                return (
                                                    <PrismicNextLink
                                                        key={idx}
                                                        field={sub.link}
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white dark:bg-night hover:bg-gray-100 dark:hover:bg-white/10 active:bg-gray-200 dark:active:bg-white/20 transition-all border border-gray-100 dark:border-white/10 shadow-2xs"
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-night dark:text-white flex-shrink-0">
                                                            <SubIcon className="w-4 h-4" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-primary text-xs font-bold text-night dark:text-white">
                                                                {sub.label}
                                                            </span>
                                                        </div>
                                                    </PrismicNextLink>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // Enlace Normal Móvil
                        return (
                            <PrismicNextLink
                                key={item.label}
                                field={item.link}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "w-full px-5 py-3.5 rounded-2xl font-primary text-base font-semibold transition-all duration-200 block",
                                    isActive
                                        ? "text-night dark:text-white font-bold bg-gray-100 dark:bg-white/10"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 dark:active:bg-white/10"
                                )}
                            >
                                {item.label}
                            </PrismicNextLink>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
