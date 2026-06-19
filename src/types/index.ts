// ── Patient ────────────────────────────────────────────────────────────────
export type PatientStatus = 'critical' | 'warning' | 'stable' | 'pending'

// Encounter / admission type — drives the card badge (IPD / OPD / Referral)
export type EncounterType = 'IPD' | 'OPD' | 'Referral'

export interface Patient {
  id: string
  name: string
  age: number
  dob: string
  mrn: string              // medical record number
  room?: string
  ward?: string
  bed?: string
  encounterType: EncounterType
  status: PatientStatus
  diagnosis: string[]
  allergies: string[]
  assignedDoctor: string
  admittedAt: string
  notes?: string
}

// ── Medication ─────────────────────────────────────────────────────────────
export type MedicationFrequency = 'once' | 'twice-daily' | 'three-daily' | 'four-daily' | 'as-needed' | 'weekly'
export type MedicationRoute = 'oral' | 'iv' | 'im' | 'topical' | 'inhaled' | 'sublingual'

export interface Medication {
  id: string
  name: string
  genericName?: string
  dosage: string
  unit: string
  route: MedicationRoute
  frequency: MedicationFrequency
  startDate: string
  endDate?: string
  prescribedBy: string
  patientId: string
  notes?: string
  active: boolean
}

// ── Prescription ───────────────────────────────────────────────────────────
export interface Prescription {
  id: string
  patientId: string
  doctorId: string
  medications: Medication[]
  issuedAt: string
  expiresAt?: string
  refills: number
  refillsUsed: number
  pharmacy?: string
  status: 'active' | 'expired' | 'cancelled'
}

// ── Task / To-do ───────────────────────────────────────────────────────────
export type TaskPriority = 'urgent' | 'high' | 'normal' | 'low'
export type TaskCategory = 'patient' | 'admin' | 'lab' | 'consult' | 'procedure'

export interface DoctorTask {
  id: string
  title: string
  description?: string
  patientId?: string
  priority: TaskPriority
  category: TaskCategory
  dueAt?: string
  completedAt?: string
  completed: boolean
}

// ── Appointment ────────────────────────────────────────────────────────────
export interface Appointment {
  id: string
  patientId: string
  patientName: string
  type: 'consultation' | 'follow-up' | 'procedure' | 'rounds'
  scheduledAt: string
  durationMinutes: number
  room?: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  notes?: string
}

// ── Doctor / User ──────────────────────────────────────────────────────────
export interface Doctor {
  id: string
  name: string
  title: string           // e.g. "MD", "DO"
  specialty: string
  department: string
  hospital: string
  licenseNumber: string
  avatarUrl?: string
}

// ── Chat ───────────────────────────────────────────────────────────────────
export type ChatChannel = 'patient' | 'team'
export type ChatAvatarColour = 'grey' | 'red' | 'green' | 'blue' | 'yellow'

export interface ChatThread {
  id: string
  name: string
  initials: string
  avatarColour: ChatAvatarColour
  avatarUrl?: string
  preview: string
  time: string
  unreadCount?: number
  channel: ChatChannel
}

// ── Chat conversation (open thread) ──────────────────────────────────────────
export type ChatMessageDirection = 'incoming' | 'outgoing'

export interface ChatMessage {
  id: string
  senderName: string
  direction: ChatMessageDirection
  text: string
  time: string             // display string, e.g. "08:14 AM"
  channel?: string         // delivery note, e.g. "Delivered through SMS"
}

// A conversation renders as an ordered list of these items.
export type ChatThreadItem =
  | { kind: 'day'; label: string }
  | { kind: 'note'; text: string }
  | { kind: 'message'; message: ChatMessage }

export interface ChatConversation {
  id: string
  patientName: string
  mrn: string
  participants: string[]
  items: ChatThreadItem[]
}

// ── Lab Result ─────────────────────────────────────────────────────────────
export type LabResultFlag = 'high' | 'low' | 'critical-high' | 'critical-low' | 'normal'

export interface LabResult {
  id: string
  patientId: string
  testName: string
  value: string | number
  unit: string
  referenceRange: string
  flag: LabResultFlag
  orderedBy: string
  resultAt: string
  orderedAt: string
}
