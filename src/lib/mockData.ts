import type { AskContext, AskContextId, ChatConversation, ChatThread, Doctor, Note, Patient, PathologyCategory, PathologyParameter, PrescriptionRecord, ScheduleAppointment, ScheduleDay, TimelineEntry } from '@/types'

export const currentDoctor: Doctor = {
  id: 'doc-1',
  name: 'Dr. Girish Sharma',
  title: 'MD',
  specialty: 'Nephrology',
  department: 'Nephrology',
  hospital: 'Sparsh Yelahanka',
  licenseNumber: 'KA-MED-44821',
}

// Patient roster for the list page. Counts -> All 8 * IPD 5 * OPD 2 * Referral 1.
export const patients: Patient[] = [
  mk('p-1', 'Arjun Patel',   'IPD'),
  mk('p-2', 'Priya Sharma',  'IPD'),
  mk('p-3', 'Rahul Verma',   'OPD'),
  mk('p-4', 'Sneha Iyer',    'IPD'),
  mk('p-5', 'Vikram Singh',  'OPD'),
  mk('p-6', 'Anjali Desai',  'Referral'),
  mk('p-7', 'Karan Joshi',   'IPD'),
  mk('p-8', 'Meera Reddy',   'IPD'),
]

// Chat threads for the Chat page. Counts -> All 8 * Patients 5 * Team 3.
// avatarUrl: Indian-portrait photos from Unsplash (face-cropped). Falls back to initials on error.
const FACE = '?w=160&h=160&fit=crop&crop=faces&q=80'
export const chatThreads: ChatThread[] = [
  { id: 'c-1', name: 'Ritika Sharma',    initials: 'RS', avatarColour: 'red',    avatarUrl: `https://images.unsplash.com/photo-1631005436794-ccaa79de61ba${FACE}`, channel: 'patient', time: '09:10AM',   unreadCount: 2, preview: 'Starting the new physical therapy regimen this week.' },
  { id: 'c-2', name: 'Sneha Iyer',       initials: 'SI', avatarColour: 'green',  avatarUrl: `https://images.unsplash.com/photo-1558377235-76f53857000b${FACE}`, channel: 'patient', time: '08:20AM',   unreadCount: 1, preview: 'Thank you doctor, the swelling has gone down a lot.' },
  { id: 'c-3', name: 'Dr. Vikram Singh', initials: 'VS', avatarColour: 'blue',   avatarUrl: `https://images.unsplash.com/photo-1607346256330-dee7af15f7c5${FACE}`, channel: 'team',    time: '06:14AM',   unreadCount: 4, preview: "Reviewed the MRI -- let's discuss it at morning rounds." },
  { id: 'c-4', name: 'Arjun Mehta',      initials: 'AM', avatarColour: 'grey',   avatarUrl: `https://images.unsplash.com/photo-1581382575275-97901c2635b7${FACE}`, channel: 'patient', time: 'Yesterday',                 preview: "Can we reschedule tomorrow's follow-up to the afternoon?" },
  { id: 'c-5', name: 'Priya Nair',       initials: 'PN', avatarColour: 'red',    avatarUrl: `https://images.unsplash.com/photo-1573165850883-9b0e18c44bd2${FACE}`, channel: 'patient', time: 'Yesterday',                 preview: 'Feeling much better after the new dosage.' },
  { id: 'c-6', name: 'Dr. Kavya Rao',    initials: 'KR', avatarColour: 'green',                                                                                              channel: 'team',    time: 'Mon',                       preview: 'Discharge summary for bed 12 is ready for sign-off.' },
  { id: 'c-7', name: 'Rohan Gupta',      initials: 'RG', avatarColour: 'yellow',                                                                                             channel: 'patient', time: 'Mon',                       preview: 'Is this medication safe to take with my allergy?' },
  { id: 'c-8', name: 'Dr. Aditya Verma', initials: 'AV', avatarColour: 'blue',   avatarUrl: `https://images.unsplash.com/photo-1607081692251-d689f1b9af84${FACE}`, channel: 'team',    time: 'Sun',       unreadCount: 3, preview: 'Lab flagged a critical potassium value -- please check.' },
]

// Open care-thread conversation (what opens when a chat row is tapped).
// Patient (Ritika) is incoming/left; the responding doctor (Dr. Mehta) is outgoing/right.
export const careConversation: ChatConversation = {
  id: 'c-1',
  patientName: 'Ritika Sharma',
  mrn: 'UGI56778',
  participants: ['Dr. Mehta', 'Asha', 'Nurse Priya'],
  items: [
    { kind: 'day', label: 'Yesterday' },
    {
      kind: 'message',
      message: {
        id: 'm-1', senderName: 'Ritika Sharma', direction: 'incoming', time: '06:22 PM',
        text: 'Also wanted to ask if I should continue the phosphate binder with dinner today.',
      },
    },
    {
      kind: 'message',
      message: {
        id: 'm-2', senderName: 'Dr. Mehta', direction: 'outgoing', time: '06:40 PM',
        channel: 'Delivered through SMS', status: 'read',
        text: 'Yes, continue it with dinner tonight. We’ll review the dose again after the next phosphorus report.',
      },
    },
    { kind: 'day', label: 'Today' },
    { kind: 'note', text: 'Patient messages from WhatsApp, SMS, and app are merged into one care thread.' },
    {
      kind: 'message',
      message: {
        id: 'm-3', senderName: 'Ritika Sharma', direction: 'incoming', time: '08:14 AM',
        text: 'Good morning doctor, I felt a little dizzy after yesterday’s dialysis. It improved after breakfast.',
      },
    },
    {
      kind: 'message',
      message: {
        id: 'm-4', senderName: 'Asha', direction: 'incoming', time: '08:19 AM',
        text: 'Noted on behalf of Dr. Mehta. Please share current BP if available.',
      },
    },
    {
      kind: 'message',
      message: {
        id: 'm-5', senderName: 'Dr. Mehta', direction: 'outgoing', time: '08:32 AM', status: 'read',
        text: 'Thanks Asha. Ritika, please check your BP now and again 30 minutes after standing.',
      },
    },
  ],
}

// Prototype: every thread opens the same care conversation, but the header reflects
// the tapped row's name where we have it.
export function getConversation(threadId: string): ChatConversation {
  const thread = chatThreads.find(t => t.id === threadId)
  if (!thread || thread.id === careConversation.id) return careConversation
  return { ...careConversation, id: thread.id, patientName: thread.name }
}

// Patient lookup for the detail page (falls back to the first patient, like getConversation).
export function getPatient(patientId: string): Patient {
  return patients.find(p => p.id === patientId) ?? patients[0]
}

// Ritika's CKD journey — newest first (top = most recent; bottom = first visit).
// Prototype: every patient opens the same clinical record, mirroring getConversation.
export const patientTimeline: TimelineEntry[] = [
  {
    id: 't-1',
    date: '20 Aug 2025',
    category: 'Medication',
    title: 'CKD medications started',
    meta: 'Initial renal regimen · Dr. Mehta · Nephrology',
    body: 'Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management.',
    inset: {
      kind: 'medication',
      name: 'Torsemide + sodium bicarbonate',
      detail: '20 mg / 650 mg · Morning / Twice daily · Oral',
      status: 'New start',
    },
  },
  {
    id: 't-2',
    date: '02 Aug 2025',
    category: 'Medication',
    title: 'Metformin started',
    meta: 'Pre-dialysis diabetes management · Dr. Patel · Endocrinology',
    body: 'Metformin started to tighten glycaemic control while renal function was still adequate.',
    inset: { kind: 'medication', name: 'Metformin', detail: '500 mg · Twice daily · Oral', status: 'New start' },
  },
  {
    id: 't-3',
    date: '18 Jul 2025',
    category: 'Prescription',
    title: 'CKD workup review',
    meta: 'Dr. Mehta · Nephrology',
    body: 'Follow-up labs confirmed progression and dialysis planning was discussed with family. Repeat anemia and iron profile ordered.',
    inset: { kind: 'record', title: 'Workup follow-up prescription', meta: 'Labs + supportive medication plan' },
  },
  {
    id: 't-4',
    date: '05 Jul 2025',
    category: 'Lab',
    title: 'Specialized workup ordered',
    meta: 'Iron profile, viral markers, calcium-phosphorus',
    body: 'Extended workup was added after baseline renal impairment was confirmed.',
    inset: { kind: 'record', title: 'Follow-up lab order', meta: 'Iron profile · PTH · Viral markers' },
  },
  {
    id: 't-5',
    date: '28 Jun 2025',
    category: 'Report',
    title: 'Baseline reports uploaded',
    meta: 'Creatinine 5.8 · eGFR 11 · Hb 8.9',
    body: 'Initial outside reports were added and marked for urgent nephrology review.',
    inset: { kind: 'record', title: 'Outside lab bundle', meta: 'CBC, KFT, urine protein' },
  },
]

export function getPatientTimeline(_patientId: string): TimelineEntry[] {
  return patientTimeline
}

// ── Pathology trends (Reports section) ───────────────────────────────────────
// Five sampling dates shared across every parameter; oldest → newest.
export const trendDates = ['2026-01-13', '2026-02-05', '2026-03-15', '2026-04-19', '2026-05-21']
export const pathologyCategories: PathologyCategory[] = ['Nephrology', 'CBC Test', 'Kidney Function']

const D = trendDates
export const pathologyParameters: PathologyParameter[] = [
  { id: 'creatinine', name: 'Serum Creatinine', unit: 'mg/dL', referenceRange: { low: 0.6, high: 1.2, label: '0.6–1.2' }, category: 'Nephrology', clinicalLabel: 'Kidney function', severityScore: 96, dataPoints: [{ date: D[0], value: 7.2 }, { date: D[1], value: 8.1 }, { date: D[2], value: 9.4 }, { date: D[3], value: 8.6 }, { date: D[4], value: 9.1 }] },
  { id: 'potassium', name: 'Potassium', unit: 'mEq/L', referenceRange: { low: 3.5, high: 5.0, label: '3.5–5.0' }, category: 'Nephrology', clinicalLabel: 'Electrolytes', severityScore: 100, dataPoints: [{ date: D[0], value: 4.2 }, { date: D[1], value: 5.8 }, { date: D[2], value: 5.1 }, { date: D[3], value: 4.7 }, { date: D[4], value: 5.3 }] },
  { id: 'phosphorus', name: 'Phosphorus', unit: 'mg/dL', referenceRange: { low: 2.5, high: 4.5, label: '2.5–4.5' }, category: 'Nephrology', clinicalLabel: 'Mineral balance', severityScore: 82, dataPoints: [{ date: D[0], value: 4.8 }, { date: D[1], value: 5.2 }, { date: D[2], value: 6.1 }, { date: D[3], value: 5.6 }, { date: D[4], value: 5.9 }] },
  { id: 'blood-urea', name: 'Blood Urea', unit: 'mg/dL', referenceRange: { low: 7, high: 20, label: '7–20' }, category: 'Kidney Function', clinicalLabel: 'Dialysis load', severityScore: 78, dataPoints: [{ date: D[0], value: 88 }, { date: D[1], value: 94 }, { date: D[2], value: 101 }, { date: D[3], value: 92 }, { date: D[4], value: 98 }] },
  { id: 'albumin', name: 'Albumin', unit: 'g/dL', referenceRange: { low: 3.5, high: 5.0, label: '3.5–5.0' }, category: 'Nephrology', clinicalLabel: 'Nutrition status', severityScore: 88, dataPoints: [{ date: D[0], value: 3.1 }, { date: D[1], value: 3.3 }, { date: D[2], value: 3.4 }, { date: D[3], value: 3.3 }, { date: D[4], value: 3.2 }] },
  { id: 'calcium', name: 'Calcium', unit: 'mg/dL', referenceRange: { low: 8.5, high: 10.5, label: '8.5–10.5' }, category: 'Kidney Function', clinicalLabel: 'Bone-mineral balance', severityScore: 84, dataPoints: [{ date: D[0], value: 7.8 }, { date: D[1], value: 8.2 }, { date: D[2], value: 7.6 }, { date: D[3], value: 8.0 }, { date: D[4], value: 7.9 }] },
  { id: 'bicarbonate', name: 'Bicarbonate', unit: 'mEq/L', referenceRange: { low: 22, high: 28, label: '22–28' }, category: 'Kidney Function', clinicalLabel: 'Acid-base balance', severityScore: 76, dataPoints: [{ date: D[0], value: 19.2 }, { date: D[1], value: 18.6 }, { date: D[2], value: 20.1 }, { date: D[3], value: 21.4 }, { date: D[4], value: 20.8 }] },
  { id: 'ferritin', name: 'Ferritin', unit: 'ng/mL', referenceRange: { low: 30, high: 400, label: '30–400' }, category: 'CBC Test', clinicalLabel: 'Iron stores', severityScore: 48, dataPoints: [{ date: D[0], value: 96 }, { date: D[1], value: 102 }, { date: D[2], value: 118 }, { date: D[3], value: 124 }, { date: D[4], value: 116 }] },
  { id: 'transferrin-sat', name: 'Transferrin Saturation', unit: '%', referenceRange: { low: 20, high: 50, label: '20–50' }, category: 'CBC Test', clinicalLabel: 'Anaemia support', severityScore: 58, dataPoints: [{ date: D[0], value: 18 }, { date: D[1], value: 17 }, { date: D[2], value: 20 }, { date: D[3], value: 22 }, { date: D[4], value: 19 }] },
  { id: 'hemoglobin', name: 'Hemoglobin', unit: 'g/dL', referenceRange: { low: 12.0, high: 17.0, label: '12–17' }, category: 'CBC Test', clinicalLabel: 'Blood oxygen carrying', severityScore: 90, dataPoints: [{ date: D[0], value: 9.2 }, { date: D[1], value: 8.8 }, { date: D[2], value: 9.5 }, { date: D[3], value: 10.1 }, { date: D[4], value: 9.8 }] },
  { id: 'fbs', name: 'Fasting Blood Sugar', unit: 'mg/dL', referenceRange: { low: 70, high: 100, label: '70–100' }, category: 'CBC Test', clinicalLabel: 'Diabetes monitoring', severityScore: 68, dataPoints: [{ date: D[0], value: 142 }, { date: D[1], value: 118 }, { date: D[2], value: 96 }, { date: D[3], value: 88 }, { date: D[4], value: 104 }] },
  { id: 'rbs', name: 'Random Blood Sugar', unit: 'mg/dL', referenceRange: { low: 70, high: 140, label: '70–140' }, category: 'CBC Test', clinicalLabel: 'Diabetes monitoring', severityScore: 72, dataPoints: [{ date: D[0], value: 198 }, { date: D[1], value: 186 }, { date: D[2], value: 174 }, { date: D[3], value: 162 }, { date: D[4], value: 171 }] },
]

export function getPathologyParameters(_patientId: string): PathologyParameter[] {
  return pathologyParameters
}

// ── Prescriptions (the Rx flow) ──────────────────────────────────────────────
// Newest first. Prototype: every patient opens the same set (mirrors getConversation).
export const prescriptionRecords: PrescriptionRecord[] = [
  {
    id: 'rx-1', patientId: 'p-1', title: 'Nephrology follow-up Rx', createdAt: '12 May 2026', group: 'This week',
    department: 'Nephrology', doctor: 'Dr. Mehta', status: 'draft',
    summary: 'Dry-weight review, appetite decline, and potassium follow-up after the last dialysis week.',
    complaints: 'Fatigue, reduced appetite, intermittent cramps after dialysis, poor sleep for 3 nights.',
    diagnosis: 'CKD on maintenance hemodialysis with hyperkalemia risk and intradialytic cramps.',
    medications: [
      { name: 'Calcium acetate', strength: '667 mg', frequency: '1-1-1', duration: '14 days' },
      { name: 'Torsemide', strength: '20 mg', frequency: '1-0-0', duration: '14 days' },
    ],
    advice: 'Restrict high-potassium foods, maintain dialysis attendance, bring home BP log to next visit.',
    followUp: 'Review after 7 days or earlier if weakness, palpitations, or breathlessness worsen.',
  },
  {
    id: 'rx-2', patientId: 'p-1', title: 'Anemia management Rx', createdAt: '28 Apr 2026', group: 'This month',
    department: 'Nephrology', doctor: 'Dr. Girish Sharma', status: 'signed',
    summary: 'Iron and erythropoietin adjustment after the latest haemoglobin and ferritin trend.',
    complaints: 'Tiredness on exertion, occasional breathlessness climbing stairs.',
    diagnosis: 'Anaemia of chronic kidney disease, iron-deficient.',
    medications: [
      { name: 'Erythropoietin', strength: '4000 IU', frequency: '3x/week', duration: '4 weeks' },
      { name: 'Ferrous ascorbate', strength: '100 mg', frequency: '1-0-1', duration: '30 days' },
    ],
    advice: 'Take iron on an empty stomach, separate from calcium binders by 2 hours.',
    followUp: 'Repeat CBC and iron profile in 4 weeks.',
  },
  {
    id: 'rx-3', patientId: 'p-1', title: 'Initial CKD regimen', createdAt: '20 Aug 2025', group: 'Earlier',
    department: 'Nephrology', doctor: 'Dr. Mehta', status: 'signed',
    summary: 'Starting renal regimen for volume control and metabolic acidosis management.',
    complaints: 'Pedal oedema, mild nausea, reduced urine output.',
    diagnosis: 'Newly diagnosed CKD stage 5 with fluid overload and metabolic acidosis.',
    medications: [
      { name: 'Torsemide', strength: '20 mg', frequency: '1-0-0', duration: '30 days' },
      { name: 'Sodium bicarbonate', strength: '650 mg', frequency: '1-1-1', duration: '30 days' },
    ],
    advice: 'Daily weight and fluid-intake log; salt restriction.',
    followUp: 'Nephrology review in 2 weeks with repeat electrolytes.',
  },
]

export function getPrescriptions(_patientId: string): PrescriptionRecord[] {
  return prescriptionRecords
}

export function getPrescription(rxId: string): PrescriptionRecord | undefined {
  return prescriptionRecords.find(r => r.id === rxId)
}

// ── Schedule (doctor appointments) ───────────────────────────────────────────
// Stage labels for the appointment progress rail (index = appointment.stage).
export const scheduleStages = [
  'Appointment confirmed',
  'Vitals checked',
  'Waiting in lobby',
  'Consultation started',
  'In progress',
  'Consultation ended',
]

// Bookable slots for the New-appointment sheet.
export const scheduleSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM']

export const appointmentDoctors = ['Dr. Girish', 'Dr. Shri Harsha', 'Dr. Naveen']

// Today is Thu · 4 Jun 2026. Past days are completed; future days hold upcoming bookings.
export const scheduleDays: ScheduleDay[] = [
  {
    key: '2', dow: 'T', dom: '2', label: 'Tue · 2 Jun', isPast: true,
    appointments: [
      { id: 'ap-p21', time: '09:15 AM', patientId: 'p-5', name: 'Vikram Singh', age: 55, gender: 'M', type: 'OPD', reason: 'Routine BP review', doctor: 'Dr. Girish', stage: 5, stageTimes: ['Confirmed 1 Jun', '09:06 AM', '09:12 AM', '09:18 AM', '09:21 AM', '09:40 AM'], lastVisit: { date: '06 May 2026', summary: 'BP at target; refill continued with no new complaints.' } },
      { id: 'ap-p22', time: '11:00 AM', patientId: 'p-7', name: 'Karan Joshi', age: 44, gender: 'M', type: 'Dialysis', reason: 'Monthly dialysis review', doctor: 'Dr. Naveen', stage: 5, stageTimes: ['Confirmed 1 Jun', '10:50 AM', '10:56 AM', '11:02 AM', '11:05 AM', '11:22 AM'], lastVisit: { date: '05 May 2026', summary: 'Adequacy good; access site healthy.' } },
    ],
  },
  {
    key: '3', dow: 'W', dom: '3', label: 'Wed · 3 Jun', isPast: true,
    appointments: [
      { id: 'ap-p31', time: '09:30 AM', patientId: 'p-4', name: 'Sneha Iyer', age: 48, gender: 'F', type: 'OPD', reason: 'Post-HD cramps follow-up', doctor: 'Dr. Girish', stage: 5, stageTimes: ['Confirmed 2 Jun', '09:20 AM', '09:26 AM', '09:32 AM', '09:36 AM', '09:55 AM'], lastVisit: { date: '20 Apr 2026', summary: 'Dry weight revised; magnesium supplement started.' } },
      { id: 'ap-p32', time: '10:15 AM', patientId: 'p-6', name: 'Anjali Desai', age: 50, gender: 'F', type: 'Referral', reason: 'Anaemia review', doctor: 'Dr. Naveen', stage: 5, stageTimes: ['Confirmed 2 Jun', '10:05 AM', '10:11 AM', '10:17 AM', '10:20 AM', '10:38 AM'], lastVisit: { date: '15 Apr 2026', summary: 'Iron studies ordered; EPO dose held pending levels.' } },
    ],
  },
  {
    key: '4', dow: 'T', dom: '4', label: 'Thu · 4 Jun', isToday: true,
    appointments: [
      { id: 'ap-1', time: '09:00 AM', patientId: 'p-1', name: 'Arjun Patel', age: 42, gender: 'M', type: 'OPD', reason: 'BP review · post-viral fatigue', doctor: 'Dr. Girish', stage: 5, stageTimes: ['Confirmed 2 Jun', '08:48 AM', '08:55 AM', '09:01 AM', '09:06 AM', '09:29 AM'], lastVisit: { date: '08 Apr 2026', summary: 'Reviewed dry-weight trend and tightened BP guidance; asked for a 7-day home BP log before restarting amlodipine.' } },
      { id: 'ap-2', time: '09:30 AM', patientId: 'p-2', name: 'Priya Sharma', age: 57, gender: 'F', type: 'Dialysis', reason: 'Pre-HD assessment', doctor: 'Dr. Girish', stage: 4, stageTimes: ['Confirmed 3 Jun', '09:18 AM', '09:25 AM', '09:32 AM'], lastVisit: { date: '28 Apr 2026', summary: 'Pre-HD assessment stable; insulin reduced after recurring morning lows and foot exam was clear.' } },
      { id: 'ap-3', time: '10:00 AM', patientId: 'p-8', name: 'Meera Reddy', age: 31, gender: 'F', type: 'OPD', reason: 'Thyroid refill · sleep issue', doctor: 'Dr. Shri Harsha', stage: 2, stageTimes: ['Confirmed 3 Jun', '09:52 AM'], lastVisit: { date: '03 May 2026', summary: 'Thyroid refill issued; flagged poor sleep and advised sleep hygiene with a follow-up review.' } },
      { id: 'ap-4', time: '10:45 AM', patientId: 'p-6', name: 'Anjali Desai', age: 50, gender: 'F', type: 'Referral', reason: 'Anaemia follow-up', doctor: 'Dr. Naveen', stage: 1, stageTimes: ['Confirmed 2 Jun'], lastVisit: { date: '15 Apr 2026', summary: 'Anaemia follow-up; iron studies ordered and EPO dose held pending levels.' } },
      { id: 'ap-5', time: '11:30 AM', patientId: 'p-3', name: 'Rahul Verma', age: 48, gender: 'M', type: 'OPD', reason: 'Post-HD cramps review', doctor: 'Dr. Girish', stage: 0, stageTimes: [], lastVisit: { date: '20 Apr 2026', summary: 'Post-HD cramps reviewed; dry weight revised and a magnesium supplement was started.' } },
    ],
  },
  {
    key: '5', dow: 'F', dom: '5', label: 'Fri · 5 Jun',
    appointments: [
      { id: 'ap-6', time: '09:15 AM', patientId: 'p-5', name: 'Vikram Singh', age: 55, gender: 'M', type: 'OPD', reason: 'Rx refill review', doctor: 'Dr. Shri Harsha', stage: 0, stageTimes: [], lastVisit: { date: '02 May 2026', summary: 'Routine Rx refill; BP at target with no new complaints.' } },
      { id: 'ap-7', time: '10:30 AM', patientId: 'p-7', name: 'Karan Joshi', age: 61, gender: 'M', type: 'Dialysis', reason: 'Monthly review', doctor: 'Dr. Naveen', stage: 0, stageTimes: [], lastVisit: { date: '05 May 2026', summary: 'Monthly dialysis review; adequacy good and access site healthy.' } },
    ],
  },
  {
    key: '6', dow: 'S', dom: '6', label: 'Sat · 6 Jun',
    appointments: [
      { id: 'ap-8', time: '09:00 AM', patientId: 'p-8', name: 'Meera Reddy', age: 45, gender: 'F', type: 'Referral', reason: 'New referral · endocrinology', doctor: 'Dr. Girish', stage: 0, stageTimes: [], lastVisit: null },
      { id: 'ap-9', time: '11:00 AM', patientId: 'p-2', name: 'Priya Sharma', age: 67, gender: 'F', type: 'OPD', reason: 'Medication review', doctor: 'Dr. Shri Harsha', stage: 0, stageTimes: [], lastVisit: { date: '28 Apr 2026', summary: 'Medication review; doses unchanged with next labs due in 6 weeks.' } },
    ],
  },
  { key: '7', dow: 'S', dom: '7', label: 'Sun · 7 Jun', appointments: [] },
  { key: '8', dow: 'M', dom: '8', label: 'Mon · 8 Jun', appointments: [] },
]

export function getScheduleDays(): ScheduleDay[] {
  return scheduleDays
}

// Sort appointments by clock time (handles AM/PM).
export function sortByTime(appointments: ScheduleAppointment[]): ScheduleAppointment[] {
  const toMinutes = (t: string) => {
    const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!m) return 0
    let h = Number(m[1]) % 12
    if (/pm/i.test(m[3])) h += 12
    return h * 60 + Number(m[2])
  }
  return [...appointments].sort((a, b) => toMinutes(a.time) - toMinutes(b.time))
}

// ── Clinical notes (the Notes flow) ──────────────────────────────────────────
// Newest first. Prototype: every patient opens the same set (mirrors getConversation).
export const notes: Note[] = [
  { id: 'n-1', patientId: 'p-1', type: 'progress',  title: 'Physio Report',        department: 'Physiotherapy', date: '20 Aug 2025', time: '9:55AM', editedToday: true, voice: { duration: '1:24' }, body: 'The patient has shown significant improvement in mobility and a noticeable decrease in pain in the left knee after starting the new physical therapy regimen.' },
  { id: 'n-2', patientId: 'p-1', type: 'discharge', title: 'Discharge Note',        department: 'Physiotherapy', date: '18 Aug 2025', time: '8:15AM', editedToday: true, body: 'Patient reports improved mobility and reduced pain in the left knee following the new physical therapy regimen. Cleared for home exercises and a 2-week review.' },
  { id: 'n-3', patientId: 'p-1', type: 'initial',   title: 'Nephrology Assessment', department: 'Nephrology',    date: '12 Jul 2026', time: '8:45AM', voice: { duration: '2:08' }, body: 'Baseline assessment for CKD stage 5. Reviewed history, current medications, and dialysis tolerance. Family counselled on access planning.' },
  { id: 'n-4', patientId: 'p-1', type: 'progress',  title: 'Dialysis Round Note',   department: 'Nephrology',    date: '04 May 2026', time: '9:55AM', body: 'Intradialytic vitals stable. Mild cramping in the last hour, settled with fluid adjustment. Continue current dry-weight target.' },
  { id: 'n-5', patientId: 'p-1', type: 'discharge', title: 'Step-down Summary',     department: 'Physiotherapy', date: '03 Feb 2026', time: '9:55AM', body: 'Transferred from ward to day-care dialysis. Mobility independent, pain controlled. Outpatient physio to continue weekly.' },
  { id: 'n-6', patientId: 'p-1', type: 'initial',   title: 'Pre-dialysis Workup',   department: 'Nephrology',    date: '03 Jan 2026', time: '8:45AM', voice: { duration: '0:52' }, body: 'Initial workup ahead of dialysis initiation. Iron profile and viral markers ordered. Patient anxious, reassured and given written information.' },
]

export function getNotes(_patientId: string): Note[] {
  return notes
}

export function getNote(noteId: string): Note | undefined {
  return notes.find(n => n.id === noteId)
}

// ── Ask AI ───────────────────────────────────────────────────────────────
// Mocked agent. Suggestion pills + the scripted exchange are keyed by where the
// doctor opened Ask from. One canned conversation per context — enough to sell
// the effect. Replies are anchored to the real mock data (Arjun Patel, K⁺ 5.3).
export const askContexts: Record<AskContextId, AskContext> = {
  home: {
    id: 'home',
    greeting: "Hi Dr. Sharma, what's on your mind?",
    openers: ['How does my day look?', 'Who needs me first?', "What's ahead this week?"],
    script: [
      {
        reply:
          'Today you have **24 patients across 2 hospitals**: 5 new, 14 follow-ups, **3 urgent** and 2 procedures. You open with **Ward A rounds at Sparsh Yelahanka, 9:30 AM**. Three cases are flagged urgent. Want me to line them up?',
        actions: [{ label: "Open today's schedule", to: '/schedule', icon: 'schedule' }],
        followups: ['Yes, who’s urgent?', 'Summarise my procedures'],
      },
      {
        reply: '**Three patients are flagged urgent.** Arjun’s potassium is the most time-sensitive. Tap a patient to open their record.',
        widget: {
          kind: 'patients',
          patients: [
            { id: 'p-1', reason: 'Potassium 5.3 · repeat pending' },
            { id: 'p-2', reason: 'Creatinine climbing · dialysis review' },
            { id: 'p-5', reason: 'BP uncontrolled since Friday' },
          ],
        },
        followups: ['Tell me more about Arjun', 'Draft a note for Arjun'],
      },
      {
        reply:
          '**Arjun Patel, CKD Stage 4.** Potassium **5.3 mEq/L**, up +0.6 since April, ~with creatinine rising alongside it~. His last dialysis round note flagged mild cramping. **Shall I flag the lab for a repeat?**',
        widget: { kind: 'note', noteId: 'n-4' },
        actions: [
          { label: "Open Arjun’s profile", to: '/patients/:id', icon: 'profile' },
          { label: "View Arjun’s reports", to: '/patients/:id/reports', icon: 'report' },
        ],
        followups: [],
      },
    ],
  },
  reports: {
    id: 'reports',
    greeting: 'Ask about these results',
    openers: ['How has potassium trended?', 'Summarise the out-of-range values', 'Suggest a diet plan'],
    script: [
      {
        reply:
          'Potassium is **5.3 mEq/L**, ~above the 3.5 to 5.0 range~ and up **+0.6 since April**. It eased in March (5.1) but the trend since January is upward.',
        widget: { kind: 'lab', parameterId: 'potassium' },
        actions: [{ label: 'Open the full report', to: '/patients/:id/reports', icon: 'report' }],
        followups: ['Why is it rising?', 'Suggest a diet plan'],
      },
      {
        reply:
          'The rise tracks with **declining kidney function**. Reduced renal clearance is the likely driver, ~made worse by the recent missed dialysis session~.',
        actions: [{ label: "Open Arjun’s profile", to: '/patients/:id', icon: 'profile' }],
        followups: ['Suggest a diet plan'],
      },
      {
        reply:
          'For high potassium, a **renal diet** helps: limit bananas, oranges, potatoes, tomatoes and leafy greens; favour apples, berries, rice and pasta. **Want this as a patient handout?**',
        actions: [
          { label: 'Add a note', to: '/patients/:id/notes/new', icon: 'note' },
          { label: 'Review prescriptions', to: '/patients/:id/prescriptions', icon: 'prescription' },
        ],
        followups: [],
      },
    ],
  },
}

export function getAskContext(id: string | null | undefined): AskContext {
  return askContexts[(id as AskContextId)] ?? askContexts.home
}

function mk(id: string, name: string, encounterType: Patient['encounterType']): Patient {
  return {
    id,
    name,
    encounterType,
    age: 54,
    dob: '1971-04-12',
    mrn: 'UGI56212',
    ward: 'Nephrology Ward A',
    bed: 'Bed 12',
    status: 'stable',
    diagnosis: ['Chronic kidney disease'],
    allergies: [],
    assignedDoctor: 'doc-1',
    admittedAt: '2026-06-18T08:30:00Z',
  }
}
