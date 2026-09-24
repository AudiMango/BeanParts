# Glossary

Use these terms consistently in docs, code, and UI.

## Core Entities

| Term | Meaning |
| --- | --- |
| **Project** | Top-level container (e.g. `2027 Onseason Robot`). Active or Archived; never deleted. |
| **Assembly** | A node in a project's BOM tree. Contains parts, other assemblies, or both. |
| **BOM Occurrence** | One place a part appears in an assembly, with its quantity (e.g. `Shooter → Bearing ×4`). |
| **Project Part** | All occurrences of one part number within one project, combined (e.g. `Bearing — Total Required 7`). Ordering and fulfillment are tracked here. |
| **Onshape Source** | A link from a BeanPARTS assembly to an Onshape document/assembly. |
| **Onshape Version** | An Onshape document version; the authoritative revision history. |
| **Manual Part** | A part created in BeanPARTS with no Onshape link (can be linked later). |
| **Override** | A BeanPARTS value that replaces an imported Onshape value. |
| **Order Request** | A request to buy items for one project. Reviewed, then accepted or rejected. |
| **Order Request Item** | One line in an order request (BOM part or non-BOM item). |
| **Order List** | Team-wide list of accepted items waiting to be purchased, grouped by vendor. |
| **Order** | An actual purchase from exactly one vendor. May include items from several projects. |
| **Order Line Item** | One line in an order; belongs to one project. |
| **Invoice** | A PDF plus financial details (subtotal, shipping, tax, total) attached to an order. |
| **Manufacturing Completion Record** | A logged batch of completed parts: quantity, user, date, Onshape version. |
| **File / CAM File** | A file attached to a part or version (e.g. `Op1.nc`). |
| **Activity Record** | An audit-trail entry: user, timestamp, action, old/new values. |
| **User** | A team member using BeanPARTS. |

## Part Types

| Term | Meaning |
| --- | --- |
| **COTS** | Commercial off-the-shelf; purchased. |
| **Custom – In-house** | Designed for the project, made by the team. |
| **Custom – Outsourced** | Designed for the project, made by a vendor. |

## Quantities and Statuses

| Term | Meaning |
| --- | --- |
| **Required** | Total quantity the current BOM needs (subassembly quantities multiplied). |
| **Existing Inventory** | COTS quantity the team declares it already has. Not tracked afterward. |
| **Completed** | In-house custom parts made. |
| **Ordered** | Quantity on orders. May exceed Required. |
| **Received** | Quantity that has arrived (COTS or outsourced). Use "Received", not "Delivered". |
| **Fulfilled** | Inventory + Received (COTS), or Completed + Received (custom). |
| **Remaining** | Required − Fulfilled (never below 0). |
| **Ready** | Fulfilled ≥ Required. Always derived, never set by hand. |
| **Ready for Manufacturing** | Manually set on a custom part when it can be made. |
