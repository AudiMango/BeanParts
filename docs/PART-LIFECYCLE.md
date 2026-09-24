# Part Lifecycle

How a **Project Part** moves from appearing in the BOM to **Ready**. This doc brings together the rules spread across the [spec](spec/). If this doc and a spec file disagree, fix one so they match.

A lifecycle is tracked per **Project Part** (one part number within one project), not per BOM occurrence. See [Glossary](GLOSSARY.md).

## 1. Entry

A Project Part comes into existence when its part number first appears in a project's BOM, either:

- **imported from Onshape** (after the user approves a sync), or
- **created manually** (can be linked to Onshape later).

The user then sets its **part type** by hand: COTS, Custom – In-house, or Custom – Outsourced.

## 2. Quantities

Every Project Part has these quantities (all whole numbers):

| Quantity | Source | Applies to |
| --- | --- | --- |
| Required | Sum of BOM occurrences, subassembly quantities multiplied | All |
| Existing Inventory | Declared by a user | COTS |
| Requested | Open order-request items | COTS, Outsourced |
| On Order List | Accepted, not yet ordered | COTS, Outsourced |
| Ordered | Non-cancelled order line items | COTS, Outsourced |
| Received | Entered by a user when items arrive | COTS, Outsourced |
| Completed | Sum of Manufacturing Completion Records | In-house |

**Fulfilled**
- COTS = Existing Inventory + Received
- Custom = Completed + Received (a part can switch between in-house and outsourced; both counts are kept)

**Remaining** = max(Required − Fulfilled, 0)

**Ready** = Fulfilled ≥ Required. It is always derived and never set by hand.

## 3. COTS Lifecycle

```
New
 │
 ├─ Existing Inventory ≥ Required ─────────────────────────┐
 │                                                          │
 ▼                                                          │
Needs Ordering   (Remaining > 0, nothing requested)         │
 ▼                                                          │
Requested        (order request submitted, pending review)  │
 ▼   └─ Rejected → edit & resubmit                          │
On Order List    (accepted, waiting to be purchased)        │
 ▼                                                          │
Ordered          (on a placed vendor order)                 │
 ▼                                                          │
Partially Received                                          │
 ▼                                                          │
Ready  ◄────────────────────────────────────────────────────┘
```

## 4. In-House Custom Lifecycle

```
New / Design In Progress
 ▼
Ready for Manufacturing   (set manually by a user)
 ▼
Manufacturing             (Completed > 0, Completed < Required)
 ▼
Ready                     (Completed ≥ Required)
```

Each batch of completed parts is saved as a **Manufacturing Completion Record** with the quantity, user, date, and Onshape version.

## 5. Outsourced Custom Lifecycle

```
New / Design In Progress
 ▼
Ready for Manufacturing   (set manually)
 ▼
Outsourced
 ▼
Requested → On Order List → Ordered → Partially Received
 ▼
Ready                     (Received ≥ Required)
```

## 6. Events That Change a Part

| Event | Effect |
| --- | --- |
| **Required goes up** (BOM change) | Remaining goes up; a Ready part becomes not Ready. Existing counts are kept. |
| **Required goes down** | Remaining goes down; the part may become Ready. Orders are **not** changed. |
| **Occurrence removed from Onshape** | The occurrence leaves the BOM; its history is kept. |
| **Occurrence re-added** | Counts as a new occurrence; the old occurrence's state is not restored. |
| **New Onshape version** | Recorded. Completed parts are **not** invalidated; the team decides. |
| **Order or line cancelled** | Ordered goes down; the cancellation is logged (who, when, what). |
| **Received corrected down** | Fulfilled goes down; the part may lose Ready. Logged. |
| **Existing Inventory changed** | Fulfilled is recalculated. Logged. |
| **Type switched (in-house ↔ outsourced)** | Both Completed and Received are kept and counted. |
| **Manual override** | The BeanPARTS value wins; the disagreement with Onshape stays visible. |
| **Project archived** | Read-only, except receiving and invoices for open orders. |

Every event creates an [activity record](spec/07-activity-history.md).

## 7. After Ready

Once a part is Ready, BeanPARTS stops tracking the physical parts. Extra quantities (for example Ordered 10 when Required is 7) are ignored. A later BOM change can take the part out of Ready again.

## 8. Open Points

These are tracked in [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md):

- Are "Design In Progress" and "Manufacturing" set manually or derived?
- Can Ready for Manufacturing be undone?
- Does the Project Part keep its orders and completions if all of its occurrences are removed and then re-added?
- How is a part with Required = 0 (removed from CAD after ordering or manufacturing) shown?
- Can Existing Inventory be declared for custom parts?
