import type { ReactNode } from 'react'
import { TimelineEntryHeader } from '@/components/molecules'
import type { BadgeColour } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface TimelineRenderEntry {
  id: string
  date: string
  badgeLabel: string
  badgeColour?: BadgeColour
  /** The active (most recent) entry gets a crimson dot + crimson rail segment. */
  active?: boolean
  /** Event body — typically an <EventCard />. */
  content: ReactNode
}

export interface TimelineProps {
  entries: TimelineRenderEntry[]
  className?: string
}

/**
 * Vertical clinical timeline. A connected rail of dots runs down the left edge;
 * the active (first) entry is crimson, the rest are grey. Each row pairs a
 * TimelineEntryHeader (date + category badge) with its event content.
 * Generic: pass any node as `content` (the patient screen passes EventCards).
 */
export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1
        const railColor = entry.active ? 'var(--crimson-base)' : 'var(--warm-grey-120)'

        return (
          <div key={entry.id} className="flex w-full" style={{ gap: 'var(--space-12)' }}>
            {/* Rail: dot + connecting line that fills the row down to the next dot */}
            <div className="flex shrink-0 flex-col items-center" style={{ width: 'var(--space-8)' }}>
              <span
                style={{
                  marginTop: 'var(--space-4)',
                  width: 'var(--space-8)',
                  height: 'var(--space-8)',
                  borderRadius: 'var(--radius-full)',
                  background: railColor,
                  flexShrink: 0,
                }}
              />
              {!isLast && (
                <span style={{ flex: '1 0 0', width: 1, marginTop: 'var(--space-4)', background: railColor }} />
              )}
            </div>

            {/* Content column — header + event, with bottom gap the rail spans */}
            <div
              className="flex min-w-0 flex-1 flex-col"
              style={{ gap: 'var(--space-8)', paddingBottom: isLast ? 0 : 'var(--space-24)' }}
            >
              <TimelineEntryHeader date={entry.date} badgeLabel={entry.badgeLabel} badgeColour={entry.badgeColour} />
              {entry.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
