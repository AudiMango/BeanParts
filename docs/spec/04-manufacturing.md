# Manufacturing

Workflows for custom parts (in-house and outsourced), completion tracking, revisions, and CAM files.

## In-House Custom

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

## Outsourced Custom

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
Team Order List
     ↓
Ordered
     ↓
Received
     ↓
Ready
```

For outsourced custom parts, the **received quantity** is the fulfilled quantity.

A custom part can switch between in-house and outsourced partway through. Both counts are kept, and completed + received together count toward Ready.

V1 keeps manufacturing tracking simple:

```
Required:  6
Completed: 4
Remaining: 2
```

BeanPARTS does not do task scheduling, machine scheduling, work orders, or operation-by-operation tracking.

## Completion History

The UI can show just `4 / 6 Complete`, but BeanPARTS keeps each completion record behind the scenes:

```
+2 completed   Onshape V12   Sep 20   User A
+1 completed   Onshape V13   Sep 22   User B
+1 completed   Onshape V13   Sep 23   User A
```

This shows when parts were made, who recorded them, and which Onshape version they were made from.

## Revision Changes

Onshape version history is the authoritative revision history. If a new Onshape version appears after parts have been made, those completed parts are **not** automatically invalidated:

```
Required: 6

2 completed from V12
2 completed from V13

Current Onshape Version: V14
```

BeanPARTS records this and leaves the engineering decision to the team.

## CAM Files

A custom part can have multiple CAM/toolpath files, linked to the relevant part and version:

```
Part
├── Op1.nc
├── Op2.nc
└── Finish.nc
```

## CAM Preview (not in V1)

Toolpath visualization is **not** in V1. A later release may parse uploaded toolpaths, show tool movement, and allow basic visual inspection. It will be a **viewer, not a CAM system**: no material-removal simulation, no collision detection, and no replacement for CAM software.
