import { ChevronRight, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AskActionProps {
  label: string
  /** Leading Lucide icon (crimson) — the kind of destination. */
  icon?: LucideIcon
  onClick?: () => void
  className?: string
}

/**
 * A call-to-action under an Ask AI answer — a pathway the doctor can act on
 * (open a profile, a report, a note). White card, hairline crimson edge, a
 * crimson-tinted icon tile + label + trailing chevron; warms + presses on tap.
 */
export function AskAction({ label, icon: Icon, onClick, className }: AskActionProps) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={cn('flex w-full items-center transition-colors duration-150 hover:bg-[var(--color-brand-subtle)] hover:border-[var(--crimson-30)]', className)}
      style={{
        gap: 'var(--space-12)',
        padding: 'var(--space-12) var(--space-14)',
        background: 'var(--neutral-card)',
        border: '1px solid var(--crimson-20)',
        borderRadius: 'var(--radius-12)',
        cursor: 'pointer',
      }}
    >
      {Icon && (
        <span
          className="grid place-items-center"
          style={{
            width: 'var(--space-32)',
            height: 'var(--space-32)',
            flexShrink: 0,
            borderRadius: 'var(--radius-8)',
            background: 'var(--color-brand-subtle)',
          }}
        >
          <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--crimson-base)' }} />
        </span>
      )}
      <span className="type-action-s flex-1 text-left" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
      <ChevronRight size={18} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
    </motion.button>
  )
}
