const projects = {
  robot: { name: "2026 Onseason Robot", bom: 184, confirmed: 161, cost: "$8,426.38" },
  offseason: { name: "2026 Offseason Robot", bom: 67, confirmed: 51, cost: "$2,184.70" },
  altmill: { name: "2026 Offseason Altmill Upgrade", bom: 29, confirmed: 21, cost: "$1,263.18" }
};

const bomData = [
  { id: "BOM-0184", name: "Intake pivot plate", detail: "7075-T6 · 0.250 in", subsystem: "Intake", type: "manufactured", part: "1833-INT-042 · Rev C", qty: 2, review: "Needs lead review", reviewClass: "review", order: "Ready to make", changed: "8 min ago", source: "Onshape" },
  { id: "BOM-0179", name: "Kraken X60", detail: "Brushless motor", subsystem: "Shooter", type: "purchased", part: "WCP-0940", qty: 4, review: "Confirmed", reviewClass: "confirmed", order: "Ordered", changed: "22 min ago", source: "Manual" },
  { id: "BOM-0168", name: "4 in. compliant wheel", detail: "35A · 1/2 in hex", subsystem: "Intake", type: "purchased", part: "am-4480_green", qty: 12, review: "Confirmed", reviewClass: "confirmed", order: "Partial delivery", orderClass: "partial", changed: "1 hr ago", source: "Onshape" },
  { id: "BOM-0151", name: "Shooter hood assembly", detail: "8 components", subsystem: "Shooter", type: "assembly", part: "1833-SHT-010 · Rev B", qty: 1, review: "Confirmed", reviewClass: "confirmed", order: "3 parts needed", orderClass: "correction", changed: "2 hr ago", source: "Onshape" },
  { id: "BOM-0142", name: "MK5n swerve module", detail: "L2 gearing · left", subsystem: "Drivetrain", type: "assembly", part: "WCP-0904", qty: 2, review: "Confirmed", reviewClass: "confirmed", order: "In stock", changed: "Yesterday", source: "Manual" },
  { id: "BOM-0137", name: "CANcoder", detail: "Absolute encoder", subsystem: "Drivetrain", type: "purchased", part: "CTRE-22-678682", qty: 4, review: "Confirmed", reviewClass: "confirmed", order: "Delivered", orderClass: "delivered", changed: "Yesterday", source: "Manual" },
  { id: "BOM-0129", name: "Main breaker mount", detail: "PETG-HF · red", subsystem: "Electrical", type: "manufactured", part: "1833-ELC-017 · Rev A", qty: 1, review: "Needs correction", reviewClass: "correction", order: "Blocked", orderClass: "correction", changed: "Sep 16", source: "Onshape" },
  { id: "BOM-0118", name: "#10-32 button head screw", detail: "18-8 stainless · 1/2 in", subsystem: "Intake", type: "purchased", part: "McM 92949A269", qty: 36, review: "Confirmed", reviewClass: "confirmed", order: "In stock", changed: "Sep 15", source: "Manual" }
];

const requestData = [
  { id: "REQ-0268", item: "4 in. compliant wheels", note: "Intake spares", requester: "Maya R.", vendor: "AndyMark", qty: 8, cost: "$143.60", status: "Needs lead review", statusKey: "needs-lead", cls: "review", updated: "8 min ago" },
  { id: "REQ-0267", item: "7075 aluminum plate", note: "Intake pivot plates", requester: "Daniel K.", vendor: "Midwest Steel", qty: 1, cost: "$186.20", status: "Needs lead review", statusKey: "needs-lead", cls: "review", updated: "31 min ago" },
  { id: "REQ-0263", item: "Kraken X60 motors", note: "Shooter replacement motors", requester: "Adi M.", vendor: "WCP", qty: 2, cost: "$399.98", status: "Ready for mentor", statusKey: "ready-mentor", cls: "ready", updated: "1 hr ago" },
  { id: "REQ-0261", item: "5 mm HTD belt stock", note: "Shooter and conveyor", requester: "Liam T.", vendor: "SDP/SI", qty: 2, cost: "$96.00", status: "Ready for mentor", statusKey: "ready-mentor", cls: "ready", updated: "3 hr ago" },
  { id: "REQ-0258", item: "1/2 in hex bearings", note: "Missing vendor link", requester: "Sam P.", vendor: "—", qty: 16, cost: "—", status: "Needs correction", statusKey: "correction", cls: "correction", updated: "Yesterday" },
  { id: "REQ-0254", item: "RoboRIO 2.0", note: "Control system spare", requester: "Nora B.", vendor: "AndyMark", qty: 1, cost: "$475.00", status: "Mentor confirmed", statusKey: "closed", cls: "confirmed", updated: "Sep 16" }
];

const orderData = [
  { id: "REV-1048", vendor: "REV Robotics", projects: "Onseason Robot", placed: "Sep 16", total: "$742.18", delivery: "Partial delivery", deliveryClass: "partial", invoice: "Needs confirmation", invoiceClass: "unpaid" },
  { id: "MC-7781", vendor: "McMaster-Carr", projects: "Onseason Robot + 1", placed: "Sep 15", total: "$386.42", delivery: "Delivered", deliveryClass: "delivered", invoice: "Confirmed", invoiceClass: "paid" },
  { id: "WCP-2941", vendor: "WestCoast Products", projects: "Onseason Robot", placed: "Not placed", total: "$512.96", delivery: "Not started", deliveryClass: "", invoice: "Not received", invoiceClass: "", ready: true },
  { id: "AM-6127", vendor: "AndyMark", projects: "Onseason Robot + 2", placed: "Sep 11", total: "$1,274.03", delivery: "Delivered", deliveryClass: "delivered", invoice: "Confirmed", invoiceClass: "paid" }
];

const vendorOrderCandidates = {
  "WestCoast Products": [
    { id: "REQ-0263", item: "Kraken X60 motor", project: "2026 Onseason Robot · Shooter", available: 2, unitPrice: 199.99 },
    { id: "REQ-0260", item: "18T spline motor pinion", project: "2026 Onseason Robot · Shooter", available: 4, unitPrice: 14.99 },
    { id: "REQ-0249", item: "#25 chain · 10 ft", project: "2026 Offseason Robot · Drivetrain", available: 2, unitPrice: 21.00 }
  ],
  "AndyMark": [
    { id: "REQ-0268", item: "4 in. compliant wheel", project: "2026 Onseason Robot · Intake", available: 8, unitPrice: 17.95 },
    { id: "REQ-0254", item: "RoboRIO 2.0", project: "2026 Onseason Robot · Electrical", available: 1, unitPrice: 475.00 },
    { id: "REQ-0241", item: "1/2 in. hex bearing", project: "2026 Offseason Robot · Drivetrain", available: 16, unitPrice: 8.50 }
  ],
  "McMaster-Carr": [
    { id: "REQ-0259", item: "7075 aluminum shaft", project: "2026 Onseason Robot · Intake", available: 2, unitPrice: 28.42 },
    { id: "REQ-0256", item: "10-32 button-head screws", project: "General Team Supplies", available: 100, unitPrice: 0.19 },
    { id: "REQ-0246", item: "Hook-and-loop cable ties", project: "2026 Onseason Robot · Electrical", available: 25, unitPrice: 0.62 }
  ]
};

const attentionItems = [
  { title: "Review intake pivot plate", subtitle: "BOM-0184 · Submitted by Maya R.", type: "red", value: "Lead review", time: "8 min ago", route: "bom" },
  { title: "Check compliant wheel request", subtitle: "REQ-0268 · 8 wheels from AndyMark", type: "amber", value: "$143.60", time: "31 min ago", route: "requests", requestRelated: true },
  { title: "REV Robotics delivery incomplete", subtitle: "REV-1048 · 4 of 6 lines received", type: "teal", value: "2 lines open", time: "Today", route: "deliveries" },
  { title: "Mentor approval ready", subtitle: "REQ-0263 · Kraken X60 motors", type: "teal", value: "$399.98", time: "1 hr ago", route: "orders", requestRelated: true }
];

const activities = [
  { time: "10:42 AM", action: "Delivery confirmed", detail: "4 in. compliant wheel · 8 of 12 received", person: "Maya R.", project: "Onseason Robot" },
  { time: "10:18 AM", action: "BOM entry submitted", detail: "Intake pivot plate · Rev C", person: "Daniel K.", project: "Onseason Robot" },
  { time: "Yesterday", action: "Order marked placed", detail: "REV Robotics · REV-1048", person: "Alex M.", project: "Onseason Robot" },
  { time: "Sep 16", action: "Project workbook backed up", detail: "Automatic daily backup · Retained 30 days", person: "BeanParts", project: "All projects" }
];

const deliveries = [
  { id: "REV-1048", vendor: "REV Robotics", date: "Expected Sep 19", percent: 67, status: "Partial delivery", lines: [{ name: "MAXSpline shaft", note: "Onseason Robot · Intake", qty: "4 / 4" }, { name: "ION 2 in. tube plugs", note: "Onseason Robot · Frame", qty: "12 / 20" }, { name: "MAXPlanetary input kits", note: "Onseason Robot · Shooter", qty: "0 / 2" }] },
  { id: "WCP-2872", vendor: "WestCoast Products", date: "Expected Sep 20", percent: 50, status: "Partial delivery", lines: [{ name: "Kraken X60", note: "Onseason Robot · Shooter", qty: "2 / 4" }, { name: "1/2 in. hex hubs", note: "Onseason Robot · Intake", qty: "8 / 8" }] },
  { id: "MC-7781", vendor: "McMaster-Carr", date: "Received Sep 17", percent: 100, status: "Delivered", lines: [{ name: "7075 aluminum shaft", note: "Onseason Robot · Intake", qty: "2 / 2" }, { name: "10-32 fasteners", note: "Team supplies", qty: "100 / 100" }] }
];

let currentRole = "Lead";
let currentProject = "robot";
let requestFilter = "all";
let bomTypeFilter = "all";
let toastTimer;

const escapeHTML = (value) => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const typeLabel = (type) => ({ purchased: "Purchased", manufactured: "Manufactured", assembly: "Assembly" })[type] || type;
const roleCanReview = () => ["Lead", "Mentor"].includes(currentRole);
const roleCanMentor = () => currentRole === "Mentor";

function routeTo(route) {
  const valid = ["overview", "bom", "requests", "orders", "deliveries"];
  let next = valid.includes(route) ? route : "overview";
  if (currentRole === "Student" && next === "requests") next = "overview";
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active", page.dataset.page === next));
  document.querySelectorAll("[data-route]").forEach(link => link.classList.toggle("active", link.dataset.route === next));
  if (location.hash !== `#${next}`) history.replaceState(null, "", `#${next}`);
  document.getElementById("mainContent").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAttention() {
  const visibleItems = currentRole === "Student" ? attentionItems.filter(item => !item.requestRelated) : attentionItems;
  document.getElementById("attentionList").innerHTML = visibleItems.map(item => `
    <div class="task-item" data-jump="${item.route}" tabindex="0" role="button">
      <span class="task-accent ${item.type}"></span>
      <span class="task-copy"><strong>${item.title}</strong><small>${item.subtitle}</small></span>
      <span class="task-meta"><strong>${item.value}</strong><small>${item.time}</small></span>
    </div>`).join("");
}

function renderActivity() {
  document.getElementById("activityTable").innerHTML = activities.map(item => `
    <div class="activity-row">
      <time>${item.time}</time>
      <span class="activity-action"><strong>${item.action}</strong><span>${item.detail}</span></span>
      <span class="person">${item.person}</span>
      <span class="activity-project">${item.project}</span>
    </div>`).join("");
}

function filteredBom() {
  const query = document.getElementById("bomSearch").value.trim().toLowerCase();
  const subsystem = document.getElementById("subsystemFilter").value;
  return bomData.filter(item => {
    const matchesQuery = !query || `${item.name} ${item.detail} ${item.part} ${item.subsystem}`.toLowerCase().includes(query);
    const matchesType = bomTypeFilter === "all" || item.type === bomTypeFilter;
    const matchesSubsystem = subsystem === "all" || item.subsystem === subsystem;
    return matchesQuery && matchesType && matchesSubsystem;
  });
}

function renderBom() {
  const rows = filteredBom();
  document.getElementById("visibleBomCount").textContent = rows.length;
  document.getElementById("bomRows").innerHTML = rows.map(item => `
    <tr data-detail="bom" data-id="${item.id}" tabindex="0">
      <td class="part-cell"><strong>${item.name}</strong><small>${item.detail}</small></td>
      <td>${item.subsystem}</td>
      <td><span class="type-label"><span class="type-dot ${item.type}"></span>${typeLabel(item.type)}</span></td>
      <td>${item.part}</td>
      <td class="numeric"><strong>${item.qty}</strong></td>
      <td><span class="chip ${item.reviewClass}">${item.review}</span></td>
      <td><span class="chip ${item.orderClass || ""}">${item.order}</span></td>
      <td>${item.changed}</td>
      <td><button class="row-menu" type="button" aria-label="Open ${item.name}">•••</button></td>
    </tr>`).join("") || `<tr><td colspan="9">No parts match these filters.</td></tr>`;
  document.getElementById("bomCards").innerHTML = rows.map(item => `
    <article class="mobile-data-card" data-detail="bom" data-id="${item.id}" tabindex="0">
      <div class="mobile-data-top"><div><h3>${item.name}</h3><p>${item.part}</p></div><span class="chip ${item.reviewClass}">${item.review}</span></div>
      <div class="mobile-data-meta"><div><span>Subsystem</span><strong>${item.subsystem}</strong></div><div><span>Quantity</span><strong>${item.qty}</strong></div></div>
    </article>`).join("");
}

function renderRequests() {
  const rows = requestData.filter(item => requestFilter === "all" || item.statusKey === requestFilter);
  document.getElementById("requestRows").innerHTML = rows.map(item => `
    <tr data-detail="request" data-id="${item.id}" tabindex="0">
      <td class="primary-cell"><strong>${item.item}</strong><small>${item.id} · ${item.note}</small></td>
      <td>${item.requester}</td><td>${item.vendor}</td><td class="numeric">${item.qty}</td><td class="numeric">${item.cost}</td>
      <td><span class="chip ${item.cls}">${item.status}</span></td><td>${item.updated}</td>
      <td><button class="row-menu" type="button" aria-label="Open ${item.id}">•••</button></td>
    </tr>`).join("") || `<tr><td colspan="8">No requests in this group.</td></tr>`;
  document.getElementById("requestCards").innerHTML = rows.map(item => `
    <article class="mobile-data-card" data-detail="request" data-id="${item.id}" tabindex="0">
      <div class="mobile-data-top"><div><h3>${item.item}</h3><p>${item.id} · ${item.requester}</p></div><span class="chip ${item.cls}">${item.status}</span></div>
      <div class="mobile-data-meta"><div><span>Vendor</span><strong>${item.vendor}</strong></div><div><span>Est. cost</span><strong>${item.cost}</strong></div></div>
    </article>`).join("");
}

function renderOrders() {
  document.getElementById("orderRows").innerHTML = orderData.map(item => `
    <tr data-detail="order" data-id="${item.id}" tabindex="0">
      <td class="primary-cell"><strong>${item.vendor}</strong><small>${item.id}</small></td><td>${item.projects}</td><td>${item.placed}</td><td class="numeric"><strong>${item.total}</strong></td>
      <td><span class="chip ${item.deliveryClass}">${item.delivery}</span></td><td><span class="chip ${item.invoiceClass}">${item.invoice}</span></td>
      <td><button class="row-menu" type="button" aria-label="Open ${item.id}">•••</button></td>
    </tr>`).join("");
  document.getElementById("orderCards").innerHTML = orderData.map(item => `
    <article class="mobile-data-card" data-detail="order" data-id="${item.id}" tabindex="0">
      <div class="mobile-data-top"><div><h3>${item.vendor}</h3><p>${item.id} · ${item.projects}</p></div><span class="chip ${item.deliveryClass}">${item.delivery}</span></div>
      <div class="mobile-data-meta"><div><span>Placed</span><strong>${item.placed}</strong></div><div><span>Total</span><strong>${item.total}</strong></div></div>
    </article>`).join("");
}

function renderVendorOrderBuilder() {
  const vendor = document.getElementById("vendorOrderVendor").value;
  const lines = vendorOrderCandidates[vendor] || [];
  document.getElementById("vendorOrderLines").innerHTML = lines.length ? lines.map(line => `
    <label class="vendor-line">
      <input type="checkbox" name="selectedLine" value="${line.id}" />
      <span class="vendor-line-copy"><strong>${line.item}</strong><small>${line.id} · ${line.project} · $${line.unitPrice.toFixed(2)} each</small></span>
      <span class="vendor-line-quantity"><input type="number" name="quantity-${line.id}" min="1" max="${line.available}" value="${line.available}" disabled aria-label="Order quantity for ${line.item}" /><span>of ${line.available}</span></span>
    </label>`).join("") : `<div class="vendor-empty">No approved request lines are ready for this vendor.</div>`;
  updateVendorOrderSummary();
}

function updateVendorOrderSummary() {
  const vendor = document.getElementById("vendorOrderVendor").value;
  const checked = [...document.querySelectorAll('#vendorOrderLines input[name="selectedLine"]:checked')];
  let subtotal = 0;
  checked.forEach(checkbox => {
    const line = (vendorOrderCandidates[vendor] || []).find(candidate => candidate.id === checkbox.value);
    const quantityInput = document.querySelector(`[name="quantity-${checkbox.value}"]`);
    const quantity = Math.max(1, Math.min(line.available, Number(quantityInput.value) || 1));
    quantityInput.value = quantity;
    subtotal += line.unitPrice * quantity;
  });
  document.getElementById("vendorSelectedCount").textContent = checked.length;
  document.getElementById("vendorOrderSubtotal").textContent = subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" });
  document.getElementById("createVendorOrderButton").disabled = checked.length === 0;
}

function renderDeliveries() {
  const query = document.getElementById("deliverySearch").value.trim().toLowerCase();
  const cards = deliveries.filter(order => `${order.id} ${order.vendor} ${order.lines.map(line => line.name + line.note).join(" ")}`.toLowerCase().includes(query));
  document.getElementById("deliveryGrid").innerHTML = cards.map(order => `
    <article class="delivery-card">
      <div class="delivery-progress"><span style="width:${order.percent}%"></span></div>
      <div class="delivery-card-header"><div><h2>${order.vendor}</h2><p>${order.id} · ${order.date}</p></div><span class="chip ${order.percent === 100 ? "delivered" : "partial"}">${order.status}</span></div>
      <div class="delivery-lines">${order.lines.map(line => `<div class="delivery-line"><span><strong>${line.name}</strong><small>${line.note}</small></span><span class="delivery-qty">${line.qty}</span></div>`).join("")}</div>
      <div class="delivery-card-footer"><span>${order.percent}% received</span><button class="button secondary reviewer-only" type="button" data-open="deliveryDialog">Update delivery</button></div>
    </article>`).join("") || `<div class="panel"><div class="panel-heading"><h2>No deliveries match your search.</h2></div></div>`;
  updateRoleUI();
}

function updateRoleUI() {
  const isStudent = currentRole === "Student";
  document.querySelectorAll(".lead-only").forEach(el => { el.hidden = !["Lead", "Mentor"].includes(currentRole); });
  document.querySelectorAll(".reviewer-only").forEach(el => { el.hidden = !roleCanReview(); });
  document.querySelectorAll(".mentor-only").forEach(el => { el.hidden = !roleCanMentor(); });
  document.querySelectorAll('[data-route="requests"], [data-jump="requests"]').forEach(el => { el.hidden = isStudent; });
  document.querySelectorAll(".request-only").forEach(el => { el.hidden = isStudent; });
  document.body.classList.toggle("student-view", isStudent);
  renderAttention();
  if (isStudent && document.querySelector('[data-page="requests"]').classList.contains("active")) routeTo("overview");
  const callout = document.getElementById("orderPermissionCallout");
  if (currentRole === "Mentor") callout.textContent = "Mentor preview: purchase confirmation, Mark ordered, and invoice confirmation are enabled.";
  else if (currentRole === "Admin") callout.textContent = "Admin preview: admins manage access and connections, but admin status alone does not grant purchase approval.";
  else if (currentRole === "Lead") callout.textContent = "Lead preview: you can check requests and deliveries. Mentor purchase and invoice actions remain unavailable.";
  else callout.textContent = "Student preview: orders and invoices are view-only. You can still add parts to a project BOM.";
}

function setProject(key) {
  currentProject = key;
  const project = projects[key];
  document.getElementById("projectLabel").textContent = project.name;
  document.querySelectorAll(".current-project-name").forEach(el => { el.textContent = project.name; });
  document.getElementById("bomCount").textContent = project.bom;
  document.querySelectorAll("[data-project]").forEach(button => button.setAttribute("aria-selected", button.dataset.project === key ? "true" : "false"));
  document.getElementById("projectPopover").hidden = true;
  document.getElementById("projectButton").setAttribute("aria-expanded", "false");
  showToast(`Switched to ${project.name}`);
}

function showDrawer(kind, id) {
  let item;
  if (kind === "bom") item = bomData.find(row => row.id === id);
  if (kind === "request") item = requestData.find(row => row.id === id);
  if (kind === "order") item = orderData.find(row => row.id === id);
  if (!item) return;

  let html = "";
  if (kind === "bom") {
    html = `<div class="drawer-header"><span class="kicker">${item.id}</span><h2 id="drawerTitle">${item.name}</h2><p>${item.detail}</p></div>
      <div class="drawer-section"><dl class="detail-list"><div><dt>Subsystem</dt><dd>${item.subsystem}</dd></div><div><dt>Type</dt><dd>${typeLabel(item.type)}</dd></div><div><dt>Part / revision</dt><dd>${item.part}</dd></div><div><dt>Quantity required</dt><dd>${item.qty}</dd></div><div><dt>Source</dt><dd>${item.source}</dd></div><div><dt>Review</dt><dd><span class="chip ${item.reviewClass}">${item.review}</span></dd></div></dl></div>
      <div class="drawer-section"><h3>Record history</h3><div class="timeline"><div class="timeline-item"><span class="timeline-mark"></span><span><strong>Submitted for lead review</strong><small>Daniel K. · 8 minutes ago</small></span></div><div class="timeline-item"><span class="timeline-mark"></span><span><strong>Updated from Onshape preview</strong><small>Revision changed from B to C</small></span></div><div class="timeline-item"><span class="timeline-mark"></span><span><strong>Added to project workbook</strong><small>Fake prototype activity</small></span></div></div></div>
      <div class="drawer-actions"><button class="button secondary" type="button" data-action="edit">Edit details</button>${roleCanReview() && item.review !== "Confirmed" ? `<button class="button primary" type="button" data-action="confirm-bom">Confirm BOM entry</button>` : ""}</div>`;
  }
  if (kind === "request") {
    html = `<div class="drawer-header"><span class="kicker">${item.id}</span><h2 id="drawerTitle">${item.item}</h2><p>${item.note}</p></div>
      <div class="drawer-section"><dl class="detail-list"><div><dt>Requester</dt><dd>${item.requester}</dd></div><div><dt>Vendor</dt><dd>${item.vendor}</dd></div><div><dt>Quantity</dt><dd>${item.qty}</dd></div><div><dt>Estimated cost</dt><dd>${item.cost}</dd></div><div><dt>Project</dt><dd>${projects[currentProject].name}</dd></div><div><dt>Status</dt><dd><span class="chip ${item.cls}">${item.status}</span></dd></div></dl></div>
      <div class="drawer-section"><h3>Review path</h3><div class="timeline"><div class="timeline-item"><span class="timeline-mark"></span><span><strong>Request submitted</strong><small>${item.requester} · ${item.updated}</small></span></div><div class="timeline-item"><span class="timeline-mark"></span><span><strong>${item.status}</strong><small>Current step</small></span></div><div class="timeline-item"><span class="timeline-mark"></span><span><strong>Mentor purchase confirmation</strong><small>Required before order placement</small></span></div></div></div>
      <div class="drawer-actions">${roleCanReview() && item.statusKey === "needs-lead" ? `<button class="button secondary" type="button" data-action="return-request">Return for correction</button><button class="button primary" type="button" data-action="lead-check">Mark lead checked</button>` : ""}${roleCanMentor() && item.statusKey === "ready-mentor" ? `<button class="button primary" type="button" data-action="mentor-confirm">Confirm purchase</button>` : ""}</div>`;
  }
  if (kind === "order") {
    html = `<div class="drawer-header"><span class="kicker">${item.id}</span><h2 id="drawerTitle">${item.vendor}</h2><p>${item.projects}</p></div>
      <div class="drawer-section"><dl class="detail-list"><div><dt>Total</dt><dd>${item.total}</dd></div><div><dt>Placed</dt><dd>${item.placed}</dd></div><div><dt>Delivery</dt><dd><span class="chip ${item.deliveryClass}">${item.delivery}</span></dd></div><div><dt>Invoice</dt><dd><span class="chip ${item.invoiceClass}">${item.invoice}</span></dd></div></dl></div>
      <div class="drawer-section"><h3>Workbook separation</h3><p style="margin:0;color:var(--muted);font-size:11px">This order is stored in the order workbook. Linked BOM lines remain in the project BOM workbook.</p></div>
      <div class="drawer-actions"><button class="button secondary" type="button" data-jump="deliveries">View delivery</button>${roleCanMentor() && item.ready ? `<button class="button primary" type="button" data-action="mark-ordered">Mark order placed</button>` : ""}${roleCanMentor() && item.invoice === "Needs confirmation" ? `<button class="button primary" type="button" data-action="confirm-invoice">Confirm invoice</button>` : ""}</div>`;
  }

  document.getElementById("drawerContent").innerHTML = html;
  const drawer = document.getElementById("detailDrawer");
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  drawer.querySelector(".drawer-close").focus();
}

function closeDrawer() {
  const drawer = document.getElementById("detailDrawer");
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  clearTimeout(toastTimer);
  document.getElementById("toastMessage").textContent = message;
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.addEventListener("click", event => {
  const routeLink = event.target.closest("[data-route]");
  if (routeLink) { event.preventDefault(); routeTo(routeLink.dataset.route); return; }

  const jump = event.target.closest("[data-jump]");
  if (jump) { closeDrawer(); routeTo(jump.dataset.jump); return; }

  const openButton = event.target.closest("[data-open]");
  if (openButton && !openButton.hidden) {
    if (openButton.dataset.open === "vendorOrderDialog") renderVendorOrderBuilder();
    document.getElementById(openButton.dataset.open)?.showModal();
    return;
  }

  const detail = event.target.closest("[data-detail]");
  if (detail) { showDrawer(detail.dataset.detail, detail.dataset.id); return; }

  if (event.target.closest("[data-close-drawer]")) { closeDrawer(); return; }

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "refresh") showToast("Prototype refreshed · Sheets are simulated");
  if (action === "onshape") showToast("Onshape change preview opened · Demo only");
  if (action === "filters") showToast("Additional filters would open here");
  if (action === "load-more") showToast("More BOM lines would load from Sheets");
  if (action === "open-ad") showToast("AutomationDirect requests stay in their separate list");
  if (["edit", "confirm-bom", "return-request", "lead-check", "mentor-confirm", "mark-ordered", "confirm-invoice"].includes(action)) {
    const messages = { edit: "Edit mode opened", "confirm-bom": "BOM entry confirmed · Demo only", "return-request": "Request returned for correction", "lead-check": "Request marked lead checked", "mentor-confirm": "Purchase confirmed by mentor", "mark-ordered": "Order marked placed", "confirm-invoice": "Invoice confirmed" };
    showToast(messages[action]); closeDrawer();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") { closeDrawer(); document.getElementById("projectPopover").hidden = true; }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-detail], .task-item")) event.target.click();
});

document.getElementById("projectButton").addEventListener("click", () => {
  const popover = document.getElementById("projectPopover");
  popover.hidden = !popover.hidden;
  document.getElementById("projectButton").setAttribute("aria-expanded", String(!popover.hidden));
});
document.querySelectorAll("[data-project]").forEach(button => button.addEventListener("click", () => setProject(button.dataset.project)));

document.getElementById("roleSelect").addEventListener("change", event => {
  currentRole = event.target.value;
  updateRoleUI();
  showToast(`Previewing BeanParts as ${currentRole}`);
});

document.getElementById("globalSearchButton").addEventListener("click", () => {
  routeTo("bom");
  setTimeout(() => document.getElementById("bomSearch").focus(), 50);
});

document.getElementById("bomSearch").addEventListener("input", renderBom);
document.getElementById("subsystemFilter").addEventListener("change", renderBom);
document.getElementById("bomTypeFilters").addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  bomTypeFilter = button.dataset.filter;
  document.querySelectorAll("#bomTypeFilters button").forEach(el => el.classList.toggle("active", el === button));
  renderBom();
});

document.getElementById("requestTabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-status]");
  if (!button) return;
  requestFilter = button.dataset.status;
  document.querySelectorAll("#requestTabs button").forEach(el => el.classList.toggle("active", el === button));
  renderRequests();
});

document.getElementById("deliverySearch").addEventListener("input", renderDeliveries);
document.getElementById("vendorOrderVendor").addEventListener("change", renderVendorOrderBuilder);
document.getElementById("vendorOrderLines").addEventListener("change", event => {
  if (event.target.name === "selectedLine") {
    const quantityInput = document.querySelector(`[name="quantity-${event.target.value}"]`);
    quantityInput.disabled = !event.target.checked;
  }
  updateVendorOrderSummary();
});
document.getElementById("vendorOrderLines").addEventListener("input", updateVendorOrderSummary);

document.querySelectorAll("dialog form").forEach(form => form.addEventListener("submit", event => {
  const submitter = event.submitter;
  if (submitter?.value === "cancel") return;
  event.preventDefault();
  const type = form.dataset.form;
  if (type === "vendor-order") {
    const selected = form.querySelectorAll('input[name="selectedLine"]:checked').length;
    if (!selected) return;
  }
  const nameField = form.querySelector("[required]");
  if (nameField && !nameField.value.trim()) { nameField.focus(); return; }
  form.closest("dialog").close();
  form.reset();
  const messages = { part: "Draft BOM part saved to the project workbook · Demo", request: "Order request saved to the order workbook · Demo", delivery: "Delivery confirmation saved · Demo", "vendor-order": "Vendor order created from the selected request lines · Demo" };
  if (type === "vendor-order") renderVendorOrderBuilder();
  showToast(messages[type]);
}));

window.addEventListener("hashchange", () => routeTo(location.hash.slice(1)));

renderAttention();
renderActivity();
renderBom();
renderRequests();
renderOrders();
renderDeliveries();
updateRoleUI();
routeTo(location.hash.slice(1) || "overview");

function registerWebMCPTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const registration = new AbortController();
  const register = tool => {
    try { void Promise.resolve(context.registerTool(tool, { signal: registration.signal })).catch(() => {}); } catch (_) {}
  };

  register({
    name: "navigate_beanparts",
    title: "Open BeanParts section",
    description: "Navigate the visible BeanParts prototype to Overview, BOM, Requests, Orders, or Deliveries.",
    inputSchema: { type: "object", properties: { section: { type: "string", enum: ["overview", "bom", "requests", "orders", "deliveries"] } }, required: ["section"], additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute(input) {
      if (!input || !["overview", "bom", "requests", "orders", "deliveries"].includes(input.section)) throw new Error("A valid BeanParts section is required.");
      if (currentRole === "Student" && input.section === "requests") throw new Error("Student accounts do not have access to Requests.");
      routeTo(input.section);
      return { section: input.section, project: projects[currentProject].name };
    }
  });

  register({
    name: "filter_bom",
    title: "Filter project BOM",
    description: "Search and filter the visible BeanParts BOM using the same controls shown to the user.",
    inputSchema: { type: "object", properties: { query: { type: "string" }, type: { type: "string", enum: ["all", "purchased", "manufactured", "assembly"] }, subsystem: { type: "string", enum: ["all", "Drivetrain", "Intake", "Shooter", "Electrical"] } }, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute(input = {}) {
      routeTo("bom");
      if (typeof input.query === "string") document.getElementById("bomSearch").value = input.query;
      if (input.type) bomTypeFilter = input.type;
      if (input.subsystem) document.getElementById("subsystemFilter").value = input.subsystem;
      document.querySelectorAll("#bomTypeFilters button").forEach(button => button.classList.toggle("active", button.dataset.filter === bomTypeFilter));
      renderBom();
      return { visibleCount: filteredBom().length, type: bomTypeFilter, subsystem: document.getElementById("subsystemFilter").value };
    }
  });

  register({
    name: "start_bom_part_entry",
    title: "Start BOM part entry",
    description: "Open the visible Add BOM part form. This prototype uses fake data and does not write to a live workbook.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute() {
      routeTo("bom");
      document.getElementById("addPartDialog").showModal();
      return { opened: true, project: projects[currentProject].name, mode: "prototype" };
    }
  });
}

registerWebMCPTools();
