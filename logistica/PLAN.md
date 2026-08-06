# Plan de continuación — Logística Trasandes

Este documento define el orden recomendado para retomar el proyecto. Las fases se ejecutan de forma secuencial: cada una reduce riesgo para la siguiente.

## Objetivo

Publicar y mantener un sitio corporativo confiable, editable desde Prismic y capaz de recibir solicitudes de cotización de forma segura.

---

## Fase 1 — Recuperar el entorno y establecer una línea base

**Objetivo:** poder instalar, ejecutar, analizar y compilar el proyecto localmente antes de modificar funcionalidades.

### Tareas

- [x] Instalar dependencias con `pnpm`.
- [ ] Si el sandbox no permite escribir en la caché global de `pnpm`, usar un store local:

  ```sh
  pnpm --config.store-dir=.pnpm-store install
  ```

- [x] Actualizar el script `lint` de `next lint` a `eslint .`; Next.js 16 ya no utiliza el comando anterior.
- [x] Ejecutar lint:

  ```sh
  pnpm lint
  ```

- [x] Ejecutar la compilación de producción:

  ```sh
  pnpm build
  ```

- [ ] Iniciar el servidor de desarrollo y revisar la home:

  ```sh
  pnpm dev
  ```

- [x] Confirmar que los documentos singleton `homapage` y `settings` están publicados en el repositorio de Prismic configurado.

### Criterio de cierre

- Lint y build finalizan correctamente.
- La ruta `/` carga con contenido real de Prismic.
- No existen errores de consola ni de hidratación durante la navegación básica.

---

## Fase 2 — Completar el flujo de cotización

**Objetivo:** convertir el formulario visual existente en un canal real y seguro de captación de leads.

### Decisión requerida

Definir el destino de una solicitud. Elegir uno o combinar varios:

1. Correo transaccional mediante Resend, Brevo, SendGrid u otro proveedor.
2. CRM comercial existente.
3. Base de datos propia y panel administrativo.
4. WhatsApp con un mensaje prellenado, si el flujo comercial es manual.

### Tareas

- [ ] Definir campos obligatorios, validaciones y destinatarios del lead.
- [ ] Crear una Route Handler de Next.js para recibir la solicitud.
- [ ] Validar los datos en cliente y servidor.
- [ ] Añadir estados de carga, éxito y error al formulario.
- [ ] Guardar credenciales únicamente como variables de entorno no públicas.
- [ ] Añadir protección básica contra spam y limitación de solicitudes.
- [ ] Definir trazabilidad: correo recibido, registro en CRM o almacenamiento persistente.
- [ ] Probar el flujo completo con datos reales y casos inválidos.

### Criterio de cierre

- Una solicitud válida llega al destino comercial definido.
- El usuario recibe confirmación clara de éxito o error.
- Las claves y datos sensibles no se exponen al navegador ni al repositorio.

---

## Fase 3 — Consolidar Prismic como fuente de contenido

**Objetivo:** permitir que contenido de negocio se gestione desde Prismic sin modificaciones en React.

### Tareas

- [ ] Identificar textos de negocio, etiquetas y CTAs que actualmente tengan fallback en código.
- [ ] Añadir los fields necesarios en Slice Machine:
  - `Key Text` para etiquetas breves.
  - `StructuredText` para títulos y contenido enriquecido.
  - `Image` para recursos visuales.
  - `Link` para destinos y CTAs.
- [ ] Actualizar los modelos versionados en `src/slices/<Slice>/model.json` y `customtypes/<tipo>/index.json`.
- [ ] Regenerar `prismicio-types.d.ts`.
- [ ] Reemplazar los accesos `(slice.primary as any)` por campos tipados.
- [ ] Publicar y verificar las modificaciones en los documentos de Prismic.

### Criterio de cierre

- Los editores pueden actualizar el contenido previsto desde Prismic.
- Los slices consumen campos tipados.
- Los fallbacks no contienen textos comerciales definitivos.

---

## Fase 4 — Accesibilidad, SEO y estabilidad de interfaz

**Objetivo:** mejorar la experiencia de uso, indexación y consistencia técnica del sitio.

### Tareas

- [ ] Cambiar el idioma raíz de `lang="en"` a `lang="es"` en `src/app/layout.tsx`.
- [ ] Convertir las tarjetas expandibles de beneficios en controles accesibles por teclado o añadir interacción de teclado y atributos ARIA equivalentes.
- [ ] Añadir un `title` descriptivo al `iframe` de Google Maps.
- [ ] Evitar que la fecha inicial de cotización genere diferencias entre SSR e hidratación.
- [ ] Revisar foco visible, labels y navegación por teclado en carrusel, menú móvil, formularios y acordeones.
- [ ] Revisar los metadatos, imagen Open Graph y descripciones con contenido publicado.
- [ ] Probar escritorio y móvil, en tema claro y oscuro.

### Criterio de cierre

- Los controles principales son operables con teclado.
- No hay errores de hidratación ni problemas visuales en los breakpoints principales.
- Los metadatos y Open Graph se muestran correctamente al compartir la web.

---

## Fase 5 — Preparación para producción

**Objetivo:** establecer un proceso repetible de despliegue y mantenimiento.

### Tareas

- [ ] Definir plataforma de hosting y variables de entorno necesarias.
- [ ] Configurar previews de Prismic y revalidación de contenido.
- [ ] Configurar dominio, HTTPS y redirecciones necesarias.
- [ ] Ejecutar build de producción antes de cada despliegue.
- [ ] Añadir monitorización básica de errores y del formulario de cotización.
- [ ] Documentar el proceso de publicación de contenido y despliegue.

### Criterio de cierre

- El sitio se despliega desde una compilación validada.
- Los cambios publicados en Prismic se reflejan según la estrategia de revalidación.
- El equipo conoce cómo publicar contenido y cómo comprobar que llegó a producción.

---

## Orden de ejecución recomendado

1. **Fase 1:** entorno, lint y build.
2. **Fase 2:** cotización funcional.
3. **Fase 3:** modelo de contenido y tipado de Prismic.
4. **Fase 4:** accesibilidad, SEO y pulido.
5. **Fase 5:** despliegue y operación.

> No iniciar el desarrollo del formulario ni cambios estructurales de CMS antes de terminar la Fase 1: una línea base compilable hace que los problemas posteriores sean más fáciles de aislar.
