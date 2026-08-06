# Logística Trasandes

Sitio corporativo de **Logística Trasandes**, construido con **Next.js**, **Tailwind CSS v4** y **Prismic CMS** mediante Slice Machine. La página principal, navegación, pie de página y metadatos se administran desde Prismic.

---

## Tecnologías principales

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router y Turbopack)
- **UI:** React 19 y TypeScript
- **CMS headless:** [Prismic CMS](https://prismic.io/) + [Type Builder](https://prismic.io/docs/type-builder) (cloud) + Prismic CLI
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

## Prismic Type Builder y CLI

El modelado de contenido se realiza desde el **Type Builder** de la interfaz web de Prismic: Page Types, Custom Types, Slices y fields se guardan directamente en el repositorio cloud.

Después de modificar un modelo en Prismic, sincroniza el proyecto local y sus tipos generados:

```bash
npx prismic pull
```

Comandos útiles:

```bash
npx prismic status  # Compara modelos locales y remotos
npx prismic pull    # Descarga modelos remotos y genera tipos
npx prismic gen     # Regenera archivos desde modelos locales sincronizados
```

> El proyecto aún conserva la configuración heredada de Slice Machine. La migración completa al flujo cloud se hará con `npx prismic init` después de confirmar que no haya cambios locales sin sincronizar. No uses `pnpm slicemachine` como flujo principal.

---

## Comandos disponibles

| Comando              | Descripción                                                      |
| :------------------- | :--------------------------------------------------------------- |
| `pnpm dev`           | Inicia Next.js con Turbopack en desarrollo.                      |
| `pnpm build`         | Compila la aplicación para producción.                           |
| `pnpm start`         | Inicia la compilación de producción.                             |
| `pnpm lint`          | Ejecuta el script de lint definido en `package.json`.            |
| `npx prismic status` | Compara los modelos locales con el repositorio cloud de Prismic. |
| `npx prismic pull`   | Sincroniza modelos cloud y regenera los tipos de Prismic.        |

Usa los comandos habituales de `pnpm`.

## Estado técnico y próximos puntos

- La aplicación requiere que los documentos `homapage` y `settings` estén publicados en el repositorio de Prismic configurado.
- Las cotizaciones se guardan en `public.cotizaciones` de Supabase con estado inicial `nuevo`. Consulta [`supabase/README.md`](./supabase/README.md) para la operación y variables necesarias.
- El correo es un mock en `src/server/cotizaciones/notifications.ts`; al elegir proveedor, se reemplaza ese adaptador sin modificar la UI ni la Route Handler.
- Antes de desplegar, ejecutar `pnpm build` y revisar la navegación, slices, cotizaciones y metadatos con contenido publicado.

## Despliegue y Prismic cloud

Type Builder elimina la necesidad de ejecutar Slice Machine en el servidor o durante el build. El despliegue solo necesita la aplicación Next.js, sus variables de entorno y acceso saliente a la API/CDN de Prismic.

- **Cambios de contenido publicados:** no requieren redeploy. Con la estrategia de caché actual, deben activar una revalidación segura.
- **Cambios de modelos o slices:** ejecutar `npx prismic pull`, adaptar componentes/tipos, validar, versionar los cambios y desplegar la nueva aplicación.
- **Previews:** configurar la URL pública de producción y las rutas de preview en el dashboard o con `npx prismic preview`.
- **Webhooks:** configurar el webhook de Prismic hacia `/api/revalidate` solo después de proteger esa Route Handler con un secreto compartido. La ruta actual no valida autenticación y no debe exponerse como webhook de producción todavía.
- `README.md` documenta el estado funcional; las convenciones de diseño y contenido viven en [`gemini.md`](./gemini.md).

---

## Guía de diseño y estilos

El proyecto implementa una paleta de colores semántica y un sistema de diseño con Tailwind CSS v4 para mantener la consistencia estética y evitar transiciones bruscas ("stitches").

Consulta la documentación detallada del sistema de diseño en [gemini.md](file:///home/daminin/Documents/Repositorios/Logistica/logistica/gemini.md).
