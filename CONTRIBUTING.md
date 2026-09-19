# Contributing to BeanParts

BeanParts is intended to be maintained by changing student teams with occasional mentor and experienced-programmer support. Changes should therefore be small, documented, testable, and easy to reverse.

Read these first:

1. [Documentation map](docs/README.md)
2. [Architecture](docs/ARCHITECTURE.md)
3. [Codebase structure](docs/CODEBASE-STRUCTURE.md)
4. The product or workflow document related to your change

## Before starting a feature

Create a short feature definition in the issue or pull-request description:

- Problem being solved.
- Included behavior.
- Explicitly excluded behavior.
- Student, Lead, Mentor, and Admin permissions.
- Records and Sheet fields affected.
- Request/response and error behavior.
- Conflict, retry, history, and deletion behavior.
- Acceptance tests.
- Documentation that must change.

Do not begin by adding UI. Confirm the shared contract and backend rule first when the feature changes durable data.

## Branch and pull-request workflow

1. Start from the current stable branch.
2. Create a short-lived branch named by purpose, such as `feature/order-review`, `fix/stale-save`, or `docs/project-creation`.
3. Keep commits focused and describe why the change exists.
4. Open a pull request early enough for design feedback.
5. Keep the pull request limited to one coherent change.
6. Update tests and primary documentation in the same pull request.
7. Obtain review before merging.
8. Never test uncertain writes against production workbooks.

Large features should be divided into contracts, backend behavior, frontend behavior, and integration work when those pieces can be reviewed independently.

## Definition of ready

A feature is ready to implement when:

- its behavior and non-goals are clear;
- affected roles and protected actions are listed;
- authoritative workbook/sheet fields are identified;
- shared types/statuses and state transitions are defined;
- failure, conflict, and retry behavior are known;
- acceptance checks are written;
- unresolved questions that could change the design are settled.

## Definition of done

A change is complete when:

- behavior matches its accepted definition;
- backend authorization and validation are tested;
- Sheets operations are batched and do not rely on per-cell loops;
- direct-Sheet editing remains supported;
- stale-data, conflict, and retry paths are handled where applicable;
- no credentials or private production records were committed;
- desktop and phone behavior was checked when UI changed;
- tests and static checks pass;
- affected documentation is updated;
- the pull request explains remaining limitations and rollback/recovery needs.

## Modular coding rules

- Follow [Codebase structure](docs/CODEBASE-STRUCTURE.md).
- React components render UI and coordinate user interaction; they do not enforce security or access Sheets.
- Feature code uses the typed API adapter rather than calling `google.script.run` directly.
- Apps Script API entry points stay thin.
- Services own business workflows.
- Authorization policies own permission decisions.
- Repositories own domain record access.
- Sheets helpers own ranges, headers, and batching.
- Shared contracts are the single definition for frontend/backend data exchange.
- A module exports a deliberate public interface; avoid imports into another module's private folders.
- Prefer dependency injection or explicit parameters over hidden global state.
- Do not introduce a general utility until its responsibility and users are clear.

## React conventions

- Use TypeScript for application code.
- Prefer function components and focused custom hooks.
- Keep server data separate from temporary form/UI state.
- Represent loading, empty, stale, error, conflict, and success states explicitly.
- Make role restrictions understandable in the UI, but never rely on hidden controls as authorization.
- Build accessible controls with labels, keyboard operation, visible focus, and usable phone layouts.
- Avoid feature behavior inside generic shared components.
- Do not copy API types into component files.

## Backend conventions

Every mutating operation must:

1. identify the accessing Workspace user;
2. load active BeanParts membership;
3. authorize the requested action;
4. validate the request;
5. obtain the required short lock;
6. reread and check the current revision;
7. apply a batched write;
8. record history and the operation ID;
9. return a verified standard response;
10. release the lock in a finally-safe path.

Read operations still require authorization and must batch ranges.

## Naming

- React components and TypeScript types: `PascalCase`.
- Functions, variables, hooks, and fields: `camelCase`.
- Constants that are truly immutable and module-wide: `UPPER_SNAKE_CASE`.
- Hooks begin with `use`.
- IDs state what they identify: `projectId`, `requestId`, `invoiceId`.
- Boolean names read as true/false questions: `isActive`, `canApprove`, `hasConflict`.
- Avoid unexplained abbreviations except established terms such as BOM, AD, ID, and API.

Workbook and sheet names used for lookup must be defined once in backend configuration or a schema module, not repeated as string literals.

## Comments and documentation

Comments explain why, constraints, or non-obvious safety behavior. They should not restate the code.

Public contracts and exported workflow functions need a short description when their purpose, permissions, side effects, or failure modes are not obvious from their names and types.

A significant architecture change requires a decision record; see [Decision records](docs/decisions/README.md).

## Testing expectations

At minimum, test:

- allowed and denied role paths;
- valid and invalid input;
- normal and stale revisions;
- retry with the same operation ID;
- direct-Sheet edits;
- missing, duplicate, and malformed IDs;
- partial or failed cross-workbook operations;
- empty, loading, error, and conflict UI states.

Use fake data and workbook copies. Production records must not be fixtures.

## Current setup limitation

The repository documentation defines the intended structure, but the application scaffold and exact install/build/test commands are not yet finalized. Add verified commands here when scaffolding is accepted; do not publish guessed commands that future students cannot run.
