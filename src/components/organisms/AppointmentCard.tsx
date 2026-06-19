import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, type BadgeColour } from '@/components/atoms'
import type { AppointmentType, ScheduleAppointment } from '@/types'

const typeBadge: Record<AppointmentType, { label: string; colour: BadgeColour }> = {
  OPD:      { label: 'OPD', colour: 'blue' },
  Dialysis: { label: 'HD',  colour: 'green' },
  Referral: { label: 'REF', colour: 'yellow' },
}

type StatusTone = 'done' | 'active' | 'wait' | 'todo'

function statusFor(stage: number): { label: string; tone: StatusTone } {
  if (stage >= 5) return { label: 'Completed', tone: 'done' }
  if (stage >= 3) return { label: 'In consult', tone: 'active' }
  if (stage === 2) return { label: 'In lobby', tone: 'wait' }
  if (stage === 1) return { label: 'Confirmed', tone: 'todo' }
  return { label: 'Scheduled', tone: 'todo' }
}

const toneStyle: Record<StatusTone, { bg: string; color: string }> = {
  done:   { bg: 'var(--neutral-sunken)', color: 'var(--color-text-muted)' },
  active: { bg: 'var(--badge-red-bg)', color: 'var(--crimson-deep)' },
  wait:   { bg: 'color-mix(in srgb, var(--status-caution) 14%, transparent)', color: 'var(--status-caution)' },
  todo:   { bg: 'var(--neutral-sunken)', color: 'var(--color-text-secondary)' },
}

const splitTime = (t: string) => {
  const m = t.match(/(\d+:\d+)\s*(AM|PM)/i)
  return m ? { clock: m[1], period: m[2].toUpperCase() } : { clock: t, period: '' }
}

export interface AppointmentCardProps {
  appointment: ScheduleAppointment
  /** Highlight the in-progress patient with a crimson edge (today only). */
  active?: boolean
  onClick?: () => void
  className?: string
}

/**
 * One appointment in the day timeline: time, type badge + status, patient name,
 * and reason · doctor. Tappable — opens the appointment detail.
 */
export function AppointmentCard({ appointment, active, onClick, className }: AppointmentCardProps) {
  const t = typeBadge[appointment.type]
  const status = statusFor(appointment.stage)
  const tone = toneStyle[status.tone]
  const { clock, period } = splitTime(appointment.time)
  const isActive = active ?? (status.tone === 'active')

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex w-full items-stretch text-left', className)}
      style={{
        gap: 'var(--space-12)',
        background: 'var(--neutral-card)',
        border: `1px solid ${isActive ? 'var(--crimson-base)' : 'var(--neutral-stroke)'}`,
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        cursor: 'pointer',
      }}
    >
      {/* Time */}
      <div className="flex shrink-0 flex-col items-center justify-center" style={{ minWidth: 'var(--space-48)' }}>
        <span className="type-title-s" style={{ color: 'var(--color-text-primary)' }}>{clock}</span>
        <span className="type-overline-xs" style={{ color: 'var(--color-text-muted)' }}>{period}</span>
      </div>

      {/* Divider */}
      <span style={{ width: 1, alignSelf: 'stretch', background: 'var(--neutral-stroke)' }} />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-4)' }}>
        <div className="flex items-center" style={{ gap: 'var(--space-6)' }}>
          <Badge label={t.label} colour={t.colour} />
          <span
            className="type-body-xs inline-flex items-center"
            style={{ background: tone.bg, color: tone.color, borderRadius: 'var(--radius-full)', padding: 'var(--space-2) var(--space-8)', whiteSpace: 'nowrap' }}
          >
            {status.label}
          </span>
        </div>
        <p className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>{appointment.name}</p>
        <p className="type-body-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
          {appointment.reason} · {appointment.doctor}
        </p>
      </div>

      {/* Chevron */}
      <ChevronRight size={18} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)', flexShrink: 0, alignSelf: 'center' }} />
    </button>
  )
}
