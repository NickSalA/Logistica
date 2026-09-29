# Implementation Plan: Botón flotante de WhatsApp

**Branch**: `002-boton-whatsapp-flotante` | **Date**: 2026-09-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-boton-whatsapp-flotante/spec.md`

## Summary

Agregar un acceso flotante global de WhatsApp para las páginas públicas, ubicado en la esquina inferior derecha y configurado completamente desde los campos individuales de Prismic Settings: `wsp_activo`, `wsp_enlace`, `wsp_etiqueta` y `wsp_tooltip`. El componente deberá ser accesible, responsive, visible durante el scroll, seguro cuando falte configuración y respetuoso de movimiento reducido.

## Technical Context

**Language/Version**: TypeScript, Next.js 16, React 19

**Primary Dependencies**: `@prismicio/client`, `@prismicio/next`, `@prismicio/react`, Tailwind CSS v4, `lucide-react`, `next-themes`

**Storage**: Prismic CMS Settings singleton; no database changes

**Testing**: `pnpm lint`, `pnpm build`, optionally `pnpm lint:css` and `pnpm test`; manual responsive/accessibility validation in `quickstart.md`

**Target Platform**: Public responsive web browsers on desktop and mobile; light/dark themes

**Project Type**: Next.js App Router marketing website with Prismic-managed content

**Performance Goals**: One Settings fetch through the existing public layout path; no repeated client data fetching or polling; lightweight fixed UI

**Constraints**: Prismic is the source of truth; no hardcoded WhatsApp URL or text; render only when `wsp_activo` and `wsp_enlace` are valid; exclude admin routes; preserve target behavior; respect keyboard accessibility and reduced motion

**Scale/Scope**: One global floating component, one Settings data contract, public root layout integration, and responsive/accessibility styling

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Architecture & Domain First**: PASS — this is presentation-layer contact navigation; no domain use case or persistence logic is introduced.
- **II. TDD & Coverage**: PASS WITH JUSTIFICATION — no business rule or repository is added. Validation focuses on typed rendering, lint/build, and manual browser scenarios; a domain unit test is not applicable.
- **III. State & Immutability**: PASS — the component is driven by immutable Prismic data and local browser interaction only; no shared mutable state is required.
- **IV. Strict TypeScript**: PASS — consume generated Prismic fields and avoid `any` in new code.
- **V. Prismic Single Source of Truth**: PASS — URL, active state, accessible label, and tooltip all originate from `Settings`.
- **VI. Design System & Accessibility**: PASS — use semantic anchor markup, existing semantic color tokens, visible focus, responsive spacing, and reduced-motion handling.
- **VII. Security & Database**: PASS — no database, authentication, or lead-storage changes; no secrets are introduced.

## Project Structure

### Documentation (this feature)

```text
specs/002-boton-whatsapp-flotante/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── whatsapp-floating.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
customtypes/settings/index.json
prismicio-types.d.ts
src/
├── app/layout.tsx
├── components/
│   ├── floating-whatsapp.tsx
│   └── ui/anchor-link.tsx
└── app/globals.css
```

**Structure Decision**: Añadir un componente de presentación global bajo `src/components/`, montarlo desde `src/app/layout.tsx` junto al contenido público y reutilizar el comportamiento de enlace editorial existente cuando sea compatible. No se agrega una slice porque el botón no pertenece a una sección concreta.

## Phase 0: Research

Completed in [research.md](./research.md): confirmed layout-level rendering, individual Settings fields, accessible tooltip behavior, reduced motion, and public/admin route boundaries.

## Phase 1: Design

Completed:

- [data-model.md](./data-model.md): Settings fields and floating access behavior.
- [contracts/whatsapp-floating.md](./contracts/whatsapp-floating.md): editorial, runtime, and accessibility contract.
- [quickstart.md](./quickstart.md): editorial setup and validation scenarios.

## Implementation Direction

1. Confirm `prismicio-types.d.ts` exposes `wsp_activo`, `wsp_enlace`, `wsp_etiqueta`, and `wsp_tooltip` from Settings.
2. Create a typed client/server-compatible floating WhatsApp presentation component that renders only with valid enabled content.
3. Render it from the public branch of `src/app/layout.tsx`, after the theme provider context and outside Header/Footer flow as appropriate; preserve admin exclusion.
4. Implement fixed lower-right positioning, responsive safe spacing, contrast, visible focus, hover/focus tooltip, and reduced-motion behavior using existing design tokens.
5. Validate the editorial destination, target behavior, missing-link fallback, keyboard activation, mobile overlap, themes, and admin exclusion.

## Complexity Tracking

No constitution violations requiring an exception.

## Post-Design Constitution Check

- The component has a single responsibility: expose the editorial WhatsApp channel globally.
- All commercial content comes from Prismic Settings; no URL, number, label, or tooltip is hardcoded.
- The layout integration avoids duplicating the component across slices and preserves admin-route exclusion.
- Accessibility and reduced-motion requirements are explicit in the contract and quickstart.
