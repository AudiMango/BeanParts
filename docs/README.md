# BeanParts Documentation Map

Start here when looking for project information. Each subject has one primary document so decisions do not drift across several files.

## Document structure

| Document | Purpose | Update when |
|---|---|---|
| [Architecture](ARCHITECTURE.md) | Current system-level decisions and boundaries | Hosting, data ownership, authentication, or major system boundaries change |
| [Codebase structure](CODEBASE-STRUCTURE.md) | Planned React and Apps Script folder structure, module boundaries, and dependency rules | A module is added, moved, split, or given a new responsibility |
| [Collaboration](COLLABORATION.md) | Parallel branch/worktree ownership, task boundaries, handoff, and conflict process | The team changes how concurrent work is coordinated |
| [Project plan](PLAN.md) | Product scope, milestones, and deferred work | Scope or delivery order changes |
| [Development and handoff](DEVELOPMENT.md) | Environment, release, ownership, and operational process | Build, testing, deployment, or handoff procedures change |
| [Roles and permissions](ROLES.md) | Student, Lead, Mentor, and Admin capabilities | A role or protected action changes |
| [Project organization](PROJECTS.md) | Projects, subsystems, and BOM organization | Project/BOM organization changes |
| [Spreadsheet audit](SPREADSHEET-AUDIT.md) | Existing workbook observations and proposed fields | A template or existing workbook is reviewed |
| [Spreadsheet rules](SPREADSHEET-RULES.md) | Data integrity, history, backup, and acceptance rules | Sheet behavior or validation changes |
| [UI direction](UI-DIRECTION.md) | Navigation, screens, responsive behavior, and role-based UI | User flows or interface patterns change |
| [UI reference study](UI-REFERENCE-STUDY.md) | Match13 and comparable UI research with proposed BeanParts adaptations | Reference research or proposed visual guidance changes |
| [Decision records](decisions/README.md) | Why significant technical decisions were made | A significant technical choice is accepted or replaced |
| [Contributing](../CONTRIBUTING.md) | How contributors plan, implement, test, review, and document changes | The team changes its engineering workflow |
| [Agent instructions](../AGENTS.md) | Mandatory repository-wide startup and completion rules for AI contributors | Agent workflow, boundaries, or required reads change |
| [Session reports](../reports/README.md) | Append-only session/change status and handoff records | Every repository-modifying session |

## Authority order

When documents appear to disagree, use this order:

1. A newer accepted decision record.
2. [Architecture](ARCHITECTURE.md) for system boundaries.
3. [Roles and permissions](ROLES.md) and [Spreadsheet rules](SPREADSHEET-RULES.md) for security and data behavior.
4. [Project plan](PLAN.md) for scope and sequencing.
5. Other design and audit notes.

`AGENTS.md` and `docs/COLLABORATION.md` govern how work is performed, but they do not override current product or architecture decisions. Session reports are historical evidence, not decision authority.

Do not silently choose between conflicting documents. Open a focused documentation change that resolves the conflict and links the affected documents.

## Status labels

Use one of these labels near the top of planning documents:

- **Current decision** — approved and binding until replaced.
- **Proposed** — ready for review but not approved.
- **Draft** — incomplete working material.
- **Historical** — retained for context and no longer current.

Every proposed implementation document must clearly separate confirmed decisions, undecided implementation details, and possible future work.

## Keeping documentation useful

- Update the primary document in the same pull request as the behavior it describes.
- Link to the primary document instead of copying long rules elsewhere.
- Include examples when a rule is easy to misunderstand.
- Remove or mark superseded text; do not leave two active answers.
- Use workbook for a Google Sheets file and sheet for a tab.
- Never place credentials, private team data, invoice documents, or payment details in repository documentation.
- Update the actual and planned path map in `ARCHITECTURE.md` and `CODEBASE-STRUCTURE.md` whenever repository structure changes.
- Add the required report under `reports/` before every modifying session is handed off.
