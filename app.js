/* ═══════════════════════════════════════════════════
   L&D TRACKER v2.0 — APP LOGIC
   Data · CRUD · Charts · Filters · LocalStorage
   Calendar · Gantt · Sub-activities · Share · Reminders
   ═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. MASTER DATA
────────────────────────────────────────── */

let INITIATIVES = [
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
  { id: 1,  name: 'L&D Health Tracker Update',              owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Other',   notes: '', subActivities: [] },
  { id: 2,  name: 'Google Policy Update Flyer',             owner: 'Tanaya/Deepraj', startDate: '2026-04-03', endDate: '',           status: 'In Progress', type: '',              initiative: 'Google Ecosystem', notes: '', subActivities: [] },
  { id: 3,  name: 'LIA Icon',                               owner: 'Tanaya',         startDate: '',           endDate: '',           status: 'Completed',   type: '',              initiative: 'LIA',     notes: '', subActivities: [] },
  { id: 4,  name: 'LIA Betterment/Testing',                 owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'In Progress', type: '',              initiative: 'LIA',     notes: '', subActivities: [] },
  { id: 5,  name: 'AI Fluency Sales',                       owner: 'Tanaya',         startDate: '2026-04-03', endDate: '2026-12-31', status: 'In Progress', type: 'Till Dec 2026', initiative: 'Ignite AI (AI Delivery/Sales/Product)', notes: '', subActivities: [] },
  { id: 6,  name: 'PNH, PA',                                owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: '',              initiative: 'DRI/DRP/PNH', notes: '', subActivities: [] },
  { id: 7,  name: 'Expired Cert Reminder Email',            owner: 'Tanaya',         startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Professional Certifications', notes: '', subActivities: [] },
  { id: 8,  name: 'AI Fluency Delivery',                    owner: 'Tanaya/Deepraj', startDate: '2026-04-03', endDate: '2026-12-31', status: 'In Progress', type: 'Till Dec 2026', initiative: 'Ignite AI (AI Delivery/Sales/Product)', notes: '', subActivities: [] },
  { id: 9,  name: 'L&D Dashboard Data Management & Tracking', owner: 'Nikhil',       startDate: '2026-04-03', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Other',   notes: '', subActivities: [] },
  { id: 10, name: 'Professional Edge Training Preparation', owner: 'Nikhil',         startDate: '2026-04-03', endDate: '2026-04-27', status: 'In Progress', type: '',              initiative: 'Professional Certifications', notes: '', subActivities: [] },
  { id: 11, name: 'ISMS Compliance Training',               owner: 'Tejashri',       startDate: '2026-04-15', endDate: '2026-06-30', status: 'On Going',    type: 'Quarterly',     initiative: 'ISMS/POSH/L100', notes: 'Annual compliance requirement', subActivities: [] },
  { id: 12, name: 'Gemini Certification Drive - Cohort 1',  owner: 'Nikhil',         startDate: '2026-05-01', endDate: '2026-07-31', status: 'Not Started', type: 'Till Dec 2026', initiative: 'Gemini Enterprise Certification Drive', notes: '', subActivities: [] },
  { id: 13, name: 'Udemy License Management',               owner: 'Tanaya/Deepraj', startDate: '2026-04-01', endDate: '',           status: 'On Going',    type: 'Monthly',       initiative: 'Udemy / Learnrush', notes: 'Monthly license renewal tracking', subActivities: [] },
  { id: 14, name: 'Summer Internship Onboarding Program',   owner: 'Nikhil',         startDate: '2026-05-15', endDate: '2026-08-15', status: 'Not Started', type: 'One-time',      initiative: 'Summer Internship', notes: '', subActivities: [] },
  { id: 15, name: 'Leadership Training - Batch 2',          owner: 'Tejashri',       startDate: '2026-06-01', endDate: '2026-09-30', status: 'In Progress', type: '',              initiative: 'Leadership Training', notes: '', subActivities: [] },
  { id: 16, name: 'Fresher Batch Induction',                owner: 'Nikhil',         startDate: '2026-04-20', endDate: '2026-05-20', status: 'In Progress', type: 'One-time',      initiative: 'Fresher Internship Training', notes: '', subActivities: [] },
  { id: 17, name: 'AI Fluency for PE - Module 1',           owner: 'Tanaya/Deepraj', startDate: '2026-04-10', endDate: '2026-12-31', status: 'In Progress', type: 'Till Dec 2026', initiative: 'AI Fluency for PE', notes: '', subActivities: [] },
  { id: 18, name: 'Priority Plays Session - Q2',            owner: 'Tejashri',       startDate: '2026-04-15', endDate: '2026-06-15', status: 'In Progress', type: 'Quarterly',     initiative: 'Priority Plays', notes: '', subActivities: [] },
  { id: 19, name: 'Silver/Gold Bench Program Refresh',      owner: 'Nikhil',         startDate: '2026-05-01', endDate: '2026-10-31', status: 'Not Started', type: '',              initiative: 'Silver/Gold - Project and Bench', notes: '', subActivities: [] },
  { id: 20, name: 'AI Hackathon Preparation',               owner: 'Deepraj',        startDate: '2026-06-01', endDate: '2026-07-31', status: 'Not Started', type: 'One-time',      initiative: 'AI Hackathon', notes: '', subActivities: [] },
  { id: 21, name: 'First Time Manager Boot Camp Preparation', owner: 'Tejashri',     startDate: '2026-04-08', endDate: '2026-05-15', status: 'In Progress', type: 'Quarterly',     initiative: 'Leadership Training', notes: 'Connect Session with Nikita Kamath', subActivities: [] },
];

const TEAM_EMAILS = [
  'tejashri.sapkal@onixnet.com',
  'tanaya.sankapal@onixnet.com',
  'nikhil.shelke@onixnet.com',
  'deepraj.bhosale@onixnet.com',
];

const OWNER_EMAILS = {
  'Tejashri': 'tejashri.sapkal@onixnet.com',
  'Tanaya':   'tanaya.sankapal@onixnet.com',
  'Nikhil':   'nikhil.shelke@onixnet.com',
  'Deepraj':  'deepraj.bhosale@onixnet.com',
};

const OWNERS = ['Tejashri', 'Tanaya', 'Nikhil', 'Deepraj'];

const MANAGER_EMAIL = 'prasad.kulkarni1@onixnet.com';
const MANAGER_NAME = 'Prasad Kulkarni';

const DEFAULT_LOGO_SVG = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M4 3C4 1.9 4.9 1 6 1H17L22 6V23C22 24.1 21.1 25 20 25H6C4.9 25 4 24.1 4 23V3Z" fill="white" opacity="0.9"/>
  <path d="M17 1L22 6H17V1Z" fill="white" opacity="0.6"/>
  <path d="M8 11H18M8 14H16M8 17H14" stroke="#30496d" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="19" cy="19" r="6" fill="#f46262"/>
  <path d="M17 19H21M19 17V21" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="19" cy="16" r="1.5" fill="white" opacity="0.6"/>
</svg>`;

const DEFAULT_SETTINGS_LOGO_SVG = `<svg width="30" height="30" viewBox="0 0 26 26" fill="none">
  <path d="M4 3C4 1.9 4.9 1 6 1H17L22 6V23C22 24.1 21.1 25 20 25H6C4.9 25 4 24.1 4 23V3Z" fill="white" opacity="0.9"/>
  <path d="M17 1L22 6H17V1Z" fill="white" opacity="0.6"/>
  <path d="M8 11H18M8 14H16M8 17H14" stroke="#30496d" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="19" cy="19" r="6" fill="#f46262"/>
  <path d="M17 19H21M19 17V21" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

function getEmailsForOwner(ownerStr) {
  if (!ownerStr) return TEAM_EMAILS;
  const parts = ownerStr.split('/').map(p => p.trim());
  const emails = [];
  parts.forEach(p => {
    for (const [name, email] of Object.entries(OWNER_EMAILS)) {
      if (name.toLowerCase() === p.toLowerCase()) {
        if (!emails.includes(email)) emails.push(email);
      }
    }
  });
  return emails.length ? emails : TEAM_EMAILS;
}

const DEFAULT_TEMPLATES = {
  reminderSubject: 'Gentle Reminder: [Activity Name] is due tomorrow',
  reminderBody: `Hi [Owner Name],

This is a quick reminder that the following task is scheduled to be completed by [End Date]:

Activity Name: [Activity Name]
Initiative: [Initiative]
Status: [Status]
End Date: [End Date]

Please ensure the status is updated in the L&D Tracker once completed. Let me know if you need any support or if the timeline needs adjusting.

Best regards,
L&D Team`,
  assignSubject: 'New Task Assigned: [Activity Name]',
  assignBody: `Hi [Owner Name],

A new task has been assigned to you by Prasad Kulkarni (prasad.kulkarni1@onixnet.com):

📌 Task Name: [Activity Name]
🎯 Initiative: [Initiative]
📅 Due Date: [End Date]
📊 Status: Not Started
📝 Details: [Notes]

Please review the task in the L&D Tracker: [Tracker Link]

Best regards,
Prasad Kulkarni
L&D Management`
};

let emailTemplates = { ...DEFAULT_TEMPLATES };

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/edit?gid=2050775428#gid=2050775428';

/* ──────────────────────────────────────────
   2. STATE
────────────────────────────────────────── */

let activities = [];
let nextId = 22;
let editingId = null;
let sortCol = 'id';
let sortDir = 1;
let searchQuery = '';
let chartOwner, chartType;
let calYear = 2026;
let calMonth = new Date().getMonth(); // 0-indexed
let activeMatrixFilter = { owner: null, status: null };
let currentAssignDraft = null;
let currentReminderDraft = null;

/* ──────────────────────────────────────────
   3. INIT
────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  loadInitiatives();
  loadSettings();
  populateDropdowns();
  updateSidebarDate();
  renderAll();
  setInterval(updateSidebarDate, 60000);
  checkReminders();
  setInterval(checkReminders, 3600000); // check every hour
  requestNotificationPermission();
});

function loadData() {
  const stored = localStorage.getItem('ld_tracker_activities_v3');
  if (stored) {
    try {
      activities = JSON.parse(stored);
      activities.forEach(a => { if (!a.subActivities) a.subActivities = []; });
      nextId = activities.length ? Math.max(...activities.map(a => a.id)) + 1 : 1;
    } catch { activities = DEFAULT_ACTIVITIES.map(a => ({...a, subActivities: [...(a.subActivities || [])]})); }
  } else {
    activities = DEFAULT_ACTIVITIES.map(a => ({...a, subActivities: [...(a.subActivities || [])]}));
  }
}

function loadInitiatives() {
  const stored = localStorage.getItem('ld_tracker_initiatives_v3');
  if (stored) {
    try { INITIATIVES = JSON.parse(stored); } catch {}
  }
}

function saveData() {
  localStorage.setItem('ld_tracker_activities_v3', JSON.stringify(activities));
}

function saveInitiatives() {
  localStorage.setItem('ld_tracker_initiatives_v3', JSON.stringify(INITIATIVES));
}

function loadSettings() {
  const storedTemplates = localStorage.getItem('ld_tracker_templates');
  if (storedTemplates) {
    try {
      emailTemplates = { ...DEFAULT_TEMPLATES, ...JSON.parse(storedTemplates) };
    } catch {
      emailTemplates = { ...DEFAULT_TEMPLATES };
    }
  }

  const storedLogo = localStorage.getItem('ld_tracker_logo');
  if (storedLogo) {
    applyCustomLogo(storedLogo);
  }
}

function applyCustomLogo(dataUrl) {
  const sideLogo = document.getElementById('sidebar-logo-container');
  const previewLogo = document.getElementById('settings-logo-preview');
  if (sideLogo) {
    sideLogo.innerHTML = `<img src="${dataUrl}" alt="Logo" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />`;
  }
  if (previewLogo) {
    previewLogo.innerHTML = `<img src="${dataUrl}" alt="Logo" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" />`;
  }
}

function resetDefaultLogo() {
  localStorage.removeItem('ld_tracker_logo');
  const sideLogo = document.getElementById('sidebar-logo-container');
  const previewLogo = document.getElementById('settings-logo-preview');
  if (sideLogo) sideLogo.innerHTML = DEFAULT_LOGO_SVG;
  if (previewLogo) previewLogo.innerHTML = DEFAULT_SETTINGS_LOGO_SVG;
  const fileInput = document.getElementById('logo-file-input');
  if (fileInput) fileInput.value = '';
  showToast('🔄 Logo reset to default', 'info');
}

function handleLogoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('⚠️ Please upload an image file', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    localStorage.setItem('ld_tracker_logo', dataUrl);
    applyCustomLogo(dataUrl);
    showToast('🖼️ Logo updated successfully!', 'success');
  };
  reader.readAsDataURL(file);
}

function openSettingsModal() {
  const rSub = document.getElementById('tpl-reminder-subject');
  const rBody = document.getElementById('tpl-reminder-body');
  const aSub = document.getElementById('tpl-assign-subject');
  const aBody = document.getElementById('tpl-assign-body');

  if (rSub) rSub.value = emailTemplates.reminderSubject || DEFAULT_TEMPLATES.reminderSubject;
  if (rBody) rBody.value = emailTemplates.reminderBody || DEFAULT_TEMPLATES.reminderBody;
  if (aSub) aSub.value = emailTemplates.assignSubject || DEFAULT_TEMPLATES.assignSubject;
  if (aBody) aBody.value = emailTemplates.assignBody || DEFAULT_TEMPLATES.assignBody;

  document.getElementById('settings-modal-overlay').classList.add('open');
}

function closeSettingsModal() {
  document.getElementById('settings-modal-overlay').classList.remove('open');
}

function onSettingsOverlayClick(e) {
  if (e.target === document.getElementById('settings-modal-overlay')) closeSettingsModal();
}

function saveSettings() {
  const rSub = document.getElementById('tpl-reminder-subject')?.value.trim();
  const rBody = document.getElementById('tpl-reminder-body')?.value.trim();
  const aSub = document.getElementById('tpl-assign-subject')?.value.trim();
  const aBody = document.getElementById('tpl-assign-body')?.value.trim();

  emailTemplates = {
    reminderSubject: rSub || DEFAULT_TEMPLATES.reminderSubject,
    reminderBody: rBody || DEFAULT_TEMPLATES.reminderBody,
    assignSubject: aSub || DEFAULT_TEMPLATES.assignSubject,
    assignBody: aBody || DEFAULT_TEMPLATES.assignBody,
  };

  localStorage.setItem('ld_tracker_templates', JSON.stringify(emailTemplates));
  closeSettingsModal();
  showToast('💾 Settings and templates saved!', 'success');
}

function populateDropdowns() {
  const allOwners = [...new Set(activities.map(a => a.owner))].sort();
  const fOwner = document.getElementById('filter-owner');
  const ganttOwner = document.getElementById('gantt-filter-owner');

  // Add individual owners
  OWNERS.forEach(o => {
    if (!fOwner.querySelector(`option[value="${o}"]`)) {
      fOwner.innerHTML += `<option>${o}</option>`;
      ganttOwner.innerHTML += `<option>${o}</option>`;
    }
  });
  // Add combo owners
  allOwners.forEach(o => {
    if (!OWNERS.includes(o) && !fOwner.querySelector(`option[value="${o}"]`)) {
      fOwner.innerHTML += `<option>${o}</option>`;
      ganttOwner.innerHTML += `<option>${o}</option>`;
    }
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
  calendar:    { title: 'Calendar',     subtitle: 'Monthly calendar view of tasks' },
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
  if (page === 'calendar') renderCalendar();
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
  document.getElementById('nav-badge-initiatives').textContent = INITIATIVES.length;
  document.getElementById('qf-completed').textContent = activities.filter(a => a.status === 'Completed').length;
  document.getElementById('qf-inprogress').textContent = activities.filter(a => a.status === 'In Progress').length;
  document.getElementById('qf-ongoing').textContent = activities.filter(a => a.status === 'On Going').length;
}

/* ──────────────────────────────────────────
   6. DASHBOARD
────────────────────────────────────────── */

function renderDashboard() {
  renderStatsMatrix();
  renderDashboardSelectedActivities();
  renderDueTomorrowList();
  renderCharts();
  renderRecentList();
}

function getOwnerCounts(statusFilter = null) {
  const counts = {};
  OWNERS.forEach(o => { counts[o] = 0; });
  const list = statusFilter ? activities.filter(a => a.status === statusFilter) : activities;
  list.forEach(a => {
    const parts = (a.owner || '').split('/').map(p => p.trim());
    parts.forEach(name => {
      for (const ownerName of OWNERS) {
        if (ownerName.toLowerCase() === name.toLowerCase()) {
          counts[ownerName]++;
        }
      }
    });
  });
  return counts;
}

function renderStatsMatrix() {
  const container = document.getElementById('stats-matrix-container');
  if (!container) return;

  const totalAssignedOwners = getOwnerCounts(null);
  const inprogressOwners = getOwnerCounts('In Progress');
  const notStartedOwners = getOwnerCounts('Not Started');
  const ongoingOwners = getOwnerCounts('On Going');
  const completedOwners = getOwnerCounts('Completed');

  const totalAll = activities.length;
  const inprogressAll = activities.filter(a => a.status === 'In Progress').length;
  const notStartedAll = activities.filter(a => a.status === 'Not Started').length;
  const ongoingAll = activities.filter(a => a.status === 'On Going').length;
  const completedAll = activities.filter(a => a.status === 'Completed').length;

  let html = `
    <table class="matrix-table">
      <thead>
        <tr>
          <th>👤 Team Member</th>
          <th>📋 Total Assigned</th>
          <th>🔄 In Progress</th>
          <th>⏳ Not Started</th>
          <th>🔵 Ongoing activities</th>
          <th>✅ Completed</th>
        </tr>
      </thead>
      <tbody>
  `;

  OWNERS.forEach(owner => {
    const isOwnerActive = activeMatrixFilter.owner === owner;
    const isTotalActive = isOwnerActive && activeMatrixFilter.status === null;
    const isInpActive = isOwnerActive && activeMatrixFilter.status === 'In Progress';
    const isNotActive = isOwnerActive && activeMatrixFilter.status === 'Not Started';
    const isOngActive = isOwnerActive && activeMatrixFilter.status === 'On Going';
    const isCompActive = isOwnerActive && activeMatrixFilter.status === 'Completed';

    html += `
      <tr>
        <td>
          <span style="cursor:pointer;" onclick="filterDashboardByMatrix('${owner}', null)" title="View all activities for ${owner}">
            <strong style="color:var(--brand-primary);">${owner}</strong>
          </span>
        </td>
        <td>
          <span class="matrix-chip chip-total ${isTotalActive ? 'active' : ''}" onclick="filterDashboardByMatrix('${owner}', null)" title="View Total Assigned for ${owner}">
            ${totalAssignedOwners[owner] || 0}
          </span>
        </td>
        <td>
          <span class="matrix-chip chip-inprogress ${isInpActive ? 'active' : ''}" onclick="filterDashboardByMatrix('${owner}', 'In Progress')" title="View In Progress for ${owner}">
            ${inprogressOwners[owner] || 0}
          </span>
        </td>
        <td>
          <span class="matrix-chip chip-notstarted ${isNotActive ? 'active' : ''}" onclick="filterDashboardByMatrix('${owner}', 'Not Started')" title="View Not Started for ${owner}">
            ${notStartedOwners[owner] || 0}
          </span>
        </td>
        <td>
          <span class="matrix-chip chip-ongoing ${isOngActive ? 'active' : ''}" onclick="filterDashboardByMatrix('${owner}', 'On Going')" title="View Ongoing activities for ${owner}">
            ${ongoingOwners[owner] || 0}
          </span>
        </td>
        <td>
          <span class="matrix-chip chip-completed ${isCompActive ? 'active' : ''}" onclick="filterDashboardByMatrix('${owner}', 'Completed')" title="View Completed for ${owner}">
            ${completedOwners[owner] || 0}
          </span>
        </td>
      </tr>
    `;
  });

  const isTotalAllActive = activeMatrixFilter.owner === null && activeMatrixFilter.status === null && activeMatrixFilter.hasFilter;
  const isInpAllActive = activeMatrixFilter.owner === null && activeMatrixFilter.status === 'In Progress';
  const isNotAllActive = activeMatrixFilter.owner === null && activeMatrixFilter.status === 'Not Started';
  const isOngAllActive = activeMatrixFilter.owner === null && activeMatrixFilter.status === 'On Going';
  const isCompAllActive = activeMatrixFilter.owner === null && activeMatrixFilter.status === 'Completed';

  html += `
      <tr class="matrix-total-row">
        <td><strong>📊 Team Total</strong></td>
        <td><span class="matrix-chip chip-total ${isTotalAllActive ? 'active' : ''}" onclick="filterDashboardByMatrix(null, null)">${totalAll}</span></td>
        <td><span class="matrix-chip chip-inprogress ${isInpAllActive ? 'active' : ''}" onclick="filterDashboardByMatrix(null, 'In Progress')">${inprogressAll}</span></td>
        <td><span class="matrix-chip chip-notstarted ${isNotAllActive ? 'active' : ''}" onclick="filterDashboardByMatrix(null, 'Not Started')">${notStartedAll}</span></td>
        <td><span class="matrix-chip chip-ongoing ${isOngAllActive ? 'active' : ''}" onclick="filterDashboardByMatrix(null, 'On Going')">${ongoingAll}</span></td>
        <td><span class="matrix-chip chip-completed ${isCompAllActive ? 'active' : ''}" onclick="filterDashboardByMatrix(null, 'Completed')">${completedAll}</span></td>
      </tr>
    </tbody>
  </table>
  `;

  container.innerHTML = html;
}

function filterDashboardByMatrix(owner, status) {
  if (activeMatrixFilter.owner === owner && activeMatrixFilter.status === status && activeMatrixFilter.hasFilter) {
    activeMatrixFilter = { owner: null, status: null, hasFilter: false };
  } else {
    activeMatrixFilter = { owner: owner, status: status, hasFilter: true };
  }
  renderStatsMatrix();
  renderDashboardSelectedActivities();
}

function clearMatrixFilter() {
  activeMatrixFilter = { owner: null, status: null, hasFilter: false };
  renderStatsMatrix();
  renderDashboardSelectedActivities();
}

function renderDashboardSelectedActivities() {
  const container = document.getElementById('dashboard-selected-activities');
  if (!container) return;

  if (!activeMatrixFilter.hasFilter) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  const { owner, status } = activeMatrixFilter;
  const filtered = activities.filter(a => {
    const matchesOwner = !owner || a.owner === owner || a.owner.split('/').map(p => p.trim().toLowerCase()).includes(owner.toLowerCase());
    const matchesStatus = !status || a.status === status;
    return matchesOwner && matchesStatus;
  });

  const filterTitle = `${owner ? owner : 'All Associates'} • ${status ? (status === 'On Going' ? 'Ongoing activities' : status) : 'Total Assigned'}`;
  
  let html = `
    <div class="month-activities-card" style="margin-top:0;border:2px solid var(--brand-primary);box-shadow:var(--shadow-md);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div class="section-title" style="font-size:14px">
          📋 ${esc(filterTitle)} <span class="badge badge-inprogress" style="margin-left:6px">${filtered.length} activities</span>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="clearMatrixFilter()">✕ Close Filter</button>
      </div>
      <div class="table-wrapper">
        <table class="compact-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Activity Name</th>
              <th>Owner</th>
              <th>Initiative</th>
              <th>Due Date &amp; Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  `;

  if (!filtered.length) {
    html += `<tr><td colspan="7" style="text-align:center;padding:16px;color:var(--text-muted)">No activities found for this selection.</td></tr>`;
  } else {
    filtered.forEach((a, idx) => {
      const scheduleText = a.endDate ? `${fmtDate(a.endDate)}${a.endTime ? ' ' + a.endTime : ''}` : (a.startDate ? fmtDate(a.startDate) : '—');
      html += `
        <tr>
          <td>${idx + 1}</td>
          <td style="font-weight:600;max-width:240px">${esc(a.name)}</td>
          <td><span class="owner-chip" style="font-size:10px;padding:2px 6px;">👤 ${esc(a.owner)}</span></td>
          <td style="font-size:11px;color:var(--text-secondary);">${esc(a.initiative || '—')}</td>
          <td style="font-size:11px;white-space:nowrap">${scheduleText}</td>
          <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
          <td>
            <div style="display:flex;gap:4px">
              <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})" title="Edit">✏️</button>
              <a class="btn btn-sm btn-secondary" href="${buildGCalUrl(a)}" target="_blank" title="Add to Google Calendar">📅</a>
              <button class="btn btn-sm btn-primary" onclick="openReminderModal(${a.id})" title="Send 1-Day Reminder Email">📧</button>
            </div>
          </td>
        </tr>
      `;
    });
  }

  html += `
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.innerHTML = html;
  container.style.display = 'block';
}

function renderDueTomorrowList() {
  const container = document.getElementById('due-tomorrow-list');
  const badge = document.getElementById('due-tomorrow-badge');
  if (!container) return;

  const today = new Date();
  today.setHours(0,0,0,0);

  const candidateTasks = activities.filter(a => a.status !== 'Completed' && a.endDate);

  const dueItems = [];
  candidateTasks.forEach(a => {
    const end = new Date(a.endDate);
    end.setHours(0,0,0,0);
    const diffDays = Math.round((end - today) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 2) {
      dueItems.push({ activity: a, diffDays });
    }
  });

  dueItems.sort((x, y) => x.diffDays - y.diffDays);

  if (badge) {
    badge.textContent = `${dueItems.length} due soon`;
  }

  if (!dueItems.length) {
    const nextUpcoming = candidateTasks
      .sort((a,b) => new Date(a.endDate) - new Date(b.endDate))
      .slice(0, 4);

    if (!nextUpcoming.length) {
      container.innerHTML = `<div style="text-align:center;padding:24px 10px;color:var(--text-muted);font-size:12px;">✅ No pending tasks due in the next 48 hours or upcoming!</div>`;
      return;
    }

    container.innerHTML = `
      <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">✨ No tasks due in 48 hours. Upcoming tasks:</div>
      ${nextUpcoming.map(a => `
        <div class="due-item">
          <div class="due-item-info">
            <div class="due-item-name">${esc(a.name)}</div>
            <div class="due-item-meta">
              <span>👤 ${esc(a.owner)}</span> • 
              <span>📅 Due ${fmtDate(a.endDate)}${a.endTime ? ' ' + a.endTime : ''}</span> • 
              <span class="badge ${badgeClass(a.status)}" style="font-size:9px;padding:1px 5px;">${a.status}</span>
            </div>
          </div>
          <button class="due-btn" onclick="openReminderModal(${a.id})">📧 Send Reminder</button>
        </div>
      `).join('')}
    `;
    return;
  }

  container.innerHTML = dueItems.map(item => {
    const a = item.activity;
    let badgeHtml = '';
    if (item.diffDays === 0) {
      badgeHtml = `<span class="due-badge-tomorrow" style="background:rgba(244,98,98,0.2);color:#f46262;">🚨 Due Today</span>`;
    } else if (item.diffDays === 1) {
      badgeHtml = `<span class="due-badge-tomorrow">⏰ Due Tomorrow</span>`;
    } else {
      badgeHtml = `<span class="due-badge-soon">📅 Due in 2 Days</span>`;
    }

    return `
      <div class="due-item">
        <div class="due-item-info">
          <div style="display:flex;align-items:center;gap:6px;">
            <div class="due-item-name">${esc(a.name)}</div>
            ${badgeHtml}
          </div>
          <div class="due-item-meta">
            <span>👤 ${esc(a.owner)}</span> • 
            <span>📅 ${fmtDate(a.endDate)}${a.endTime ? ' ' + a.endTime : ''}</span> • 
            <span>${esc(a.initiative || 'General')}</span>
          </div>
        </div>
        <button class="due-btn" onclick="openReminderModal(${a.id})">📧 Send 1-Day Reminder</button>
      </div>
    `;
  }).join('');
}

function getChartColors(isDark) {
  return {
    text: isDark ? '#9BA3C8' : '#5A6178',
    grid: isDark ? 'rgba(48,73,109,0.1)' : 'rgba(48,73,109,0.08)',
  };
}

function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function renderCharts() {
  const dark = isDarkMode();
  const colors = getChartColors(dark);
  const fontCfg = { family: 'Plus Jakarta Sans', size: 11 };

  const statusCounts = {
    'Completed':   activities.filter(a => a.status === 'Completed').length,
    'In Progress': activities.filter(a => a.status === 'In Progress').length,
    'On Going':    activities.filter(a => a.status === 'On Going').length,
    'Not Started': activities.filter(a => a.status === 'Not Started').length,
  };

  // Owner map with status breakdown
  const ownerStatusMap = {};
  OWNERS.forEach(o => { ownerStatusMap[o] = { total: 0, completed: 0, pending: 0 }; });
  activities.forEach(a => {
    const parts = a.owner.split('/');
    parts.forEach(p => {
      const name = p.trim();
      if (ownerStatusMap[name]) {
        ownerStatusMap[name].total++;
        if (a.status === 'Completed') ownerStatusMap[name].completed++;
        else ownerStatusMap[name].pending++;
      }
    });
  });

  const typeMap = {};
  activities.forEach(a => {
    const t = a.type || 'None';
    typeMap[t] = (typeMap[t] || 0) + 1;
  });

  const defaultPlugin = { legend: { labels: { color: colors.text, font: fontCfg } } };

  // Owner Stacked Bar with labels
  const ownerEl = document.getElementById('chart-owner');
  if (ownerEl) {
    if (chartOwner) chartOwner.destroy();
    const ownerLabels = Object.keys(ownerStatusMap);
    chartOwner = new Chart(ownerEl, {
      type: 'bar',
      data: {
        labels: ownerLabels,
        datasets: [
          {
            label: 'Completed',
            data: ownerLabels.map(o => ownerStatusMap[o].completed),
            backgroundColor: '#00C896',
            borderRadius: 4, borderSkipped: false,
          },
          {
            label: 'Pending',
            data: ownerLabels.map(o => ownerStatusMap[o].pending),
            backgroundColor: '#f46262',
            borderRadius: 4, borderSkipped: false,
          },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: {
          ...defaultPlugin,
          legend: { display: true, labels: { color: colors.text, font: fontCfg, usePointStyle: true, pointStyle: 'circle' } },
          tooltip: { callbacks: {
            afterBody: (tooltipItems) => {
              const owner = tooltipItems[0].label;
              return `Total: ${ownerStatusMap[owner].total}`;
            }
          }},
        },
        scales: {
          x: { stacked: true, ticks: { color: colors.text, font: fontCfg }, grid: { color: colors.grid } },
          y: { stacked: true, ticks: { color: colors.text, font: fontCfg, stepSize: 1 }, grid: { color: colors.grid }, beginAtZero: true },
        }
      }
    });
  }

  // Type Bar
  const typeEl = document.getElementById('chart-type');
  if (typeEl) {
    if (chartType) chartType.destroy();
    chartType = new Chart(typeEl, {
      type: 'bar',
      data: {
        labels: Object.keys(typeMap),
        datasets: [{
          label: 'Count',
          data: Object.values(typeMap),
          backgroundColor: 'rgba(48,73,109,0.6)',
          borderRadius: 6, borderSkipped: false,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: true,
        plugins: { ...defaultPlugin, legend: { display: false } },
        scales: {
          x: { ticks: { color: colors.text, font: fontCfg, stepSize: 1 }, grid: { color: colors.grid }, beginAtZero: true },
          y: { ticks: { color: colors.text, font: fontCfg }, grid: { color: colors.grid } },
        }
      }
    });
  }
}

function renderRecentList() {
  const recent = [...activities].sort((a, b) => b.id - a.id).slice(0, 5);
  document.getElementById('recent-list').innerHTML = recent.map(a => `
    <div class="recent-item">
      <span style="font-size:18px">${statusIcon(a.status)}</span>
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
  const month  = document.getElementById('filter-month')?.value || '';
  const q      = searchQuery.toLowerCase();

  return activities
    .filter(a =>
      (!status || a.status === status) &&
      (!owner  || a.owner === owner || a.owner.includes(owner)) &&
      (!type   || a.type === type) &&
      (!init   || a.initiative === init) &&
      (!month  || isActivityInMonth(a, month)) &&
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

function isActivityInMonth(a, monthStr) {
  // Check if activity touches monthStr (e.g. "04" for April 2026)
  const m = parseInt(monthStr, 10);
  if (!a.startDate && !a.endDate) return false;
  const start = a.startDate ? new Date(a.startDate) : new Date(a.endDate);
  const end = a.endDate ? new Date(a.endDate) : new Date(a.startDate);
  const targetStart = new Date(2026, m - 1, 1);
  const targetEnd = new Date(2026, m, 0, 23, 59, 59);
  return start <= targetEnd && end >= targetStart;
}

function renderTable(rows) {
  const tbody = document.getElementById('activity-tbody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">📭</div><p>No activities found. Try adjusting filters or add a new activity.</p></div></td></tr>`;
    document.getElementById('table-count').textContent = '0 activities';
    return;
  }

  let html = '';
  rows.forEach((a, idx) => {
    const rowClass = rowStatusClass(a.status);
    const ownerParts = a.owner.split('/');
    const ownerHtml = ownerParts.map(o => `<span class="owner-chip"><span class="owner-avatar ${avatarClass(o.trim())}">${o.trim()[0]}</span>${esc(o.trim())}</span>`).join(' ');

    html += `
    <tr class="${rowClass}" id="row-${a.id}">
      <td class="sr-num">${idx + 1}</td>
      <td class="activity-name">
        ${esc(a.name)}
        ${a.notes ? `<small title="${esc(a.notes)}">📝 ${esc(a.notes.substring(0,35))}${a.notes.length>35?'…':''}</small>` : ''}
      </td>
      <td>${ownerHtml}</td>
      <td style="font-size:11px;color:var(--text-secondary);max-width:150px">${a.initiative ? `<span title="${esc(a.initiative)}">${esc(a.initiative.substring(0,25))}${a.initiative.length>25?'…':''}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td style="white-space:nowrap;font-size:11px">${fmtDate(a.startDate)}</td>
      <td style="white-space:nowrap;font-size:11px">${fmtDate(a.endDate)}</td>
      <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
      <td>${a.type ? `<span class="type-tag">${esc(a.type)}</span>` : '<span style="color:var(--text-muted)">—</span>'}</td>
      <td>
        <div class="action-btns">
          <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})" title="Edit">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="deleteActivity(${a.id})" title="Delete">🗑️</button>
          <a class="btn btn-sm btn-secondary" href="${buildGCalUrl(a)}" target="_blank" title="Add to Google Calendar">📅</a>
        </div>
      </td>
    </tr>`;

    // Sub-activities
    if (a.subActivities && a.subActivities.length) {
      a.subActivities.forEach(sub => {
        html += `
        <tr class="sub-row">
          <td></td>
          <td class="activity-name"><span class="sub-indicator">└</span> ${esc(sub.name)}</td>
          <td style="font-size:10px">${esc(sub.owner || a.owner)}</td>
          <td></td>
          <td></td>
          <td></td>
          <td><span class="badge ${badgeClass(sub.status || 'Not Started')}">${sub.status || 'Not Started'}</span></td>
          <td></td>
          <td></td>
        </tr>`;
      });
    }
  });

  tbody.innerHTML = html;
  document.getElementById('table-count').textContent = `${rows.length} of ${activities.length} activities`;
  document.getElementById('table-last-updated').textContent = `Updated: ${new Date().toLocaleTimeString('en-IN')}`;
}

function sortTable(col) {
  if (sortCol === col) sortDir = -sortDir;
  else { sortCol = col; sortDir = 1; }
  renderTable(getFiltered());
}

function applyFilters() { renderTable(getFiltered()); }
function clearFilters() {
  ['filter-status','filter-owner','filter-type','filter-initiative','filter-month'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
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
  'Compliance':      '#f46262',
  'Tool & Platform': '#4ECDC4',
  'I&D Team':        '#30496d',
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
    const color  = INIT_COLORS[init.category] || '#30496d';

    // List activities inline
    const actListHtml = linked.length
      ? linked.slice(0, 5).map(a => `<div class="init-act-item">${esc(a.name.substring(0,35))}${a.name.length>35?'…':''} <span class="badge ${badgeClass(a.status)}" style="font-size:8px;padding:1px 5px">${a.status}</span></div>`).join('')
        + (linked.length > 5 ? `<div style="font-size:10px;color:var(--text-muted);margin-top:2px">+ ${linked.length - 5} more…</div>` : '')
      : '<div style="font-size:10px;color:var(--text-muted)">No activities linked yet</div>';

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
      <div class="init-activities-list">${actListHtml}</div>
    </div>`;
  }).join('');
}

function filterByInitiative(name) {
  navigate('activities');
  document.getElementById('filter-initiative').value = name;
  applyFilters();
  showToast(`📋 Showing activities for: ${name}`, 'info');
}

/* Initiative CRUD */
function openInitiativeModal() {
  document.getElementById('init-modal-overlay').classList.add('open');
  document.getElementById('init-form').reset();
}

function closeInitiativeModal() {
  document.getElementById('init-modal-overlay').classList.remove('open');
}

function onInitOverlayClick(e) {
  if (e.target === document.getElementById('init-modal-overlay')) closeInitiativeModal();
}

function saveInitiative(e) {
  e.preventDefault();
  const name = document.getElementById('fi-name').value.trim();
  const category = document.getElementById('fi-category').value;
  if (!name || !category) return;

  const newId = INITIATIVES.length ? Math.max(...INITIATIVES.map(i => i.id)) + 1 : 1;
  INITIATIVES.push({ id: newId, name, category });
  saveInitiatives();

  // Refresh initiative dropdown in activity form
  const fFormInit = document.getElementById('f-initiative');
  fFormInit.innerHTML += `<option>${name}</option>`;
  const fInit = document.getElementById('filter-initiative');
  fInit.innerHTML += `<option>${name}</option>`;

  closeInitiativeModal();
  renderInitiatives();
  renderSideBadges();
  showToast(`🎯 Initiative "${name}" added!`, 'success');
}

/* ──────────────────────────────────────────
   9. CALENDAR
────────────────────────────────────────── */

const CAL_MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const CAL_MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderCalendar() {
  document.getElementById('cal-month-label').textContent = `${CAL_MONTH_NAMES[calMonth]} ${calYear}`;

  // Render Month Pills
  const pillsContainer = document.getElementById('cal-month-pills');
  if (pillsContainer) {
    pillsContainer.innerHTML = CAL_MONTH_SHORT.map((m, idx) => `
      <div class="month-pill ${idx === calMonth ? 'active' : ''}" onclick="selectCalMonth(${idx})">
        ${m} 2026
      </div>
    `).join('');
  }

  const grid = document.getElementById('cal-grid');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  let html = days.map(d => `<div class="cal-header-cell">${d}</div>`).join('');

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();
  const today = new Date();

  // Map activities to dates (endDate is the due date)
  const dateMap = {};
  activities.forEach(a => {
    const dates = [];
    if (a.endDate) dates.push(a.endDate);
    if (a.startDate) dates.push(a.startDate);
    dates.forEach(d => {
      const dt = new Date(d);
      if (dt.getMonth() === calMonth && dt.getFullYear() === calYear) {
        const key = dt.getDate();
        if (!dateMap[key]) dateMap[key] = [];
        if (!dateMap[key].some(item => item.id === a.id)) {
          dateMap[key].push(a);
        }
      }
    });
  });

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    html += `<div class="cal-cell other-month"><div class="cal-date">${daysInPrevMonth - i}</div></div>`;
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const tasksForDay = dateMap[d] || [];
    const chipLimit = 3;
    const chips = tasksForDay.slice(0, chipLimit).map(a =>
      `<div class="cal-task-chip status-${a.status.toLowerCase().replace(/\s/g,'')}" title="${esc(a.name)}">${esc(a.name.substring(0,18))}</div>`
    ).join('');
    const moreCount = tasksForDay.length > chipLimit ? `<div class="cal-more">+${tasksForDay.length - chipLimit} more</div>` : '';

    html += `
    <div class="cal-cell${isToday ? ' today' : ''}" onclick="showCalDayDetail(${d})">
      <div class="cal-date">${d}</div>
      ${chips}${moreCount}
    </div>`;
  }

  // Next month fill
  const totalCells = firstDay + daysInMonth;
  const remaining = totalCells % 7 ? 7 - (totalCells % 7) : 0;
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="cal-cell other-month"><div class="cal-date">${i}</div></div>`;
  }

  grid.innerHTML = html;
  document.getElementById('cal-day-detail').style.display = 'none';

  // Render month activities table
  renderCalMonthActivities();
}

function selectCalMonth(monthIndex) {
  calMonth = monthIndex;
  renderCalendar();
}

function renderCalMonthActivities() {
  const monthStr = String(calMonth + 1).padStart(2, '0');
  const monthActivities = activities.filter(a => isActivityInMonth(a, monthStr));
  const tbody = document.getElementById('cal-month-activities-tbody');
  const title = document.getElementById('cal-month-activities-title');
  if (title) title.textContent = `📋 Activities in ${CAL_MONTH_NAMES[calMonth]} 2026 (${monthActivities.length})`;

  if (!tbody) return;

  if (!monthActivities.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:16px;color:var(--text-muted)">No activities scheduled in ${CAL_MONTH_NAMES[calMonth]} 2026.</td></tr>`;
    return;
  }

  tbody.innerHTML = monthActivities.map((a, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="font-weight:600">${esc(a.name)}</td>
      <td>${esc(a.owner)}</td>
      <td style="color:var(--text-secondary);font-size:11px">${esc(a.initiative || '—')}</td>
      <td style="white-space:nowrap;font-size:11px">${fmtDate(a.startDate)} → ${fmtDate(a.endDate)}</td>
      <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})">✏️</button>
        <a class="btn btn-sm btn-secondary" href="${buildGCalUrl(a)}" target="_blank" title="Add to Calendar">📅</a>
      </td>
    </tr>
  `).join('');
}

function showCalDayDetail(day) {
  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const tasksForDay = activities.filter(a => a.startDate === dateStr || a.endDate === dateStr);

  const detail = document.getElementById('cal-day-detail');
  if (!tasksForDay.length) {
    detail.innerHTML = `<h3>📅 ${fmtDateStr(dateStr)}</h3><p style="color:var(--text-muted);font-size:12px">No tasks on this date. <button class="btn btn-sm btn-primary" onclick="openModalWithDate('${dateStr}')">＋ Add Task</button></p>`;
  } else {
    detail.innerHTML = `<h3>📅 ${fmtDateStr(dateStr)} — ${tasksForDay.length} task(s)</h3>` +
      tasksForDay.map(a => `
        <div class="cal-detail-item">
          <span class="badge ${badgeClass(a.status)}">${a.status}</span>
          <strong>${esc(a.name)}</strong>
          <span style="color:var(--text-muted);font-size:11px">${esc(a.owner)}</span>
          <a class="cal-gcal-btn" href="${buildGCalUrl(a)}" target="_blank">📅 Add to Calendar</a>
        </div>
      `).join('');
  }
  detail.style.display = 'block';
}

function openModalWithDate(dateStr) {
  openModal();
  document.getElementById('f-start').value = dateStr;
  document.getElementById('f-end').value = dateStr;
}

function calPrev() {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}

function calNext() {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

function calToday() {
  const now = new Date();
  calMonth = now.getMonth();
  calYear = now.getFullYear();
  renderCalendar();
}

/* ──────────────────────────────────────────
   10. GANTT CHART
────────────────────────────────────────── */

const GANTT_START = new Date('2026-04-01');
const GANTT_END   = new Date('2026-12-31');
const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_INDEX_MAP = { 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 };
let ganttSelectedMonth = null;

function renderGantt() {
  const ownerFilter = document.getElementById('gantt-filter-owner')?.value || '';
  
  // Render Month Pill Filter
  const pillsContainer = document.getElementById('gantt-month-pills');
  if (pillsContainer) {
    pillsContainer.innerHTML = `
      <div class="month-pill ${ganttSelectedMonth === null ? 'active' : ''}" onclick="selectGanttMonth(null)">
        All Months
      </div>
      ${MONTHS.map(m => `
        <div class="month-pill ${ganttSelectedMonth === m ? 'active' : ''}" onclick="selectGanttMonth('${m}')">
          ${m} 2026
        </div>
      `).join('')}
    `;
  }

  const rows = activities.filter(a => {
    if (ownerFilter && a.owner !== ownerFilter && !a.owner.includes(ownerFilter)) return false;
    if (ganttSelectedMonth) {
      const monthNum = String(MONTH_INDEX_MAP[ganttSelectedMonth]).padStart(2, '0');
      if (!isActivityInMonth(a, monthNum)) return false;
    }
    return a.startDate || a.endDate;
  });

  // Month headers with click interaction
  document.getElementById('gantt-month-headers').innerHTML = MONTHS.map(m =>
    `<div class="gantt-month-label ${ganttSelectedMonth === m ? 'active' : ''}" style="flex:1;cursor:pointer" onclick="selectGanttMonth('${m}')" title="Click to view ${m} activities">${m}</div>`
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
            <div class="gantt-task-title" title="${esc(a.name)}">${esc(a.name)}</div>
            <div class="gantt-task-associate">👤 ${esc(a.owner)}</div>
          </div>
          <div class="gantt-track" style="position:relative">
            <div class="gantt-bar ${barClass}"
              style="left:${leftPct.toFixed(1)}%;width:${widthPct.toFixed(1)}%;top:50%;transform:translateY(-50%);"
              title="${esc(a.name)} • 👤 ${esc(a.owner)} | ${fmtDate(a.startDate)} → ${fmtDate(a.endDate)} | ${a.status}">
              <div class="gantt-bar-text">${esc(a.name)} • 👤 ${esc(a.owner)}</div>
            </div>
          </div>
        </div>`;
      }).join('')
    : `<div class="empty-state" style="padding:36px"><div class="empty-icon">📭</div><p>No activities with dates in selected period.</p></div>`;

  renderGanttMonthActivities();
}

function selectGanttMonth(monthName) {
  ganttSelectedMonth = monthName;
  renderGantt();
}

function renderGanttMonthActivities() {
  const card = document.getElementById('gantt-month-activities');
  const tbody = document.getElementById('gantt-month-activities-tbody');
  const title = document.getElementById('gantt-month-activities-title');
  if (!card || !tbody) return;

  if (!ganttSelectedMonth) {
    card.style.display = 'none';
    return;
  }

  const monthNum = String(MONTH_INDEX_MAP[ganttSelectedMonth]).padStart(2, '0');
  const monthActivities = activities.filter(a => isActivityInMonth(a, monthNum));
  title.textContent = `📋 Activities in ${ganttSelectedMonth} 2026 (${monthActivities.length})`;
  card.style.display = 'block';

  if (!monthActivities.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:16px;color:var(--text-muted)">No activities active in ${ganttSelectedMonth} 2026.</td></tr>`;
    return;
  }

  tbody.innerHTML = monthActivities.map((a, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="font-weight:600">${esc(a.name)}</td>
      <td>${esc(a.owner)}</td>
      <td style="color:var(--text-secondary);font-size:11px">${esc(a.initiative || '—')}</td>
      <td style="white-space:nowrap;font-size:11px">${fmtDate(a.startDate)} → ${fmtDate(a.endDate)}</td>
      <td><span class="badge ${badgeClass(a.status)}">${a.status}</span></td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editActivity(${a.id})">✏️</button>
        <a class="btn btn-sm btn-secondary" href="${buildGCalUrl(a)}" target="_blank" title="Add to Calendar">📅</a>
      </td>
    </tr>
  `).join('');
}

function daysBetween(a, b) {
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

/* ──────────────────────────────────────────
   11. CRUD — ADD / EDIT / DELETE
────────────────────────────────────────── */

function openModal(id = null) {
  editingId = id;
  const form = document.getElementById('activity-form');
  form.reset();

  // Reset owner checkboxes
  document.querySelectorAll('#f-owner-checkboxes input').forEach(cb => cb.checked = false);

  // Show/hide sub-activities section
  const subSection = document.getElementById('subactivities-section');
  const subList = document.getElementById('subactivities-list');
  subList.innerHTML = '';

  const managerGroup = document.getElementById('f-manager-notify-group');

  if (id) {
    const a = activities.find(x => x.id === id);
    if (!a) return;
    document.getElementById('modal-title').textContent = '✏️ Edit Activity';
    document.getElementById('modal-save-btn').textContent = 'Update Activity';
    document.getElementById('f-name').value = a.name;

    // Set owner checkboxes
    const ownerParts = (a.owner || '').split('/');
    ownerParts.forEach(o => {
      const cb = document.querySelector(`#f-owner-checkboxes input[value="${o.trim()}"]`);
      if (cb) cb.checked = true;
    });

    document.getElementById('f-status').value = a.status || 'Not Started';
    document.getElementById('f-start').value = a.startDate || '';
    const startTimeEl = document.getElementById('f-start-time');
    if (startTimeEl) startTimeEl.value = a.startTime || '';
    document.getElementById('f-end').value = a.endDate || '';
    const endTimeEl = document.getElementById('f-end-time');
    if (endTimeEl) endTimeEl.value = a.endTime || '';
    const reminderTimeEl = document.getElementById('f-reminder-time');
    if (reminderTimeEl) reminderTimeEl.value = a.reminderTime || '1 day before';
    document.getElementById('f-type').value = a.type || '';
    document.getElementById('f-initiative').value = a.initiative || '';
    document.getElementById('f-notes').value = a.notes || '';

    if (managerGroup) managerGroup.style.display = 'none';

    // Sub-activities
    subSection.style.display = 'block';
    if (a.subActivities && a.subActivities.length) {
      a.subActivities.forEach(sub => addSubActivityRow(sub.name, sub.status));
    }
  } else {
    document.getElementById('modal-title').textContent = '➕ Add Activity';
    document.getElementById('modal-save-btn').textContent = 'Save Activity';
    // When manager or user assigns new task, status defaults to 'Not Started'
    document.getElementById('f-status').value = 'Not Started';
    document.getElementById('f-start').value = new Date().toISOString().slice(0,10);
    const startTimeEl = document.getElementById('f-start-time');
    if (startTimeEl) startTimeEl.value = '10:00';
    document.getElementById('f-end').value = '';
    const endTimeEl = document.getElementById('f-end-time');
    if (endTimeEl) endTimeEl.value = '18:00';
    const reminderTimeEl = document.getElementById('f-reminder-time');
    if (reminderTimeEl) reminderTimeEl.value = '1 day before';

    if (managerGroup) {
      managerGroup.style.display = 'block';
      const notifyCb = document.getElementById('f-notify-manager');
      if (notifyCb) notifyCb.checked = true;
    }
    subSection.style.display = 'block';
  }

  document.getElementById('modal-overlay').classList.add('open');
}

function addSubActivityRow(name = '', status = 'Not Started') {
  const list = document.getElementById('subactivities-list');
  const row = document.createElement('div');
  row.className = 'subact-row';
  row.innerHTML = `
    <input type="text" placeholder="Sub-activity name" value="${esc(name)}" class="subact-name" />
    <select class="subact-status">
      <option ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
      <option ${status === 'On Going' ? 'selected' : ''}>On Going</option>
      <option ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
      <option ${status === 'Completed' ? 'selected' : ''}>Completed</option>
    </select>
    <button type="button" class="remove-subact" onclick="this.parentElement.remove()">✕</button>
  `;
  list.appendChild(row);
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

  // Get selected owners
  const selectedOwners = [];
  document.querySelectorAll('#f-owner-checkboxes input:checked').forEach(cb => {
    selectedOwners.push(cb.value);
  });
  if (!selectedOwners.length) {
    showToast('⚠️ Please select at least one owner', 'error');
    return;
  }

  // Get sub-activities
  const subActivities = [];
  document.querySelectorAll('.subact-row').forEach(row => {
    const name = row.querySelector('.subact-name').value.trim();
    const status = row.querySelector('.subact-status').value;
    if (name) subActivities.push({ name, status });
  });

  const shouldNotifyManager = !editingId && document.getElementById('f-notify-manager')?.checked;

  const data = {
    name:         document.getElementById('f-name').value.trim(),
    owner:        selectedOwners.join('/'),
    status:       document.getElementById('f-status').value || 'Not Started',
    startDate:    document.getElementById('f-start').value,
    startTime:    document.getElementById('f-start-time')?.value || '',
    endDate:      document.getElementById('f-end').value,
    endTime:      document.getElementById('f-end-time')?.value || '',
    reminderTime: document.getElementById('f-reminder-time')?.value || '1 day before',
    type:         document.getElementById('f-type').value,
    initiative:   document.getElementById('f-initiative').value,
    notes:        document.getElementById('f-notes').value.trim(),
    subActivities: subActivities,
  };

  let savedActivity;
  if (editingId) {
    const idx = activities.findIndex(a => a.id === editingId);
    savedActivity = { id: editingId, ...data };
    activities[idx] = savedActivity;
    showToast('✅ Activity updated successfully!', 'success');
  } else {
    savedActivity = { id: nextId++, ...data };
    activities.push(savedActivity);
    showToast('🎉 Activity added successfully!', 'success');
  }

  saveData();
  closeModal();
  renderAll();

  if (shouldNotifyManager) {
    setTimeout(() => {
      triggerManagerAssignmentNotification(savedActivity);
    }, 300);
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
   12. EXPORT CSV
────────────────────────────────────────── */

function exportCSV() {
  const headers = ['Sr No','Name of Activity','Owner','Initiative','Start Date','End Date','Status','Type','Notes','Sub-Activities'];
  const rows = activities.map((a, i) => [
    i + 1, a.name, a.owner, a.initiative, a.startDate, a.endDate, a.status, a.type, a.notes,
    (a.subActivities || []).map(s => `${s.name}(${s.status})`).join('; ')
  ].map(v => `"${(v||'').toString().replace(/"/g,'""')}"`));

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
   13. GOOGLE SHEETS
────────────────────────────────────────── */

function openInGoogleSheets() {
  exportCSV();
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
   14. SHARE
────────────────────────────────────────── */

function openShareModal() {
  const link = window.location.href;
  document.getElementById('share-link').value = link;
  const preview = document.getElementById('share-message-preview');
  if (preview) {
    preview.value = `Hi Team,\n\nPlease find the L&D Activity Tracker shared with you:\nTracker Link: ${link}\nGoogle Sheet: ${GOOGLE_SHEET_URL}\n\nBest Regards,\nL&D Team`;
  }
  document.getElementById('share-modal-overlay').classList.add('open');
}

function closeShareModal() {
  document.getElementById('share-modal-overlay').classList.remove('open');
}

function onShareOverlayClick(e) {
  if (e.target === document.getElementById('share-modal-overlay')) closeShareModal();
}

function addEmailChip() {
  const input = document.getElementById('share-email-input');
  const email = input.value.trim();
  if (!email || !email.includes('@')) { showToast('⚠️ Enter a valid email', 'error'); return; }

  const container = document.getElementById('share-email-chips');
  const chip = document.createElement('span');
  chip.className = 'email-chip';
  chip.dataset.email = email;
  chip.innerHTML = `${email} <button onclick="removeEmailChip(this)">×</button>`;
  container.appendChild(chip);
  input.value = '';
}

function removeEmailChip(btn) {
  btn.parentElement.remove();
}

function copyShareLink() {
  const link = document.getElementById('share-link').value;
  navigator.clipboard.writeText(link).then(() => {
    showToast('📋 Link copied to clipboard!', 'success');
  }).catch(() => {
    const input = document.getElementById('share-link');
    input.select();
    document.execCommand('copy');
    showToast('📋 Link copied!', 'success');
  });
}

function getShareData() {
  const emailChips = document.querySelectorAll('#share-email-chips .email-chip');
  const emails = Array.from(emailChips).map(c => c.dataset.email).filter(Boolean);
  const link = document.getElementById('share-link').value || window.location.href;
  const subject = 'L&D Tracker — Task Sheet Shared';
  const body = `Hi Team,\n\nPlease find the L&D Activity Tracker shared with you:\n\nTracker Link: ${link}\nGoogle Sheet: ${GOOGLE_SHEET_URL}\n\nBest Regards,\nL&D Team`;
  return { emails, subject, body };
}

function sendViaGmail() {
  const { emails, subject, body } = getShareData();
  if (!emails.length) { showToast('⚠️ Add at least one email', 'error'); return; }
  
  const toStr = emails.join(',');
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toStr)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
  showToast('📧 Opening in Gmail...', 'success');
  closeShareModal();
}

function sendViaMailto() {
  const { emails, subject, body } = getShareData();
  if (!emails.length) { showToast('⚠️ Add at least one email', 'error'); return; }

  const toStr = emails.join(',');
  const mailtoUri = `mailto:${toStr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Safe trigger without opening a blank tab
  const link = document.createElement('a');
  link.href = mailtoUri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast('💻 Opening default mail app...', 'info');
  closeShareModal();
}

function copyShareMessage() {
  const { body } = getShareData();
  navigator.clipboard.writeText(body).then(() => {
    showToast('📋 Message copied to clipboard!', 'success');
  }).catch(() => {
    const preview = document.getElementById('share-message-preview');
    if (preview) {
      preview.select();
      document.execCommand('copy');
      showToast('📋 Message copied!', 'success');
    }
  });
}

/* ──────────────────────────────────────────
   15. REMINDERS & NOTIFICATIONS
────────────────────────────────────────── */

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function checkReminders() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);
  const todayStr = now.toISOString().slice(0, 10);

  // Check tasks due tomorrow
  const dueTomorrow = activities.filter(a => a.endDate === tomorrowStr && a.status !== 'Completed');
  dueTomorrow.forEach(a => {
    const reminderKey = `reminder_${a.id}_${tomorrowStr}`;
    if (!localStorage.getItem(reminderKey)) {
      showBrowserNotification(`📋 Task due tomorrow: ${a.name}`, `Owner: ${a.owner} | Due: ${fmtDateStr(a.endDate)}`);
      localStorage.setItem(reminderKey, 'sent');
    }
  });

  // Check tasks due today
  const dueToday = activities.filter(a => a.endDate === todayStr && a.status !== 'Completed');
  dueToday.forEach(a => {
    const reminderKey = `reminder_today_${a.id}_${todayStr}`;
    if (!localStorage.getItem(reminderKey)) {
      showBrowserNotification(`🚨 Task due TODAY: ${a.name}`, `Owner: ${a.owner} | This task needs to be completed today!`);
      localStorage.setItem(reminderKey, 'sent');
    }
  });

  // Show in-app toast for upcoming
  if (dueTomorrow.length && !sessionStorage.getItem('reminder_toast_shown')) {
    showToast(`⏰ ${dueTomorrow.length} task(s) due tomorrow!`, 'info');
    sessionStorage.setItem('reminder_toast_shown', '1');
  }
}

function showBrowserNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '📋' });
  }
}

function buildGCalUrl(activity) {
  const title = encodeURIComponent(activity.name);
  const startDateStr = activity.startDate || activity.endDate || new Date().toISOString().slice(0, 10);
  const endDateStr = activity.endDate || activity.startDate || startDateStr;

  let datesParam = '';
  if (activity.startTime) {
    const sClean = startDateStr.replace(/-/g, '');
    const sTime = activity.startTime.replace(/:/g, '') + '00';
    let eClean = endDateStr.replace(/-/g, '');
    let eTime = (activity.endTime ? activity.endTime.replace(/:/g, '') : activity.startTime.replace(/:/g, '')) + '00';
    datesParam = `${sClean}T${sTime}/${eClean}T${eTime}`;
  } else {
    const sClean = startDateStr.replace(/-/g, '');
    const eClean = endDateStr.replace(/-/g, '');
    datesParam = `${sClean}/${eClean}`;
  }

  const details = encodeURIComponent(
    `Owner: ${activity.owner}\n` +
    `Initiative: ${activity.initiative || 'N/A'}\n` +
    `Status: ${activity.status}\n` +
    (activity.reminderTime ? `Reminder: ${activity.reminderTime}\n` : '') +
    (activity.notes ? `\nNotes:\n${activity.notes}` : '')
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${details}&sf=true`;
}

/* ──────────────────────────────────────────
   15.1 CALENDAR EVENT SCHEDULING MODAL
────────────────────────────────────────── */

function openAddEventModal(dateStr = null) {
  const form = document.getElementById('event-form');
  if (form) form.reset();

  const targetDate = dateStr || new Date().toISOString().slice(0, 10);
  const evDateInput = document.getElementById('ev-date');
  if (evDateInput) evDateInput.value = targetDate;

  // Uncheck owners
  document.querySelectorAll('#ev-owner-checkboxes input').forEach(cb => cb.checked = false);

  // Populate initiatives in event form
  const evInit = document.getElementById('ev-initiative');
  if (evInit) {
    evInit.innerHTML = '<option value="Other">Other</option>' + INITIATIVES.map(i => `<option value="${esc(i.name)}">${esc(i.name)}</option>`).join('');
  }

  document.getElementById('event-modal-overlay').classList.add('open');
}

function closeEventModal() {
  document.getElementById('event-modal-overlay').classList.remove('open');
}

function onEventOverlayClick(e) {
  if (e.target === document.getElementById('event-modal-overlay')) closeEventModal();
}

function saveEvent(e) {
  e.preventDefault();

  const name = document.getElementById('ev-name').value.trim();
  const selectedOwners = [];
  document.querySelectorAll('#ev-owner-checkboxes input:checked').forEach(cb => {
    selectedOwners.push(cb.value);
  });
  if (!selectedOwners.length) {
    showToast('⚠️ Please select at least one attendee/owner', 'error');
    return;
  }

  const date = document.getElementById('ev-date').value;
  const startTime = document.getElementById('ev-start-time').value;
  const endTime = document.getElementById('ev-end-time').value;
  const reminderTime = document.getElementById('ev-reminder-time').value;
  const initiative = document.getElementById('ev-initiative').value;
  const link = document.getElementById('ev-link').value.trim();
  const notes = document.getElementById('ev-notes').value.trim();

  let finalNotes = '';
  if (link) finalNotes += `Meeting Link: ${link}\n`;
  if (notes) finalNotes += notes;

  const newEventActivity = {
    id: nextId++,
    name: name,
    owner: selectedOwners.join('/'),
    startDate: date,
    endDate: date,
    startTime: startTime,
    endTime: endTime,
    reminderTime: reminderTime,
    status: 'Not Started',
    type: 'Meeting / Event',
    initiative: initiative || 'Other',
    notes: finalNotes.trim(),
    subActivities: []
  };

  activities.push(newEventActivity);
  saveData();
  closeEventModal();
  renderAll();
  showToast(`📅 Event "${name}" scheduled successfully!`, 'success');

  // Offer to open Google Calendar immediately
  const gcalUrl = buildGCalUrl(newEventActivity);
  setTimeout(() => {
    if (confirm(`Event "${name}" scheduled!\n\nWould you like to open Google Calendar right now to sync this meeting?`)) {
      window.open(gcalUrl, '_blank');
    }
  }, 400);
}

/* ──────────────────────────────────────────
   15.2 1-DAY DUE REMINDER MODAL
────────────────────────────────────────── */

function openReminderModal(activityId) {
  const a = activities.find(x => x.id === activityId);
  if (!a) return;

  const emails = getEmailsForOwner(a.owner);
  const endDateFormatted = a.endDate ? `${fmtDate(a.endDate)}${a.endTime ? ' at ' + a.endTime : ''}` : 'Tomorrow';
  const trackerLink = window.location.href;

  let subject = (emailTemplates.reminderSubject || DEFAULT_TEMPLATES.reminderSubject)
    .replace(/\[Activity Name\]/g, a.name)
    .replace(/\[Owner Name\]/g, a.owner)
    .replace(/\[End Date\]/g, endDateFormatted)
    .replace(/\[Initiative\]/g, a.initiative || 'General')
    .replace(/\[Status\]/g, a.status);

  let body = (emailTemplates.reminderBody || DEFAULT_TEMPLATES.reminderBody)
    .replace(/\[Activity Name\]/g, a.name)
    .replace(/\[Owner Name\]/g, a.owner)
    .replace(/\[End Date\]/g, endDateFormatted)
    .replace(/\[Initiative\]/g, a.initiative || 'General')
    .replace(/\[Status\]/g, a.status)
    .replace(/\[Tracker Link\]/g, trackerLink);

  currentReminderDraft = {
    to: emails.join(','),
    cc: MANAGER_EMAIL,
    subject: subject,
    body: body
  };

  const recipientEl = document.getElementById('reminder-email-recipient');
  if (recipientEl) {
    recipientEl.innerHTML = `👤 To: <strong>${esc(a.owner)}</strong> &lt;${emails.join(', ')}&gt;<br/><span style="color:var(--text-secondary);font-size:11px">📋 CC: Prasad Kulkarni (${MANAGER_EMAIL})</span>`;
  }

  const previewEl = document.getElementById('reminder-email-preview');
  if (previewEl) {
    previewEl.value = `Subject: ${subject}\n\n${body}`;
  }

  document.getElementById('reminder-modal-overlay').classList.add('open');
}

function closeReminderModal() {
  document.getElementById('reminder-modal-overlay').classList.remove('open');
  currentReminderDraft = null;
}

function onReminderOverlayClick(e) {
  if (e.target === document.getElementById('reminder-modal-overlay')) closeReminderModal();
}

function sendReminderGmail() {
  if (!currentReminderDraft) return;
  const { to, cc, subject, body } = currentReminderDraft;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
  showToast('📧 Opening reminder in Gmail...', 'success');
  closeReminderModal();
}

function sendReminderMailto() {
  if (!currentReminderDraft) return;
  const { to, cc, subject, body } = currentReminderDraft;
  const mailtoUri = `mailto:${to}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  const link = document.createElement('a');
  link.href = mailtoUri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast('💻 Opening default mail app...', 'info');
  closeReminderModal();
}

function copyReminderEmail() {
  if (!currentReminderDraft) return;
  const fullText = `Subject: ${currentReminderDraft.subject}\n\n${currentReminderDraft.body}`;
  navigator.clipboard.writeText(fullText).then(() => {
    showToast('📋 Reminder email copied to clipboard!', 'success');
  }).catch(() => {
    const previewEl = document.getElementById('reminder-email-preview');
    if (previewEl) {
      previewEl.select();
      document.execCommand('copy');
      showToast('📋 Copied!', 'success');
    }
  });
}

/* ──────────────────────────────────────────
   15.3 MANAGER TASK ASSIGNMENT MODAL
────────────────────────────────────────── */

function triggerManagerAssignmentNotification(activity) {
  const emails = getEmailsForOwner(activity.owner);
  const dueFormatted = activity.endDate
    ? `${fmtDate(activity.endDate)}${activity.endTime ? ' at ' + activity.endTime : ''}`
    : (activity.startDate ? fmtDate(activity.startDate) : 'To be confirmed');
  const details = activity.notes && activity.notes.trim()
    ? activity.notes.trim()
    : 'Talk with Prasad Kulkarni (prasad.kulkarni1@onixnet.com) for confirmation / details.';
  const trackerLink = window.location.href;

  let subject = (emailTemplates.assignSubject || DEFAULT_TEMPLATES.assignSubject)
    .replace(/\[Activity Name\]/g, activity.name)
    .replace(/\[Owner Name\]/g, activity.owner)
    .replace(/\[End Date\]/g, dueFormatted)
    .replace(/\[Initiative\]/g, activity.initiative || 'General')
    .replace(/\[Status\]/g, activity.status || 'Not Started');

  let body = (emailTemplates.assignBody || DEFAULT_TEMPLATES.assignBody)
    .replace(/\[Activity Name\]/g, activity.name)
    .replace(/\[Owner Name\]/g, activity.owner)
    .replace(/\[End Date\]/g, dueFormatted)
    .replace(/\[Initiative\]/g, activity.initiative || 'General')
    .replace(/\[Status\]/g, activity.status || 'Not Started')
    .replace(/\[Notes\]/g, details)
    .replace(/\[Tracker Link\]/g, trackerLink);

  currentAssignDraft = {
    to: emails.join(','),
    cc: MANAGER_EMAIL,
    subject: subject,
    body: body
  };

  const recipientEl = document.getElementById('assign-email-recipients');
  if (recipientEl) {
    recipientEl.innerHTML = `👤 To: <strong>${esc(activity.owner)}</strong> &lt;${emails.join(', ')}&gt;<br/><span style="color:var(--text-secondary);font-size:11px">📋 Sender / CC: Prasad Kulkarni (${MANAGER_EMAIL})</span>`;
  }

  const previewEl = document.getElementById('assign-email-preview');
  if (previewEl) {
    previewEl.value = `Subject: ${subject}\n\n${body}`;
  }

  document.getElementById('task-assign-modal-overlay').classList.add('open');
}

function closeAssignModal() {
  document.getElementById('task-assign-modal-overlay').classList.remove('open');
  currentAssignDraft = null;
}

function onAssignOverlayClick(e) {
  if (e.target === document.getElementById('task-assign-modal-overlay')) closeAssignModal();
}

function sendAssignGmail() {
  if (!currentAssignDraft) return;
  const { to, cc, subject, body } = currentAssignDraft;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(gmailUrl, '_blank');
  showToast('📧 Opening task assignment in Gmail...', 'success');
  closeAssignModal();
}

function sendAssignMailto() {
  if (!currentAssignDraft) return;
  const { to, cc, subject, body } = currentAssignDraft;
  const mailtoUri = `mailto:${to}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  const link = document.createElement('a');
  link.href = mailtoUri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast('💻 Opening default mail app...', 'info');
  closeAssignModal();
}

function copyAssignEmail() {
  if (!currentAssignDraft) return;
  const fullText = `Subject: ${currentAssignDraft.subject}\n\n${currentAssignDraft.body}`;
  navigator.clipboard.writeText(fullText).then(() => {
    showToast('📋 Task assignment email copied to clipboard!', 'success');
  }).catch(() => {
    const previewEl = document.getElementById('assign-email-preview');
    if (previewEl) {
      previewEl.select();
      document.execCommand('copy');
      showToast('📋 Copied!', 'success');
    }
  });
}

function sendReminderEmail(activityId) {
  openReminderModal(activityId);
}

/* ──────────────────────────────────────────
   16. TOAST NOTIFICATIONS
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
   17. HELPERS
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

function fmtDateStr(d) {
  if (!d) return '—';
  try {
    return new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
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
  if (name === 'Tejashri') return 'av-tejashri';
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
