# Parts, Quantities, and Ready Status

Part types, required quantities, fulfillment, and existing inventory.

## Part Types

| Type | Description | Examples |
| --- | --- | --- |
| **COTS** | Commercially purchased parts | Bearings, motors, fasteners, pulleys |
| **Custom – In-house** | Designed for the project, made by the team | — |
| **Custom – Outsourced** | Designed for the project, made by a vendor | — |

Part type is **set manually** in BeanPARTS; it is not read from Onshape.

V1 does not track detailed manufacturing processes (CNC, drill, tap, laser, 3D print). These may be added later.

## Part Pricing

Parts can store a normal/current price for **planning and BOM cost estimates**. Actual project spending comes from invoices, not from multiplying the current catalog price, so later price changes never rewrite past spending.

## Required Quantities

All quantities are **whole numbers**. The project's current BOM sets the required quantity. If CAD changes the requirement, work already done is kept:

```
Required:  6
Completed: 4
Remaining: 2
```

Completed, received, and ordered quantities are **never erased** because the required quantity changed.

## Ready

**Ready** means the project's required quantity of a part has been fulfilled. It is **derived from quantities**, not toggled by hand.

| Part type | Fulfillment source |
| --- | --- |
| COTS | Declared existing inventory + received purchased parts |
| In-house custom | Completed quantity |
| Outsourced custom | Received quantity |
| Custom switched between in-house and outsourced | Completed + received quantity |

```
Required:            7
Existing Inventory:  2
Received:            5

Fulfilled: 7
Status:    Ready
```

## Existing Inventory

BeanPARTS has no inventory database. For COTS parts, users simply declare how many are already on hand. Partial inventory is allowed.

```
Required:      8
In Inventory:  3
Still Needed:  5
```

BeanPARTS does **not** decrement inventory later, track where parts are stored, reserve parts across projects, or track what happens to them after use.
