import type { ChatConversation, ChatThread, Doctor, Patient, TimelineEntry } from '@/types'

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
