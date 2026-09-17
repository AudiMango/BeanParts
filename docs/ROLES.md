# BeanParts — Roles and Permissions

Status: User-confirmed role outline with proposed details. Planning only.

## Confirmed by the user

- All students can view BOMs and order sheets and add parts to a BOM.
- Student leads can request orders and perform confirmations/checks.
- Mentors can perform those actions and also confirm orders and invoices.
- Admin responsibilities are for the developer to propose.
- Spreadsheet structure can change somewhat, while remaining usable in a similar manner.

## Proposed interpretation

"Confirm" needs a precise meaning. Proposed: leads check that a request contains the right parts, quantities, and purpose; mentors give final purchase approval and confirm invoice details. Lead review alone does not mean a purchase has been approved or placed.

| Action | Student | Student lead | Mentor |
|---|---|---|---|
| View BOMs and order sheets | Yes | Yes | Yes |
| Add parts to a BOM | Yes | Yes | Yes |
| Submit an order request | Not enabled in initial proposal | Yes | Yes |
| Check a request is ready for mentor review | No | Yes | Yes |
| Give final purchase approval | No | No | Yes |
| Confirm invoice details | No | No | Yes |
| Mark items physically received | Pending decision | Proposed | Yes |
| Record an order as actually placed | No | Pending decision | Yes |

Only the confirmed outline above is settled. The table fills gaps with proposals, not newly approved requirements. Editing/deleting other users' BOM entries, applying bulk CAD imports, cancelling requests, and changing already-approved requests remain to be specified. Invoice confirmation does not itself mean payment processing.

Proposed approval workflow: lead submits/checks request, mentor approves, purchase is placed outside BeanParts, order placement is recorded, delivered quantities are recorded. Decide how partial deliveries are represented after reviewing the workbook.

Material changes to approved quantity, vendor, or cost should require renewed mentor review; exact rules remain to be agreed.

## Admin recommendation

Use admin as an additional responsibility, alongside a student's, lead's, or mentor's normal role.

Admins manage:
- Membership and role assignments.
- Spreadsheet and Onshape connection settings.
- Application settings and troubleshooting.
- Backups, recovery, and ownership handoff.

Admin status by itself does not grant final purchase approval or invoice confirmation. A mentor who is also an admin has both sets of abilities.

Proposed: Adi handles app administration with a mentor as a second administrator for continuity. This is a recommendation, not an account assignment. Define who may grant the mentor role so role management does not become an unintended route to purchase approval.

## Spreadsheet compatibility

All durable role assignments and workflow records remain in the spreadsheet system, subject to protected storage design. Direct spreadsheet users must retain their normal way of working. App permission checks alone cannot restrict someone who can freely edit the corresponding sheet cells.

Before implementation, inspect existing sharing/protection arrangements and propose appropriate protection for approvals, invoice confirmation, and role settings. Test both direct-sheet and app paths. Do not claim these protections are already configured.

## Remaining questions

1. Does lead "confirmation" mean checking requests, confirming physical receipt, or both?
2. Who records that the vendor order was actually placed?
3. Can ordinary students request purchases directly, or should those requests go through a lead? Initial proposal uses leads.
4. Should any invoice details be restricted, or should all students see the same operational information? Do not infer that viewing order sheets grants access to credentials or payment details.

Ask these gradually; avoid requiring the user to decide implementation details.
