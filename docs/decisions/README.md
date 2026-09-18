# BeanParts Decision Records

Use a short architecture decision record (ADR) when a technical choice affects several modules, is difficult to reverse, changes security or data ownership, or replaces a current architecture decision.

The current system architecture is summarized in [Architecture](../ARCHITECTURE.md). Future decisions should link back to the affected section instead of copying the whole architecture document.

## File naming

Use:

```text
NNNN-short-decision-title.md
```

Examples:

- `0001-frontend-build-and-apps-script-deployment.md`
- `0002-testing-toolchain.md`
- `0003-workbook-schema-versioning.md`

Numbers are never reused, even if a decision is later superseded.

## ADR template

```markdown
# NNNN — Decision title

Status: Proposed | Accepted | Superseded
Date: YYYY-MM-DD
Owners: names or team roles
Supersedes: ADR number, if applicable

## Context

What problem or constraint requires a decision?

## Decision

What are we choosing?

## Boundaries

What does this decision not decide?

## Consequences

What becomes easier, harder, required, or restricted?

## Alternatives considered

What serious alternatives were evaluated and why were they not selected?

## Validation

How will we verify the decision works for BeanParts?

## Follow-up

What implementation or documentation work remains?
```

## Process

1. Open the ADR as Proposed before implementation when practical.
2. Ask reviewers to focus on the decision and consequences, not wording alone.
3. Mark it Accepted only after the authorized team members agree.
4. Update affected primary documents in the same pull request.
5. If the choice changes later, add a new ADR and mark the old one Superseded. Do not rewrite the old reasoning as if it never happened.

An ADR records an important choice. Routine refactors, dependency updates, and small UI adjustments usually need only a normal pull request explanation.
