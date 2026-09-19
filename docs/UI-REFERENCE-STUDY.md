# BeanParts — Match13 and Calm Interface Reference Study

Status: **Proposed** design recommendations for review. Research completed September 19, 2026 (UTC).

## Purpose and authority

Translate the modern, calm, clean feeling of Match13 and three related references into practical guidance for BeanParts contributors. This is a completed research document, not an approved redesign or an implementation claim.

[UI direction](UI-DIRECTION.md) remains the primary source for branding, navigation, screens, and responsive behavior. [Architecture](ARCHITECTURE.md), [roles](ROLES.md), and [spreadsheet rules](SPREADSHEET-RULES.md) retain their authority. Accepting this research does not add features, change permissions, replace Sheets, or authorize deployment.

**Recommended direction:** combine Match13's organization around a main dataset, Linear's information hierarchy, Things' spacious grouping, and FRCBOM's workshop vocabulary. Use BeanParts' existing BEAN branding and mostly neutral working surfaces.

## Evidence and reading guide

- **Observed** means visible in the public browser UI or its rendered DOM on the review date.
- **Measured** means a computed style read from a rendered element; it is a sample, not a complete design system.
- **Interpretation** explains why an observed treatment may feel calm. It is design judgment, not a measured usability result.
- **Proposal** means a BeanParts implementation recommendation, not a claim about another site's code.

Public pages were located through web search, then visually inspected in a desktop browser at a reported viewport of 1363 × 936 CSS pixels. No competitor account was created or entered. The comparison includes marketing pages and their embedded product examples; those are explicitly distinguished from live application behavior. Screenshots were inspected during research but are not bundled or copied into the product.

| Reference / inspected source | Evidence coverage | Why it belongs here |
|---|---|---|
| [Match13 home](https://www.match13.com/) | Live desktop landing page | Primary visual reference requested by the owner |
| [Match13 teams](https://www.match13.com/teams?year=2026) | Live leaderboard, search, column dialog, rendered style samples | Dense data presented with a small control surface |
| [Match13 Team BEAN](https://www.match13.com/team/1833?year=2026) | Live detail page in light and dark themes | Context, summary, and repeated data sections |
| [Linear planning page](https://linear.app/plan) | Public page and embedded project-detail example | Restrained dark surfaces and clear hierarchy |
| [Things](https://culturedcode.com/things/) | Public page and embedded Mac/iPhone examples; redirected from things.app | Light surfaces, grouping, and readable lists |
| [FRCBOM](https://frcbom.com/) | Public page and embedded BOM example | Closest domain comparison for workshop data |

Limitations: mobile layouts were not exercised; exact animation durations, performance, full keyboard behavior, screen-reader compatibility, contrast compliance, and persistence across sessions were not audited. Other than the stated samples, font names, color codes, breakpoints, frameworks, libraries, and internal architecture are unverified. A visual resemblance cannot establish React, Tailwind, a component library, or a particular backend.

## 1. Match13 breakdown

### Home: identity around one entry point

**Observed:** a blue sky fills the background; a centered capsule contains navigation. A large search field sits apart from the large wordmark and mountain graphic. Legal links remain small. [Source: home](https://www.match13.com/).

**Interpretation:** few competing choices and generous empty space make the entry point obvious. The scenery supplies personality; it is not what makes a working table understandable.

**BeanParts proposal:** keep the approved compact sign-in/project entry flow. Carry identity through the BEAN logo and restrained brand type. Do not introduce a full-screen scenic landing page into the signed-in app.

### Leaderboard: one surface owns the task

**Observed:** a broad translucent panel groups search, geographic filters, result count, Download, Columns, and rows. Rank headers show sorting controls. Names occupy a wide column; numeric columns align consistently; rating cells carry color. Global search and season controls stay above. [Source: teams](https://www.match13.com/teams?year=2026).

**Interpretation:** separating global context from local filtering reduces ambiguity. Repeated alignment allows scanning without enclosing every cell in a heavy grid. Concentrating emphasis in a few places preserves hierarchy even with many numbers.

**BeanParts proposal:** organize BOM and Orders as one working surface with a nearby filter toolbar. Use normal text for routine quantities and money; reserve semantic color for status, selection, and exceptions. Use an opaque table background so contrast does not depend on imagery beneath it.

### Detail page: summary before records

**Observed:** team identity and regional ranks precede event sections. An event rail, Matches/Charts tabs, and a Team/Alliance control separate context and views. Dark mode retains the structure with darker surfaces. [Source: team detail](https://www.match13.com/team/1833?year=2026).

**Interpretation:** users can orient themselves before reading individual records. Stable structure across themes avoids having to relearn the page.

**BeanParts proposal:** show part/order identity, project, and workflow state before line details. Adapt the hierarchy, not the award banners or ranking cards. Keep the approved compact work queues instead of turning the overview into a statistics dashboard.

### Interaction and implementation evidence

**Observed:** searching `1833` reduced the list to one result and exposed clearing controls. Columns opened a grouped checkbox dialog with reorder buttons. Computed samples: system sans-serif; global search 14px/40px high; local search 12px/32px high; both 999px radius. The leaderboard uses a `DIV` exposed as a table. [Source: teams](https://www.match13.com/teams?year=2026).

These samples describe Match13, **not** recommended BeanParts tokens. In particular, do not reduce BeanParts touch targets to 32px or replace its approved Poppins typography. Do not infer complete accessibility from the presence of ARIA roles. The column dialog was opened and inspected; reordering, exports, and preference persistence were not tested. Sort controls were observed, not exhaustively exercised.

**Implementation proposal:** React can reproduce the organizational pattern using a shell, toolbar, semantic table, and focused dialog components. CSS can provide consistent spacing, radii, and surface colors without copying Match13's source. Prefer native table semantics for ordinary tabular data; add complexity only for a demonstrated requirement. Column customization is an optional future enhancement, not added v1 scope by this document.

## 2. Comparable references

### Linear — restrained hierarchy

**Observed:** the public planning page uses a nearly black canvas, large white headings, muted navigation, thin separators, and generous margins. Its embedded project example organizes tabs above a title, compact properties, small colored symbols, and document content. This was a marketing example, not a signed-in workspace. [Source](https://linear.app/plan).

**Interpretation:** consistent alignment and differences in text size/weight communicate priority without many bright containers. Color is more effective when most of the surface is neutral.

**Adapt:** use a clear title → context → toolbar → records order. Keep secondary metadata quieter than part names and primary actions. Group order properties together before line items.

**Avoid:** importing its large marketing hero into the working app, overly faint labels, or new roadmaps/AI/notification workflows. Dark colors alone do not make a calm UI. Exact fonts, colors, spacing, and product interactions were not measured.

### Things — lightness through grouping

**Observed:** the public page uses a pale background, a simple header, centered sections, dark sans-serif headings, and blue links. Embedded desktop and phone examples show white task surfaces, compact lists, section headings, and small colored navigation symbols. These are product images, not interactive browser app views. [Source](https://culturedcode.com/things/).

**Interpretation:** larger gaps between groups than between related rows make the structure readable with little decoration. Personality stays in icons while task text remains straightforward.

**Adapt:** separate metadata, editable fields, and actions through spacing. Use a concise empty state with one relevant next action. Give phone rows a primary label and a small number of supporting values.

**Avoid:** copying native platform chrome or treating purchasing as a one-click task-completion gesture. A checkbox selecting an order line must not imply mentor approval or delivery. Mobile behavior, gestures, font names, and exact measurements were not verified.

### FRCBOM — domain-specific clarity

**Observed:** its public page uses a dark navy/purple identity and prominent demo/sign-in actions. The embedded BOM example shows subsystem context, type filters, aligned part/material/process/quantity columns, progress, and a synchronization indicator. This public example was inspected without entering a team or demo account. [Source](https://frcbom.com/).

**Interpretation:** familiar workshop terms make dense information easier to understand. Useful context next to the table reduces navigation between screens.

**Adapt:** keep subsystem context and part type near the BOM; make refresh state visible; use realistic parts and long descriptions when reviewing layouts.

**Avoid:** copying purple gradients, promotional panels, or claims about replacing spreadsheets. BeanParts keeps Sheets authoritative. Onshape import and notifications remain post-v1. A synchronization badge must not imply a successful save before the backend verifies it. Live editing, permissions, synchronization speed, and responsive behavior were not tested.

## 3. What makes the combined direction calm

The following is our design synthesis, not a claim that every reference implements every rule.

| Principle | Concrete BeanParts treatment | Failure to avoid |
|---|---|---|
| Predictable hierarchy | Project context, page title, relevant action, filters, records | Multiple equally prominent buttons and headings |
| Quiet surfaces | Neutral page, opaque working panel, subtle dividers | Glass over data or nested cards around every field |
| Consistent density | Similar rows, aligned numbers, generous gaps between sections | Large cards mixed with cramped forms |
| Restrained color | Teal selection and action; labeled semantic states | Every vendor, quantity, and status competing in bright colors |
| Progressive detail | Essential columns first; secondary detail in the approved panel/page | Removing information without a discoverable route back to it |
| Trustworthy feedback | Visible refresh time, pending save, verified result, recovery state | Instant success animation for an unverified write |
| Familiar language | Part, subsystem, quantity, mentor review, delivered | Generic labels such as Processing or ambiguous Confirmed |

Calm means low ambiguity as well as visual restraint. A subdued error that hides a failed save is worse than a clearly labeled warning.

## 4. Proposed BeanParts visual specification

These values are **starting points for a later prototype review**, not measurements copied from references or changes to the brand guide. Existing branding rules in [UI direction](UI-DIRECTION.md) apply. The documented palette discrepancy still needs owner resolution before final production styling.

| Area | Proposed starting point | Reason / condition |
|---|---|---|
| Fonts | Existing Poppins body and headings; Chewy only for approved brand accents | Preserve BEAN identity and readable records |
| Main text | 14px desktop; 16px phone form input; line height around 1.4–1.5 | Compact without making mobile entry uncomfortable |
| Secondary text | 12–13px for nonessential metadata only | Keep critical states at normal reading size |
| Page title | 24–28px; existing ExtraBold weight | Enough hierarchy without a marketing hero |
| Section heading | 16–18px SemiBold | Distinguish groups within a work surface |
| Spacing scale | 4, 8, 12, 16, 24, 32px | Avoid independently invented gaps in each feature |
| Page gutters | 24px laptop, 16px phone | Clear edges; adapt to available width |
| Row height | Approximately 44–48px minimum; expand for wrapped content | Dense lists with usable interaction targets |
| Controls | Approximately 40px visual height on pointer layouts; 44px or larger touch area | Never shrink the actual hit target for phones |
| Corners | 8px controls; 12px panels; small status chips | Follow existing moderate-radius direction |
| Surfaces | Example canvas `#F6F8F9`, panel `#FFFFFF`, text `#17252B`, muted text `#52636B` | Proposed neutrals only; verify actual rendered contrast |
| Accent | Approved teal `#1B97AD`, with accessible derived tones for text/buttons | Do not assume white on brand teal passes |
| Borders/shadows | 1px subtle divider; shadow reserved for overlays | Separation without visual weight on every row |
| Motion | Suggested 120–180ms for small transitions; respect reduced motion | No decorative loops or animation delaying feedback |

Use semantic tokens such as `surface`, `text`, `text-muted`, `border`, `accent`, `focus`, `warning`, and `danger`. Store them centrally when the production scaffold exists. Feature components should not invent new hex values or spacing systems. Optional dark mode needs its own tested tokens rather than a simple color inversion; whether it ships in v1 remains an owner decision.

For quantities and currency, propose right alignment and tabular numerals where the selected font supports them. Keep units in headers or adjacent labels; format money consistently. Preserve full part numbers through wrapping or an accessible detail view rather than relying on hover tooltips.

## 5. Apply the research to existing BeanParts screens

These mappings refine presentation within the accepted screen plan. They do not grant new actions or change lifecycle rules.

| Screen | Suggested composition | Required behavior to preserve |
|---|---|---|
| Projects | Compact grouped list; name first, season/status second, relevant counts last | Selected project loads its own records |
| Overview | Short role-appropriate queues with direct links to filtered records | Students receive no request queues or request links |
| BOM | Title/action row, search and filters, stable table, selected-part detail | Students add/submit BOM parts under existing permissions |
| Requests | Status grouping; requester/project/quantity/cost consistently aligned | Leads and mentors only; mentor final purchase approval |
| Vendor order builder | Vendor/context, eligible lines with explicit selection, quantity fields, selected subtotal | Never auto-include all items from a supplier; show each selected line's project |
| AD covered orders | Separate labeled workflow using the same components | Separate covered value from Team Spending; mentor approval; no invoice connection |
| Deliveries | Search first; readable remaining quantity; focused quantity entry | Lead/mentor confirmation; partial deliveries remain explicit |
| Conflict resolution | Current Sheet value beside proposed value, field labels, clear authorized choices | Preserve user input; backend rechecks permission and revision |

For the vendor builder, the selection checkbox means “include this line.” Place final purchase confirmation in a distinct, labeled action. Do not combine selecting, approving, and marking an order placed into one polished-looking button.

### Responsive proposal

Follow the existing desktop top bar and role-aware mobile navigation in [UI direction](UI-DIRECTION.md). Do not add a permanent desktop sidebar just because another reference uses one.

At narrow widths, stack the title and action, allow the toolbar to wrap, and move secondary filters into a labeled control. Ordinary mobile rows should show the part, quantity, status, and one context field, with a clear details route. Use the accepted full detail page on phones. Do not make a wide desktop table the only way to perform ordinary phone tasks.

Choose breakpoints when the actual Poppins labels and content stop fitting, not from guessed competitor values. Later checks should include 390px, 768px, and 1366px widths, long project names, and browser text zoom. These checks are proposed acceptance work; this research did not perform them.

### State design proposal

| State | Display and action |
|---|---|
| Initial loading | Reserve approximate content space and label loading; do not show a false empty result |
| No records | Explain the empty scope and show only a role-permitted next action |
| No filter matches | Keep filters visible and offer Clear filters |
| Saving | Disable repeated submission of that operation and keep entered values visible |
| Verified success | Update the affected record and show a concise confirmation only after backend verification |
| Delayed/failed operation | Show the known state and safe next action; use the API's retry guidance |
| Stale data | Keep Last refreshed and Refresh visible; do not hide stale status behind a transient toast |
| Conflict | Present field-by-field resolution while preserving unsaved values |
| Permission denial | Explain the denied action without exposing protected records; do not offer a client-side bypass |

## 6. How future contributors should implement this

Use the existing [codebase boundaries](CODEBASE-STRUCTURE.md). These locations are planned; this PR creates no application modules.

| Planned location | Ownership relevant to this guide |
|---|---|
| `apps/web/src/app/` | Shared shell, routing, project context, role-aware navigation |
| `apps/web/src/styles/` | Semantic color, spacing, typography, and motion tokens |
| `apps/web/src/components/` | Generic buttons, fields, status presentation, tables, dialogs, empty/loading states |
| `apps/web/src/features/bom/` | BOM columns, filters, part detail, and feature-specific interactions |
| `apps/web/src/features/orders/` | Selective vendor-order composition and order details |
| Other `apps/web/src/features/<feature>/` folders | Their own screens and workflow presentation |
| `apps/web/src/lib/` | Typed API adapter, formatting, cache/refresh helpers |
| `packages/contracts/src/` | Agreed roles, statuses, request/result/conflict types; no visual styling |

Shared components render the state they receive; they do not decide purchasing authority or access Sheets. Features use the typed adapter. Apps Script remains responsible for permission checks and durable changes. Do not retrofit the generated `dist/` prototype into the canonical production source layout.

Suggested implementation order after a separate implementation task is approved:

1. Confirm any proposed token choices and settle the existing brand/theme questions.
2. Build one representative BOM surface with fake data within the accepted scaffold.
3. Exercise student, lead, and mentor states, long rows, loading, errors, and conflicts.
4. Reuse the reviewed primitives across Orders, Requests, AD, and Deliveries.
5. Connect real data only through reviewed contracts and the existing backend plan.

Do not select a new framework or component library merely to match a reference. This study requires no additional dependency.

## 7. Review checklist for a later UI change

- [ ] Main task and selected project are obvious before scrolling.
- [ ] Navigation and data change correctly with project and role.
- [ ] Students cannot reach Requests through navigation, queues, or direct routes.
- [ ] Mentor order creation selects explicit lines and quantities without vendor-wide auto-selection.
- [ ] AD value and team spending remain distinct; invoice controls do not appear in the AD workflow.
- [ ] Main text, controls, focus, and statuses pass the applicable WCAG AA contrast checks.
- [ ] Keyboard users can reach filters, sorting, details, dialogs, and actions; focus returns appropriately.
- [ ] Status meaning survives grayscale; icons have names and visible labels where needed.
- [ ] Phone layouts, touch targets, long content, and text zoom are checked.
- [ ] Unsaved, failed, delayed, stale, and conflicting changes remain understandable.
- [ ] Reduced-motion preference removes unnecessary movement.
- [ ] Shared tokens and components are reused; no feature introduces a competing visual system.

These are acceptance criteria for future implementation, not checks claimed to pass in this documentation PR.
