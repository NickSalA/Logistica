# Research: Refinar diseño móvil de la homepage

## Decision 1: Mantener el contenido y ajustar solo la presentación responsive

- **Decision**: Conservar textos, imágenes, leyendas, enlaces y CTAs desde Prismic; limitar la feature a composición, espaciado, tamaños, recortes, contraste y comportamiento responsive.
- **Rationale**: El sitio es dinámico y Prismic es la fuente de verdad editorial. El problema observado es visual en móvil, no una falta de contenido.
- **Alternatives considered**:
  - Reescribir mensajes en React: rechazado porque duplicaría copy editorial.
  - Ocultar secciones completas en móvil: rechazado porque reduce información y no resuelve la jerarquía.

## Decision 2: Mantener la imagen de Servicios, con una proporción móvil más contenida

- **Decision**: Conservar la imagen circular editorial y su leyenda, reduciendo su escala/espaciado únicamente en móvil para que cierre la sección sin generar un bloque excesivo.
- **Rationale**: La imagen aporta prueba visual y equilibrio a Servicios; eliminarla haría la sección más plana.
- **Alternatives considered**:
  - Eliminar la imagen en móvil: rechazado porque quita valor visual y contexto.
  - Mantener el tamaño actual: rechazado porque la imagen domina el viewport móvil.

## Decision 3: Reducir la altura percibida de Beneficios sin eliminar interacción

- **Decision**: Mantener tarjetas, imágenes, títulos, descripciones y controles, pero usar dimensiones y padding más compactos en móvil; preservar la interacción de expansión.
- **Rationale**: Las capturas muestran tarjetas altas y demasiado dominantes; la información debe seguir disponible.
- **Alternatives considered**:
  - Convertir beneficios en una lista plana: rechazado porque se perdería la experiencia visual y la interacción existente.
  - Eliminar imágenes: rechazado porque las imágenes son parte del contenido editorial y ayudan a diferenciar cada beneficio.

## Decision 4: Reforzar la jerarquía del footer móvil con estructura, no con copy hardcodeado

- **Decision**: Mejorar agrupación, espaciado, separadores, énfasis de marca y ritmo visual usando los mismos campos editoriales existentes.
- **Rationale**: El footer tiene todos los datos necesarios, pero en móvil se percibe como una lista vertical simple.
- **Alternatives considered**:
  - Agregar texto promocional fijo: rechazado por la fuente única de contenido editorial.
  - Añadir nuevas columnas en móvil: rechazado porque empeoraría la lectura estrecha.

## Evidence reviewed

- `src/slices/Inicio/index.tsx`: hero con CTAs editoriales y carrusel.
- `src/slices/Servicios/index.tsx`: imagen circular y `texto_imagen` ya disponibles, además del ancla `#servicios`.
- `src/slices/Beneficios/index.tsx`: tarjetas interactivas con `aspect-3/4`, imágenes, descripción expandible y controles.
- `src/components/footer.tsx`: footer con marca, navegación, contacto y redes provenientes de Settings.
- `src/app/globals.css`: tokens de tema, scroll behavior y reduced motion existentes.
