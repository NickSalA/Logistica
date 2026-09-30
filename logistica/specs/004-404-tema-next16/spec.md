# Feature Specification: Página 404 y compatibilidad del proveedor de temas

**Feature Branch**: `004-404-tema-next16`

**Created**: 2026-09-29

**Status**: Draft

**Input**: User description: "Crear un `src/app/not-found.tsx` personalizado con el diseño del sitio, revisar la compatibilidad actual de `next-themes` con Next.js 16/Turbopack y mantener `suppressHydrationWarning` en `<html>`."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recibir una página 404 coherente (Priority: P1)

Como visitante que accede a una ruta inexistente, quiero ver una página de error clara y coherente con la marca para saber qué ocurrió y volver fácilmente al inicio o continuar navegando.

**Why this priority**: Una ruta inexistente es una salida frecuente del sitio y la página predeterminada no comunica la identidad ni las opciones de navegación del proyecto.

**Independent Test**: Abrir una ruta inexistente en desktop y móvil, en tema claro y oscuro, y verificar que la pantalla 404 mantiene el diseño del sitio, ofrece una acción para volver al inicio y no muestra errores adicionales.

**Acceptance Scenarios**:

1. **Given** que el visitante solicita una ruta inexistente, **When** la aplicación resuelve la navegación, **Then** muestra una página 404 personalizada con jerarquía visual, mensaje editorial o contextual y acción para volver al inicio.
2. **Given** que el visitante está en la página 404, **When** cambia entre tema claro y oscuro, **Then** la página conserva contraste, legibilidad y controles utilizables.
3. **Given** que el visitante usa un dispositivo móvil, **When** visualiza la página 404, **Then** no encuentra desbordamiento horizontal y puede activar la acción principal con un área táctil adecuada.
4. **Given** que el visitante navega con teclado, **When** recorre la página 404, **Then** encuentra foco visible en el enlace o botón principal y puede volver al inicio.

---

### User Story 2 - Mantener el tema estable sin advertencias evitables (Priority: P1)

Como responsable del sitio, quiero que la integración del tema funcione de forma compatible con la versión actual del framework y su servidor de desarrollo para evitar errores de consola o parpadeos de tema.

**Why this priority**: La advertencia sobre un `<script>` durante el renderizado puede ocultar problemas reales y deteriorar la experiencia de desarrollo y diagnóstico.

**Independent Test**: Ejecutar el sitio en desarrollo y producción, visitar la homepage y una ruta 404 en ambos temas, y revisar que el cambio de tema funcione sin errores de hidratación atribuibles a la integración.

**Acceptance Scenarios**:

1. **Given** que la aplicación se ejecuta con la versión actual del framework y Turbopack, **When** se monta el proveedor de temas, **Then** la integración no introduce errores de renderizado de scripts en componentes React.
2. **Given** que el documento HTML se hidrata en el cliente, **When** se determina el tema inicial, **Then** se conserva `suppressHydrationWarning` en el elemento raíz y no se produce un parpadeo evitable.
3. **Given** que el usuario cambia de tema desde la navegación, **When** activa el control de tema, **Then** la homepage y la página 404 actualizan sus tokens visuales correctamente.

### Edge Cases

- Rutas inexistentes con uno o más segmentos deben terminar en la experiencia 404 disponible para el App Router.
- La página 404 no debe depender de contenido Prismic que pueda faltar para poder mostrar la acción de recuperación.
- La solución para la advertencia de tema no debe eliminar el cambio de tema ni introducir una segunda fuente de verdad.
- El modo oscuro y claro deben mantener contraste en la página 404 y en el botón flotante de WhatsApp si está presente.
- Si la advertencia proviene de una incompatibilidad externa no corregible sin actualizar una dependencia, debe quedar documentada la decisión y su impacto.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST mostrar una página 404 personalizada para rutas inexistentes mediante el mecanismo estándar del App Router.
- **FR-002**: La página 404 MUST incluir una acción visible y accesible para volver al inicio o continuar navegando.
- **FR-003**: La página 404 MUST conservar la identidad visual del sitio en temas claro y oscuro, incluyendo tokens, tipografía, contraste y estados de foco.
- **FR-004**: La página 404 MUST funcionar en desktop y móvil sin scroll horizontal ni controles cortados.
- **FR-005**: La página 404 MUST ser utilizable con teclado y tecnología asistiva, con nombre accesible y foco visible en la acción principal.
- **FR-006**: La implementación MUST mantener `suppressHydrationWarning` en el elemento `<html>` del layout raíz.
- **FR-007**: La integración del proveedor de temas MUST revisarse frente a Next.js 16, React 19, Turbopack y la versión instalada de `next-themes`, documentando si requiere ajuste, actualización o no requiere cambios.
- **FR-008**: La solución MUST evitar errores de consola causados por la ejecución incorrecta de scripts dentro de componentes React, sin eliminar la funcionalidad de cambio de tema.
- **FR-009**: La página 404 MUST conservar el acceso a los elementos públicos globales que correspondan, incluido WhatsApp cuando la configuración editorial esté activa.

### Key Entities *(include if feature involves data)*

- **Página 404**: Vista de recuperación para rutas inexistentes con identidad, orientación y acción principal.
- **Proveedor de tema**: Integración global que determina, aplica y cambia el tema claro/oscuro durante SSR, hidratación y navegación cliente.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 100% de las rutas inexistentes probadas, desktop y móvil muestran la página 404 personalizada.
- **SC-002**: En el 100% de las pruebas de teclado, la acción principal de la página 404 recibe foco visible y permite regresar al inicio.
- **SC-003**: En el 100% de las pruebas de tema claro/oscuro, la página 404 mantiene legibilidad y contraste adecuados.
- **SC-004**: En el 100% de los viewports probados, la página 404 no presenta scroll horizontal ni elementos cortados.
- **SC-005**: La verificación de desarrollo y producción documenta el estado de la advertencia relacionada con `next-themes`, sin degradar el cambio de tema ni la hidratación.

## Assumptions

- El contenido esencial de la página 404 puede definirse como interfaz de recuperación y no requiere datos de Prismic para renderizarse.
- Los textos editoriales existentes no se modificarán como parte de esta feature; la página 404 puede utilizar copy contextual mínimo de recuperación si se aprueba durante el plan.
- `suppressHydrationWarning` se conservará en el `<html>` existente de `src/app/layout.tsx`.
- La página 404 respetará el botón flotante de WhatsApp cuando el layout público lo renderice.
- Una actualización de `next-themes` solo se realizará si la investigación confirma compatibilidad y resuelve la advertencia sin regresiones.
