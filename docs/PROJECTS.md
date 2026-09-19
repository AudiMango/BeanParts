# BeanParts — Projects and Parts

Status: Planning baseline. Project-based organization and mentor-only order confirmation are confirmed requirements. Details below are proposed defaults, not an implemented system. UI design comes next.

## Project naming and grouping

A project is a specific effort with its own BOM and related requests/orders.

Use three separate fields:
- Year: e.g. 2026.
- Season: Onseason or Offseason.
- Name: e.g. Robot or Altmill Upgrade.

Display them together as:
- 2026 Onseason Robot
- 2026 Offseason Robot
- 2026 Offseason Altmill Upgrade

Year and season are grouping/filter fields, not additional projects. Multiple projects may share the same year and season. The year is selected by the team rather than automatically changing at New Year. For exceptional work, allow an optional General season label so projects are not forced into a misleading category.

Each project has a stable internal ID stored in Sheets. Renaming a project must not break its BOM, requests, or history. Warn about duplicate names within the same year and season.

## Within a project

Organize the BOM as Project > Subsystem > Assembly > Part.

For example, a Robot project might contain:
- Drivetrain: modules, frame, related hardware.
- Intake: roller assembly, mounts, related hardware.
- Electrical: electronics and wiring.

These are examples, not fixed categories. An Altmill Upgrade project can use its own groups. A small project may list parts directly without creating subsystems or assemblies. Support nested assemblies where the CAD requires them; do not force arbitrary folder depth.

Each project provides:
- Its BOM, including student submissions awaiting review.
- Its order requests and linked order lines.
- Delivery information.
- Relevant Onshape references.
- Project status and recorded changes.

No assumption is made that every part or project originates in Onshape.

## Part identity versus project usage

A part describes what an item is. A BOM entry describes where it is used and how many are needed.

The same purchased item may appear in multiple projects without becoming multiple unrelated part identities. Quantities, assembly placement, and review status belong to each project's BOM entries.

Example: two projects both use the same bearing. The item identity can be shared, but each project's required quantity is separate. This does not imply that physical stock has been reserved for both.

For custom parts, retain revision and CAD source information. Do not match solely on a displayed name or automatically treat two similarly named parts as interchangeable.

Full inventory and stock reservations remain optional scope; project organization does not introduce them implicitly.

## Ordering across projects

- Each order request line names a project and optionally a subsystem/assembly.
- Link a request to its BOM entry when relevant.
- Allow purchases that are not BOM parts, such as project supplies.
- A mentor creates a vendor order by selecting the specific approved request lines and quantities being purchased. Selecting a vendor must never automatically include every request for that vendor.
- A mentor may combine selected approved requests for several projects into one vendor order.
- Preserve each project's quantities and links on the individual order lines.
- Where one purchased line serves several projects, record quantity allocations and ensure their total equals the purchased quantity.
- Do not duplicate a complete order or count its full cost once for every linked project.
- Decide shipping/tax allocation rules before presenting complete project spending totals.
- For team-wide supplies, propose a clearly named General Team Supplies project rather than mislabeling them as robot parts.

Creating a BOM entry does not automatically approve or place an order.

## Confirmation responsibilities

- Students add BOM entries but do not access the Requests section.
- Leads review student submissions, confirm BOM entries, check order requests, and confirm deliveries.
- Only mentors give final purchase confirmation, mark an order as placed with the vendor, and confirm invoices.
- Lead review and mentor purchase confirmation are separate actions and labels.
- Admin access alone does not grant mentor purchasing powers.

Proposed: new BOM entries are visible as Pending review. A lead or mentor confirms them or returns them for correction. Material quantity, identity, or revision changes reopen review. Exact editable fields and cancellation rules will be settled before implementation.

## Project lifecycle

Proposed statuses:
- Planned: created, not yet actively being worked on.
- Active: current work.
- Completed: work finished; outstanding order/delivery obligations remain visible.
- Archived: retained for reference and excluded from normal active-project lists.

Archive instead of deleting historical projects. Archived projects are read-only in BeanParts until reopened by a lead or mentor. Enforcing equivalent restrictions directly in Sheets requires a separate protection design; app status alone cannot prevent sheet edits.

Proposed: leads and mentors create, rename, complete, archive, and reopen projects. Students can view all projects and add BOM entries to open projects. Admin privileges alone do not replace the business role.

A new offseason project may copy a previous robot BOM as a starting point. Copy structure and desired quantities as new project entries, reset review state, and retain a source reference. Never copy completed approvals, orders, deliveries, or stock allocations as new achievements.

## Workbook storage and compatibility

Each project has one BOM workbook created by a mentor through BeanParts from an approved template. It stores that project's BOM and related BOM review/history data. It does not contain the team's ordering and invoice records.

One central ordering workbook stores normal requests, AutomationDirect requests, orders, deliveries, and invoices across all projects. A request may link to a project/BOM entry, a project without a BOM entry, or team-wide stock/supplies. Mentors may select and combine specific approved lines and quantities from several projects into one vendor order.

One central Control workbook stores the project directory/workbook IDs, Members/roles, shared lists, settings, and recovery metadata.

Direct workbook editing remains supported. Stable IDs and explicit workbook IDs—not row positions or filenames—link records. A shared sheet or hidden column is not automatically secure; use protected ranges plus backend authorization.

The available BOM workbook and order template were inspected on September 17–18, 2026. Legacy files will be archived read-only. v1 begins from clean approved templates rather than automatically importing historical rows.

Mentors create, archive, and restore project workbooks. Project creation copies the template, registers the workbook, applies permissions, and is safe to retry without producing duplicates.

## Acceptance checks

1. Create all three example projects without mixing their BOMs or requests.
2. Filter by year and season while keeping projects distinct.
3. Rename a project without breaking links.
4. Use the same bearing in two projects with independent quantities.
5. Confirm a BOM entry as a lead without giving purchase approval.
6. Reject a lead attempt to mark a vendor order as placed; allow a mentor.
7. Combine two projects' requests into a vendor order without losing attribution or double-counting.
8. Archive a project without losing history or hiding outstanding deliveries.
9. Copy a robot BOM into a new project without copying completion states.
10. Create/edit corresponding records directly in Sheets and reflect them in BeanParts.

## Next: UI planning

Use this structure to sketch the project list, a project workspace, BOM review, requests, and mentor order confirmation. Start with fake data and a visual proposal; no live integration or deployment is authorized by this document.
