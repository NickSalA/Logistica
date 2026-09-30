# Research: Página 404 y compatibilidad del proveedor de temas

## Decision 1: Usar la página 404 del App Router

- **Decision**: Crear `src/app/not-found.tsx` como la vista global para recursos no encontrados y conservar `notFound()` en la ruta dinámica de Prismic.
- **Rationale**: El App Router resuelve automáticamente la experiencia para rutas inexistentes y la ruta `[uid]` ya delega correctamente mediante `notFound()` cuando Prismic no encuentra el UID.
- **Alternatives considered**:
  - Crear una página 404 dentro de `[uid]`: rechazado porque no cubriría todas las rutas inexistentes.
  - Redirigir todas las rutas desconocidas al inicio: rechazado porque oculta el error y desorienta al visitante.

## Decision 2: Mantener la página 404 independiente de Prismic

- **Decision**: La página 404 usará estructura visual y navegación de recuperación estable, sin depender de una consulta editorial que pueda fallar durante el error.
- **Rationale**: La recuperación debe seguir funcionando cuando el recurso solicitado o el CMS no está disponible.
- **Alternatives considered**:
  - Obtener un documento de Prismic para el copy 404: rechazado por acoplamiento innecesario en una ruta de error.
  - Reutilizar una slice de homepage: rechazado porque la vista 404 debe ser mínima y determinista.

## Decision 3: Tratar el script de next-themes como comportamiento intencional, no eliminarlo a ciegas

- **Decision**: Mantener `ThemeProvider` y `suppressHydrationWarning` inicialmente; verificar la advertencia en desarrollo Turbopack y en build/producción antes de actualizar dependencias. Solo cambiar la versión o integración si la advertencia es reproducible como fallo funcional o existe una versión compatible que lo resuelva sin regresiones.
- **Rationale**: `next-themes` inyecta un script para aplicar el tema antes de hidratar y evitar un flash de tema. El mensaje observado puede ser una incompatibilidad del overlay de desarrollo con un script intencional, no un fallo de la aplicación.
- **Alternatives considered**:
  - Eliminar `next-themes` o su script: rechazado porque puede provocar flash de tema y romper el cambio claro/oscuro.
  - Quitar `suppressHydrationWarning`: rechazado porque es necesario para el atributo de tema aplicado durante hidratación.
  - Actualizar automáticamente la dependencia: rechazado hasta verificar compatibilidad con Next 16, React 19 y el lockfile.

## Evidence reviewed

- `src/app/[uid]/page.tsx`: llama `notFound()` cuando Prismic no encuentra una página.
- `src/components/theme-provider.tsx`: envuelve `NextThemesProvider` sin lógica adicional.
- `src/app/layout.tsx`: conserva `suppressHydrationWarning` en `<html>` y configura `attribute="class"`, tema del sistema y transición deshabilitada.
- `package.json`: Next.js `16.2.9`, React `19.2.7` y `next-themes` `^0.4.6`; desarrollo mediante Turbopack.
