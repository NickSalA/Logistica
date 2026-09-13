# Tasks: Automated Testing Framework & Vitest Setup

**Feature**: Automated Testing Framework & Vitest Setup  
**Branch**: `001-configure-vitest`  
**Input Documents**: [spec.md](./spec.md), [plan.md](./plan.md), [data-model.md](./data-model.md), [contracts/cli-scripts.md](./contracts/cli-scripts.md), [quickstart.md](./quickstart.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependency installation and workspace readiness

- [X] T001 Install vitest and @vitest/coverage-v8 as devDependencies in package.json
- [X] T002 Verify dependency lockfile synchronization in pnpm-lock.yaml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core configuration and path resolution prerequisites for all test suites

- [X] T003 Create Vitest root configuration with TypeScript and node environment in vitest.config.mts
- [X] T004 Configure path alias mapping @ to ./src in vitest.config.mts

**Checkpoint**: Foundation ready — test runner configured and alias resolution active.

---

## Phase 3: User Story 1 - Run Automated Unit Tests with Instant Feedback (Priority: P1) 🎯 MVP

**Goal**: Execute project unit test suites with standard command, instant feedback, and deterministic CI exit codes.  
**Independent Test**: Run `pnpm test` against `tests/sanity.test.ts` and confirm exit code 0 on pass and non-zero on failure.

### Tests for User Story 1

- [X] T005 [P] [US1] Create unit smoke test verifying assertion mechanics and @ alias resolution in tests/sanity.test.ts

### Implementation for User Story 1

- [X] T006 [US1] Add test execution script "test": "vitest run" to package.json
- [X] T007 [US1] Verify single-run execution and deterministic exit code 0 via pnpm test

**Checkpoint**: User Story 1 complete — developers and CI can run `pnpm test` with deterministic results.

---

## Phase 4: User Story 2 - Interactive Watch Mode for TDD Workflows (Priority: P2)

**Goal**: Provide hot-reloading watch mode for immediate sub-second feedback during TDD Red-Green-Refactor cycles.  
**Independent Test**: Launch watch mode and confirm tests re-execute automatically upon modifying test files.

### Implementation for User Story 2

- [X] T008 [US2] Add watch mode execution script "test:watch": "vitest" to package.json
- [X] T009 [US2] Validate hot-reloading file watch behavior upon saving tests/sanity.test.ts

**Checkpoint**: User Story 2 complete — TDD watch mode operational.

---

## Phase 5: User Story 3 - Code Coverage Reporting for Quality Gate Compliance (Priority: P3)

**Goal**: Calculate and output statement, branch, function, and line coverage percentages to verify Constitution Principle II (>= 80% coverage).  
**Independent Test**: Run `pnpm test:coverage` and verify formatted coverage table is rendered in terminal.

### Implementation for User Story 3

- [X] T010 [US3] Add coverage provider and reporter configurations in vitest.config.mts
- [X] T011 [US3] Add test coverage script "test:coverage": "vitest run --coverage" to package.json
- [X] T012 [US3] Verify coverage report generation and check against 80% threshold via pnpm test:coverage

**Checkpoint**: User Story 3 complete — coverage metrics measurable and visible.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verification of full feature, documentation alignment, and project build health

- [X] T013 Execute full validation scenario per specs/001-configure-vitest/quickstart.md
- [X] T014 Run static analysis and build quality gates via pnpm lint and pnpm build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 (package installations).
- **User Story 1 (Phase 3)**: Depends on Phase 2 (config ready).
- **User Story 2 (Phase 4)**: Depends on Phase 3 (base test script operational).
- **User Story 3 (Phase 5)**: Depends on Phase 3 (base test script operational).
- **Polish (Phase 6)**: Depends on all user stories being implemented.

### Parallel Opportunities

- Within Phase 3: `T005` (test file creation) can be drafted while `T006` (package.json script) is being added.
- After Phase 3 is completed: Phase 4 (Watch Mode) and Phase 5 (Coverage Reporting) can proceed in parallel.

---

## Implementation Strategy

### MVP Scope (User Story 1)

1. Complete Phase 1 (Setup: install packages).
2. Complete Phase 2 (Foundational: `vitest.config.mts`).
3. Complete Phase 3 (User Story 1: `tests/sanity.test.ts` + `pnpm test`).
4. **Validate MVP**: `pnpm test` passes cleanly with exit code 0.
