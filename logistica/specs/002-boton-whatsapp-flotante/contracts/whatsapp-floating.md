# UI Contract: Floating WhatsApp Access

## Editorial contract

Prismic `Settings` must provide:

| Field | Behavior |
|---|---|
| `wsp_activo` | Enables/disables the floating access. |
| `wsp_enlace` | Valid WhatsApp link; no URL is hardcoded in the UI. |
| `wsp_etiqueta` | Accessible name, such as “Contactar por WhatsApp”. |
| `wsp_tooltip` | Contextual message, such as “Contáctanos por WhatsApp”. |

## Runtime contract

- The access is rendered on public pages only and remains fixed while scrolling.
- It is rendered only when enabled and a valid link exists.
- Activation follows the Prismic target behavior, including new-tab configuration.
- Hover and keyboard focus reveal the tooltip; keyboard focus remains visible.
- The control is keyboard activatable and has an adequate mobile touch target.
- The tooltip transition is short and disabled/reduced when `prefers-reduced-motion` is enabled.
- The access does not obscure essential content or controls at supported breakpoints.

## Accessibility contract

- The interactive element has an accessible name from `wsp_etiqueta`.
- Tooltip text from `wsp_tooltip` is supplemental and does not replace the accessible name.
- Focus styles are visible in light and dark themes.
