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

// ── Prescription document (the Rx flow off the patient screen) ───────────────
// Distinct from `Prescription` above (a medication-list model) — this is the
// document a doctor writes/uploads: status, structured sections, med rows.
export type PrescriptionStatus = 'draft' | 'signed'

export interface PrescriptionMed {
  name: string
  strength: string         // "667 mg"
  frequency: string        // "1-1-1"
  duration: string         // "14 days"
}

export interface PrescriptionRecord {
  id: string
  patientId: string
  title: string
  createdAt: string        // display, e.g. "12 May 2026"
  group: string            // bucket label: "This week" | "This month" | "Earlier"
  department: string
  doctor: string
  status: PrescriptionStatus
  summary: string
  complaints: string
  diagnosis: string
  medications: PrescriptionMed[]
  advice: string
  followUp: string
}

// ── Clinical notes (the Notes flow) ──────────────────────────────────────────
export type NoteType = 'progress' | 'initial' | 'discharge'

export interface Note {
  id: string
  patientId: string
  type: NoteType
  title: string
  body: string             // transcript (voice) or typed text
  department: string       // "Physiotherapy"
  date: string             // display, e.g. "20 Aug 2025"
  time: string             // display, e.g. "9:55AM"
  editedToday?: boolean
  // Present when the note was captured as a voice note (drives the WaveformPlayer).
  voice?: { duration: string }   // "1:24"
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
export type ChatMessageStatus = 'sent' | 'delivered' | 'read'

export interface ChatMessage {
  id: string
  senderName: string
  direction: ChatMessageDirection
  text: string
  time: string             // display string, e.g. "08:14 AM"
  channel?: string         // delivery note, e.g. "Delivered through SMS"
  status?: ChatMessageStatus  // outgoing only — drives the read ticks (V2)
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

// ── Patient clinical timeline ────────────────────────────────────────────────
// The patient-detail "Clinical Record" — a journey of dated events (medications,
// labs, reports, prescriptions). Each entry renders as an EventCard on a rail.
export type TimelineCategory = 'Medication' | 'Prescription' | 'Lab' | 'Report' | 'Visit' | 'Dialysis'

// A medication detail card nested in the event (→ MedicationInset).
export interface TimelineMedicationInset {
  kind: 'medication'
  name: string
  detail: string
  status?: string
}

// A lab / report / prescription row with a trailing action (→ RecordInset).
export interface TimelineRecordInset {
  kind: 'record'
  title: string
  meta?: string
}

export type TimelineInsetData = TimelineMedicationInset | TimelineRecordInset

export interface TimelineEntry {
  id: string
  date: string             // display string, e.g. "20 Aug 2025"
  category: TimelineCategory
  title: string
  meta?: string            // "Initial renal regimen · Dr. Mehta · Nephrology"
  body: string
  inset?: TimelineInsetData
}

// ── Schedule (doctor appointments) ───────────────────────────────────────────
export type AppointmentType = 'OPD' | 'Dialysis' | 'Referral'

// `stage` indexes SCHED_STAGES: 0 Confirmed · 1 Vitals · 2 In lobby · 3 Started · 4 In progress · 5 Ended.
export interface ScheduleAppointment {
  id: string
  time: string             // "09:00 AM"
  patientId: string
  name: string
  age: number
  gender: 'M' | 'F'
  type: AppointmentType
  reason: string
  doctor: string
  stage: number
  stageTimes: string[]     // timestamp recorded at each reached stage
  lastVisit?: { date: string; summary: string } | null
}

export interface ScheduleDay {
  key: string
  dow: string              // single-letter day-of-week, e.g. "T"
  dom: string              // day-of-month, e.g. "4"
  label: string            // "Thu · 4 Jun"
  isToday?: boolean
  isPast?: boolean
  appointments: ScheduleAppointment[]
}

// ── Pathology trends (Reports) ───────────────────────────────────────────────
// One dated reading of a pathology parameter (drives the trend line chart).
export interface TrendPoint {
  date: string             // ISO, e.g. "2026-05-21"
  value: number
}

export interface ReferenceRange {
  low: number
  high: number
  label: string            // display, e.g. "3.5–5.0"
}

export type PathologyCategory = 'Nephrology' | 'CBC Test' | 'Kidney Function'

// A single tracked pathology parameter with its full reading history.
export interface PathologyParameter {
  id: string
  name: string             // "Serum Creatinine"
  unit: string             // "mg/dL"
  referenceRange: ReferenceRange
  category: PathologyCategory
  clinicalLabel: string    // "Kidney function"
  severityScore: number    // 0–100, ranks cards by clinical priority
  dataPoints: TrendPoint[]
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

// ── Ask AI ─────────────────────────────────────────────────────────────────
// The AI agent entry point. Suggestion pills + the scripted reply are chosen by
// where the user came from (the doctor's home vs. a patient's reports screen).
export type AskContextId = 'home' | 'reports'

export type AskAuthor = 'user' | 'assistant'

// A pathway the assistant offers so the doctor can act, not just read — opens a
// patient profile, a pathology report, a note, etc. `to` may contain `:id`,
// substituted with the active patient on render. `icon` is a semantic key.
export type AskActionIcon = 'profile' | 'report' | 'note' | 'prescription' | 'schedule'
export interface AskAction {
  label: string
  to: string
  icon?: AskActionIcon
}

// A widget embedded in an assistant reply — the answer is multi-modal, not just
// text: a tappable list of patients, or a live pathology parameter (chart +
// range + delta). Each is wired to navigate into the app.
export interface AskWidgetPatient {
  id: string                 // patient id → profile
  reason: string             // clinical one-liner shown as the card's meta
}
export type AskWidget =
  | { kind: 'patients'; patients: AskWidgetPatient[] }
  | { kind: 'lab'; parameterId: string }
  | { kind: 'note'; noteId: string }

// One scripted assistant turn: the reply, an optional embedded widget, optional
// act-on-it CTAs, and the follow-up prompts it offers next.
export interface AskScriptTurn {
  reply: string
  widget?: AskWidget
  actions?: AskAction[]
  followups: string[]
}

export interface AskContext {
  id: AskContextId
  greeting: string         // empty-state hero, e.g. "Hi Dr. Sharma — what's on your mind?"
  openers: string[]        // suggestion pills shown before the first message
  script: AskScriptTurn[]  // assistant replies, played in order as the doctor sends
}

// A rendered turn in the live (mocked) conversation.
export interface AskMessageEntry {
  id: string
  author: AskAuthor
  text: string
  widget?: AskWidget
  actions?: AskAction[]
}
