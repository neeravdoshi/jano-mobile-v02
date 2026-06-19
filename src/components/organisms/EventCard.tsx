import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export type EventCardTheme = 'light' | 'dark'

export interface EventCardProps {
  title: string
  description: string
  /** Light (warm-white) or dark (charcoal) surface. */
  theme?: EventCardTheme
  /**
   * Leading icon — switches the header to the icon layout (icon chip + title + meta).
   * Mutually exclusive with `collapsible` in the Figma set.
   */
  icon?: LucideIcon
  /** Meta line under the title in the icon layout, e.g. "Initial renal regimen · Dr. Mehta". */
  meta?: string
  /** Render a collapse/expand chevron; the inset (`children`) toggles with it. */
  collapsible?: boolean
  defaultExpanded?: boolean
  /**
   * Inset content (MedicationInset, AppointmentProgress, NextCheckupRow, …).
   * Always shown when not collapsible; toggled by the chevron when it is.
   */
  children?: ReactNode
  className?: string
}

/**
 * Clinical timeline event card. Two header modes (leading icon, or a collapsible
 * title + chevron), a light/dark surface, and a slot for inset detail cards.
 * The 8 Figma variants are combinations of `theme`, `icon`, `collapsible`, and children.
 */
export function EventCard({
  title,
  description,
  theme = 'light',
  icon: Icon,
  meta,
  collapsible = false,
  defaultExpanded = false,
  children,
  className,
}: EventCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const dark = theme === 'dark'
  const showInset = children != null && (!collapsible || expanded)
  const Chevron = expanded ? ChevronUp : ChevronDown

  const titleColor = dark ? 'var(--crimson-20)' : 'var(--color-text-primary)'
  const bodyColor = dark ? 'var(--color-text-inverse)' : 'var(--color-text-primary)'
  const metaColor = dark ? 'var(--warm-grey)' : 'var(--color-text-muted)'

  const inset = showInset && <>{children}</>
  const body = (
    <p className="type-body-text-m" style={{ color: bodyColor }}>
      {description}
    </p>
  )

  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: dark ? 'var(--charcoal-base)' : 'var(--neutral-app-bg)',
        border: '1px solid color-mix(in srgb, var(--color-text-inverse) 25%, transparent)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
      }}
    >
      {Icon ? (
        // Icon header: chip + title + meta, then inset, then body.
        <>
          <div className="flex w-full items-start" style={{ gap: 'var(--space-8)' }}>
            <span
              className="flex shrink-0 items-center justify-center"
              style={{
                background: 'var(--crimson-20)',
                borderRadius: 'var(--radius-8)',
                width: 'var(--space-40)',
                height: 'var(--space-40)',
              }}
            >
              <Icon size={24} strokeWidth={1.5} style={{ color: 'var(--crimson-base)' }} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-4)' }}>
              <p className="type-title-m" style={{ color: titleColor }}>
                {title}
              </p>
              {meta && (
                <p className="type-body-xs" style={{ color: metaColor }}>
                  {meta}
                </p>
              )}
            </div>
          </div>
          {inset}
          {body}
        </>
      ) : (
        // Collapsible / plain header: title (+ chevron), then body, then inset.
        <>
          {collapsible ? (
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              aria-expanded={expanded}
              className="flex w-full cursor-pointer items-center justify-between"
              style={{ gap: 'var(--space-8)', background: 'none', border: 'none', padding: 0 }}
            >
              <span className="type-title-m" style={{ color: titleColor }}>
                {title}
              </span>
              <Chevron size={16} strokeWidth={1.5} style={{ color: titleColor, flexShrink: 0 }} />
            </button>
          ) : (
            <p className="type-title-m" style={{ color: titleColor }}>
              {title}
            </p>
          )}
          {body}
          {inset}
        </>
      )}
    </div>
  )
}
