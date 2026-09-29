# Data Model: Homepage móvil

## Editorial section content

The feature does not add or change content fields. It consumes the existing Prismic data.

| Area | Existing content | Responsive rule |
|---|---|---|
| Hero | Images, rich text, CTA labels and CTA links | Preserve values and destinations; adjust presentation only on mobile. |
| Servicios | Badge, rich text, service items, image, `texto_imagen`, CTA | Render configured image/caption when present; contain visual height on mobile. |
| Beneficios | `cards[]` with image, number/tag, title, description, icon | Preserve each card and interaction; reduce mobile card footprint without hiding primary information. |
| Footer | Settings logo, description, nav, email, telephone, social links, copyright | Preserve configured items; improve mobile grouping and rhythm. |

## Responsive presentation entities

- **Hero mobile composition**: viewport-facing image layer, overlay, heading, description, CTAs, and carousel controls.
- **Service media block**: editorial image plus optional editorial caption under the Services content.
- **Benefit card**: interactive card with image, label, title, optional expanded description, and indicator.
- **Footer group**: Brand, Conócenos, Contáctanos, Conectar, and copyright groups using available Settings data.

## Validation rules

- Existing editorial content is never replaced with permanent marketing copy in components.
- Optional images, captions, email entries, phones, and social links render only when configured.
- Responsive styles must not create horizontal overflow or cut text/controls.
- Interactive cards and links retain keyboard operation and visible focus.
