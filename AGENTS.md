# BeanParts Agent Instructions

These instructions apply to every file in this repository. Human contributors and AI agents use the same architecture, branch, testing, documentation, and handoff rules.

## Project baseline

BeanParts is a responsive browser application for FRC Team BEAN 1833. It manages project BOMs, purchasing requests, vendor orders, AutomationDirect covered orders, invoices, deliveries, and related approvals.

The non-negotiable system boundaries are:

- Google Sheets workbooks are the authoritative, directly editable data store.
- Google Apps Script is the trusted backend/API and enforces authorization.
- The frontend is React + TypeScript + Vite and is served through Apps Script HTML Service for v1.
- Team Google Workspace establishes identity; BeanParts backend policies establish permissions.
- One project BOM workbook exists per project. Ordering and Control each use a separate central workbook.
- Onshape import and notifications are post-v1 work.
- Never put credentials, tokens, payment data, or private production records in the repository.

Do not replace these decisions with an older Next.js, Vercel, Supabase, Firebase, local-only, or separate-database design. A change to one of these boundaries requires an accepted decision record and updates to the canonical documentation.

## Required startup sequence

Before editing:

1. Inspect `git status`, the current branch, recent commits, and relevant remote branches or pull requests. Preserve existing and uncommitted work.
2. Read `README.md`, `docs/README.md`, `docs/ARCHITECTURE.md`, `docs/CODEBASE-STRUCTURE.md`, and `docs/COLLABORATION.md`.
3. Read the topic documents relevant to the task and the newest relevant files in `reports/`.
4. Confirm the task's branch, owner, path scope, dependencies, acceptance checks, and whether another contributor is changing the same contract or files.
5. If the task changes durable data behavior, define or update the shared contract, permissions, Sheet fields, validation, conflict behavior, and tests before implementing UI.

If documents disagree, use the authority order in `docs/README.md`. Do not silently choose one answer. Resolve the conflict in the same change or stop and identify the decision needed.

## Canonical repository paths

Use these paths; do not create competing top-level `frontend/`, `backend/`, or `src/` trees:

| Path | Responsibility |
|---|---|
| `apps/web/src/app/` | React application composition, routing, providers, and shell |
| `apps/web/src/features/<feature>/` | Feature-owned UI, hooks, pages, state, and tests |
| `apps/web/src/components/` | Reusable presentation components without workflow authority |
| `apps/web/src/lib/` | Frontend adapters and infrastructure, including the only `google.script.run` wrapper |
| `apps/script/src/api/` | Thin browser-callable Apps Script entry points |
| `apps/script/src/auth/` | Identity, membership, and permission policies |
| `apps/script/src/services/` | Business workflows and use cases |
| `apps/script/src/repositories/` | Domain-oriented batched data access |
| `apps/script/src/sheets/` | Range, header, row-mapping, and Sheets mechanics |
| `apps/script/src/validation/` | Authoritative server-side validation |
| `apps/script/src/concurrency/` | Locks, revisions, conflicts, idempotency, and recovery |
| `apps/script/src/config/` | Validated non-secret configuration |
| `packages/contracts/src/` | Shared frontend/backend API and domain contracts |
| `docs/` | Canonical product, architecture, workflow, and operating documentation |
| `docs/decisions/` | Architecture decision records |
| `reports/` | Required append-only session/change reports |
| `scripts/` | Repository automation, validation, build, and deployment helpers |

Some implementation directories are planned and may not exist yet. Create them only when the accepted scaffold or first owned module needs them. Update `docs/ARCHITECTURE.md` and `docs/CODEBASE-STRUCTURE.md` whenever the actual tree changes.

## Dependency and ownership rules

- React features call the typed frontend API adapter. They never read Sheets or call `google.script.run` directly.
- Apps Script API files are thin. Services own workflows and authorization orchestration.
- Repositories map domain operations to records. Sheets helpers own cell/range mechanics.
- Shared request, response, role, status, revision, conflict, and error shapes live in `packages/contracts/src/`.
- Backend authorization is mandatory even when a frontend control is hidden.
- Browser validation improves feedback; backend validation remains authoritative.
- Batch Sheet reads/writes. Do not introduce per-cell network loops.
- A feature exposes a deliberate public interface. Do not import another feature's private files.

See `docs/CODEBASE-STRUCTURE.md` for the full dependency rules.

## Parallel work rules

- Use one short-lived branch and, when work is concurrent, one separate Git worktree per task.
- Never have two agents write in the same worktree or own the same file set at the same time.
- Record task ownership and path scope in the issue or pull request before overlapping work begins.
- Split work at stable boundaries: contracts, backend service, frontend feature, tests, or documentation.
- The contract owner lands or publishes an agreed contract before dependent agents code against it.
- Do not reformat, rename, or clean unrelated files. Do not discard another contributor's changes.
- If an unexpected overlapping edit or contract change appears, stop, preserve both versions, and coordinate through the issue or pull request.
- Reconcile with the current target branch before handoff and rerun affected checks after conflict resolution.

The detailed protocol is in `docs/COLLABORATION.md`.

## Branch, commit, and pull-request rules

- Do not commit directly to `main`. Use names such as `feature/order-review`, `fix/stale-save`, or `docs/agent-workflow`.
- Keep a branch limited to one coherent change and keep commits reviewable.
- Use the pull-request template. Identify scope, affected contracts/Sheets, tests, risks, and the session report.
- Do not claim a check, deployment, rule, or integration is configured unless it was verified.
- Never test uncertain writes against production workbooks. Use fake data and approved workbook copies.

## Required report for every modifying session

Before handing off any repository change, create a report in `reports/` using `reports/_TEMPLATE.md`.

- Filename: `YYYY-MM-DD-HHMMZ-short-slug.md` using UTC.
- One report per modifying session/change set, including documentation-only work.
- Record the baseline commit, branch, scope, changed files, decisions, verification, current project status, unresolved items, and recommended next action.
- Link the report in the pull request.
- Reports describe what happened; they do not replace updates to canonical docs or decision records.
- Once merged, reports are append-only historical records. Correct a material error with a later report that links back.

Read `reports/README.md` for the full policy.

## Completion checklist

A change is not ready for handoff until:

- behavior and exclusions match the accepted scope;
- affected contracts and canonical docs are updated;
- authorization, validation, stale/conflict, retry, and direct-Sheet behavior are tested where relevant;
- available static, unit, integration, and UI checks pass, or each unavailable check is stated honestly;
- no credentials or production/private records are present;
- unrelated changes were not included;
- a session report exists and accurately reflects the final diff and verification;
- `git status` and the final diff were reviewed.

Do not guess missing business rules, production IDs, deployment settings, or account ownership. Record the open decision and ask for it when it blocks safe progress.
