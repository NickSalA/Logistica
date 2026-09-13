# Research: Vitest Test Runner Configuration

## Research Questions & Decisions

### Decision 1: Vitest Configuration and Path Alias Resolution

- **Decision**: Use `vitest.config.ts` located at project root with `resolve.alias` mapping `@` to `./src` using Node's `node:path`.
- **Rationale**: `resolve.alias` natively mirrors the `paths: { "@/*": ["./src/*"] }` configured in `tsconfig.json` without requiring external plugins like `vite-tsconfig-paths`. This minimizes dependency footprint while guaranteeing instant alias resolution.
- **Alternatives considered**:
  - `vite-tsconfig-paths`: Adds an unnecessary runtime devDependency when a 2-line `resolve.alias` in `vitest.config.ts` handles the single `@` alias flawlessly.
  - Jest with `ts-jest`: Slower startup time, complex ESM/TypeScript transformation issues with Next.js App Router, and conflicts with Constitution Principle II which specifically mandates Vitest.

### Decision 2: Default Test Environment

- **Decision**: Configure default `environment: 'node'` with support for per-file `@vitest-environment happy-dom` or `jsdom` if UI tests are introduced later.
- **Rationale**: Project Constitution Principles I and II emphasize pure domain Use Cases, data models, validation schemas, and repositories. Running these in Node.js environment offers sub-second execution speeds, avoids DOM overhead, and prevents accidental coupling to browser globals.
- **Alternatives considered**:
  - `jsdom` globally: Heavy initialization time, slower test runs (~3-5x slower than Node for pure domain logic).

### Decision 3: Coverage Provider

- **Decision**: Use `@vitest/coverage-v8` with text summary and lcov output.
- **Rationale**: `@vitest/coverage-v8` is Vitest's official, high-speed coverage engine leveraging Node's built-in V8 coverage. It directly measures statement, branch, function, and line percentages against the constitutional 80% threshold without requiring code instrumentation overhead.
- **Alternatives considered**:
  - `c8`: Deprecated in favor of `@vitest/coverage-v8`.
  - `istanbul`: Slower bytecode instrumentation, unnecessary for modern V8 runtimes.

### Decision 4: Test Scripts Standardization in package.json

- **Decision**: Expose standard npm/pnpm scripts:
  - `test`: `vitest run` (single execution run for CI and quality gates, exits with code 0 or 1).
  - `test:watch`: `vitest` (interactive hot-reloading watch mode for TDD Red-Green-Refactor workflows).
  - `test:coverage`: `vitest run --coverage` (generates coverage summary).
- **Rationale**: Matches standard convention expected by developer workflows and Spec Kit quality gate checks.
