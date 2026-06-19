import { cn } from '@/lib/utils'

export interface MedicationInsetProps {
  /** Medication name, e.g. "Torsemide + sodium bicarbonate". */
  name: string
  /** Dosage / schedule line, e.g. "20 mg / 650 mg · Morning / Twice daily · Oral". */
  detail: string
  /** Optional status pill above the name, e.g. "New start". */
  status?: string
  /** Matches the host card's theme so it sits inside light or dark EventCards. */
  theme?: 'light' | 'dark'
  className?: string
}

/**
 * White (light) / charcoal-warm (dark) detail card nested inside an EventCard —
 * a single medication's name + dosage line, with an optional status pill.
 */
export function MedicationInset({ name, detail, status, theme = 'light', className }: MedicationInsetProps) {
  const dark = theme === 'dark'

  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: dark ? 'var(--charcoal-warm)' : 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-4)',
      }}
    >
      {status && (
        <span
          className="type-body-xs inline-flex w-fit items-center"
          style={{
            background: 'color-mix(in srgb, var(--status-stable) 12%, transparent)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-full)',
            padding: 'var(--space-2) var(--space-8)',
            whiteSpace: 'nowrap',
          }}
        >
          {status}
        </span>
      )}
      <p className="type-title-xs" style={{ color: dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}>
        {name}
      </p>
      <p className="type-body-xs" style={{ color: dark ? 'var(--warm-grey)' : 'var(--color-text-muted)' }}>
        {detail}
      </p>
    </div>
  )
}
