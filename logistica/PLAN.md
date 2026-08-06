# Plan de continuación — Logística Trasandes

Este documento define el orden recomendado para retomar el proyecto. Las fases se ejecutan de forma secuencial: cada una reduce riesgo para la siguiente.

## Objetivo

Publicar y mantener un sitio corporativo confiable, editable desde Prismic y capaz de recibir solicitudes de cotización de forma segura.

---

## Fase 1 — Recuperar el entorno y establecer una línea base

**Objetivo:** poder instalar, ejecutar, analizar y compilar el proyecto localmente antes de modificar funcionalidades.

### Tareas

- [x] Instalar dependencias con `pnpm`.
- [ ] Si el sandbox no permite escribir en la caché global de `pnpm`, ejecutar la instalación desde una terminal local con acceso al store habitual.

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

### Decisión adoptada

Las solicitudes se almacenan en Supabase como base del pseudo-CRM. El correo permanece como adaptador mock hasta elegir un proveedor transaccional. El futuro panel administrativo gestionará estados y notas internas.

### Tareas

- [x] Definir campos obligatorios y validaciones del lead.
- [x] Crear una Route Handler de Next.js para recibir la solicitud.
- [x] Validar los datos en cliente y servidor.
- [x] Añadir estados de carga, éxito y error al formulario.
- [x] Guardar credenciales únicamente como variables de entorno no públicas.
- [x] Añadir protección básica contra spam mediante honeypot. La limitación de solicitudes queda pendiente de elegir proveedor o infraestructura.
- [x] Aplicar la migración y confirmar persistencia en Supabase.
- [x] Probar el flujo completo desde el formulario con una solicitud válida.
- [ ] Probar casos inválidos y la protección anti-spam de forma manual.

### Criterio de cierre

- Una solicitud válida se registra en Supabase con estado `nuevo`.
- El usuario recibe confirmación clara de éxito o error.
- Las claves y datos sensibles no se exponen al navegador ni al repositorio.
- El correo transaccional queda pendiente de seleccionar e integrar.

---

## Fase 3 — Consolidar Prismic como fuente de contenido

**Objetivo:** permitir que contenido de negocio se gestione desde Prismic sin modificaciones en React.

### Tareas

- [x] Identificar textos de negocio, etiquetas y CTAs que actualmente tengan fallback en código.
- [ ] Añadir los fields necesarios en Type Builder cloud:
  - `Key Text` para etiquetas breves.
  - `StructuredText` para títulos y contenido enriquecido.
  - `Image` para recursos visuales.
  - `Link` para destinos y CTAs.
- [ ] Sincronizar los modelos cloud y generar tipos con `npx prismic pull`; no editar manualmente los archivos de modelo.
- [ ] Migrar definitivamente de Slice Machine a Type Builder con `npx prismic init` después de respaldar, sincronizar y versionar el estado local.
- [x] Reemplazar los accesos `(slice.primary as any)` por campos tipados existentes.
- [ ] Publicar y verificar las modificaciones en los documentos de Prismic.

### Criterio de cierre

- Los editores pueden actualizar el contenido previsto desde Prismic.
- Los slices consumen campos tipados.
- Los fallbacks no contienen textos comerciales definitivos.

---

## Fase 4 — Accesibilidad, SEO y estabilidad de interfaz

**Objetivo:** mejorar la experiencia de uso, indexación y consistencia técnica del sitio.

### Tareas

- [x] Cambiar el idioma raíz de `lang="en"` a `lang="es"` en `src/app/layout.tsx`.
- [x] Convertir las tarjetas expandibles de beneficios en controles accesibles por teclado y añadir atributos ARIA equivalentes.
- [x] Añadir un `title` descriptivo al `iframe` de Google Maps.
- [x] Evitar que la fecha inicial de cotización genere diferencias entre SSR e hidratación.
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
- [ ] Configurar previews de Prismic con la URL pública de despliegue.
- [ ] Proteger `/api/revalidate` con un secreto y configurar un webhook de Prismic para revalidar contenido publicado.
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
