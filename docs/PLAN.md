# BeanParts — Project Plan

Status: Draft for review. Planning only; application development is not authorized yet.

## Start here

BeanParts helps FRC Team 1833 manage ordering and the robot bill of materials (BOM: the list of parts needed for a robot or assembly). It should work from a computer or phone.

**The existing Google spreadsheets remain the source of truth. They contain the actual data, not exported copies of a separate app database. Team members can continue working directly in those spreadsheets without using BeanParts.**

BeanParts is another way to work with the same records. If BeanParts is unavailable, normal spreadsheet work must still be possible.

This replaces the earlier suggestion of a database-authoritative hybrid. That suggestion is not the approved direction.

## What is confirmed

- Name: BeanParts.
- Start with requirements, then architecture, then development.
- Explain decisions in plain language; the developer handles technical details.
- Support web and mobile use.
- Reduce manual work in ordering and transferring Onshape information into the Big Sheet of Stuff.
- Keep the two existing spreadsheets as the real record system.
- Preserve direct spreadsheet editing and existing users' workflows.
- Keep source code and planning documents in this repository with version history.
- Repository ownership may transfer from AudiMango to the team later.
- Do not modify live spreadsheets or deploy an application during planning.

## What is proposed, not yet confirmed

### First useful release

1. View and search existing order requests and BOM records.
2. Submit and update order requests through BeanParts.
3. Follow the team's actual approval, ordering, and receiving process.
4. Read changes made directly in Sheets.
5. Import a selected Onshape assembly into a preview.
6. Review additions, quantity changes, and other changes before saving to the BOM sheet.
7. Show whether a save succeeded and when displayed data was last refreshed.
8. Work well in desktop and phone browsers.

Ordering means recording and organizing purchases. BeanParts will not place purchases or handle payments automatically.

### Later possibilities

These are not committed requirements:
- Full inventory counts, storage bins, and reservations.
- Manufacturing progress.
- Notifications and dashboards.
- Multiple robots and seasons.
- Vendor price or availability integrations.
- Barcode scanning.
- Offline editing.
- Separate App Store or Google Play applications.

The earlier discussion included some of these as if they were settled. They are optional until the team confirms the need.

## Example day-to-day use

### Ordering

A student enters a request in either the existing sheet or BeanParts. Both represent the same request. The responsible person reviews it using the team's existing process. Someone places the order outside BeanParts, records the purchase, and later records receipt.

Exact statuses, required fields, approvers, and partial-delivery behavior will be mapped from the current workflow, not invented for the team.

### BOM updates

A user chooses an Onshape assembly. BeanParts proposes BOM changes. A user checks the preview and accepts selected changes. Accepted information is saved in the existing BOM spreadsheet.

Onshape remains the design source; Sheets remains the authoritative record for the team's BOM and ordering workflow. Imported CAD fields and manually maintained fields need clear rules. A CAD import must not erase purchasing notes, manufacturing status, or other team-entered information.

Removing a part in CAD must not automatically delete a purchase request or erase history.

## Work stages and approval points

| Stage | What the developer produces | What Adi/team approves |
|---|---|---|
| 1. Requirements | Current workflow, sheet field map, required features, success checks | That the plan matches how the team works |
| 2. Architecture | Plain-language system design, permissions, data rules, costs, recovery approach | Costs, access, and any sheet structure changes |
| 3. Prototype | Screens using fake data | Whether the app is understandable and useful |
| 4. Development | Small working features tested on copies | Permission to start development, then feedback on each milestone |
| 5. Pilot | A limited test with team members and backed-up data | Permission for a controlled live test |
| 6. Release | Tested app, user guide, maintenance and recovery instructions | Permission for wider team use |

No stage approval implies permission to spend money, change live sheet layouts, or deploy to production.

## What we need from the team

### Needed next

1. Copies or exports of both existing spreadsheets, including tabs, column headers, formulas, and a few representative rows. Remove sensitive data. Screenshots can help initially but will not be enough for the full field/formula review.
2. A short explanation of who requests, approves, orders, and marks parts received. Include whether approval happens in the sheet, verbally, or somewhere else.
3. Whether adding helper columns or tabs to the existing spreadsheet files is acceptable, provided the familiar workflow stays intact.

### Needed before architecture is approved

- One representative Onshape assembly and an explanation of how it is currently copied into the BOM. A sanitized example or screenshots are sufficient to start discussion.
- Required Onshape properties, part-number conventions, configurations, revision practices, and quantities/spares rules.
- Rough number of users, record counts, and busiest expected period.
- Must-have first-release features versus optional inventory/manufacturing features.
- Acceptable wait for a direct spreadsheet edit to appear in the app.
- Google account/sharing arrangements, including any school restrictions.
- Budget ceiling, including whether ongoing paid services are acceptable.
- Adult/team account owner for long-term service ownership and any billing.
- Existing scripts, add-ons, formulas, or integrations that must be preserved.

Do not send passwords, API secrets, payment information, or unnecessary personal data. Access setup will happen separately when needed.

## Current limitations and source status

The initial documents are based on the user's instructions in this conversation. The uploaded BeanParts-HANDOFF.md, Pasted markdown.md, and BeanParts-step-1.0.zip have not been inspected with the currently available tools. No claims are made about their contents, quality, or completion.

The current spreadsheets and Onshape setup have not yet been inspected. Compatibility, API access, speed, exact costs, and the feasibility of preserving every existing behavior must be checked before selecting implementation tools or promising delivery dates.

Existing Claude code is reference material, not an approved implementation. Review it once accessible and reuse only pieces consistent with the approved requirements.

## Related documents

- [Spreadsheet rules and acceptance checks](SPREADSHEET-RULES.md)
- [Development and handoff process](DEVELOPMENT.md)
