# Logística Trasandes

Sitio corporativo de **Logística Trasandes**, construido con **Next.js**, **Tailwind CSS v4** y **Prismic CMS** mediante Slice Machine. La página principal, navegación, pie de página y metadatos se administran desde Prismic.

---

## Tecnologías principales

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router y Turbopack)
- **UI:** React 19 y TypeScript
- **CMS headless:** [Prismic CMS](https://prismic.io/) + [Slice Machine](https://prismic.io/docs/slice-machine)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Tema:** `next-themes` (claro/oscuro)
- **Iconos:** `lucide-react`
- **Datos y autenticación futura:** Supabase
- **Cliente HTTP interno:** Axios
- **Gestor de paquetes:** `pnpm`

---

## Arquitectura de contenido

La ruta `/` consulta el singleton `homapage` de Prismic y renderiza sus slices con `SliceZone`:

1. `inicio`: hero con carrusel y llamados a la acción.
2. `experiencia`: marquesina de clientes.
3. `servicios`: detalle de servicios.
4. `beneficios`: tarjetas de valor diferencial.
5. `mapa`: ubicación mediante Google Maps.
6. `cotizacion`: formulario de contacto.

El singleton `settings` proporciona los metadatos globales, logo, navegación, datos de contacto, redes sociales, footer y menú desplegable de servicios.

> El formulario de `cotizacion` registra solicitudes en Supabase mediante una Route Handler de Next.js. La notificación por correo está implementada como mock y queda lista para conectar un proveedor transaccional.

---

## Arquitectura de aplicación

El proyecto mantiene las rutas HTTP en `src/app/api` y separa los módulos por responsabilidad:

```text
src/
├── api/                  # Clientes Axios y adaptadores por recurso
├── app/api/              # Route Handlers de Next.js
├── features/             # Hooks, validación y tipos propios de cada feature
├── server/               # Repositorios e integraciones exclusivas de servidor
├── types/api/            # Contratos request/response compartidos
├── types/database.ts     # Tipos temporales de datos de Supabase
├── prismicio.ts          # Cliente de Prismic
└── slices/               # Presentación basada en Slice Machine
```

El módulo inicial es `cotizaciones`: la UI llama a `src/api/cotizaciones.ts`, la API de Next valida la solicitud y el repositorio server-only la guarda en Supabase. Las claves privilegiadas no se importan en componentes cliente.

---

## 🛠️ Comenzando

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) y `pnpm`:

```bash
npm install -g pnpm
```

### Instalación

Instala las dependencias:

```bash
pnpm install
```

Si `pnpm` no puede escribir en su caché global —por ejemplo, al trabajar dentro de un sandbox— ejecuta la instalación desde una terminal local con acceso a tu store habitual.

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Prismic Slice Machine

Para administrar las rebanadas (Slices), tipos personalizados y conectarte con el panel de Prismic:

```bash
pnpm slicemachine
```

Abre [http://localhost:9999](http://localhost:9999) para gestionar los componentes visuales e integrar campos de Prismic CMS.

---

## Comandos disponibles

| Comando             | Descripción                                           |
| :------------------ | :---------------------------------------------------- |
| `pnpm dev`          | Inicia Next.js con Turbopack en desarrollo.           |
| `pnpm build`        | Compila la aplicación para producción.                |
| `pnpm start`        | Inicia la compilación de producción.                  |
| `pnpm lint`         | Ejecuta el script de lint definido en `package.json`. |
| `pnpm slicemachine` | Inicia la interfaz local de Prismic Slice Machine.    |

Usa los comandos habituales de `pnpm`.

## Estado técnico y próximos puntos

- La aplicación requiere que los documentos `homapage` y `settings` estén publicados en el repositorio de Prismic configurado.
- Las cotizaciones se guardan en `public.cotizaciones` de Supabase con estado inicial `nuevo`. Consulta [`supabase/README.md`](./supabase/README.md) para la operación y variables necesarias.
- El correo es un mock en `src/server/cotizaciones/notifications.ts`; al elegir proveedor, se reemplaza ese adaptador sin modificar la UI ni la Route Handler.
- Antes de desplegar, ejecutar `pnpm build` y revisar la navegación, slices, cotizaciones y metadatos con contenido publicado.
- `README.md` documenta el estado funcional; las convenciones de diseño y contenido viven en [`gemini.md`](./gemini.md).

---

## Guía de diseño y estilos

El proyecto implementa una paleta de colores semántica y un sistema de diseño con Tailwind CSS v4 para mantener la consistencia estética y evitar transiciones bruscas ("stitches").

Consulta la documentación detallada del sistema de diseño en [gemini.md](file:///home/daminin/Documents/Repositorios/Logistica/logistica/gemini.md).
