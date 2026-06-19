import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ReadStatusToggleProps {
  onKeepUnread?: () => void
  onMarkRead?: () => void
  className?: string
}

/**
 * The pair of white pills under the alert card on the patient screen —
 * "Keep Unread" (leading arrow) and "Mark as Read" (trailing arrow).
 */
export function ReadStatusToggle({ onKeepUnread, onMarkRead, className }: ReadStatusToggleProps) {
  const pill = {
    background: 'var(--neutral-card)',
    borderRadius: 'var(--radius-full)',
    padding: 'var(--space-8) var(--space-12)',
    gap: 'var(--space-4)',
    color: 'var(--charcoal-warm)',
    cursor: 'pointer',
    border: 'none',
  } as const

  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <button type="button" onClick={onKeepUnread} className="inline-flex items-center" style={pill}>
        <ArrowLeft size={16} strokeWidth={1.5} />
        <span className="type-action-s">Keep Unread</span>
      </button>
      <button type="button" onClick={onMarkRead} className="inline-flex items-center" style={pill}>
        <span className="type-action-s">Mark as Read</span>
        <ArrowRight size={16} strokeWidth={1.5} />
      </button>
    </div>
  )
}
