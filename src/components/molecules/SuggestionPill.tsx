import type { LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SuggestionPillProps {
  label: string
  onClick?: () => void
  /** Optional leading Lucide icon (crimson). */
  icon?: LucideIcon
  className?: string
}

/**
 * A tappable prompt suggestion on the Ask AI page — a soft white pill with a
 * hairline crimson edge that warms on hover and presses on tap. Sends the prompt.
 */
export function SuggestionPill({ label, onClick, icon: Icon, className }: SuggestionPillProps) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={cn(
        'inline-flex items-center text-left transition-colors duration-150',
        'hover:bg-[var(--color-brand-subtle)] hover:border-[var(--crimson-30)]',
        className,
      )}
      style={{
        gap: 'var(--space-8)',
        padding: 'var(--space-8) var(--space-16)',
        background: 'var(--neutral-card)',
        border: '1px solid var(--crimson-10)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-soft-xs)',
        cursor: 'pointer',
      }}
    >
      {Icon && <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />}
      <span className="type-action-s" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
    </motion.button>
  )
}
