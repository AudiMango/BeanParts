# BeanParts — Human and AI Collaboration

Status: Current repository workflow. Last updated September 19, 2026.

This process lets students, mentors, developers, and AI agents work in parallel without relying on private chat context or overwriting each other's work.

## 1. The coordination unit

Every change uses four linked items:

1. **Issue or task description** — intent, owner, scope, dependencies, and acceptance checks.
2. **Branch and worktree** — isolated files for one coherent change.
3. **Pull request** — review, discussion, checks, and merge record.
4. **Session report** — factual handoff and project-status snapshot stored in `reports/`.

Chat messages can help contributors work, but they are not project records. Any decision needed later must be placed in the appropriate issue, canonical document, decision record, code contract, or report.

## 2. Task definition

Before implementation, record:

- task owner and reviewers;
- problem and user-visible outcome;
- included and excluded behavior;
- exact path ownership;
- other active tasks that touch the same feature or contract;
- Student, Lead, Mentor, and Admin permissions;
- affected workbook, sheet, records, IDs, and fields;
- API/contracts that will be added or changed;
- failure, stale-data, conflict, retry, history, and recovery behavior;
- acceptance checks and documentation updates;
- dependencies and intended merge order.

If these details are unknown and would materially change the design, the task is not ready for implementation.

## 3. Branch and worktree isolation

Use a short-lived branch per task:

- `feature/<purpose>` for product behavior;
- `fix/<purpose>` for corrections;
- `docs/<purpose>` for documentation;
- `refactor/<purpose>` for behavior-preserving structure changes;
- `chore/<purpose>` for tooling or maintenance.

When contributors work concurrently, each branch uses a separate Git worktree. One contributor owns one worktree at a time. Sharing a filesystem directory between agents is not an acceptable coordination mechanism.

Before editing, each contributor checks:

```text
git status
git branch --show-current
git log --oneline -5
```

Never discard, reset, or rewrite work that may belong to someone else. Unexpected changes are a coordination signal, not cleanup material.

## 4. Path ownership

A task declares the paths it expects to change. Ownership lasts until the task is merged, closed, or explicitly handed off.

Prefer non-overlapping scopes such as:

| Workstream | Typical owned paths |
|---|---|
| Shared contract | `packages/contracts/src/`, related contract tests and API docs |
| Backend workflow | One service plus related policy, repository, validation, and tests |
| Frontend workflow | One folder under `apps/web/src/features/` plus focused component tests |
| Sheets mechanics | Focused modules under `apps/script/src/sheets/` or `repositories/` |
| Documentation | Named canonical documents and one new report |

Files that often have many consumers—shared contracts, central configuration, navigation, package manifests, lockfiles, and canonical docs—need an explicit owner during parallel work. Dependent branches should avoid making independent versions of the same shared change.

## 5. Contract-first merge order

Parallel feature work should be divided along an agreed interface:

1. Define the durable record and frontend/backend contract.
2. Review roles, validation, state transitions, errors, revision/conflict behavior, and Sheet ownership.
3. Land the contract or publish the exact approved branch/commit that dependent work uses.
4. Implement backend and frontend against that contract in separate tasks when useful.
5. Integrate and run end-to-end checks only after both sides agree on the same contract version.

Dependent agents must not invent missing fields or statuses independently. A contract change after dependent work starts is announced in the issue or pull request and reflected in all affected branches.

## 6. Documentation ownership

Each subject has one primary document listed in `docs/README.md`. Update that source instead of creating a second competing explanation.

- Architecture changes update `docs/ARCHITECTURE.md` and usually an ADR in `docs/decisions/`.
- Physical path/module changes update `docs/CODEBASE-STRUCTURE.md` and the repository tree in `docs/ARCHITECTURE.md`.
- Permission changes update `docs/ROLES.md` and related contract/tests.
- Workbook behavior changes update `docs/SPREADSHEET-RULES.md`, schema documentation, and relevant audit notes.
- Scope/sequence changes update `docs/PLAN.md`.
- Every modifying session adds a report under `reports/`.

A report cannot approve or redefine architecture by itself.

## 7. Handoff between contributors

Before handing a task to another person or agent:

1. Leave the worktree in a reviewable state.
2. Commit coherent finished work or clearly identify intentional uncommitted work.
3. Update tests and canonical docs affected by the change.
4. Create the required session report from `reports/_TEMPLATE.md`.
5. State the exact branch and commit, what is complete, what remains, checks run, known failures, and the next safe action.
6. Link the issue, pull request, report, and any dependent branch.

The receiving contributor repeats the startup checks and verifies the reported state instead of assuming it is still current.

## 8. Handling overlap and conflicts

If two changes overlap:

1. Stop edits to the shared file or contract.
2. Identify the accepted source and the owners of both tasks.
3. Decide merge order and which branch owns the combined resolution.
4. Preserve both intents; do not choose by whichever version is newest locally.
5. Rerun all checks affected by the resolution.
6. Record the resolution in both pull requests and in the resolving session report.

For architecture or product-rule conflicts, use the authority order in `docs/README.md`. If no current document resolves the conflict, create a proposed decision instead of encoding a guess in code.

## 9. Pull-request readiness

A pull request must include:

- a concise outcome and non-goals;
- paths and systems affected;
- contract, permission, and workbook effects;
- verification performed and results;
- screenshots or recordings for meaningful UI changes;
- migration, rollback, and data-recovery notes where applicable;
- known limitations and follow-up tasks;
- a link to the session report.

Use `.github/pull_request_template.md`. A branch is not complete merely because its code compiles.

## 10. Main branch protection

All normal changes reach `main` through pull requests. The reviewable intended ruleset is stored in `.github/rulesets/main-protection.json`; GitHub does not apply that file automatically. Its README explains how to import and later update it.

Once reliable continuous-integration checks exist, make them required in the GitHub ruleset. Once a second regular reviewer is available, require at least one approval.
