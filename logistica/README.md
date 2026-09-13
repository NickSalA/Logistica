# Logística Trasandes

Sitio corporativo y plataforma de cotizaciones de **Logística Trasandes**, construido con **Next.js 16**, **Tailwind CSS v4**, **Prismic CMS** (Type Builder cloud) y **Supabase**.

La arquitectura, principios de diseño, testing y compuertas de calidad están regidos formalmente por la [Constitución del Proyecto](.specify/memory/constitution.md) bajo la metodología **Spec Kit**.

---

## Tecnologías principales

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components por defecto)
- **UI:** React 19 y TypeScript (modo estricto)
- **Testing:** [Vitest](https://vitest.dev/) + `@vitest/coverage-v8` (TDD, in-memory, cobertura ≥ 80%)
- **CMS headless:** [Prismic CMS](https://prismic.io/) + [Type Builder](https://prismic.io/docs/type-builder) (cloud) + Prismic CLI
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con tokens semánticos corporativos
- **Tema:** `next-themes` (soporte completo claro/oscuro)
- **Iconos:** `lucide-react`
- **Base de datos & Auth:** Supabase (PostgreSQL con Row Level Security)
- **Cliente HTTP interno:** Axios centralizado (`src/api/axiosInstance.ts`)
- **Gestor de paquetes:** `pnpm` exclusivamente

---

## Arquitectura de la Aplicación

El proyecto sigue una arquitectura en capas estrictamente desacoplada (Principio I y II de la Constitución):

```text
src/
├── api/                  # Adaptadores Axios por recurso para el cliente
├── app/                  # App Router de Next.js (RSC por defecto)
│   ├── (site)/           # Rutas públicas corporativas
│   ├── admin/            # Panel administrativo (pseudo-CRM)
│   └── api/              # Route Handlers (controladores delgados de transporte HTTP)
│       ├── cotizaciones/ # Recepción y validación de cotizaciones
│       └── revalidate/   # Webhook protegido de revalidación on-demand de Prismic
├── components/           # Componentes UI reutilizables y accesibles (<Button>, etc.)
├── config/               # Variables de entorno validadas (cliente y server-only)
├── features/             # Módulos con hooks, validación (Zod/schemas) y lógica propia
├── lib/                  # Clientes de infraestructura (Supabase cliente y admin)
├── server/               # Repositorios y servicios server-only (import "server-only")
│   └── cotizaciones/     # Repositorio y notificaciones de cotizaciones
├── slices/               # Slices de presentación visual de Prismic
└── types/                # Contratos de API (src/types/api/) y tipos de base de datos
```

---

## Principios de Diseño Visual (Tailwind CSS v4)

Todos los estilos utilizan tokens semánticos registrados en `src/app/globals.css`:

- **Azul Corporativo:** `bg-night` (`#003366`), `bg-night-dark` (`#001122`).
- **Amarillo de Realce:** `bg-accent` / `text-accent` (`#FFC000`), `hover:bg-accent-hover` (`#E6AC00`).
- **Neutros Cálidos:** `bg-sand` (`#F5F5DC`), `bg-charcoal` (`#2C2C2C`), blanco puro.
- **Diseño "Stitch-Free":** Alternancia de fondos entre secciones contiguas y solapamientos con margen negativo (`-mt-*`) y sombras profundas para evitar cortes visuales planos.
- **Sintaxis v4:** Uso de sintaxis moderna como `bg-linear-to-b` en gradientes.

---

## 🛠️ Comenzando

### Prerrequisitos

- **Node.js** >= 20
- **pnpm** instalado globalmente:
  ```bash
  npm install -g pnpm
  ```

### Variables de Entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp .env.example .env.local
```

Variables necesarias:

| Variable | Ámbito | Descripción |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Público | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Público | Clave publicable de Supabase |
| `SUPABASE_SECRET_KEY` | Servidor | Clave secreta con privilegios de servicio |
| `ADMIN_EMAILS` | Servidor | Lista de correos autorizados para el panel admin |
| `PRISMIC_REVALIDATE_SECRET` | Servidor | Secreto compartido para el webhook `/api/revalidate` |

### Instalación

```bash
pnpm install
```

### Servidor de Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia Next.js con Turbopack en desarrollo. |
| `pnpm build` | Compila la aplicación para producción. |
| `pnpm start` | Inicia el servidor de producción. |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto. |
| `pnpm lint:css` | Ejecuta Stylelint sobre las hojas de estilo CSS. |
| `pnpm test` | Ejecuta las pruebas unitarias con Vitest (una sola pasada). |
| `pnpm test:watch` | Inicia Vitest en modo observador interactivo (TDD en caliente). |
| `pnpm test:coverage`| Genera reporte de cobertura de código con `@vitest/coverage-v8`. |
| `npx prismic status`| Compara modelos locales con el repositorio cloud de Prismic. |
| `npx prismic pull` | Sincroniza modelos cloud y actualiza `prismicio-types.d.ts`. |

---

## Flujo de Trabajo y Gobernanza (Spec Kit)

El desarrollo de nuevas características sigue el ciclo de vida guiado por la [Constitución del Proyecto](.specify/memory/constitution.md):

1. `/speckit-specify <descripción>`: Especifica la funcionalidad y criterios de aceptación.
2. `/speckit-clarify`: Resuelve ambigüedades técnicas o de alcance antes de planificar.
3. `/speckit-plan`: Diseña la arquitectura, casos de uso puros y contratos.
4. `/speckit-tasks`: Desglosa las tareas con enfoque TDD y dependencias ordenadas.
5. `/speckit-implement`: Ejecuta las tareas verificando pruebas y compuertas de calidad.

Antes de cualquier integración a `main`, el código debe aprobar:
- `pnpm test` (cobertura mínima 80% en lógica de negocio).
- `pnpm lint` & `pnpm lint:css` (cero errores o advertencias).
- `pnpm build` (cero errores de TypeScript).
