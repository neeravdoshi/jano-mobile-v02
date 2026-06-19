import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BottomDrawerProps {
  open: boolean
  onClose?: () => void
  /** Optional header title; renders the title row with a close button when set. */
  title?: string
  children: React.ReactNode
  className?: string
}

/**
 * BottomDrawer (Figma 145:5409 sheet + 145:5322 scrim).
 * A dimmed scrim + a warm-white sheet that docks to the bottom of its nearest
 * positioned ancestor (e.g. the phone shell / page area). Tapping the scrim or
 * the close button calls onClose. Compose DrawerOption rows (or anything) as children.
 */
export function BottomDrawer({ open, onClose, title, children, className }: BottomDrawerProps) {
  if (!open) return null

  return (
    <div className="absolute inset-0 flex flex-col justify-end" style={{ zIndex: 50 }}>
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'var(--color-scrim)', border: 'none', cursor: 'pointer' }}
      />

      {/* Sheet */}
      <div
        className={cn('relative flex w-full flex-col items-center', className)}
        style={{
          background: 'var(--neutral-app-bg)',
          borderTopLeftRadius: 'var(--radius-12)',
          borderTopRightRadius: 'var(--radius-12)',
          padding: 'var(--space-12)',
          gap: 'var(--space-12)',
          boxShadow: 'var(--shadow-soft-xl)',
        }}
      >
        {/* Drag handle */}
        <span
          style={{
            width: 'var(--space-40)',
            height: 'var(--space-4)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--charcoal-base)',
          }}
        />

        {/* Header */}
        {(title || onClose) && (
          <div className="flex w-full items-center justify-between">
            <span className="type-title-xl" style={{ color: 'var(--color-text-primary)' }}>
              {title}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex items-center justify-center"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--charcoal-base)' }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex w-full flex-col" style={{ gap: 'var(--space-8)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
