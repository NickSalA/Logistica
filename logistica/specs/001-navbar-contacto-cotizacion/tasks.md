---
description: "Task list for simplifying contact navigation"
---

# Tasks: Simplificar navegación de contacto

**Input**: Design documents from `specs/001-navbar-contacto-cotizacion/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/navigation.md`, `quickstart.md`

**Tests**: No automated test task was requested in the feature specification. Validation tasks cover lint/build and the documented manual responsive/accessibility scenarios.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing editorial and runtime surfaces before implementation.

- [ ] T001 [P] Review `customtypes/settings/index.json`, `customtypes/homapage/index.json`, `src/components/navbar.tsx`, `src/components/footer.tsx`, `src/slices/Inicio/index.tsx`, and `src/slices/Cotizacion/index.tsx` against `specs/001-navbar-contacto-cotizacion/contracts/navigation.md`
- [ ] T002 [P] Confirm the existing quotation anchor `id="cotizacion"` in `src/slices/Cotizacion/index.tsx` and record any conflicting link destinations in `specs/001-navbar-contacto-cotizacion/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the editorial configuration required by every user story.

- [ ] T003 Configure `Settings → Navigation` in Prismic by removing the “Servicios” row and setting “Contacto” to the internal web link `#cotizacion`
- [ ] T004 [P] Review the hero link fields represented by `src/slices/Inicio/index.tsx` in Prismic and set quotation-intent CTAs to the internal web link `#cotizacion`
- [ ] T005 [P] Review the “Cotiza con nosotros” and relevant Services CTA link fields in Prismic; set quotation-intent CTAs to `#cotizacion`, keep the Services CTA at `#servicios`, and do not remove the Services slice
- [ ] T006 [P] Verify phone and WhatsApp link fields under `Settings → telefono` and the Cotización contact group in Prismic remain actionable and publish the editorial changes

**Checkpoint**: Prismic contains the intended navigation and CTA destinations before runtime changes are validated.

---

## Phase 3: User Story 1 - Navegar hacia cotización desde Contacto (Priority: P1) 🎯 MVP

**Goal**: Selecting Contacto reaches the quotation section through the editorial `#cotizacion` link, works on desktop/mobile, and remains responsive to repeated activation.

**Independent Test**: With published Prismic content, select Contacto once and twice on desktop and mobile; confirm the quotation section is visible both times, the second activation produces visible scroll/focus feedback, and the mobile menu closes.

### Implementation for User Story 1

- [ ] T007 [US1] Update `src/components/navbar.tsx` to consume the Contacto link configured in Prismic and preserve its `#cotizacion` destination without hardcoding a replacement URL
- [ ] T008 [US1] Implement repeated Contacto activation handling in `src/components/navbar.tsx` so selecting the same `#cotizacion` destination again performs a visible scroll or focus on the target section
- [ ] T009 [US1] Preserve desktop/mobile Contacto behavior and close the mobile menu after activation in `src/components/navbar.tsx`
- [ ] T010 [P] [US1] Verify `src/components/ui/button.tsx` and the Prismic link rendering path preserve internal hash links for hero and quotation CTAs without regressing external phone/WhatsApp links

**Checkpoint**: User Story 1 is independently functional and testable using the scenarios in `specs/001-navbar-contacto-cotizacion/quickstart.md`.

---

## Phase 4: User Story 2 - Ver una navegación sin Servicios (Priority: P1)

**Goal**: Services is absent from desktop/mobile navigation and the footer while existing content and remaining navigation options stay intact.

**Independent Test**: Inspect desktop navbar, mobile menu, and footer after Prismic publication; confirm there is no Services option, dropdown, accordion, or hidden interactive Services control, while all other links remain available.

### Implementation for User Story 2

- [ ] T011 [US2] Remove the legacy Services dropdown rendering and unused Services-menu behavior from `src/components/navbar.tsx` while retaining all non-special navigation items
- [ ] T012 [US2] Add a defensive filter for legacy `special` Services entries in `src/components/navbar.tsx` so stale Prismic content cannot recreate the desktop dropdown or mobile accordion
- [ ] T013 [US2] Filter the retired Services navigation entry from `src/components/footer.tsx` without removing phone, WhatsApp, email, social, or remaining navigation links
- [ ] T014 [P] [US2] Add the stable `id="servicios"` anchor to `src/slices/Servicios/index.tsx` and preserve the Services CTA at `#servicios` plus the quotation service fields in `src/slices/Servicios/model.json` and `src/slices/Cotizacion/model.json`

**Checkpoint**: User Story 2 is independently functional and testable on desktop, mobile, light theme, dark theme, and keyboard navigation.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete editorial/runtime behavior and prevent regressions.

- [ ] T015 [P] Run `pnpm lint` and resolve only lint issues caused by the navigation change
- [ ] T016 [P] Run `pnpm build` and verify generated Prismic types and all navigation components compile without TypeScript errors
- [ ] T017 Execute all desktop/mobile, repeated-click, light/dark theme, keyboard-focus, CTA, and phone/WhatsApp scenarios in `specs/001-navbar-contacto-cotizacion/quickstart.md`
- [ ] T018 [P] Review `specs/001-navbar-contacto-cotizacion/contracts/navigation.md` against the final implementation and document any Prismic follow-up still required

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001–T002 can run in parallel and establish the current surfaces.
- **Foundational (Phase 2)**: T003–T006 depend on the setup review and must be completed/published before end-to-end validation.
- **User Stories (Phase 3–4)**: T007–T010 and T011–T014 depend on the foundational editorial configuration; US1 and US2 can then be implemented in parallel if separate workspaces are available, except shared review of `src/components/navbar.tsx` should be serialized.
- **Polish (Phase 5)**: T015–T018 depend on both user stories and published Prismic content.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on T003–T006; no dependency on US2.
- **User Story 2 (P1)**: Depends on T003 and T006; no dependency on US1, though navbar edits should be coordinated to avoid conflicts with T007–T009.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T004, T005, and T006 can run in parallel after T003’s navigation decision is confirmed.
- T010 and T014 can run in parallel with the main story implementation because they touch separate files.
- T015, T016, and T018 can run in parallel after implementation; T017 should run after build/lint complete.

## Parallel Example: User Story 1

```text
Task T007: Update editorial Contacto link consumption in src/components/navbar.tsx
Task T010: Verify internal hash/external link handling in src/components/ui/button.tsx
```

## Parallel Example: User Story 2

```text
Task T013: Filter Services from src/components/footer.tsx
Task T014: Verify preservation of Services/Cotización models in src/slices/Servicios/model.json and src/slices/Cotizacion/model.json
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T006, including Prismic publication.
2. Complete T007–T010.
3. Run T015–T017 for the Contacto → `#cotizacion` flow, including repeated activation.
4. Stop and validate the primary commercial journey before removing the remaining Services navigation UI.

### Incremental Delivery

1. Editorial foundation: T003–T006.
2. Contacto-to-cotización MVP: T007–T010.
3. Remove Services from navbar/footer: T011–T014.
4. Run full cross-cutting validation: T015–T018.

## Notes

- Every task follows the required checklist format: checkbox, sequential ID, optional `[P]` marker, optional story label, and concrete file path or Prismic location.
- Prismic tasks are explicit because content configuration is part of the feature and cannot be completed only through repository code.
- The `#cotizacion` destination remains editorial; repeated activation behavior is a runtime responsibility because the browser may not emit a new hash-change event for the same hash.
