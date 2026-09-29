# Research: Botón flotante de WhatsApp

## Decision 1: Renderizar el acceso desde el layout público

- **Decision**: Obtener `Settings` una vez en el layout público y renderizar el botón flotante junto al contenido público, fuera de las slices.
- **Rationale**: El requisito aplica a todas las páginas públicas y durante el scroll; el layout es el límite común para Header, contenido y Footer, y permite excluir rutas administrativas.
- **Alternatives considered**:
  - Agregar el botón a cada slice: rechazado porque duplicaría UI y no cubriría páginas sin esas slices.
  - Agregarlo al footer: rechazado porque no permanecería visible durante el desplazamiento.

## Decision 2: Usar campos individuales del singleton Settings

- **Decision**: Consumir `wsp_activo`, `wsp_enlace`, `wsp_etiqueta` y `wsp_tooltip` desde Prismic Settings.
- **Rationale**: Existe un único botón global; los campos individuales representan mejor el modelo y permiten activarlo, cambiar el destino y editar los textos sin despliegue.
- **Alternatives considered**:
  - Grupo repetible: rechazado porque no hay múltiples botones que administrar.
  - Reutilizar únicamente `telefono`: rechazado porque no permite controlar de forma independiente visibilidad, etiqueta y tooltip del botón flotante.

## Decision 3: Tooltip accesible y movimiento discreto

- **Decision**: Mostrar `wsp_tooltip` en hover y focus, con etiqueta accesible independiente desde `wsp_etiqueta`; usar una transición corta y respetar `prefers-reduced-motion`.
- **Rationale**: El mensaje contextual mejora descubrimiento sin sustituir la semántica accesible ni crear una animación permanente.
- **Alternatives considered**:
  - Mostrar solo texto visual: rechazado porque no cubre navegación por teclado ni lectores de pantalla.
  - Pulso/animación permanente: rechazado por distracción y accesibilidad.

## Evidence reviewed

- `customtypes/settings/index.json`: Settings ya define los cuatro campos individuales `wsp_activo`, `wsp_enlace`, `wsp_etiqueta` y `wsp_tooltip`.
- `src/app/layout.tsx`: layout público distingue rutas administrativas mediante `x-admin-route` y monta Header/Footer.
- `src/components/footer.tsx`: Footer ya obtiene Settings y puede compartir el contrato editorial, pero no es un punto adecuado para posición fija.
