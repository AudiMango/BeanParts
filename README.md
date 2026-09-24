# BeanPARTS

**Project-based BOM, procurement, and manufacturing tracking for FRC Team 1833, with Onshape integration.**

BeanPARTS answers one question:

> **What parts does this project require, and what still needs to be manufactured, ordered, received, or otherwise fulfilled?**

It replaces much of the team's spreadsheet-based tracking and connects directly to Onshape.

BeanPARTS is **not** an inventory-management system. Once a project's required quantity of a part has been manufactured, delivered, received, or otherwise accounted for, BeanPARTS generally stops tracking those physical parts.

---

## Table of Contents

- [Core Workflow](#core-workflow)
- [Projects](#projects)
- [Hierarchical BOM](#hierarchical-bom)
- [Onshape Integration](#onshape-integration)
- [Parts](#parts)
- [Quantities and Ready Status](#quantities-and-ready-status)
- [Workflows](#workflows)
- [Manufacturing](#manufacturing)
- [Ordering](#ordering)
- [Invoices and Budgets](#invoices-and-budgets)
- [Files, CAD, and CAM](#files-cad-and-cam)
- [Activity History](#activity-history)
- [Offline Mode](#offline-mode)
- [Out of Scope](#out-of-scope)
- [Core Data Concepts](#core-data-concepts)
- [V1 Screens](#v1-screens)
- [Product Philosophy](#product-philosophy)

---

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

BeanPARTS connects Onshape BOMs with the team's manufacturing, purchasing, and project-budget workflows so everyone can see what a project needs and what still has to happen before those parts are ready.

---

## Projects

Everything in BeanPARTS lives inside a **Project**, for example:

- `2027 Onseason Robot`
- `CNC Enclosure`
- `Super Pit`

A project is either **Active** or **Archived**. Projects are never deleted. Archived projects stay available and keep their history. An archived project can still receive deliveries and have invoices added so open orders can be finished; everything else is read-only.

```
Project
├── Assemblies / Subassemblies
├── BOM
├── Order Requests
├── Order List
├── Orders
├── Budget
├── Files
└── Activity History
```

---

## Hierarchical BOM

Projects support nested assemblies. An assembly can contain parts, other assemblies, or both.

```
2027 Onseason Robot
├── Drivetrain
│   ├── Frame
│   │   ├── Left Rail
│   │   └── Right Rail
│   └── Swerve Modules
├── Intake
│   ├── Pivot
│   └── Roller Assembly
└── Shooter
    ├── Flywheel Assembly
    └── Hood
```

A project does not have to come from a single Onshape assembly.

---

## Onshape Integration

Onshape is the main way to build project BOMs quickly. Users connect individual Onshape documents or subassemblies to assemblies in BeanPARTS, and BeanPARTS imports the BOM so nobody has to type it in by hand.

```
BeanPARTS Project
├── Drivetrain ← Onshape source
├── Intake     ← Onshape source
└── Shooter    ← Onshape source
```

You can also create assemblies and parts manually.

### Data Ownership

> **Onshape owns CAD/design information. BeanPARTS owns workflow information.**

| Onshape-controlled | BeanPARTS-controlled |
| --- | --- |
| Part number | Ordering |
| Part name | Manufacturing progress |
| BOM structure | Existing inventory declaration |
| BOM quantity | Completed quantities |
| Onshape version | Delivered quantities |
| CAD geometry | Prices |
| Other imported metadata | Invoices |
| | Notes |
| | Workflow status |
| | Activity history |

### Manual Overrides

Users can edit imported values in BeanPARTS. When they do, **the BeanPARTS value wins**.

```
Onshape:            Material = 6061
BeanPARTS Override: Material = 7075
```

When a value is overridden, BeanPARTS:

- displays the BeanPARTS value
- shows that it disagrees with Onshape
- shows the Onshape value for reference
- records the override in the activity history

If Onshape later changes to match (e.g. `7075`), the disagreement indicator goes away on its own. Users can also reset an overridden value to the Onshape value.

### BOM Synchronization

After the first import, BeanPARTS detects changes such as the ones below. Changes are **not applied automatically**: the user runs a sync, reviews the list of changes, and approves them.

```
+ Part added
- Part removed
~ Quantity changed
~ Part renamed
~ New Onshape version
```

- When an Onshape BOM occurrence is **removed**, it is removed from the BeanPARTS BOM. Its history is kept where appropriate.
- If the same part is **added back** later, it counts as a **new** BOM occurrence. It does **not** get the previous occurrence's workflow state back.

### Part Numbering

BeanPARTS uses the team's **existing part-numbering system** and does not introduce a new one. The part number is the main human-readable identifier. BeanPARTS also stores Onshape's internal identifiers so synchronization stays reliable.

**Occurrences are combined into one Project Part by part number.** Two occurrences with the same part number are the same part, even if they come from different Onshape documents.

---

## Parts

### Part Types

| Type | Description | Examples |
| --- | --- | --- |
| **COTS** | Commercially purchased parts | Bearings, motors, fasteners, pulleys |
| **Custom – In-house** | Designed for the project, made by the team | — |
| **Custom – Outsourced** | Designed for the project, made by a vendor | — |

Part type is **set manually** in BeanPARTS; it is not read from Onshape.

V1 does not track detailed manufacturing processes (CNC, drill, tap, laser, 3D print). These may be added later.

### BOM Occurrences vs. Project Parts

The same part can appear more than once in a project BOM. The BOM shows each **occurrence** separately:

```
Shooter
└── Bearing ×4

Indexer
└── Bearing ×3
```

Clicking the part opens a combined **project-level view**:

```
Bearing

Shooter:  4
Indexer:  3

Total Required: 7
```

Ordering and fulfillment are tracked against the combined project requirement (7).

**Subassembly quantities multiply.** If a Swerve Module is used ×4 and contains 2 bearings, the requirement is 8 bearings.

### Same Part Across Projects

The same part number can appear in several projects. Each project tracks its **requirement and fulfillment independently**: quantities, deliveries, manufacturing progress, and statuses are not shared. (A single vendor order may still include items for several projects; see [Orders](#orders).) There is no global inventory record.

```
2027 Robot → Bearing   (independent)
Super Pit  → Bearing   (independent)
```

### Manual Parts

Users can create parts that are not in Onshape yet. Manual parts:

- work normally in the BOM
- have no Onshape synchronization
- have no Onshape revision information

A manual part can later be **linked** to an Onshape part. From then on, it receives Onshape information and version data.

### Part Pricing

Parts can store a normal/current price for **planning and BOM cost estimates**. Actual project spending comes from invoices, not from multiplying the current catalog price, so later price changes never rewrite past spending.

---

## Quantities and Ready Status

### Required Quantities

The project's current BOM sets the required quantity. If CAD changes the requirement, work already done is kept:

```
Required:  6
Completed: 4
Remaining: 2
```

Completed, delivered, received, and ordered quantities are **never erased** because the required quantity changed.

### Ready

**Ready** means the project's required quantity of a part has been fulfilled. It is **derived from quantities**, not toggled by hand.

| Part type | Fulfillment source |
| --- | --- |
| COTS | Declared existing inventory + delivered purchased parts |
| In-house custom | Completed quantity |
| Outsourced custom | Received quantity |

```
Required:            7
Existing Inventory:  2
Delivered:           5

Fulfilled: 7
Status:    Ready
```

### Existing Inventory

BeanPARTS has no inventory database. For COTS parts, users simply declare how many are already on hand. Partial inventory is allowed.

```
Required:      8
In Inventory:  3
Still Needed:  5
```

BeanPARTS does **not** decrement inventory later, track where parts are stored, reserve parts across projects, or track what happens to them after use.

---

## Workflows

### COTS

```
New Part
    ↓
Check Existing Inventory
    ↓
┌───────────────────────┐
│ Enough already exists │ → Ready
└───────────────────────┘

OR

Existing Quantity: Partial/None
    ↓
Order Request
    ↓
Accepted
    ↓
Project Order List
    ↓
Order Created
    ↓
Ordered
    ↓
Partially Delivered
    ↓
Delivered
    ↓
Ready
```

### In-House Custom

```
New Custom Part
      ↓
Design / In Progress
      ↓
Ready for Manufacturing
      ↓
Manufacturing
      ↓
Completed Quantity
      ↓
Ready
```

A user sets **Ready for Manufacturing** by hand. It is not inferred from uploaded files or CAD state.

### Outsourced Custom

```
Custom Part
     ↓
Ready for Manufacturing
     ↓
Outsourced
     ↓
Order Request
     ↓
Accepted
     ↓
Order List
     ↓
Ordered
     ↓
Received
     ↓
Ready
```

For outsourced custom parts, the **received quantity** is the fulfilled quantity.

---

## Manufacturing

V1 keeps manufacturing tracking simple:

```
Required:  6
Completed: 4
Remaining: 2
```

BeanPARTS does not do task scheduling, machine scheduling, work orders, or operation-by-operation tracking.

### Completion History

The UI can show just `4 / 6 Complete`, but BeanPARTS keeps each completion record behind the scenes:

```
+2 completed   Onshape V12   Sep 20   User A
+1 completed   Onshape V13   Sep 22   User B
+1 completed   Onshape V13   Sep 23   User A
```

This shows when parts were made, who recorded them, and which Onshape version they were made from.

### Revision Changes

Onshape version history is the authoritative revision history. If a new Onshape version appears after parts have been made, those completed parts are **not** automatically invalidated:

```
Required: 6

2 completed from V12
2 completed from V13

Current Onshape Version: V14
```

BeanPARTS records this and leaves the engineering decision to the team.

---

## Ordering

### Order Requests

Each order request belongs to **one project**. A request can contain:

- BOM parts
- non-BOM items (cutting fluid, Loctite, heat shrink, tooling, shop supplies)
- consumables
- items from multiple vendors

Non-BOM items do not have to be added to the project BOM.

### Review Process

```
Draft / Submitted
      ↓
Pending Review
      ↓
Accepted  or  Rejected
```

Accepted items go to the project's **Order List**. Rejected requests can be edited and resubmitted.

### Project Order List

The Order List holds accepted items that still need to be bought, so requests can be combined before purchasing:

```
PROJECT ORDER LIST

McMaster
- Bearings ×10
- 10-32 bolts ×50
- Cutting fluid ×1

WCP
- Pulleys ×4

REV
- Motor ×2
```

### Orders

An order contains items from **exactly one vendor**, but it **may combine items from several projects** (e.g. one McMaster order for the Robot and the Super Pit). Each line item belongs to one project.

```
Order #42  Vendor: McMaster        Order #43  Vendor: WCP
- Bearings ×10                     - Pulleys ×4
- Bolts ×50
- Cutting Fluid ×1
```

Order states:

```
Ordered
Partially Received
Received
Cancelled
```

### Ordering Rules

- **Ordered can exceed required.** Minimum purchase quantities, package sizes, spares, and vendor availability can all cause this (e.g. `Required: 7, Ordered: 10`). The BOM still only requires 7, and the extra parts are not tracked.
- **BOM changes never modify orders.** If the requirement drops from 10 to 6 after 10 were ordered, the result is `Required: 6, Ordered: 10`. BOM sync must never silently rewrite past orders.
- **Cancellation keeps the record.** You can cancel whole orders or single line items. BeanPARTS keeps what was cancelled, who cancelled it, and when.

### Delivery Verification

Users check deliveries by hand:

```
Ordered:   10
Received:   6
Remaining:  4
```

Received quantities can be raised later, or lowered to fix mistakes. Every change goes into the activity log.

---

## Invoices and Budgets

### Invoices

Invoices are uploaded as PDFs and attached to an order. An order can have **multiple invoices**. After an upload, BeanPARTS shows a short form:

```
Invoice Number
Invoice Date
Subtotal
Shipping
Tax
Total
Notes
```

### Project Budgets

Each project has its own budget. Projects do not share budgets.

```
2027 Onseason Robot

Budget:     $15,000
Spent:       $4,820
Remaining:  $10,180
```

### Budget Rules

- **Spending is recorded from invoices only.** *Spent* updates when an invoice is uploaded and its amounts are entered. Submitting or accepting a request, or placing an order, does not change it.
- **Shipping and tax count** against the budget:
  ```
  Parts:     $200
  Shipping:   $15
  Tax:        $12
  Budget Impact: $227
  ```
- **Multiple invoices add up.** Each invoice keeps its own amounts and PDF:
  ```
  Order #42
  Invoice A: $300
  Invoice B: $100
  Total Budget Impact: $400
  ```
- **Corrections replace, not double-count.** If invoice details are corrected, the budget updates to the new value.

---

## Files, CAD, and CAM

### CAD Preview

BeanPARTS uses the Onshape API to show CAD parts, so users can identify and inspect a part without opening the whole Onshape document. CAD/STEP preview is part of the planned core integration.

### CAM Files

A custom part can have multiple CAM/toolpath files, linked to the relevant part and version:

```
Part
├── Op1.nc
├── Op2.nc
└── Finish.nc
```

### CAM Preview (future)

Toolpath visualization is **not** in V1. A later release may parse uploaded toolpaths, show tool movement, and allow basic visual inspection. It will be a **viewer, not a CAM system**: no material-removal simulation, no collision detection, and no replacement for CAM software.

---

## Activity History

Important changes create activity records, for example:

```
Part imported from Onshape
Quantity changed 4 → 6
Manual override created
Marked Ready for Manufacturing
Completed quantity changed 2 → 3
Order request accepted
Order created
Received quantity changed 6 → 10
Invoice uploaded
Order cancelled
Project archived
```

Each record includes the **user**, **timestamp**, **action**, and **old/new values** where they apply.

---

## Offline Mode

BeanPARTS can be used and edited offline. While offline, users can work with project data that is stored locally:

- view BOM information
- change quantities
- update statuses
- record delivered parts
- edit basic project and part information

Changes are saved locally until the connection returns.

### Synchronization

```
Offline Changes
      ↓
Compare with Server
      ↓
No Conflict
      ↓
Automatic Sync
```

Conflicts are resolved **field by field**:

```
Quantity Required

SERVER:          6
OFFLINE CHANGE:  8

[Keep Server]  [Keep Mine]
```

If two users changed different fields (e.g. one changed a quantity and the other changed a note), both changes merge automatically. Nobody has to overwrite a whole part because of one conflicting field.

### Files Offline

- Metadata and previously cached data stay available offline.
- Large CAD/toolpath files are only available if they were cached or downloaded earlier.
- Uploads made offline wait in the sync queue until the connection returns.

---

## Out of Scope

BeanPARTS intentionally does **not** track:

- global COTS inventory
- warehouse stock
- physical storage locations
- reservations between projects
- where manufactured parts go afterward
- which robot a part is installed on
- individual serialized parts
- raw-material consumption
- remaining stock after manufacturing
- consumable usage after purchase
- the long-term lifecycle of completed parts

Once a project's requirement is fulfilled, BeanPARTS's job is essentially done.

---

## Core Data Concepts

| Entity | Purpose |
| --- | --- |
| Project | Top-level container; active or archived |
| Assembly | Node in the hierarchical BOM |
| BOM Occurrence | Where a part appears in an assembly, and how many |
| Project Part | Combined view of a part within one project (total required, fulfillment) |
| Onshape Source | Link between an assembly and an Onshape document/assembly |
| Onshape Version | Revision information from Onshape |
| Order Request | A project-scoped request to purchase items |
| Order Request Item | A single line in an order request |
| Order | A single-vendor purchase |
| Order Line Item | A single line in an order |
| Invoice | PDF plus financial details attached to an order |
| Manufacturing Completion Record | A logged batch of completed parts (qty, user, date, version) |
| File / CAM File | Files attached to parts or versions |
| Activity Record | Audit trail entry |
| User | Team member using BeanPARTS |
| Offline Sync Record | A queued local change waiting to sync |

**BOM Occurrence vs. Project Part:**

```
BOM Occurrence:  Shooter → Bearing ×4
BOM Occurrence:  Indexer → Bearing ×3

Project Part:    Bearing — Total Required = 7
```

---

## V1 Screens

| Screen | Contents |
| --- | --- |
| **Projects** | Active and archived projects |
| **Project Dashboard** | BOM completion, parts to manufacture, parts to order, outstanding deliveries, budget/spending, recent activity |
| **BOM** | Hierarchical assembly/BOM browser |
| **Part Detail** | Part info, occurrences, total required, fulfillment, Onshape info, revision history, files, manufacturing history, ordering history, activity |
| **Manufacturing** | Parts not ready, ready for manufacturing, in progress, required/completed quantities, in-house vs. outsourced |
| **Order Requests** | Submit and review requests |
| **Order List** | Accepted items waiting to be bought, grouped/filterable by vendor |
| **Orders** | Vendor orders, invoices, and receiving |
| **Project Budget** | Budget, invoiced spending, remaining funds |

---

## Product Philosophy

BeanPARTS stays focused. It is **not** meant to become a full ERP, inventory system, or manufacturing execution system.

> BeanPARTS connects Onshape BOMs with the team's manufacturing, purchasing, and project-budget workflows so everyone can see what a project needs and what still has to happen before those parts are ready.
