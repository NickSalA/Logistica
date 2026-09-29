# Implementation Plan: Refinar diseño móvil de la homepage

**Branch**: `003-refinar-home-movil` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-refinar-home-movil/spec.md`

## Summary

Refinar exclusivamente la experiencia responsive de la homepage en móvil: aligerar el hero, contener la presencia de la imagen y leyenda de Servicios, reducir la altura percibida de las tarjetas de Beneficios y mejorar la jerarquía visual del Footer. Se conservarán todos los textos, imágenes, leyendas, enlaces y CTAs provenientes de Prismic; cualquier recomendación de copy se documentará para aplicarse en el CMS, nunca en React.

## Technical Context

**Language/Version**: TypeScript, Next.js 16, React 19

**Primary Dependencies**: Tailwind CSS v4, `@prismicio/react`, `@prismicio/next`, `lucide-react`, `next-themes`

**Storage**: Prismic CMS; no schema or persistence change

**Testing**: `pnpm lint`, `pnpm build`, optionally `pnpm lint:css` and `pnpm test`; manual responsive/accessibility validation from `quickstart.md`

**Target Platform**: Public homepage on narrow/regular mobile browsers and desktop browsers; light/dark themes

**Project Type**: Next.js App Router marketing website with Prismic-managed content

**Performance Goals**: Reduce unnecessary mobile visual height and avoid adding client-side data fetching or heavy animation; preserve existing image loading behavior

**Constraints**: No hardcoded commercial copy; preserve Prismic links/content; mobile-first changes must not regress desktop; preserve keyboard/focus behavior, reduced motion, and floating WhatsApp safe area

**Scale/Scope**: Homepage slices/components only: Inicio hero, Servicios, Beneficios, Footer, shared global CSS if needed; no internal pages or admin dashboard redesign

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Architecture & Domain First**: PASS — no domain use case, API, or persistence logic is introduced.
- **II. TDD & Coverage**: PASS WITH JUSTIFICATION — this is a responsive presentation refinement with no new business logic; validation uses diagnostics, lint/build, and manual visual/accessibility scenarios.
- **III. State & Immutability**: PASS — existing Benefits interaction remains immutable local state; no new shared state is introduced.
- **IV. Strict TypeScript**: PASS — reuse existing generated Prismic types and avoid new `any`.
- **V. Prismic Single Source of Truth**: PASS — do not hardcode or rewrite marketing copy; consume existing fields and record copy suggestions separately.
- **VI. Design System & Accessibility**: PASS — use semantic tokens, responsive Tailwind utilities, visible focus, accessible controls, and reduced motion.
- **VII. Security & Database**: PASS — no database, auth, or lead-storage changes.

## Project Structure

### Documentation (this feature)

```text
specs/003-refinar-home-movil/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── home-mobile.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── footer.tsx
│   └── floating-whatsapp.tsx
└── slices/
    ├── Inicio/index.tsx
    ├── Servicios/index.tsx
    └── Beneficios/index.tsx
```

**Structure Decision**: Mantener la arquitectura existente y concentrar cambios en las slices de homepage y Footer. Preferir clases responsive locales y tokens existentes; tocar `globals.css` solo si un comportamiento compartido no puede expresarse de forma local. No se agregan nuevos campos de Prismic.

## Phase 0: Research

Completed in [research.md](./research.md): confirmed editorial preservation, Services image/caption behavior, Benefits card interaction, Footer grouping, and reduced-motion constraints.

## Phase 1: Design

Completed:

- [data-model.md](./data-model.md): existing editorial content and responsive presentation entities.
- [contracts/home-mobile.md](./contracts/home-mobile.md): responsive/editorial preservation contract.
- [quickstart.md](./quickstart.md): automated and manual validation scenarios.

## Implementation Direction

1. Inspect the current mobile classes and actual Prismic content for Inicio, Servicios, Beneficios, and Footer before changing copy or layout.
2. Adjust Inicio mobile spacing, overlay/typography balance, CTA grouping, and carousel position without changing editorial values or desktop classes.
3. Adjust Servicios mobile image sizing, caption spacing/visibility, and section rhythm while retaining the image and `texto_imagen` when available.
4. Adjust Beneficios mobile card aspect/height, padding, and expanded content behavior while preserving interaction and desktop proportions.
5. Improve Footer mobile grouping, spacing, dividers, and visual hierarchy using existing Settings data; avoid adding static marketing text.
6. Check floating WhatsApp overlap, focus states, reduced motion, themes, and narrow viewport overflow.
7. Record any copy improvements as Prismic recommendations rather than code changes.

## Complexity Tracking

No constitution violations requiring an exception.

## Post-Design Constitution Check

- No new editorial copy or hardcoded destination is introduced.
- Existing content models and Prismic field consumption remain unchanged.
- Desktop stability is protected by scoping changes to mobile responsive classes and validating both breakpoint families.
- The plan explicitly validates accessibility, reduced motion, and floating WhatsApp overlap.
