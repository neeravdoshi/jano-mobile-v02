import { cn } from '@/lib/utils'
import type { ScheduleDay } from '@/types'

export interface DayStripProps {
  days: ScheduleDay[]
  activeKey: string
  onChange?: (key: string) => void
  className?: string
}

/**
 * Horizontal date picker for the Schedule — one tappable tile per day (day-of-week
 * letter + date), an active crimson state, a "today" accent, and a dot when the
 * day has appointments. Scrolls horizontally.
 */
export function DayStrip({ days, activeKey, onChange, className }: DayStripProps) {
  return (
    <div className={cn('flex overflow-x-auto no-scrollbar', className)} role="tablist" aria-label="Pick a day" style={{ gap: 'var(--space-8)' }}>
      {days.map(d => {
        const active = d.key === activeKey
        const today = d.isToday && !active
        const hasItems = d.appointments.length > 0

        const textColor = active ? 'var(--color-text-inverse)' : today ? 'var(--crimson-base)' : 'var(--color-text-primary)'
        return (
          <button
            key={d.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(d.key)}
            className="flex shrink-0 flex-col items-center"
            style={{
              gap: 'var(--space-4)',
              padding: 'var(--space-8) var(--space-12)',
              minWidth: 'var(--space-48)',
              borderRadius: 'var(--radius-12)',
              border: `1px solid ${active ? 'var(--crimson-base)' : today ? 'var(--crimson-30)' : 'var(--neutral-stroke)'}`,
              background: active ? 'var(--crimson-base)' : 'var(--neutral-card)',
              cursor: 'pointer',
            }}
          >
            <span className="type-overline-xs" style={{ color: active ? 'var(--color-text-inverse)' : 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {d.dow}
            </span>
            <span className="type-title-m" style={{ color: textColor }}>{d.dom}</span>
            <span
              style={{
                width: 'var(--space-4)',
                height: 'var(--space-4)',
                borderRadius: 'var(--radius-full)',
                background: hasItems ? (active ? 'var(--color-text-inverse)' : 'var(--crimson-base)') : 'transparent',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
