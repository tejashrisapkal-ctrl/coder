/* ═══════════════════════════════════════════════════
   L&D TRACKER — APP LOGIC
   Data · CRUD · Charts · Filters · LocalStorage · Gantt
   ═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. MASTER DATA
────────────────────────────────────────── */

const INITIATIVES = [
  { id: 1,  name: 'ISMS/POSH/L100',                       category: 'Compliance' },
  { id: 2,  name: 'Udemy / Learnrush',                    category: 'Tool & Platform' },
  { id: 3,  name: 'DRI/DRP/PNH',                          category: 'Other' },
  { id: 4,  name: 'Fresher Internship Training',           category: 'Org Competency' },
  { id: 5,  name: 'Professional Certifications',           category: 'Org Competency' },
  { id: 6,  name: 'Library and Clearance',                 category: 'Tool & Platform' },
  { id: 7,  name: 'Leadership Training',                   category: 'Org Competency' },
  { id: 8,  name: 'Silver/Gold - Project and Bench',       category: 'I&D Team' },
  { id: 9,  name: 'Ignite AI (AI Delivery/Sales/Product)', category: 'AI Adoption' },
  { id: 10, name: 'Summer Internship',                     category: 'Other' },
  { id: 11, name: 'LIA',                                   category: 'Tool & Platform' },
  { id: 12, name: 'Account/Project Specific Requirements', category: 'I&D Team' },
  { id: 13, name: 'AI Hackathon',                          category: 'AI Adoption' },
  { id: 14, name: 'Priority Plays',                        category: 'I&D Team' },
  { id: 15, name: 'Strategic Project Readiness Program',   category: 'Org Competency' },
  { id: 16, name: 'Google Ecosystem',                      category: 'AI Adoption' },
  { id: 17, name: 'AI Fluency for PE',                     category: 'AI Adoption' },
  { id: 18, name: 'Gemini Enterprise Certification Drive', category: 'AI Adoption' },
];

const DEFAULT_ACTIVITIES = [
  { id: 1,  name: 'L&D Health Tracker Update',              owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Other',   notes: '' },
  { id: 2,  name: 'Google Policy Update Flyer',             owner: 'Tanaya/Deepraj', startDate: '2026-04-03', endDate: '',           status: 'In Progress', type: '',              initiative: 'Google Ecosystem', notes: '' },
  { id: 3,  name: 'LIA Icon',                               owner: 'Tanaya',         startDate: '',           endDate: '',           status: 'Completed',   type: '',              initiative: 'LIA',     notes: '' },
  { id: 4,  name: 'LIA Betterment/Testing',                 owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'In Progress', type: '',              initiative: 'LIA',     notes: '' },
  { id: 5,  name: 'AI Fluency Sales',                       owner: 'Tanaya',         startDate: '2026-04-03', endDate: '2026-12-31', status: 'In Progress', type: 'Till Dec 2026', initiative: 'Ignite AI (AI Delivery/Sales/Product)', notes: '' },
  { id: 6,  name: 'PNH, PA',                                owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: '',              initiative: 'DRI/DRP/PNH', notes: '' },
  { id: 7,  name: 'Expired Cert Reminder Email',            owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Professional Certifications', notes: '' },
  { id: 8,  name: 'AI Fluency Delivery',                    owner: 'Tanaya/Deepraj', startDate: '2026-04-03', endDate: '2026-12-31', status: 'In Progress', type: 'Till Dec 2026', initiative: 'Ignite AI (AI Delivery/Sales/Product)', notes: '' },
  { id: 9,  name: 'L&D Dashboard Data Management & Tracking', owner: 'Nikhil',       startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Other',   notes: '' },
  { id: 10, name: 'Professional Edge Training Preparation', owner: 'Nikhil',         startDate: '2026-04-03', endDate: '2026-04-27', status: 'In Progress', type: '',              initiative: 'Professional Certifications', notes: '' },
  { id: 11, name: 'ISMS Compliance Training',               owner: 'Tanaya',         startDate: '2026-04-15', endDate: '2026-06-30', status: 'On Going',    type: 'Quarterly',     initiative: 'ISMS/POSH/L100', notes: 'Annual compliance requirement' },
  { id: 12, name: 'Gemini Certification Drive - Cohort 1',  owner: 'Nikhil',         startDate: '2026-05-01', endDate: '2026-07-31', status: 'Not Started', type: 'Till Dec 2026', initiative: 'Gemini Enterprise Certification Drive', notes: '' },
  { id: 13, name: 'Udemy License Management',               owner: 'Tanaya/Deepraj', startDate: '2026-04-01', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Udemy / Learnrush', notes: 'Monthly license renewal tracking' },
  { id: 14, name: 'Summer Internship Onboarding Program',   owner: 'Nikhil',         startDate: '2026-05-15', endDate: '2026-08-15', status: 'Not Started', type: 'One-time',      initiative: 'Summer Internship', notes: '' },
  { id: 15, name: 'Leadership Training - Batch 2',          owner: 'Tanaya',         startDate: '2026-06-01', endDate: '2026-09-30', status: 'Not Started', type: '',              initiative: 'Leadership Training', notes: '' },
  { id: 16, name: 'Fresher Batch Induction',                owner: 'Nikhil',         startDate: '2026-04-20', endDate: '2026-05-20', status: 'In Progress', type: 'One-time',      initiative: 'Fresher Internship Training', notes: '' },
  { id: 17, name: 'AI Fluency for PE - Module 1',           owner: 'Tanaya/Deepraj', startDate: '2026-04-10', endDate: '2026-12-31', status: 'In Progress', type: 'Till Dec 2026', initiative: 'AI Fluency for PE', notes: '' },
  { id: 18, name: 'Priority Plays Session - Q2',            owner: 'Tanaya',         startDate: '2026-04-15', endDate: '2026-06-15', status: 'On Going',    type: 'Quarterly',     initiative: 'Priority Plays', notes: '' },
  { id: 19, name: 'Silver/Gold Bench Program Refresh',      owner: 'Nikhil',         startDate: '2026-05-01', endDate: '2026-10-31', status: 'Not Started', type: '',              initiative: 'Silver/Gold - Project and Bench', notes: '' },
  { id: 20, name: 'AI Hackathon Preparation',               owner: 'Tanaya/Deepraj', startDate: '2026-06-01', endDate: '2026-07-31', status: 'Not Started', type: 'One-time',      initiative: 'AI Hackathon', notes: '' },
];

/* ──────────────────────────────────────────
   2. STATE
────────────────────────────────────────── */

let activities = [];
let nextId = 21;
let editingId = null;
let sortCol = 'id';
let sortDir = 1;
let searchQuery = '';
let chartStatus, chartOwner, chartType;

/* ──────────────────────────────────────────
   3. INIT
────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  populateDropdowns();
  updateSidebarDate();
  renderAll();
  setInterval(updateSidebarDate, 60000);
});

function loadData() {
  const stored = localStorage.getItem('ld_tracker_activities');
  if (stored) {
    try {
      activities = JSON.parse(stored);
      nextId = activities.length ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    } catch { activities = [...DEFAULT_ACTIVITIES]; }
  } else {
    activities = [...DEFAULT_ACTIVITIES];
  }
}

function saveData() {
  localStorage.setItem('ld_tracker_activities', JSON.stringify(activities));
}

function populateDropdowns() {
  // Owner filter
  const owners = [...new Set(DEFAULT_ACTIVITIES.map(a => a.owner))].sort();
  const fOwner = document.getElementById('filter-owner');
  const ganttOwner = document.getElementById('gantt-filter-owner');
  owners.forEach(o => {
    fOwner.innerHTML += `<option>${o}</option>`;
    ganttOwner.innerHTML += `<option>${o}</option>`;
  });

  // Initiative dropdowns
  const fInit = document.getElementById('filter-initiative');
  const fFormInit = document.getElementById('f-initiative');
  INITIATIVES.forEach(i => {
    fInit.innerHTML += `<option>${i.name}</option>`;
    fFormInit.innerHTML += `<option>${i.name}</option>`;
  });
}

function updateSidebarDate() {
  const now = new Date();
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  document.getElementById('sidebar-date').textContent = now.toLocaleDateString('en-IN', opts);
}

/* ──────────────────────────────────────────
   4. NAVIGATION
────────────────────────────────────────── */

const PAGE_META = {
  dashboard:   { title: 'Dashboard',    subtitle: 'Overview of all L&D activities and initiatives' },
  activities:  { title: 'Activities',   subtitle: 'Manage and track all L&D activities' },
  initiatives: { title: 'Initiatives',  subtitle: 'Core L&D initiatives and their progress' },
  gantt:       { title: 'Timeline',     subtitle: 'Visual Gantt chart — Apr to Dec 2026' },
};

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

  const meta = PAGE_META[page] || {};
  document.getElementById('topbar-title').textContent = meta.title || page;
  document.getElementById('topbar-subtitle').textContent = meta.subtitle || '';

  if (page === 'gantt') renderGantt();
  if (page === 'initiatives') renderInitiatives();
  if (page === 'dashboard') renderDashboard();
}

function quickFilter(field, value) {
  navigate('activities');
  if (field === 'status') document.getElementById('filter-status').value = value;
  applyFilters();
}

/* ──────────────────────────────────────────
   5. RENDER ALL
────────────────────────────────────────── */

function renderAll() {
  renderSideBadges();
  renderTable(getFiltered());
  renderDashboard();
}

function renderSideBadges() {
  document.getElementById('nav-badge-activities').textContent = activities.length;
  document.getElementById('qf-completed').textContent = activities.filter(a => a.status === 'Completed').length;
  document.getElementById('qf-inprogress').textContent = activities.filter(a => a.status === 'In Progress').length;
  document.getElementById('qf-ongoing').textContent = activities.filter(a => a.status === 'On Going').length;
}

/* ──────────────────────────────────────────
   6. DASHBOARD
────────────────────────────────────────── */

function renderDashboard() {
  renderStatsCards();
  renderCharts();
  renderRecentList();
}

function renderStatsCards() {
  const total = activities.length;
  const completed = activities.filter(a => a.status === 'Completed').length;
  const inprogress = activities.filter(a => a.status === 'In Progress').length;
  const ongoing = activities.filter(a => a.status === 'On Going').length;
  const notStarted = activities.filter(a => a.status === 'Not Started').length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const cards = [
    { icon: '📋', value: total,      label: 'Total Activities', sub: `Across ${INITIATIVES.length} initiatives`,         accent: '#6C63FF', iconBg: 'rgba(108,99,255,0.12)' },
    { icon: '✅', value: completed,  label: 'Completed',        sub: `${pct}% completion rate`,                         accent: '#00C896', iconBg: 'rgba(0,200,150,0.12)' },
    { icon: '🔄', value: inprogress, label: 'In Progress',      sub: `${ongoing} on going`,                             accent: '#6C63FF', iconBg: 'rgba(108,99,255,0.12)' },
    { icon: '🔵', value: ongoing,    label: 'On Going',         sub: 'Active recurring work',                            accent: '#FFB347', iconBg: 'rgba(255,179,71,0.12)' },
    { icon: '⏳', value: notStarted, label: 'Not Started',      sub: 'Yet to begin',                                     accent: '#8B97A8', iconBg: 'rgba(139,151,168,0.12)' },
    { icon: '🎯', value: INITIATIVES.length, label: 'Initiatives', sub: 'Core L&D programmes',                          accent: '#00D4AA', iconBg: 'rgba(0,212,170,0.12)' },
  ];

  document.getElementById('stats-grid').innerHTML = cards.map(c => `
    <div class="stat-card" style="--card-accent:${c.accent};--card-bg-icon:${c.iconBg}">
      <div class="stat-icon">${c.icon}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-label">${c.label}</div>
      <div class="stat-sub">${c.sub}</div>
    </div>
  `).join('');
}

function getChartColors(isDark) {
  return {
    text: isDark ? '#9BA3C8' : '#5A6178',
    grid: isDark ? 'rgba(108,99,255,0.1)' : 'rgba(108,99,255,0.08)',
  };
}

function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function renderCharts() {
  const dark = isDarkMode();
  const colors = getChartColors(dark);

  const statusCounts = {
    'Completed':   activities.filter(a => a.status === 'Completed').length,
    'In Progress': activities.filter(a => a.status === 'In Progress').length,
    'On Going':    activities.filter(a => a.status === 'On Going').length,
    'Not Started': activities.filter(a => a.status === 'Not Started').length,
  };

  const ownerMap = {};
  activities.forEach(a => { ownerMap[a.owner] = (ownerMap[a.owner] || 0) + 1; });

  const typeMap = {};
  activities.forEach(a => {
    const t = a.type || 'None';
    typeMap[t] = (typeMap[t] || 0) + 1;
  });

  const defaultPlugin = { legend: { labels: { color: colors.text, font: { family: 'Inter', size: 12 } } } };

  // Status Doughnut
  if (chartStatus) chartStatus.destroy();
  chartStatus = new Chart(document.getElementById('chart-status'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: ['#00C896','#6C63FF','#FFB347','#8B97A8'],
        borderWidth: 2,
        borderColor: dark ? '#13152A' : '#FFFFFF',
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      cutout: '65%',
      plugins: { ...defaultPlugin, tooltip: { callbacks: {
        label: ctx => ` ${ctx.label}: ${ctx.parsed} (${Math.round(ctx.parsed/activities.length*100)}%)`
      }}},
    }
  });

  // Owner Bar
  if (chartOwner) chartOwner.destroy();
  chartOwner = new Chart(document.getElementById('chart-owner'), {
    type: 'bar',
    data: {
      labels: Object.keys(ownerMap),
      datasets: [{
        label: 'Activities',
        data: Object.values(ownerMap),
        backgroundColor: ['rgba(108,99,255,0.7)','rgba(0,212,170,0.7)','rgba(255,107,107,0.7)','rgba(255,179,71,0.7)','rgba(78,205,196,0.7)','rgba(108,99,255,0.4)'],
        borderRadius: 8, borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: true,
      plugins: { ...defaultPlugin, legend: { display: false } },
      scales: {
        x: { ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }, grid: { color: colors.grid } },
        y: { ticks: { color: colors.text, font: { family: 'Inter', size: 11 }, stepSize: 1 }, grid: { color: colors.grid }, beginAtZero: true },
      }
    }
  });

  // Type Bar
  if (chartType) chartType.destroy();
  chartType = new Chart(document.getElementById('chart-type'), {
    type: 'bar',
    data: {
      labels: Object.keys(typeMap),
      datasets: [{
        label: 'Count',
        data: Object.values(typeMap),
        backgroundColor: 'rgba(0,212,170,0.65)',
        borderRadius: 8, borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: true,
      plugins: { ...defaultPlugin, legend: { display: false } },
      scales: {
        x: { ticks: { color: colors.text, font: { family: 'Inter', size: 11 }, stepSize: 1 }, grid: { color: colors.grid }, beginAtZero: true },
        y: { ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }, grid: { color: colors.grid } },
      }
    }
  });
}

function renderRecentList() {
  const recent = [...activities].sort((a, b) => b.id - a.id).slice(0, 6);
  document.getElementById('recent-list').innerHTML = recent.map(a => `
    <div class="recent-item">
      <span style="font-size:20px">${statusIcon(a.status)}</span>
      <div class="recent-item-info">
        <div class="recent-item-name">${esc(a.name)}</div>
        <div class="recent-item-meta">${esc(a.owner)} · ${a.initiative || '—'} · ${a.startDate || 'TBD'}</div>
      </div>
      <span class="badge ${badgeClass(a.status)}">${a.status}</span>
      <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})">Edit</button>
    </div>
  `).join('');
}

/* ──────────────────────────────────────────
   7. ACTIVITY TABLE
────────────────────────────────────────── */

function getFiltered() {
  const status = document.getElementById('filter-status')?.value || '';
  const owner  = document.getElementById('filter-owner')?.value || '';
  const type   = document.getElementById('filter-type')?.value || '';
  const init   = document.getElementById('filter-initiative')?.value || '';
  const q      = searchQuery.toLowerCase();

  return activities
    .filter(a =>
      (!status || a.status === status) &&
      (!owner  || a.owner === owner) &&
      (!type   || a.type === type) &&
      (!init   || a.initiative === init) &&
      (!q      || a.name.toLowerCase().includes(q) || (a.owner||'').toLowerCase().includes(q) || (a.initiative||'').toLowerCase().includes(q))
    )
    .sort((a, b) => {
      let av = a[sortCol] ?? '', bv = b[sortCol] ?? '';
      if (sortCol === 'id') { av = a.id; bv = b.id; }
      if (av < bv) return -sortDir;
      if (av > bv) return sortDir;
      return 0;
    });
}

function renderTable(rows) {
  const tbody = document.getElementById('activity-tbody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📭</div><p>No activities found. Try adjusting filters or add a new activity.</p></div></td></tr>`;
    document.getElementById('table-count').textContent = '0 activities';
    return;
  }

  tbody.innerHTML = rows.map((a, idx) => {
    const rowClass = rowStatusClass(a.status);
    const ownerParts = a.owner.split('/');
    const ownerHtml = ownerParts.map(o => `<span class="owner-chip"><span class="owner-avatar ${avatarClass(o.trim())}">${o.trim()[0]}</span>${esc(o.trim())}</span>`).join(' ');

    return `
    <tr class="${rowClass}" id="row-${a.id}">
      <td class="sr-num">${idx + 1}</td>
      <td class="activity-name">
        ${esc(a.name)}
        ${a.notes ? `<small title="${esc(a.notes)}">📝 ${esc(a.notes.substring(0,40))}${a.notes.length>40?'…':''}</small>` : ''}
      </td>
      <td>${ownerHtml}</td>
      <td style="font-size:12px;color:var(--text-secondary);max-width:160px">${a.initiative ? `<span title="${esc(a.initiative)}">${esc(a.initiative.substring(0,28))}${a.initiative.length>28?'…':''}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td style="white-space:nowrap;font-size:12px">${fmtDate(a.startDate)}</td>
      <td style="white-space:nowrap;font-size:12px">${fmtDate(a.endDate)}</td>
      <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
      <td>${a.type ? `<span class="type-tag">${esc(a.type)}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})" title="Edit">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="deleteActivity(${a.id})" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  document.getElementById('table-count').textContent = `${rows.length} of ${activities.length} activities`;
  document.getElementById('table-last-updated').textContent = `Updated: ${new Date().toLocaleTimeString('en-IN')}`;

  // Update sort headers
  document.querySelectorAll('th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
  });
}

function sortTable(col) {
  if (sortCol === col) sortDir = -sortDir;
  else { sortCol = col; sortDir = 1; }
  renderTable(getFiltered());
}

function applyFilters() { renderTable(getFiltered()); }
function clearFilters() {
  ['filter-status','filter-owner','filter-type','filter-initiative'].forEach(id => {
    document.getElementById(id).value = '';
  });
  searchQuery = '';
  document.getElementById('global-search').value = '';
  renderTable(getFiltered());
}

function onSearch(val) {
  searchQuery = val;
  renderTable(getFiltered());
}

/* ──────────────────────────────────────────
   8. INITIATIVES
────────────────────────────────────────── */

const INIT_COLORS = {
  'Compliance':      '#FF6B6B',
  'Tool & Platform': '#4ECDC4',
  'I&D Team':        '#6C63FF',
  'Org Competency':  '#FFB347',
  'AI Adoption':     '#00D4AA',
  'Other':           '#8B97A8',
};

function renderInitiatives() {
  const catFilter = document.getElementById('filter-init-category')?.value || '';
  const filtered = catFilter ? INITIATIVES.filter(i => i.category === catFilter) : INITIATIVES;

  document.getElementById('initiatives-grid').innerHTML = filtered.map(init => {
    const linked = activities.filter(a => a.initiative === init.name);
    const done   = linked.filter(a => a.status === 'Completed').length;
    const pct    = linked.length ? Math.round((done / linked.length) * 100) : 0;
    const color  = INIT_COLORS[init.category] || '#6C63FF';

    return `
    <div class="initiative-card" style="--init-color:${color}" onclick="filterByInitiative('${esc(init.name)}')">
      <div class="init-header">
        <div>
          <div class="init-num">Initiative #${init.id}</div>
          <div class="init-name">${esc(init.name)}</div>
        </div>
        <span class="init-category" style="background:${color}22;color:${color}">${init.category}</span>
      </div>
      <div class="init-stats">
        <div class="init-stat"><div class="init-stat-val">${linked.length}</div><div class="init-stat-lbl">Activities</div></div>
        <div class="init-stat"><div class="init-stat-val">${done}</div><div class="init-stat-lbl">Done</div></div>
        <div class="init-stat"><div class="init-stat-val">${pct}%</div><div class="init-stat-lbl">Complete</div></div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,${color},${color}AA)"></div>
      </div>
      <div style="margin-top:10px;font-size:11px;color:var(--text-muted)">
        ${linked.length ? `Click to view activities →` : 'No activities linked yet'}
      </div>
    </div>`;
  }).join('');
}

function filterByInitiative(name) {
  navigate('activities');
  document.getElementById('filter-initiative').value = name;
  applyFilters();
  showToast(`📋 Showing activities for: ${name}`, 'info');
}

/* ──────────────────────────────────────────
   9. GANTT CHART
────────────────────────────────────────── */

const GANTT_START = new Date('2026-04-01');
const GANTT_END   = new Date('2026-12-31');
const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderGantt() {
  const ownerFilter = document.getElementById('gantt-filter-owner')?.value || '';
  const rows = activities.filter(a => {
    if (ownerFilter && a.owner !== ownerFilter) return false;
    return a.startDate || a.endDate;
  });

  // Month headers
  document.getElementById('gantt-month-headers').innerHTML = MONTHS.map(m =>
    `<div class="gantt-month-label" style="flex:1">${m}</div>`
  ).join('');

  const totalDays = daysBetween(GANTT_START, GANTT_END);

  document.getElementById('gantt-body').innerHTML = rows.length
    ? rows.map(a => {
        const start = a.startDate ? new Date(a.startDate) : GANTT_START;
        const end   = a.endDate   ? new Date(a.endDate)   : GANTT_END;
        const s = Math.max(0, daysBetween(GANTT_START, start));
        const e = Math.min(totalDays, daysBetween(GANTT_START, end));
        const leftPct  = (s / totalDays) * 100;
        const widthPct = Math.max(1, ((e - s) / totalDays) * 100);
        const barClass = a.status === 'Completed' ? 'status-completed' : a.status === 'On Going' ? 'status-ongoing' : '';

        return `
        <div class="gantt-row">
          <div class="gantt-label">
            <div style="font-weight:600;font-size:12px">${esc(a.name.substring(0,32))}${a.name.length>32?'…':''}</div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${esc(a.owner)}</div>
          </div>
          <div class="gantt-track" style="position:relative">
            <div class="gantt-bar ${barClass}"
              style="left:${leftPct.toFixed(1)}%;width:${widthPct.toFixed(1)}%;top:50%;transform:translateY(-50%);"
              title="${esc(a.name)} | ${fmtDate(a.startDate)} → ${fmtDate(a.endDate)} | ${a.status}">
              ${widthPct > 8 ? esc(a.name.substring(0,20)) : ''}
            </div>
          </div>
        </div>`;
      }).join('')
    : `<div class="empty-state" style="padding:40px"><div class="empty-icon">📭</div><p>No activities with dates to display.</p></div>`;
}

function daysBetween(a, b) {
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

/* ──────────────────────────────────────────
   10. CRUD — ADD / EDIT / DELETE
────────────────────────────────────────── */

function openModal(id = null) {
  editingId = id;
  const form = document.getElementById('activity-form');
  form.reset();

  if (id) {
    const a = activities.find(x => x.id === id);
    if (!a) return;
    document.getElementById('modal-title').textContent = '✏️ Edit Activity';
    document.getElementById('modal-save-btn').textContent = 'Update Activity';
    document.getElementById('f-name').value = a.name;
    document.getElementById('f-owner').value = a.owner;
    document.getElementById('f-status').value = a.status;
    document.getElementById('f-start').value = a.startDate;
    document.getElementById('f-end').value = a.endDate;
    document.getElementById('f-type').value = a.type;
    document.getElementById('f-initiative').value = a.initiative;
    document.getElementById('f-notes').value = a.notes;
  } else {
    document.getElementById('modal-title').textContent = '➕ Add Activity';
    document.getElementById('modal-save-btn').textContent = 'Save Activity';
    document.getElementById('f-start').value = '2026-04-03';
  }

  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  editingId = null;
}

function onOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function saveActivity(e) {
  e.preventDefault();
  const data = {
    name:       document.getElementById('f-name').value.trim(),
    owner:      document.getElementById('f-owner').value,
    status:     document.getElementById('f-status').value,
    startDate:  document.getElementById('f-start').value,
    endDate:    document.getElementById('f-end').value,
    type:       document.getElementById('f-type').value,
    initiative: document.getElementById('f-initiative').value,
    notes:      document.getElementById('f-notes').value.trim(),
  };

  if (editingId) {
    const idx = activities.findIndex(a => a.id === editingId);
    activities[idx] = { id: editingId, ...data };
    showToast('✅ Activity updated successfully!', 'success');
  } else {
    activities.push({ id: nextId++, ...data });
    showToast('🎉 Activity added successfully!', 'success');
  }

  saveData();
  closeModal();
  renderAll();

  // Highlight new row
  if (!editingId) {
    setTimeout(() => {
      const row = document.getElementById(`row-${nextId - 1}`);
      if (row) { row.classList.add('highlight-row'); setTimeout(() => row.classList.remove('highlight-row'), 2000); }
    }, 100);
  }
}

function editActivity(id) {
  navigate('activities');
  openModal(id);
}

function deleteActivity(id) {
  const a = activities.find(x => x.id === id);
  if (!a) return;
  if (!confirm(`Delete "${a.name}"?\n\nThis cannot be undone.`)) return;
  activities = activities.filter(x => x.id !== id);
  saveData();
  renderAll();
  showToast(`🗑️ "${a.name}" deleted.`, 'info');
}

/* ──────────────────────────────────────────
   11. EXPORT CSV
────────────────────────────────────────── */

function exportCSV() {
  const headers = ['Sr No','Name of Activity','Owner','Initiative','Start Date','End Date','Status','Type','Notes'];
  const rows = activities.map((a, i) => [
    i + 1, a.name, a.owner, a.initiative, a.startDate, a.endDate, a.status, a.type, a.notes
  ].map(v => `"${(v||'').replace(/"/g,'""')}"`));

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LD_Tracker_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('⬇️ CSV exported!', 'success');
}

/* ──────────────────────────────────────────
   11b. OPEN IN GOOGLE SHEETS
────────────────────────────────────────── */

function openInGoogleSheets() {
  // Step 1: auto-download the CSV
  exportCSV();
  // Step 2: show the guided import modal
  setTimeout(() => {
    document.getElementById('sheets-modal-overlay').classList.add('open');
  }, 600);
}

function closeSheetsModal() {
  document.getElementById('sheets-modal-overlay').classList.remove('open');
}

function onSheetsOverlayClick(e) {
  if (e.target === document.getElementById('sheets-modal-overlay')) closeSheetsModal();
}

/* ──────────────────────────────────────────
   12. TOAST NOTIFICATIONS
────────────────────────────────────────── */

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/* ──────────────────────────────────────────
   13. HELPERS
────────────────────────────────────────── */

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmtDate(d) {
  if (!d) return '<span style="color:var(--text-muted)">—</span>';
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return d; }
}

function badgeClass(status) {
  const map = { 'Completed': 'badge-completed', 'In Progress': 'badge-inprogress', 'On Going': 'badge-ongoing', 'Not Started': 'badge-notstarted' };
  return map[status] || 'badge-notstarted';
}

function rowStatusClass(status) {
  const map = { 'Completed': 'row-completed', 'In Progress': 'row-inprogress', 'On Going': 'row-ongoing' };
  return map[status] || '';
}

function avatarClass(name) {
  if (name === 'Tanaya') return 'av-tanaya';
  if (name === 'Nikhil') return 'av-nikhil';
  if (name === 'Deepraj') return 'av-deepraj';
  return 'av-multi';
}

function statusIcon(status) {
  const map = { 'Completed': '✅', 'In Progress': '🔄', 'On Going': '🔵', 'Not Started': '⏳' };
  return map[status] || '📌';
}

// Re-render charts when color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  renderCharts();
});
