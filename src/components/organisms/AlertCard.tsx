import type { LucideIcon } from 'lucide-react'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AlertCardProps {
  /** Crimson uppercase eyebrow, e.g. "Urgent lab alert". */
  eyebrow: string
  title: string
  description: string
  /** Crimson status pill in the footer, e.g. "Elevated 1 hr ago". */
  tag?: string
  /** Secondary ghost action, e.g. "View trends". */
  actionLabel?: string
  onAction?: () => void
  /** Position within a stack of alerts — renders a "1 / 3" counter when both are set. */
  index?: number
  total?: number
  icon?: LucideIcon
  className?: string
}

export function AlertCard({
  eyebrow,
  title,
  description,
  tag,
  actionLabel,
  onAction,
  index,
  total,
  icon: Icon = TriangleAlert,
  className,
}: AlertCardProps) {
  const showCounter = index !== undefined && total !== undefined

  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: 'var(--charcoal-base)',
        border: '1px solid color-mix(in srgb, var(--crimson-30) 25%, transparent)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-16)',
        gap: 'var(--space-8)',
      }}
    >
      {/* Eyebrow + counter */}
      <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
        <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
          <Icon size={14} strokeWidth={1.75} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
          <span
            style={{
              color: 'var(--crimson-base)',
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.83px',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            {eyebrow}
          </span>
        </div>
        {showCounter && (
          <span
            style={{
              color: 'var(--crimson-base)',
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.83px',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {index} / {total}
          </span>
        )}
      </div>

      {/* Title + description */}
      <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
        <p className="type-title-xl" style={{ color: 'var(--color-text-inverse)', lineHeight: 1.2 }}>
          {title}
        </p>
        <p className="type-body-text-m" style={{ color: 'var(--neutral-app-bg)', lineHeight: 1.4 }}>
          {description}
        </p>
      </div>

      {/* Footer — status tag + ghost action */}
      {(tag || actionLabel) && (
        <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)', marginTop: 'var(--space-4)' }}>
          {tag ? (
            <span
              className="type-body-text-m inline-flex items-center"
              style={{
                background: 'var(--crimson-base)',
                color: 'var(--color-text-inverse)',
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-6) var(--space-12)',
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ) : (
            <span />
          )}

          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="type-body-text-m inline-flex items-center transition-colors duration-150"
              style={{
                background: 'transparent',
                color: 'var(--color-text-inverse)',
                border: '1px solid color-mix(in srgb, var(--color-text-inverse) 12%, transparent)',
                borderRadius: 'var(--radius-full)',
                padding: 'var(--space-4) var(--space-12)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
