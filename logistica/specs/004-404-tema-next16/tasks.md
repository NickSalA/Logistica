---
description: "Task list for custom 404 and theme compatibility"
---

# Tasks: Página 404 y compatibilidad del proveedor de temas

**Input**: Design documents from `specs/004-404-tema-next16/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/not-found-theme.md`, `quickstart.md`

**Tests**: No automated test task was explicitly requested; validation includes diagnostics, lint/build, and manual route/theme/console scenarios.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the current App Router, layout, theme integration, and dependency versions.

- [x] T001 [P] Review `src/app/[uid]/page.tsx` and confirm unresolved Prismic UIDs call `notFound()`
- [x] T002 [P] Review `src/app/layout.tsx` and confirm `suppressHydrationWarning`, `ThemeProvider` props, public global UI, and admin-route handling
- [x] T003 [P] Record installed `next`, `react`, `next-themes` versions and lockfile state in `package.json` and `pnpm-lock.yaml`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the 404 and theme contracts before implementation or dependency changes.

- [x] T004 Define the branded recovery hierarchy and responsive states for `src/app/not-found.tsx` using existing design tokens without adding permanent marketing copy to shared components
- [x] T005 [P] Reproduce the `<script>` console warning in `next-themes` during `pnpm dev` with Turbopack and record whether it is development-only, production-visible, or functionally harmful in `specs/004-404-tema-next16/quickstart.md`
- [x] T006 [P] Compare the installed `next-themes` version and its documented compatibility with Next.js 16/React 19 before considering changes to `package.json` or `pnpm-lock.yaml`

**Checkpoint**: 404 design constraints and theme-warning evidence are documented before implementation.

---

## Phase 3: User Story 1 - Recibir una página 404 coherente (Priority: P1) 🎯 MVP

**Goal**: Provide a branded, accessible, responsive 404 recovery view for unresolved routes.

**Independent Test**: Open nonexistent root and Prismic routes on desktop/mobile in light/dark themes; confirm the custom view, readable hierarchy, visible focus, working recovery link, no horizontal overflow, and correct WhatsApp visibility.

### Implementation for User Story 1

- [x] T007 [US1] Create the global custom 404 view in `src/app/not-found.tsx` with a clear recovery message, accessible link to `/`, existing design tokens, and responsive layout
- [x] T008 [US1] Ensure `src/app/not-found.tsx` remains usable in light and dark themes, with visible focus, adequate touch target, contrast, and no horizontal overflow
- [x] T009 [US1] Verify `src/app/layout.tsx` supplies the public theme context and floating WhatsApp access to the custom 404 without introducing a Prismic dependency inside `src/app/not-found.tsx`

**Checkpoint**: User Story 1 is independently functional for unresolved public routes.

---

## Phase 4: User Story 2 - Mantener el tema estable sin advertencias evitables (Priority: P1)

**Goal**: Preserve stable theme hydration and classify/fix the `next-themes` warning without removing required initialization behavior.

**Independent Test**: Run development Turbopack and production server, toggle themes, refresh homepage and 404, inspect console, and confirm no hydration or theme functionality regression.

### Implementation for User Story 2

- [x] T010 [US2] Preserve `suppressHydrationWarning`, `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `disableTransitionOnChange` in `src/app/layout.tsx` and `src/components/theme-provider.tsx`
- [x] T011 [US2] If compatibility evidence identifies a safe fix, update `next-themes` integration in `src/components/theme-provider.tsx`, otherwise document why the intentional initialization script remains unchanged
- [x] T012 [US2] If and only if a validated compatible release resolves a functional warning, update `package.json` and `pnpm-lock.yaml`; otherwise leave dependency versions unchanged and record the compatibility result

**Checkpoint**: User Story 2 is independently testable in dev and production with theme switching intact.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete 404 and theme experience.

- [x] T013 [P] Run diagnostics for `src/app/not-found.tsx`, `src/app/layout.tsx`, and `src/components/theme-provider.tsx`
- [x] T014 [P] Run `pnpm lint` and resolve only issues caused by the 404/theme feature
- [x] T015 [P] Run `pnpm build` and verify the App Router, custom 404, theme provider, and Prismic layout compile without TypeScript errors
- [ ] T016 Execute all route, theme, keyboard, responsive, WhatsApp, console, and production scenarios in `specs/004-404-tema-next16/quickstart.md`
- [x] T017 [P] Review `specs/004-404-tema-next16/contracts/not-found-theme.md` against the final 404 and theme behavior and document any remaining compatibility follow-up

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001–T003 can run in parallel.
- **Foundational (Phase 2)**: T004 depends on the layout review; T005 and T006 can run in parallel with T004 after the setup review.
- **User Story 1 (Phase 3)**: T007–T009 depend on T001–T004; T007 precedes T008–T009.
- **User Story 2 (Phase 4)**: T010–T012 depend on T005–T006 and can proceed after evidence is collected.
- **Polish (Phase 5)**: T013–T017 depend on both stories; T016 follows lint/build readiness.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after foundational 404 design; no dependency on User Story 2.
- **User Story 2 (P1)**: Can begin after theme evidence is collected and can be validated independently of visual 404 implementation.

### Parallel Opportunities

- T001, T002, and T003 can run in parallel.
- T005 and T006 can run in parallel.
- T013, T014, T015, and T017 can run in parallel after implementation; T016 follows automated checks.

## Parallel Example: User Story 1

```text
Task T008: Verify responsive/theme/accessibility states in src/app/not-found.tsx
Task T009: Verify layout-provided public theme and WhatsApp behavior
```

## Parallel Example: User Story 2

```text
Task T010: Verify preserved theme-provider configuration
Task T011: Apply/document the evidence-based compatibility decision
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T004.
2. Complete T007–T009.
3. Run T013–T016 for route recovery and theme variants.
4. Stop and validate the branded 404 before changing dependencies.

### Incremental Delivery

1. Establish route and theme evidence.
2. Add the custom 404.
3. Preserve or adjust theme integration only when evidence justifies it.
4. Validate development and production behavior.
5. Update dependencies only if the compatibility check supports it.

## Notes

- Every task follows the required checklist format with a sequential ID, optional `[P]`, story labels where applicable, and concrete paths.
- `suppressHydrationWarning` is a protected requirement and must not be removed.
- No task authorizes deleting the `next-themes` initialization script without evidence of a safe replacement.
