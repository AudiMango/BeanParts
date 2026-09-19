# BeanParts — Architecture

Status: Current architecture decision. Last updated September 19, 2026.

This document is the canonical summary of BeanParts system architecture. Product requirements and workflow details remain in the other planning documents.

## Terminology

- **Workbook** means an entire Google Sheets file.
- **Sheet** means one tab inside a workbook.

For example, the ordering workbook contains the `Robot Parts`, `Invoices`, and `AD Order List` sheets.

## 1. Current architecture decisions

| Area | Decision |
|---|---|
| Client | Responsive browser application for Team BEAN laptops and phones |
| Frontend | React + TypeScript + Vite single-page application |
| Frontend hosting | Static frontend bundle served by Google Apps Script HTML Service |
| Client/backend boundary | Typed wrapper around asynchronous `google.script.run` calls |
| Backend/API | Google Apps Script |
| Authentication | Team Google Workspace account authentication/OAuth |
| Deployment identity | Web app executes as the user accessing it |
| Authorization | BeanParts roles enforced by the Apps Script backend |
| Ownership | Team BEAN Google Workspace/shared drive |
| Data store | Google Sheets workbooks |
| Source of truth | The underlying workbooks, including direct/manual edits |
| Expected peak activity | 1–5 simultaneous active users |
| Direct Sheet access | All approved BeanParts users may edit the shared workbooks, subject to protected ranges |
| PWA/custom domain | Not required for v1 |
| Notifications | None in v1 |
| Onshape import | Deferred until the core v1 is stable |

The previous Sites prototype → Vercel/Supabase production assumption is superseded. Vercel, Supabase, Firebase, and a separate application database are not required by the current design.

## 2. Workbook topology

BeanParts uses three workbook types.

### BeanParts Control workbook

One central workbook stores:

- project directory and BOM workbook IDs;
- Members and role assignments;
- shared lists and status values;
- application settings;
- cross-workbook operation and recovery information.

Only mentors manage membership and roles. Technical Admin permission does not grant Mentor purchasing or access-management authority.

### Project BOM workbooks

Each project has one BOM workbook created by a mentor through BeanParts from an approved template. Apps Script:

1. copies the template;
2. assigns a stable project ID;
3. names and moves the workbook into the correct shared-drive folder;
4. applies sharing and protected ranges;
5. registers the workbook in BeanParts Control;
6. checks for an existing result before retrying an uncertain creation.

A project BOM workbook remains directly usable without BeanParts.

### Central ordering workbook

One team-wide ordering workbook remains separate from all BOM workbooks. It preserves the recognizable structure of the current template, including these sheets:

- `Robot Parts`;
- `Invoices`;
- `AD Order List`.

The current visible columns, budget summary, formulas, gray request-entry area, and yellow purchaser area should remain recognizable. BeanParts may add a small number of visible workflow columns at the right and hide technical ID/version columns farther right.

A normal request may link to:

- a project and BOM entry;
- a project without a BOM entry, such as wire or project consumables;
- no project/BOM entry, such as team stock, tools, or general supplies.

Mentors create a vendor order by selecting the specific approved request lines and quantities being purchased; choosing a vendor must not automatically include every approved line from that vendor. A vendor order may combine selected requests from one or several projects.

Students do not access the Requests section or request queues. They may view BOMs and the order, delivery, invoice, and budget information permitted to their role. Only mentors can give final purchase approval, mark orders as placed, connect or edit invoices, and confirm invoices.

## 3. AutomationDirect workflow

The `AD Order List` is a separate covered-order workflow inside the central ordering workbook.

- AutomationDirect items do not count against the team purchasing budget.
- No invoice is required.
- `Cost per × Quantity` remains useful for tracking covered retail value.
- The app reports Team Spending and AD Covered Value separately.
- An AD request may optionally link to a project, subsystem, or BOM entry.
- AD requests still require lead review and mentor approval before submission.
- Only a mentor records an AD order as placed.
- Leads or mentors may confirm delivery/organization according to the normal delivery rules.

## 4. System boundaries

The browser provides the interface. It may validate input for quick feedback, filter and sort loaded data, and cache temporary view state. It is not trusted to authorize protected actions and must not contain privileged Google API credentials.

Google Apps Script is the trusted application boundary. It is responsible for:

- identifying the signed-in Workspace account;
- requiring both the Team Workspace domain and an active Members entry;
- mapping identity to Student, Lead, Mentor, and optional Admin responsibilities;
- validating requests and applying business rules;
- reading and writing the correct workbooks;
- enforcing protected actions even if a client is modified;
- reporting verified success, conflicts, partial failure, or stale data;
- keeping cross-workbook writes idempotent and recoverable.

Google Sheets workbooks store the durable business records. Manual changes appear in BeanParts after refresh; verified BeanParts writes appear in the same workbooks.

Authentication and authorization are separate:

1. Google establishes who the Workspace account is.
2. BeanParts checks that the account is active in Members and loads its responsibilities.
3. Apps Script authorizes each operation again before accessing Sheets.


### Implementation boundary

The codebase follows the modular dependency rules in [Codebase structure](CODEBASE-STRUCTURE.md):

- React features call one typed API adapter and never access Sheets or `google.script.run` directly.
- Thin Apps Script API entry points call services.
- Services own business workflows and coordinate authorization, validation, concurrency, history, and repositories.
- Repositories provide domain-oriented batched access; lower-level Sheets helpers own ranges and row mapping.
- Shared contracts define frontend/backend request, response, role, status, revision, conflict, and error shapes.
- Lower layers do not import UI or higher workflow layers.

This organization is a current development constraint. Exact build, test, formatting, and deployment tools remain implementation decisions.

## 5. Repository architecture and exact paths

The repository uses one canonical location for each responsibility. Contributors must not create alternate root-level `frontend/`, `backend/`, or `src/` implementations.

### Actual repository baseline

At the current planning baseline, the repository contains documentation, the approved logo asset, collaboration controls, and reports. The production application scaffold is not yet present.

```text
BeanParts/
├── .github/
│   └── pull_request_template.md
├── .openai/
│   └── hosting.json
├── AGENTS.md
├── CLAUDE.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── assets/
│   └── brand/
│       └── bean-logo-primary.png
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CODEBASE-STRUCTURE.md
│   ├── COLLABORATION.md
│   ├── DEVELOPMENT.md
│   ├── PLAN.md
│   ├── PROJECTS.md
│   ├── README.md
│   ├── ROLES.md
│   ├── SPREADSHEET-AUDIT.md
│   ├── SPREADSHEET-RULES.md
│   ├── UI-DIRECTION.md
│   ├── UI-REFERENCE-STUDY.md
│   └── decisions/
│       └── README.md
├── dist/
│   ├── app.js
│   ├── bean-logo-primary.png
│   ├── index.html
│   └── styles.css
└── reports/
    ├── README.md
    ├── _TEMPLATE.md
    └── <dated session reports>.md
```

The `dist/` files are a hand-written static fake-data prototype (plain HTML, CSS, and JavaScript with no build step) used for supervised UI review. Open `dist/index.html` directly in a browser. They implement the screen plan in [UI direction](UI-DIRECTION.md) using the visual guidance in [UI reference study](UI-REFERENCE-STUDY.md). They are not the accepted production source-code layout, do not prove a production build exists, and must not become the architecture by accident. `.openai/hosting.json` configures that prototype preview only.

### Required implementation paths

Implementation adds these exact roots as the relevant scaffold or module is approved:

```text
apps/web/                    React + TypeScript + Vite frontend
apps/web/src/app/            application composition and routing
apps/web/src/features/       feature-owned frontend modules
apps/web/src/components/     reusable presentation components
apps/web/src/lib/            typed API adapter and frontend infrastructure
apps/script/                 Google Apps Script backend project
apps/script/src/api/         thin browser-callable entry points
apps/script/src/auth/        identity, membership, and permission policies
apps/script/src/services/    business workflows
apps/script/src/repositories/ domain-oriented workbook access
apps/script/src/sheets/      ranges, headers, row mapping, and batching
apps/script/src/validation/  authoritative validation
apps/script/src/concurrency/ locks, revisions, conflicts, and idempotency
apps/script/src/config/      validated non-secret configuration
packages/contracts/src/      shared frontend/backend contracts
scripts/                     repository build, validation, and deployment helpers
```

Detailed feature folder rules and dependency direction are canonical in [Codebase structure](CODEBASE-STRUCTURE.md). Parallel ownership and handoff rules are canonical in [Collaboration](COLLABORATION.md). Any pull request that adds, removes, or moves an architectural path must update both the actual tree above and the codebase-structure document.

## 6. Membership and permissions

Members uses separate role flags because responsibilities may overlap:

`email · display_name · student · lead · mentor · admin · active · added_by · added_at · updated_at`

- Mentors add users, deactivate users, and grant or remove roles.
- At least two mentors retain recovery access.
- Students and leads may view operational invoice/budget data but cannot edit invoice records.
- Admin is a technical-maintenance responsibility. It does not independently grant Mentor access management, purchasing, or invoice authority.
- Protected ranges must enforce sensitive direct-Sheet edits as closely as Google Sheets permits.
- Backend permission checks remain mandatory even when the UI hides or disables a control.

## 7. Multi-user, freshness, and conflict rules

BeanParts targets 1–5 active simultaneous users.

- Load each screen with batched range reads rather than per-cell calls.
- Save all changed fields for one operation in a batch.
- Filter and sort already-loaded data in the browser.
- Do not make backend calls on every keystroke.
- Refresh mutable screens about every 60 seconds while open.
- Refresh on initial load and when the app returns to the foreground.
- Show Last refreshed and a manual Refresh action.
- Keep mutable-data caches at approximately 60 seconds maximum.
- Cache slow-changing reference data for up to five minutes.
- Invalidate affected cache entries after successful writes.
- Target direct Sheet changes becoming visible within 1–2 minutes.

Each record uses a stable UUID plus revision information. For a save:

1. the client sends the version/hash it originally read;
2. Apps Script obtains a short lock and rereads the current record;
3. if the record changed, BeanParts stops the save;
4. the user sees their value beside the current Sheet value and chooses field by field;
5. non-conflicting fields may merge automatically;
6. the backend rechecks authorization and commits the resolved version;
7. History records the resolution.

A user can never select a value they lack permission to write. Locks protect BeanParts transactions but cannot prevent a person from editing a workbook directly during the operation; revision checks remain required.

Mutation requests include idempotency/operation IDs. Retrying an uncertain save checks whether the earlier operation already completed before creating another record.

## 8. API and error model

Each backend operation returns a consistent result:

- success flag and requested data;
- request/operation ID;
- safe error type and message on failure;
- whether retry is safe;
- current record/version when a conflict occurred.

Ordinary goals are useful initial content within about two seconds and verified saves within about three seconds under normal conditions. If an operation exceeds roughly eight seconds, the UI shows a delayed state instead of appearing frozen.

## 9. Record lifecycle and history

- Only unsubmitted drafts may be permanently deleted through BeanParts.
- A student may delete their own draft; leads and mentors may delete drafts they are allowed to manage.
- Submitted records are cancelled, rejected, voided, or archived instead of deleted.
- Orders and invoices are never permanently deleted through BeanParts after creation.
- Direct deletion of a historical row is detected and flagged rather than silently recreated.
- History records important actions, before/after values where appropriate, the acting user, time, and operation ID.

## 10. Backups and migration

- Make daily backup copies of every active BOM workbook, the Control workbook, and the ordering workbook.
- Retain rolling daily backups for 30 days.
- Store backups in a restricted shared-drive folder.
- Create separately retained labeled backups before schema changes, bulk imports, or repairs.
- Before restoration, create a safety copy of the current workbook.
- Mentors initiate restoration.
- Google Sheets version history remains an additional recovery layer.

The existing legacy BOM and order sheets are archived read-only. BeanParts v1 starts with clean approved templates rather than automatically importing uncertain historical rows.

## 11. v1 scope boundaries

v1 includes core project/BOM, request, review, ordering, invoice, delivery, permission, synchronization, conflict, and recovery workflows.

v1 does not include:

- Onshape import;
- email, push, or scheduled notifications;
- offline editing or an installable PWA requirement;
- a custom domain requirement;
- a separate app database;
- App Store or Google Play applications.

Onshape importing begins only after the core v1 is stable. Its first release must preview changes and require human confirmation before writing to a BOM workbook.

## 12. Possible future migration paths

If Apps Script frontend hosting creates a demonstrated limitation—such as frontend tooling, performance, PWA support, custom domains, or maintainability—the React frontend may move to a platform such as Vercel.

A frontend move must preserve this boundary:

- Google Apps Script remains the backend/API unless a separate architecture decision replaces it.
- Google Sheets workbooks remain authoritative and directly editable.
- Backend role checks and business rules remain server-side.
- The frontend communicates through a documented backend adapter/contract.

A separate database requires explicit approval and a migration plan. It must not silently replace Sheets as the source of truth.

## 13. Validation before production

1. Test Workspace sign-in and identity with representative student, lead, mentor, and admin accounts.
2. Test the Apps Script deployment on phone and laptop.
3. Verify the Team shared-drive ownership and at least two mentor recovery paths.
4. Measure batched read/write performance using representative workbook copies.
5. Test backend role rejection independently of hidden UI controls.
6. Test protected ranges for direct workbook users.
7. Test simultaneous app writes, a direct Sheet edit during a save, field-by-field conflict resolution, idempotent retries, and partial cross-workbook failure.
8. Test project creation retry behavior.
9. Test daily backup creation, 30-day cleanup, and restoration.
10. Confirm the current workbook formulas and layouts survive the approved modest schema additions.
