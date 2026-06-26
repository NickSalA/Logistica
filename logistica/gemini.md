# Guía de Sistema de Diseño - Logística Trasandes

Esta guía define las directrices visuales, colores, tipografía, componentes y patrones de espaciado utilizados en la plataforma para asegurar consistencia, legibilidad y un aspecto premium en todas las secciones, evitando transiciones visualmente toscas ("stitches" o cortes bruscos).

---

## 1. Paleta de Colores Semántica (Tailwind CSS v4)

Todos los colores están registrados en `globals.css` y deben usarse mediante clases semánticas de Tailwind para garantizar la mantenibilidad.

| Color Variable | Hex | Clase Tailwind | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--color-night` | `#003366` | `bg-night` / `text-night` | Azul corporativo principal (botones, textos destacados). |
| `--color-night-dark` | `#001122` | `bg-night-dark` | Azul ultra oscuro (fondos inmersivos, degradados). |
| `--color-accent` | `#FFC000` | `bg-accent` / `text-accent` | Amarillo de realce (llamados a la acción, líneas divisorias, tags). |
| `--color-accent-hover`| `#E6AC00` | `hover:bg-accent-hover` | Estado hover para elementos interactivos amarillos. |
| `--color-sand` | `#F5F5DC` | `bg-sand` | Beige suave (fondos de bloques secundarios o cajas laterales). |
| `--color-charcoal` | `#2C2C2C` | `bg-charcoal` | Gris oscuro neutral (botones secundarios, textos oscuros). |

---

## 2. Tipografía y Jerarquía Visual

El proyecto utiliza dos familias tipográficas cargadas a nivel de Layout:
*   **Fuente Primaria (Montserrat):** Para encabezados, títulos de sección, botones y elementos destacados (`font-primary`).
*   **Fuente Secundaria (Roboto):** Para textos de lectura, descripciones y cuerpo general (`font-secondary`).

### Clases Estándar para Textos
*   **Título Hero (Inicio):** `font-primary text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight`
*   **Título de Sección:** `font-primary text-3xl md:text-4xl font-bold text-night leading-tight`
*   **Subtítulo / Tag de Sección (Amarillo):** `font-primary text-accent text-sm md:text-base font-bold uppercase tracking-widest`
*   **Texto de Cuerpo (General):** `font-secondary text-sm md:text-base leading-relaxed text-gray-700`
*   **Texto de Cuerpo (Sobre Fondos Oscuros):** `font-secondary text-sm md:text-base leading-relaxed text-white/85`

---

## 3. Estilos de Bordes, Radios y Sombras (Estética Premium)

Para lograr un aspecto unificado "suave" pero moderno, utilizamos radios de esquina amplios y sombras intensas:

*   **Bordes de Bloques/Tarjetas:** `rounded-3xl` (24px) para grandes componentes o contenedores de sección.
*   **Bordes de Botones/Inputs:** `rounded-lg` (8px) para mantener un diseño estructurado y funcional.
*   **Sombras (Shadows):**
    *   Para formularios o tarjetas flotantes: `shadow-2xl`
    *   Para efectos de profundidad extrema: `.shadow-super-strong` (definida en `globals.css`).
*   **Glassmorphism (Controles/Botones Flotantes):**
    `bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all`

---

## 4. Botones Consistentes (`/src/components/ui/button.tsx`)

Usa siempre el componente `<Button>` en lugar de etiquetas `<button>` nativas para mantener consistencia interactiva (animaciones táctiles y estilos de foco):

```tsx
import Button from "@/components/ui/button";

// Botón Principal de Llamado a la Acción (Amarillo con hover oscuro)
<Button variant="accent" size="lg">Contáctanos</Button>

// Botón Secundario Translúcido (Sobre fondos oscuros / imágenes)
<Button variant="outline-white">Saber Más</Button>

// Botón Corporativo Azul
<Button variant="primary">Enviar Mensaje</Button>
```

---

## 5. Cómo Evitar Costuras Toscas ("Stitch") entre Secciones

El error de "stitch" (sensación de que la página está mal cosida) ocurre cuando hay saltos bruscos de color, falta de aire o cortes de imagen. Sigue estas reglas para evitarlo:

### A. Mantener un Flujo de Fondos Alternados
Nunca coloques dos secciones consecutivas con el mismo tono de fondo si no forman parte del mismo bloque visual. Alterna los fondos de esta manera:
1.  **Hero:** Fondo Inmersivo Oscuro (Imagen + Gradiente Azul `night-dark`).
2.  **Sección 2 (Experiencia / Logos):** Fondo Blanco limpio (`bg-white` o sin fondo).
3.  **Sección 3 (Servicios):** Fondo Beige Suave (`bg-sand` o similar).
4.  **Sección 4 (Cotización):** Contraste alternado (Bloques flotantes blancos sobre fondo beige o gris).

### B. El Truco del "Overlap" (Superposición)
Para fundir dos secciones de forma elegante en pantallas móviles y de escritorio, utiliza superposiciones con márgenes negativos.
*   **Ejemplo en Cotización:** El formulario (`bg-white` con `shadow-2xl`) tiene `-mt-12 relative z-10` en móviles para romper la línea dura del bloque de contacto superior (`bg-sand`), creando una transición tridimensional en lugar de una costura plana.

### C. Espaciado Consistente (Aire)
Las secciones deben "respirar". Nunca pegues el contenido a los bordes de la pantalla.
*   **Contenedor Estándar:** `container mx-auto px-6 md:px-12 xl:px-20`
*   **Relleno Vertical (Padding):** Usa `py-12 md:py-20 lg:py-24` para las transiciones entre secciones.

---

## 6. Integración de Textos y Prismic CMS

**Regla de Oro para Contenidos de Texto:** 
Cuando se necesite incorporar nuevo texto en un Slice que actualmente no tenga campos designados para ello (por ejemplo, títulos faltantes, badges o etiquetas de sección), **NO hardcodees (agregues directamente)** el texto en el código fuente de Next.js.

En su lugar, debes notificar inmediatamente al usuario de la siguiente manera:
1.  Indicar qué texto o contenido visual hace falta para mejorar la sección.
2.  Especificar exactamente qué tipo de **Field** (ej. `Key Text`, `Rich Text`, `Title`) debe agregarse en el Custom Type o Slice dentro del panel de **Prismic Slice Machine**.
3.  Esperar a que el usuario confirme que ha añadido el campo antes de mapear la variable (`slice.primary.nuevo_campo`) en el código.
