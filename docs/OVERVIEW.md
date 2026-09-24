# BeanPARTS Overview

## Purpose

BeanPARTS is a project-based BOM, procurement, and manufacturing tracking system for **FRC Team 1833**. It answers one question:

> **What parts does this project require, and what still needs to be manufactured, ordered, received, or otherwise fulfilled?**

It replaces much of the team's spreadsheet-based tracking and connects directly to Onshape.

BeanPARTS is **not** an inventory system. Once a project's required quantity of a part is fulfilled, BeanPARTS stops tracking those physical parts.

## Core Workflow

```
              Onshape
                 ↓
            Project BOM
                 ↓
        Determine Requirement
           ↙            ↘
       Custom            COTS
         ↓                ↓
   Manufacture          Purchase
   / Outsource             ↓
         ↓              Receive
         └───────┬────────┘
                 ↓
              READY
```

## Key Principles

- **Everything lives in a project.** Projects are never deleted, only archived.
- **Onshape owns design data; BeanPARTS owns workflow data.** BeanPARTS overrides are allowed and win, but are always visible.
- **Ready is derived from quantities**, never toggled by hand.
- **History is never rewritten.** BOM changes don't erase completed/received work or modify orders; cancellations and corrections are logged.
- **Spending comes from invoices**, not from estimates or orders.
- **Stay focused.** Not an ERP, inventory system, or manufacturing execution system.

## V1 Scope

### V1 Screens

| Screen | Contents |
| --- | --- |
| **Projects** | Active and archived projects |
| **Project Dashboard** | BOM completion, parts to manufacture, parts to order, outstanding deliveries, budget/spending, recent activity |
| **BOM** | Hierarchical assembly/BOM browser |
| **Part Detail** | Part info, occurrences, total required, fulfillment, Onshape info, revision history, files, manufacturing history, ordering history, activity |
| **Manufacturing** | Parts not ready, ready for manufacturing, in progress, required/completed quantities, in-house vs. outsourced |
| **Order Requests** | Submit and review requests |
| **Order List** | Accepted items waiting to be bought, across all projects, grouped by vendor, filterable by project |
| **Orders** | Vendor orders, invoices, and receiving |
| **Project Budget** | Budget, invoiced spending, remaining funds |

### Not in V1 (planned later)

- Offline mode (editing without a connection, field-by-field sync conflicts)
- CAM toolpath preview
- Notifications (email, Slack, etc.)
- Importing existing spreadsheets (V1 starts fresh)
- Detailed manufacturing processes (CNC, laser, 3D print, …)

### Out of Scope (never)

BeanPARTS intentionally does **not** track:

- global COTS inventory, warehouse stock, or storage locations
- reservations between projects
- where manufactured parts go afterward or which robot they're installed on
- individual serialized parts
- raw-material consumption or remaining stock
- consumable usage after purchase
- the long-term lifecycle of completed parts

## Specification

| Area | Document |
| --- | --- |
| Projects, assemblies, BOM occurrences | [spec/01-projects-and-bom.md](spec/01-projects-and-bom.md) |
| Onshape import, sync, overrides | [spec/02-onshape.md](spec/02-onshape.md) |
| Part types, quantities, Ready status | [spec/03-parts-and-quantities.md](spec/03-parts-and-quantities.md) |
| Custom-part workflows, completion history, CAM files | [spec/04-manufacturing.md](spec/04-manufacturing.md) |
| Requests, Order List, orders, receiving | [spec/05-ordering.md](spec/05-ordering.md) |
| Budgets and invoices | [spec/06-budget-and-invoices.md](spec/06-budget-and-invoices.md) |
| Activity history | [spec/07-activity-history.md](spec/07-activity-history.md) |

See also: [Glossary](GLOSSARY.md) · [Decisions](DECISIONS.md) · [Open Questions](OPEN-QUESTIONS.md)
