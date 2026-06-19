import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatCard } from '@/components/atoms/StatCard'

export interface StatItem {
  value: number | string
  label: string
  icon: LucideIcon
}

export interface StatCardGroupProps {
  items: StatItem[]
  className?: string
}

/**
 * StatCardGroup (Figma 181:6796) — an equal-width row of StatCards.
 * Cards stretch to fill so the row divides evenly regardless of count.
 */
export function StatCardGroup({ items, className }: StatCardGroupProps) {
  return (
    <div className={cn('flex items-stretch', className)} style={{ gap: 'var(--space-8)' }}>
      {items.map(s => (
        <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} className="min-w-0 flex-1" />
      ))}
    </div>
  )
}
