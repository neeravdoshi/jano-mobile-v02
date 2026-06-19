import { Fragment, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SummaryItem {
  label: string
  value: number | string
}

export interface SummaryCardProps {
  /** Headline count shown bold before the title. */
  count: number | string
  title: string
  /** Breakdown rows revealed when expanded. */
  items: SummaryItem[]
  defaultExpanded?: boolean
  className?: string
}

export function SummaryCard({
  count,
  title,
  items,
  defaultExpanded = false,
  className,
}: SummaryCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const Chevron = expanded ? ChevronUp : ChevronDown

  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: 'var(--charcoal-base)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
      }}
    >
      {/* Header — toggles the breakdown */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center justify-between"
        style={{ gap: 'var(--space-8)', background: 'none', border: 'none', padding: 0 }}
      >
        <span className="flex min-w-0 items-center" style={{ gap: 'var(--space-8)' }}>
          <span className="type-title-xl shrink-0" style={{ color: 'var(--color-text-inverse)' }}>
            {count}
          </span>
          <span className="type-body-m truncate" style={{ color: 'var(--neutral-app-bg)' }}>
            {title}
          </span>
        </span>
        <Chevron size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-app-bg)', flexShrink: 0 }} />
      </button>

      {/* Breakdown panel */}
      {expanded && (
        <div
          className="flex w-full flex-col"
          style={{
            background: 'color-mix(in srgb, var(--crimson-20) 10%, transparent)',
            borderRadius: 'var(--radius-12)',
            padding: 'var(--space-8)',
            gap: 'var(--space-8)',
          }}
        >
          {items.map((item, i) => (
            <Fragment key={item.label}>
              {i > 0 && (
                <div
                  style={{
                    height: 1,
                    width: '100%',
                    background: 'color-mix(in srgb, var(--color-text-inverse) 12%, transparent)',
                  }}
                />
              )}
              <div className="flex w-full items-center justify-between" style={{ gap: 'var(--space-8)' }}>
                <span className="type-body-xs" style={{ color: 'var(--color-text-inverse)' }}>
                  {item.label}
                </span>
                <span className="type-body-xs" style={{ color: 'var(--color-text-inverse)' }}>
                  {item.value}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
