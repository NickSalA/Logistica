# UI Navigation Contract

## Editorial contract

Prismic must provide the following values:

| Location                            | Field                      | Required value                                   |
| ----------------------------------- | -------------------------- | ------------------------------------------------ |
| `Settings → Navigation → Contacto`  | `link`                     | Internal web link `#cotizacion`                  |
| `Settings → Navigation → Servicios` | navigation row             | Removed                                          |
| Hero CTA intended for quotation     | link field                 | Internal web link `#cotizacion`                  |
| “Cotiza con nosotros” CTA           | link field                 | Internal web link `#cotizacion`                  |
| Services CTA                        | link field                 | Internal web link `#servicios`                   |
| Contact channels                    | phone/WhatsApp link fields | Valid configured `tel:` or WhatsApp destinations |

## Runtime behavior

- Desktop and mobile navigation render the same active editorial items.
- Legacy `special` Services items are not rendered as dropdowns or accordions.
- Selecting “Contacto” uses its Prismic link field and reaches the existing `#cotizacion` anchor.
- Re-selecting “Contacto” while already at `#cotizacion` must trigger a visible scroll or focus behavior again; the interaction must not depend solely on a hash-change event.
- The Services section exposes a stable `#servicios` anchor for its own CTA.
- Mobile navigation closes after selecting a navigation link.
- The UI must not replace editorial destinations with hardcoded business URLs.

## Accessibility and responsive requirements

- Retired Services controls must not remain in the DOM as hidden interactive elements.
- Contact and CTA links must remain keyboard-focusable and visibly focused.
- The anchor target must remain visible after navigation in light/dark themes and desktop/mobile layouts.
