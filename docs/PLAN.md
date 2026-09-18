# BeanParts — Project Plan

Status: Draft for review. Planning only; application development is not authorized yet. The main architecture and v1 boundaries are confirmed in [Architecture](ARCHITECTURE.md); feasibility tests and exact template fields remain before production.

## Start here

BeanParts helps FRC Team 1833 manage ordering and the robot bill of materials (BOM: the list of parts needed for a robot or assembly). It should work from a computer or phone.

**The existing Google spreadsheets remain the source of truth. They contain the actual data, not exported copies of a separate app database. Team members can continue working directly in those spreadsheets without using BeanParts.**

BeanParts is another way to work with the same records. If BeanParts is unavailable, normal spreadsheet work must still be possible.

This replaces the earlier suggestion of a database-authoritative hybrid. That suggestion is not the approved direction.

## What is confirmed

- Name: BeanParts.
- Start with requirements, then architecture, then development.
- Explain decisions in plain language; the developer handles technical details.
- Support web and mobile use.
- Reduce manual work in ordering and transferring Onshape information into the Big Sheet of Stuff.
- Use one BOM workbook per project, one central ordering workbook based on the current order template, and one central Control workbook as the real record system.
- Preserve direct spreadsheet editing and existing users' workflows.
- Modest spreadsheet layout changes are allowed to support BeanParts, provided manual use stays similar.
- All students can view BOMs and order sheets and add BOM parts. Leads can request orders and perform checks. Leads review student requests, BOM entries, and deliveries. Only mentors give final purchase confirmation, mark vendor orders as placed, and confirm invoices.
- Keep source code and planning documents in this repository with version history.
- Repository ownership may transfer from AudiMango to the team later.
- Do not modify live spreadsheets or deploy an application during planning.
- Use a responsive browser application accessible from students' and mentors' personal laptops and phones.
- Use Google Apps Script for the backend/API.
- Use Team Google Workspace authentication/OAuth, deploy the web app to execute as the accessing user, and enforce BeanParts roles separately in backend authorization.
- Serve the React + TypeScript + Vite frontend from Google Apps Script HTML Service for v1. Do not assume Vercel, Supabase, Firebase, or another host/database is required.
- Keep privileged Google API credentials out of the browser.
- Design Sheets access around batch operations, client-side filtering/sorting, approximately 60-second mutable-data caching, stable IDs, revision checks, short locks, idempotency, and field-level conflict resolution.
- Keep the backend/data boundary separable so a later frontend-only move to a platform such as Vercel does not redesign the Sheets/Apps Script architecture.

## What is proposed, not yet confirmed

### First useful release

1. View and search project BOMs, normal requests, AutomationDirect requests, orders, deliveries, invoices, and budgets.
2. Submit and update allowed BOM entries and requests through BeanParts.
3. Follow the confirmed lead-review and mentor-approval workflow.
4. Read changes made directly in Sheets within a normal 1–2 minute target.
5. Show verified saves, Last refreshed, stale-data warnings, and field-by-field conflict resolution.
6. Let mentors create a clean project BOM workbook from a template.
7. Preserve the central ordering workbook's recognizable `Robot Parts`, `Invoices`, and `AD Order List` sheets with modest additions.
8. Support normal purchases that may link to a BOM, project-only purchases such as wire, and team stock/supplies with no BOM link.
9. Allow mentors to combine approved requests from several projects into one vendor order.
10. Work well in normal desktop and phone browsers.
11. Create daily workbook backups retained for 30 days.

Ordering means recording and organizing purchases. BeanParts will not place purchases or handle payments automatically.

### Later possibilities

These are not committed requirements:
- Full inventory counts, storage bins, and reservations.
- Manufacturing progress.
- Email, push, or scheduled notifications.
- Onshape BOM importing after the core v1 is stable.
- Vendor price or availability integrations.
- Barcode scanning.
- Offline editing.
- Separate App Store or Google Play applications.

The earlier discussion included some of these as if they were settled. They are optional until the team confirms the need.

## Example day-to-day use

### Ordering

An authorized user enters a request in the central ordering workbook or BeanParts. The request may link to a BOM entry, only to a project, or to team stock/supplies. Leads review allowed requests; mentors give final purchase approval, mark orders as placed, and manage invoices. Leads or mentors confirm delivery according to the agreed workflow.

AutomationDirect requests stay on their separate covered-order sheet, require mentor approval, do not use invoices, and do not count against Team Spending.

### BOM updates

For v1, users add and maintain BOM records manually in BeanParts or directly in each project's BOM workbook. Onshape importing is deferred until the core v1 is stable.

A later Onshape importer will preview additions, removals, and quantity changes before a user accepts them. It must preserve team-entered fields and cannot automatically erase purchasing history.

## Work stages and approval points

| Stage | What the developer produces | What Adi/team approves |
|---|---|---|
| 1. Requirements | Current workflow, sheet field map, required features, success checks | That the plan matches how the team works |
| 2. Architecture (direction selected) | Validate deployment, identity, permissions, data rules, quotas, costs, and recovery approach | Remaining costs, access, and any sheet structure changes |
| 3. Prototype | Screens using fake data | Whether the app is understandable and useful |
| 4. Development | Small working features tested on copies | Permission to start development, then feedback on each milestone |
| 5. Pilot | A limited test with team members and backed-up data | Permission for a controlled live test |
| 6. Release | Tested app, user guide, maintenance and recovery instructions | Permission for wider team use |

No stage approval implies permission to spend money, change live sheet layouts, or deploy to production.

## What we need from the team

### Needed next

1. The BOM workbook and order-sheet template were inspected. See [Spreadsheet audit](SPREADSHEET-AUDIT.md). The completed 2025 order sheet is still needed later to verify the template against a full season of actual use.
2. Basic roles received; see [Roles and permissions](ROLES.md). Lead review of requests/BOM entries/deliveries and mentor-only purchase confirmation/order placement are confirmed. The proposed spreadsheet fields for recording those steps are in the audit.
3. Modest spreadsheet changes are acceptable in principle. The audit proposes adding fields at the right side of familiar tabs plus a small set of helper tabs. Nothing has been changed in a live spreadsheet.

### Needed before implementation begins

- One representative Onshape assembly and an explanation of how it is currently copied into the BOM. A sanitized example or screenshots are sufficient to start discussion.
- Required Onshape properties, part-number conventions, configurations, revision practices, and quantities/spares rules.
- Rough number of users, record counts, and busiest expected period.
- Must-have first-release features versus optional inventory/manufacturing features.
- Acceptable wait for a direct spreadsheet edit to appear in the app.
- Google account/sharing arrangements, including any school restrictions.
- Budget ceiling, including whether ongoing paid services are acceptable.
- Adult/team account owner for long-term service ownership and any billing.
- Existing scripts, add-ons, formulas, or integrations that must be preserved.

Do not send passwords, API secrets, payment information, or unnecessary personal data. Access setup will happen separately when needed.

## Current limitations and source status

The initial documents are based on the user's instructions in this conversation. The uploaded BeanParts-HANDOFF.md, Pasted markdown.md, and BeanParts-step-1.0.zip have not been inspected with the currently available tools. No claims are made about their contents, quality, or completion.

The two currently available spreadsheet files have been inspected. The completed 2025 order sheet and the live Google Sheets still need verification, especially Google-specific formulas and several apparent #REF! references. The Onshape setup has not yet been inspected. Apps Script and Sheets are the selected backend/data direction, but account identity behavior, quotas, deployment mode, performance, exact costs, concurrency behavior, and the feasibility of preserving every existing workflow still require validation before promising delivery dates.

Existing Claude code is reference material, not an approved implementation. Review it once accessible and reuse only pieces consistent with the approved requirements.

## Related documents

- [Architecture](ARCHITECTURE.md)
- [Project organization](PROJECTS.md)

- [Roles and permissions](ROLES.md)
- [Spreadsheet audit](SPREADSHEET-AUDIT.md)
- [Spreadsheet rules and acceptance checks](SPREADSHEET-RULES.md)
- [Development and handoff process](DEVELOPMENT.md)
