import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FabProps {
  /**
   * Open state — flips the surface to white and rotates the plus 45° into a
   * close (×). Pair with a BottomDrawer / action menu it toggles.
   */
  open?: boolean
  onClick?: () => void
  'aria-label'?: string
  className?: string
}

/**
 * Floating action button (Figma 154-3160). A 64px crimson circle with a white
 * plus that morphs — surface to white, plus rotated into an × — when `open`.
 * Positioning is the caller's job; pass `className` to place it.
 */
export function Fab({ open = false, onClick, 'aria-label': ariaLabel, className }: FabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? (open ? 'Close menu' : 'Open menu')}
      aria-expanded={open}
      className={cn('inline-flex items-center justify-center', className)}
      style={{
        width: 'var(--space-64)',
        height: 'var(--space-64)',
        borderRadius: 'var(--radius-full)',
        background: open ? 'var(--neutral-card)' : 'var(--crimson-base)',
        color: open ? 'var(--crimson-base)' : 'var(--color-text-inverse)',
        border: 'none',
        cursor: 'pointer',
        boxShadow: open ? 'var(--shadow-hard-xl)' : 'var(--shadow-hard-lg)',
        transition: 'background 200ms ease, box-shadow 200ms ease',
      }}
    >
      <Plus
        size={26}
        strokeWidth={2}
        style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}
      />
    </button>
  )
}
