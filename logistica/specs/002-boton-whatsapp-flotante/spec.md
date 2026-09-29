# Feature Specification: Botón flotante de WhatsApp

**Feature Branch**: `002-boton-whatsapp-flotante`

**Created**: 2026-09-28

**Status**: Draft

**Input**: User description: "Quiero un botón que siempre esté presente para WhatsApp en el lado derecho inferior."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Contactar por WhatsApp desde cualquier sección (Priority: P1)

Como visitante del sitio, quiero encontrar un botón de WhatsApp siempre visible en la esquina inferior derecha para iniciar una conversación comercial sin tener que volver a la sección de cotización.

**Why this priority**: WhatsApp es el canal de contacto principal y reducir la distancia hasta ese canal puede aumentar las consultas comerciales.

**Independent Test**: Recorrer la homepage y una página interna en desktop y móvil, confirmar que el botón permanece visible y activar el botón para comprobar que abre el enlace de WhatsApp configurado.

**Acceptance Scenarios**:

1. **Given** que el visitante está en cualquier sección pública del sitio, **When** observa la pantalla, **Then** encuentra un botón flotante de WhatsApp en la esquina inferior derecha.
2. **Given** que el visitante activa el botón, **When** existe un enlace de WhatsApp configurado, **Then** se abre el canal de WhatsApp usando el destino editorial configurado.
3. **Given** que el visitante usa teclado o tecnología asistiva, **When** navega hasta el botón, **Then** el control tiene un nombre accesible, foco visible y puede activarse sin ratón.
4. **Given** que el visitante usa una pantalla móvil, **When** visualiza el botón, **Then** el botón no cubre campos, botones ni contenido esencial y mantiene un área táctil cómoda.
5. **Given** que el visitante pasa el cursor sobre el botón o lo alcanza con teclado, **When** el control recibe hover o foco, **Then** aparece el mensaje “Contáctanos por WhatsApp” como ayuda contextual.

---

### Edge Cases

- Si no existe un enlace de WhatsApp configurado, el botón no debe mostrar un enlace roto ni inventar un número; debe ocultarse o permanecer no disponible de forma segura.
- Si el enlace está configurado para abrir una nueva pestaña, debe conservar esa decisión editorial.
- El botón debe permanecer visible sobre fondos claros y oscuros sin perder contraste.
- El botón no debe impedir el uso de controles ubicados en la esquina inferior derecha ni bloquear el consentimiento de cookies u otros avisos importantes.
- El botón debe respetar la preferencia de movimiento reducido y no depender de una animación continua para comunicar su disponibilidad.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sitio MUST mostrar un botón flotante de WhatsApp en la esquina inferior derecha de las páginas públicas.
- **FR-002**: El botón MUST usar el enlace de WhatsApp configurado en `Settings.wsp_enlace` y no un número o URL comercial hardcodeado en la interfaz.
- **FR-003**: El botón MUST abrir el destino editorial de WhatsApp al activarse con ratón, teclado o tecnología asistiva.
- **FR-004**: El botón MUST usar `Settings.wsp_etiqueta` como nombre accesible que indique su acción.
- **FR-005**: El botón MUST tener foco visible y un área táctil adecuada en desktop y móvil.
- **FR-006**: El botón MUST mantenerse disponible al desplazarse por el sitio sin desaparecer por cambios de sección, tema o tamaño de pantalla.
- **FR-007**: Si `Settings.wsp_activo` es falso o `Settings.wsp_enlace` no está configurado, el sitio MUST evitar mostrar un control que conduzca a un destino inválido.
- **FR-008**: El botón MUST mantener suficiente contraste con los fondos claro y oscuro y no cubrir contenido o controles esenciales.
- **FR-009**: El botón MUST respetar la configuración de movimiento reducido del dispositivo y evitar animaciones permanentes o distractoras.
- **FR-010**: El botón MUST mostrar `Settings.wsp_tooltip` al recibir hover o foco, manteniendo además `Settings.wsp_etiqueta` como nombre accesible para lectores de pantalla.

### Key Entities _(include if feature involves data)_

- **Acceso flotante de WhatsApp**: Control persistente que contiene una etiqueta accesible, un destino editorial y una posición fija respecto al viewport.
- **Enlace de WhatsApp**: Canal comercial configurado en Prismic, con URL y comportamiento de apertura definidos por contenido editorial.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: En el 100% de las vistas públicas revisadas en desktop y móvil, el botón aparece en la esquina inferior derecha sin depender de la sección actual.
- **SC-002**: En el 100% de las pruebas con un enlace publicado, activar el botón abre el destino correcto de WhatsApp en una interacción.
- **SC-003**: En el 100% de las pruebas de teclado, el botón puede alcanzarse, identificarse y activarse con foco visible.
- **SC-004**: En el 100% de las pruebas móviles, el botón no obstruye los controles principales ni el contenido esencial.
- **SC-005**: En ausencia de un enlace configurado, no se presenta ningún botón que lleve a un destino roto o inventado.
- **SC-006**: En el 100% de las pruebas de mouse y teclado, el mensaje “Contáctanos por WhatsApp” aparece al interactuar con el botón mediante hover o foco.

## Assumptions

- La configuración del botón vive directamente en el singleton `Settings` de Prismic mediante campos individuales, no en un grupo repetible.
- `Settings` ya contiene los campos individuales `wsp_activo`, `wsp_enlace`, `wsp_etiqueta` y `wsp_tooltip`.
- El enlace de WhatsApp ya existe o se configurará en el documento Settings de Prismic, reutilizando el canal editorial existente.
- “Siempre presente” significa visible en todas las páginas públicas y durante el desplazamiento, no necesariamente durante áreas administrativas o pantallas de autenticación.
- El botón será un acceso directo a WhatsApp y no abrirá un formulario adicional.
- La posición predeterminada será la esquina inferior derecha, con separación suficiente de los bordes y de los controles del sistema.
- La feature no elimina ni reemplaza los teléfonos, el formulario de cotización ni los enlaces de contacto existentes.
