# Feature Specification: Refinar diseño móvil de la homepage

**Feature Branch**: `003-refinar-home-movil`

**Created**: 2026-09-29

**Status**: Draft

**Input**: User description: "Mejorar exclusivamente el diseño móvil de la homepage: el hero se ve pesado, la imagen de Servicios necesita mejor proporción y su leyenda no se aprecia, las tarjetas de Beneficios son demasiado grandes y el footer móvil se ve simple."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recorrer una homepage móvil más ligera (Priority: P1)

Como visitante desde un teléfono, quiero recorrer la homepage con una composición visual equilibrada para entender la propuesta, los servicios y los beneficios sin sentir que cada sección ocupa más espacio del necesario.

**Why this priority**: La homepage móvil es el primer contacto para una parte importante de los visitantes y actualmente presenta exceso de peso visual y desplazamiento vertical.

**Independent Test**: Abrir la homepage en un viewport móvil representativo y recorrerla desde el hero hasta el footer, verificando jerarquía, legibilidad, densidad y ausencia de desbordamientos.

**Acceptance Scenarios**:

1. **Given** que el visitante abre la homepage en móvil, **When** observa el hero, **Then** identifica el mensaje principal y las acciones sin que el fondo, el overlay o el espaciado dominen el contenido.
2. **Given** que el visitante recorre la sección Servicios, **When** llega a la imagen y su contenido asociado, **Then** la imagen aporta valor sin generar una altura desproporcionada y la leyenda editorial se aprecia cuando existe.
3. **Given** que el visitante recorre Beneficios, **When** visualiza las tarjetas o experiencias, **Then** puede entender cada beneficio sin que las imágenes ocupen casi toda la pantalla ni generen saltos incómodos entre elementos.
4. **Given** que el visitante llega al footer en móvil, **When** revisa marca, navegación, contacto y redes, **Then** encuentra una jerarquía visual clara y una composición cuidada, no una lista plana de elementos.
5. **Given** que el visitante cambia entre tema claro y oscuro, **When** recorre la homepage, **Then** el contraste, el foco y la jerarquía permanecen adecuados.

---

### User Story 2 - Mantener la intención editorial y la experiencia desktop (Priority: P1)

Como responsable del sitio, quiero que la mejora móvil no elimine contenido editorial ni altere innecesariamente la composición desktop.

**Why this priority**: Las mejoras deben resolver el problema observado en móvil sin introducir regresiones en la versión existente para pantallas grandes.

**Independent Test**: Comparar la homepage en breakpoints móvil y desktop antes y después del cambio, verificando que los enlaces, textos, imágenes, leyendas y CTAs siguen proviniendo de Prismic y funcionan correctamente.

**Acceptance Scenarios**:

1. **Given** que los textos, imágenes, leyendas y enlaces están configurados en Prismic, **When** se renderiza la homepage móvil, **Then** se conservan sin reemplazos de contenido hardcodeado.
2. **Given** que la homepage se visualiza en desktop, **When** se carga cada sección, **Then** conserva su estructura y proporciones actuales salvo ajustes necesarios que sean deliberadamente responsive.
3. **Given** que el usuario activa un CTA o enlace de contacto, **When** lo hace desde móvil o desktop, **Then** mantiene su destino editorial y su comportamiento accesible.

---

### Edge Cases

- Viewports móviles estrechos no deben producir texto cortado, scroll horizontal ni botones fuera de pantalla.
- La leyenda de la imagen de Servicios debe ocultarse solo cuando no exista contenido editorial, no por una regla móvil general.
- Las tarjetas de Beneficios con textos largos deben conservar legibilidad sin desbordar ni superponerse con controles.
- El footer debe seguir siendo usable cuando faltan redes, teléfonos, correos o enlaces configurados.
- Las preferencias de movimiento reducido deben evitar animaciones excesivas sin eliminar información o estados esenciales.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La homepage MUST ofrecer una composición móvil visualmente ligera, legible y sin desbordamiento horizontal en los breakpoints soportados.
- **FR-002**: El hero móvil MUST conservar su mensaje, CTAs y navegación editorial, reduciendo la sensación de peso visual mediante una jerarquía y un espaciado equilibrados.
- **FR-003**: La sección Servicios MUST conservar la imagen editorial cuando exista, presentarla con una proporción adecuada para móvil y mostrar su leyenda editorial cuando esté configurada.
- **FR-004**: La sección Beneficios MUST evitar que sus imágenes o tarjetas ocupen una altura desproporcionada en móvil y MUST mantener visibles sus títulos, descripciones y controles relevantes.
- **FR-005**: El footer móvil MUST organizar marca, enlaces, contacto y redes en una jerarquía visual clara, manteniendo todos los destinos editoriales disponibles.
- **FR-006**: Las mejoras móviles MUST conservar el contenido, enlaces, CTAs, imágenes y leyendas procedentes de Prismic sin hardcodear copy comercial.
- **FR-007**: La homepage MUST conservar una experiencia desktop estable y limitar los cambios de composición a reglas responsive justificadas.
- **FR-008**: Los elementos interactivos MUST conservar foco visible, áreas táctiles adecuadas, contraste suficiente y compatibilidad con teclado y tecnología asistiva.
- **FR-009**: La homepage MUST respetar las preferencias de movimiento reducido y evitar animaciones que aumenten la carga visual en móvil.
- **FR-010**: La implementación MUST validar la homepage en viewports móviles estrechos y regulares, además de desktop, sin scroll horizontal ni elementos cortados.

### Key Entities *(include if feature involves data)*

- **Homepage móvil**: Composición responsive de hero, Servicios, Beneficios y Footer para viewport móvil.
- **Contenido editorial de sección**: Textos, imágenes, leyendas, enlaces y CTAs suministrados por Prismic.
- **Tarjeta de beneficio**: Unidad visual de una experiencia o beneficio con imagen, título, descripción y posibles controles.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 100% de los viewports móviles revisados, la homepage no presenta scroll horizontal ni contenido cortado.
- **SC-002**: En el 100% de las pruebas de la sección Servicios, la leyenda configurada aparece de forma legible cuando existe contenido editorial para ella.
- **SC-003**: En el 100% de las pruebas de Beneficios, cada tarjeta permite identificar su título y descripción sin que la imagen impida leer el contenido principal.
- **SC-004**: En el 100% de las pruebas del footer móvil, marca, navegación, contacto y redes se distinguen como bloques separados y utilizables.
- **SC-005**: En el 100% de las pruebas desktop, los cambios responsive no alteran los destinos de enlaces ni eliminan contenido editorial existente.
- **SC-006**: Al menos el 90% de usuarios de prueba puede identificar el CTA principal del hero y recorrer las secciones clave sin percibir saturación visual o confusión de jerarquía.

## Assumptions

- El alcance se limita a la homepage en móvil; no se rediseñan páginas internas ni el dashboard administrativo.
- La imagen de Servicios y su leyenda ya forman parte del modelo editorial existente y deben aprovecharse en móvil.
- Las tarjetas de Beneficios pueden usar una altura o recorte responsive diferente sin eliminar sus imágenes.
- Los cambios de copy, imágenes y enlaces seguirán realizándose en Prismic; esta feature se concentra en presentación responsive.
- El botón flotante de WhatsApp permanece disponible y debe considerarse al evaluar solapamientos en la esquina inferior derecha.
- La versión desktop se considera referencia visual y solo se modificará cuando una regla compartida sea necesaria para mantener consistencia responsive.
