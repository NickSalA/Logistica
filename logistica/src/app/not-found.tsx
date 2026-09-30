import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden bg-white px-6 py-16 text-night transition-colors duration-300 dark:bg-night-dark dark:text-white sm:px-10">
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-night/10 blur-3xl dark:bg-accent/10" />

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-primary text-xs font-bold uppercase tracking-[0.18em] text-night dark:text-accent">
          Error 404
        </span>

        <h1 className="font-primary text-4xl font-extrabold tracking-tight text-night dark:text-white sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-5 max-w-md font-secondary text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          La dirección que buscas no está disponible. Puedes volver al inicio y
          continuar navegando por nuestro sitio.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-primary text-sm font-bold text-night shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <Home aria-hidden="true" className="h-4 w-4" />
          Volver al inicio
        </Link>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 font-secondary text-sm font-semibold text-gray-600 underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-night dark:text-gray-300 dark:hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Regresar
        </Link>
      </section>
    </main>
  );
}
