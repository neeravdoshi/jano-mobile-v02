import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NextCheckupRowProps {
  /** Leading label, e.g. "Next checkup on:". */
  label?: string
  /** Date shown in the crimson-tinted pill, e.g. "12 June 2026". */
  date: string
  onAction?: () => void
  className?: string
}

/**
 * White footer row inside an EventCard — a label paired with a crimson-tinted
 * date pill and a crimson arrow action that jumps to the schedule.
 */
export function NextCheckupRow({ label = 'Next checkup on:', date, onAction, className }: NextCheckupRowProps) {
  return (
    <div
      className={cn('flex w-full items-center justify-between', className)}
      style={{
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
      }}
    >
      <span className="type-body-text-m" style={{ color: 'var(--color-text-primary)' }}>
        {label}
      </span>
      <div
        className="flex items-center"
        style={{
          background: 'color-mix(in srgb, var(--crimson-20) 40%, transparent)',
          borderRadius: 'var(--radius-full)',
          padding: 'var(--space-4) var(--space-12)',
          gap: 'var(--space-8)',
        }}
      >
        <span className="type-body-text-m" style={{ color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
          {date}
        </span>
        <button
          type="button"
          onClick={onAction}
          aria-label="Open schedule"
          className="inline-flex items-center justify-center"
          style={{
            background: 'var(--crimson-base)',
            borderRadius: 'var(--radius-8)',
            padding: 'var(--space-2)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ArrowUpRight size={14} strokeWidth={2} style={{ color: 'var(--color-text-inverse)' }} />
        </button>
      </div>
    </div>
  )
}
