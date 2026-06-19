import { Badge, type BadgeColour } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface TimelineEntryHeaderProps {
  /** Date string, e.g. "20 Aug 2025". */
  date: string
  /** Category label shown in the trailing badge, e.g. "Medication". */
  badgeLabel: string
  badgeColour?: BadgeColour
  className?: string
}

/**
 * The date + category-badge row that sits above each timeline event card.
 */
export function TimelineEntryHeader({ date, badgeLabel, badgeColour = 'grey', className }: TimelineEntryHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)} style={{ gap: 'var(--space-8)' }}>
      <span className="type-title-xs" style={{ color: 'var(--color-text-primary)' }}>
        {date}
      </span>
      <Badge label={badgeLabel} colour={badgeColour} className="shrink-0" />
    </div>
  )
}
