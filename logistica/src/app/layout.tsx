import type { Metadata } from "next";
import { headers } from "next/headers";
import { Montserrat, Roboto } from "next/font/google";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

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
    openGraph: { images: [settings.data.og_image.url || ""] },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const isAdminRoute = requestHeaders.get("x-admin-route") === "true";

  return (
    <html
      lang="es"
      className={clsx(montserrat.variable, roboto.variable)}
      suppressHydrationWarning
    >
      <body className="font-secondary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!isAdminRoute && <Header />}
          {children}
          {!isAdminRoute && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
