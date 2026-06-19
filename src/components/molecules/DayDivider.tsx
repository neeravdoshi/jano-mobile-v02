import { cn } from '@/lib/utils'

export interface DayDividerProps {
  label: string
  className?: string
}

export function DayDivider({ label, className }: DayDividerProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <span
        className="type-overline-xs"
        style={{
          background: 'var(--neutral-sunken)',
          color: 'var(--color-text-muted)',
          borderRadius: 'var(--radius-full)',
          padding: 'var(--space-6) var(--space-12)',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
        }}
      >
        {label}
      </span>
    </div>
  )
}
