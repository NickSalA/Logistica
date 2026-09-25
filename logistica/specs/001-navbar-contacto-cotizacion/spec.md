# Feature Specification: Simplificar navegación de contacto

**Feature Branch**: `001-navbar-contacto-cotizacion`

**Created**: 2026-09-24

**Status**: Draft

**Input**: User description: "Retirar la sección de servicios del navbar porque ya no cumple su propósito y dirigir Contacto hacia cotización, donde continúa la conversación comercial vía WhatsApp o teléfono."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Navegar hacia cotización desde Contacto (Priority: P1)

Como visitante interesado en los servicios de logística, quiero seleccionar “Contacto” y llegar a la sección de cotización para iniciar una conversación comercial por WhatsApp o teléfono.

**Why this priority**: Es el objetivo principal del cambio: concentrar el contacto comercial en el flujo de cotización.

**Independent Test**: Desde la página principal, activar “Contacto” en el navbar en desktop y móvil y comprobar que el destino visible es la sección de cotización.

**Acceptance Scenarios**:

1. **Given** que el visitante está en la página principal, **When** selecciona “Contacto” en el navbar de escritorio, **Then** la página desplaza o navega hasta la sección de cotización.
2. **Given** que el visitante abre el menú móvil, **When** selecciona “Contacto”, **Then** llega a la misma sección de cotización y el menú se cierra.
3. **Given** que la sección de cotización contiene canales telefónicos o WhatsApp, **When** el visitante selecciona uno, **Then** puede iniciar el contacto usando el canal configurado.
4. **Given** que el visitante ya llegó a `#cotizacion`, **When** vuelve a seleccionar “Contacto”, **Then** la sección vuelve a recibir navegación/enfoque visible y el control no parece inactivo.

---

### User Story 2 - Ver una navegación sin Servicios (Priority: P1)

Como visitante, quiero que el navbar muestre únicamente las opciones vigentes para no intentar acceder a una sección que ya no es el canal de atención.

**Why this priority**: Evita confusión y elimina una ruta que dejó de representar el proceso comercial actual.

**Independent Test**: Revisar el navbar en desktop y móvil y confirmar que no existe la opción “Servicios”, su desplegable ni sus elementos secundarios.

**Acceptance Scenarios**:

1. **Given** que el visitante ve el navbar en escritorio, **When** revisa sus opciones, **Then** no encuentra “Servicios” ni un menú desplegable asociado.
2. **Given** que el visitante abre el menú móvil, **When** revisa sus opciones, **Then** no encuentra el acordeón ni los enlaces secundarios de “Servicios”.
3. **Given** que el visitante navega por el resto del sitio, **When** usa el footer, **Then** los enlaces de navegación no presentan “Servicios” como opción principal.

---

### Edge Cases

- Si no existe un enlace telefónico configurado, “Contacto” debe seguir llevando a cotización sin dejar un enlace roto.
- Si la sección de cotización está más abajo en la página, el destino debe quedar visible y utilizable después de la navegación.
- El comportamiento debe conservarse en temas claro y oscuro, y en tamaños de pantalla desktop y móvil.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El navbar MUST ocultar la opción principal “Servicios” en sus variantes desktop y móvil.
- **FR-002**: El navbar MUST ocultar el desplegable desktop y el acordeón móvil asociados a “Servicios”, incluidos sus enlaces secundarios.
- **FR-003**: La opción “Contacto” MUST utilizar el enlace interno `#cotizacion` configurado en Prismic para dirigir a la sección de cotización del sitio.
- **FR-004**: La navegación de “Contacto” MUST funcionar de forma consistente en desktop y móvil, cerrando el menú móvil después de la selección.
- **FR-004a**: Activar “Contacto” repetidamente MUST volver a desplazar o enfocar la sección `#cotizacion`, incluso cuando el hash actual ya sea `#cotizacion`.
- **FR-005**: La sección de cotización MUST conservar los enlaces configurados para iniciar contacto por WhatsApp o teléfono.
- **FR-006**: El footer MUST evitar presentar “Servicios” como una opción vigente de navegación principal.
- **FR-007**: La modificación MUST conservar el resto de las opciones, estilos, estados activos y accesibilidad del navbar.
- **FR-008**: La configuración editorial de **Settings** MUST retirar la fila de navegación de “Servicios” y cualquier marca `special` asociada a esa opción.
- **FR-009**: La configuración editorial de **Settings** MUST mantener configurados los enlaces de teléfono o WhatsApp que se muestran en los canales de contacto.
- **FR-010**: La entrada editorial “Contacto” MUST tener configurado en Prismic el destino interno `#cotizacion`, que corresponde a la sección de cotización existente en la homepage.
- **FR-011**: Los botones editoriales del hero y “Cotiza con nosotros” MUST conservar o configurar su enlace interno hacia `#cotizacion` cuando su propósito sea iniciar una cotización.
- **FR-012**: El botón editorial de la slice Servicios MUST conservar o configurar su enlace interno hacia `#servicios` cuando su propósito sea volver a la sección de servicios.
- **FR-013**: La sección Servicios MUST exponer un ancla estable `id="servicios"` para que el enlace `#servicios` funcione.
- **FR-014**: El código MUST consumir los destinos configurados en Prismic y no reemplazar los enlaces `#cotizacion` o `#servicios` por URLs hardcodeadas.
- **FR-015**: Los campos relacionados con servicios dentro del formulario de cotización MUST conservarse mientras sigan siendo necesarios para solicitar una cotización; retirarlos queda fuera de alcance.

### Key Entities _(include if feature involves data)_

- **Opción de navegación**: Enlace visible del navbar, con etiqueta, destino y estado activo.
- **Sección de cotización**: Punto de contacto comercial que contiene los canales configurados para WhatsApp o teléfono.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: En 100% de las vistas desktop y móvil revisadas, “Servicios” no aparece en el navbar ni en sus menús derivados.
- **SC-002**: En 100% de las pruebas de navegación, seleccionar “Contacto” lleva a la sección de cotización en un máximo de una interacción.
- **SC-005**: En 100% de las pruebas de activación repetida, el segundo clic en “Contacto” produce un desplazamiento o enfoque visible hacia la sección de cotización.
- **SC-003**: Al menos 95% de usuarios de prueba identifica y puede activar un canal telefónico o WhatsApp desde el flujo de cotización sin volver al navbar.
- **SC-004**: Ninguna opción de navegación restante pierde su destino, etiqueta o estado activo como consecuencia del cambio.

## Assumptions

- “Contacto” debe llevar a cotización, según la decisión confirmada por el usuario.
- El enlace de “Contacto” se configurará en Prismic como enlace web interno `#cotizacion`, igual que los CTAs del hero o “Cotiza con nosotros” que deban iniciar una cotización.
- El CTA propio de Servicios conservará el destino `#servicios`; no se convertirá en un CTA de cotización.
- Los números de teléfono y el enlace de WhatsApp ya están o seguirán estando configurados dentro de la sección de cotización o los datos de contacto existentes.
- La sección de Servicios puede permanecer disponible como contenido interno si existe, pero deja de exponerse como opción del navbar y del listado principal del footer.
- El documento **Settings** de Prismic se actualizará para retirar la fila “Servicios” de `Navigation` y revisar sus enlaces de teléfono/WhatsApp.
- El destino editorial de “Contacto” se configurará explícitamente como `#cotizacion` hacia la sección de cotización existente.
- Los enlaces internos se validarán desde Prismic en el documento Settings y en los campos de enlace de las slices Inicio, Servicios y Cotización que correspondan: `#cotizacion` para cotización y `#servicios` para la sección Servicios.
- No se eliminará el slice “Servicios” ni los campos `servicio` del formulario de cotización sin una solicitud específica; esta feature solo modifica su exposición en la navegación.
