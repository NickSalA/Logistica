# Implementation Plan: Página 404 y compatibilidad del proveedor de temas

**Branch**: `004-404-tema-next16` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-404-tema-next16/spec.md`

## Summary

Crear una página `src/app/not-found.tsx` personalizada y accesible para rutas inexistentes, alineada con el diseño de Logística Trasandes, y verificar la integración actual de `next-themes` con Next.js 16, React 19 y Turbopack. Se conservará `suppressHydrationWarning` en `<html>` y no se eliminará el script de inicialización del tema sin evidencia de un fallo funcional.

## Technical Context

**Language/Version**: TypeScript, Next.js 16.2.9, React 19.2.7

**Primary Dependencies**: `next-themes` `^0.4.6`, Tailwind CSS v4, `lucide-react`, Next.js App Router

**Storage**: N/A; the 404 view must not depend on Prismic data

**Testing**: `pnpm lint`, `pnpm build`, optionally `pnpm test`; manual development/production, route, theme, keyboard, mobile, and console validation

**Target Platform**: Public desktop and mobile browsers in light, dark, and system themes; Next.js development with Turbopack and production server

**Project Type**: Next.js App Router marketing website

**Performance Goals**: Deterministic 404 render without an additional CMS request; no visible theme flash caused by the new 404 view

**Constraints**: Preserve `suppressHydrationWarning`; preserve theme switching and public global WhatsApp behavior; avoid hardcoded business content unless it is minimal recovery UI; do not hide a third-party warning without classifying it

**Scale/Scope**: `src/app/not-found.tsx`, root theme/layout integration only if required, `src/components/theme-provider.tsx` only if compatibility evidence justifies a change, and dependency metadata only if an upgrade is validated

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Architecture & Domain First**: PASS — 404 and theme presentation do not introduce domain workflows.
- **II. TDD & Coverage**: PASS WITH JUSTIFICATION — no business logic or persistence is introduced; browser/manual and build validation are appropriate.
- **III. State & Immutability**: PASS — theme state remains owned by `next-themes`; 404 is stateless recovery UI.
- **IV. Strict TypeScript**: PASS — use typed Next/React components and no new `any`.
- **V. Prismic Single Source of Truth**: PASS — 404 recovery UI is structural, not marketing content; existing public global content remains unchanged.
- **VI. Design System & Accessibility**: PASS — use semantic links, existing tokens, visible focus, responsive layout, and both theme variants.
- **VII. Security & Database**: PASS — no database, auth, or sensitive-data changes.

## Project Structure

### Documentation (this feature)

```text
specs/004-404-tema-next16/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── not-found-theme.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   └── not-found.tsx
└── components/
    └── theme-provider.tsx
package.json
pnpm-lock.yaml
```

**Structure Decision**: Añadir la página global en `src/app/not-found.tsx`. Mantener `ThemeProvider` y el layout como están salvo que las pruebas reproduzcan un problema funcional atribuible a compatibilidad; cualquier actualización de `next-themes` debe incluir lockfile y validación de producción.

## Phase 0: Research

Completed in [research.md](./research.md): confirmed App Router `notFound()` behavior, the current theme configuration, the intentional role of the initialization script, and the decision to validate before changing the dependency.

## Phase 1: Design

Completed:

- [data-model.md](./data-model.md): not-found view and theme provider contract.
- [contracts/not-found-theme.md](./contracts/not-found-theme.md): recovery and theme behavior contract.
- [quickstart.md](./quickstart.md): route, theme, console, development, and production validation.

## Implementation Direction

1. Create a minimal, branded, responsive `src/app/not-found.tsx` with an accessible recovery link to `/`.
2. Ensure the root layout continues to provide theme context and public global UI without requiring CMS content for 404 rendering.
3. Preserve `suppressHydrationWarning`, `attribute="class"`, system theme support, and disabled transition behavior.
4. Reproduce and classify the `next-themes` script warning in Turbopack development and production; inspect installed/lockfile version before considering an upgrade.
5. Apply a dependency or provider adjustment only if the evidence shows a real compatibility issue and the change passes lint/build and theme regression checks.
6. Validate missing routes, themes, mobile/desktop, keyboard focus, WhatsApp visibility, and production behavior.

## Complexity Tracking

No constitution violations requiring an exception.

## Post-Design Constitution Check

- `suppressHydrationWarning` remains a protected root-layout behavior.
- The custom 404 is deterministic and does not introduce a CMS dependency into error recovery.
- Theme initialization is preserved until compatibility evidence justifies a dependency/integration change.
- The plan distinguishes development console diagnostics from production functional behavior.
