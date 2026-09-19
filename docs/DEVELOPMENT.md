# BeanParts — Development and Handoff

Status: Planning only. The application architecture is selected; implementation details listed in [ARCHITECTURE.md](ARCHITECTURE.md) remain to be validated.

## Architecture constraints for development

- Build a responsive browser application, not a local Windows-only program.
- Use Google Apps Script as the backend/API and Google Sheets as the authoritative data store.
- Serve the React + TypeScript + Vite frontend bundle through Apps Script HTML Service for v1; wrap `google.script.run` behind a typed adapter.
- Keep the frontend/backend boundary clear enough that only the frontend can move later if Apps Script hosting creates a demonstrated limitation.
- Keep privileged Google access and role enforcement in the backend. Never put privileged API credentials in browser code.
- Optimize Sheets access with batch reads/writes, client-side filtering/sorting where practical, and safe caching that can be rebuilt from Sheets.
- Treat Workspace identity and BeanParts authorization as separate concerns.
- Preserve one BOM workbook per project plus the central ordering and Control workbooks.
- Design for 1–5 simultaneous active users and a 1–2 minute direct-edit freshness target.

The previous Sites prototype → Vercel/Supabase production assumption is superseded. Vercel is only a possible future frontend host; Supabase, Firebase, and other databases are not part of the current architecture.


## Code organization and definition-first work

Implementation must follow the module and dependency boundaries in [Codebase structure](CODEBASE-STRUCTURE.md) and the workflow in [Contributing](../CONTRIBUTING.md).

Before feature code begins, define the feature's behavior, permissions, shared types/statuses, API contract, Sheet fields, validation, conflict behavior, and acceptance checks. React components remain presentation/interaction code; Apps Script services enforce workflows; repositories and Sheets helpers handle data access.

Shared contracts are the single definition point for frontend/backend data exchange. Feature modules expose a small public interface, and code in another feature must not import their private internals.

The exact Node.js version, package manager, test tools, lint/format rules, Apps Script deployment tool, and local API mock remain scaffolding decisions. Record significant choices in [decision records](decisions/README.md) before the team depends on them.

## Simple working agreement

Adi/team decides how BeanParts should behave. The developer handles implementation details and explains only decisions that affect workflow, cost, access, reliability, or maintenance.

Before a milestone starts, state:
- What it will do.
- What it will not do.
- What requires a team decision.
- How we will demonstrate it works.

After a milestone, report what changed, what was tested, remaining limitations, and the next proposed step.

## Repository process

- Keep plans and source code here.
- Make future implementation changes on short-lived feature branches.
- Submit a pull request: a reviewable proposal to add those changes to the stable main branch.
- Follow [Collaboration](COLLABORATION.md): use a separate worktree per concurrent task, declare path ownership, and coordinate shared contracts and merge order.
- Keep commits focused with understandable descriptions.
- Test before merging.
- Record important decisions and changes to scope.
- End every modifying session with a report under `reports/` using `reports/_TEMPLATE.md`, and link it in the pull request.
- Tag tested releases with version numbers and plain-language release notes.
- Never commit credentials or real private team records.
- Preserve existing work; do not import the Claude ZIP without reviewing it.

Main is not currently protected by an enforced GitHub ruleset. AI code changes and concurrent work still use task branches and pull requests by repository convention. No automated tests, production deployments, or service integrations are claimed to be configured until verified.

## Proposed development sequence

This is a draft, not a schedule or an approval to build:

1. Create approved clean templates for the Control workbook, project BOM workbook, and central ordering workbook.
2. Validate Team Workspace identity, execute-as-user deployment, shared-drive ownership, and protected ranges.
3. Prototype the React + TypeScript interface with fake data and the typed `google.script.run` adapter.
4. Connect read-only batched views to workbook copies.
5. Add safe authorized writes with stable IDs, revision hashes, locks, idempotency, and field-level conflict resolution.
6. Add membership, project creation, BOM, normal requests, AutomationDirect requests, ordering, invoice, and receiving workflows.
7. Add daily backups, 30-day retention cleanup, restore testing, and partial-write recovery.
8. Run acceptance, concurrency, recovery, and usability tests on laptop and phone.
9. Obtain approval for a limited live pilot.
10. Release after pilot issues are resolved.

Onshape importing and notifications are post-v1 work. Do not make core v1 depend on either feature.

## Separation of test and live use

Use fake data and spreadsheet copies during development. Keep test credentials and production credentials separate. Live writes require an explicit pilot approval and a backup.

Code rollback and data rollback are different. Reverting code does not undo a sheet write. Every approved sheet structure change requires a documented migration and recovery plan.

## Release checklist

- Agreed requirements and spreadsheet acceptance checks pass.
- Desktop and phone workflows tested.
- Access controls and credential handling reviewed.
- Real sheet formulas and existing integrations preserved.
- Failure, conflict, retry, and partial-operation behavior tested.
- Backup restoration demonstrated.
- Plain-language user guide written.
- Known limitations and operating costs documented.
- A team owner can manage accounts and recover access.
- Team approves release.

## Future team ownership

When ownership transfers:
- Transfer the repository through the appropriate GitHub process.
- Review who can administer and contribute.
- Update repository links and integration settings as needed.
- Verify the team owns the Apps Script project, Google Sheets, Google/Onshape authorizations, any later frontend host or domain, and billing where applicable.
- Rotate or reauthorize credentials when appropriate.
- Test access and integrations after transfer.
- Give the team a maintenance and recovery guide.

Repository ownership alone does not transfer all external service accounts. No transfer is performed by this plan.
