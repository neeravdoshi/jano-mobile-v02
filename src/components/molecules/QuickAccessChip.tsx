import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface QuickAccessChipProps {
  /** Lucide icon for the shortcut (Figma uses a custom glyph set — map to the closest Lucide). */
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}

/**
 * A white pill shortcut on the patient screen — crimson icon + label.
 * Used in the Quick Access row (Prescription / Medications / Reports / …).
 */
export function QuickAccessChip({ icon: Icon, label, onClick, className }: QuickAccessChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('inline-flex items-center transition-colors duration-150 hover:bg-[var(--neutral-sunken)]', className)}
      style={{
        gap: 'var(--space-4)',
        padding: 'var(--space-8) var(--space-12)',
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-soft-xs)',
        cursor: 'pointer',
      }}
    >
      <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
      <span className="type-body-text-m" style={{ color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </button>
  )
}
