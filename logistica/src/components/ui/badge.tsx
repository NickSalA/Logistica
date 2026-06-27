import clsx from "clsx";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "accent" | "dark" | "outline";
  children: React.ReactNode;
  className?: string;
};

export default function Badge({
  variant = "accent",
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-2 font-primary font-bold uppercase tracking-widest rounded-full transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5 cursor-default select-none";
  
  const variants = {
    accent: "badge-accent hover:border-accent/60 hover:bg-accent/25 hover:shadow-md hover:shadow-accent/15",
    dark: "badge-dark hover:border-white/30 hover:bg-night-dark/90 hover:shadow-md hover:shadow-black/40",
    outline: "px-3.5 py-1 text-xs border border-gray-200 text-gray-600 bg-white/50 backdrop-blur-xs hover:border-night/30 hover:bg-white hover:text-night hover:shadow-sm",
  };

  return (
    <div className={clsx(variants[variant], baseStyles, className)} {...props}>
      {children}
    </div>
  );
}
