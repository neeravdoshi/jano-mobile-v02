import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
 *
 * Motion: AnimatePresence drives both entry and exit — the scrim fades and the
 * sheet slides up from the bottom on open, reversing on close (ease-out, no bounce).
 * `useReducedMotion` collapses this to a plain fade with no translate.
 */
export function BottomDrawer({ open, onClose, title, children, className }: BottomDrawerProps) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="drawer" className="absolute inset-0 flex flex-col justify-end" style={{ zIndex: 50 }}>
          {/* Scrim */}
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: 'var(--color-scrim)', border: 'none', cursor: 'pointer' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />

          {/* Sheet */}
          <motion.div
            className={cn('relative flex w-full flex-col items-center', className)}
            style={{
              background: 'var(--neutral-app-bg)',
              borderTopLeftRadius: 'var(--radius-12)',
              borderTopRightRadius: 'var(--radius-12)',
              padding: 'var(--space-12)',
              gap: 'var(--space-12)',
              boxShadow: 'var(--shadow-soft-xl)',
            }}
            initial={{ opacity: reduce ? 0 : 1, y: reduce ? 0 : '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduce ? 0 : 1, y: reduce ? 0 : '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
