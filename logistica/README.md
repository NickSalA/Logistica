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

> El formulario de `cotizacion` tiene la interfaz terminada, pero aún no cuenta con integración de envío a correo, CRM o API.

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

Si `pnpm` no puede escribir en su caché global —por ejemplo, al trabajar dentro de un sandbox— usa un store local al proyecto:

```bash
pnpm --config.store-dir=.pnpm-store install
```

El proyecto incluye `.npmrc` con `store-dir=.pnpm-store`, por lo que, tras esa configuración, los comandos normales de `pnpm` usan el store local automáticamente.

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

El store local se configura en `.npmrc`; usa los comandos habituales de `pnpm`.

## Estado técnico y próximos puntos

- La aplicación requiere que los documentos `homapage` y `settings` estén publicados en el repositorio de Prismic configurado.
- El envío del formulario de cotización está pendiente de integrar con un proveedor o API. No se deben exponer credenciales en el cliente.
- Antes de desplegar, ejecutar `pnpm build` y revisar la navegación, slices y metadatos con contenido publicado.
- `README.md` documenta el estado funcional; las convenciones de diseño y contenido viven en [`gemini.md`](./gemini.md).

---

## Guía de diseño y estilos

El proyecto implementa una paleta de colores semántica y un sistema de diseño con Tailwind CSS v4 para mantener la consistencia estética y evitar transiciones bruscas ("stitches").

Consulta la documentación detallada del sistema de diseño en [gemini.md](file:///home/daminin/Documents/Repositorios/Logistica/logistica/gemini.md).
