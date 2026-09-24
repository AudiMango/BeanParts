# Open Questions

Unresolved items. When one is answered, remove it here and add it to [DECISIONS.md](DECISIONS.md).

## Deferred (to be decided later)

- **Platform / tech stack**: hosting, database, front end.
- **Users, sign-in, and roles**: who can review requests, place orders, enter invoices, set budgets, archive projects, see invoice amounts.

## Onshape

- Does a linked source track the live workspace or a specific named version?
- If a linked assembly contains a subassembly that is also linked separately, how is double-counting avoided?
- Does the Onshape assembly tree become BeanPARTS assemblies automatically, or is it flattened?
- Which imported fields can be overridden? Can BOM quantity be overridden?
- How are blank or duplicate part numbers handled?
- How should the CAD preview work (Onshape viewer vs. exported model)?

## Parts and Quantities

- When an occurrence is removed and later re-added, does the **Project Part** keep its orders/completions? (Spec says the occurrence is new; Project Part state is unclear.)
- Is moving a part to another assembly treated as remove + add?
- If a part is removed from CAD after being ordered or made (Required = 0), how is it shown?
- Can existing inventory be declared for custom parts (e.g. last season's spares)?
- Are "Design / In Progress" and "Manufacturing" set manually or derived?
- If Required rises after a part was Ready, it becomes not Ready: confirm.

## Ordering

- Can a reviewer accept part of a request, or change quantities?
- Where are vendor info, vendor part numbers, links, and package sizes stored? Is there a vendor list?
- Can one Order List item be split across multiple orders?
- How are purchases outside the order flow handled (card purchases, reimbursements)?
- Returns, refunds, credits, and cancelling after partial receipt?

## Budget

- Who sets or changes a budget, and is it logged?
- Over-budget warnings?
- Should committed (ordered but not yet invoiced) spending be shown?
- How are sponsor-donated or discounted parts handled?

## Files

- Where are files stored, and are there size limits?
- What belongs in the project-level "Files" area?
