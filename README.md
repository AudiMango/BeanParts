# BeanPARTS

Project-based BOM, procurement, and manufacturing tracking for **FRC Team 1833**, with Onshape integration.

> **What parts does this project require, and what still needs to be manufactured, ordered, received, or otherwise fulfilled?**

## Status

**Planning.** The product spec is being written. No code yet; the platform and roles are still to be decided.

## Documentation

| Document | Purpose |
| --- | --- |
| [docs/OVERVIEW.md](docs/OVERVIEW.md) | Start here: purpose, principles, V1 scope, spec index |
| [docs/PART-LIFECYCLE.md](docs/PART-LIFECYCLE.md) | How a part moves from BOM to Ready |
| [docs/UI-GUIDELINES.md](docs/UI-GUIDELINES.md) | UI conventions (to be written) |
| [docs/spec/](docs/spec/) | Detailed product specification, one file per area |
| [docs/GLOSSARY.md](docs/GLOSSARY.md) | Standard terms |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Settled decisions log |
| [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) | Unresolved questions |

## Repository Layout

```
README.md               This file
docs/
├── OVERVIEW.md         Product overview and V1 scope
├── PART-LIFECYCLE.md   Part states, quantities, and events
├── UI-GUIDELINES.md    UI conventions (to be written)
├── GLOSSARY.md         Terminology
├── DECISIONS.md        Decision log
├── OPEN-QUESTIONS.md   Open questions
└── spec/               Product specification
    ├── 01-projects-and-bom.md
    ├── 02-onshape.md
    ├── 03-parts-and-quantities.md
    ├── 04-manufacturing.md
    ├── 05-ordering.md
    ├── 06-budget-and-invoices.md
    └── 07-activity-history.md
```
