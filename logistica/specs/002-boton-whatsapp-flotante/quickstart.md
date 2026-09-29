# Quickstart: Validar botón flotante de WhatsApp

## Prerequisites

- Prismic Settings contains `wsp_activo`, `wsp_enlace`, `wsp_etiqueta` and `wsp_tooltip`.
- The WhatsApp link is published and points to the intended commercial channel.
- Local environment has the public site configuration available.

## Editorial setup

1. Open the non-repeatable `Settings` document in Prismic.
2. Set `wsp_activo` to `true`.
3. Configure `wsp_enlace` with the WhatsApp destination.
4. Set `wsp_etiqueta`, for example `Contactar por WhatsApp`.
5. Set `wsp_tooltip`, for example `Contáctanos por WhatsApp`.
6. Publish Settings.

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

## Manual scenarios

1. Open the homepage in desktop light theme; verify the button is fixed at the lower right.
2. Scroll through the page; verify the button remains present.
3. Hover the button; verify `wsp_tooltip` appears.
4. Tab to the button; verify the focus ring and tooltip are visible.
5. Activate it with Enter/Space and mouse; verify the published WhatsApp destination opens according to its configured target.
6. Repeat on a public internal page, mobile viewport, dark theme, and with browser zoom.
7. Verify the button does not cover form fields, cookie consent, or essential controls.
8. Enable reduced motion; verify the button remains usable without continuous or distracting animation.
9. Set `wsp_activo` to `false` or remove `wsp_enlace`, publish, refresh, and verify no broken floating control is rendered.
10. Verify admin routes do not display the public floating control.

## Expected result

Visitors can reach WhatsApp from any public page, understand the button through its contextual message, and activate it accessibly without the control obstructing content.
