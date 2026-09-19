# BeanParts — Planned Codebase Structure

Status: Current development structure decision. This is the required baseline for implementation; exact package versions and build commands remain to be selected and tested.

## Goals

The codebase must be understandable by future student maintainers, safe to change in small pieces, and separable at the frontend/backend boundary.

The core rules are:

1. Organize code by responsibility and feature.
2. Define shared vocabulary and contracts before implementation.
3. Keep business rules out of React components and spreadsheet access code.
4. Keep Google Sheets behind repositories rather than calling it throughout the backend.
5. Keep `google.script.run` behind one typed frontend adapter.
6. Give each module a small public interface and test that interface.
7. Prefer several focused files over one large file with unrelated responsibilities.

## Planned repository tree

This is the target layout. Directories may be introduced as their first real feature is built; empty placeholder directories are unnecessary.

The current repository contains documentation plus a generated fake-data prototype under `dist/`; it does not yet contain the accepted production `apps/`, `packages/`, or `scripts/` scaffold. The exact current tree is maintained in [Architecture](ARCHITECTURE.md). When scaffolding adds a path below, update both documents in the same pull request.

```text
BeanParts/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── features/
│   │   │   ├── components/
│   │   │   ├── domain/
│   │   │   ├── lib/
│   │   │   ├── styles/
│   │   │   └── test/
│   │   └── index.html
│   └── script/
│       └── src/
│           ├── api/
│           ├── auth/
│           ├── services/
│           ├── repositories/
│           ├── sheets/
│           ├── validation/
│           ├── concurrency/
│           ├── config/
│           └── test/
├── packages/
│   └── contracts/
│       └── src/
├── docs/
│   ├── decisions/
│   └── ...
├── reports/
├── scripts/
├── AGENTS.md
├── CONTRIBUTING.md
└── README.md
```

This structure is a boundary map, not permission to implement the application or alter live Sheets.

Do not create competing root-level `frontend/`, `backend/`, or `src/` directories. Generated deployment output must be reproducible from owned source and must not replace the source layout above.

## Frontend modules

### `apps/web/src/app`

Application composition only:

- application entry point;
- routing and page shell;
- global providers;
- error boundary;
- session/bootstrap loading.

It may assemble features but must not contain ordering, BOM, approval, or invoice business rules.

### `apps/web/src/features/<feature>`

Each user-facing capability owns its UI and local behavior. Expected feature folders include:

- `projects`;
- `bom`;
- `requests`;
- `orders`;
- `ad-orders`;
- `invoices`;
- `deliveries`;
- `members`.

A feature may contain:

```text
feature-name/
├── components/
├── hooks/
├── pages/
├── state/
├── validation/
├── test/
└── index.ts
```

Not every feature needs every folder. `index.ts` is the feature's public interface; other features should not import private internal paths.

### `apps/web/src/components`

Reusable presentation components with no BeanParts workflow authority, such as buttons, dialogs, tables, form fields, loading states, and accessible layout primitives.

A shared component is created only after it is genuinely reused or clearly generic. Feature-specific components stay with their feature.

### `apps/web/src/domain`

Frontend display helpers for shared domain concepts. Durable record types and API contracts belong in `packages/contracts`, not here.

### `apps/web/src/lib`

Infrastructure adapters:

- the typed `google.script.run` client;
- date/number formatting;
- logging and safe error presentation;
- cache and refresh helpers.

React components and feature hooks must call the typed API adapter, never `google.script.run` directly.

## Backend modules

### `apps/script/src/api`

Thin Apps Script functions exposed to the browser. An API entry point:

1. accepts one request object;
2. establishes request/operation context;
3. calls the appropriate service;
4. returns the standard response envelope;
5. converts internal failures into safe client errors.

It does not contain spreadsheet queries or full workflows.

### `apps/script/src/auth`

Workspace identity, active-member checks, role loading, and reusable permission policies. Every protected service operation performs a backend authorization check.

### `apps/script/src/services`

Use cases and business workflows such as submitting a request, approving a purchase, recording delivery, creating a project, or resolving a conflict.

Services coordinate authorization, validation, repositories, history, locking, and idempotency. They do not depend on React or browser state.

### `apps/script/src/repositories`

Domain-oriented data access such as `OrderRepository` or `ProjectRepository`. Repositories provide batched record operations and hide row/range details from services.

### `apps/script/src/sheets`

Low-level Google Sheets helpers:

- batch range reads and writes;
- header-to-column mapping;
- row serialization;
- workbook lookup;
- cache integration.

This layer knows Sheets mechanics but not who may approve an order.

### `apps/script/src/validation`

Server-side schemas and reusable validation rules. Browser validation is for convenience; this backend validation is authoritative.

### `apps/script/src/concurrency`

Locks, revisions/hashes, operation IDs, idempotency checks, conflict creation, and recovery support.

### `apps/script/src/config`

Non-secret identifiers and validated configuration access. Secrets and privileged credentials are never committed or sent to the browser.

## Shared contracts

`packages/contracts/src` is the single code-level definition point for data crossing the frontend/backend boundary:

- record IDs and common primitives;
- request and response types;
- role and permission names;
- status values and allowed transitions;
- API error codes;
- pagination/filter shapes;
- revision and conflict types.

Contracts contain no React, Apps Script, Google Sheets, or business-workflow implementation.

Avoid duplicating the same status as separate frontend and backend string literals. Prefer explicit unions or enums with human-readable labels kept separately.

## Dependency direction

Allowed dependencies flow inward:

```text
React pages/components
        ↓
feature hooks and feature logic
        ↓
typed API adapter
        ↓
Apps Script API entry points
        ↓
services and permission policies
        ↓
repositories
        ↓
Sheets helpers
        ↓
Google Sheets
```

Shared contracts may be imported by frontend and backend. Backend services may use authorization, validation, concurrency, and repositories. Lower layers must not import higher layers.

Examples:

- A React table may request `listOrders`; it may not read a Sheet.
- `approveOrder` belongs in a service; it does not belong in a button click handler or repository.
- A repository may map an Order record to a row; it may not decide whether the current user is a Mentor.
- A Sheets helper may batch-write ranges; it may not know what an order approval means.

## Definition-first development

Before implementing a feature, define or confirm:

1. User-visible behavior and acceptance criteria.
2. Roles allowed to view and perform each action.
3. Domain terms, IDs, statuses, and state transitions.
4. Request, success, error, stale-data, and conflict contracts.
5. Source workbook/sheet and authoritative fields.
6. Validation and deletion/archive behavior.
7. History, backup, retry, and partial-failure expectations.
8. Module owner and public interface.
9. Tests required for completion.

These definitions should be small and specific to the feature. “Defined first” does not mean placing every variable in a global file.

## Standard file order

Use this order where it improves readability:

1. imports;
2. exported types/interfaces;
3. module-local types;
4. constants;
5. exported functions/components/classes;
6. private helpers.

Keep constants near the module that owns them. Promote a constant to shared contracts or configuration only when multiple modules must agree on it.

## Size and coupling guidance

These are review triggers, not automatic failures:

- A file mixes UI, authorization, business logic, and Sheets access.
- A feature imports another feature's private files.
- The same business rule exists in multiple layers.
- A change to one workflow requires editing many unrelated modules.
- A component or function has several unrelated reasons to change.
- A new status or field is expressed as untyped strings in several places.

When one occurs, split by responsibility and add a focused test before expanding the feature.

## Testing boundaries

- **Contracts:** serialization and compatibility tests.
- **Frontend units:** validation, formatting, hooks, and conditional UI.
- **Components:** accessible behavior and user interactions.
- **Services:** business rules, permissions, state transitions, and conflicts using fake repositories.
- **Repositories:** row mapping, batching, missing/duplicate IDs, and workbook-copy integration tests.
- **End to end:** representative Student, Lead, Mentor, direct-Sheet edit, stale save, retry, backup, and recovery flows.

Backend permission tests are required even when frontend controls are hidden.

## Undecided implementation details

These must be chosen during scaffolding and recorded before contributors rely on them:

- Node.js and package-manager versions;
- test runner and React testing libraries;
- formatter, linter, and TypeScript strictness settings;
- Apps Script bundling and deployment tooling;
- local mock approach for `google.script.run`;
- continuous-integration checks and branch protection.

Choosing these tools must not change the architecture or data ownership decisions.
