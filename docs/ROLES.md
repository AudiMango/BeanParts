# BeanParts — Roles and Permissions

Status: User-confirmed role outline with proposed details. Planning only.

## Confirmed by the user

- All students can view BOMs and order sheets and add parts to a BOM.
- Students can submit BOM entries and other team requests.
- Student leads can request orders and review or confirm student submissions, including orders, deliveries, BOM entries, and other requests.
- Mentors can perform those actions. Only mentors give final confirmation for orders, mark vendor orders as placed, and confirm invoices.
- Admin responsibilities are for the developer to propose.
- Spreadsheet structure can change somewhat, while remaining usable in a similar manner.

## Proposed interpretation

Lead confirmation means checking student-submitted information before it moves forward. This includes checking order requests, confirming delivered parts, confirming BOM entries, and reviewing other student requests. Mentors retain final confirmation for purchases and invoices. A lead's check does not mean a vendor order was placed or an invoice was approved.

| Action | Student | Student lead | Mentor |
|---|---|---|---|
| View BOMs and order sheets | Yes | Yes | Yes |
| Add or submit BOM parts | Yes | Yes | Yes |
| Submit other requests | Yes | Yes | Yes |
| Submit an order request | No, submit through a lead | Yes | Yes |
| Check student requests | No | Yes | Yes |
| Confirm a BOM entry | No | Yes | Yes |
| Confirm delivered parts | No | Yes | Yes |
| Give final purchase confirmation | No | No | Yes |
| Confirm invoice details | No | No | Yes |
| Record an order as actually placed | No | No | Yes |

The user's latest clarification confirms lead review of orders, deliveries, BOM entries, and other student requests. Items marked pending remain undecided. Editing/deleting other users' BOM entries, applying bulk CAD imports, cancelling requests, and changing already-approved requests remain to be specified. Invoice confirmation does not itself mean payment processing.

Proposed approval workflow: a lead prepares or checks the order request, a mentor gives final confirmation, the purchase is placed outside BeanParts, order placement is recorded, and a lead or mentor confirms delivered quantities. Decide how partial deliveries are represented after reviewing the workbook.

Material changes to approved quantity, vendor, or cost should require renewed mentor review; exact rules remain to be agreed.

## Admin recommendation

Use admin as an additional responsibility, alongside a student's, lead's, or mentor's normal role.

Mentors manage:
- Membership and role assignments.
- Final purchase approval, order placement, invoice links, and invoice confirmation.
- Project creation and restoration.

Admins manage technical application settings, troubleshooting, deployment support, and recovery tooling. Onshape connection settings are deferred until the post-v1 importer.

Admin status by itself does not grant final purchase approval or invoice confirmation. A mentor who is also an admin has both sets of abilities.

At least two mentors must retain access-management and recovery capability. Admin permission alone cannot grant or remove roles and does not create an unintended route to purchase approval.

## Identity and backend enforcement

Google account authentication/OAuth establishes the account identity. BeanParts authorization is a separate decision: the Apps Script backend maps that identity to the approved Student, Lead, Mentor, and optional Admin responsibilities.

Hiding or disabling a control in the frontend is not permission enforcement. Every protected read or write must be checked again by the Apps Script backend before it accesses Sheets. The browser must not receive privileged Google API credentials or a general-purpose capability to bypass those checks.

The exact role-storage layout, invitation/onboarding process, inactive-user behavior, and method for proving identity across the chosen Apps Script deployment are still implementation decisions. They must be tested with the Google account types the team will actually use.

## Spreadsheet compatibility

All durable role assignments remain in the protected Members sheet of the Control workbook. Only mentors manage access and roles through BeanParts or direct protected-sheet access. Direct spreadsheet users must retain their normal way of working. App permission checks alone cannot restrict someone who can freely edit the corresponding sheet cells.

Before implementation, inspect existing sharing/protection arrangements and propose appropriate protection for approvals, invoice confirmation, and role settings. Test both direct-sheet and app paths. Do not claim these protections are already configured.

## Remaining questions

1. How should a lead handle a student submission that needs corrections: return it with notes, edit it directly, or either?
2. Final exact protected ranges and Workspace groups must be validated on copies before rollout. All approved users may view operational invoice and budget data, but students and leads cannot edit invoices. Payment credentials and banking/card information are never stored.

Ask these gradually; avoid requiring the user to decide implementation details.
