# Project Documentation Setup

- **Date:** 2026-09-24
- **Agent:** Claude Code
- **Branch / PR:** `claude/exciting-bardeen-w07hyj` (no PR)
- **Task:** Direct request

## Summary

Turned the BeanPARTS project description into organized documentation, recorded the product decisions made so far, and added rules for how AI agents work on this project.

## What Changed

- **Removed leftover files** from an earlier, unrelated attempt that were sitting in the folder but were never saved to git.
- **Wrote the product description** and split it into readable pieces:
  - [README.md](../README.md): short front page with links to everything
  - [docs/OVERVIEW.md](../docs/OVERVIEW.md): what BeanPARTS is, its main principles, what's in and out of the first version
  - [docs/spec/](../docs/spec/): detailed rules, one file per area (BOM, Onshape, parts, manufacturing, ordering, budget, history)
  - [docs/PART-LIFECYCLE.md](../docs/PART-LIFECYCLE.md): how a part goes from appearing in the BOM to "Ready"
  - [docs/GLOSSARY.md](../docs/GLOSSARY.md): the words we use and what they mean
- **Recorded 15 decisions** made with the user in [docs/DECISIONS.md](../docs/DECISIONS.md). Examples: the same part number means the same part, Onshape changes need approval before they apply, one order can cover several projects, and there's no offline mode in the first version.
- **Listed unanswered questions** in [docs/OPEN-QUESTIONS.md](../docs/OPEN-QUESTIONS.md).
- **Added agent rules** in [docs/AGENT-GUIDELINES.md](../docs/AGENT-GUIDELINES.md): everything must be saved in git, every change needs a report like this one, and whoever writes a multi-agent task list must make sure the tasks don't overlap. [CLAUDE.md](../CLAUDE.md) points agents to these rules.
- **Added a report template** in [reports/TEMPLATE.md](TEMPLATE.md).
- **Added an empty placeholder** for [docs/UI-GUIDELINES.md](../docs/UI-GUIDELINES.md).

## Current State of the Project

- **Planning stage.** There is no app or code yet, only documentation.
- The product behavior is mostly described. Several details are still open (see Open Questions).
- **Not decided yet:** which technology to build it with, and user roles and permissions.
- **Next planned steps (from the user):** document the project structure and how the team plans to work on it, then fill in the UI guidelines.

## Errors and Known Bugs

- None known.
- Note: some stage names in the Part Lifecycle doc ("Needs Ordering", "On Order List") were chosen by the agent and haven't been confirmed by the user yet.

## Next Tasks

Not requested.
