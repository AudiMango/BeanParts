# Ordering

COTS workflow, order requests, the team-wide Order List, vendor orders, and receiving.

## COTS Workflow

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
Team Order List
    ↓
Ordered
    ↓
Partially Received
    ↓
Received
    ↓
Ready
```

## Order Requests

Each order request belongs to **one project**. A request can contain:

- BOM parts
- non-BOM items (cutting fluid, Loctite, heat shrink, tooling, shop supplies)
- consumables
- items from multiple vendors

Non-BOM items do not have to be added to the project BOM.

## Review Process

```
Draft / Submitted
      ↓
Pending Review
      ↓
Accepted  or  Rejected
```

Accepted items go to the **team-wide Order List**. Rejected requests can be edited and resubmitted.

## Order List

Accepted items from **all projects** go into one **team-wide Order List**, grouped by vendor, so purchases can be combined before ordering. Each item keeps its project, and the list can be filtered by project:

```
TEAM ORDER LIST

McMaster
- Bearings ×10
- 10-32 bolts ×50
- Cutting fluid ×1

WCP
- Pulleys ×4

REV
- Motor ×2
```

## Orders

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

## Ordering Rules

- **Ordered can exceed required.** Minimum purchase quantities, package sizes, spares, and vendor availability can all cause this (e.g. `Required: 7, Ordered: 10`). The BOM still only requires 7, and the extra parts are not tracked.
- **BOM changes never modify orders.** If the requirement drops from 10 to 6 after 10 were ordered, the result is `Required: 6, Ordered: 10`. BOM sync must never silently rewrite past orders.
- **Cancellation keeps the record.** You can cancel whole orders or single line items. BeanPARTS keeps what was cancelled, who cancelled it, and when.

## Receiving

Users check deliveries by hand:

```
Ordered:   10
Received:   6
Remaining:  4
```

Received quantities can be raised later, or lowered to fix mistakes. Every change goes into the activity log.
