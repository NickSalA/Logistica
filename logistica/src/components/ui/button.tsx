import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    "primary" | "secondary" | "outline" | "ghost" | "accent" | "outline-white";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  field?: LinkField;
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  field,
  className,
  children,
  ...props
}: ButtonProps) {
  // Estilos base de diseño limpio y moderno
  const baseStyles =
    "inline-flex items-center justify-center font-primary font-semibold rounded-lg " +
    "transition-all duration-300 ease-out active:scale-[0.97] cursor-pointer " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // Variantes usando las variables de Tailwind CSS v4 del proyecto
  const variants = {
    primary:
      "bg-night dark:bg-white text-white dark:text-night hover:bg-opacity-90 dark:hover:bg-opacity-90 shadow-md hover:shadow-lg focus-visible:outline-night dark:focus-visible:outline-white",
    secondary:
      "bg-gray-100 dark:bg-white/10 text-night dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 focus-visible:outline-gray-200 dark:focus-visible:outline-white/20",
    outline:
      "border-2 border-night dark:border-white/50 text-night dark:text-white hover:bg-night dark:hover:bg-white hover:text-white dark:hover:text-night focus-visible:outline-night dark:focus-visible:outline-white/50",
    ghost:
      "text-night dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus-visible:outline-gray-100 dark:focus-visible:outline-white/10",
    accent:
      "bg-accent text-night hover:bg-accent-hover shadow-md hover:shadow-lg focus-visible:outline-accent",
    "outline-white":
      "border-2 border-white text-white hover:bg-white hover:text-night focus-visible:outline-white",
  };

  // Tamaños adaptables
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "p-0 h-10 w-10 flex items-center justify-center",
  };

  const classes = clsx(variants[variant], sizes[size], baseStyles, className);

  // Si se le pasa un link dinámico de Prismic (objeto LinkField)
  if (field) {
    return (
      <PrismicNextLink field={field} className={classes}>
        {children}
      </PrismicNextLink>
    );
  }

  // Si se le pasa un href de Next.js/HTML (string)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Por defecto, se comporta como un botón HTML común y corriente
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
