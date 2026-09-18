# BeanParts — UI Direction

Status: UI planning baseline. This defines the visual direction and screen structure for a prototype. It does not authorize development, deployment, or live spreadsheet access.

## Design goal

BeanParts should feel like a focused workshop tool: clear, quick, and comfortable on a laptop or phone. The interface should prioritize projects, parts, requests, and approvals over decorative dashboards.

Use Team BEAN 1833's identity throughout the product, while keeping data tables easy to scan.

## Brand foundation

Source: Team 1833 Style Guide, last updated January 13, 2026.

### Name and logo

- Write the team name as Team BEAN 1833, Team BEAN, Team 1833, FRC 1833, or BEAN as permitted by the guide.
- Always capitalize BEAN.
- Use an approved transparent logo variation.
- On a light header, use the standard logo version intended to remain legible without a teal background.
- On a dark or teal surface, use an approved white or compatible standard variation.
- Never recreate, stretch, recolor, outline, crop, or place the logo on the gray demonstration background shown in the guide.
- Keep the logo compact in the app header. BeanParts is the product name; the Team BEAN 1833 logo identifies ownership.

The user supplied a PNG of the primary red-and-white BEAN 1833 logo for use as the starting product asset. Use it in the app header, sign-in screen, and favicon tests. The supplied file is a 512 x 512 RGBA PNG with transparency. Test its small-size legibility before using it as the final browser favicon. An SVG remains preferable for large or high-density displays; do not recreate the logo from the PDF.

### Colors

The labeled swatches in the guide show:
- Team teal: #1B97AD.
- Team red: #F34732.
- White: #FFFFFF.
- Black is also used in team and monochrome logo treatments.

The guide's paragraph above the swatches lists a different set of codes (#C1272D, #000000, and #FFFFFF). This conflicts with the labeled swatches and visible logos. The prototype should use #1B97AD and #F34732 as shown by the labeled swatches, but the team should correct or confirm the written guide before final implementation.

Proposed interface use:
- Teal: navigation selection, links, progress, focus, and identity.
- Red: limited brand accents plus warnings or actions needing attention.
- White and soft neutral gray: working surfaces and table backgrounds.
- Near-black/charcoal: readable text and optional dark mode.
- Derived darker teal/red tones: button text/background combinations that pass accessibility contrast checks.

Do not put small white text directly on the unadjusted teal or red unless the contrast check passes at the rendered size. Brand colors can remain exact for borders, icons, large graphics, and accents while accessible darker variants handle controls.

### Typography

- Poppins: all normal interface text, tables, forms, buttons, navigation, numbers, and most page titles.
- Poppins ExtraBold: primary page titles.
- Poppins SemiBold: section and table headings.
- Poppins Light Italic: short captions only.
- Chewy Regular: the BeanParts brand title, friendly empty states, or occasional project identity accents.

Chewy should not be used for long text, table headers, form labels, statuses, or important numbers. Those areas need Poppins for quick scanning. System fallbacks should be Arial and sans-serif so the app remains usable if a web font fails.

## Inspiration and limits

### FRCBOM patterns to adapt

- A clear project/subsystem context above the part list.
- Compact filters such as All, COTS, and In-house.
- Dense part tables with material, process, and quantity visible.
- Visible synchronization/freshness information.
- Progress and work queues close to the BOM.
- Direct language focused on what the shop needs to do.

BeanParts differs because Sheets remains the authoritative record and ordering is a core workflow. The interface must show spreadsheet freshness and save results, and must not imply that direct sheet use is obsolete.

### Match13 patterns to adapt

- A restrained top navigation bar.
- Prominent search near the data it filters.
- Fast, sortable, high-density tables.
- Compact year and mode selectors.
- Optional light and dark themes.
- Low visual clutter around the main dataset.

Do not copy Match13's sky background, mountain graphics, logo treatment, or exact layout. Do not copy FRCBOM's purple visual identity, wording, or marketing layout. BeanParts should use Team BEAN branding and its own task structure.

Reference review date: September 17, 2026.
- FRCBOM: https://frcbom.com/
- Match13: https://www.match13.com/

## Navigation

### Desktop

Use a slim top bar so wide BOM and order tables keep most of the screen.

Left to right:
1. Approved Team BEAN logo and BeanParts name.
2. Project switcher showing the current project, such as 2026 Onseason Robot.
3. Main sections for leads and mentors: Overview, BOM, Requests, Orders, Deliveries. Student accounts omit Requests.
4. Search.
5. Current role/account menu.

Settings appears in the account menu for admins. Mentor-only actions appear inside the relevant order screen, not as a separate mentor application.

### Mobile

Use:
- A compact top bar with logo and current project.
- Search/filter controls beneath the page title.
- Bottom navigation for Overview, BOM, Requests, and Orders for leads and mentors. Student accounts omit Requests.
- Deliveries and Settings under More when space is limited.

Tables should become stacked, information-dense rows. Each row shows the most useful three or four fields, with tap-to-expand details. Do not force users to horizontally scroll through a full desktop table for ordinary tasks.

## Screen plan

### 1. Sign in

- Team BEAN logo and BeanParts name.
- One clear Google sign-in action if approved during architecture.
- Short explanation that spreadsheet users may continue using Sheets.
- No large marketing page is needed for the private team application.

### 2. Projects

Default landing page after sign-in.

Show active projects grouped by year and season:
- 2026 Onseason Robot.
- 2026 Offseason Robot.
- 2026 Offseason Altmill Upgrade.

Each project row/card shows:
- Project name.
- Season and status.
- BOM part count.
- Items awaiting lead review.
- Orders awaiting mentor action.
- Latest spreadsheet refresh.

Use a compact list on desktop. Cards may be used on mobile. Avoid large generic statistic cards.

### 3. Project overview

A practical summary of the selected project:
- Needs review.
- Ready for mentor.
- Ordered but not fully delivered.
- Recent BOM changes.
- Quick links appropriate to the user's role. Student overviews do not show request queues or request links.

This screen is a work queue, not an analytics dashboard. Counts should link to the exact filtered records.

### 4. BOM

Primary view: a sortable, filterable table.

Proposed columns:
- Part / description.
- Subsystem or assembly.
- Type: purchased, manufactured, or assembly.
- Part number / revision where applicable.
- Quantity required.
- Review status.
- Order status or shortage when available.
- Last changed.
- Row actions appropriate to the user's role.

Filters:
- Subsystem/assembly.
- Part type.
- Review status.
- Order status.
- Source: Onshape or manual.
- Search by name/number.

Selecting a row opens a side panel on desktop or detail page on mobile with source, notes, review history, linked requests, and safe actions. Keep normal tables stable while details are open.

### 5. Requests

A queue organized by status:
- Needs lead review.
- Ready for mentor.
- Needs correction.
- Confirmed/closed.

The Requests screen is available to leads and mentors, not students. Leads can create or check requests, return a submission with a note, edit allowed fields, or confirm it. Only mentors can give final purchase confirmation. Students continue to submit BOM entries from the BOM screen.

Each row clearly shows:
- Requester.
- Project.
- Purpose.
- Vendor/part information when relevant.
- Quantity and expected cost.
- Current reviewer/action needed.
- Last update.

Use human labels such as Needs lead review instead of vague labels such as Processing.

### 6. Orders

An order contains one or more approved request lines and may serve several projects.

When creating a vendor order, a mentor first chooses the vendor and then individually selects the approved request lines and order quantities to include. BeanParts must not automatically include all pending items from that vendor. The builder shows each selected line's project and a running estimated subtotal before the order is created.

Order list shows:
- Vendor.
- Order identifier.
- Mentor status.
- Placed date.
- Cost.
- Delivery state.
- Invoice state.
- Projects represented.

Only mentors see enabled actions for final confirmation, Mark ordered, and Confirm invoice. Other users may view the permitted information with those actions disabled or absent. Do not rely on color alone to communicate permission.

### 7. Deliveries

Designed for quick use at the shop:
- Search by order, vendor, part, or project.
- Enter delivered quantity.
- Support partial delivery.
- Flag damaged or incorrect items.
- Leads and mentors can confirm delivery.
- Show remaining quantity immediately.

A delivery confirmation never changes the mentor purchase/invoice confirmation history.

### 8. Admin/settings

Admins manage:
- Members and role assignments.
- Project lifecycle.
- Spreadsheet connections and expected sheet structure.
- Onshape connections.
- Sync health and recovery.
- Display/theme preferences.

Admin does not automatically grant mentor purchase authority.

## Status language

Use the same plain labels in the app and Sheets.

Proposed BOM flow:
Draft -> Needs lead review -> Confirmed
                       -> Needs correction

Proposed order flow:
Draft -> Lead checked -> Ready for mentor -> Mentor confirmed -> Ordered
                                                            -> Partially delivered
                                                            -> Delivered

Invoice confirmation is a separate mentor field because an order can be delivered before its invoice work is complete.

Do not use Confirmed by itself where it could mean BOM review, purchase approval, delivery, or invoice review. Use the full phrase in important screens and history.

## Interaction style

- One obvious primary action per screen.
- Secondary actions use neutral outlined buttons or menus.
- Destructive/cancelling actions require clear wording and an ordinary confirmation step.
- Status chips are small and use both text and color.
- Show success only after the underlying spreadsheet write is verified.
- Show Last refreshed and a stale-data message when needed.
- If a direct Sheet edit conflicts with an app edit, stop the affected save and show both values for review.
- Use drawers/modals only for short tasks. Use full pages for complex order and BOM editing.
- Keep animations short and functional: opening panels, saving states, and row updates. Avoid floating gradients, glowing borders, glass-heavy layers, and decorative motion.
- Use familiar icons with visible labels for main actions. Do not make users guess from icons alone.

## Visual character

Target:
- Mostly white/light-neutral working surface with optional dark mode.
- Thin dividers and restrained shadows.
- Moderate corner radius, approximately 8-12px rather than fully rounded cards everywhere.
- Compact tables and controls.
- Teal active states and subtle teal tint backgrounds.
- Red used sparingly.
- Team logo and occasional Chewy text provide personality.
- Real project names and workshop vocabulary make the interface feel specific to Team BEAN.

Avoid:
- Large gradient hero sections inside the signed-in app.
- Rows of oversized metric cards.
- Excessive pill shapes.
- Generic sparkle/AI icons.
- Empty marketing copy.
- Every element using a different shade or radius.
- Hiding important operations inside unlabeled icon menus.

## Accessibility and responsiveness

- Meet WCAG AA contrast for normal text and controls.
- Visible keyboard focus.
- Minimum comfortable touch targets around 44px.
- Statuses include text, not color alone.
- Important actions work by keyboard.
- Forms keep labels visible after typing.
- Tables preserve headers while scrolling on desktop.
- Test common laptop widths and phone widths before approval.
- Provide a reduced-motion mode through the user's operating-system preference.

## Prototype scope

The first visual prototype should contain fake data for:
1. Projects page.
2. 2026 Onseason Robot overview.
3. BOM table and part detail.
4. Requests review queue.
5. Mentor order review.
6. Mobile BOM and delivery views.
7. Light and dark examples of one core screen.

The prototype should demonstrate student, lead, and mentor states for the same records. Student mode must hide the Requests navigation, request queues, and direct Requests route. It should not connect to live Sheets or Onshape.

## Inputs still needed

Before production UI implementation:
- The primary PNG is stored at assets/brand/bean-logo-primary.png. An SVG and approved alternate-color variants are still desirable.
- Confirmation of the palette-code discrepancy in the style guide.
- Any preference for light-only versus light and dark mode in the first release.
- Final workbook fields after the existing spreadsheets are inspected.

The stored logo is available for the fake-data prototype.

## Supplied logo handling

The supplied favicon.png visually matches the guide's primary red-and-white BEAN 1833 mark. Use the full mark at a readable size in the signed-in header and on the sign-in screen. For browser favicons and very small mobile icons, test 16px, 32px, and 48px renders; the 1833 numerals may become too small. If so, create a separately approved simplified favicon based on the same silhouette rather than altering the primary logo without approval.

Keep clear space around the irregular bean shape and preserve its proportions. Do not place it on red backgrounds. On teal or dark backgrounds, confirm the red outline and white lettering remain legible. The supplied file has been verified as a 512 x 512, 8-bit RGBA PNG with transparency and is stored at assets/brand/bean-logo-primary.png. Visual inspection confirms clean edges at its native size. Small-size favicon legibility still needs to be tested during the prototype.
