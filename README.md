# BeanParts

BeanParts is a responsive browser application for FRC Team BEAN 1833's parts ordering, bill of materials (BOM), and related project workflows. Students and mentors will use it from personal laptops and phones.

## Architecture at a glance

- **Frontend:** React + TypeScript + Vite responsive browser application served by Google Apps Script HTML Service.
- **Backend/API:** Google Apps Script using `google.script.run` for v1 client/server calls.
- **Authentication:** Team Google Workspace accounts; the web app executes as the accessing user.
- **Authorization:** BeanParts roles enforced by the backend; mentors manage membership and roles.
- **Source of truth:** directly editable Google Sheets workbooks.
- **Data layout:** one BOM workbook per project, one central ordering workbook, and one central Control workbook.
- **v1 boundaries:** browser access only; Onshape import and notifications are deferred.

BeanParts reads and writes the same underlying workbooks that approved team members can edit manually. Direct edits should appear in BeanParts within 1–2 minutes, and a verified BeanParts save must appear in those same workbooks.

See [Architecture](docs/ARCHITECTURE.md) for current decisions, undecided implementation details, and possible future migration paths. See [Project plan](docs/PLAN.md) for product scope.
