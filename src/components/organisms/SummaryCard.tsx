import { Fragment, useState } from 'react'
import { ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SummaryCardVariant = 'breakdown' | 'agenda'

export interface SummaryItem {
  label: string
  value: number | string
}

/** A slice of the doctor's day (agenda variant). */
export interface DaySegment {
  id: string
  label: string
  value: number | string
  icon: LucideIcon
  /** 'urgent' tints the tile + value crimson to pull the eye. */
  tone?: 'default' | 'urgent'
}

export interface SummaryCardProps {
  variant?: SummaryCardVariant
  /** Headline figure (breakdown: count before title · agenda: hero number). */
  count: number | string
  /** breakdown: the title after the count · agenda: the phrase after the hero number. */
  title: string

  // ── breakdown ──
  /** Breakdown rows revealed when expanded. */
  items?: SummaryItem[]
  defaultExpanded?: boolean

  // ── agenda ──
  /** Small crimson eyebrow, e.g. "Today". */
  eyebrow?: string
  /** Muted top-right meta, e.g. a date. */
  meta?: string
  /** The 2×2 grid of the day's key segments. */
  segments?: DaySegment[]
  /** A single "next up" / context row at the bottom. */
  footnote?: { icon?: LucideIcon; text: string; accent?: boolean }

  className?: string
}

const MUTED = 'var(--warm-grey)'

export function SummaryCard({
  variant = 'breakdown',
  count,
  title,
  items = [],
  defaultExpanded = false,
  eyebrow = 'Today',
  meta,
  segments = [],
  footnote,
  className,
}: SummaryCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const cardStyle = {
    background: 'var(--charcoal-base)',
    borderRadius: 'var(--radius-12)',
    padding: 'var(--space-12)',
  } as const

  // ── Agenda — the doctor's day at a glance ──
  if (variant === 'agenda') {
    return (
      <div className={cn('flex w-full flex-col', className)} style={{ ...cardStyle, gap: 'var(--space-8)' }}>
        {/* Eyebrow + date, then hero — kept as one tight header group */}
        <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
          <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
            <span
              className="type-overline-xs"
              style={{ color: 'var(--crimson-base)', textTransform: 'uppercase', letterSpacing: '0.6px' }}
            >
              {eyebrow}
            </span>
            {meta && (
              <span className="type-body-xs" style={{ color: MUTED }}>
                {meta}
              </span>
            )}
          </div>
          <div className="flex items-baseline" style={{ gap: 'var(--space-8)' }}>
            <span className="type-display-s" style={{ color: 'var(--color-text-inverse)' }}>
              {count}
            </span>
            <span className="type-body-m" style={{ color: 'var(--neutral-app-bg)' }}>
              {title}
            </span>
          </div>
        </div>

        {/* Segment grid */}
        {segments.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
            {segments.map(seg => {
              const urgent = seg.tone === 'urgent'
              const Icon = seg.icon
              return (
                <div
                  key={seg.id}
                  className="flex flex-col"
                  style={{
                    gap: 'var(--space-2)',
                    padding: 'var(--space-8) var(--space-12)',
                    borderRadius: 'var(--radius-10)',
                    background: urgent
                      ? 'color-mix(in srgb, var(--crimson-base) 18%, var(--charcoal-base))'
                      : 'var(--charcoal-warm)',
                  }}
                >
                  {/* value carries the weight; icon sits inline as a quiet top-right accent */}
                  <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
                    <span
                      className="type-title-l"
                      style={{ color: urgent ? 'var(--crimson-base)' : 'var(--color-text-inverse)' }}
                    >
                      {seg.value}
                    </span>
                    <Icon
                      size={16}
                      strokeWidth={1.5}
                      style={{ color: urgent ? 'var(--crimson-base)' : 'var(--warm-grey)', flexShrink: 0 }}
                    />
                  </div>
                  <span className="type-body-xs" style={{ color: MUTED }}>
                    {seg.label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Next-up / context */}
        {footnote && (
          <div
            className="flex items-center"
            style={{
              gap: 'var(--space-8)',
              padding: 'var(--space-8) var(--space-12)',
              borderRadius: 'var(--radius-10)',
              background: 'var(--charcoal-warm)',
            }}
          >
            {footnote.icon && (
              <footnote.icon
                size={16}
                strokeWidth={1.5}
                style={{ color: footnote.accent ? 'var(--crimson-base)' : MUTED, flexShrink: 0 }}
              />
            )}
            <span className="type-body-xs truncate" style={{ color: 'var(--neutral-app-bg)' }}>
              {footnote.text}
            </span>
          </div>
        )}
      </div>
    )
  }

  // ── Breakdown (default) — collapsible count + label/value rows ──
  const Chevron = expanded ? ChevronUp : ChevronDown
  return (
    <div className={cn('flex w-full flex-col', className)} style={{ ...cardStyle, gap: 'var(--space-8)' }}>
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
