/* ══════════════════════════════════════════════════
   L&D TRACKER v2.0 — APP LOGIC
   Calendar · Multi-Owner · Initiatives · Share ·
   Google Sheets Sync · Email Reminders · CRUD
   ══════════════════════════════════════════════════ */
'use strict';

/* ── 1. MASTER DATA ── */

const TEAM_EMAILS = {
  'Tejashri': 'tejashri.sapkal@onixnet.com',
  'Tanaya':   'tanaya.sankapal@onixnet.com',
  'Nikhil':   'nikhil.shelke@onixnet.com',
  'Deepraj':  'deepraj.bhosale@onixnet.com',
};

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

const INIT_COLORS = {
  'Compliance':      '#FF6B6B',
  'Tool & Platform': '#4ECDC4',
  'I&D Team':        '#6C63FF',
  'Org Competency':  '#FFB347',
  'AI Adoption':     '#00D4AA',
  'Other':           '#8B97A8',
};

const DEFAULT_ACTIVITIES = [
  { id:1,  name:'L&D Health Tracker Update',              owner:'Tanaya',          startDate:'2026-04-03', endDate:'',           status:'On Going',    type:'Monthly',       initiative:'Other',   notes:'' },
  { id:2,  name:'Google Policy Update Flyer',             owner:'Tanaya/Deepraj',  startDate:'2026-04-03', endDate:'',           status:'In Progress', type:'',              initiative:'Google Ecosystem', notes:'' },
  { id:3,  name:'LIA Icon',                               owner:'Tanaya',          startDate:'',           endDate:'',           status:'Completed',   type:'',              initiative:'LIA',     notes:'' },
  { id:4,  name:'LIA Betterment/Testing',                 owner:'Tanaya',          startDate:'2026-04-03', endDate:'',           status:'In Progress', type:'',              initiative:'LIA',     notes:'' },
  { id:5,  name:'AI Fluency Sales',                       owner:'Tanaya',          startDate:'2026-04-03', endDate:'2026-12-31', status:'In Progress', type:'Till Dec 2026', initiative:'Ignite AI (AI Delivery/Sales/Product)', notes:'' },
  { id:6,  name:'PNH, PA',                                owner:'Tanaya',          startDate:'2026-04-03', endDate:'',           status:'On Going',    type:'',              initiative:'DRI/DRP/PNH', notes:'' },
  { id:7,  name:'Expired Cert Reminder Email',            owner:'Tanaya',          startDate:'2026-04-03', endDate:'',           status:'On Going',    type:'Monthly',       initiative:'Professional Certifications', notes:'' },
  { id:8,  name:'AI Fluency Delivery',                    owner:'Tanaya/Deepraj',  startDate:'2026-04-03', endDate:'2026-12-31', status:'In Progress', type:'Till Dec 2026', initiative:'Ignite AI (AI Delivery/Sales/Product)', notes:'' },
  { id:9,  name:'L&D Dashboard Data Management & Tracking', owner:'Nikhil',        startDate:'2026-04-03', endDate:'',           status:'On Going',    type:'Monthly',       initiative:'Other',   notes:'' },
  { id:10, name:'Professional Edge Training Preparation', owner:'Nikhil',          startDate:'2026-04-03', endDate:'2026-04-27', status:'In Progress', type:'',              initiative:'Professional Certifications', notes:'' },
  { id:11, name:'ISMS Compliance Training',               owner:'Tejashri',        startDate:'2026-04-15', endDate:'2026-06-30', status:'On Going',    type:'Quarterly',     initiative:'ISMS/POSH/L100', notes:'Annual compliance' },
  { id:12, name:'Gemini Certification Drive - Cohort 1',  owner:'Nikhil',          startDate:'2026-05-01', endDate:'2026-07-31', status:'Not Started', type:'Till Dec 2026', initiative:'Gemini Enterprise Certification Drive', notes:'' },
  { id:13, name:'Udemy License Management',               owner:'Tanaya/Deepraj',  startDate:'2026-04-01', endDate:'',           status:'On Going',    type:'Monthly',       initiative:'Udemy / Learnrush', notes:'' },
  { id:14, name:'Summer Internship Onboarding Program',   owner:'Nikhil',          startDate:'2026-05-15', endDate:'2026-08-15', status:'Not Started', type:'One-time',      initiative:'Summer Internship', notes:'' },
  { id:15, name:'Leadership Training - Batch 2',          owner:'Tanaya',          startDate:'2026-06-01', endDate:'2026-09-30', status:'Not Started', type:'',              initiative:'Leadership Training', notes:'' },
  { id:16, name:'Fresher Batch Induction',                owner:'Nikhil',          startDate:'2026-04-20', endDate:'2026-05-20', status:'In Progress', type:'One-time',      initiative:'Fresher Internship Training', notes:'' },
  { id:17, name:'AI Fluency for PE - Module 1',           owner:'Tanaya/Deepraj',  startDate:'2026-04-10', endDate:'2026-12-31', status:'In Progress', type:'Till Dec 2026', initiative:'AI Fluency for PE', notes:'' },
  { id:18, name:'Priority Plays Session - Q2',            owner:'Tejashri/Tanaya', startDate:'2026-04-15', endDate:'2026-06-15', status:'On Going',    type:'Quarterly',     initiative:'Priority Plays', notes:'' },
  { id:19, name:'Silver/Gold Bench Program Refresh',      owner:'Nikhil',          startDate:'2026-05-01', endDate:'2026-10-31', status:'Not Started', type:'',              initiative:'Silver/Gold - Project and Bench', notes:'' },
  { id:20, name:'AI Hackathon Preparation',               owner:'Tejashri/Deepraj',startDate:'2026-06-01', endDate:'2026-07-31', status:'Not Started', type:'One-time',      initiative:'AI Hackathon', notes:'' },
];

/* ── 2. STATE ── */
let activities = [];
let coreInitiatives = JSON.parse(localStorage.getItem('ld_core_initiatives')||'[]');
let nextId = 21;
let editingId = null;
let sortCol = 'id';
let sortDir = 1;
let searchQuery = '';
let chartStatus, chartOwner, chartType;
let subActivityModal = null;

// Calendar state — start at current month (Oct 2026)
let calYear  = 2026;
let calMonth = 9; // 0-indexed: 9 = October

// Reminder state
let remindersEnabled = false;
let reminderInterval = null;

/* ── 3. INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  populateInitDropdowns();
  updateSidebarDate();
  setInterval(updateSidebarDate, 60000);

  // Restore reminder state
  if (localStorage.getItem('ld_reminders_enabled') === '1') {
    remindersEnabled = true;
    const cb = document.getElementById('enable-reminders');
    if (cb) cb.checked = true;
    startReminderCheck();
  }

  renderAll();

  // Close owner dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const ms = document.getElementById('owner-multiselect');
    if (ms && !ms.contains(e.target)) {
      const dd = document.getElementById('owner-ms-dropdown');
      if (dd) dd.classList.remove('open');
    }
  });
});

function loadData() {
  const stored = localStorage.getItem('ld_tracker_v2');
  if (stored) {
    try {
      activities = JSON.parse(stored);
      nextId = activities.length ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    } catch { activities = [...DEFAULT_ACTIVITIES]; }
  } else {
    activities = [...DEFAULT_ACTIVITIES];
  }
  // Load extra initiatives saved by user
  const extraInits = JSON.parse(localStorage.getItem('ld_extra_initiatives')||'[]');
  extraInits.forEach(ni => {
    if (!INITIATIVES.find(i=>i.id===ni.id)) INITIATIVES.push(ni);
  });
}

function saveData() { localStorage.setItem('ld_tracker_v2', JSON.stringify(activities)); }

function populateInitDropdowns() {
  const fInit = document.getElementById('filter-initiative');
  const fFormInit = document.getElementById('f-initiative');
  INITIATIVES.forEach(i => {
    if (fInit) fInit.innerHTML += `<option>${i.name}</option>`;
    if (fFormInit) fFormInit.innerHTML += `<option>${i.name}</option>`;
  });
}

function updateSidebarDate() {
  const el = document.getElementById('sidebar-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-IN', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
}

/* ── 4. NAVIGATION ── */
const PAGE_META = {
  dashboard:   { title:'Dashboard',   subtitle:'Overview of all L&D activities and initiatives' },
  activities:  { title:'Activities',  subtitle:'Manage and track all L&D activities' },
  initiatives: { title:'Initiatives', subtitle:'All 18 core L&D initiatives with activity details' },
  calendar:    { title:'Calendar',    subtitle:'Monthly view — click a date to see tasks' },
  gantt:       { title:'Timeline',    subtitle:'Visual Gantt chart — Apr to Dec 2026' },
};

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById('page-' + page);
  if (pg) pg.classList.add('active');
  const nav = document.querySelector(`[data-page="${page}"]`);
  if (nav) nav.classList.add('active');
  const meta = PAGE_META[page] || {};
  document.getElementById('topbar-title').textContent = meta.title || page;
  document.getElementById('topbar-subtitle').textContent = meta.subtitle || '';
  if (page === 'gantt') renderGantt();
  if (page === 'initiatives') renderInitiatives();
  if (page === 'calendar') renderCalendar();
  if (page === 'dashboard') renderDashboard();
}

function quickFilter(field, val) {
  navigate('activities');
  if (field === 'status') document.getElementById('filter-status').value = val;
  if (field === 'owner')  document.getElementById('filter-owner').value  = val;
  applyFilters();
}

/* ── 5. RENDER ALL ── */
function renderAll() {
  renderSideBadges();
  renderTable(getFiltered());
  renderDashboard();
}

function renderSideBadges() {
  document.getElementById('nav-badge-activities').textContent = activities.length;
  document.getElementById('qf-completed').textContent  = activities.filter(a => a.status === 'Completed').length;
  document.getElementById('qf-inprogress').textContent = activities.filter(a => a.status === 'In Progress').length;
  document.getElementById('qf-ongoing').textContent    = activities.filter(a => a.status === 'On Going').length;
}

/* ── 6. DASHBOARD ── */
function renderDashboard() {
  renderStatsCards();
  renderOwnerBoxes();
  renderCharts();
  renderRecentList();
}

function renderStatsCards() {
  const total   = activities.length;
  const done    = activities.filter(a => a.status === 'Completed').length;
  const inp     = activities.filter(a => a.status === 'In Progress').length;
  const ong     = activities.filter(a => a.status === 'On Going').length;
  const ns      = activities.filter(a => a.status === 'Not Started').length;
  const pct     = total ? Math.round((done / total) * 100) : 0;

  const cards = [
    { icon:'📋', value:total, label:'Total Activities', sub:`Across ${INITIATIVES.length} initiatives`, accent:'#6C63FF', iconBg:'rgba(108,99,255,0.1)' },
    { icon:'✅', value:done,  label:'Completed',        sub:`${pct}% completion rate`,                  accent:'#00C896', iconBg:'rgba(0,200,150,0.1)' },
    { icon:'🔄', value:inp,   label:'In Progress',      sub:`${ong} on going`,                          accent:'#6C63FF', iconBg:'rgba(108,99,255,0.1)' },
    { icon:'🔵', value:ong,   label:'On Going',         sub:'Active recurring work',                     accent:'#FFB347', iconBg:'rgba(255,179,71,0.1)' },
    { icon:'⏳', value:ns,    label:'Not Started',      sub:'Yet to begin',                              accent:'#8B97A8', iconBg:'rgba(139,151,168,0.1)' },
    { icon:'🎯', value:INITIATIVES.length, label:'Initiatives', sub:'Core L&D programmes',              accent:'#00D4AA', iconBg:'rgba(0,212,170,0.1)' },
  ];

  document.getElementById('stats-grid').innerHTML = cards.map(c => `
    <div class="stat-card" style="--card-accent:${c.accent};--card-bg-icon:${c.iconBg}">
      <div class="stat-icon">${c.icon}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-label">${c.label}</div>
      <div class="stat-sub">${c.sub}</div>
    </div>`).join('');
}

/* ── 6b. OWNER SUMMARY BOXES ── */
function renderOwnerBoxes() {
  const container = document.getElementById('owner-boxes');
  if (!container) return;
  const ownerNames = Object.keys(TEAM_EMAILS);
  container.innerHTML = ownerNames.map(name => {
    const owned = activities.filter(a => a.owner.split('/').map(o=>o.trim()).includes(name));
    const total   = owned.length;
    const done    = owned.filter(a => a.status === 'Completed').length;
    const pending = total - done;
    const pct     = total ? Math.round((done/total)*100) : 0;
    const avatarCls = avatarClass(name);
    return `<div class="owner-box" onclick="quickFilter('owner','${name}')" title="Click to filter by ${name}" style="cursor:pointer">
      <div class="owner-box-avatar av-dot ${avatarCls}" style="width:36px;height:36px;font-size:14px;margin:0 auto 8px">${name[0]}</div>
      <div class="owner-name">${name}</div>
      <div class="task-count">${total}</div>
      <div class="owner-sub">Total Tasks</div>
      <div class="owner-box-stats">
        <span class="ob-stat done">✅ ${done} Done</span>
        <span class="ob-stat pend">⏳ ${pending} Pending</span>
      </div>
      <div class="owner-box-bar"><div class="owner-box-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function isDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }

function renderCharts() {
  const dark = isDark();
  const textColor = dark ? '#9BA3C8' : '#5A6178';
  const gridColor = dark ? 'rgba(108,99,255,0.09)' : 'rgba(108,99,255,0.07)';

  const statusMap = { 'Completed':0,'In Progress':0,'On Going':0,'Not Started':0 };
  activities.forEach(a => { if (statusMap[a.status] !== undefined) statusMap[a.status]++; });

  const ownerMap = {};
  activities.forEach(a => {
    a.owner.split('/').forEach(o => {
      o = o.trim();
      ownerMap[o] = (ownerMap[o] || 0) + 1;
    });
  });

  const typeMap = {};
  activities.forEach(a => { const t = a.type || 'None'; typeMap[t] = (typeMap[t]||0)+1; });

  const plug = { legend:{ labels:{ color:textColor, font:{ family:'Inter', size:12 } } } };

  if (chartStatus) chartStatus.destroy();
  chartStatus = new Chart(document.getElementById('chart-status'), {
    type:'doughnut',
    data:{ labels:Object.keys(statusMap), datasets:[{
      data:Object.values(statusMap),
      backgroundColor:['#00C896','#6C63FF','#FFB347','#8B97A8'],
      borderWidth:2, borderColor: dark?'#13152A':'#FFF', hoverOffset:8,
    }]},
    options:{ responsive:true, maintainAspectRatio:true, cutout:'65%', plugins:{ ...plug } },
  });

  if (chartOwner) chartOwner.destroy();
  chartOwner = new Chart(document.getElementById('chart-owner'), {
    type:'bar',
    data:{ labels:Object.keys(ownerMap), datasets:[{
      label:'Activities',
      data:Object.values(ownerMap),
      backgroundColor:['rgba(255,107,157,0.75)','rgba(108,99,255,0.75)','rgba(0,212,170,0.75)','rgba(255,107,107,0.75)','rgba(255,179,71,0.65)'],
      borderRadius:8, borderSkipped:false,
    }]},
    options:{ responsive:true, maintainAspectRatio:true, plugins:{ ...plug, legend:{ display:false } },
      scales:{ x:{ ticks:{ color:textColor, font:{family:'Inter',size:11} }, grid:{ color:gridColor } },
               y:{ ticks:{ color:textColor, font:{family:'Inter',size:11}, stepSize:1 }, grid:{ color:gridColor }, beginAtZero:true } } },
  });

  if (chartType) chartType.destroy();
  chartType = new Chart(document.getElementById('chart-type'), {
    type:'bar',
    data:{ labels:Object.keys(typeMap), datasets:[{
      label:'Count', data:Object.values(typeMap),
      backgroundColor:'rgba(0,212,170,0.65)', borderRadius:8, borderSkipped:false,
    }]},
    options:{ indexAxis:'y', responsive:true, maintainAspectRatio:true,
      plugins:{ ...plug, legend:{ display:false } },
      scales:{ x:{ ticks:{ color:textColor, font:{family:'Inter',size:11}, stepSize:1 }, grid:{ color:gridColor }, beginAtZero:true },
               y:{ ticks:{ color:textColor, font:{family:'Inter',size:11} }, grid:{ color:gridColor } } } },
  });
}

function renderRecentList() {
  const recent = [...activities].sort((a,b) => b.id - a.id).slice(0,6);
  document.getElementById('recent-list').innerHTML = recent.map(a => `
    <div class="recent-item">
      <span style="font-size:19px">${statusIcon(a.status)}</span>
      <div class="recent-item-info">
        <div class="recent-item-name">${esc(a.name)}</div>
        <div class="recent-item-meta">${esc(a.owner)} · ${a.initiative||'—'} · ${a.startDate||'TBD'}</div>
      </div>
      <span class="badge ${badgeClass(a.status)}">${a.status}</span>
      <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})">Edit</button>
    </div>`).join('');
}

/* ── 7. ACTIVITY TABLE ── */
function getFiltered() {
  const status = (document.getElementById('filter-status')?.value)||'';
  const owner  = (document.getElementById('filter-owner')?.value)||'';
  const type   = (document.getElementById('filter-type')?.value)||'';
  const init   = (document.getElementById('filter-initiative')?.value)||'';
  const q      = searchQuery.toLowerCase();

  return activities
    .filter(a =>
      (!status || a.status === status) &&
      (!owner  || a.owner.split('/').map(o=>o.trim()).includes(owner)) &&
      (!type   || a.type === type) &&
      (!init   || a.initiative === init) &&
      (!q      || a.name.toLowerCase().includes(q) || (a.owner||'').toLowerCase().includes(q) || (a.initiative||'').toLowerCase().includes(q))
    )
    .sort((a,b) => {
      let av = a[sortCol]??'', bv = b[sortCol]??'';
      if (sortCol === 'id') { av=a.id; bv=b.id; }
      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });
}

function renderTable(rows) {
  const tbody = document.getElementById('activity-tbody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="ei">📭</div><p>No activities found. Try adjusting filters or add a new activity.</p></div></td></tr>`;
    document.getElementById('table-count').textContent = '0 activities';
    return;
  }
  tbody.innerHTML = rows.map((a,idx) => {
    const ownerHtml = a.owner.split('/').map(o => {
      o = o.trim();
      return `<span class="owner-chip"><span class="av-dot ${avatarClass(o)}" style="width:17px;height:17px;font-size:8px">${o[0]}</span>${esc(o)}</span>`;
    }).join('');
    const subCount = (a.subActivities||[]).length;
    return `<tr class="${rowClass(a.status)}" id="row-${a.id}">
      <td class="sr-num">${idx+1}</td>
      <td class="activity-name">${esc(a.name)}${a.notes?`<small title="${esc(a.notes)}">📝 ${esc(a.notes.substring(0,38))}${a.notes.length>38?'…':''}</small>`:''}${subCount?`<small style="color:var(--brand-primary)">📌 ${subCount} sub-task${subCount>1?'s':''}</small>`:''}</td>
      <td>${ownerHtml}</td>
      <td style="font-size:12px;color:var(--text-secondary);max-width:155px">${a.initiative?`<span title="${esc(a.initiative)}">${esc(a.initiative.substring(0,26))}${a.initiative.length>26?'…':''}</span>`:'<span style="color:var(--text-muted)">—</span>'}</td>
      <td style="white-space:nowrap;font-size:12px">${fmtDate(a.startDate)}</td>
      <td style="white-space:nowrap;font-size:12px">${fmtDate(a.endDate)}</td>
      <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
      <td>${a.type?`<span class="type-tag">${esc(a.type)}</span>`:'<span style="color:var(--text-muted)">—</span>'}</td>
      <td><div class="action-btns">
        <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})" title="Edit">✏️</button>
        <button class="btn btn-sm" style="background:rgba(0,180,120,0.13);color:#00b478;border:1px solid rgba(0,180,120,0.25)" onclick="openSubActivityModal(${a.id})" title="Add Sub-Activity">➕ Sub</button>
        <button class="btn btn-sm btn-danger" onclick="deleteActivity(${a.id})" title="Delete">🗑️</button>
      </div></td>
    </tr>`;
  }).join('');
  document.getElementById('table-count').textContent = `${rows.length} of ${activities.length} activities`;
  document.getElementById('table-last-updated').textContent = `Updated: ${new Date().toLocaleTimeString('en-IN')}`;
}

function sortTable(col) {
  if (sortCol === col) sortDir = -sortDir; else { sortCol=col; sortDir=1; }
  renderTable(getFiltered());
}

function applyFilters() { renderTable(getFiltered()); }
function clearFilters() {
  ['filter-status','filter-owner','filter-type','filter-initiative'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  searchQuery=''; document.getElementById('global-search').value='';
  renderTable(getFiltered());
}
function onSearch(v) { searchQuery=v; renderTable(getFiltered()); }

/* ── 8. INITIATIVES — RECTANGULAR ── */
/* ── 8b. CORE INITIATIVES ── */
function openAddCoreInitiativeModal() {
  const name = prompt('Enter new Core Initiative name:');
  if (!name || !name.trim()) return;
  const cat  = prompt('Enter category (e.g. Org Competency, AI Adoption, Compliance, Other):') || 'Other';
  const newId = INITIATIVES.length ? Math.max(...INITIATIVES.map(i=>i.id))+1 : 19;
  const ni = { id: newId, name: name.trim(), category: cat.trim() };
  INITIATIVES.push(ni);
  // Persist extra initiatives to localStorage
  const extra = JSON.parse(localStorage.getItem('ld_extra_initiatives')||'[]');
  extra.push(ni);
  localStorage.setItem('ld_extra_initiatives', JSON.stringify(extra));
  populateInitDropdowns();
  renderInitiatives();
  showToast(`🎯 Core Initiative "${ni.name}" added!`, 'success');
}

function renderInitiatives() {
  const cat = document.getElementById('filter-init-category')?.value||'';
  const list = cat ? INITIATIVES.filter(i=>i.category===cat) : INITIATIVES;

  document.getElementById('initiatives-grid').innerHTML = list.map(init => {
    const linked = activities.filter(a => a.initiative === init.name);
    const done   = linked.filter(a => a.status === 'Completed').length;
    const pct    = linked.length ? Math.round((done/linked.length)*100) : 0;
    const color  = INIT_COLORS[init.category] || '#6C63FF';

    const actRows = linked.length
      ? linked.map(a => `
        <div class="init-act-item">
          <span style="font-size:14px">${statusIcon(a.status)}</span>
          <span class="init-act-name">${esc(a.name)}</span>
          <span class="init-act-owner">${esc(a.owner)}</span>
          <span class="badge ${badgeClass(a.status)}" style="font-size:10px">${a.status}</span>
          <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id});event.stopPropagation()">✏️</button>
        </div>`).join('')
      : `<div class="init-act-item" style="color:var(--text-muted);font-style:italic;font-size:13px">No activities linked yet — click ➕ Add Activity</div>`;

    return `
    <div class="initiative-row" id="init-row-${init.id}" style="--init-color:${color}">
      <div class="init-row-header" onclick="toggleInitRow(${init.id})">
        <span class="init-row-num">#${init.id}</span>
        <span class="init-row-name">${esc(init.name)}</span>
        <span class="init-row-cat" style="background:${color}22;color:${color}">${init.category}</span>
        <div class="init-row-stats">
          <div class="init-row-stat">
            <span class="init-row-stat-val">${linked.length}</span>
            <span class="init-row-stat-lbl">Activities</span>
          </div>
          <div class="init-row-stat">
            <span class="init-row-stat-val">${done}</span>
            <span class="init-row-stat-lbl">Done</span>
          </div>
          <div class="init-row-stat">
            <span class="init-row-stat-val">${pct}%</span>
            <span class="init-row-stat-lbl">Complete</span>
          </div>
          <div class="init-row-prog">
            <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:${color}"></div></div>
          </div>
        </div>
        <span class="init-row-toggle" id="init-toggle-${init.id}">▶</span>
      </div>
      <div class="init-activities-section">${actRows}</div>
    </div>`;
  }).join('');
}

function toggleInitRow(id) {
  const row = document.getElementById(`init-row-${id}`);
  const tog = document.getElementById(`init-toggle-${id}`);
  if (!row) return;
  row.classList.toggle('expanded');
  tog.textContent = row.classList.contains('expanded') ? '▼' : '▶';
}

/* ── 9. CALENDAR — GOOGLE CALENDAR STYLE ── */
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderCalendar() {
  const yr = calYear, mo = calMonth;
  document.getElementById('cal-month-title').textContent = `${MONTHS[mo]} ${yr}`;

  const statusF = document.getElementById('cal-status-filter')?.value||'';
  const ownerF  = document.getElementById('cal-owner-filter')?.value||'';

  const firstDay   = new Date(yr, mo, 1).getDay();
  const daysInMon  = new Date(yr, mo+1, 0).getDate();
  const prevDays   = new Date(yr, mo, 0).getDate();
  const today      = new Date();

  // Build day → activities map
  const byDay = {};
  activities.forEach(a => {
    if (statusF && a.status !== statusF) return;
    if (ownerF  && !a.owner.split('/').map(o=>o.trim()).includes(ownerF)) return;

    const addDay = (d) => {
      if (!byDay[d]) byDay[d] = [];
      byDay[d].push(a);
    };
    if (a.startDate) {
      const s = new Date(a.startDate);
      if (s.getFullYear()===yr && s.getMonth()===mo) addDay(s.getDate());
    }
    if (a.endDate && a.endDate !== a.startDate) {
      const e = new Date(a.endDate);
      if (e.getFullYear()===yr && e.getMonth()===mo) addDay(e.getDate());
    }
  });

  // Build 42-cell grid
  const cells = [];
  for (let i=firstDay-1; i>=0; i--) cells.push({ day:prevDays-i, other:true });
  for (let d=1; d<=daysInMon; d++) {
    const isToday = today.getFullYear()===yr && today.getMonth()===mo && today.getDate()===d;
    cells.push({ day:d, other:false, isToday, acts:byDay[d]||[] });
  }
  while (cells.length < 42) cells.push({ day:cells.length-firstDay-daysInMon+1, other:true });

  document.getElementById('cal-grid').innerHTML = cells.map(cell => {
    if (cell.other) return `<div class="cal-cell other-month"><div class="cal-date-num">${cell.day}</div></div>`;
    const pills = (cell.acts||[]).slice(0,3).map(a =>
      `<span class="cal-pill" style="background:${statusColor(a.status)}" title="${esc(a.name)}" onclick="event.stopPropagation();editActivity(${a.id})">${esc(a.name.substring(0,18))}${a.name.length>18?'…':''}</span>`
    ).join('');
    const more = (cell.acts||[]).length > 3 ? `<div class="cal-more">+${cell.acts.length-3} more</div>` : '';
    return `<div class="cal-cell${cell.isToday?' today':''}" onclick="showCalDay(${cell.day},${yr},${mo})">
      <div class="cal-date-num">${cell.day}</div>
      ${pills}${more}
    </div>`;
  }).join('');
}

function showCalDay(day, yr, mo) {
  const acts = activities.filter(a => {
    const sd = (d,y,m,dd) => d && new Date(d).getFullYear()===y && new Date(d).getMonth()===m && new Date(d).getDate()===dd;
    return sd(a.startDate,yr,mo,day) || sd(a.endDate,yr,mo,day);
  });
  const dateObj = new Date(yr,mo,day);
  document.getElementById('cal-detail-date').textContent = dateObj.toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('cal-detail-list').innerHTML = acts.length
    ? acts.map(a => `<div class="recent-item" style="margin-bottom:8px">
        <span style="font-size:18px">${statusIcon(a.status)}</span>
        <div class="recent-item-info">
          <div class="recent-item-name">${esc(a.name)}</div>
          <div class="recent-item-meta">${esc(a.owner)} · ${a.initiative||'—'}</div>
        </div>
        <span class="badge ${badgeClass(a.status)}">${a.status}</span>
        <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})">Edit</button>
      </div>`).join('')
    : '<p style="color:var(--text-muted);font-size:13px;padding:8px 0">No activities on this date.</p>';
  document.getElementById('cal-detail').style.display = 'block';
}

function changeMonth(dir) { calMonth += dir; if (calMonth<0) { calMonth=11; calYear--; } if (calMonth>11) { calMonth=0; calYear++; } renderCalendar(); }
function goToToday() { const t=new Date(); calYear=t.getFullYear(); calMonth=t.getMonth(); renderCalendar(); }

/* ── 10. GANTT ── */
const GANTT_START = new Date('2026-04-01');
const GANTT_END   = new Date('2026-12-31');
const GANTT_MONTHS= ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderGantt() {
  const statusF = document.getElementById('gantt-status-filter')?.value||'';
  const ownerF  = document.getElementById('gantt-filter-owner')?.value||'';

  const rows = activities.filter(a => {
    if (statusF && a.status !== statusF) return false;
    if (ownerF  && !a.owner.split('/').map(o=>o.trim()).includes(ownerF)) return false;
    return a.startDate || a.endDate;
  });

  document.getElementById('gantt-month-headers').innerHTML = GANTT_MONTHS.map(m =>
    `<div class="gantt-month-lbl">${m}</div>`).join('');

  const total = daysBetween(GANTT_START, GANTT_END);

  document.getElementById('gantt-body').innerHTML = rows.length
    ? rows.map(a => {
        const s = a.startDate ? new Date(a.startDate) : GANTT_START;
        const e = a.endDate   ? new Date(a.endDate)   : GANTT_END;
        const leftD  = Math.max(0, daysBetween(GANTT_START, s));
        const endD   = Math.min(total, daysBetween(GANTT_START, e));
        const leftPct  = (leftD/total*100).toFixed(1);
        const widthPct = Math.max(1, ((endD-leftD)/total*100)).toFixed(1);
        const gc = a.status==='Completed'?'gc': a.status==='On Going'?'go': a.status==='Not Started'?'gn':'';
        return `<div class="gantt-row">
          <div class="gantt-label">
            <div class="gantt-label-name">${esc(a.name.substring(0,30))}${a.name.length>30?'…':''}</div>
            <div class="gantt-label-owner">${esc(a.owner)}</div>
          </div>
          <div class="gantt-track">
            <div class="gantt-bar ${gc}" style="left:${leftPct}%;width:${widthPct}%" title="${esc(a.name)} | ${fmtDate(a.startDate)} → ${fmtDate(a.endDate)} | ${a.status}">
              ${parseFloat(widthPct) > 8 ? esc(a.name.substring(0,18)) : ''}
            </div>
          </div>
        </div>`;
      }).join('')
    : `<div class="empty-state"><div class="ei">📭</div><p>No activities to display for selected filters.</p></div>`;
}

function daysBetween(a,b) { return Math.round((b-a)/(1000*60*60*24)); }

/* ── 11. OWNER MULTI-SELECT ── */
function toggleOwnerDropdown(e) {
  e.stopPropagation();
  document.getElementById('owner-ms-dropdown').classList.toggle('open');
}

function updateOwnerDisplay() {
  const cbs = document.querySelectorAll('#owner-ms-dropdown input[type="checkbox"]');
  const sel  = Array.from(cbs).filter(c=>c.checked).map(c=>c.value);
  const disp = document.getElementById('owner-display');
  if (!sel.length) {
    disp.className = 'owner-display-placeholder';
    disp.textContent = 'Select owner(s)';
  } else {
    disp.className = 'owner-tags';
    disp.innerHTML = sel.map(n=>`<span class="owner-tag">${n}</span>`).join('');
  }
}

function getSelectedOwners() {
  const cbs = document.querySelectorAll('#owner-ms-dropdown input[type="checkbox"]');
  return Array.from(cbs).filter(c=>c.checked).map(c=>c.value);
}

function setSelectedOwners(ownerStr) {
  const owners = ownerStr ? ownerStr.split('/').map(o=>o.trim()) : [];
  const cbs = document.querySelectorAll('#owner-ms-dropdown input[type="checkbox"]');
  cbs.forEach(cb => { cb.checked = owners.includes(cb.value); });
  updateOwnerDisplay();
}

/* ── 12. CRUD ── */
function openModal(id=null) {
  editingId = id;
  document.getElementById('activity-form').reset();
  setSelectedOwners('');

  if (id) {
    const a = activities.find(x=>x.id===id);
    if (!a) return;
    document.getElementById('modal-title').textContent = '✏️ Edit Activity';
    document.getElementById('modal-save-btn').textContent = 'Update Activity';
    document.getElementById('f-name').value        = a.name;
    document.getElementById('f-status').value      = a.status;
    document.getElementById('f-start').value       = a.startDate;
    document.getElementById('f-end').value         = a.endDate;
    document.getElementById('f-type').value        = a.type;
    document.getElementById('f-initiative').value  = a.initiative;
    document.getElementById('f-notes').value       = a.notes;
    document.getElementById('f-meeting').value     = a.meetingDate||'';
    setSelectedOwners(a.owner);
  } else {
    document.getElementById('modal-title').textContent = '➕ Add Activity';
    document.getElementById('modal-save-btn').textContent = 'Save Activity';
    document.getElementById('f-start').value = '2026-04-03';
  }
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); editingId=null; }
function onOverlayClick(e) { if (e.target===document.getElementById('modal-overlay')) closeModal(); }

function saveActivity(e) {
  e.preventDefault();
  const owners = getSelectedOwners();
  if (!owners.length) { showToast('⚠️ Please select at least one owner.','error'); return; }

  const data = {
    name:        document.getElementById('f-name').value.trim(),
    owner:       owners.join('/'),
    status:      document.getElementById('f-status').value,
    startDate:   document.getElementById('f-start').value,
    endDate:     document.getElementById('f-end').value,
    type:        document.getElementById('f-type').value,
    initiative:  document.getElementById('f-initiative').value,
    notes:       document.getElementById('f-notes').value.trim(),
    meetingDate: document.getElementById('f-meeting').value,
  };

  if (editingId) {
    const idx = activities.findIndex(a=>a.id===editingId);
    const existing = activities[idx];
    activities[idx] = { id:editingId, subActivities: existing.subActivities||[], ...data };
    showToast('✅ Activity updated!','success');
  } else {
    activities.push({ id:nextId++, subActivities:[], ...data });
    showToast('🎉 Activity added!','success');
  }

  // Schedule 2-day ahead browser reminder immediately if end date is in 2 days
  const endDt = data.endDate ? new Date(data.endDate) : null;
  if (endDt) {
    const today = new Date(); today.setHours(0,0,0,0);
    endDt.setHours(0,0,0,0);
    const diff = (endDt - today)/(1000*60*60*24);
    if (diff === 2) {
      const fd = endDt.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
      showToast(`📅 Reminder set! This task's completion date is ${fd}.`,'info');
    }
  }

  saveData(); closeModal(); renderAll();
}

function editActivity(id) { navigate('activities'); openModal(id); }

function deleteActivity(id) {
  const a = activities.find(x=>x.id===id);
  if (!a || !confirm(`Delete "${a.name}"?\nThis cannot be undone.`)) return;
  activities = activities.filter(x=>x.id!==id);
  saveData(); renderAll();
  showToast(`🗑️ "${a.name}" deleted.`,'info');
}

/* ── 13. SHARE / EMAIL ── */
function openShareModal() {
  buildShareMessage();
  document.getElementById('share-modal-overlay').classList.add('open');
}
function closeShareModal() { document.getElementById('share-modal-overlay').classList.remove('open'); }
function onShareOverlayClick(e) { if (e.target===document.getElementById('share-modal-overlay')) closeShareModal(); }

function buildShareMessage() {
  const total = activities.length;
  const done  = activities.filter(a=>a.status==='Completed').length;
  const inp   = activities.filter(a=>a.status==='In Progress').length;
  const ong   = activities.filter(a=>a.status==='On Going').length;
  const today = new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

  let msg = `Hi Team,\n\nHere is the L&D Activity Tracker update as of ${today}:\n\n`;
  msg += `📊 SUMMARY\n• Total Activities: ${total}\n• Completed: ${done}\n• In Progress: ${inp}\n• On Going: ${ong}\n\n`;
  msg += `🔄 IN PROGRESS\n`;
  activities.filter(a=>a.status==='In Progress').forEach(a => {
    msg += `• ${a.name} [${a.owner}]${a.endDate?` — Due: ${fmtDate(a.endDate)}`:''}\n`;
  });
  msg += `\n✅ COMPLETED\n`;
  activities.filter(a=>a.status==='Completed').slice(0,5).forEach(a => { msg += `• ${a.name} [${a.owner}]\n`; });
  msg += `\n📋 Google Sheet: https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/edit?gid=2050775428\n\nBest regards,\nL&D Team`;

  document.getElementById('share-message').value = msg;
}

function sendShareEmail() {
  const ids = ['email-tejashri','email-tanaya','email-nikhil','email-deepraj'];
  const to  = ids.filter(id=>document.getElementById(id).checked).map(id=>document.getElementById(id).value);
  if (!to.length) { showToast('⚠️ Select at least one recipient.','error'); return; }
  const subject = encodeURIComponent(document.getElementById('share-subject').value);
  const body    = encodeURIComponent(document.getElementById('share-message').value);
  window.location.href = `mailto:${to.join(';')}?subject=${subject}&body=${body}`;
  showToast('📧 Email client opened!','success');
  closeShareModal();
}

/* ── 14. EMAIL REMINDERS ── */
function toggleReminders(enabled) {
  if (enabled) {
    if (!('Notification' in window)) { showToast('⚠️ Browser does not support notifications.','error'); return; }
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        remindersEnabled = true;
        localStorage.setItem('ld_reminders_enabled','1');
        document.getElementById('reminder-status').style.display='block';
        startReminderCheck();
        showToast('🔔 Reminders enabled! You will receive desktop alerts.','success');
      } else {
        document.getElementById('enable-reminders').checked = false;
        showToast('⚠️ Please allow notifications in browser settings.','error');
      }
    });
  } else {
    remindersEnabled = false;
    localStorage.setItem('ld_reminders_enabled','0');
    stopReminderCheck();
    document.getElementById('reminder-status').style.display='none';
    showToast('🔕 Reminders disabled.','info');
  }
}

function startReminderCheck() { checkAndSendReminders(); reminderInterval = setInterval(checkAndSendReminders, 5*60*1000); }
function stopReminderCheck() { if (reminderInterval) clearInterval(reminderInterval); }

function checkAndSendReminders() {
  if (!remindersEnabled || Notification.permission !== 'granted') return;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  activities.forEach(a => {
    if (a.status === 'Completed') return;
    const rawDate = a.endDate || a.startDate;
    if (!rawDate) return;
    const taskDay = new Date(rawDate);
    taskDay.setHours(0,0,0,0);
    const diffDays = (taskDay - today) / (1000*60*60*24);

    // ── 2 days before: completion date reminder ──
    if (diffDays === 2) {
      const key = `rem2d_${a.id}_${rawDate}`;
      if (!localStorage.getItem(key)) {
        const friendlyDate = taskDay.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
        fireReminder(a,
          '📅 Task Completion Date Approaching',
          `⚠️ This task's completion date is ${friendlyDate}.\n"${a.name}" — Owner: ${a.owner}`);
        sendReminderEmail(a, '📅 Task Due in 2 Days', friendlyDate);
        localStorage.setItem(key,'1');
      }
    }

    // ── 1 day before ──
    if (diffDays === 1) {
      const key = `rem1d_${a.id}_${rawDate}`;
      if (!localStorage.getItem(key)) {
        const friendlyDate = taskDay.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
        fireReminder(a,'📅 Task due TOMORROW',
          `This task's completion date is ${friendlyDate}.\n"${a.name}" by ${a.owner} | Status: ${a.status}`);
        sendReminderEmail(a, '📅 Task Due Tomorrow', friendlyDate);
        localStorage.setItem(key,'1');
      }
    }

    // ── Same day — fire between 8–9 AM ──
    if (diffDays === 0) {
      const hr = now.getHours();
      const key = `rem1h_${a.id}_${rawDate}`;
      if (hr >= 8 && hr < 9 && !localStorage.getItem(key)) {
        fireReminder(a,'🚨 Task due TODAY', `"${a.name}" by ${a.owner} — Act now!`);
        sendReminderEmail(a, '🚨 Task Due TODAY', taskDay.toLocaleDateString('en-IN'));
        localStorage.setItem(key,'1');
      }
    }

    // ── Meeting reminder ──
    if (a.meetingDate) {
      const meetDay = new Date(a.meetingDate);
      meetDay.setHours(0,0,0,0);
      const meetDiff = (meetDay - today) / (1000*60*60*24);
      if (meetDiff === 1) {
        const key = `remmeet_${a.id}_${a.meetingDate}`;
        if (!localStorage.getItem(key)) {
          const mFriendly = meetDay.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
          fireReminder(a, '📆 Meeting Tomorrow!',
            `Meeting scheduled for ${mFriendly}\nActivity: "${a.name}"\nOwner: ${a.owner}\n\nAll the best for meeting and task! 🙌`);
          sendMeetingReminderEmail(a, mFriendly);
          generateMeetingICS(a, meetDay);
          localStorage.setItem(key,'1');
        }
      }
    }
  });
}

function fireReminder(activity, title, body) {
  // Desktop notification
  try {
    const n = new Notification(title, { body, icon:'📚', tag: `ld_${activity.id}` });
    n.onclick = () => { window.focus(); navigate('activities'); };
  } catch {}
  // In-app toast
  showToast(`${title}: ${activity.name}`, title.includes('🚨')?'error':'info');
  // Compose reminder email automatically
  sendReminderEmail(activity, title);
}

function sendReminderEmail(activity, alertTitle, friendlyDate) {
  const ownerEmails = activity.owner.split('/').map(o=>{
    const email = TEAM_EMAILS[o.trim()];
    return email || null;
  }).filter(Boolean);
  if (!ownerEmails.length) return;

  const fDate = friendlyDate || (activity.endDate ? new Date(activity.endDate).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}) : '—');
  const subject = encodeURIComponent(`${alertTitle} — ${activity.name}`);
  const body = encodeURIComponent(
`Hi ${activity.owner},

${alertTitle}

📋 Activity  : ${activity.name}
📌 Status    : ${activity.status}
📅 Due Date  : ${fDate}
🎯 Initiative: ${activity.initiative||'—'}

This task's completion date is ${fDate}. Please ensure timely completion.

You can view the full tracker here:
https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/edit?gid=2050775428

Best regards,
L&D Team`);

  const link = document.createElement('a');
  link.href = `mailto:${ownerEmails.join(';')}?subject=${subject}&body=${body}`;
  link.click();
}

function sendMeetingReminderEmail(activity, mFriendly) {
  const ownerEmails = activity.owner.split('/').map(o=>{
    const email = TEAM_EMAILS[o.trim()];
    return email || null;
  }).filter(Boolean);
  if (!ownerEmails.length) return;

  const subject = encodeURIComponent(`📆 Meeting Tomorrow — ${activity.name}`);
  const body = encodeURIComponent(
`Hi ${activity.owner},

You have a meeting scheduled for ${mFriendly}.

📋 Activity  : ${activity.name}
📌 Status    : ${activity.status}
🎯 Initiative: ${activity.initiative||'—'}

All the best for the meeting and task! 🙌

Please review all pending items before the meeting:
https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/edit?gid=2050775428

Best regards,
L&D Team`);

  const link = document.createElement('a');
  link.href = `mailto:${ownerEmails.join(';')}?subject=${subject}&body=${body}`;
  link.click();
}

function generateMeetingICS(activity, meetDay) {
  // .ics file so they can add to calendar
  const pad = n => String(n).padStart(2,'0');
  const dtStart = `${meetDay.getFullYear()}${pad(meetDay.getMonth()+1)}${pad(meetDay.getDate())}T090000`;
  const dtEnd   = `${meetDay.getFullYear()}${pad(meetDay.getMonth()+1)}${pad(meetDay.getDate())}T100000`;
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//L&D Tracker//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:📆 ${activity.name} — Meeting`,
    `DESCRIPTION:Activity: ${activity.name}\nOwner: ${activity.owner}\nStatus: ${activity.status}\nAll the best for the meeting and task!`,
    `ORGANIZER:CN=L&D Team:MAILTO:tejashri.sapkal@onixnet.com`,
    'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], {type:'text/calendar'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `Meeting_${activity.name.replace(/[^a-z0-9]/gi,'_').substring(0,30)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📅 Meeting added to calendar (.ics downloaded)!','success');
}

/* ── 15. GOOGLE SHEETS SYNC ── */
const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/export?format=csv&gid=2050775428';

function openSheetsSync()     { document.getElementById('sheets-sync-overlay').classList.add('open'); }
function closeSheetsSyncModal(){ document.getElementById('sheets-sync-overlay').classList.remove('open'); }
function onSheetsSyncOverlayClick(e) { if(e.target===document.getElementById('sheets-sync-overlay')) closeSheetsSyncModal(); }

async function syncFromSheets() {
  const btn    = document.getElementById('sync-btn');
  const status = document.getElementById('sync-status');
  btn.textContent = '⏳ Syncing…'; btn.disabled = true;
  status.style.display = 'block';
  status.style.cssText = 'display:block;padding:10px 14px;border-radius:8px;font-size:13px;margin-bottom:12px;line-height:1.6;background:rgba(108,99,255,0.06);border:1px solid rgba(108,99,255,0.18);color:var(--text-secondary)';
  status.textContent = '⏳ Connecting to Google Sheets…';

  try {
    const res = await fetch(SHEETS_CSV_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const imported = parseSheetCSV(csv);

    if (!imported.length) throw new Error('No data rows found. Check sheet format.');

    let newCount = 0;
    imported.forEach(imp => {
      const exists = activities.some(a => a.name.toLowerCase().trim() === imp.name.toLowerCase().trim());
      if (!exists) { activities.push({ id:nextId++, ...imp }); newCount++; }
    });
    saveData(); renderAll();

    status.style.background = 'rgba(0,200,150,0.07)';
    status.style.border = '1px solid rgba(0,200,150,0.2)';
    status.style.color = 'var(--status-completed)';
    status.innerHTML = `✅ Sync complete! <strong>${newCount} new</strong> activities imported · ${imported.length-newCount} already existed.`;
    showToast(`✅ ${newCount} new activities from Google Sheets!`,'success');

  } catch (err) {
    status.style.background = 'rgba(255,107,107,0.07)';
    status.style.border = '1px solid rgba(255,107,107,0.2)';
    status.style.color = 'var(--brand-accent)';
    status.innerHTML = `❌ <strong>Could not sync.</strong><br/>
    Make sure the sheet is <em>published to web</em> (File → Share → Publish to web → CSV).<br/>
    <a href="https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/edit" target="_blank" style="color:#0F9D58">Open Sheet ↗</a><br/>
    Error: ${err.message}`;
  }

  btn.textContent = '🔄 Sync Now'; btn.disabled = false;
}

function parseSheetCSV(csv) {
  const lines = csv.split('\n').map(l=>l.trim()).filter(l=>l);
  if (lines.length < 2) return [];
  const headers = parseCSVRow(lines[0]).map(h=>h.toLowerCase().replace(/\s+/g,''));
  return lines.slice(1).map(line => {
    const vals = parseCSVRow(line);
    const get = (...keys) => { for (const k of keys) { const idx=headers.indexOf(k); if(idx>=0&&vals[idx]) return vals[idx].trim(); } return ''; };
    const name = get('nameoftheactivity','activityname','name','activity');
    if (!name) return null;
    return {
      name,
      owner:      get('owner','owners'),
      startDate:  parseDateStr(get('startdate','start')),
      endDate:    parseDateStr(get('enddate','end')),
      status:     mapStatus(get('status')),
      type:       get('typeofproject','type','projecttype'),
      initiative: get('initiative'),
      notes:      get('notes','note','remarks'),
    };
  }).filter(Boolean);
}

function parseCSVRow(row) {
  const result=[]; let cur=''; let inQ=false;
  for (let i=0;i<row.length;i++) {
    if (row[i]==='"') { inQ=!inQ; }
    else if (row[i]===',' && !inQ) { result.push(cur); cur=''; }
    else { cur+=row[i]; }
  }
  result.push(cur); return result;
}

function parseDateStr(s) {
  if (!s) return '';
  try { const d=new Date(s); return isNaN(d)?'':`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; } catch { return ''; }
}

function mapStatus(s) {
  const l=s.toLowerCase();
  if (l.includes('complet')) return 'Completed';
  if (l.includes('progress')) return 'In Progress';
  if (l.includes('going')||l.includes('ongoing')) return 'On Going';
  return 'Not Started';
}

/* ── 16. EXPORT CSV ── */
function exportCSV() {
  const headers = ['Sr No','Name of Activity','Owner','Initiative','Start Date','End Date','Status','Type','Meeting Date','Notes'];
  const rows = activities.map((a,i)=>[i+1,a.name,a.owner,a.initiative,a.startDate,a.endDate,a.status,a.type,a.meetingDate||'',a.notes].map(v=>`"${(v||'').replace(/"/g,'""')}"`));
  const csv = [headers.join(','),...rows.map(r=>r.join(','))].join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download=`LD_Tracker_${new Date().toISOString().slice(0,10)}.csv`; a.click();
  URL.revokeObjectURL(url);
  showToast('⬇️ CSV exported!','success');
}

/* ── 17b. SUB-ACTIVITY MODAL ── */
function openSubActivityModal(actId) {
  const act = activities.find(a=>a.id===actId);
  if (!act) return;
  const existing = (act.subActivities||[]).map((s,i)=>`
    <div class="sub-act-item">
      <span>${esc(s.name)}</span>
      <span class="badge ${badgeClass(s.status||'Not Started')}">${s.status||'Not Started'}</span>
      <button class="btn btn-sm btn-danger" onclick="deleteSubActivity(${actId},${i})">🗑️</button>
    </div>`).join('');
  const modal = document.createElement('div');
  modal.className='modal-overlay open'; modal.id='sub-modal-overlay';
  modal.innerHTML=`
  <div class="modal" style="max-width:500px">
    <div class="modal-title">📌 Sub-Activities — ${esc(act.name)}</div>
    <div id="sub-list" style="margin-bottom:16px">${existing||'<p style="color:var(--text-muted);font-size:13px">No sub-activities yet.</p>'}</div>
    <div class="form-grid">
      <div class="form-group full"><label class="form-label">Sub-Activity Name *</label>
        <input type="text" id="sub-name" placeholder="e.g. Prepare slides" /></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select id="sub-status">
          <option>Not Started</option><option>In Progress</option><option>Completed</option>
        </select></div>
      <div class="form-group"><label class="form-label">Owner</label>
        <input type="text" id="sub-owner" placeholder="${esc(act.owner)}" value="${esc(act.owner)}" /></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="document.getElementById('sub-modal-overlay').remove()">Close</button>
      <button class="btn btn-primary" onclick="saveSubActivity(${actId})">➕ Add Sub-Activity</button>
    </div>
  </div>`;
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.remove(); });
  document.body.appendChild(modal);
}

function saveSubActivity(actId) {
  const name  = document.getElementById('sub-name').value.trim();
  const status= document.getElementById('sub-status').value;
  const owner = document.getElementById('sub-owner').value.trim();
  if (!name) { showToast('⚠️ Enter sub-activity name.','error'); return; }
  const act = activities.find(a=>a.id===actId);
  if (!act) return;
  if (!act.subActivities) act.subActivities=[];
  act.subActivities.push({name,status,owner});
  saveData(); renderAll();
  document.getElementById('sub-modal-overlay')?.remove();
  showToast('📌 Sub-activity added!','success');
}

function deleteSubActivity(actId, idx) {
  const act = activities.find(a=>a.id===actId);
  if (!act||!act.subActivities) return;
  act.subActivities.splice(idx,1);
  saveData(); renderAll();
  document.getElementById('sub-modal-overlay')?.remove();
  showToast('🗑️ Sub-activity removed.','info');
}

/* ── 17. TOAST ── */
function showToast(msg, type='info') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`; t.textContent = msg;
  c.appendChild(t); setTimeout(()=>t.remove(), 3800);
}

/* ── 18. HELPERS ── */
function esc(s) { if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function fmtDate(d) {
  if (!d) return '<span style="color:var(--text-muted)">—</span>';
  try { return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}); } catch { return d; }
}

function badgeClass(status) {
  return { 'Completed':'badge-completed','In Progress':'badge-inprogress','On Going':'badge-ongoing','Not Started':'badge-notstarted' }[status]||'badge-notstarted';
}

function rowClass(status) {
  return { 'Completed':'row-completed','In Progress':'row-inprogress','On Going':'row-ongoing' }[status]||'';
}

function statusColor(status) {
  return { 'Completed':'#00C896','In Progress':'#6C63FF','On Going':'#FFB347','Not Started':'#8B97A8' }[status]||'#6C63FF';
}

function statusIcon(status) {
  return { 'Completed':'✅','In Progress':'🔄','On Going':'🔵','Not Started':'⏳' }[status]||'📌';
}

function avatarClass(name) {
  if(name==='Tejashri') return 'av-tejashri';
  if(name==='Tanaya')   return 'av-tanaya';
  if(name==='Nikhil')   return 'av-nikhil';
  if(name==='Deepraj')  return 'av-deepraj';
  return 'av-multi';
}

// Re-render charts on theme change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>renderCharts());
