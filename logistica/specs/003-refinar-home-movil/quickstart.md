# Quickstart: Validar refinamiento móvil de la homepage

## Prerequisites

- Prismic content is available for the homepage.
- Hero, Services, Benefits, Footer, and floating WhatsApp fields are populated as expected.
- A browser/device viewport tool is available for mobile and desktop comparisons.

## Automated validation

Run:

```bash
pnpm lint
pnpm build
```

If configured:

```bash
pnpm lint:css
pnpm test
```

## Manual responsive scenarios

1. Open the homepage at a narrow mobile viewport and confirm there is no horizontal scroll or clipped content.
2. Review the hero: confirm the headline, description, CTAs, carousel controls, and logo remain legible without excessive visual heaviness or overlap.
3. Activate both hero CTAs and confirm their editorial destinations remain unchanged.
4. Review Services: confirm the service list remains readable, the image is present when configured, its scale does not dominate the viewport, and `texto_imagen` appears beneath it when configured.
5. Review Benefits: confirm each card has a contained mobile height; tap and keyboard-activate a card; verify title, description, icon/indicator, and expanded state remain readable.
6. Review the Footer: confirm brand, Conócenos, Contáctanos, Conectar, and copyright read as intentional groups rather than an unstructured list.
7. Confirm email, telephone, social, nav, CTA, WhatsApp, card, carousel, and theme links/controls remain usable and focusable.
8. Repeat in dark theme and with reduced motion enabled.
9. Repeat at a regular mobile width and a desktop width; confirm desktop composition and editorial content do not regress.
10. Verify the floating WhatsApp button does not obscure CTAs, card controls, footer content, or cookie/consent controls.

## Editorial copy review

If a label, title, or CTA feels unclear during review, record it as a Prismic content recommendation. Do not replace it in code; apply approved copy changes in Prismic.

## Expected result

The homepage feels lighter and more intentional on mobile while preserving all editorial content, interactions, destinations, and the existing desktop experience.
