/* BeanParts fake-data prototype.
   Everything here runs in the browser with made-up records. Nothing is
   written to Google Sheets. Screen structure follows docs/UI-DIRECTION.md;
   presentation follows docs/UI-REFERENCE-STUDY.md. */
"use strict";

/* ------------------------------------------------------------------ */
/* Fake data                                                           */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  { id: "robot", name: "2026 Onseason Robot", season: "2026 Onseason", status: "Active", refreshed: "2 min ago" },
  { id: "offseason", name: "2026 Offseason Robot", season: "2026 Offseason", status: "Active", refreshed: "9 min ago" },
  { id: "altmill", name: "2026 Offseason Altmill Upgrade", season: "2026 Offseason", status: "Planning", refreshed: "Yesterday" },
];

const PEOPLE = {
  student: { name: "Maya R.", initials: "MR", role: "Student", email: "maya@team1833.example" },
  lead: { name: "Priya S.", initials: "PS", role: "Student lead", email: "priya@team1833.example" },
  mentor: { name: "Coach Dana", initials: "CD", role: "Mentor", email: "dana@team1833.example", admin: true },
};

const MEMBERS = [
  { name: "Coach Dana", role: "mentor", admin: true },
  { name: "Mr. Alvarez", role: "mentor", admin: false },
  { name: "Priya S.", role: "lead", admin: false },
  { name: "Owen T.", role: "lead", admin: false },
  { name: "Maya R.", role: "student", admin: false },
  { name: "Leo K.", role: "student", admin: false },
  { name: "Sam D.", role: "student", admin: true },
];

// review: Draft | Needs lead review | Confirmed | Needs correction
// order:  free text describing purchase / manufacturing state
const BOM = {
  robot: [
    { id: "BOM-0184", name: "Intake pivot plate", detail: "7075-T6 · 0.250 in", subsystem: "Intake", type: "Manufactured", pn: "1833-INT-042", rev: "C", qty: 2, review: "Needs lead review", order: "Ready to make", changed: "8 min ago", source: "Onshape", by: "Maya R.", notes: "Waterjet. Deburr edges before anodize.", history: [["Submitted for lead review", "Maya R. · 8 min ago"], ["Quantity changed 1 → 2", "Maya R. · 12 min ago"], ["Imported from Onshape", "Onshape sync · Yesterday"]] },
    { id: "BOM-0183", name: "Intake roller shaft", detail: "1/2 in hex · 7075", subsystem: "Intake", type: "Manufactured", pn: "1833-INT-043", rev: "A", qty: 2, review: "Draft", order: "Not started", changed: "14 min ago", source: "Onshape", by: "Maya R.", notes: "" },
    { id: "BOM-0179", name: "Kraken X60", detail: "Brushless motor", subsystem: "Shooter", type: "Purchased", pn: "WCP-0940", rev: "", qty: 4, review: "Confirmed", order: "Ordered", changed: "22 min ago", source: "Manual", by: "Priya S.", request: "REQ-1042", notes: "" },
    { id: "BOM-0168", name: "4 in. compliant wheel", detail: "35A · 1/2 in hex", subsystem: "Intake", type: "Purchased", pn: "am-4480_green", rev: "", qty: 12, review: "Confirmed", order: "Partially delivered (8 of 12)", changed: "1 hr ago", source: "Onshape", by: "Leo K.", sheetQty: 16, sheetEditor: "Owen T.", notes: "Green 35A. Spares in the parts bin." },
    { id: "BOM-0151", name: "Shooter hood assembly", detail: "8 components", subsystem: "Shooter", type: "Assembly", pn: "1833-SHT-010", rev: "B", qty: 1, review: "Confirmed", order: "3 parts needed", changed: "2 hr ago", source: "Onshape", by: "Priya S.", notes: "" },
    { id: "BOM-0147", name: "Hood flexure", detail: "Polycarbonate · 0.125 in", subsystem: "Shooter", type: "Manufactured", pn: "1833-SHT-014", rev: "A", qty: 2, review: "Needs correction", order: "Not started", changed: "2 hr ago", source: "Onshape", by: "Leo K.", note: "Add the material thickness and confirm whether this is laser cut or routed.", notes: "" },
    { id: "BOM-0142", name: "MK5n swerve module", detail: "L2 gearing · left", subsystem: "Drivetrain", type: "Assembly", pn: "WCP-0904", rev: "", qty: 2, review: "Confirmed", order: "In stock", changed: "Yesterday", source: "Manual", by: "Priya S.", notes: "" },
    { id: "BOM-0141", name: "MK5n swerve module", detail: "L2 gearing · right", subsystem: "Drivetrain", type: "Assembly", pn: "WCP-0905", rev: "", qty: 2, review: "Confirmed", order: "In stock", changed: "Yesterday", source: "Manual", by: "Priya S.", notes: "" },
    { id: "BOM-0137", name: "CANcoder", detail: "Absolute encoder", subsystem: "Drivetrain", type: "Purchased", pn: "CTRE 22-678682", rev: "", qty: 4, review: "Confirmed", order: "Delivered", changed: "Yesterday", source: "Manual", by: "Owen T.", notes: "" },
    { id: "BOM-0133", name: "Bellypan", detail: "6061 · 0.125 in sheet", subsystem: "Drivetrain", type: "Manufactured", pn: "1833-DRV-001", rev: "D", qty: 1, review: "Confirmed", order: "Made", changed: "2 days ago", source: "Onshape", by: "Priya S.", notes: "" },
    { id: "BOM-0128", name: "12 AWG silicone wire, red", detail: "25 ft", subsystem: "Electrical", type: "Purchased", pn: "REV-11-1163", rev: "", qty: 1, review: "Confirmed", order: "Requested", changed: "2 days ago", source: "Manual", by: "Sam D.", request: "REQ-1039", notes: "" },
    { id: "BOM-0127", name: "Power distribution hub", detail: "REV PDH", subsystem: "Electrical", type: "Purchased", pn: "REV-11-1850", rev: "", qty: 1, review: "Confirmed", order: "Delivered", changed: "3 days ago", source: "Manual", by: "Sam D.", notes: "" },
    { id: "BOM-0121", name: "Climber hook", detail: "7075 · 0.375 in", subsystem: "Climber", type: "Manufactured", pn: "1833-CLM-003", rev: "B", qty: 2, review: "Needs lead review", order: "Not started", changed: "3 days ago", source: "Onshape", by: "Leo K.", notes: "" },
    { id: "BOM-0118", name: "#25 roller chain", detail: "10 ft", subsystem: "Intake", type: "Purchased", pn: "am-0208", rev: "", qty: 1, review: "Confirmed", order: "Delivered", changed: "4 days ago", source: "Manual", by: "Maya R.", notes: "" },
    { id: "BOM-0112", name: "Radio mount", detail: "PETG print", subsystem: "Electrical", type: "Manufactured", pn: "1833-ELE-007", rev: "A", qty: 1, review: "Draft", order: "Not started", changed: "5 days ago", source: "Manual", by: "Sam D.", notes: "" },
    { id: "BOM-0104", name: "Thrifty elevator kit", detail: "Two-stage", subsystem: "Climber", type: "Assembly", pn: "TTB-0300", rev: "", qty: 1, review: "Confirmed", order: "Delivered", changed: "6 days ago", source: "Manual", by: "Coach Dana", request: "REQ-1035", notes: "" },
  ],
  offseason: [
    { id: "OFF-067", name: "Practice bumper frame", detail: "Plywood · 3/4 in", subsystem: "Bumpers", type: "Manufactured", pn: "1833-BMP-001", rev: "A", qty: 4, review: "Confirmed", order: "Made", changed: "3 days ago", source: "Manual", by: "Owen T.", notes: "" },
    { id: "OFF-066", name: "Pool noodles, 2.5 in", detail: "Bumper padding", subsystem: "Bumpers", type: "Purchased", pn: "", rev: "", qty: 12, review: "Confirmed", order: "Delivered", changed: "3 days ago", source: "Manual", by: "Owen T.", notes: "" },
    { id: "OFF-061", name: "NEO Vortex", detail: "Brushless motor", subsystem: "Drivetrain", type: "Purchased", pn: "REV-21-1652", rev: "", qty: 2, review: "Needs lead review", order: "Not requested", changed: "5 days ago", source: "Manual", by: "Owen T.", notes: "" },
    { id: "OFF-058", name: "Spark Flex", detail: "Motor controller", subsystem: "Drivetrain", type: "Purchased", pn: "REV-11-2159", rev: "", qty: 2, review: "Needs lead review", order: "Not requested", changed: "5 days ago", source: "Manual", by: "Owen T.", notes: "" },
    { id: "OFF-052", name: "Drive gearbox plate", detail: "6061 · 0.25 in", subsystem: "Drivetrain", type: "Manufactured", pn: "1833-ODR-004", rev: "B", qty: 2, review: "Confirmed", order: "Ready to make", changed: "1 wk ago", source: "Onshape", by: "Priya S.", notes: "" },
    { id: "OFF-049", name: "Vision camera mount", detail: "PETG print", subsystem: "Vision", type: "Manufactured", pn: "1833-VIS-002", rev: "A", qty: 1, review: "Needs correction", order: "Not started", changed: "1 wk ago", source: "Onshape", by: "Leo K.", note: "Which camera does this fit? Add the part reference.", notes: "" },
    { id: "OFF-044", name: "Limelight 4", detail: "Vision camera", subsystem: "Vision", type: "Purchased", pn: "LL4", rev: "", qty: 1, review: "Confirmed", order: "Requested", changed: "1 wk ago", source: "Manual", by: "Owen T.", request: "REQ-1044", notes: "" },
    { id: "OFF-031", name: "Battery cart", detail: "Welded frame", subsystem: "Pit", type: "Assembly", pn: "1833-PIT-010", rev: "A", qty: 1, review: "Confirmed", order: "In stock", changed: "2 wk ago", source: "Manual", by: "Coach Dana", notes: "" },
    { id: "OFF-030", name: "Battery", detail: "18 Ah SLA", subsystem: "Pit", type: "Purchased", pn: "am-3062", rev: "", qty: 2, review: "Confirmed", order: "Delivered", changed: "2 wk ago", source: "Manual", by: "Coach Dana", notes: "" },
  ],
  altmill: [
    { id: "ALT-029", name: "Spindle mount plate", detail: "6061 · 0.5 in", subsystem: "Spindle", type: "Manufactured", pn: "1833-ALT-001", rev: "A", qty: 1, review: "Draft", order: "Not started", changed: "Yesterday", source: "Onshape", by: "Priya S.", notes: "" },
    { id: "ALT-028", name: "80 mm spindle clamp", detail: "Aluminum", subsystem: "Spindle", type: "Purchased", pn: "", rev: "", qty: 1, review: "Draft", order: "Not requested", changed: "Yesterday", source: "Manual", by: "Priya S.", notes: "" },
    { id: "ALT-024", name: "Dust boot", detail: "3D print", subsystem: "Dust collection", type: "Manufactured", pn: "1833-ALT-004", rev: "A", qty: 1, review: "Needs lead review", order: "Not started", changed: "4 days ago", source: "Onshape", by: "Sam D.", notes: "" },
    { id: "ALT-021", name: "Vacuum hose, 2.5 in", detail: "20 ft", subsystem: "Dust collection", type: "Purchased", pn: "", rev: "", qty: 1, review: "Needs lead review", order: "Not requested", changed: "4 days ago", source: "Manual", by: "Sam D.", notes: "" },
    { id: "ALT-017", name: "Enclosure panel", detail: "Polycarbonate · 0.25 in", subsystem: "Enclosure", type: "Manufactured", pn: "1833-ALT-006", rev: "A", qty: 4, review: "Confirmed", order: "Ready to make", changed: "1 wk ago", source: "Onshape", by: "Priya S.", notes: "" },
    { id: "ALT-012", name: "Limit switch", detail: "Mechanical", subsystem: "Electrical", type: "Purchased", pn: "", rev: "", qty: 3, review: "Confirmed", order: "Delivered", changed: "2 wk ago", source: "Manual", by: "Coach Dana", notes: "" },
    { id: "ALT-008", name: "E-stop button", detail: "22 mm", subsystem: "Electrical", type: "Purchased", pn: "", rev: "", qty: 1, review: "Confirmed", order: "Delivered", changed: "2 wk ago", source: "Manual", by: "Coach Dana", notes: "" },
  ],
};

// Requests live in the central ordering workbook. projectId may be null (team stock).
// status: Needs lead review | Ready for mentor | Needs correction | Mentor confirmed | In vendor order | Ordered | Closed
const REQUESTS = [
  { id: "REQ-1048", item: "2 in. compliant wheels, 35A", vendor: "AndyMark", sku: "am-4481", qty: 6, unit: 7.99, requester: "Maya R.", projectId: "robot", purpose: "Intake spares for competition", status: "Needs lead review", updated: "12 min ago" },
  { id: "REQ-1047", item: "Kraken X60 (spare)", vendor: "WestCoast Products", sku: "WCP-0940", qty: 1, unit: 219.99, requester: "Priya S.", projectId: "robot", purpose: "Spare shooter motor", status: "Ready for mentor", updated: "35 min ago" },
  { id: "REQ-1046", item: "Polycarbonate sheet 1/8 in, 24 × 48", vendor: "McMaster-Carr", sku: "8574K28", qty: 2, unit: 41.6, requester: "Leo K.", projectId: "robot", purpose: "Hood flexures and guards", status: "Needs lead review", updated: "1 hr ago" },
  { id: "REQ-1045", item: "1/2 in hex shaft, 36 in", vendor: "WestCoast Products", sku: "WCP-0424", qty: 4, unit: 12.99, requester: "Maya R.", projectId: "robot", purpose: "Intake rollers", status: "Needs correction", note: "Which length? Onshape shows 24 in for the roller shaft.", updated: "2 hr ago" },
  { id: "REQ-1044", item: "Limelight 4", vendor: "Limelight", sku: "LL4", qty: 1, unit: 449, requester: "Owen T.", projectId: "offseason", purpose: "Vision testing platform", status: "Ready for mentor", updated: "3 hr ago" },
  { id: "REQ-1043", item: "PETG filament, black, 1 kg", vendor: "Amazon", sku: "", qty: 3, unit: 21.99, requester: "Sam D.", projectId: null, purpose: "Team stock for printers", status: "Needs lead review", updated: "5 hr ago" },
  { id: "REQ-1042", item: "Kraken X60", vendor: "WestCoast Products", sku: "WCP-0940", qty: 4, unit: 219.99, requester: "Priya S.", projectId: "robot", purpose: "Shooter motors", status: "Ordered", orderId: "WCP-2941", updated: "Yesterday" },
  { id: "REQ-1041", item: "M4 socket head cap screws (100)", vendor: "McMaster-Carr", sku: "91290A180", qty: 2, unit: 9.85, requester: "Leo K.", projectId: "robot", purpose: "General assembly", status: "Mentor confirmed", updated: "Yesterday" },
  { id: "REQ-1040", item: "30 A breakers", vendor: "REV Robotics", sku: "REV-11-1860", qty: 6, unit: 3.5, requester: "Owen T.", projectId: "offseason", purpose: "Practice bot electrical", status: "Mentor confirmed", updated: "Yesterday" },
  { id: "REQ-1039", item: "12 AWG silicone wire, red, 25 ft", vendor: "REV Robotics", sku: "REV-11-1163", qty: 1, unit: 14.99, requester: "Sam D.", projectId: "robot", purpose: "Main power runs", status: "Mentor confirmed", updated: "2 days ago" },
  { id: "REQ-1038", item: "Bearing, 1/2 in hex bore (10 pack)", vendor: "WestCoast Products", sku: "WCP-0224", qty: 2, unit: 34.99, requester: "Priya S.", projectId: "robot", purpose: "Intake and shooter shafts", status: "Mentor confirmed", updated: "2 days ago" },
  { id: "REQ-1037", item: "Shop towels (case)", vendor: "Amazon", sku: "", qty: 1, unit: 24.99, requester: "Sam D.", projectId: null, purpose: "Shop supplies", status: "Closed", updated: "3 days ago" },
  { id: "REQ-1035", item: "Thrifty elevator kit", vendor: "Thrifty Bot", sku: "TTB-0300", qty: 1, unit: 389, requester: "Coach Dana", projectId: "robot", purpose: "Climber", status: "Closed", orderId: "TTB-0117", updated: "6 days ago" },
  { id: "REQ-1033", item: "NEO Vortex", vendor: "REV Robotics", sku: "REV-21-1652", qty: 2, unit: 95, requester: "Owen T.", projectId: "offseason", purpose: "Practice drivetrain", status: "Needs correction", note: "Confirm whether 2 or 4 are needed for the practice drivetrain.", updated: "1 wk ago" },
];

// status: Mentor confirmed (not yet placed) | Ordered | Partially delivered | Delivered
// invoice: Not received | Needs mentor confirmation | Confirmed
const ORDERS = [
  { id: "WCP-2941", vendor: "WestCoast Products", status: "Ordered", placed: "Sep 18", invoice: "Needs mentor confirmation", lines: [{ desc: "Kraken X60", sku: "WCP-0940", qty: 4, received: 0, unit: 219.99, projectId: "robot", bomId: "BOM-0179", requestId: "REQ-1042" }, { desc: "Kraken X60 Talon FX cable", sku: "WCP-0961", qty: 4, received: 0, unit: 36.25, projectId: "robot" }] },
  { id: "MC-7781", vendor: "McMaster-Carr", status: "Partially delivered", placed: "Sep 15", invoice: "Confirmed", lines: [{ desc: "7075 plate, 12 × 12 × 0.25 in", sku: "9057K13", qty: 2, received: 2, unit: 64.15, projectId: "robot" }, { desc: "1/2 in hex shaft, 24 in", sku: "8975K11", qty: 4, received: 2, unit: 12.72, projectId: "robot" }, { desc: "Polycarbonate sheet 1/8 in", sku: "8574K28", qty: 1, received: 0, unit: 35.2, projectId: "offseason" }] },
  { id: "AM-3306", vendor: "AndyMark", status: "Partially delivered", placed: "Sep 12", invoice: "Confirmed", lines: [{ desc: "4 in. compliant wheel, 35A", sku: "am-4480_green", qty: 12, received: 8, unit: 9.99, projectId: "robot", bomId: "BOM-0168" }, { desc: "#25 roller chain, 10 ft", sku: "am-0208", qty: 1, received: 1, unit: 24, projectId: "robot", bomId: "BOM-0118" }] },
  { id: "REV-1048", vendor: "REV Robotics", status: "Partially delivered", placed: "Sep 14", invoice: "Not received", lines: [{ desc: "Power distribution hub", sku: "REV-11-1850", qty: 1, received: 1, unit: 249, projectId: "robot", bomId: "BOM-0127" }, { desc: "Spark Flex", sku: "REV-11-2159", qty: 2, received: 0, unit: 69.6, projectId: "offseason", bomId: "OFF-058" }] },
  { id: "TTB-0117", vendor: "Thrifty Bot", status: "Delivered", placed: "Sep 10", invoice: "Confirmed", lines: [{ desc: "Thrifty elevator kit", sku: "TTB-0300", qty: 1, received: 1, unit: 389, projectId: "robot", bomId: "BOM-0104", requestId: "REQ-1035" }] },
  { id: "CTRE-0552", vendor: "CTR Electronics", status: "Delivered", placed: "Sep 8", invoice: "Confirmed", lines: [{ desc: "CANcoder", sku: "22-678682", qty: 4, received: 4, unit: 59.99, projectId: "robot", bomId: "BOM-0137" }] },
];

// AutomationDirect covered orders: separate workflow, no invoice, no team cost.
// status: Needs lead review | Needs mentor approval | Approved | Submitted to AD | Delivered
const AD_ORDERS = [
  { id: "AD-0013", pn: "ZL-DIN-RAIL-35", desc: "35 mm DIN rail, 1 m", qty: 2, value: 6.5, projectId: "robot", status: "Needs lead review", by: "Sam D.", note: "For the new electrical board" },
  { id: "AD-0012", pn: "PSB24-060S", desc: "24 V 2.5 A power supply", qty: 1, value: 48, projectId: "robot", status: "Needs mentor approval", by: "Sam D.", note: "" },
  { id: "AD-0011", pn: "ECX1010", desc: "Limit switch, roller lever", qty: 3, value: 12.5, projectId: "altmill", status: "Approved", by: "Priya S.", note: "" },
  { id: "AD-0010", pn: "GCX1131", desc: "E-stop, 22 mm, twist release", qty: 1, value: 18, projectId: "altmill", status: "Submitted to AD", by: "Priya S.", note: "" },
  { id: "AD-0009", pn: "AND-20", desc: "Push button, green", qty: 2, value: 9.6, projectId: "altmill", status: "Delivered", by: "Coach Dana", note: "" },
];

const ACTIVITY = {
  robot: [
    ["Maya R. submitted Intake pivot plate for lead review", "8 min ago"],
    ["Priya S. checked REQ-1047 Kraken X60 (spare)", "35 min ago"],
    ["Owen T. edited 4 in. compliant wheel quantity directly in the BOM sheet", "1 hr ago"],
    ["Leo K. returned Hood flexure for correction", "2 hr ago"],
    ["Coach Dana marked WCP-2941 as ordered", "Yesterday"],
  ],
  offseason: [
    ["Owen T. added NEO Vortex and Spark Flex", "5 days ago"],
    ["Priya S. returned Vision camera mount for correction", "1 wk ago"],
    ["Coach Dana confirmed REQ-1040 30 A breakers", "Yesterday"],
  ],
  altmill: [
    ["Priya S. added Spindle mount plate from Onshape", "Yesterday"],
    ["Sam D. submitted Dust boot for lead review", "4 days ago"],
    ["Coach Dana approved AD-0011 limit switches", "1 wk ago"],
  ],
};

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

const STORAGE = "beanparts-prototype";
const state = {
  signedIn: false,
  role: "lead",
  projectId: "robot",
  theme: "system",
  loading: false,
  refreshedAt: Date.now() - 2 * 60000,
  bom: { q: "", type: "all", subsystem: "all", review: "all" },
  reqTab: "all",
  orderScope: "project",
  deliveryQ: "",
  receiving: null,
  conflict: null,
  toastTimer: null,
};

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE) || "{}");
    for (const k of ["signedIn", "role", "projectId", "theme"]) if (k in saved) state[k] = saved[k];
  } catch (e) { /* storage unavailable: keep defaults */ }
}
function savePrefs() {
  try {
    localStorage.setItem(STORAGE, JSON.stringify({ signedIn: state.signedIn, role: state.role, projectId: state.projectId, theme: state.theme }));
  } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const project = () => PROJECTS.find((p) => p.id === state.projectId);
const projectName = (id) => (id ? (PROJECTS.find((p) => p.id === id) || {}).name || id : "No project (team stock)");
const me = () => PEOPLE[state.role];
const isReviewer = () => state.role === "lead" || state.role === "mentor";
const isMentor = () => state.role === "mentor";
const isAdmin = () => Boolean(me().admin);
const bomFor = (id = state.projectId) => BOM[id];
const findBom = (id) => Object.values(BOM).flat().find((b) => b.id === id);
const findRequest = (id) => REQUESTS.find((r) => r.id === id);
const findOrder = (id) => ORDERS.find((o) => o.id === id);
const lineTotal = (o) => o.lines.reduce((s, l) => s + l.qty * l.unit, 0);
const orderProjects = (o) => [...new Set(o.lines.map((l) => l.projectId))];
const orderRemaining = (o) => o.lines.reduce((s, l) => s + (l.qty - l.received), 0);

function chipClass(status) {
  const s = status.toLowerCase();
  if (/^(confirmed|delivered|made|in stock|closed)/.test(s)) return "ok";
  if (/needs (lead|mentor)|partially|not received/.test(s)) return "warn";
  if (/correction/.test(s)) return "bad";
  if (/ready for mentor|mentor confirmed|ordered|requested|ready to make|submitted|approved|in vendor order|parts needed/.test(s)) return "info";
  return "";
}
const chip = (status, extra = "") => `<span class="chip ${chipClass(status)} ${extra}">${esc(status)}</span>`;

function relativeRefreshed() {
  const mins = Math.round((Date.now() - state.refreshedAt) / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} min ago`;
  return `${Math.round(mins / 60)} hr ago`;
}
const isStale = () => Date.now() - state.refreshedAt > 10 * 60000;

function freshness() {
  return `<div class="freshness ${isStale() ? "stale" : ""}"><span class="dot" aria-hidden="true"></span>
    <span>${isStale() ? "Data may be out of date · " : ""}Last refreshed ${relativeRefreshed()}</span>
    <button type="button" data-action="refresh">Refresh</button></div>`;
}

function toast(message, kind = "ok") {
  const el = $("#toast");
  el.className = `toast ${kind}`;
  el.innerHTML = `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${kind === "ok" ? '<path d="m5 12 5 5L20 7"/>' : '<path d="M12 8v5M12 16h.01M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>'}</svg><span>${esc(message)}</span>`;
  el.hidden = false;
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => { el.hidden = true; }, 3600);
}

// Pretend to write to Sheets: show the pending state, then apply and report
// success only after the "verified" delay. Buttons are disabled meanwhile.
function simulateSave(button, apply, message = "Saved · verified in Sheets") {
  if (button) { button.classList.add("busy"); button.disabled = true; button.setAttribute("aria-busy", "true"); }
  const form = button ? button.closest("form") : null;
  if (form) form.querySelectorAll("button").forEach((b) => (b.disabled = true));
  setTimeout(() => { apply(); render(); if (message) toast(message); }, 800);
}

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

function parseRoute() {
  const raw = location.hash.replace(/^#/, "");
  const [pathPart, query = ""] = raw.split("?");
  const [page = "", id = ""] = pathPart.split("/");
  const params = Object.fromEntries(new URLSearchParams(query));
  return { page: page || "projects", id: decodeURIComponent(id), params };
}
function go(hash) { location.hash = hash; }

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */

function applyTheme() {
  const root = document.documentElement;
  if (state.theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", state.theme);
}

function render() {
  applyTheme();
  const route = parseRoute();
  const view = $("#view");
  const topbar = $("#topbar");
  const bottomnav = $("#bottomnav");

  if (!state.signedIn) {
    topbar.hidden = true; bottomnav.hidden = true;
    view.innerHTML = renderSignIn();
    return;
  }
  topbar.hidden = false; bottomnav.hidden = false;
  renderChrome(route);

  if (state.loading) { view.innerHTML = renderSkeleton(); return; }

  const pages = { projects: renderProjects, overview: renderOverview, bom: renderBom, requests: renderRequests, orders: renderOrders, deliveries: renderDeliveries, settings: renderSettings, search: renderSearch };
  const fn = pages[route.page] || renderProjects;
  if (route.page === "requests" && !isReviewer()) { view.innerHTML = renderDenied(); return; }
  view.innerHTML = fn(route);
}

function renderChrome(route) {
  $("#projectSwitchName").textContent = project().name;
  $("#rolePreview").value = state.role;
  $("#accountInitials").textContent = me().initials;
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const current = a.dataset.nav === route.page;
    if (current) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    if (a.dataset.needs === "reviewer") a.hidden = !isReviewer();
  });
  $("#projectMenu").innerHTML = `<div class="menu-heading">Switch project</div>` + PROJECTS.map((p) => `
    <button type="button" class="menu-item" role="option" data-action="switch-project" data-id="${p.id}" aria-selected="${p.id === state.projectId}">
      <span class="stack"><strong>${esc(p.name)}</strong><small>${esc(p.status)} · ${bomFor(p.id).length} BOM lines</small></span></button>`).join("") +
    `<div class="menu-sep"></div><a class="menu-item" href="#projects">All projects</a>`;
  $("#accountMenu").innerHTML = `
    <div class="menu-note"><strong>${esc(me().name)}</strong><br>${esc(me().role)}${isAdmin() ? " · Admin" : ""}</div>
    <div class="menu-sep"></div>
    <a class="menu-item" href="#settings" role="menuitem">Settings</a>
    <div class="theme-row"><span>Theme</span>${themeSegment()}</div>
    <div class="menu-sep"></div>
    <button type="button" class="menu-item" role="menuitem" data-action="sign-out">Sign out</button>`;
}

function themeSegment() {
  return `<div class="segmented" role="group" aria-label="Theme">${["system", "light", "dark"].map((t) => `<button type="button" data-action="theme" data-value="${t}" aria-pressed="${state.theme === t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div>`;
}

function renderSkeleton() {
  return `<div class="page-head"><div><h1>Loading ${esc(project().name)}…</h1><p class="context">Reading this project's workbook.</p></div></div>
    <div class="panel" aria-busy="true"><div class="skeleton">${'<span style="width:60%"></span><span style="width:85%"></span><span style="width:72%"></span><span style="width:90%"></span><span style="width:55%"></span>'}</div></div>`;
}

function pageHead(title, context, actions = "") {
  return `<div class="page-head"><div><h1>${title}</h1>${context ? `<p class="context">${context}</p>` : ""}</div>${actions ? `<div class="page-actions">${actions}</div>` : ""}</div>`;
}

/* ---------- sign in ---------- */

function renderSignIn() {
  return `<div class="signin"><div class="signin-card">
    <img src="./bean-logo-primary.png" alt="Team BEAN 1833" />
    <div><div class="wordmark">BeanParts</div><p>Parts, requests, and orders for Team BEAN 1833.</p></div>
    <button type="button" class="btn primary" data-action="sign-in">
      <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M21 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1z"/><path d="M12 21c2.4 0 4.5-.8 6-2.2l-3.1-2.4c-.8.6-1.9.9-2.9.9-2.3 0-4.2-1.5-4.9-3.6H4v2.4A9 9 0 0 0 12 21z"/><path d="M7.1 13.7a5.4 5.4 0 0 1 0-3.4V7.9H4a9 9 0 0 0 0 8.2l3.1-2.4z"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3L18.1 5A9 9 0 0 0 4 7.9l3.1 2.4c.7-2.1 2.6-3.7 4.9-3.7z"/></svg>
      Sign in with Google</button>
    <p class="small">Your team Google account identifies you. Your BeanParts role decides what you can do.</p>
    <p class="caption">The spreadsheets keep working as they always have. BeanParts reads and writes the same workbooks.</p>
  </div></div>`;
}

/* ---------- projects ---------- */

function renderProjects() {
  const seasons = [...new Set(PROJECTS.map((p) => p.season))];
  return pageHead("Projects", "Choose a project to see its BOM, requests, and orders.") +
    `<div class="project-groups">` + seasons.map((season) => `
      <section><h2 class="section-title">${esc(season)}</h2><div class="panel">${PROJECTS.filter((p) => p.season === season).map(projectRow).join("")}</div></section>`).join("") + `</div>`;
}

function projectRow(p) {
  const bom = bomFor(p.id);
  const review = bom.filter((b) => b.review === "Needs lead review").length;
  const mentor = REQUESTS.filter((r) => r.projectId === p.id && r.status === "Ready for mentor").length;
  const stat = (label, value, cls = "") => `<span class="stat ${cls}"><span>${label}</span><strong>${value}</strong></span>`;
  return `<a class="project-row" href="#overview" data-action="open-project" data-id="${p.id}">
    <span><span class="name">${esc(p.name)}</span><span class="sub">${esc(p.status)} · ${bom.length} BOM parts</span></span>
    ${stat("BOM parts", bom.length)}
    ${isReviewer() ? stat("Awaiting lead review", review) : stat("Your drafts", bom.filter((b) => b.review === "Draft" && b.by === me().name).length)}
    ${stat("Awaiting mentor", isReviewer() ? mentor : "—", "optional")}
    ${stat("Sheet refreshed", p.refreshed, "optional")}
    ${chip(p.status, "plain")}</a>`;
}

/* ---------- overview ---------- */

function renderOverview() {
  const bom = bomFor();
  const pid = state.projectId;
  const mine = (b) => b.by === me().name;
  const q = (label, sub, n, href) => `<a class="queue-row" href="${href}"><span><strong>${label}</strong><small>${sub}</small></span><span class="n ${n === 0 ? "zero" : ""}">${n}</span><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></a>`;

  let queues = "";
  if (state.role === "student") {
    queues =
      q("Your drafts to submit", "BOM parts you added but haven't sent for lead review", bom.filter((b) => b.review === "Draft" && mine(b)).length, "#bom?review=Draft") +
      q("Your entries needing correction", "A lead asked for a change before confirming", bom.filter((b) => b.review === "Needs correction" && mine(b)).length, "#bom?review=Needs%20correction") +
      q("Parts on order", "Purchased parts ordered or partly delivered", bom.filter((b) => /ordered|partially/i.test(b.order)).length, "#bom?type=Purchased");
  } else {
    queues =
      q("BOM entries needing lead review", "Check part details before confirming", bom.filter((b) => b.review === "Needs lead review").length, "#bom?review=Needs%20lead%20review") +
      q("Requests needing lead review", "Student requests waiting to be checked", REQUESTS.filter((r) => r.projectId === pid && r.status === "Needs lead review").length, "#requests?tab=Needs%20lead%20review") +
      q("Ready for mentor", isMentor() ? "Your final purchase confirmation is needed" : "Checked and waiting for a mentor", REQUESTS.filter((r) => r.projectId === pid && r.status === "Ready for mentor").length, "#requests?tab=Ready%20for%20mentor") +
      q("Confirmed, not yet in a vendor order", isMentor() ? "Build a vendor order from these lines" : "A mentor will add these to a vendor order", REQUESTS.filter((r) => r.projectId === pid && r.status === "Mentor confirmed").length, "#requests?tab=Mentor%20confirmed") +
      q("Ordered but not fully delivered", "Orders with parts still arriving", ORDERS.filter((o) => orderProjects(o).includes(pid) && orderRemaining(o) > 0 && o.status !== "Mentor confirmed").length, "#deliveries");
    if (isMentor()) {
      queues += q("Invoices needing confirmation", "Confirm invoice details after the vendor bills", ORDERS.filter((o) => orderProjects(o).includes(pid) && o.invoice === "Needs mentor confirmation").length, "#orders");
      queues += q("AutomationDirect requests to approve", "Covered by AD · separate from team spending", AD_ORDERS.filter((a) => a.projectId === pid && a.status === "Needs mentor approval").length, "#orders");
    }
  }

  const confirmed = bom.filter((b) => b.review === "Confirmed").length;
  const pct = Math.round((confirmed / bom.length) * 100);
  const spend = ORDERS.filter((o) => orderProjects(o).includes(pid)).reduce((s, o) => s + o.lines.filter((l) => l.projectId === pid).reduce((t, l) => t + l.qty * l.unit, 0), 0);
  const activity = ACTIVITY[pid] || [];

  return pageHead(esc(project().name), "What needs attention right now.", freshness()) +
    `<div class="overview">
      <section class="panel" aria-labelledby="queueTitle"><div class="panel-head"><h2 id="queueTitle">${state.role === "student" ? "Your work" : "Work queues"}</h2><span class="small muted">${esc(me().role)} view</span></div>${queues}</section>
      <div style="display:grid;gap:var(--s4)">
        <section class="panel" aria-labelledby="bomHealth"><div class="panel-head"><h2 id="bomHealth">BOM review</h2><a class="btn quiet small" href="#bom">Open BOM</a></div>
          <div class="panel-body">
            <div style="display:flex;justify-content:space-between"><span class="muted">Confirmed entries</span><strong class="num">${confirmed} / ${bom.length}</strong></div>
            <div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="BOM entries confirmed"><span style="width:${pct}%"></span></div>
            <dl class="kv" style="padding:0">
              <dt>Needs lead review</dt><dd>${bom.filter((b) => b.review === "Needs lead review").length}</dd>
              <dt>Needs correction</dt><dd>${bom.filter((b) => b.review === "Needs correction").length}</dd>
              <dt>Drafts</dt><dd>${bom.filter((b) => b.review === "Draft").length}</dd>
              ${isReviewer() ? `<dt>Team spending on this project</dt><dd>${money(spend)}</dd>` : ""}
            </dl>
          </div></section>
        <section class="panel activity" aria-labelledby="activityTitle"><div class="panel-head"><h2 id="activityTitle">Recent changes</h2></div>
          <ul>${activity.map(([text, when]) => `<li><span>${esc(text)}</span><small>${esc(when)}</small></li>`).join("")}</ul></section>
      </div>
    </div>`;
}

/* ---------- BOM ---------- */

function renderBom(route) {
  const f = state.bom;
  if (route.params.review) f.review = route.params.review;
  if (route.params.type) f.type = route.params.type;
  if (route.params.q !== undefined) f.q = route.params.q;
  const all = bomFor();
  const subsystems = [...new Set(all.map((b) => b.subsystem))];
  const q = f.q.trim().toLowerCase();
  const items = all.filter((b) =>
    (f.type === "all" || b.type === f.type) &&
    (f.subsystem === "all" || b.subsystem === f.subsystem) &&
    (f.review === "all" || b.review === f.review) &&
    (!q || `${b.name} ${b.detail} ${b.pn} ${b.subsystem}`.toLowerCase().includes(q)));
  const filtered = f.type !== "all" || f.subsystem !== "all" || f.review !== "all" || q;
  const selected = route.id ? findBom(route.id) : null;

  const toolbar = `<div class="toolbar" role="search">
    <label class="search"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="bomSearch" type="search" placeholder="Search parts or part numbers" value="${esc(f.q)}" aria-label="Search BOM" /></label>
    <div class="segmented" role="group" aria-label="Part type">${["all", "Purchased", "Manufactured", "Assembly"].map((t) => `<button type="button" data-action="bom-type" data-value="${t}" aria-pressed="${f.type === t}">${t === "all" ? "All" : t === "Assembly" ? "Assemblies" : t}</button>`).join("")}</div>
    <select class="select" id="bomSubsystem" aria-label="Subsystem"><option value="all">All subsystems</option>${subsystems.map((s) => `<option ${f.subsystem === s ? "selected" : ""}>${esc(s)}</option>`).join("")}</select>
    <select class="select" id="bomReview" aria-label="Review status"><option value="all">Any review status</option>${["Draft", "Needs lead review", "Needs correction", "Confirmed"].map((s) => `<option ${f.review === s ? "selected" : ""}>${s}</option>`).join("")}</select>
    ${filtered ? `<button type="button" class="btn quiet small" data-action="bom-clear">Clear filters</button>` : ""}
  </div>`;

  const cols = `<tr><th>Part</th><th>Subsystem</th><th>Type</th><th>Part no. / rev</th><th class="num">Qty</th><th>Review</th><th>Order state</th><th>Changed</th></tr>`;
  const rows = items.map((b) => `<tr data-open="#bom/${b.id}" aria-selected="${selected && selected.id === b.id}" tabindex="0">
      <td><span class="primary">${esc(b.name)}</span><span class="sub">${esc(b.detail)}</span></td>
      <td>${esc(b.subsystem)}</td><td>${esc(b.type)}</td>
      <td>${b.pn ? esc(b.pn) + (b.rev ? ` <span class="muted">Rev ${esc(b.rev)}</span>` : "") : '<span class="faint">—</span>'}</td>
      <td class="num">${b.qty}</td><td>${chip(b.review)}</td><td>${chip(b.order)}</td><td class="muted small nowrap">${esc(b.changed)}</td></tr>`).join("");
  const mobile = items.map((b) => `<button type="button" class="row" data-open="#bom/${b.id}">
      <span><span class="primary">${esc(b.name)}</span><br><span class="sub">${esc(b.subsystem)} · ${esc(b.type)}</span></span>
      <span class="right">${chip(b.review)}</span>
      <span class="meta"><span>Qty <b>${b.qty}</b></span><span>${esc(b.order)}</span></span></button>`).join("");

  const empty = items.length ? "" : (filtered
    ? `<div class="empty"><h3>No parts match these filters</h3><p>Try a different search or clear the filters.</p><button type="button" class="btn small" data-action="bom-clear">Clear filters</button></div>`
    : `<div class="empty friendly"><h3>Nothing here yet</h3><p>This project's BOM is empty. Add the first part or import from Onshape later.</p><button type="button" class="btn primary small" data-action="dialog" data-value="add-part">Add BOM part</button></div>`);

  const main = `<section class="work-main">${toolbar}<div class="panel">
      <div class="table-wrap"><table class="table"><thead>${cols}</thead><tbody>${rows}</tbody></table></div>
      <div class="rows">${mobile}</div>${empty}
      <div class="panel-foot"><span>${items.length} of ${all.length} lines${filtered ? " (filtered)" : ""}</span><span>Source: project BOM workbook</span></div>
    </div></section>`;

  const actions = `<button type="button" class="btn primary" data-action="dialog" data-value="add-part"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Add BOM part</button>`;
  const head = selected ? `<a class="crumb" href="#bom"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>Bill of materials</a>` : "";
  return head + pageHead("Bill of materials", `${all.length} lines in ${esc(project().name)}. ${freshnessInline()}`, actions) +
    `<div class="work ${selected ? "has-aside" : ""}">${main}${selected ? `<aside class="aside" aria-label="Part details">${renderBomDetail(selected)}</aside>` : ""}</div>`;
}

function freshnessInline() {
  return `<span class="${isStale() ? "warning" : ""}">Last refreshed ${relativeRefreshed()}.</span> <button type="button" class="btn quiet small" data-action="refresh" style="min-height:24px;padding:0 6px">Refresh</button>`;
}

function renderBomDetail(b) {
  const mine = b.by === me().name;
  const canEditQty = isReviewer() || (mine && (b.review === "Draft" || b.review === "Needs correction"));
  const history = b.history || [[`${b.review === "Confirmed" ? "Confirmed by lead" : "Added"}`, `${b.by} · ${b.changed}`], b.source === "Onshape" ? ["Imported from Onshape", "Onshape sync"] : ["Added manually", b.by]];
  const conflict = state.conflict && state.conflict.id === b.id ? state.conflict : null;

  let actions = "";
  if (b.review === "Needs lead review" && isReviewer()) actions = `<button type="button" class="btn primary" data-action="bom-confirm" data-id="${b.id}">Confirm entry</button><button type="button" class="btn" data-action="dialog" data-value="return-bom" data-id="${b.id}">Return with note</button>`;
  else if (b.review === "Draft" && (mine || isReviewer())) actions = `<button type="button" class="btn primary" data-action="bom-submit" data-id="${b.id}">Submit for lead review</button>`;
  else if (b.review === "Needs correction" && (mine || isReviewer())) actions = `<button type="button" class="btn primary" data-action="bom-submit" data-id="${b.id}">Resubmit for lead review</button>`;
  else if (b.review === "Needs lead review" && !isReviewer()) actions = `<p class="muted small">Waiting for a student lead to check this entry.</p>`;
  if (b.request && isReviewer()) actions += `<a class="btn" href="#requests/${b.request}">Open request ${b.request}</a>`;

  const qtyBlock = conflict
    ? `<div class="callout warn"><div><strong>The BOM sheet changed while you were editing</strong><p>${esc(b.sheetEditor)} edited this row directly in Google Sheets. Choose which quantity to keep. Your entry was not saved yet.</p></div></div>
       <form class="conflict" data-form="conflict" data-id="${b.id}" style="margin-top:var(--s3)">
         <div class="conflict-row">
           <label><input type="radio" name="pick" value="sheet" checked><span>Current sheet value · ${esc(b.sheetEditor)}</span><strong>${b.sheetQty}</strong></label>
           <label><input type="radio" name="pick" value="mine"><span>Your value</span><strong>${conflict.mine}</strong></label>
         </div>
         <div class="actions"><button type="submit" class="btn primary">Save chosen value</button><button type="button" class="btn" data-action="conflict-cancel">Cancel</button></div>
       </form>`
    : canEditQty
      ? `<form class="qty-edit" data-form="qty" data-id="${b.id}"><label class="sr-only" for="qty-${b.id}">Quantity</label><input id="qty-${b.id}" name="qty" type="number" min="1" value="${b.qty}" inputmode="numeric" /><button type="submit" class="btn small">Save quantity</button></form>`
      : `<dl class="props"><div><dt>Quantity</dt><dd>${b.qty}</dd></div></dl>`;

  return `<div class="panel">
    <a class="detail-close" href="#bom" aria-label="Close details">×</a>
    <div class="detail-head"><span class="eyebrow">${esc(b.id)} · ${esc(b.subsystem)}</span><h2>${esc(b.name)}</h2><span class="muted">${esc(b.detail)}</span><div class="chips">${chip(b.review)}${chip(b.order)}</div></div>
    ${b.review === "Needs correction" && b.note ? `<div class="detail-section"><div class="callout bad"><div><strong>Returned for correction</strong><p>${esc(b.note)}</p></div></div></div>` : ""}
    <div class="detail-section"><h3>Details</h3><dl class="props">
      <div><dt>Type</dt><dd>${esc(b.type)}</dd></div><div><dt>Source</dt><dd>${esc(b.source)}</dd></div>
      <div><dt>Part number</dt><dd>${esc(b.pn || "—")}</dd></div><div><dt>Revision</dt><dd>${esc(b.rev || "—")}</dd></div>
      <div><dt>Added by</dt><dd>${esc(b.by)}</dd></div><div><dt>Last changed</dt><dd>${esc(b.changed)}</dd></div>
      ${b.notes ? `<div class="wide"><dt>Notes</dt><dd style="font-weight:400">${esc(b.notes)}</dd></div>` : ""}
    </dl></div>
    <div class="detail-section"><h3>Quantity required</h3>${qtyBlock}</div>
    ${actions ? `<div class="detail-section"><h3>Actions</h3><div class="actions">${actions}</div></div>` : ""}
    <div class="detail-section"><h3>History</h3><ul class="timeline">${history.map(([t, s]) => `<li><span class="mark" aria-hidden="true"></span><span><strong>${esc(t)}</strong><small>${esc(s)}</small></span></li>`).join("")}</ul></div>
  </div>`;
}

/* ---------- requests ---------- */

const REQ_TABS = ["all", "Needs lead review", "Ready for mentor", "Needs correction", "Mentor confirmed", "Ordered", "Closed"];

function renderRequests(route) {
  if (route.params.tab) state.reqTab = route.params.tab;
  const pid = state.projectId;
  const all = REQUESTS.filter((r) => r.projectId === pid || r.projectId === null);
  const tabItems = (t) => all.filter((r) => t === "all" ? true : t === "Ordered" ? (r.status === "Ordered" || r.status === "In vendor order") : r.status === t);
  const items = tabItems(state.reqTab);
  const selected = route.id ? findRequest(route.id) : null;

  const tabs = `<div class="tabs" role="tablist" aria-label="Request status">${REQ_TABS.map((t) => `<button type="button" role="tab" aria-selected="${state.reqTab === t}" data-action="req-tab" data-value="${t}">${t === "all" ? "All" : t}<span class="count">${tabItems(t).length}</span></button>`).join("")}</div>`;
  const cols = `<tr><th>Request</th><th>Requester</th><th>Project</th><th>Vendor</th><th class="num">Qty</th><th class="num">Est. cost</th><th>Status</th><th>Updated</th></tr>`;
  const rows = items.map((r) => `<tr data-open="#requests/${r.id}" aria-selected="${selected && selected.id === r.id}" tabindex="0">
      <td><span class="primary">${esc(r.item)}</span><span class="sub">${r.id} · ${esc(r.purpose)}</span></td>
      <td>${esc(r.requester)}</td><td class="small">${esc(projectName(r.projectId))}</td><td>${esc(r.vendor)}</td>
      <td class="num">${r.qty}</td><td class="num">${money(r.qty * r.unit)}</td><td>${chip(r.status)}</td><td class="muted small nowrap">${esc(r.updated)}</td></tr>`).join("");
  const mobile = items.map((r) => `<button type="button" class="row" data-open="#requests/${r.id}">
      <span><span class="primary">${esc(r.item)}</span><br><span class="sub">${esc(r.requester)} · ${esc(r.vendor)}</span></span>
      <span class="right">${chip(r.status)}</span>
      <span class="meta"><span>Qty <b>${r.qty}</b></span><span>Est. <b>${money(r.qty * r.unit)}</b></span></span></button>`).join("");
  const empty = items.length ? "" : (all.length
    ? `<div class="empty"><h3>No requests with this status</h3><p>Pick another status above.</p></div>`
    : `<div class="empty friendly"><h3>No requests yet</h3><p>Nothing has been requested for ${esc(project().name)}. Students add parts from the BOM; leads and mentors create order requests here.</p><button type="button" class="btn primary small" data-action="dialog" data-value="new-request">New order request</button></div>`);

  const main = `<section class="work-main">${tabs}<div class="panel">
      <div class="table-wrap"><table class="table"><thead>${cols}</thead><tbody>${rows}</tbody></table></div><div class="rows">${mobile}</div>${empty}
      <div class="panel-foot"><span>${items.length} request${items.length === 1 ? "" : "s"} · team-stock requests included</span><span>Source: ordering workbook · Robot Parts</span></div></div></section>`;
  const head = selected ? `<a class="crumb" href="#requests"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>Requests</a>` : "";
  return head + pageHead("Requests", `Student requests are checked by a lead, then a mentor gives final purchase confirmation. ${freshnessInline()}`,
    `<button type="button" class="btn primary" data-action="dialog" data-value="new-request">New order request</button>`) +
    `<div class="work ${selected ? "has-aside" : ""}">${main}${selected ? `<aside class="aside" aria-label="Request details">${renderRequestDetail(selected)}</aside>` : ""}</div>`;
}

function renderRequestDetail(r) {
  let actions = "", note = "";
  if (r.status === "Needs lead review" || r.status === "Needs correction") {
    actions = `<button type="button" class="btn primary" data-action="req-check" data-id="${r.id}">Mark checked · ready for mentor</button><button type="button" class="btn" data-action="dialog" data-value="return-request" data-id="${r.id}">Return with note</button>`;
  } else if (r.status === "Ready for mentor") {
    actions = isMentor()
      ? `<button type="button" class="btn primary" data-action="req-approve" data-id="${r.id}">Give final purchase confirmation</button><button type="button" class="btn" data-action="dialog" data-value="return-request" data-id="${r.id}">Return with note</button>`
      : `<p class="muted small">Checked. Waiting for a mentor's final purchase confirmation.</p>`;
  } else if (r.status === "Mentor confirmed") {
    note = isMentor() ? `<button type="button" class="btn" data-action="dialog" data-value="vendor-order">Create vendor order</button>` : `<p class="muted small">Purchase confirmed. A mentor will add this to a vendor order.</p>`;
  } else if (r.orderId) {
    note = `<a class="btn" href="#orders/${r.orderId}">Open order ${esc(r.orderId)}</a>`;
  }
  const bom = Object.values(BOM).flat().find((b) => b.request === r.id);
  return `<div class="panel">
    <a class="detail-close" href="#requests" aria-label="Close details">×</a>
    <div class="detail-head"><span class="eyebrow">${r.id} · ${esc(projectName(r.projectId))}</span><h2>${esc(r.item)}</h2><span class="muted">${esc(r.purpose)}</span><div class="chips">${chip(r.status)}</div></div>
    ${r.status === "Needs correction" && r.note ? `<div class="detail-section"><div class="callout bad"><div><strong>Returned for correction</strong><p>${esc(r.note)}</p></div></div></div>` : ""}
    <div class="detail-section"><h3>Order details</h3><dl class="props">
      <div><dt>Vendor</dt><dd>${esc(r.vendor)}</dd></div><div><dt>Vendor part no.</dt><dd>${esc(r.sku || "—")}</dd></div>
      <div><dt>Quantity</dt><dd>${r.qty}</dd></div><div><dt>Unit cost</dt><dd>${money(r.unit)}</dd></div>
      <div><dt>Estimated total</dt><dd>${money(r.qty * r.unit)}</dd></div><div><dt>Requested by</dt><dd>${esc(r.requester)}</dd></div>
      ${bom ? `<div class="wide"><dt>Linked BOM entry</dt><dd><a href="#bom/${bom.id}">${esc(bom.name)} · ${bom.id}</a></dd></div>` : ""}
    </dl></div>
    ${actions || note ? `<div class="detail-section"><h3>${actions ? "Review" : "Next step"}</h3><div class="actions">${actions}${note}</div></div>` : ""}
    <div class="detail-section"><p class="caption">Final purchase confirmation is a mentor-only action. Marking checked never places an order.</p></div>
  </div>`;
}

/* ---------- orders ---------- */

function renderOrders(route) {
  if (route.params.scope) state.orderScope = route.params.scope;
  const pid = state.projectId;
  const items = ORDERS.filter((o) => state.orderScope === "all" || orderProjects(o).includes(pid));
  const selected = route.id ? findOrder(route.id) : null;
  const deliveryText = (o) => o.status === "Mentor confirmed" ? "Not placed yet" : orderRemaining(o) === 0 ? "Delivered" : o.lines.some((l) => l.received > 0) ? "Partially delivered" : "Not delivered";
  const cols = `<tr><th>Vendor / order</th><th>Projects</th><th>Status</th><th>Placed</th><th class="num">Total</th><th>Delivery</th><th>Invoice</th></tr>`;
  const rows = items.map((o) => `<tr data-open="#orders/${o.id}" aria-selected="${selected && selected.id === o.id}" tabindex="0">
      <td><span class="primary">${esc(o.vendor)}</span><span class="sub">${o.id} · ${o.lines.length} line${o.lines.length === 1 ? "" : "s"}</span></td>
      <td class="small">${orderProjects(o).map(projectName).map(esc).join("<br>")}</td><td>${chip(o.status)}</td><td class="muted nowrap">${esc(o.placed || "—")}</td>
      <td class="num">${money(lineTotal(o))}</td><td>${chip(deliveryText(o))}</td><td>${chip(o.invoice)}</td></tr>`).join("");
  const mobile = items.map((o) => `<button type="button" class="row" data-open="#orders/${o.id}">
      <span><span class="primary">${esc(o.vendor)}</span><br><span class="sub">${o.id} · ${esc(o.placed || "Not placed")}</span></span>
      <span class="right">${chip(o.status)}</span>
      <span class="meta"><span>Total <b>${money(lineTotal(o))}</b></span><span>${esc(deliveryText(o))}</span><span>Invoice: ${esc(o.invoice)}</span></span></button>`).join("");
  const empty = items.length ? "" : `<div class="empty"><h3>No orders include ${esc(project().name)}</h3><p>Vendor orders can serve several projects. Show all team orders to see the rest.</p><button type="button" class="btn small" data-action="order-scope" data-value="all">Show all team orders</button></div>`;

  const scope = `<div class="toolbar"><div class="segmented" role="group" aria-label="Which orders"><button type="button" data-action="order-scope" data-value="project" aria-pressed="${state.orderScope === "project"}">Includes this project</button><button type="button" data-action="order-scope" data-value="all" aria-pressed="${state.orderScope === "all"}">All team orders</button></div>
    ${isMentor() ? "" : `<span class="small muted">Only mentors can confirm purchases, mark orders placed, and confirm invoices.</span>`}</div>`;

  const teamSpend = ORDERS.reduce((s, o) => s + lineTotal(o), 0);
  const main = `<section class="work-main">${scope}<div class="panel">
      <div class="table-wrap"><table class="table"><thead>${cols}</thead><tbody>${rows}</tbody></table></div><div class="rows">${mobile}</div>${empty}
      <div class="panel-foot"><span>${items.length} order${items.length === 1 ? "" : "s"} · Team spending across all orders ${money(teamSpend)}</span><span>Source: ordering workbook · Invoices</span></div></div>
    ${renderAdSection()}</section>`;
  const head = selected ? `<a class="crumb" href="#orders"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>Orders</a>` : "";
  const actions = isMentor() ? `<button type="button" class="btn primary" data-action="dialog" data-value="vendor-order">Create vendor order</button>` : "";
  return head + pageHead("Orders", `Vendor orders paid from the team budget. ${freshnessInline()}`, actions) +
    `<div class="work ${selected ? "has-aside" : ""}">${main}${selected ? `<aside class="aside" aria-label="Order details">${renderOrderDetail(selected)}</aside>` : ""}</div>`;
}

function renderOrderDetail(o) {
  let actions = "";
  if (isMentor()) {
    if (o.status === "Mentor confirmed") actions += `<button type="button" class="btn primary" data-action="order-placed" data-id="${o.id}">Mark as ordered</button>`;
    if (o.invoice === "Needs mentor confirmation") actions += `<button type="button" class="btn ${o.status === "Mentor confirmed" ? "" : "primary"}" data-action="invoice-confirm" data-id="${o.id}">Confirm invoice details</button>`;
    if (o.invoice === "Not received" && o.status !== "Mentor confirmed") actions += `<button type="button" class="btn" data-action="invoice-received" data-id="${o.id}">Invoice received</button>`;
  } else {
    actions = `<p class="muted small">Mentor actions (mark ordered, confirm invoice) are not available for your role.</p>`;
  }
  if (orderRemaining(o) > 0 && o.status !== "Mentor confirmed" && isReviewer()) actions += `<a class="btn" href="#deliveries?q=${encodeURIComponent(o.id)}">Receive parts</a>`;
  return `<div class="panel">
    <a class="detail-close" href="#orders" aria-label="Close details">×</a>
    <div class="detail-head"><span class="eyebrow">${o.id}</span><h2>${esc(o.vendor)}</h2><span class="muted">${orderProjects(o).map(projectName).map(esc).join(" · ")}</span><div class="chips">${chip(o.status)}${chip("Invoice: " + o.invoice)}</div></div>
    <div class="detail-section"><h3>Order</h3><dl class="props">
      <div><dt>Placed</dt><dd>${esc(o.placed || "Not yet")}</dd></div><div><dt>Total</dt><dd>${money(lineTotal(o))}</dd></div>
      <div><dt>Lines</dt><dd>${o.lines.length}</dd></div><div><dt>Still to receive</dt><dd>${orderRemaining(o)} item${orderRemaining(o) === 1 ? "" : "s"}</dd></div>
    </dl></div>
    <div class="detail-section"><h3>Lines</h3><div class="stack-list" style="margin:0 calc(-1 * var(--s4))">${o.lines.map((l) => `<div class="delivery-line"><span><span class="primary" style="font-weight:600">${esc(l.desc)}</span><br><span class="small muted">${esc(l.sku)} · ${esc(projectName(l.projectId))}${l.issue ? ` · <span class="chip bad">${esc(l.issue)}</span>` : ""}</span></span><span class="remaining"><strong>${l.received} / ${l.qty}</strong><small>${money(l.qty * l.unit)}</small></span></div>`).join("")}</div></div>
    <div class="detail-section"><h3>Actions</h3><div class="actions">${actions}</div></div>
    <div class="detail-section"><p class="caption">Delivery confirmations never change the purchase or invoice confirmation history.</p></div>
  </div>`;
}

function renderAdSection() {
  const pid = state.projectId;
  const items = AD_ORDERS.filter((a) => state.orderScope === "all" || a.projectId === pid);
  const covered = AD_ORDERS.reduce((s, a) => s + a.qty * a.value, 0);
  const action = (a) => {
    if (a.status === "Needs lead review" && isReviewer()) return `<button type="button" class="btn small" data-action="ad-check" data-id="${a.id}">Mark checked</button>`;
    if (a.status === "Needs mentor approval" && isMentor()) return `<button type="button" class="btn small primary" data-action="ad-approve" data-id="${a.id}">Approve</button>`;
    if (a.status === "Approved" && isMentor()) return `<button type="button" class="btn small" data-action="ad-submit" data-id="${a.id}">Mark submitted to AD</button>`;
    if (a.status === "Submitted to AD" && isReviewer()) return `<button type="button" class="btn small" data-action="ad-delivered" data-id="${a.id}">Confirm delivered</button>`;
    return "";
  };
  const cols = `<tr><th>AutomationDirect part</th><th>Project</th><th class="num">Qty</th><th class="num">Covered value</th><th>Status</th><th><span class="sr-only">Action</span></th></tr>`;
  const rows = items.map((a) => `<tr><td><span class="primary">${esc(a.desc)}</span><span class="sub">${esc(a.pn)} · ${a.id} · ${esc(a.by)}</span></td><td class="small">${esc(projectName(a.projectId))}</td><td class="num">${a.qty}</td><td class="num">${money(a.qty * a.value)}</td><td>${chip(a.status)}</td><td style="text-align:right">${action(a)}</td></tr>`).join("");
  const mobile = items.map((a) => `<div class="row"><span><span class="primary">${esc(a.desc)}</span><br><span class="sub">${esc(a.pn)} · ${esc(projectName(a.projectId))}</span></span><span class="right">${chip(a.status)}</span><span class="meta"><span>Qty <b>${a.qty}</b></span><span>Value <b>${money(a.qty * a.value)}</b></span>${action(a)}</span></div>`).join("");
  return `<section class="panel ad-panel" style="margin-top:var(--s5)" aria-labelledby="adTitle">
    <div class="panel-head"><h2 id="adTitle">AutomationDirect covered orders</h2>${isReviewer() ? `<button type="button" class="btn small" data-action="dialog" data-value="new-ad">New AD request</button>` : ""}</div>
    <div class="ad-note">A separate workflow. AutomationDirect covers these parts, so their value is tracked apart from team spending and there is no invoice step. Lead check and mentor approval still apply; only mentors mark an order as submitted.</div>
    <div class="table-wrap"><table class="table"><thead>${cols}</thead><tbody>${rows}</tbody></table></div><div class="rows">${mobile}</div>
    ${items.length ? "" : `<div class="empty"><h3>No AD requests for this project</h3><p>Show all team orders to see other projects' AD requests.</p></div>`}
    <div class="panel-foot"><span>Covered value, all projects: ${money(covered)}</span><span>Team cost: ${money(0)} · not part of team spending</span></div></section>`;
}

/* ---------- deliveries ---------- */

function renderDeliveries(route) {
  if (route.params.q !== undefined) state.deliveryQ = route.params.q;
  const q = state.deliveryQ.trim().toLowerCase();
  const open = ORDERS.filter((o) => o.status !== "Mentor confirmed" && orderRemaining(o) > 0);
  const items = open.filter((o) => !q || `${o.id} ${o.vendor} ${o.lines.map((l) => l.desc + " " + projectName(l.projectId)).join(" ")}`.toLowerCase().includes(q));
  const cards = items.map((o) => {
    const total = o.lines.reduce((s, l) => s + l.qty, 0);
    const got = o.lines.reduce((s, l) => s + l.received, 0);
    return `<section class="panel" aria-label="${esc(o.vendor)} ${o.id}">
      <div class="panel-head"><div><h2>${esc(o.vendor)} <span class="muted small" style="font-weight:400">${o.id}</span></h2><span class="small muted">Placed ${esc(o.placed)} · ${orderProjects(o).map(projectName).map(esc).join(", ")}</span></div><span class="num small muted">${got} of ${total} received</span></div>
      <div class="progress" aria-hidden="true"><span style="width:${Math.round((got / total) * 100)}%"></span></div>
      <div class="stack-list">${o.lines.map((l, i) => renderDeliveryLine(o, l, i)).join("")}</div></section>`;
  }).join("");
  return pageHead("Deliveries", `Check in parts as they arrive. Partial deliveries are fine; the remaining quantity updates right away. ${freshnessInline()}`) +
    `<div class="toolbar"><label class="search"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input id="deliverySearch" type="search" placeholder="Search order, vendor, part, or project" value="${esc(state.deliveryQ)}" aria-label="Search deliveries" /></label>
      ${isReviewer() ? "" : `<span class="small muted">Leads and mentors confirm deliveries. You can see what is still expected.</span>`}</div>
    ${items.length ? `<div class="delivery-grid">${cards}</div>` : `<div class="panel"><div class="empty ${open.length ? "" : "friendly"}"><h3>${open.length ? "No open orders match" : "Everything has arrived"}</h3><p>${open.length ? "Try another search." : "No orders are waiting on parts right now."}</p>${open.length ? `<button type="button" class="btn small" data-action="delivery-clear">Clear search</button>` : ""}</div></div>`}`;
}

function renderDeliveryLine(o, l, i) {
  const remaining = l.qty - l.received;
  const key = `${o.id}:${i}`;
  const receiving = state.receiving === key;
  const done = remaining === 0;
  let control = "";
  if (!done && isReviewer()) {
    control = receiving
      ? `<form class="receive" data-form="receive" data-order="${o.id}" data-line="${i}">
          <label class="field"><span>Received</span><input name="qty" type="number" min="1" max="${remaining}" value="${remaining}" inputmode="numeric" required /></label>
          <label class="field"><span>Condition</span><select name="condition" class="select"><option>Correct and undamaged</option><option>Damaged</option><option>Wrong item</option></select></label>
          <div class="actions"><button type="submit" class="btn primary">Confirm</button><button type="button" class="btn" data-action="receive-cancel">Cancel</button></div></form>`
      : `<div class="actions" style="margin-top:var(--s2)"><button type="button" class="btn small" data-action="receive" data-value="${key}">Receive</button></div>`;
  }
  return `<div><div class="delivery-line"><span><span style="font-weight:600">${esc(l.desc)}</span><br><span class="small muted">${esc(l.sku)} · ${esc(projectName(l.projectId))}</span>${l.issue ? ` <span class="chip bad">${esc(l.issue)}</span>` : ""}</span>
    <span class="remaining"><strong>${done ? "Complete" : `${remaining} remaining`}</strong><small>${l.received} of ${l.qty} received</small></span></div>${control}</div>`;
}

/* ---------- settings ---------- */

function renderSettings() {
  const p = me();
  const members = `<div class="stack-list">${MEMBERS.map((m) => `<div class="member-row"><span><strong>${esc(m.name)}</strong>${m.admin ? ` <span class="chip plain">Admin</span>` : ""}</span>
      ${isMentor() ? `<select class="select" aria-label="Role for ${esc(m.name)}" data-member="${esc(m.name)}"><option value="student" ${m.role === "student" ? "selected" : ""}>Student</option><option value="lead" ${m.role === "lead" ? "selected" : ""}>Student lead</option><option value="mentor" ${m.role === "mentor" ? "selected" : ""}>Mentor</option></select>` : `<span class="muted">${m.role === "lead" ? "Student lead" : m.role[0].toUpperCase() + m.role.slice(1)}</span>`}
      ${isMentor() ? `<button type="button" class="btn quiet small remove" data-action="member-remove" data-id="${esc(m.name)}">Remove</button>` : "<span></span>"}</div>`).join("")}</div>`;
  return pageHead("Settings", "") + `<div class="settings">
    <section class="panel"><div class="panel-head"><h2>Your account</h2></div><dl class="kv"><dt>Name</dt><dd>${esc(p.name)}</dd><dt>Google account</dt><dd>${esc(p.email)}</dd><dt>BeanParts role</dt><dd>${esc(p.role)}${p.admin ? " · Admin" : ""}</dd></dl></section>
    <section class="panel"><div class="panel-head"><h2>Appearance</h2></div><div class="panel-body"><div class="theme-row" style="padding:0"><span>Theme</span>${themeSegment()}</div><p class="small muted" style="margin-top:var(--s3)">System follows your device setting. Reduced-motion is respected automatically.</p></div></section>
    <section class="panel"><div class="panel-head"><h2>Members and roles</h2>${isMentor() ? `<button type="button" class="btn small" data-action="dialog" data-value="add-member">Add member</button>` : `<span class="small muted">Mentors manage membership</span>`}</div>${members}
      <div class="panel-foot"><span>Only mentors change roles. Admin is a technical add-on and grants no purchasing authority.</span></div></section>
    ${isReviewer() ? `<section class="panel"><div class="panel-head"><h2>Projects</h2>${isMentor() ? `<button type="button" class="btn small" data-action="dialog" data-value="new-project">New project</button>` : ""}</div><div class="stack-list">${PROJECTS.map((pr) => `<div style="display:flex;justify-content:space-between;gap:var(--s3)"><span><strong>${esc(pr.name)}</strong><br><span class="small muted">BOM workbook · refreshed ${esc(pr.refreshed)}</span></span>${chip(pr.status, "plain")}</div>`).join("")}</div></section>` : ""}
    ${isAdmin() ? `<section class="panel"><div class="panel-head"><h2>Technical settings</h2><span class="chip plain">Admin</span></div>
      <div class="stack-list">
        <div style="display:flex;justify-content:space-between;gap:var(--s3)"><span><strong>BeanParts Control workbook</strong><br><span class="small muted">Projects, members, settings · checked 2 min ago</span></span>${chip("Connected")}</div>
        <div style="display:flex;justify-content:space-between;gap:var(--s3)"><span><strong>Ordering workbook</strong><br><span class="small muted">Robot Parts, Invoices, AD Order List · checked 2 min ago</span></span>${chip("Connected")}</div>
        <div style="display:flex;justify-content:space-between;gap:var(--s3)"><span><strong>Project BOM workbooks</strong><br><span class="small muted">3 registered · expected columns verified</span></span>${chip("Connected")}</div>
        <div style="display:flex;justify-content:space-between;gap:var(--s3)"><span><strong>Onshape import</strong><br><span class="small muted">Deferred until after v1</span></span>${chip("Not configured")}</div>
      </div><div class="panel-foot"><span>Sync health and recovery tools will live here.</span></div></section>` : ""}
  </div>`;
}

/* ---------- search ---------- */

function renderSearch(route) {
  const q = (route.params.q || "").trim();
  const ql = q.toLowerCase();
  const hit = (s) => s.toLowerCase().includes(ql);
  const bom = ql ? bomFor().filter((b) => hit(`${b.name} ${b.detail} ${b.pn} ${b.id} ${b.subsystem}`)) : [];
  const reqs = ql && isReviewer() ? REQUESTS.filter((r) => hit(`${r.item} ${r.vendor} ${r.sku} ${r.id} ${r.requester}`)) : [];
  const orders = ql ? ORDERS.filter((o) => hit(`${o.id} ${o.vendor} ${o.lines.map((l) => l.desc).join(" ")}`)) : [];
  const group = (title, items, fn) => items.length ? `<section class="panel"><div class="panel-head"><h2>${title} <span class="count">${items.length}</span></h2></div><div class="stack-list">${items.map(fn).join("")}</div></section>` : "";
  const link = (href, main, sub, right) => `<a class="queue-row" href="${href}" style="grid-template-columns:minmax(0,1fr) auto"><span><strong>${main}</strong><small>${sub}</small></span>${right}</a>`;
  const body = group("BOM parts", bom, (b) => link(`#bom/${b.id}`, esc(b.name), `${b.id} · ${esc(b.subsystem)}`, chip(b.review))) +
    group("Requests", reqs, (r) => link(`#requests/${r.id}`, esc(r.item), `${r.id} · ${esc(r.requester)} · ${esc(projectName(r.projectId))}`, chip(r.status))) +
    group("Orders", orders, (o) => link(`#orders/${o.id}`, esc(o.vendor), `${o.id} · ${money(lineTotal(o))}`, chip(o.status)));
  return pageHead(q ? `Results for “${esc(q)}”` : "Search", `Searching ${esc(project().name)} BOM${isReviewer() ? ", requests," : ""} and team orders.`) +
    `<div class="results">${body || `<div class="panel"><div class="empty"><h3>${q ? "Nothing matched" : "Type to search"}</h3><p>${q ? "Check the spelling or try a part number." : "Search parts, requests, and orders from the box in the top bar."}</p></div></div>`}</div>`;
}

/* ---------- denied ---------- */

function renderDenied() {
  return pageHead("Requests") + `<div class="panel denied"><div class="empty"><h3>Requests are reviewed by student leads and mentors</h3><p>Your account is a Student account, so this page isn't available. To request a part, add it to the BOM and submit it for lead review, or ask a lead.</p><div class="actions"><a class="btn primary" href="#bom">Go to the BOM</a><a class="btn" href="#overview">Back to overview</a></div></div></div>`;
}

/* ------------------------------------------------------------------ */
/* Dialogs                                                             */
/* ------------------------------------------------------------------ */

function openDialog(kind, id) {
  const host = $("#dialogHost");
  const builders = { "add-part": dlgAddPart, "new-request": dlgNewRequest, "return-bom": () => dlgReturn("bom", id), "return-request": () => dlgReturn("request", id), "vendor-order": dlgVendorOrder, "new-ad": dlgNewAd, "add-member": dlgAddMember, "new-project": dlgNewProject };
  host.innerHTML = builders[kind] ? builders[kind]() : "";
  const dlg = host.querySelector("dialog");
  if (!dlg) return;
  dlg.addEventListener("close", () => { host.innerHTML = ""; });
  dlg.showModal();
  if (kind === "vendor-order") updateBuilder();
}
const closeDialog = () => { const d = $("#dialogHost dialog"); if (d) d.close(); };

function dialogShell(title, intro, body, footer, cls = "", form = "") {
  return `<dialog class="dialog ${cls}"><form method="dialog" data-form="${form}" novalidate>
    <div class="dialog-head"><div><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ""}</div><button type="button" class="detail-close" style="position:static" data-action="close-dialog" aria-label="Close">×</button></div>
    <div class="dialog-body">${body}</div><div class="dialog-foot">${footer}</div></form></dialog>`;
}
const field = (label, input, cls = "", hint = "") => `<label class="field ${cls}"><span>${label}</span>${input}${hint ? `<span class="hint">${hint}</span>` : ""}</label>`;
const projectOptions = (allowNone) => PROJECTS.map((p) => `<option value="${p.id}" ${p.id === state.projectId ? "selected" : ""}>${esc(p.name)}</option>`).join("") + (allowNone ? `<option value="">No project (team stock)</option>` : "");

function dlgAddPart() {
  const subsystems = [...new Set(bomFor().map((b) => b.subsystem))];
  return dialogShell("Add BOM part", `Added to <strong>${esc(project().name)}</strong> as a draft. Submit it for lead review when the details are complete.`,
    `<div class="form">
      ${field("Part name", `<input id="ap-name" name="name" required placeholder="e.g. Intake pivot plate" />`, "wide")}
      ${field("Subsystem", `<select id="ap-subsystem" name="subsystem">${subsystems.map((s) => `<option>${esc(s)}</option>`).join("")}</select>`)}
      ${field("Type", `<select id="ap-type" name="type"><option>Manufactured</option><option>Purchased</option><option>Assembly</option></select>`)}
      ${field("Quantity", `<input id="ap-qty" name="qty" type="number" min="1" value="1" inputmode="numeric" />`)}
      ${field("Part number / revision", `<input id="ap-pn" name="pn" placeholder="Optional" />`)}
      ${field("Notes", `<textarea id="ap-notes" name="notes" rows="3" placeholder="Material, source, or manufacturing notes"></textarea>`, "wide")}
      <label class="field wide" style="grid-template-columns:auto 1fr;align-items:center;gap:var(--s2)"><input id="ap-submit" name="submit" type="checkbox" style="width:20px;min-height:0;height:20px;accent-color:var(--accent-strong)" /><span style="font-weight:500;color:var(--text)">Submit for lead review right away</span></label>
    </div>`,
    `<button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Add to BOM</button>`, "", "add-part");
}

function dlgNewRequest() {
  return dialogShell("New order request", `You are a ${esc(me().role.toLowerCase())}, so this goes straight to <strong>Ready for mentor</strong>. A mentor still gives final purchase confirmation.`,
    `<div class="form">
      ${field("Item", `<input id="nr-item" name="item" required placeholder="e.g. 2 in. compliant wheels, 35A" />`, "wide")}
      ${field("Vendor", `<input id="nr-vendor" name="vendor" required placeholder="e.g. AndyMark" />`)}
      ${field("Vendor part number", `<input id="nr-sku" name="sku" placeholder="Optional" />`)}
      ${field("Quantity", `<input id="nr-qty" name="qty" type="number" min="1" value="1" inputmode="numeric" />`)}
      ${field("Estimated unit cost", `<input id="nr-unit" name="unit" type="number" min="0" step="0.01" placeholder="0.00" inputmode="decimal" />`)}
      ${field("Project", `<select id="nr-project" name="projectId">${projectOptions(true)}</select>`, "wide")}
      ${field("What is it for?", `<textarea id="nr-purpose" name="purpose" rows="2" placeholder="Short reason a mentor can understand"></textarea>`, "wide")}
    </div>`,
    `<button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save request</button>`, "", "new-request");
}

function dlgReturn(kind, id) {
  const item = kind === "bom" ? findBom(id) : findRequest(id);
  return dialogShell("Return with a note", `Tell ${esc(item.by || item.requester)} what to fix. The ${kind === "bom" ? "entry" : "request"} moves to <strong>Needs correction</strong>.`,
    `<div class="form">${field("Note to requester", `<textarea id="ret-note" name="note" rows="3" required placeholder="e.g. Which length? Onshape shows 24 in."></textarea>`, "wide")}</div>`,
    `<button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary" data-kind="${kind}" data-id="${id}">Return for correction</button>`, "", "return");
}

function eligibleLines() { return REQUESTS.filter((r) => r.status === "Mentor confirmed" && !r.orderId); }

function dlgVendorOrder() {
  const vendors = [...new Set(eligibleLines().map((r) => r.vendor))];
  if (!vendors.length) return dialogShell("Create vendor order", "", `<div class="empty" style="padding:0"><h3>No lines are waiting</h3><p>A vendor order is built from requests that already have mentor confirmation. None are waiting right now.</p></div>`, `<button type="button" class="btn primary" data-action="close-dialog">Close</button>`);
  return dialogShell("Create vendor order", "Pick the vendor, then choose exactly which confirmed lines and quantities go in this order. Lines from this vendor are never added automatically.",
    `${field("Vendor", `<select id="vo-vendor" name="vendor" class="select" style="height:44px">${vendors.map((v) => `<option>${esc(v)}</option>`).join("")}</select>`)}
     <div style="margin-top:var(--s4)"><div class="builder-head"><span></span><span>Confirmed request line</span><span class="num">Order qty</span><span class="num">Line total</span></div><div class="builder-list" id="vo-lines"></div>
     <div class="builder-sum"><span><strong id="vo-count">0</strong> lines selected</span><span>Estimated subtotal <strong id="vo-total">${money(0)}</strong></span></div></div>`,
    `<span class="left">Creating an order does not mark it as placed.</span><button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary" id="vo-create" disabled>Create order with selected lines</button>`, "wide", "vendor-order");
}

function updateBuilder() {
  const dlg = $("#dialogHost dialog"); if (!dlg) return;
  const vendor = $("#vo-vendor").value;
  const list = $("#vo-lines");
  const rendered = list.dataset.vendor === vendor;
  if (!rendered) {
    list.dataset.vendor = vendor;
    list.innerHTML = eligibleLines().filter((r) => r.vendor === vendor).map((r) => `<div class="builder-line">
      <input type="checkbox" id="vo-pick-${r.id}" data-id="${r.id}" aria-label="Include ${esc(r.item)}" />
      <label for="vo-pick-${r.id}"><span style="font-weight:600">${esc(r.item)}</span><br><span class="who">${r.id} · ${esc(r.requester)} · ${esc(projectName(r.projectId))} · ${money(r.unit)} each</span></label>
      <input type="number" min="1" max="${r.qty}" value="${r.qty}" id="vo-qty-${r.id}" data-qty="${r.id}" aria-label="Order quantity for ${esc(r.item)}" disabled />
      <span class="num cost" data-cost="${r.id}">${money(0)}</span></div>`).join("");
  }
  let count = 0, total = 0;
  list.querySelectorAll("input[type=checkbox]").forEach((cb) => {
    const r = findRequest(cb.dataset.id);
    const qtyEl = list.querySelector(`[data-qty="${r.id}"]`);
    qtyEl.disabled = !cb.checked;
    const line = cb.checked ? Math.max(1, Number(qtyEl.value) || 1) * r.unit : 0;
    list.querySelector(`[data-cost="${r.id}"]`).textContent = money(line);
    if (cb.checked) { count += 1; total += line; }
  });
  $("#vo-count").textContent = count;
  $("#vo-total").textContent = money(total);
  $("#vo-create").disabled = count === 0;
}

function dlgNewAd() {
  return dialogShell("New AutomationDirect request", "Covered by AutomationDirect. Value is tracked separately from team spending. A lead checks it, then a mentor approves it.",
    `<div class="form">
      ${field("AD part number", `<input id="ad-pn" name="pn" required placeholder="e.g. PSB24-060S" />`)}
      ${field("Quantity", `<input id="ad-qty" name="qty" type="number" min="1" value="1" inputmode="numeric" />`)}
      ${field("Description", `<input id="ad-desc" name="desc" required placeholder="What the part is" />`, "wide")}
      ${field("Retail value each", `<input id="ad-value" name="value" type="number" min="0" step="0.01" inputmode="decimal" />`)}
      ${field("Project", `<select id="ad-project" name="projectId">${projectOptions(false)}</select>`)}
      ${field("Note", `<textarea id="ad-note" name="note" rows="2" placeholder="Optional"></textarea>`, "wide")}
    </div>`,
    `<button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Save AD request</button>`, "", "new-ad");
}

function dlgAddMember() {
  return dialogShell("Add member", "Enter their team Google account. They can sign in as soon as they are added.",
    `<div class="form">${field("Name", `<input id="mem-name" name="name" required />`)}${field("Role", `<select id="mem-role" name="role"><option value="student">Student</option><option value="lead">Student lead</option><option value="mentor">Mentor</option></select>`)}${field("Team Google account", `<input id="mem-email" name="email" type="email" required placeholder="name@team1833.example" />`, "wide")}</div>`,
    `<button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Add member</button>`, "", "add-member");
}

function dlgNewProject() {
  return dialogShell("New project", "BeanParts copies the approved BOM template into the shared drive and registers the new workbook.",
    `<div class="form">${field("Project name", `<input id="np-name" name="name" required placeholder="e.g. 2027 Onseason Robot" />`, "wide")}${field("Season", `<input id="np-season" name="season" required placeholder="e.g. 2027 Onseason" />`)}${field("Status", `<select id="np-status" name="status"><option>Planning</option><option>Active</option></select>`)}</div>`,
    `<button type="button" class="btn" data-action="close-dialog">Cancel</button><button type="submit" class="btn primary">Create project workbook</button>`, "", "new-project");
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

function closeMenus() {
  for (const id of ["projectMenu", "accountMenu"]) $("#" + id).hidden = true;
  $("#projectSwitch").setAttribute("aria-expanded", "false");
  $("#accountButton").setAttribute("aria-expanded", "false");
  $("#moreSheet").hidden = true;
}

function switchProject(id) {
  if (id === state.projectId) return;
  state.projectId = id;
  state.bom = { q: "", type: "all", subsystem: "all", review: "all" };
  state.reqTab = "all"; state.deliveryQ = ""; state.receiving = null; state.conflict = null;
  state.refreshedAt = Date.now() - Math.round(Math.random() * 4 + 1) * 60000;
  savePrefs();
  state.loading = true; render();
  setTimeout(() => { state.loading = false; render(); }, 450);
}

document.addEventListener("click", (e) => {
  const openRow = e.target.closest("[data-open]");
  if (openRow && !e.target.closest("button, a, input, select")) { go(openRow.dataset.open); return; }
  if (openRow && openRow.matches("button.row")) { go(openRow.dataset.open); return; }

  const el = e.target.closest("[data-action]");
  if (!el) {
    if (!e.target.closest(".menu, #projectSwitch, #accountButton")) { $("#projectMenu").hidden = true; $("#accountMenu").hidden = true; }
    return;
  }
  const { action, value, id } = el.dataset;
  const actions = {
    "sign-in": () => { state.signedIn = true; savePrefs(); go("projects"); render(); },
    "sign-out": () => { state.signedIn = false; savePrefs(); closeMenus(); render(); },
    "switch-project": () => { closeMenus(); switchProject(id); },
    "open-project": () => { e.preventDefault(); switchProject(id); go("overview"); },
    "theme": () => { state.theme = value; savePrefs(); render(); },
    "refresh": () => { state.loading = true; render(); setTimeout(() => { state.refreshedAt = Date.now(); state.loading = false; render(); toast("Refreshed from Google Sheets"); }, 500); },
    "dialog": () => { closeMenus(); openDialog(value, id); },
    "close-dialog": closeDialog,
    "close-sheet": closeMenus,
    "bom-type": () => { state.bom.type = value; render(); },
    "bom-clear": () => { state.bom = { q: "", type: "all", subsystem: "all", review: "all" }; if (location.hash.includes("?")) go("bom"); else render(); },
    "bom-confirm": () => simulateSave(el, () => { const b = findBom(id); b.review = "Confirmed"; b.changed = "Just now"; (b.history = b.history || []).unshift(["Confirmed by lead", `${me().name} · just now`]); }, "Entry confirmed · verified in Sheets"),
    "bom-submit": () => simulateSave(el, () => { const b = findBom(id); b.review = "Needs lead review"; b.note = ""; b.changed = "Just now"; (b.history = b.history || []).unshift(["Submitted for lead review", `${me().name} · just now`]); }, "Submitted for lead review · verified in Sheets"),
    "conflict-cancel": () => { state.conflict = null; render(); },
    "req-tab": () => { state.reqTab = value; if (location.hash.includes("?")) go("requests"); else render(); },
    "req-check": () => simulateSave(el, () => { const r = findRequest(id); r.status = "Ready for mentor"; r.note = ""; r.updated = "Just now"; }, "Marked checked · ready for mentor"),
    "req-approve": () => simulateSave(el, () => { const r = findRequest(id); r.status = "Mentor confirmed"; r.updated = "Just now"; }, "Purchase confirmed · verified in Sheets"),
    "order-scope": () => { state.orderScope = value; render(); },
    "order-placed": () => simulateSave(el, () => { const o = findOrder(id); o.status = "Ordered"; o.placed = "Today"; o.lines.forEach((l) => { const r = l.requestId && findRequest(l.requestId); if (r) r.status = "Ordered"; const b = l.bomId && findBom(l.bomId); if (b) b.order = "Ordered"; }); }, "Marked as ordered · verified in Sheets"),
    "invoice-confirm": () => simulateSave(el, () => { findOrder(id).invoice = "Confirmed"; }, "Invoice confirmed · verified in Sheets"),
    "invoice-received": () => simulateSave(el, () => { findOrder(id).invoice = "Needs mentor confirmation"; }, "Invoice marked received"),
    "ad-check": () => simulateSave(el, () => { AD_ORDERS.find((a) => a.id === id).status = "Needs mentor approval"; }, "Checked · waiting for mentor approval"),
    "ad-approve": () => simulateSave(el, () => { AD_ORDERS.find((a) => a.id === id).status = "Approved"; }, "AD request approved"),
    "ad-submit": () => simulateSave(el, () => { AD_ORDERS.find((a) => a.id === id).status = "Submitted to AD"; }, "Marked submitted to AutomationDirect"),
    "ad-delivered": () => simulateSave(el, () => { AD_ORDERS.find((a) => a.id === id).status = "Delivered"; }, "Delivery confirmed"),
    "receive": () => { state.receiving = value; render(); const input = $('.receive input[name="qty"]'); if (input) input.focus(); },
    "receive-cancel": () => { state.receiving = null; render(); },
    "delivery-clear": () => { state.deliveryQ = ""; if (location.hash.includes("?")) go("deliveries"); else render(); },
    "member-remove": () => { const i = MEMBERS.findIndex((m) => m.name === id); if (i >= 0 && confirm(`Remove ${id} from BeanParts? They keep any Google Sheets access they already have.`)) simulateSave(el, () => MEMBERS.splice(i, 1), `${id} removed`); },
  };
  if (actions[action]) actions[action]();
});

document.addEventListener("submit", (e) => {
  const form = e.target.closest("form[data-form]");
  if (!form) return;
  e.preventDefault();
  const kind = form.dataset.form;
  const data = Object.fromEntries(new FormData(form));
  const submitter = e.submitter || form.querySelector('button[type="submit"]');
  const required = [...form.querySelectorAll("[required]")].find((i) => !i.value.trim());
  if (required) { required.focus(); required.setAttribute("aria-invalid", "true"); return; }

  const handlers = {
    "add-part": () => simulateSave(submitter, () => {
      const list = bomFor();
      const num = String(list.length + 1).padStart(3, "0");
      const prefix = list[0] ? list[0].id.split("-")[0] : "BOM";
      list.unshift({ id: `${prefix}-${num}N`, name: data.name.trim(), detail: data.notes ? data.notes.trim().slice(0, 40) : "Added in BeanParts", subsystem: data.subsystem, type: data.type, pn: data.pn.trim(), rev: "", qty: Math.max(1, Number(data.qty) || 1), review: data.submit ? "Needs lead review" : "Draft", order: data.type === "Purchased" ? "Not requested" : "Not started", changed: "Just now", source: "Manual", by: me().name, notes: data.notes.trim(), history: [[data.submit ? "Added and submitted for lead review" : "Added as draft", `${me().name} · just now`]] });
      closeDialog();
    }, data.submit ? "Added and submitted for lead review" : "Added to BOM as a draft"),
    "new-request": () => simulateSave(submitter, () => {
      REQUESTS.unshift({ id: `REQ-${1049 + REQUESTS.filter((r) => r.id.endsWith("N")).length}N`, item: data.item.trim(), vendor: data.vendor.trim(), sku: data.sku.trim(), qty: Math.max(1, Number(data.qty) || 1), unit: Number(data.unit) || 0, requester: me().name, projectId: data.projectId || null, purpose: data.purpose.trim() || "—", status: "Ready for mentor", updated: "Just now" });
      state.reqTab = "all"; closeDialog();
    }, "Request saved · ready for mentor"),
    "return": () => simulateSave(submitter, () => {
      const { kind: k, id } = submitter.dataset;
      if (k === "bom") { const b = findBom(id); b.review = "Needs correction"; b.note = data.note.trim(); b.changed = "Just now"; (b.history = b.history || []).unshift(["Returned for correction", `${me().name} · just now`]); }
      else { const r = findRequest(id); r.status = "Needs correction"; r.note = data.note.trim(); r.updated = "Just now"; }
      closeDialog();
    }, "Returned with your note"),
    "vendor-order": () => {
      const vendor = $("#vo-vendor").value;
      const picks = [...form.querySelectorAll("input[type=checkbox]:checked")].map((cb) => { const r = findRequest(cb.dataset.id); return { r, qty: Math.max(1, Math.min(r.qty, Number(form.querySelector(`[data-qty="${r.id}"]`).value) || 1)) }; });
      if (!picks.length) return;
      simulateSave(submitter, () => {
        const code = vendor.split(/\s+/).map((w) => w[0]).join("").toUpperCase().slice(0, 4);
        const order = { id: `${code}-${3000 + ORDERS.length}`, vendor, status: "Mentor confirmed", placed: "", invoice: "Not received", lines: picks.map(({ r, qty }) => ({ desc: r.item, sku: r.sku, qty, received: 0, unit: r.unit, projectId: r.projectId, requestId: r.id, bomId: (Object.values(BOM).flat().find((b) => b.request === r.id) || {}).id })) };
        picks.forEach(({ r }) => { r.status = "In vendor order"; r.orderId = order.id; r.updated = "Just now"; });
        ORDERS.unshift(order); closeDialog(); go(`orders/${order.id}`);
      }, "Vendor order created · not yet placed");
    },
    "new-ad": () => simulateSave(submitter, () => { AD_ORDERS.unshift({ id: `AD-00${14 + AD_ORDERS.length}`, pn: data.pn.trim(), desc: data.desc.trim(), qty: Math.max(1, Number(data.qty) || 1), value: Number(data.value) || 0, projectId: data.projectId, status: isMentor() ? "Needs mentor approval" : "Needs lead review", by: me().name, note: data.note.trim() }); closeDialog(); }, "AD request saved"),
    "add-member": () => simulateSave(submitter, () => { MEMBERS.push({ name: data.name.trim(), role: data.role, admin: false }); closeDialog(); }, `${data.name.trim()} added`),
    "new-project": () => simulateSave(submitter, () => { const id = data.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"); PROJECTS.push({ id, name: data.name.trim(), season: data.season.trim(), status: data.status, refreshed: "just now" }); BOM[id] = []; ACTIVITY[id] = [["Project workbook created from template", `${me().name} · just now`]]; closeDialog(); go("projects"); }, "Project workbook created and registered"),
    "qty": () => {
      const b = findBom(form.dataset.id);
      const mine = Math.max(1, Number(data.qty) || 1);
      if (b.sheetQty && b.sheetQty !== b.qty) { state.conflict = { id: b.id, mine }; render(); return; }
      simulateSave(submitter, () => { b.qty = mine; b.changed = "Just now"; (b.history = b.history || []).unshift([`Quantity changed to ${mine}`, `${me().name} · just now`]); }, "Quantity saved · verified in Sheets");
    },
    "conflict": () => simulateSave(submitter, () => {
      const b = findBom(form.dataset.id);
      const chosen = data.pick === "sheet" ? b.sheetQty : state.conflict.mine;
      b.qty = chosen; b.sheetQty = undefined; b.changed = "Just now";
      (b.history = b.history || []).unshift([`Conflict resolved · quantity ${chosen} (${data.pick === "sheet" ? "kept sheet value" : "kept BeanParts value"})`, `${me().name} · just now`]);
      state.conflict = null;
    }, "Conflict resolved · verified in Sheets"),
    "receive": () => {
      const o = findOrder(form.dataset.order); const l = o.lines[Number(form.dataset.line)];
      const n = Math.max(1, Math.min(l.qty - l.received, Number(data.qty) || 1));
      simulateSave(submitter, () => {
        l.received += n;
        if (data.condition !== "Correct and undamaged") l.issue = data.condition;
        o.status = orderRemaining(o) === 0 ? "Delivered" : "Partially delivered";
        const b = l.bomId && findBom(l.bomId);
        if (b) b.order = l.received >= l.qty ? "Delivered" : `Partially delivered (${l.received} of ${l.qty})`;
        state.receiving = null;
      }, `${n} received · ${l.qty - l.received - n === 0 ? "line complete" : `${l.qty - l.received - n} still expected`}`);
    },
  };
  if (handlers[kind]) handlers[kind]();
});

document.addEventListener("input", (e) => {
  const t = e.target;
  if (t.id === "bomSearch") { state.bom.q = t.value; renderPreservingFocus(t); }
  if (t.id === "deliverySearch") { state.deliveryQ = t.value; renderPreservingFocus(t); }
  if (t.closest("#vo-lines")) updateBuilder();
});
document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.id === "bomSubsystem") { state.bom.subsystem = t.value; render(); }
  if (t.id === "bomReview") { state.bom.review = t.value; render(); }
  if (t.id === "rolePreview") { state.role = t.value; state.conflict = null; state.receiving = null; savePrefs(); if (parseRoute().page === "requests" && !isReviewer()) go("overview"); render(); }
  if (t.id === "vo-vendor") updateBuilder();
  if (t.dataset.member) simulateSave(null, () => { MEMBERS.find((m) => m.name === t.dataset.member).role = t.value; }, `${t.dataset.member} is now ${t.options[t.selectedIndex].text}`);
});

function renderPreservingFocus(input) {
  const { id, selectionStart } = input;
  render();
  const again = document.getElementById(id);
  if (again) { again.focus(); try { again.setSelectionRange(selectionStart, selectionStart); } catch (err) { /* type=search may not support it */ } }
}

$("#globalSearchForm").addEventListener("submit", (e) => { e.preventDefault(); go(`search?q=${encodeURIComponent($("#globalSearch").value.trim())}`); });
$("#projectSwitch").addEventListener("click", () => { const m = $("#projectMenu"); const open = m.hidden; closeMenus(); m.hidden = !open; $("#projectSwitch").setAttribute("aria-expanded", String(open)); });
$("#accountButton").addEventListener("click", () => { const m = $("#accountMenu"); const open = m.hidden; closeMenus(); m.hidden = !open; $("#accountButton").setAttribute("aria-expanded", String(open)); });
$("#moreButton").addEventListener("click", () => { $("#moreSheet").hidden = false; });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenus();
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("tr[data-open]")) { e.preventDefault(); go(e.target.dataset.open); }
});
window.addEventListener("hashchange", () => { closeMenus(); state.conflict = null; state.receiving = null; render(); $("#view").focus({ preventScroll: true }); });

// Keep the "last refreshed" text honest without a full re-render storm.
setInterval(() => { document.querySelectorAll(".freshness span:nth-child(2)").forEach((s) => { s.textContent = `${isStale() ? "Data may be out of date · " : ""}Last refreshed ${relativeRefreshed()}`; }); }, 30000);

loadPrefs();
if (!location.hash) location.hash = state.signedIn ? "projects" : "";
render();
