# Data Model: Botón flotante de WhatsApp

## Settings WhatsApp fields

All fields belong directly to the non-repeatable Prismic `Settings` singleton.

| Field | Type | Required behavior |
|---|---|---|
| `wsp_activo` | Boolean | Render only when `true`. |
| `wsp_enlace` | Link | Destination for WhatsApp; do not render an actionable control if empty. Preserve target behavior configured in Prismic. |
| `wsp_etiqueta` | Text | Accessible name for the control; must describe the WhatsApp action. |
| `wsp_tooltip` | Text | Contextual message shown on hover and keyboard focus. |

## Floating WhatsApp access

| Property | Source | Rules |
|---|---|---|
| Visibility | `wsp_activo` + valid `wsp_enlace` | Hidden when disabled or destination is missing. |
| Destination | `wsp_enlace` | Editorial link; may be WhatsApp web or app URL and may define target behavior. |
| Accessible name | `wsp_etiqueta` | Applied to the interactive link. |
| Tooltip | `wsp_tooltip` | Visible on hover/focus and associated with the control without replacing its accessible name. |
| Position | UI behavior | Fixed at the lower-right viewport area with safe spacing. |

## Relationships

- Root layout fetches Settings and provides the global data to the public floating access component.
- The floating access is independent of the Cotización slice but uses the same WhatsApp channel configured editorially in Settings.
- Admin routes do not render the public floating access.
