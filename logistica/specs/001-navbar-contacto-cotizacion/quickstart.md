# Quickstart: Validar navegación de contacto

## Prerequisites

- Node.js and pnpm installed.
- Prismic Settings and homepage content available in the configured repository.
- A local environment with the required public Prismic configuration.

## Editorial setup in Prismic

1. Open **Settings → Navigation**.
2. Remove the “Servicios” navigation row.
3. Set “Contacto” to an internal web link with value `#cotizacion`.
4. Review hero and “Cotiza con nosotros” link fields; set quotation CTAs to `#cotizacion`.
5. Review phone/WhatsApp link fields and confirm their destinations are actionable.
6. Publish the Settings and homepage changes.

## Local validation

Run:

```bash
pnpm lint
pnpm build
```

If configured in the repository, also run:

```bash
pnpm test
pnpm lint:css
```

## Manual scenarios

1. Open the homepage on desktop.
2. Confirm “Servicios” is absent from the navbar and no dropdown is available.
3. Select “Contacto”; confirm the URL includes `#cotizacion` and the quotation section is visible.
4. Select “Contacto” a second time without changing the page; confirm the quotation section receives a visible scroll or focus again and the interaction does not appear inactive.
5. Activate the phone/WhatsApp contact channel from the quotation section and confirm it opens the configured destination.
6. Repeat steps 2–5 from the mobile menu; confirm the menu closes after selecting “Contacto”.
7. Activate each hero quotation CTA and “Cotiza con nosotros”; confirm they target `#cotizacion`.
8. Activate the Services CTA; confirm it targets `#servicios` and returns to the Services section.
9. Check the footer; confirm “Servicios” is not listed as a primary navigation item.
10. Repeat in light and dark themes and verify keyboard focus on all remaining navigation and contact links.

## Expected result

The visitor has one clear path from navigation to quotation, Services is no longer exposed as a navigation option, and all editorially configured contact channels remain usable.
