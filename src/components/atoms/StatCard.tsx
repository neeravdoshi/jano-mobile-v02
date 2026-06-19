import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  /** The metric — e.g. a count of referrals. */
  value: number | string
  /** Short uppercase caption under the value. */
  label: string
  /** Lucide icon shown beside the label (Figma uses a custom glyph set — map to the closest Lucide). */
  icon: LucideIcon
  className?: string
}

/**
 * StatCard (Figma 181:6797) — a small white tile: big value over an icon + caption.
 * Used in a row of three on the home screen (Referrals / OPD / Inpatient).
 */
export function StatCard({ value, label, icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      style={{
        background: 'var(--neutral-card)',
        // crimson-80 @ 10% — the shared Figma field stroke (matches SearchBar)
        border: '1px solid color-mix(in srgb, var(--crimson-80) 10%, transparent)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-8) var(--space-12)',
        gap: 'var(--space-4)',
      }}
    >
      <span className="type-title-xl" style={{ color: 'var(--color-text-primary)', lineHeight: 1 }}>
        {value}
      </span>
      <span className="flex items-center" style={{ gap: 'var(--space-4)' }}>
        <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
        <span
          className="type-overline-xs truncate"
          style={{ color: 'var(--crimson-80)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
        >
          {label}
        </span>
      </span>
    </div>
  )
}
