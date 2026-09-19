# Session Report — Rebuild the fake-data UI prototype from the Match13 study

## Metadata

- Date/time (UTC): 2026-09-19 15:00Z
- Contributor/agent: Claude Code (Anthropic), session `claude/adoring-pascal-0t077z`
- Branch: `claude/adoring-pascal-0t077z` (session-assigned branch name; a `feature/` name was not available to this session)
- Starting commit: `61e7f71` (merge of PR #6, the UI reference study)
- Ending commit: Report written before the final commit; use the pull request branch head in Git.
- Related issue: None; the owner asked in chat to recreate the UI prototype from the Match13 breakdown and the Team 1833 style guide.
- Related pull request: Opened from this branch to `main`; this report is linked in its description.

## Goal and scope

Recreate the fake-data UI prototype in `dist/` so that it follows `docs/UI-REFERENCE-STUDY.md` (Match13 breakdown and proposed visual specification) and `docs/UI-DIRECTION.md` (Team BEAN 1833 brand rules, navigation, and screen plan).

Included: `dist/index.html`, `dist/styles.css`, `dist/app.js` rewritten from scratch; `dist/bean-logo-primary.png` unchanged. Small documentation updates that describe where the prototype is and how to open it (`README.md`, `docs/ARCHITECTURE.md`, `docs/UI-DIRECTION.md`). This report.

Excluded: the production `apps/` and `packages/` scaffold, any React or build tooling, Apps Script, real Google Sheets or Onshape access, deployment, new product scope, permission changes, and the brand palette decision. The prototype is not production source and must not be retrofitted into the production layout (per the UI reference study §6).

## Project status at handoff

Planning plus a reviewable fake-data prototype. Architecture (React + TypeScript + Vite frontend, Apps Script backend, Sheets as the source of truth) is unchanged and still unimplemented. No integrations are configured. The prototype is the only runnable artifact in the repository and runs from a static file with no install step.

## Changes made

- `dist/index.html`: new page shell — top bar (logo, project switcher, main navigation, search, prototype-only **Preview as** role control, account menu), phone bottom navigation with a **More** sheet, toast, and dialog host. Content is rendered by `app.js`.
- `dist/styles.css`: new stylesheet built on semantic design tokens taken from the study's proposed starting points (canvas `#F6F8F9`, panel `#FFFFFF`, text `#17252B`, muted `#52636B`, teal accent `#1B97AD` with a darker derived tone for filled controls and links, 4–32 px spacing scale, 24/16 px gutters, 40 px controls with 44 px touch targets, 48 px rows, 8/12 px radii, 1 px dividers, shadow only on overlays, 120–180 ms motion, reduced-motion respected). Poppins for all interface text; Chewy only for the wordmark and friendly empty states. Full dark-mode token set (system preference plus an explicit toggle). Responsive: tables become stacked rows at phone width; the detail side panel becomes a full page.
- `dist/app.js`: new fake data and behavior. Three projects with their own BOM records (16 / 9 / 7 lines), central requests (some with no project, i.e. team stock), six vendor orders spanning projects, five AutomationDirect covered orders, members, and per-project activity. Screens: sign-in, Projects, Overview (role-specific work queues), BOM with part detail, Requests with detail, Orders with detail, mentor vendor-order builder (explicit line selection and quantities, running subtotal, never auto-includes a vendor's lines), separate AutomationDirect section (covered value tracked apart from team spending, no invoice step), Deliveries (search first, partial receipts, damaged/wrong flags, remaining quantity), Settings (account, theme, members, projects, admin technical section), global search, and a permission-denied page for students who open `#requests`. States: loading skeleton on project switch and refresh, empty and no-match states, "Last refreshed" with a stale warning after ten minutes, saving state on every write with success reported only after the simulated verification delay, and a field-level conflict resolution example (`BOM-0168`, where the sheet was edited directly).
- `README.md`: added a short "Try the prototype" section.
- `docs/ARCHITECTURE.md`: corrected the `dist/` description (hand-written static prototype, how to open it, which documents it follows).
- `docs/UI-DIRECTION.md`: noted under "Prototype scope" where the prototype is and how role, project, and theme switching work in it.
- `reports/2026-09-19-1500Z-ui-prototype-match13.md`: this report.

## Decisions and documentation

No architecture, permission, data, or product-scope decision was changed. Design choices inside the prototype are presentation only and follow the two UI documents; where the study marks a value as a proposal, the prototype uses it as a starting point for review, not as an approval. The brand palette discrepancy and the v1 dark-mode decision remain open (see `docs/UI-DIRECTION.md`, "Inputs still needed"); the prototype ships dark mode as a switchable example, as the UI direction's prototype scope asked for.

The prototype stays in `dist/` because `docs/ARCHITECTURE.md` already names that location for the fake-data prototype and `docs/CODEBASE-STRUCTURE.md` forbids new competing root directories. It remains plain HTML/CSS/JS so anyone on the team can open it without installing anything; the study requires no new dependency for this work.

## Verification

| Check | Result |
|---|---|
| `node --check dist/app.js` | Pass |
| Headless Chromium (Playwright) page-error and console-error capture across 20 screen loads | Pass: no JavaScript errors. The only console messages were Google Fonts requests blocked by this sandbox's TLS proxy; the page falls back to Arial here and loads Poppins/Chewy in a normal browser |
| Interaction smoke test: switch project robot → Altmill | Pass: BOM footer changed from "16 of 16 lines" to "7 of 7 lines" (each project has its own records) |
| Interaction smoke test: Add BOM part dialog → new draft appears at top of BOM | Pass |
| Interaction smoke test: quantity save on `BOM-0168` shows the sheet-conflict resolution with the typed value | Pass after fix (the input was missing a `name`, so the first run recorded 1; fixed before commit) |
| Screenshot review at 1366 × 900 (light and dark) and 390 × 844 (light and dark) for sign-in, Projects, Overview (student, lead, mentor), BOM + detail, conflict, Requests + detail, Orders + detail, vendor-order builder, Deliveries with receive form, student denied page, Settings, More sheet | Reviewed once; fixed: logo squeezed on phones, Projects name/subtitle run-on, cramped condition select on Deliveries, wrapping time cells |
| Student role cannot reach Requests via navigation or direct route | Pass by inspection of screenshots (`#requests` renders the denied page; navigation items hidden) |
| Keyboard: table rows focusable and open with Enter/Space; dialogs are native `<dialog>`; visible focus ring on all controls | Implemented; not exhaustively tested with a screen reader |
| WCAG AA contrast | Not measured with a tool. Token choices were made to pass (darker teal `#0F6E80` for text and fills on white; light teal `#7DD3E2` on dark surfaces). A contrast audit remains acceptance work per the study §7 |
| `git diff --check` | Run before commit |
| Application tests/build | Not applicable: no production scaffold exists and the prototype has no build step |

## Known limitations and risks

- Fake data only; every "Saved · verified in Sheets" message is simulated with a fixed delay. No write ever reaches Google Sheets.
- The **Preview as** role control is a prototype device. In production, roles come from the backend membership list and cannot be chosen in the browser.
- Column sorting, column customization, Onshape import preview, and notifications are not included (out of v1 scope or deferred per the plan).
- The Requests screen includes team-stock requests (no project) for every project, so the "no requests" empty state only appears for a project created inside the prototype after all team-stock items are filtered. The BOM empty state is reachable by creating a new project from Settings (mentor).
- Screen-reader behavior, exact contrast ratios, browser text zoom, and 768 px tablet layouts were not audited. These are listed as acceptance checks in the study §7 and remain to be done on the production implementation.
- `.openai/hosting.json` still points at `dist/` for a preview; that hosting configuration was not changed or tested here.

## Unresolved questions

- Brand palette code discrepancy in the Team 1833 style guide (existing, owner decision).
- Whether dark mode ships in v1 (existing, owner decision). The prototype demonstrates both.
- Whether the prototype should later be hosted somewhere the whole team can open it from a phone without downloading the repository. This session published a private preview link in chat for the owner; no hosting decision is recorded.

## Recommended next action

The owner (Adi) and a few students and mentors click through the prototype as Student, Lead, and Mentor on both a laptop and a phone, and note what is confusing or missing, especially in the vendor-order builder, deliveries, and the conflict example. Feedback goes into `docs/UI-DIRECTION.md` (screen plan) or a decision record if it changes a product rule. Production implementation still starts from the accepted scaffold per `docs/CODEBASE-STRUCTURE.md`; this prototype is reference material, not source to copy.

## Handoff notes

Branch `claude/adoring-pascal-0t077z` was restarted from `origin/main` at `61e7f71` because its earlier commits were already merged (PR #4). Owned paths: `dist/*`, the three documentation touch points above, and this report. No shared contracts, workbooks, or permissions were affected. No merge, deployment, or live Sheet action is authorized by this handoff. No credentials or private team records are included; all names, vendors, part numbers, and prices are made up.
