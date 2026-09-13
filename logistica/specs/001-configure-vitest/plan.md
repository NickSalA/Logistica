# Implementation Plan: Automated Testing Framework & Vitest Setup

**Branch**: `001-configure-vitest` | **Date**: 2026-09-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-configure-vitest/spec.md`

## Summary

Configure Vitest as the standardized test runner for the project to fulfill Constitution Principle II (TDD & Quality Gates). This enables instant, in-memory execution of pure TypeScript domain Use Cases, utility functions, validation schemas, and server repositories. The implementation includes project-level path alias resolution (`@/*`), coverage reporting via `@vitest/coverage-v8`, and standard `pnpm test`, `test:watch`, and `test:coverage` scripts in `package.json`.

## Technical Context

**Language/Version**: TypeScript 6.0 / Node.js >= 20  
**Primary Dependencies**: `vitest` (devDependency), `@vitest/coverage-v8` (devDependency)  
**Storage**: N/A (in-memory execution)  
**Testing**: Vitest (CLI runner with Node environment)  
**Target Platform**: Linux / macOS / Windows development environments and CI pipelines  
**Project Type**: Next.js 16 Web Application / Testing Infrastructure  
**Performance Goals**: Unit test suite execution under 5 seconds, watch mode re-execution under 1 second  
**Constraints**: Zero impact on production bundle; seamless `@/*` path alias resolution mirroring `tsconfig.json`  
**Scale/Scope**: 1 root configuration file (`vitest.config.ts`), `package.json` script additions, and 1 sanity verification test suite  

## Constitution Check

*GATE: Evaluated against Logística Trasandes Constitution v1.2.0*

- **I. Architecture & Domain First**: PASS — Vitest provides a lightweight Node.js test environment specifically optimized for testing pure, framework-agnostic Use Cases in `src/server/` without needing Next.js or React mocks.
- **II. Test-Driven Development (TDD & Minimum 80% Coverage)**: PASS — Standardizes Vitest as explicitly mandated in Principle II. Configures `@vitest/coverage-v8` to enforce the 80% coverage threshold.
- **III. State Management & Immutability**: PASS — Test configurations and result interfaces are designed with `readonly` properties.
- **IV. Strict TypeScript & Zero Any**: PASS — Configuration files and test files operate under strict TypeScript without `any` types.
- **V. Single Source of Truth for Content (Prismic CMS)**: PASS — Tooling feature; does not affect or hardcode marketing copy.
- **VI. Design System Fidelity (Tailwind CSS v4)**: PASS — No styling changes.
- **VII. Security, Zero-Trust & Safe Database Evolution**: PASS — No secrets or private keys are exposed or required for local unit testing.
- **Architecture Constraints (RSC by default)**: PASS — Tests execute purely in the testing runtime without altering production React component boundaries.

## Project Structure

### Documentation (this feature)

```text
specs/001-configure-vitest/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan
├── research.md          # Technical research & decisions (Phase 0)
├── data-model.md        # Entities & configuration models (Phase 1)
├── quickstart.md        # Validation guide (Phase 1)
├── contracts/
│   └── cli-scripts.md   # CLI execution contracts (Phase 1)
├── checklists/
│   └── requirements.md  # Specification quality checklist
└── tasks.md             # Implementation tasks (/speckit-tasks output)
```

### Source Code (repository root modifications)

```text
├── package.json         # Add vitest scripts (test, test:watch, test:coverage) and devDependencies
├── pnpm-lock.yaml       # Updated dependencies lockfile
├── vitest.config.ts     # Vitest root configuration with @ alias resolution
└── tests/
    └── sanity.test.ts   # Smoke test verifying test execution and @ alias resolution
```
