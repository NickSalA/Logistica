# Quickstart Validation Guide: Automated Testing Framework

This guide provides the exact validation steps to verify the Vitest test runner setup.

## Prerequisites

- Node.js >= 20 installed.
- `pnpm` package manager available.

## Validation Steps

### Step 1: Install Dependencies

Verify that `vitest` and `@vitest/coverage-v8` are added to `devDependencies`:

```bash
pnpm add -D vitest @vitest/coverage-v8
```

### Step 2: Verify Configuration & Aliases

Ensure `vitest.config.ts` exists at project root and resolves `@/` paths to `src/`:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Step 3: Run Unit Test Pass (Exit Code 0)

Execute a sanity test suite exercising path alias `@/*` resolution:

```bash
pnpm test
```

**Expected Outcome**:
- Terminal displays test suite name.
- Tests report green / passed.
- Exit code is `0`.

### Step 4: Run Test Coverage

Execute the coverage reporting command:

```bash
pnpm test:coverage
```

**Expected Outcome**:
- Console prints a coverage table with `% Stmts`, `% Branch`, `% Funcs`, and `% Lines`.
- Exit code is `0`.
