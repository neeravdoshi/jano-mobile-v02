import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DrawerOptionProps {
  /** Lucide icon shown in the crimson-tinted tile (Figma uses a custom glyph set — map to the closest Lucide). */
  icon: LucideIcon
  title: string
  subtitle?: string
  onClick?: () => void
  className?: string
}

/**
 * DrawerOption (Figma 145:5415) — the base row inside a BottomDrawer:
 * crimson-tinted icon tile + title over a muted subtitle. Full-width, tappable.
 */
export function DrawerOption({ icon: Icon, title, subtitle, onClick, className }: DrawerOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center text-left transition-colors duration-150 hover:bg-[var(--neutral-sunken)]',
        className,
      )}
      style={{
        gap: 'var(--space-8)',
        padding: 'var(--space-16) var(--space-8)',
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        cursor: 'pointer',
      }}
    >
      <span
        className="flex shrink-0 items-center justify-center"
        style={{
          width: 'var(--space-40)',
          height: 'var(--space-40)',
          background: 'var(--crimson-10)',
          borderRadius: 'var(--radius-8)',
          color: 'var(--crimson-base)',
        }}
      >
        <Icon size={24} strokeWidth={1.5} />
      </span>

      <span className="flex min-w-0 flex-col" style={{ gap: 'var(--space-4)' }}>
        <span className="type-title-m truncate" style={{ color: 'var(--color-text-primary)' }}>
          {title}
        </span>
        {subtitle && (
          <span className="type-body-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
            {subtitle}
          </span>
        )}
      </span>
    </button>
  )
}
