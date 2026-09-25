# Research: Simplificar navegación de contacto

## Decision 1: Usar un enlace interno editorial `#cotizacion`

- **Decision**: Configurar “Contacto” y los CTAs de cotización en Prismic con el enlace interno `#cotizacion`.
- **Rationale**: La slice `Cotizacion` ya renderiza `id="cotizacion"`; usar el campo de enlace existente mantiene Prismic como fuente única de navegación y permite que el navegador despliegue directamente la sección.
- **Alternatives considered**:
  - Hardcodear `href="#cotizacion"` en React: rechazado porque duplica contenido editorial y puede sobrescribir cambios de marketing.
  - Enviar “Contacto” directamente al primer teléfono: rechazado porque el flujo principal solicitado es la cotización, que contiene formulario y canales de contacto.

## Decision 2: Retirar Servicios desde la configuración editorial y proteger el código

- **Decision**: Eliminar la fila “Servicios” del grupo `Settings → Navigation` en Prismic y hacer que el navbar/footer no rendericen entradas marcadas como `special`.
- **Rationale**: La eliminación editorial evita que la opción vuelva a aparecer; el filtro defensivo evita que contenido antiguo o cacheado recree el desplegable.
- **Alternatives considered**:
  - Eliminar el slice/modelo de Servicios: rechazado; el contenido puede seguir existiendo y los campos de cotización relacionados con servicios siguen siendo válidos.
  - Ocultar solo con CSS: rechazado porque deja enlaces accesibles para teclado/lectores de pantalla.

## Decision 3: Preservar los canales de contacto y campos del formulario

- **Decision**: Mantener los enlaces de teléfono/WhatsApp en Prismic y conservar los campos `servicio` del formulario de Cotización.
- **Rationale**: Son parte del contacto comercial y de la información necesaria para solicitar una cotización; el cambio solo redefine la entrada de navegación.
- **Alternatives considered**:
  - Reemplazar teléfono/WhatsApp por un único enlace: rechazado porque el usuario pidió mantener los números/canales disponibles.
  - Eliminar campos de servicio: rechazado por estar fuera del alcance confirmado.

## Evidence reviewed

- `customtypes/settings/index.json`: `Navigation` contiene `label`, `link` y `special`; `telefono` contiene enlaces editoriales.
- `customtypes/homapage/index.json`: la homepage admite la slice `cotizacion` y la slice `servicios`.
- `src/slices/Cotizacion/index.tsx`: la sección publica `id="cotizacion"` y renderiza enlaces editoriales de contacto.
- `src/slices/Inicio/index.tsx`: los CTAs del hero consumen campos de enlace de Prismic mediante `Button`.
- `src/components/navbar.tsx` y `src/components/footer.tsx`: ambos consumen `settings.data.nav` y actualmente contemplan la opción especial.
