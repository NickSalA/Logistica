# Data Model: Automated Testing Framework & Vitest Setup

This document defines the configuration schemas and execution result models for the Vitest test runner.

## Entities

### 1. TestRunnerConfiguration

Represents the declarative configuration governing how Vitest discovers, transforms, and runs tests.

- **Attributes**:
  - `globals` (boolean, `readonly`): Whether global test APIs (`describe`, `it`, `expect`, `vi`) are available without explicit imports. Default: `true`.
  - `environment` (string, `readonly`): Execution context (`'node'` for domain/backend logic, `'happy-dom'` for components). Default: `'node'`.
  - `include` (array of strings, `readonly`): Glob patterns for test file discovery. Default: `['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}']`.
  - `alias` (record of string to string, `readonly`): Path mappings matching `tsconfig.json`. Maps `'@'` to `<root>/src`.
  - `coverage` (object, `readonly`):
    - `provider` (string): `'v8'`.
    - `reporter` (array of strings): `['text', 'json', 'html']`.
    - `thresholds` (object): Minimum 80% on statements, branches, functions, and lines for business logic directories.

### 2. TestSuiteExecutionResult

Represents the observable outcome of a test execution pass.

- **Attributes**:
  - `totalSuites` (number, `readonly`): Total test files processed.
  - `passedSuites` (number, `readonly`): Files where all assertions succeeded.
  - `failedSuites` (number, `readonly`): Files where one or more assertions failed.
  - `totalTests` (number, `readonly`): Total individual assertions evaluated.
  - `durationMs` (number, `readonly`): Total execution time in milliseconds.
  - `exitCode` (number, `readonly`): `0` for complete pass, `1` for any failure or configuration error.

### 3. CoverageMetrics

Represents code coverage metrics computed against executed source lines.

- **Attributes**:
  - `statements` (number, `readonly`): Percentage of executable statements exercised (0-100).
  - `branches` (number, `readonly`): Percentage of control flow branches exercised (0-100).
  - `functions` (number, `readonly`): Percentage of declared functions invoked (0-100).
  - `lines` (number, `readonly`): Percentage of executable lines hit (0-100).
  - `meetsThreshold` (boolean, `readonly`): Evaluates whether coverage >= 80% as mandated by Constitution Principle II.
