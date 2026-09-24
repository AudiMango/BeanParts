# Projects and BOM

How projects, assemblies, BOM occurrences, and project parts fit together.

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
├── Order List (view of the team-wide list)
├── Orders
├── Budget
├── Files
└── Activity History
```

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

## BOM Occurrences vs. Project Parts

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

## Same Part Across Projects

The same part number can appear in several projects. Each project tracks its **requirement and fulfillment independently**: quantities, deliveries, manufacturing progress, and statuses are not shared. (A single vendor order may still include items for several projects; see [Ordering](05-ordering.md#orders).) There is no global inventory record.

```
2027 Robot → Bearing   (independent)
Super Pit  → Bearing   (independent)
```

## Manual Parts

Users can create parts that are not in Onshape yet. Manual parts:

- work normally in the BOM
- have no Onshape synchronization
- have no Onshape revision information

A manual part can later be **linked** to an Onshape part. From then on, it receives Onshape information and version data.
