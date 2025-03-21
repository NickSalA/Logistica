import type { Metadata } from 'next'
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import Header from "@/components/header";
import Footer from "@/components/footer";
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

export async function generateMetadata(): Promise<Metadata> {
 
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.title,
    description: settings.data.meta_info,
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  }
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(montserrat.variable, roboto.variable)}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
