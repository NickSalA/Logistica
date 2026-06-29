"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Button from "@/components/ui/button";

interface ThemeToggleProps {
  isSolid?: boolean;
}

export function ThemeToggle({ isSolid = true }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect solo corre en el cliente, evitando hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const buttonClasses = isSolid
    ? "rounded-full text-night dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
    : "rounded-full text-white hover:bg-white/10 transition-colors";

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={buttonClasses}>
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all opacity-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={buttonClasses}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
