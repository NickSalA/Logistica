"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./AdminThemeToggle.module.css";

export function AdminThemeToggle({ inline = false }: { inline?: boolean }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme !== "light";
  return (
    <button
      type="button"
      className={inline ? `${styles.button} ${styles.inline}` : styles.button}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Cambiar a tema ${isDark ? "claro" : "oscuro"}`
          : "Cambiar tema"
      }
    >
      {mounted &&
        (isDark ? (
          <Sun size={17} aria-hidden="true" />
        ) : (
          <Moon size={17} aria-hidden="true" />
        ))}
    </button>
  );
}
