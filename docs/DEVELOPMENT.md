# BeanParts — Development and Handoff

Status: Planning only.

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
- Keep commits focused with understandable descriptions.
- Test before merging.
- Record important decisions and changes to scope.
- Tag tested releases with version numbers and plain-language release notes.
- Never commit credentials or real private team records.
- Preserve existing work; do not import the Claude ZIP without reviewing it.

These initial planning files may be committed directly as a documentation-only baseline. No branch protection, automated tests, deployments, or service integrations are claimed to be configured.

## Proposed development sequence

This is a draft, not a schedule or an approval to build:

1. Verify spreadsheet and Onshape access using approved test data.
2. Build a phone-friendly interface prototype with fake data.
3. Connect read-only views to spreadsheet copies.
4. Add safe request entry and updates to those copies.
5. Add the agreed approval/ordering/receiving steps.
6. Add reviewed Onshape imports into the test BOM sheet.
7. Run acceptance tests, recovery tests, and team usability tests.
8. Obtain approval for a limited live pilot.
9. Release after issues found in the pilot are resolved.

If Onshape access is uncertain, check it early during architecture with a specifically approved feasibility test. Do not build a large app around an unverified integration.

Full inventory and other optional features need a separate scope decision.

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
- Verify the team owns hosting, Google/Onshape authorizations, domains, and billing where applicable.
- Rotate or reauthorize credentials when appropriate.
- Test access and integrations after transfer.
- Give the team a maintenance and recovery guide.

Repository ownership alone does not transfer all external service accounts. No transfer is performed by this plan.
