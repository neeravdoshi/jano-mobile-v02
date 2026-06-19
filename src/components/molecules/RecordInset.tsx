import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RecordInsetProps {
  /** Record title, e.g. "Outside lab bundle". */
  title: string
  /** Supporting line under the title, e.g. "CBC, KFT, urine protein". */
  meta?: string
  /** Trailing action glyph (defaults to ArrowUpRight). Omit `onAction` to hide the button. */
  actionIcon?: LucideIcon
  onAction?: () => void
  /** Matches the host EventCard's theme so it sits inside a light or dark card. */
  theme?: 'light' | 'dark'
  className?: string
}

/**
 * White (light) / charcoal-warm (dark) record card nested inside an EventCard —
 * a lab / report / prescription line (title + meta) with an optional trailing
 * crimson action tile. The action-less sibling of MedicationInset.
 */
export function RecordInset({ title, meta, actionIcon: ActionIcon = ArrowUpRight, onAction, theme = 'light', className }: RecordInsetProps) {
  const dark = theme === 'dark'

  return (
    <div
      className={cn('flex w-full items-center justify-between', className)}
      style={{
        background: dark ? 'var(--charcoal-warm)' : 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
      }}
    >
      <div className="flex min-w-0 flex-col" style={{ gap: 'var(--space-2)' }}>
        <p className="type-title-xs truncate" style={{ color: dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}>
          {title}
        </p>
        {meta && (
          <p className="type-body-xs truncate" style={{ color: dark ? 'var(--warm-grey)' : 'var(--color-text-muted)' }}>
            {meta}
          </p>
        )}
      </div>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          aria-label={`Open ${title}`}
          className="flex shrink-0 items-center justify-center transition-colors duration-150"
          style={{
            background: 'var(--crimson-5)',
            border: '1px solid var(--crimson-20)',
            borderRadius: 'var(--radius-12)',
            padding: 'var(--space-8)',
            color: 'var(--crimson-base)',
            cursor: 'pointer',
          }}
        >
          <ActionIcon size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
