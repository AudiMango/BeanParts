# BeanParts

BeanParts is a responsive browser application for FRC Team BEAN 1833's parts ordering, bill of materials (BOM), and related project workflows. Students and mentors will use it from personal laptops and phones.

## Architecture at a glance

- **Frontend:** responsive browser application.
- **Backend/API:** Google Apps Script.
- **Authentication:** Google account authentication/OAuth.
- **Authorization:** BeanParts roles such as Student, Lead, Mentor, and Admin, enforced by the backend.
- **Source of truth:** the team's Google Sheets. Direct spreadsheet editing remains supported.
- **Hosting under investigation:** serve the frontend from Google Apps Script as well as the backend. No separate host or cloud database is assumed.

BeanParts reads and writes the same underlying Sheets that team members can edit manually. A change made in Sheets must appear in BeanParts after refresh, and a verified BeanParts save must appear in Sheets.

See [Architecture](docs/ARCHITECTURE.md) for current decisions, undecided implementation details, and possible future migration paths. See [Project plan](docs/PLAN.md) for product scope.
