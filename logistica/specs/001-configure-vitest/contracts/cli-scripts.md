# Contract: CLI Test Execution Scripts

This document defines the interface contract for command-line test execution in this repository.

## Commands

### 1. `pnpm test`

Executes the test suite once (CI / Quality Gate mode).

- **Invocation**: `pnpm test` (translates to `vitest run`)
- **Inputs**: None required (optional test path pattern, e.g. `pnpm test src/server`)
- **Outputs**: Formatted console test summary (passed/failed counts, execution time)
- **Exit Code**:
  - `0`: All tests passed.
  - `1`: At least one test assertion failed, or a test file threw an unhandled exception.

### 2. `pnpm test:watch`

Starts the test runner in interactive file-watching mode for development and TDD workflows.

- **Invocation**: `pnpm test:watch` (translates to `vitest`)
- **Inputs**: None (interactive terminal controls: `q` to quit, `r` to restart, `a` to rerun all)
- **Behavior**: Re-runs tests affected by modified files automatically upon save.

### 3. `pnpm test:coverage`

Executes the full test suite and prints a tabular code coverage summary to stdout.

- **Invocation**: `pnpm test:coverage` (translates to `vitest run --coverage`)
- **Outputs**:
  - Console table detailing `% Stmts`, `% Branch`, `% Funcs`, `% Lines`, and uncovered line numbers per file.
  - HTML report output into `coverage/` directory (git-ignored).
- **Exit Code**:
  - `0`: All tests passed and coverage executed.
  - `1`: Test failure or threshold breach (when thresholds configured).
