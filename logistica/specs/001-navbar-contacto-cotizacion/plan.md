# Implementation Plan: Simplificar navegación de contacto

**Branch**: `001-navbar-contacto-cotizacion` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-navbar-contacto-cotizacion/spec.md`

## Summary

Retirar la exposición de Servicios del navbar y footer, tanto en desktop como en móvil, y asegurar que Contacto y los CTAs de cotización usen el enlace editorial interno `#cotizacion`. La configuración de Settings y de las slices deberá actualizarse en Prismic; el código consumirá esos enlaces sin hardcodearlos y conservará los canales telefónicos/WhatsApp y los campos del formulario de cotización.

## Technical Context

**Language/Version**: TypeScript, Next.js 16, React 19

**Primary Dependencies**: `@prismicio/client`, `@prismicio/next`, `@prismicio/react`, Tailwind CSS v4, `lucide-react`

**Storage**: Prismic CMS; no persistence or schema migration required

**Testing**: `pnpm lint`, `pnpm build`; `pnpm test` and `pnpm lint:css` when available; manual responsive/accessibility validation per `quickstart.md`

**Target Platform**: Public responsive web application, desktop and mobile browsers, light and dark themes

**Project Type**: Next.js App Router marketing website with Prismic-managed content

**Performance Goals**: Preserve current navigation render behavior; no additional network requests or client-side data sources

**Constraints**: Prismic remains the source of truth for labels and links; internal quote navigation must use the editorial `#cotizacion` destination; repeated activation of the same hash must still provide visible scroll/focus feedback; retired controls must not remain as hidden interactive elements; preserve keyboard accessibility

**Scale/Scope**: One Settings navigation group, navbar desktop/mobile, footer navigation, homepage CTA link fields, and existing Cotización/Servicios content models

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Architecture & Domain First**: PASS — no business use case or transport boundary is introduced.
- **II. TDD & Coverage**: PASS WITH JUSTIFICATION — this is a presentation/navigation configuration change with no new domain logic or persistence behavior. Validation uses lint, build, and manual responsive/accessibility scenarios; no new domain unit test is warranted.
- **III. State & Immutability**: PASS — existing client navigation state remains local and updated immutably; no new state model is introduced.
- **IV. Strict TypeScript**: PASS — reuse generated Prismic types and existing typed link fields; do not add `any`.
- **V. Prismic Single Source of Truth**: PASS — labels, destinations, and contact links are updated in Prismic; React consumes editorial link fields.
- **VI. Design System & Accessibility**: PASS — preserve existing tokens, semantic links, visible focus behavior, themes, and responsive layouts.
- **VII. Security & Database**: PASS — no database, authentication, or lead-storage changes.

## Project Structure

### Documentation (this feature)

```text
specs/001-navbar-contacto-cotizacion/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── navigation.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
customtypes/
├── settings/index.json
└── homapage/index.json
src/
├── components/
│   ├── navbar.tsx
│   └── footer.tsx
├── components/ui/button.tsx
└── slices/
    ├── Inicio/index.tsx
    ├── Cotizacion/index.tsx
    └── Servicios/index.tsx
prismicio-types.d.ts
```

**Structure Decision**: Mantener la estructura existente del sitio Next.js. El cambio de código se concentra en los componentes de navegación; los enlaces de CTAs ya consumen campos de Prismic. Las acciones editoriales se ejecutan en Settings y en los documentos/slices correspondientes, sin introducir un nuevo modelo de datos.

## Phase 0: Research

Completed in [research.md](./research.md): confirmed the existing `#cotizacion` anchor, Prismic link-field usage in navbar and CTAs, the Settings navigation/special shape, and preservation scope for Services/Cotización fields.

## Phase 1: Design

Completed:

- [data-model.md](./data-model.md): navigation, contact channels, quotation anchor, and relationships.
- [contracts/navigation.md](./contracts/navigation.md): editorial and runtime UI contract.
- [quickstart.md](./quickstart.md): Prismic setup and local/manual validation scenarios.

## Implementation Direction

1. Update Prismic Settings: remove Services navigation row and set Contacto link to `#cotizacion`.
2. Review hero and “Cotiza con nosotros” CTA link fields in Prismic and set quotation-intent CTAs to `#cotizacion`; keep the Services CTA at `#servicios`.
3. Update navbar desktop/mobile to omit legacy `special` Services entries without discarding remaining navigation items, and ensure repeated activation of the editorial `#cotizacion` link re-scrolls or focuses the target.
4. Update footer navigation to omit the retired Services entry.
5. Add/confirm the stable Services anchor `id="servicios"`, preserve its CTA at `#servicios`, and preserve all phone/WhatsApp links and Cotización form service fields.
6. Run lint/build and execute the responsive, theme, keyboard, anchor, and contact-channel checks in `quickstart.md`.

## Complexity Tracking

No constitution violations requiring an exception.

## Post-Design Constitution Check

- Prismic remains the source of truth for all editorial links and labels.
- No hardcoded `#cotizacion` destination is introduced in React; the anchor is an existing structural target consumed through Prismic link fields.
- The plan does not delete Services content or Cotización service fields, limiting risk to navigation exposure.
- Validation covers desktop/mobile, light/dark, keyboard focus, anchor navigation, and contact channels.
