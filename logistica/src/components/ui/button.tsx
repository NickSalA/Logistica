import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "outline-white";
  size?: "sm" | "md" | "lg";
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
    primary: "bg-night text-white hover:bg-opacity-90 shadow-md hover:shadow-lg focus-visible:outline-night",
    secondary: "bg-gray-100 text-night hover:bg-gray-200 focus-visible:outline-gray-200",
    outline: "border-2 border-night text-night hover:bg-night hover:text-white focus-visible:outline-night",
    ghost: "text-night hover:bg-gray-100 focus-visible:outline-gray-100",
    accent: "bg-accent text-night hover:bg-accent-hover shadow-md hover:shadow-lg focus-visible:outline-accent",
    "outline-white": "border-2 border-white text-white hover:bg-white hover:text-night focus-visible:outline-white"
  };

  // Tamaños adaptables
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
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
