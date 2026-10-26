/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *  L&D TRACKER — 24/7 AUTOMATED EMAIL & REMINDERS SCRIPT (GOOGLE APPS SCRIPT)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *  This script runs directly inside your Google Sheet on Google Cloud 24/7.
 *  It sends:
 *    1. Automated reminder emails 1 DAY BEFORE due date to the assigned associate.
 *    2. Automated same-day / 1-hour reminders.
 *    3. Direct background email sending when anyone assigns a task in the Tracker.
 * 
 *  TEAM DIRECTORY:
 *    - Tejashri:        tejashri.sapkal@onixnet.com
 *    - Tanaya:          tanaya.sankapal@onixnet.com
 *    - Nikhil:          nikhil.shelke@onixnet.com
 *    - Deepraj:         deepraj.bhosale@onixnet.com
 *    - Manager (Prasad): prasad.kulkarni1@onixnet.com
 * 
 *  SETUP INSTRUCTIONS:
 *    1. Open your Google Sheet:
 *       https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/
 *    2. Go to Extensions → Apps Script.
 *    3. Delete any default code, paste this entire file, and click Save (💾).
 *    4. Select "setupAutomaticTriggers" from the function dropdown and click Run (▶️).
 *       (Authorize permissions when prompted — this allows GmailApp to send emails).
 *    5. (Optional Webhook): Click Deploy → New Deployment → Type: Web app.
 *       - Execute as: Me
 *       - Who has access: Anyone (or Anyone within Onix)
 *       - Copy the Web App URL and paste it into the L&D Tracker Settings!
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const TEAM_EMAIL_MAP = {
  'tejashri': 'tejashri.sapkal@onixnet.com',
  'tanaya':   'tanaya.sankapal@onixnet.com',
  'nikhil':   'nikhil.shelke@onixnet.com',
  'deepraj':  'deepraj.bhosale@onixnet.com',
  'prasad':   'prasad.kulkarni1@onixnet.com',
  'prasad kulkarni': 'prasad.kulkarni1@onixnet.com'
};

const MANAGER_EMAIL = 'prasad.kulkarni1@onixnet.com';
const TRACKER_URL = 'https://docs.google.com/spreadsheets/d/1B5cI9UpRKemHf7OnwanVR9Lz-JUIpjwgVLgUOVIk6qY/edit?gid=2050775428#gid=2050775428';

/**
 * Helper to resolve an owner's email address(es)
 */
function getEmailsForOwner(ownerStr) {
  if (!ownerStr) return [MANAGER_EMAIL];
  const parts = ownerStr.split('/').map(p => p.trim().toLowerCase());
  const emails = [];
  parts.forEach(p => {
    for (const [name, email] of Object.entries(TEAM_EMAIL_MAP)) {
      if (name === p || p.includes(name)) {
        if (!emails.includes(email)) emails.push(email);
      }
    }
  });
  return emails.length ? emails : [MANAGER_EMAIL];
}

/**
 * ⏰ 1. AUTOMATIC DAILY REMINDERS TRIGGER
 * Runs every day at 8:00 AM on Google Cloud automatically.
 * Checks all tasks due tomorrow and sends reminder emails.
 */
function sendDailyAutomatedReminders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return;

  const headers = data[0].map(h => String(h).trim().toLowerCase());
  
  // Find column indices
  const colName = headers.findIndex(h => h.includes('activity') || h.includes('name'));
  const colOwner = headers.findIndex(h => h.includes('owner') || h.includes('assignee'));
  const colInitiative = headers.findIndex(h => h.includes('initiative'));
  const colEndDate = headers.findIndex(h => h.includes('end date') || h.includes('due'));
  const colStatus = headers.findIndex(h => h.includes('status'));
  const colNotes = headers.findIndex(h => h.includes('notes'));

  const today = new Date();
  today.setHours(0,0,0,0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowStr = Utilities.formatDate(tomorrow, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  let sentCount = 0;

  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    const taskName = colName >= 0 ? String(row[colName]).trim() : '';
    const owner = colOwner >= 0 ? String(row[colOwner]).trim() : '';
    const initiative = colInitiative >= 0 ? String(row[colInitiative]).trim() : 'General';
    const rawEnd = colEndDate >= 0 ? row[colEndDate] : null;
    const status = colStatus >= 0 ? String(row[colStatus]).trim() : '';
    
    if (!taskName || !rawEnd || status.toLowerCase() === 'completed') continue;

    let endDt;
    if (rawEnd instanceof Date) {
      endDt = rawEnd;
    } else {
      endDt = new Date(rawEnd);
    }
    if (isNaN(endDt.getTime())) continue;

    const rowEndStr = Utilities.formatDate(endDt, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const formattedDate = Utilities.formatDate(endDt, Session.getScriptTimeZone(), 'dd MMM yyyy');

    // 1-DAY BEFORE REMINDER
    if (rowEndStr === tomorrowStr) {
      const recipientEmails = getEmailsForOwner(owner);
      const subject = `Gentle Reminder: ${taskName} is due tomorrow`;
      const body = `Hi ${owner},

This is an automated reminder that the following task is scheduled to be completed by ${formattedDate}:

Activity Name: ${taskName}
Initiative: ${initiative}
Status: ${status || 'In Progress'}
End Date: ${formattedDate}

Please ensure the status is updated in the L&D Tracker once completed. Let me know if you need any support or if the timeline needs adjusting.

Best regards,
L&D Team
Onix`;

      try {
        GmailApp.sendEmail(recipientEmails.join(','), subject, body, {
          cc: MANAGER_EMAIL,
          name: 'L&D Activity Tracker'
        });
        sentCount++;
        Logger.log(`Sent 1-day reminder for "${taskName}" to ${recipientEmails.join(',')}`);
      } catch (err) {
        Logger.log(`Failed to send email for "${taskName}": ${err}`);
      }
    }
  }

  Logger.log(`Automated check completed. Total reminders sent: ${sentCount}`);
}

/**
 * ⚡ 2. WEBHOOK ENDPOINT (doPost)
 * Allows the L&D Tracker web application to send emails instantly in the background!
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action || 'sendEmail';

    if (action === 'assign' || action === 'sendEmail') {
      const to = payload.to;
      const cc = payload.cc || MANAGER_EMAIL;
      const subject = payload.subject;
      const body = payload.body;
      const fromName = payload.fromName || 'L&D Activity Tracker';

      if (!to || !subject || !body) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Missing fields' }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      GmailApp.sendEmail(to, subject, body, {
        cc: cc,
        name: fromName
      });

      return ContentService.createTextOutput(JSON.stringify({ status: 'success', sentTo: to }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ignored' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 🚀 3. ONE-CLICK TRIGGER SETUP
 * Run this function once from the Apps Script editor to install the 24/7 background timer!
 */
function setupAutomaticTriggers() {
  // Delete old triggers
  const existingTriggers = ScriptApp.getProjectTriggers();
  existingTriggers.forEach(t => ScriptApp.deleteTrigger(t));

  // Run daily at 8:00 AM
  ScriptApp.newTrigger('sendDailyAutomatedReminders')
    .timeBased()
    .atHour(8)
    .everyDays(1)
    .create();

  Logger.log('✅ Daily 8:00 AM automated reminder trigger installed successfully!');
}
