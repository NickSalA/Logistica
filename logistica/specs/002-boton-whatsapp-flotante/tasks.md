---
description: "Task list for the floating WhatsApp button"
---

# Tasks: Botón flotante de WhatsApp

**Input**: Design documents from `specs/002-boton-whatsapp-flotante/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/whatsapp-floating.md`, `quickstart.md`

**Tests**: No automated test task was explicitly requested; validation includes diagnostics, lint/build, and manual responsive/accessibility scenarios.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing typed Prismic model and public layout boundary.

- [x] T001 [P] Verify `customtypes/settings/index.json` contains `wsp_activo`, `wsp_enlace`, `wsp_etiqueta`, and `wsp_tooltip` with the intended field types
- [x] T002 [P] Verify `prismicio-types.d.ts` exposes the four WhatsApp Settings fields and document any generated-type mismatch before implementation
- [x] T003 [P] Review `src/app/layout.tsx` admin-route detection and public rendering path for the global component integration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the editorial contract and shared UI behavior before rendering the button.

- [x] T004 Configure and publish `Settings.wsp_activo`, `Settings.wsp_enlace`, `Settings.wsp_etiqueta`, and `Settings.wsp_tooltip` in Prismic according to `specs/002-boton-whatsapp-flotante/contracts/whatsapp-floating.md`
- [x] T005 [P] Confirm `src/app/globals.css` provides or can support the existing semantic theme tokens, focus styles, safe spacing, and reduced-motion behavior without adding arbitrary colors

**Checkpoint**: The published editorial fields and generated local types are ready for the public component.

---

## Phase 3: User Story 1 - Contactar por WhatsApp desde cualquier sección (Priority: P1) 🎯 MVP

**Goal**: Provide a persistent, accessible WhatsApp access on every public page using the Settings fields.

**Independent Test**: With published Settings content, verify the button on homepage and internal public pages in desktop/mobile, hover/focus tooltip, keyboard activation, WhatsApp target behavior, themes, scroll persistence, missing-link fallback, and admin exclusion.

### Implementation for User Story 1

- [x] T006 [US1] Create the typed global floating component in `src/components/floating-whatsapp.tsx` using `Content.SettingsDocument`, rendering only when `wsp_activo` is true and `wsp_enlace` is valid
- [x] T007 [US1] Render `src/components/floating-whatsapp.tsx` from the public branch of `src/app/layout.tsx` while preserving the existing admin-route exclusion
- [x] T008 [US1] Implement the fixed lower-right layout and responsive safe spacing in `src/components/floating-whatsapp.tsx` so the control remains visible during scroll without covering essential content
- [x] T009 [US1] Render the WhatsApp icon and semantic link in `src/components/floating-whatsapp.tsx` with `wsp_enlace` as the destination, `wsp_etiqueta` as the accessible name, and Prismic target behavior preserved
- [x] T010 [US1] Implement the `wsp_tooltip` message on hover and keyboard focus in `src/components/floating-whatsapp.tsx`, with visible focus and no reliance on tooltip text as the only accessible name
- [x] T011 [US1] Add concise hover/focus transition and `prefers-reduced-motion` handling in `src/components/floating-whatsapp.tsx` and `src/app/globals.css` without continuous distracting animation

**Checkpoint**: The floating access is functional and independently testable against the full User Story 1 scenarios.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Validate implementation quality and editorial/runtime alignment.

- [x] T012 [P] Run diagnostics for `src/components/floating-whatsapp.tsx`, `src/app/layout.tsx`, and `src/app/globals.css`
- [x] T013 [P] Run `pnpm lint` and resolve only issues introduced by this feature
- [x] T014 [P] Run `pnpm build` and verify the generated Prismic Settings types and layout integration compile without TypeScript errors
- [ ] T015 Execute all manual scenarios in `specs/002-boton-whatsapp-flotante/quickstart.md`, including desktop/mobile, hover/focus, keyboard, themes, reduced motion, missing link, overlap, and admin route checks
- [ ] T016 [P] Review `specs/002-boton-whatsapp-flotante/contracts/whatsapp-floating.md` against the final component and record any required Prismic follow-up

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001–T003 can run in parallel and must complete before implementation.
- **Foundational (Phase 2)**: T004 depends on the model review; T005 can run in parallel after the design tokens are confirmed.
- **User Story 1 (Phase 3)**: T006–T011 depend on T001–T005; T006 must precede T007–T011.
- **Polish (Phase 4)**: T012–T016 depend on the component and layout integration; T015 requires published Prismic values.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after the foundational editorial/type checks; no other user stories are required.

### Parallel Opportunities

- T001, T002, and T003 can run in parallel.
- T005 can run in parallel with Prismic content verification after T001.
- T012, T013, T014, and T016 can run in parallel after implementation; T015 follows build/lint readiness.

## Parallel Example: User Story 1

```text
Task T012: Run diagnostics for the component, layout, and global styles
Task T016: Review the UI contract against the final component
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T005, including publishing Settings values.
2. Complete T006–T011.
3. Run T012–T015 and stop to validate the public WhatsApp journey.

### Incremental Delivery

1. Verify editorial contract and generated types.
2. Add the global component and layout integration.
3. Add responsive/accessibility polish.
4. Validate all browser and editorial edge cases.

## Notes

- Every task uses the required checklist format with a sequential ID, optional `[P]`, story labels where applicable, and concrete paths or Prismic locations.
- The URL, enabled state, accessible label, and tooltip are all editorial values; do not hardcode them in the component.
- The button is global UI, not a homepage slice, because it must persist across public pages and scroll positions.

---

## Phase 5: Convergence

**Purpose**: Close remaining editorial and validation gaps after implementation.

- [x] T017 Confirm and publish `Settings.wsp_activo`, `Settings.wsp_enlace`, `Settings.wsp_etiqueta`, and `Settings.wsp_tooltip` in Prismic, then verify the live public site uses the configured WhatsApp destination per FR-002 (partial)
- [x] T018 [P] Re-run `pnpm lint` and `pnpm build` after resolving the local pnpm/Corepack SQLite environment issue, recording the actual results for SC-002 and the plan validation gate (missing)
- [ ] T019 Execute `specs/002-boton-whatsapp-flotante/quickstart.md` end to end on desktop and mobile, including hover/focus tooltip, keyboard activation, themes, reduced motion, overlap, missing-link fallback, scroll persistence, and admin exclusion per SC-001–SC-006 (missing)
- [x] T020 [P] Review the live floating control against `specs/002-boton-whatsapp-flotante/contracts/whatsapp-floating.md`, confirming tooltip contrast/position, visible focus, touch target, and configured target behavior per FR-010 (missing)
