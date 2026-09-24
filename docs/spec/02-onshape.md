# Onshape Integration

How BeanPARTS imports and syncs BOMs from Onshape, and who owns which data.

Onshape is the main way to build project BOMs quickly. BeanPARTS connects through **one team Onshape account**, so users don't need their own Onshape login. Users connect individual Onshape documents or subassemblies to assemblies in BeanPARTS, and BeanPARTS imports the BOM so nobody has to type it in by hand.

```
BeanPARTS Project
├── Drivetrain ← Onshape source
├── Intake     ← Onshape source
└── Shooter    ← Onshape source
```

You can also create assemblies and parts manually.

## Data Ownership

> **Onshape owns CAD/design information. BeanPARTS owns workflow information.**

| Onshape-controlled | BeanPARTS-controlled |
| --- | --- |
| Part number | Ordering |
| Part name | Manufacturing progress |
| BOM structure | Existing inventory declaration |
| BOM quantity | Completed quantities |
| Onshape version | Received quantities |
| CAD geometry | Prices |
| Other imported metadata | Invoices |
| | Notes |
| | Workflow status |
| | Activity history |

## Manual Overrides

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

## BOM Synchronization

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

## Part Numbering

BeanPARTS uses the team's **existing part-numbering system** and does not introduce a new one. The part number is the main human-readable identifier. BeanPARTS also stores Onshape's internal identifiers so synchronization stays reliable.

**Occurrences are combined into one Project Part by part number.** Two occurrences with the same part number are the same part, even if they come from different Onshape documents.

## CAD Preview

BeanPARTS uses the Onshape API to show CAD parts, so users can identify and inspect a part without opening the whole Onshape document. CAD/STEP preview is part of the planned core integration.
