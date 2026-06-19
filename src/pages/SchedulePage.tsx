import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarCheck2, ArrowUpRight } from 'lucide-react'
import { Fab, Badge, Input, type BadgeColour } from '@/components/atoms'
import { DayStrip, FilterTabs, AppointmentProgress, type FilterTabOption } from '@/components/molecules'
import { ScreenHeader, AppointmentCard, BottomDrawer } from '@/components/organisms'
import { cn } from '@/lib/utils'
import {
  currentDoctor, getScheduleDays, sortByTime, scheduleStages, scheduleSlots, appointmentDoctors,
} from '@/lib/mockData'
import type { AppointmentType, ScheduleAppointment, ScheduleDay } from '@/types'

const typeBadge: Record<AppointmentType, { label: string; colour: BadgeColour }> = {
  OPD:      { label: 'OPD', colour: 'blue' },
  Dialysis: { label: 'HD',  colour: 'green' },
  Referral: { label: 'REF', colour: 'yellow' },
}

const APPT_TYPES: AppointmentType[] = ['OPD', 'Dialysis', 'Referral']

interface Draft {
  name: string
  type: AppointmentType
  doctor: string
  time: string
}

// Small selectable pill for the New-appointment form.
function ChoiceChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="type-action-s shrink-0"
      style={{
        padding: 'var(--space-6) var(--space-12)',
        borderRadius: 'var(--radius-full)',
        border: selected ? 'none' : '1px solid var(--neutral-stroke)',
        background: selected ? 'var(--crimson-base)' : 'var(--neutral-card)',
        color: selected ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

export function SchedulePage() {
  const navigate = useNavigate()
  const [days, setDays] = useState<ScheduleDay[]>(() => getScheduleDays())
  const [activeKey, setActiveKey] = useState('4')
  const [doctor, setDoctor] = useState('all')
  const [detail, setDetail] = useState<ScheduleAppointment | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)

  const active = useMemo(() => days.find(d => d.key === activeKey) ?? days[0], [days, activeKey])

  const doctorTabs: FilterTabOption[] = useMemo(() => {
    const seen: string[] = []
    for (const d of days) for (const a of d.appointments) if (!seen.includes(a.doctor)) seen.push(a.doctor)
    return [{ id: 'all', label: 'All doctors' }, ...seen.map(name => ({ id: name, label: name }))]
  }, [days])

  const visible = useMemo(
    () => sortByTime(doctor === 'all' ? active.appointments : active.appointments.filter(a => a.doctor === doctor)),
    [active, doctor],
  )

  const openNew = () => {
    setDetail(null)
    setDraft({ name: '', type: 'OPD', doctor: currentDoctor.name, time: '' })
  }

  const submitNew = () => {
    if (!draft || !draft.name.trim() || !draft.time) return
    const appt: ScheduleAppointment = {
      id: `new-${draft.time}-${draft.name}`,
      time: draft.time,
      patientId: 'p-1',
      name: draft.name.trim(),
      age: 0,
      gender: 'M',
      type: draft.type,
      reason: 'Consultation',
      doctor: draft.doctor,
      stage: 0,
      stageTimes: [],
      lastVisit: null,
    }
    setDays(list => list.map(d => (d.key === activeKey ? { ...d, appointments: [...d.appointments, appt] } : d)))
    setDoctor('all')
    setDraft(null)
  }

  // Reached stages → AppointmentProgress steps.
  const detailSteps = detail
    ? detail.stageTimes.map((time, i) => ({ label: scheduleStages[i] ?? `Stage ${i + 1}`, time }))
    : []

  return (
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="title" title="Schedule" />

      <div className="flex shrink-0 flex-col" style={{ gap: 'var(--space-12)', padding: '0 var(--space-16) var(--space-12)' }}>
        <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
          <span className="type-overline-xs" style={{ color: 'var(--crimson-base)', textTransform: 'uppercase' }}>
            {active.isPast ? 'Completed appointments' : 'Doctor appointments'}
          </span>
          <span className="type-title-l" style={{ color: 'var(--color-text-primary)' }}>{active.label}</span>
        </div>
        <DayStrip days={days} activeKey={activeKey} onChange={setActiveKey} />
        <FilterTabs options={doctorTabs} active={doctor} onChange={setDoctor} className="shrink-0" />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar" style={{ gap: 'var(--space-8)', padding: '0 var(--space-16) var(--space-96)' }}>
        {visible.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center" style={{ gap: 'var(--space-8)', padding: 'var(--space-40)' }}>
            <CalendarCheck2 size={26} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)' }} />
            <p className="type-title-s" style={{ color: 'var(--color-text-primary)' }}>No appointments</p>
            <p className="type-body-text-m" style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {active.appointments.length === 0 ? `Nothing scheduled for ${active.label}.` : `No patients for ${doctor} on this day.`}
            </p>
          </div>
        ) : (
          visible.map(a => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              active={active.isToday && a.stage >= 3 && a.stage < 5}
              onClick={() => { setDraft(null); setDetail(a) }}
            />
          ))
        )}
      </div>

      {/* FAB → new appointment */}
      <div className="absolute" style={{ right: 'var(--space-16)', bottom: 'var(--space-24)' }}>
        <Fab open={draft !== null} onClick={() => (draft ? setDraft(null) : openNew())} aria-label="New appointment" />
      </div>

      {/* Appointment detail */}
      <BottomDrawer open={detail !== null} onClose={() => setDetail(null)} title={detail?.name ?? ''}>
        {detail && (
          <div className="flex flex-col" style={{ gap: 'var(--space-16)' }}>
            <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
              <Badge label={typeBadge[detail.type].label} colour={typeBadge[detail.type].colour} />
              <span className="type-body-text-m" style={{ color: 'var(--color-text-secondary)' }}>
                {detail.time} · {detail.age ? `${detail.age} · ${detail.gender} · ` : ''}{detail.doctor}
              </span>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
              <span className="type-overline-xs" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Reason</span>
              <span className="type-body-text-m" style={{ color: 'var(--color-text-primary)' }}>{detail.reason}</span>
            </div>

            {detailSteps.length > 0 ? (
              <AppointmentProgress label="Appointment progress" steps={detailSteps} />
            ) : (
              <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                <span className="type-overline-xs" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</span>
                <span className="type-body-text-m" style={{ color: 'var(--color-text-muted)' }}>Not started yet</span>
              </div>
            )}

            {detail.lastVisit && (
              <div
                className="flex flex-col"
                style={{ gap: 'var(--space-4)', background: 'var(--neutral-sunken)', borderRadius: 'var(--radius-12)', padding: 'var(--space-12)' }}
              >
                <span className="type-overline-xs" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Last visit · {detail.lastVisit.date}
                </span>
                <span className="type-body-text-m" style={{ color: 'var(--color-text-secondary)' }}>{detail.lastVisit.summary}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate(`/patients/${detail.patientId}`)}
              className="type-action-m inline-flex items-center justify-center"
              style={{
                gap: 'var(--space-6)',
                padding: 'var(--space-14) var(--space-16)',
                background: 'var(--crimson-base)',
                color: 'var(--color-text-inverse)',
                borderRadius: 'var(--radius-12)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View patient
              <ArrowUpRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        )}
      </BottomDrawer>

      {/* New appointment */}
      <BottomDrawer open={draft !== null} onClose={() => setDraft(null)} title="New appointment">
        {draft && (
          <div className="flex flex-col" style={{ gap: 'var(--space-16)' }}>
            <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
              <span className="type-body-s" style={{ color: 'var(--color-text-primary)' }}>Patient</span>
              <Input placeholder="Patient name" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
              <span className="type-body-s" style={{ color: 'var(--color-text-primary)' }}>Type</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-6)' }}>
                {APPT_TYPES.map(t => (
                  <ChoiceChip key={t} label={t} selected={draft.type === t} onClick={() => setDraft({ ...draft, type: t })} />
                ))}
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
              <span className="type-body-s" style={{ color: 'var(--color-text-primary)' }}>Doctor</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-6)' }}>
                {appointmentDoctors.map(d => (
                  <ChoiceChip key={d} label={d} selected={draft.doctor === d} onClick={() => setDraft({ ...draft, doctor: d })} />
                ))}
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
              <span className="type-body-s" style={{ color: 'var(--color-text-primary)' }}>Time slot</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--space-6)' }}>
                {scheduleSlots.map(s => (
                  <ChoiceChip key={s} label={s} selected={draft.time === s} onClick={() => setDraft({ ...draft, time: s })} />
                ))}
              </div>
            </div>

            <button
              type="button"
              disabled={!draft.name.trim() || !draft.time}
              onClick={submitNew}
              className={cn('type-action-m inline-flex items-center justify-center')}
              style={{
                padding: 'var(--space-14) var(--space-16)',
                background: !draft.name.trim() || !draft.time ? 'var(--neutral-warm-grey)' : 'var(--crimson-base)',
                color: !draft.name.trim() || !draft.time ? 'var(--color-text-muted)' : 'var(--color-text-inverse)',
                borderRadius: 'var(--radius-12)',
                border: 'none',
                cursor: !draft.name.trim() || !draft.time ? 'not-allowed' : 'pointer',
              }}
            >
              Add to {active.label}
            </button>
          </div>
        )}
      </BottomDrawer>
    </div>
  )
}
