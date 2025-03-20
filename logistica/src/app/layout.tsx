import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Logistica Trasandes",
  description: "Más de 20 años ofreciendo soluciones de transporte de carga pesada con seguridad y confianza. Soluciones logísticas para tu negocio.",
  keywords: "logistica, transporte, carga pesaddaa, soluciones logísticas, trasandes, empresa de transporte",
  openGraph: {} // Añadir OpenGraph metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(montserrat.variable, roboto.variable)}>
      <body>{children}</body>
    </html>
  )
}
