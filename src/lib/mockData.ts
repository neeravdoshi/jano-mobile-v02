import type { ChatConversation, ChatThread, Doctor, Patient } from '@/types'

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
// avatarUrl: randomuser.me portraits (swap IDs to taste -- falls back to initials on error).
export const chatThreads: ChatThread[] = [
  { id: 'c-1', name: 'Ritika Sharma',    initials: 'RS', avatarColour: 'red',    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg', channel: 'patient', time: '09:10AM',   unreadCount: 2, preview: 'Starting the new physical therapy regimen this week.' },
  { id: 'c-2', name: 'Sneha Iyer',       initials: 'SI', avatarColour: 'green',  avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', channel: 'patient', time: '08:20AM',   unreadCount: 1, preview: 'Thank you doctor, the swelling has gone down a lot.' },
  { id: 'c-3', name: 'Dr. Vikram Singh', initials: 'VS', avatarColour: 'blue',   avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',   channel: 'team',    time: '06:14AM',   unreadCount: 4, preview: "Reviewed the MRI -- let's discuss it at morning rounds." },
  { id: 'c-4', name: 'Arjun Mehta',      initials: 'AM', avatarColour: 'grey',   avatarUrl: 'https://randomuser.me/api/portraits/men/75.jpg',   channel: 'patient', time: 'Yesterday',                 preview: "Can we reschedule tomorrow's follow-up to the afternoon?" },
  { id: 'c-5', name: 'Priya Nair',       initials: 'PN', avatarColour: 'red',    avatarUrl: 'https://randomuser.me/api/portraits/women/79.jpg', channel: 'patient', time: 'Yesterday',                 preview: 'Feeling much better after the new dosage.' },
  { id: 'c-6', name: 'Dr. Kavya Rao',    initials: 'KR', avatarColour: 'green',                                                                  channel: 'team',    time: 'Mon',                       preview: 'Discharge summary for bed 12 is ready for sign-off.' },
  { id: 'c-7', name: 'Rohan Gupta',      initials: 'RG', avatarColour: 'yellow',                                                                 channel: 'patient', time: 'Mon',                       preview: 'Is this medication safe to take with my allergy?' },
  { id: 'c-8', name: 'Dr. Aditya Verma', initials: 'AV', avatarColour: 'blue',   avatarUrl: 'https://randomuser.me/api/portraits/men/64.jpg',   channel: 'team',    time: 'Sun',       unreadCount: 3, preview: 'Lab flagged a critical potassium value -- please check.' },
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
        channel: 'Delivered through SMS',
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
        id: 'm-5', senderName: 'Dr. Mehta', direction: 'outgoing', time: '08:32 AM',
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
