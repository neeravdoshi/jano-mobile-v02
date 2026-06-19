import { Fragment } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AppointmentStep {
  label: string
  time: string
}

export interface AppointmentProgressProps {
  /** Overline above the timeline. */
  label?: string
  steps: AppointmentStep[]
  className?: string
}

/**
 * Vertical appointment timeline shown inside an EventCard — a crimson-tinted panel
 * with a connected rail of completed-step ticks, step labels, and times.
 */
export function AppointmentProgress({ label = 'Appointment Progress', steps, className }: AppointmentProgressProps) {
  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
      }}
    >
      <span
        className="type-overline-xs"
        style={{ color: 'var(--charcoal-50)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
      >
        {label}
      </span>

      <div
        className="flex items-stretch justify-between"
        style={{
          background: 'color-mix(in srgb, var(--crimson-20) 25%, transparent)',
          borderRadius: 'var(--radius-12)',
          padding: 'var(--space-8)',
          gap: 'var(--space-8)',
        }}
      >
        {/* Rail + labels */}
        <div className="flex items-stretch" style={{ gap: 'var(--space-8)' }}>
          {/* Tick rail with connecting segments */}
          <div
            className="flex flex-col items-center"
            style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-4)' }}
          >
            {steps.map((step, i) => (
              <Fragment key={step.label}>
                <span
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: 'var(--space-12)',
                    height: 'var(--space-12)',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--crimson-base)',
                  }}
                >
                  <Check size={8} strokeWidth={3} style={{ color: 'var(--color-text-inverse)' }} />
                </span>
                {i < steps.length - 1 && (
                  <div style={{ flex: '1 0 0', width: 1, minHeight: 'var(--space-16)', background: 'var(--crimson-80)' }} />
                )}
              </Fragment>
            ))}
          </div>
          {/* Labels */}
          <div
            className="flex flex-col justify-between"
            style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-4)' }}
          >
            {steps.map(step => (
              <span key={step.label} className="type-body-xs" style={{ color: 'var(--crimson-80)', whiteSpace: 'nowrap' }}>
                {step.label}
              </span>
            ))}
          </div>
        </div>

        {/* Times */}
        <div
          className="flex flex-col items-end justify-between"
          style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-4)' }}
        >
          {steps.map(step => (
            <span key={step.label} className="type-body-xs" style={{ color: 'var(--crimson-80)', whiteSpace: 'nowrap' }}>
              {step.time}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
