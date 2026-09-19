# BeanParts working agreement for AI agents

These instructions apply to every file in this repository and to every AI coding agent, regardless of tool or account. Read this file before doing anything else. Tool-specific files such as `CLAUDE.md` must point here instead of duplicating the rules.

## Who you are working with

The people who own and direct BeanParts are an FRC robotics team—students, student leads, and mentors—not a software team. They know what the app needs to do and how Team BEAN works. They are not expected to choose implementation details.

AI agents act as developers and architects. Decide ordinary technical details, explain important choices plainly, and leave product behavior, access, cost, scope, and risky or irreversible decisions to the owners.

## How to communicate

- Default to plain language and lead with the outcome.
- Explain a technical term the first time it matters. Give full technical depth when asked.
- Keep routine updates short and state what a change means for the team's workflow.
- Report honestly. Never describe planned, failed, partial, or untested work as complete.
- Clearly identify any step that requires a person's account access, approval, or settings change.
- When a blocking owner decision is required, give one clear recommendation and the reason.

## Decisions: agent versus owner

Agents normally decide and document:

- code organization, naming, and modular boundaries within the accepted architecture;
- libraries, tooling, validation, and testing details that do not change cost or scope;
- safe implementation details for data access, error handling, and maintenance;
- how to demonstrate that a change works.

Ask the owner before changing:

- what the app does or how the team uses it;
- who may view or perform an action;
- costs, external accounts, real team data, or production access;
- an accepted architecture or project scope;
- anything hard to undo or carrying material data-loss risk.

## Project baseline

BeanParts is a responsive browser application for FRC Team BEAN 1833. It manages project BOMs, purchasing requests, vendor orders, AutomationDirect covered orders, invoices, deliveries, and related approvals.

The non-negotiable current boundaries are:

- Google Sheets workbooks are the authoritative, directly editable data store.
- Google Apps Script is the trusted backend/API and enforces authorization.
- The production frontend is planned as React + TypeScript + Vite served through Apps Script HTML Service for v1.
- Team Google Workspace establishes identity; BeanParts backend policies establish permissions.
- One project BOM workbook exists per project. Ordering and Control each use a separate central workbook.
- Onshape import and notifications are post-v1 work.
- Never put credentials, tokens, payment data, or private production records in the repository.

Do not revive an older Next.js, Vercel, Supabase, Firebase, local-only, or separate-database design. Changing a boundary requires an accepted decision record and updates to the canonical docs.

The current `dist/` directory is a merged fake-data UI prototype for review. It is not the accepted production source structure or proof that the production app is implemented or deployed.

## Required startup sequence

Before editing:

1. Inspect `git status`, the current branch, recent commits, and relevant remote branches or pull requests. Preserve uncommitted and concurrent work.
2. Read `README.md`, `docs/README.md`, `docs/ARCHITECTURE.md`, `docs/CODEBASE-STRUCTURE.md`, and `docs/COLLABORATION.md`.
3. Read the topic documents relevant to the task and the newest relevant files in `reports/`.
4. Confirm the task owner, branch/worktree, path scope, dependencies, acceptance checks, and overlapping work.
5. For durable data behavior, define or update the shared contract, permissions, Sheet fields, validation, conflict behavior, and tests before implementing UI.

If documents disagree, follow the authority order in `docs/README.md`. Do not silently choose one answer. Resolve the conflict in the same change or state the owner decision needed.

## Canonical repository paths

Use these paths; do not create competing top-level `frontend/`, `backend/`, or `src/` trees:

| Path | Responsibility |
|---|---|
| `dist/` | Current generated fake-data prototype artifacts; not production source |
| `apps/web/src/app/` | Planned React application composition, routing, providers, and shell |
| `apps/web/src/features/<feature>/` | Planned feature-owned UI, hooks, pages, state, and tests |
| `apps/web/src/components/` | Planned reusable presentation components without workflow authority |
| `apps/web/src/lib/` | Planned frontend adapter/infrastructure, including the only `google.script.run` wrapper |
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

Some production directories are planned and do not exist yet. Create them only with the accepted scaffold or first owned module. Update `docs/ARCHITECTURE.md` and `docs/CODEBASE-STRUCTURE.md` whenever the actual tree changes.

## Dependency and ownership rules

- React features call the typed frontend API adapter. They never read Sheets or call `google.script.run` directly.
- Apps Script API files stay thin. Services own workflows and authorization orchestration.
- Repositories map domain operations to records. Sheets helpers own cell/range mechanics.
- Shared request, response, role, status, revision, conflict, and error shapes live in `packages/contracts/src/`.
- Backend authorization is mandatory even when a frontend control is hidden.
- Browser validation improves feedback; backend validation is authoritative.
- Batch Sheet reads/writes. Do not introduce per-cell network loops.
- Features expose deliberate public interfaces. Do not import another feature's private files.

See `docs/CODEBASE-STRUCTURE.md` for the full dependency rules.

## Parallel work rules

- For code and concurrent work, use one short-lived branch and a separate Git worktree per task. GitHub does not currently enforce branch protection, so contributors must follow this convention themselves.
- Never have two agents write in the same worktree or own the same file set at the same time.
- Record task ownership and path scope in the issue or pull request before overlapping work begins.
- Split work at stable boundaries: contracts, backend service, frontend feature, tests, or docs.
- Land or publish an agreed contract before dependent agents code against it.
- Do not reformat, rename, or clean unrelated files. Do not discard another contributor's changes.
- If an unexpected overlapping edit or contract change appears, stop, preserve both intents, and coordinate merge order.
- Reconcile with the current target branch before handoff and rerun affected checks after conflict resolution.

The detailed protocol is in `docs/COLLABORATION.md`.

## Branch, commit, and pull-request rules

- AI code changes default to branches such as `feature/order-review`, `fix/stale-save`, or `docs/agent-workflow` and use a pull request for review/handoff.
- Keep a branch limited to one coherent change and commits reviewable.
- Use the pull-request template. Identify scope, affected contracts/Sheets, tests, risks, and the session report.
- Do not claim a check, deployment, rule, or integration is configured unless verified.
- Never test uncertain writes against production workbooks. Use fake data and approved workbook copies.

## Required report for every modifying session

Before handing off any repository change, create a report in `reports/` using `reports/_TEMPLATE.md`.

- Filename: `YYYY-MM-DD-HHMMZ-short-slug.md` using UTC.
- One report per modifying session/change set, including documentation-only work.
- Record the baseline commit, branch, scope, changed files, decisions, verification, current status, unresolved items, and next action.
- Link the report in the pull request when one exists.
- Reports describe history; they do not replace canonical docs or decision records.
- Once merged, reports are append-only. Correct a material error with a later linked report.

Read `reports/README.md` for the full policy.

## Completion checklist

A change is not ready for handoff until:

- behavior and exclusions match the accepted scope;
- affected contracts and canonical docs are updated;
- authorization, validation, stale/conflict, retry, and direct-Sheet behavior are tested where relevant;
- available checks pass, or unavailable checks are stated honestly;
- no credentials, private production records, or unrelated changes are included;
- a session report accurately reflects the final diff and verification;
- `git status` and the final diff were reviewed.

Do not guess missing business rules, production IDs, deployment settings, or account ownership. Record the open decision and ask when it blocks safe progress.
