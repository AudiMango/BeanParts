# BeanParts — Spreadsheet Audit

Status: Requirements audit of the two workbooks available on September 17, 2026. No live spreadsheet was changed.

## Plain-language conclusion

The current spreadsheets can remain BeanParts' real data store. We do not need to replace them with an app database.

The safest approach is to preserve the sheets people already recognize, add a few clearly labeled columns and helper tabs, and let BeanParts read and write those same rows. Existing spreadsheet users can continue working directly in Google Sheets.

The completed 2025 order sheet was not available for this pass. It should be checked later to confirm how the order template behaves with a full season of real records.

## Workbooks reviewed

- Big Sheet Of Stuff 2.0 — 2026 Offseason
- Copy of Order Sheet Template

## What exists today

### BOM workbook

| Tab | Present purpose | Important fields |
|---|---|---|
| BOM | Main robot/project bill of materials | Part number, description, material, quantity, status, owner, link, notes |
| Manufacturing List | Builds manufacturing queues from the BOM | Part number, quantity, owner, material, manufacturer, done |
| COTS Parts | Builds purchased-part/vendor lists from the BOM | Part number, name, quantity, vendor-specific lists |

The BOM is divided into numbered subsystem sections such as Drivetrain, Hopper, Indexer, Intake, and Exhaust. It mixes custom-manufactured parts and COTS (commercial off-the-shelf) parts in one understandable list.

The manufacturing and COTS tabs are mainly generated views. They should normally be treated as outputs, not as the primary place to edit a part.

### Order workbook

| Tab | Present purpose | Important fields |
|---|---|---|
| Robot Parts | Requested items and purchasing status | Description, part number, quantity, unit cost, total, requester, subsystem, date, vendor, link, order status, date ordered, invoice number |
| Invoices | Vendor invoice/order tracking | Vendor, invoice number, description, purchaser, total, status |
| AD Order List | Small special-purpose order list | Part number, quantity, unit cost, total, note, status |

The workbook also includes budget and total-cost summaries. Item totals are calculated from quantity × unit cost.

## What BeanParts should preserve

1. Keep the visible tabs and their familiar purpose.
2. Keep part numbers, subsystem sections, formulas, colors, and normal direct editing.
3. Keep calculated manufacturing and COTS lists as spreadsheet views.
4. Keep the order sheet usable without BeanParts.
5. Treat Google Sheets as the final saved record. A BeanParts save is not complete until the sheet write is verified.
6. Never overwrite formula-generated cells with displayed values.
7. Let people sort and insert rows without BeanParts losing track of records.

## Problems the app should solve

The current sheets rely on visual sections, exact text, and row position. That works for people but is fragile for an app.

Observed examples include:

- inconsistent material names and spelling;
- blank required-looking fields;
- trailing spaces in some part numbers;
- the same purchased part used in more than one subsystem;
- a description entered where a part number would normally go;
- status words being used for several different ideas;
- subsystem names represented by special numbered rows rather than an explicit field;
- no stable request or BOM-entry identifier.

BeanParts should flag these issues for review, not silently rewrite or delete the original data.

## Formula note

The exported XLSX files contain Google Sheets formulas such as FILTER. Excel-compatible inspection tools display many of these as unsupported functions. That does not mean the live Google Sheet is broken.

However, several exported formulas contain an actual #REF! reference, including parts of the Manufacturing List and COTS Parts logic. These must be checked in the live Google Sheet before development. BeanParts must not copy or “repair” those formulas automatically.

## Proposed modest spreadsheet changes

These are proposals for review, not changes already made.

### Add columns to the existing editable tabs

Add new columns to the far right so the current left-to-right workflow stays familiar.

**BOM**

- Project
- Subsystem
- Assembly (optional)
- BOM Entry ID
- Part ID
- Review Status
- Reviewed By
- Reviewed At
- Onshape Source ID
- Onshape Version
- Last Updated

**Robot Parts**

- Project
- Request ID
- Request Status
- Lead Review
- Mentor Approval
- Delivery Status
- Confirmed By
- Confirmed At
- Last Updated

**Invoices**

- Invoice ID
- Project
- Mentor Confirmation
- Confirmed By
- Confirmed At
- Last Updated

Existing columns remain. BeanParts should populate identifiers automatically, while spreadsheet users may continue entering normal records in the familiar columns.

### Add helper tabs

| Helper tab | Purpose |
|---|---|
| Projects | Project ID, year, season, name, active/archived state |
| Members | Team account, role, and active state; no passwords or secrets |
| Deliveries | Partial and complete delivery confirmations linked to requests |
| History | Important BeanParts actions and safe retry information |
| Lists | Standard status, material, and subsystem values used by dropdowns |

These tabs are part of the spreadsheet record system. Hiding a helper tab is optional organization, not security.

## Recommended workflow states

Keep different concepts separate instead of placing every event in one “Status” cell.

### Request and purchasing

1. Draft
2. Submitted
3. Lead Reviewed
4. Mentor Approved
5. Ordered
6. Partially Delivered or Delivered
7. Closed

Only mentors can perform Mentor Approved and Ordered through BeanParts. Leads can review requests and confirm/check deliveries. Direct-sheet permission limits must be documented separately.

### BOM review

1. Draft
2. Submitted
3. Lead Reviewed
4. Confirmed

Students may add BOM entries. Leads review them. The exact person allowed to perform the final BOM confirmation should be confirmed before development; the current requirement says leads check BOM entries, while mentors can do everything leads can do.

### Invoice

1. Draft
2. Ordered
3. Shipped
4. Arrived
5. Organized
6. Mentor Confirmed

This keeps the current invoice wording while adding an explicit mentor confirmation.

## Data relationships BeanParts should use

- A project contains subsystems.
- A subsystem may contain assemblies.
- A BOM entry says that a project/subsystem needs a quantity of a part.
- A part can appear in several BOM entries without becoming several different parts.
- An order request may cover one or more BOM needs, but it must keep its own request identity.
- An invoice may cover several requests.
- A delivery may be partial and must not erase the original ordered quantity.

This is why Part ID, BOM Entry ID, and Request ID must be separate.

## Checks required before connecting live data

- Review the completed 2025 order sheet when available.
- Check the apparent #REF! formulas in the live Google Sheet.
- Confirm whether AD Order List remains a separate workflow or can become a filtered view.
- Confirm the final BOM confirmation rule.
- Confirm which existing columns/formulas/scripts must remain untouched.
- Test all changes on copies first.
- Back up both live spreadsheets before any approved structure change.

## Next prototype scope

The first fake-data UI prototype should show:

- project selection;
- project BOM grouped by subsystem;
- add/edit BOM part;
- order request list and request form;
- lead review queue;
- mentor approval and order-confirmation actions;
- delivery check;
- invoice confirmation;
- a clear “saved to Google Sheets” or failure state.

The prototype will not connect to live sheets, place purchases, or import Onshape data.
