import type { ChatThread, Doctor, Patient } from '@/types'

export const currentDoctor: Doctor = {
  id: 'doc-1',
  name: 'Dr. Girish Sharma',
  title: 'MD',
  specialty: 'Nephrology',
  department: 'Nephrology',
  hospital: 'Sparsh Yelahanka',
  licenseNumber: 'KA-MED-44821',
}

// Patient roster for the list page. Counts → All 8 · IPD 5 · OPD 2 · Referral 1.
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

// Chat threads for the Chat page. Counts → All 8 · Patients 5 · Team 3.
export const chatThreads: ChatThread[] = [
  { id: 'c-1', name: 'Ritika Sharma',    initials: 'RS', avatarColour: 'red',   channel: 'patient', time: '09:10AM',   unreadCount: 2, preview: 'Starting the new physical therapy regimen this week.' },
  { id: 'c-2', name: 'Sneha Iyer',       initials: 'SI', avatarColour: 'green', channel: 'patient', time: '08:20AM',   unreadCount: 1, preview: 'Thank you doctor, the swelling has gone down a lot.' },
  { id: 'c-3', name: 'Dr. Vikram Singh', initials: 'VS', avatarColour: 'blue',  channel: 'team',    time: '06:14AM',   unreadCount: 4, preview: 'Reviewed the MRI — let’s discuss it at morning rounds.' },
  { id: 'c-4', name: 'Arjun Mehta',      initials: 'AM', avatarColour: 'grey',  channel: 'patient', time: 'Yesterday', preview: 'Can we reschedule tomorrow’s follow-up to the afternoon?' },
  { id: 'c-5', name: 'Priya Nair',       initials: 'PN', avatarColour: 'red',   channel: 'patient', time: 'Yesterday', preview: 'Feeling much better after the new dosage.' },
  { id: 'c-6', name: 'Dr. Kavya Rao',    initials: 'KR', avatarColour: 'green', channel: 'team',    time: 'Mon',       preview: 'Discharge summary for bed 12 is ready for sign-off.' },
  { id: 'c-7', name: 'Rohan Gupta',      initials: 'RG', avatarColour: 'yellow',channel: 'patient', time: 'Mon',       preview: 'Is this medication safe to take with my allergy?' },
  { id: 'c-8', name: 'Dr. Aditya Verma', initials: 'AV', avatarColour: 'blue',  channel: 'team',    time: 'Sun',       unreadCount: 3, preview: 'Lab flagged a critical potassium value — please check.' },
]

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
