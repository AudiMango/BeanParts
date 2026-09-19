# BeanParts — Spreadsheet-First Rules

Status: Requirements and proposed safeguards, not an implemented system.

## Non-negotiable storage rule

All durable BeanParts business/workflow data must live in the approved Google Sheets workbook system: one BOM workbook per project, one central ordering workbook, and one central Control workbook. This includes approved requests, BOM records, ordering/receiving records, history, settings, and supporting record identifiers introduced by BeanParts.

There will be no separate authoritative business database. Any performance cache must be disposable and rebuildable from the spreadsheets. Deleting the cache must not lose team records. A save is not complete merely because data reached a cache.

The user permits modest spreadsheet changes to accommodate BeanParts, provided manual use remains similar. Helper columns or tabs may be proposed within that constraint. Review the actual workbooks and document the exact changes before applying them to live files; this is not permission to redesign the workflow wholesale.

Passwords, access tokens, and API secrets must not be placed in Sheets or GitHub. Authentication and secret handling are security infrastructure, not a second business record system. The selected Apps Script approach must document its server-side secret handling before implementation. CAD geometry stays in Onshape; treatment of attachments and external file links remains an open requirement.

## Two ways to use the same information

- A spreadsheet user can continue adding and editing records directly.
- An app user works on those same records through BeanParts.
- Existing spreadsheet workflows do not require a BeanParts account.
- App access cannot silently give a person broader powers than the agreed team access rules.
- Direct sheet editors can bypass app validation. App-only restrictions cannot guarantee protection against direct sheet edits. Any required restrictions must also fit the sheet permission model.

## Apps Script data access

Google Apps Script is the backend/API responsible for Sheets access, business rules, validation, role checks, and concurrency protection where appropriate. Browser code must not contain privileged Google API credentials or write directly through a privileged Sheets identity.

Design Apps Script operations to stay efficient and within practical quotas:

- read and write ranges in batches instead of making per-cell calls;
- return only the fields needed by the current screen;
- filter and sort in the browser when the required data set is already loaded and small enough;
- use caching for derived/read-heavy data when useful, but treat it as disposable;
- invalidate or refresh cached results so direct Sheet edits become visible within the agreed freshness target;
- use stable record IDs, expected versions/timestamps, and Apps Script locking where appropriate;
- do not claim locking prevents a person from editing the Sheet at the same time.

Use an approximately 60-second mutable-data cache, up to five minutes for slow-changing reference data, and a normal 1–2 minute direct-edit freshness target. Use stable IDs, revision hashes, short locks, operation IDs, and field-by-field conflict resolution. Exact implementation still requires testing against representative copies and 1–5 simultaneous users.

## Rules to design and test

| Situation | Required behavior |
|---|---|
| App save succeeds | Confirm only after the underlying sheet write is verified |
| Direct sheet edit | App displays it after refresh within an agreed time target |
| Sheet rows are sorted or inserted | Records still match correctly; never depend solely on row number |
| App and sheet users change the same field | Do not knowingly overwrite a newer value; show the conflict for review |
| A retry follows an uncertain save | Check whether the first write succeeded before creating another request |
| Sheets or network unavailable | Show a clear failure or stale-data notice; do not claim an unsaved change succeeded |
| Formula cells exist | Preserve formulas and avoid replacing them with displayed values |
| Invalid manually entered data | Flag it without deleting the original entry or stopping all other work |
| Someone changes columns or tabs | Detect unexpected structure and pause affected writes rather than guessing |
| A sheet row is deleted | Do not silently recreate it from an old cache |
| An Onshape part disappears | Preview the BOM change; preserve related purchasing history |
| Import run repeats | Do not duplicate already imported parts |
| Only part of a multi-step operation succeeds | Show the partial result and provide a safe retry/recovery path |

Concurrency limits are a required feasibility check. An app cannot assume a lock will prevent a human from directly editing Sheets. The architecture must explain any remaining race conditions and get approval for the tradeoff before claiming conflict-safe writes.

## Identity and field mapping

Proposed: a stable ID identifies each record even after sorting or moving rows. Existing part numbers should be reused where appropriate, but a part number, request ID, and assembly occurrence are not necessarily the same thing.

Before development, document each existing column:
- Meaning and examples.
- Who edits it: a person, a formula, Onshape import, or the app.
- Whether blank values are allowed.
- How it relates to other records.
- What happens when two sources disagree.

For rows created directly in Sheets, define when and how a stable ID is assigned. Missing or duplicate IDs must be detected without corrupting unrelated rows.

Preserve the familiar manual workflow and existing formulas. The inspected-workbook field map and modest change proposal are documented in [Spreadsheet audit](SPREADSHEET-AUDIT.md). The ordering workbook keeps its familiar `Robot Parts`, `Invoices`, and `AD Order List` sheets and adds approved fields at the right. Central Projects, Members, Lists, settings, and recovery metadata belong in the Control workbook; project BOM records and BOM history belong in each project BOM workbook. It is not approval to modify live Sheets.

## Post-v1 Onshape import rules

Onshape import is deferred until the core v1 is stable. When it is added:

- Start with an explicitly selected assembly and manual import action.
- Preview changes before committing.
- Distinguish purchased parts, manufactured parts, and assemblies using agreed rules.
- Check nested assembly quantities, repeated components, configurations, and spare quantities.
- Record sufficient source references in Sheets to repeat the import without duplicates.
- Identify which CAD version/state an import reflects.
- Keep team-entered fields independent of CAD-controlled fields.
- Do not automatically create or approve purchases from every BOM shortage.

## History, backups, and recovery

History records submitted changes and conflict resolutions. Only unsubmitted drafts may be permanently deleted through BeanParts; submitted records are cancelled, rejected, voided, or archived.

Make daily backups of active BOM workbooks, the ordering workbook, and the Control workbook. Retain rolling daily copies for 30 days. Keep separately labeled pre-migration/pre-repair backups outside that cleanup window.

Do not promise that every direct sheet edit can be attributed to a named person until the available access and audit mechanisms are verified.

Before live use:
- Keep the legacy files archived read-only; back up every active BOM, ordering, and Control workbook and document restoration steps.
- Test on copies first.
- Verify the restricted shared-drive backup folder, 30-day cleanup, mentor restore access, and safety-copy process.
- Test restoring data and rebuilding any cache.
- Test recovery after partial writes and interrupted imports.
- Confirm that disabling BeanParts leaves the team's spreadsheet workflow usable.

## Minimum acceptance checks

1. Enter a request directly in Sheets; see the same request in BeanParts without duplication.
2. Enter a request in BeanParts; verify its durable record in the existing sheet.
3. Update a status using either route and verify the other route reflects it.
4. Sort rows and insert rows; verify app edits still target the correct records.
5. Simulate simultaneous changes and document actual conflict behavior and limitations.
6. Retry a timed-out save; verify it does not produce a duplicate.
7. Import the same assembly twice; verify stable quantities and no duplicate records.
8. Change CAD quantities; preview the differences and preserve manual notes.
9. Simulate service failure; verify no false success message.
10. Disable the app; complete the existing ordering workflow directly in Sheets.
11. Rebuild app views from Sheets alone without losing business information.
12. Verify unauthorized app actions are rejected and review direct-sheet permissions separately.

These checks are release criteria, not claims that implementation has passed.

## Role permissions and direct sheet use

See [Roles and permissions](ROLES.md). The same business rules should apply through the app and Sheets. During implementation planning, evaluate protection of mentor approval/invoice-confirmation cells and role-management settings while retaining normal student BOM editing and Lead/Mentor request handling. Hidden tabs are not an access-control mechanism. Document any gap between app permissions and what direct sheet editors can do before rollout.


## Inspected workbook note

The BOM workbook and order-template workbook were inspected on September 17, 2026. See [Spreadsheet audit](SPREADSHEET-AUDIT.md). The completed 2025 order sheet and live Google Sheets remain to be checked. Google-only formulas cannot be judged solely from an XLSX export; apparent broken references must be confirmed in the live sheet.
