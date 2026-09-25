# Data Model: Navegación de contacto

## Navigation item

Represents an item in `Settings → Navigation`.

| Field | Source | Rules |
|---|---|---|
| `label` | Prismic text | Visible label; “Contacto” remains available, “Servicios” is removed editorially. |
| `link` | Prismic link | “Contacto” must resolve to internal `#cotizacion`; other items retain their configured destinations. |
| `special` | Prismic boolean | Must not be used for the retired Services menu; legacy special items are filtered defensively in the UI. |

## Contact channel

Represents a phone or WhatsApp contact configured under `Settings → telefono` or the Cotización slice.

| Field | Source | Rules |
|---|---|---|
| `nombre` / `info` | Prismic text | Human-readable channel label or number. |
| `telefono` / `link` | Prismic link | Must remain actionable and preserve its configured `tel:` or WhatsApp destination. |
| `activo` | Cotización content group | Only active linked channels are rendered as actionable contact links. |

## Quotation section

Represents the existing homepage Cotización slice.

| Field | Source | Rules |
|---|---|---|
| Section anchor | UI structure | Stable public identifier `cotizacion`, targeted through `#cotizacion`. |
| `servicio` / `servicios` | Cotización model | Preserved; these fields remain part of quote intake and are not navigation items. |
| CTA links | Inicio/Servicios/other slice link fields | Must use `#cotizacion` when the CTA initiates a quote. |

## Relationships

- A navigation item links to the quotation section through its Prismic link field.
- The quotation section exposes contact channels and quote form fields.
- Services content may remain in the homepage/editorial model, but has no active primary navigation item after this feature.
