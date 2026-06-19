import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Textarea } from '@/components/atoms'
import { ScreenHeader } from '@/components/organisms'
import { getPatient, getPrescription } from '@/lib/mockData'
import type { PrescriptionMed } from '@/types'

const medsToText = (meds: PrescriptionMed[]) =>
  meds.map(m => `${m.name} ${m.strength} · ${m.frequency} · ${m.duration}`).join('\n')

interface SectionProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}

function Section({ label, value, onChange, placeholder, rows = 3 }: SectionProps) {
  return (
    <label className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
      <span className="type-title-s" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      <Textarea rows={rows} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </label>
  )
}

export function PrescriptionEditorPage() {
  const { id = 'p-1', rxId } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const existing = rxId ? getPrescription(rxId) : undefined

  const [complaints, setComplaints] = useState(existing?.complaints ?? '')
  const [diagnosis, setDiagnosis] = useState(existing?.diagnosis ?? '')
  const [medications, setMedications] = useState(existing ? medsToText(existing.medications) : '')
  const [advice, setAdvice] = useState(existing?.advice ?? '')
  const [followUp, setFollowUp] = useState(existing?.followUp ?? '')

  // Prototype: no persistence — both actions return to the list.
  const done = () => navigate(`/patients/${id}/prescriptions`)

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader
        variant="default"
        title={existing ? existing.title : 'New prescription'}
        subtitle={`MRN ${patient.mrn}`}
        onBack={() => navigate(-1)}
      />

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ padding: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        {/* Patient context */}
        <div
          className="flex items-center justify-between"
          style={{
            background: 'var(--neutral-card)',
            borderRadius: 'var(--radius-12)',
            padding: 'var(--space-12) var(--space-16)',
            gap: 'var(--space-8)',
          }}
        >
          <span className="type-title-m" style={{ color: 'var(--color-text-primary)' }}>{patient.name}</span>
          <span className="type-body-xs" style={{ color: 'var(--charcoal-oslo)' }}>
            {patient.age} yrs · {patient.encounterType}
          </span>
        </div>

        <Section label="Chief complaints & HPI" value={complaints} onChange={setComplaints} placeholder="Presenting complaints, history…" />
        <Section label="Diagnosis" value={diagnosis} onChange={setDiagnosis} placeholder="Working / confirmed diagnosis…" />
        <Section label="Medications" value={medications} onChange={setMedications} rows={5} placeholder={'One per line, e.g.\nTorsemide 20 mg · 1-0-0 · 14 days'} />
        <Section label="Advice" value={advice} onChange={setAdvice} placeholder="Diet, lifestyle, precautions…" />
        <Section label="Follow up" value={followUp} onChange={setFollowUp} rows={2} placeholder="When to review next…" />

        <div className="flex" style={{ gap: 'var(--space-12)', paddingTop: 'var(--space-4)' }}>
          <Button variant="outline" size="md" fullWidth onClick={done}>Save draft</Button>
          <Button variant="primary" size="md" fullWidth onClick={done}>Finalize</Button>
        </div>
      </div>
    </div>
  )
}
