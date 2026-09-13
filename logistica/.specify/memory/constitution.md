<!--
Sync Impact Report
Version change: 1.1.0 -> 1.2.0
Modified principles:
- I. Architecture & Domain First (Pure Use Cases): Added error handling boundaries (controllers sanitize and format errors; zero leakage of stack traces or SQL internals).
- II. Test-Driven Development (TDD & Minimum 80% Coverage): Standardized Vitest as the official test runner for TypeScript and ESM.
- V. Single Source of Truth for Content (Prismic CMS): Added on-demand cache revalidation via Prismic webhooks and revalidateTag/revalidatePath.
Modified sections:
- Architecture and Boundary Constraints: Enforced React Server Components (RSC) by default, confining 'use client' strictly to interactive leaf components.
- Development Workflow and Quality Gates: Specified Vitest execution (pnpm test) in the pre-merge quality gate.
- Document Language: Standardized documentation to English for clarity and token efficiency.
Added sections: None.
Removed sections: None.
Follow-up TODOs: Configure Vitest configuration file and test scripts in package.json.
-->
# Logística Trasandes Constitution

## Core Principles

### I. Architecture & Domain First (Pure Use Cases)

All business logic, operational rules, and commercial workflows MUST reside within domain Use Cases (or Domain Services) completely decoupled and agnostic from the underlying web framework.

- Use Case functions MUST be implemented in pure TypeScript and MUST NOT depend on Next.js constructs (`NextRequest`, `NextResponse`, Server Actions, HTTP headers) or React APIs.
- Route Handlers (`src/app/api/`) and Server Actions MUST act strictly as thin transport controllers: validate the request schema, invoke the appropriate Use Case, and return a typed HTTP response. They MUST NOT contain raw database queries or embedded business logic.
- **Error Handling & Boundaries:** Errors raised by Use Cases MUST be caught within the controller layer (Route Handler / Server Action) and translated into typed, user-friendly errors, or handled through Next.js `error.tsx` boundaries. Exposing internal implementation details, runtime stack traces, or raw SQL errors to the client or browser is strictly PROHIBITED.
- Data access and third-party integrations (Supabase, transactional email providers, external APIs) MUST be abstracted behind repository contracts and service interfaces in `src/server/`.
- Any logic shared between the public-facing site and the administrative dashboard (`src/app/admin/`) MUST be reused through the same domain Use Case to avoid logic divergence or duplication.

**Rationale**: Decoupling the domain from the framework enables instant in-memory testing without web server mocks, facilitates clean technology migrations, and guarantees that business rules serve as the authoritative single source of truth.

### II. Test-Driven Development (TDD & Minimum 80% Coverage)

Business logic development, input validations, and data access MUST follow a strict Test-Driven Development (TDD) workflow.

- For any new business feature, bug fix, or rule modification, automated unit or integration tests MUST be written and fail before implementation code is written (Red-Green-Refactor cycle).
- **Testing Tooling:** Business logic unit and integration tests MUST run using **Vitest**, providing native support for TypeScript, `@/` path aliasing, and modern ECMAScript modules (ESM).
- Domain Use Cases, validation schemas, and data repositories MUST achieve a minimum code coverage threshold of **80%**.
- Tests MUST be fast, deterministic, and executed in memory without requiring remote cloud services or live network databases for domain-level unit tests.

**Rationale**: Automated test coverage prevents regressions, documents expected behavior, and provides mathematical certainty during refactoring.

### III. State Management & Immutability (UDF)

Application state management and data modeling MUST adhere to Unidirectional Data Flow (UDF) and strict immutability.

- All data models, domain entities, and state contracts MUST declare properties as `readonly`.
- Direct mutation of objects, arrays, or component state is strictly PROHIBITED. All state updates MUST generate new references through immutable transformations.
- Asynchronous UI state (form submissions, data fetches, mutations) MUST be modeled using Discriminated Unions (e.g., `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: string }`). Disjoint, contradictory boolean flags (such as simultaneous `isLoading`, `isError`, and `isSuccess`) are PROHIBITED.

**Rationale**: UDF and immutability eliminate impossible UI states, make error tracing predictable, and optimize render cycles in React 19.

### IV. Strict TypeScript & Zero Any

Code MUST adhere to strict TypeScript type safety standards.

- The use of `any` is strictly PROHIBITED across the entire codebase, including external libraries, Prismic slices, and database outputs.
- Dynamic or unknown inputs (such as external HTTP payloads) MUST be typed as `unknown` and parsed using runtime schema validation (Zod) or explicit Type Guards before access.
- Shared API request and response contracts MUST be centrally defined and exported in `src/types/api/`.
- Supabase queries and Prismic slices MUST consume their generated types (`prismicio-types.d.ts` and Supabase database type definitions).

**Rationale**: Strict typing catches regressions at compile time, ensures safe refactoring, and serves as living API documentation.

### V. Single Source of Truth for Content (Prismic CMS)

All marketing copy, corporate copy, section headings, call-to-action (CTA) labels, carousels, client logos, service descriptions, and navigation metadata MUST originate from Prismic headless CMS (using `homepage` and `settings` singletons and registered Slices).

- Hardcoding marketing text, sales copy, or corporate links directly in React components, pages, or Slices is strictly PROHIBITED.
- In-code fallbacks are permissible ONLY as defensive structural placeholders (such as skeleton UI or fallback containers to avoid rendering crashes during network interruptions), NEVER as permanent production business copy.
- **On-Demand Cache Revalidation:** All static content fetched from Prismic MUST be cached for high performance and availability. Editorial updates MUST NOT require code redeployments; on-demand cache revalidation (`revalidateTag` or `revalidatePath`) MUST be triggered via Prismic webhooks delivered to the secret-protected endpoint (`src/app/api/revalidate/`).
- When a new editable field is required:
  1. The field MUST first be modeled in Prismic Type Builder / Slice Machine (`Key Text`, `StructuredText`, `Image`, `Link`, etc.).
  2. The schema MUST be pulled locally using `npx prismic pull`.
  3. The resulting generated types in `prismicio-types.d.ts` MUST be strictly consumed.

**Rationale**: Content editors and marketing teams must be able to iterate corporate messaging independently without waiting for engineering deployments.

### VI. Design System Fidelity & Visual Seamlessness (Tailwind CSS v4)

The user interface MUST strictly adhere to the corporate design system and semantic tokens configured in `src/app/globals.css`:
- **Primary Corporate Navy:** `night` (`#003366`) and `night-dark` (`#001122`).
- **Highlight Accent:** `accent` (`#FFC000`) and `accent-hover` (`#E6AC00`).
- **Warm Neutrals:** `sand` (`#F5F5DC`), `charcoal` (`#2C2C2C`), and clean white.

- Arbitrary inline hex color classes in Tailwind markup are PROHIBITED; new colors MUST be formally declared as semantic tokens in `globals.css`.
- Page section transitions MUST remain fluid and avoid harsh cuts ("stitches"):
  - Adjacent sections MUST alternate background tones or utilize three-dimensional negative margin overlaps (`-mt-*`) with controlled z-indexing.
  - Standard container constraints (`container mx-auto px-6 md:px-12 xl:px-20`) and generous vertical padding (`py-12 md:py-20 lg:py-24`) MUST be respected.
- Interactive elements MUST use semantic HTML (`<button>`, `<a>`, `<input>`) or the standardized `<Button>` component (`src/components/ui/button.tsx`), ensuring visible focus rings, full keyboard accessibility, and complete dark/light theme compatibility (`next-themes`).
- Modern Tailwind CSS v4 syntax MUST be maintained (e.g., `bg-linear-to-b`, not legacy `bg-gradient-to-b`).

**Rationale**: A refined, consistent visual identity builds trust and conveys technical solidity to enterprise logistics clients.

### VII. Security, Zero-Trust & Safe Database Evolution

Data persistence and access security MUST follow a Zero-Trust architecture:

- Private credentials, Prismic webhook secrets, and Supabase service role keys (`service_role`) MUST remain strictly in server environment variables without the `NEXT_PUBLIC_` prefix.
- Public intake forms (such as cargo quote requests and contact forms):
  - MUST enforce dual validation: client-side validation for instant user feedback and authoritative server-side schema validation before persistence.
  - MUST include anti-spam protections (honeypot fields and payload analysis) and support request rate limiting.
- All Supabase/PostgreSQL tables storing client or prospect information MUST have Row Level Security (RLS) enabled. Privileged administrative tasks that bypass RLS MUST be restricted to audited, server-only repositories.
- All database tables, indexes, constraints, and RLS policies MUST be version-controlled via SQL migration scripts in `supabase/migrations/`. Manual modifications performed through web consoles without corresponding repository migrations are strictly PROHIBITED.
- Destructive deletion of leads or quotations is PROHIBITED; records MUST follow lifecycle status transitions (`nuevo` → `contactado` → `en_proceso` → `archivado`).

**Rationale**: Commercial lead data and enterprise quote requests demand strict confidentiality, auditable history, and reproducible database environments.

## Architecture and Boundary Constraints

- **Framework & Runtime:** Next.js 16 (App Router with Turbopack), React 19, TypeScript configured in strict mode, and Node.js >= 22.12.0 (Active LTS).
- **Server Components by Default (RSC):** Views and layouts MUST prioritize React Server Components by default to maximize performance and SEO. The `'use client'` directive MUST be restricted strictly to leaf components requiring user interactivity (React hooks, event listeners) or browser-specific APIs.
- **Styling Architecture:** Tailwind CSS v4 with PostCSS and centralized semantic tokens.
- **Headless CMS:** Prismic CMS cloud Type Builder, consumed via `@prismicio/client` and `@prismicio/react` in `src/prismicio.ts`.
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security and isolated clients in `src/lib/supabase/`).
- **Package Manager:** `pnpm` exclusively; `pnpm-lock.yaml` remains the sole lockfile authority.

## Development Workflow and Quality Gates

Before merging changes into `main` or deploying to production, code MUST pass the following automated quality gates:

1. **Automated Testing (Vitest TDD Gate):** All domain use case and repository tests MUST run via Vitest and pass (`pnpm test`), satisfying the minimum 80% coverage requirement on business logic.
2. **Static Analysis (Linting):** Code MUST pass `pnpm lint` (`eslint .`) and `pnpm lint:css` without unhandled warnings or errors.
3. **Type Checking & Build:** The project MUST pass `pnpm build` with zero TypeScript compilation errors.
4. **Accessibility & Responsive Verification:** New components and slices MUST be verified across mobile and desktop breakpoints, in light and dark modes, with accessible keyboard tab navigation.
5. **Content Synchronization:** Any changes to Prismic models MUST be synced via `npx prismic pull` and committed with updated `prismicio-types.d.ts`.
6. **Branch Isolation:** Features and bug fixes MUST be developed on dedicated feature branches before opening a PR to `main`.

## Governance

This constitution serves as the sovereign architectural and operational standard for the Logística Trasandes project. It supersedes informal agreements, legacy shortcuts, or undocumented conventions.

- Every Pull Request and code review MUST verify adherence to these principles.
- Any technical exception (e.g., deferring a test or temporary coupling) MUST be explicitly justified in the technical plan under a dedicated **Complexity & Justification** section.

### Amendment Procedure

Amendments to this constitution require:
1. Documented rationale approved through a Pull Request.
2. A Semantic Versioning update to this document:
   - **MAJOR**: Incompatible principle removals or foundational architectural shifts.
   - **MINOR**: Addition of new principles, architectural constraints, or expanded quality gates.
   - **PATCH**: Wording refinements, typo corrections, or non-semantic clarifications.
3. An updated Sync Impact Report prepended as an HTML comment to this file.

**Version**: 1.2.0 | **Ratified**: 2026-08-08 | **Last Amended**: 2026-09-12
