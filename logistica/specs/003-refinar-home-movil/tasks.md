---
description: "Task list for refining the mobile homepage"
---

# Tasks: Refinar diseño móvil de la homepage

**Input**: Design documents from `specs/003-refinar-home-movil/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/home-mobile.md`, `quickstart.md`

**Tests**: No automated test task was explicitly requested; validation includes diagnostics, lint/build, and manual responsive/accessibility review.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the current responsive surfaces and content preservation boundaries.

- [x] T001 [P] Review `src/slices/Inicio/index.tsx`, `src/slices/Servicios/index.tsx`, `src/slices/Beneficios/index.tsx`, and `src/components/footer.tsx` against `specs/003-refinar-home-movil/contracts/home-mobile.md`
- [x] T002 [P] Record current mobile and desktop viewport behavior for `src/slices/Inicio/index.tsx`, `src/slices/Servicios/index.tsx`, `src/slices/Beneficios/index.tsx`, and `src/components/footer.tsx` without changing editorial content
- [x] T003 [P] Verify the existing `texto_imagen`, Benefits card fields, Footer Settings fields, floating WhatsApp placement, and CTA link fields in Prismic before implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define reusable responsive constraints before section-specific refinements.

- [x] T004 Confirm `src/app/globals.css` supports the existing semantic tokens, reduced-motion rules, focus styles, and smooth scrolling without introducing hardcoded commercial copy or arbitrary new colors
- [x] T005 [P] Define mobile viewport checkpoints and desktop regression checkpoints in `specs/003-refinar-home-movil/quickstart.md` for narrow mobile, regular mobile, and desktop widths

**Checkpoint**: Responsive constraints and editorial preservation checks are documented before section implementation.

---

## Phase 3: User Story 1 - Recorrer una homepage móvil más ligera (Priority: P1) 🎯 MVP

**Goal**: Make the mobile homepage visually lighter and easier to scan across Hero, Services, Benefits, and Footer.

**Independent Test**: Traverse the homepage at narrow and regular mobile widths from Hero to Footer; verify readable hierarchy, no horizontal overflow, useful image proportions, visible Services caption, contained Benefits cards, and clear Footer grouping.

### Implementation for User Story 1

- [x] T006 [US1] Refine mobile hero spacing, overlay balance, typography scale, CTA grouping, and carousel positioning in `src/slices/Inicio/index.tsx` without changing Prismic text, links, or desktop classes
- [x] T007 [US1] Refine the Services mobile media block in `src/slices/Servicios/index.tsx` by containing the editorial image, preserving `texto_imagen` when configured, and adjusting mobile spacing without removing the image
- [x] T008 [US1] Reduce the mobile visual footprint of Benefits cards in `src/slices/Beneficios/index.tsx` through responsive aspect ratio, padding, image crop, and content spacing while preserving card expansion and keyboard interaction
- [x] T009 [US1] Improve mobile Footer grouping, spacing, dividers, brand emphasis, contact rhythm, and social presentation in `src/components/footer.tsx` using only existing Settings data
- [x] T010 [US1] Verify the mobile layout of `src/components/floating-whatsapp.tsx` does not obscure Hero CTAs, Services content, Benefits controls, Footer content, or consent controls after section spacing changes

**Checkpoint**: User Story 1 is visually lighter and independently testable on mobile without editorial copy changes.

---

## Phase 4: User Story 2 - Mantener la intención editorial y la experiencia desktop (Priority: P1)

**Goal**: Protect Prismic content, links, accessibility, and desktop composition while applying mobile refinements.

**Independent Test**: Compare mobile and desktop versions after implementation; verify all editorial values remain, all interactions work, desktop proportions are stable, and no responsive rule causes clipping or overflow.

### Implementation for User Story 2

- [x] T011 [P] [US2] Verify all hero CTAs, Services CTA, Benefits card interactions, Footer links, contact channels, and floating WhatsApp link still consume their configured Prismic destinations in `src/slices/Inicio/index.tsx`, `src/slices/Servicios/index.tsx`, `src/slices/Beneficios/index.tsx`, `src/components/footer.tsx`, and `src/components/floating-whatsapp.tsx`
- [x] T012 [P] [US2] Verify all configured Prismic text, images, captions, and optional contact/social items remain conditionally rendered without adding static commercial copy in `src/slices/Inicio/index.tsx`, `src/slices/Servicios/index.tsx`, `src/slices/Beneficios/index.tsx`, and `src/components/footer.tsx`
- [x] T013 [US2] Validate keyboard focus, touch target size, expanded Benefits state, carousel controls, theme toggle, and reduced-motion behavior across the responsive homepage components in `src/slices/Inicio/index.tsx`, `src/slices/Beneficios/index.tsx`, `src/components/footer.tsx`, and `src/app/globals.css`
- [x] T014 [US2] Review desktop breakpoint classes in `src/slices/Inicio/index.tsx`, `src/slices/Servicios/index.tsx`, `src/slices/Beneficios/index.tsx`, and `src/components/footer.tsx` to ensure mobile refinements do not alter desktop composition unnecessarily

**Checkpoint**: User Story 2 is independently testable across mobile and desktop with editorial and accessibility behavior preserved.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete responsive experience and document any editorial recommendations separately.

- [x] T015 [P] Run diagnostics for `src/slices/Inicio/index.tsx`, `src/slices/Servicios/index.tsx`, `src/slices/Beneficios/index.tsx`, `src/components/footer.tsx`, `src/components/floating-whatsapp.tsx`, and `src/app/globals.css`
- [x] T016 [P] Run `pnpm lint` and resolve only issues caused by the responsive refinement
- [x] T017 [P] Run `pnpm build` and verify all homepage slices, Footer, WhatsApp integration, and Prismic types compile without errors
- [ ] T018 Execute all responsive and accessibility scenarios in `specs/003-refinar-home-movil/quickstart.md` at narrow mobile, regular mobile, desktop, light theme, dark theme, and reduced-motion settings
- [ ] T019 [P] Record any copy or content clarity recommendations for Prismic in `specs/003-refinar-home-movil/quickstart.md` without changing messages in source code

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001–T003 can run in parallel and must complete before implementation.
- **Foundational (Phase 2)**: T004–T005 depend on setup review and block both user stories.
- **User Story 1 (Phase 3)**: T006–T010 depend on T001–T005; section edits should be coordinated because they affect the shared mobile scroll experience.
- **User Story 2 (Phase 4)**: T011–T014 depend on the completed mobile refinements and can be reviewed in parallel where files do not overlap.
- **Polish (Phase 5)**: T015–T019 depend on both user stories; T018 follows lint/build readiness.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational Phase 2 and is the MVP; no other story is required.
- **User Story 2 (P1)**: Depends on the completed responsive changes from US1 because it verifies desktop and editorial non-regression.

### Parallel Opportunities

- T001, T002, and T003 can run in parallel.
- T004 and T005 can run in parallel after setup review.
- T011, T012, T013, and T014 can be reviewed in parallel after US1 implementation when file ownership is coordinated.
- T015, T016, T017, and T019 can run in parallel; T018 follows the automated checks.

## Parallel Example: User Story 1

```text
Task T007: Refine Services media and caption behavior in src/slices/Servicios/index.tsx
Task T008: Reduce Benefits card footprint in src/slices/Beneficios/index.tsx
Task T009: Improve mobile Footer grouping in src/components/footer.tsx
```

## Parallel Example: User Story 2

```text
Task T011: Verify configured editorial destinations across homepage components
Task T013: Validate keyboard, touch, expanded-state, theme, and reduced-motion behavior
Task T014: Review desktop breakpoint preservation across the homepage components
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T005.
2. Implement T006–T010.
3. Run T015 and T018 for the mobile homepage experience.
4. Stop and review the visual result before broader desktop regression work.

### Incremental Delivery

1. Establish responsive and editorial constraints.
2. Refine Hero, Services, Benefits, and Footer for mobile.
3. Verify Prismic content, links, accessibility, and desktop preservation.
4. Run automated and manual validation.
5. Apply any approved copy recommendations in Prismic separately.

## Notes

- Every task follows the required checklist format with a sequential ID, optional `[P]`, story labels where applicable, and concrete file paths.
- No task authorizes hardcoding marketing text; copy recommendations belong in Prismic.
- The floating WhatsApp component is included in overlap and responsive validation because it occupies the mobile viewport.
