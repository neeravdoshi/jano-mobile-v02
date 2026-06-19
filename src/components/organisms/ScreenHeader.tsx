import { ChevronLeft, Building2, MoreHorizontal, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ScreenHeaderVariant = 'default' | 'no-arrow' | 'doctor' | 'chat' | 'title'

export interface ScreenHeaderProps {
  variant?: ScreenHeaderVariant
  title: string
  subtitle?: string
  onBack?: () => void
  onMore?: () => void
  /** Trailing circular action (e.g. compose) — primarily for the 'title' variant. */
  actionIcon?: LucideIcon
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function ScreenHeader({
  variant = 'default',
  title,
  subtitle,
  onBack,
  onMore,
  actionIcon: ActionIcon,
  actionLabel,
  onAction,
  className,
}: ScreenHeaderProps) {
  const hasBack = variant === 'default' || variant === 'chat'
  const hasMore = variant === 'chat'
  const isDoctor = variant === 'doctor'

  // ── 'title' variant — large display title on the warm surface (no white bar) ──
  if (variant === 'title') {
    return (
      <div className={cn('flex w-full flex-col', className)}>
        <div className="header-safe-top" />
        <div
          className="flex w-full items-center justify-between"
          style={{ padding: '0 var(--space-16) var(--space-16)' }}
        >
          <h1 className="type-display-m" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </h1>
          {ActionIcon && (
            <button
              type="button"
              onClick={onAction}
              aria-label={actionLabel}
              className="grid shrink-0 place-items-center transition-colors duration-150"
              style={{
                height: 'var(--space-40)',
                width: 'var(--space-40)',
                borderRadius: 'var(--radius-full)',
                background: 'var(--crimson-5)',
                border: '1px solid var(--crimson-20)',
                color: 'var(--crimson-base)',
                cursor: 'pointer',
              }}
            >
              <ActionIcon size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('flex flex-col w-full', className)}
      style={{
        background: 'var(--neutral-card)',
        borderBottom: '1px solid var(--neutral-app-bg)',
      }}
    >
      {/* Safe-area spacer — desktop clears the Dynamic Island; mobile uses the OS safe-area inset */}
      <div className="header-safe-top" />

      {/* Header row */}
      <div
        className="flex items-center justify-between w-full"
        style={{ padding: 'var(--space-12) var(--space-20)', paddingTop: 0 }}
      >
        {/* Left — back button or empty spacer */}
        <div className="flex items-center" style={{ gap: 'var(--space-8)', flex: 1 }}>
          {hasBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center"
              style={{
                color: 'var(--charcoal-base)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'var(--space-4)',
                marginLeft: 'calc(var(--space-4) * -1)',
                borderRadius: 'var(--radius-8)',
              }}
              aria-label="Go back"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
          )}

          {/* Title + subtitle */}
          <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
            <p
              className="type-title-l"
              style={{ color: 'var(--color-text-primary)', lineHeight: 1 }}
            >
              {title}
            </p>
            {subtitle && (
              <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
                {isDoctor && (
                  <Building2
                    size={12}
                    strokeWidth={1.5}
                    style={{ color: 'var(--crimson-base)', flexShrink: 0 }}
                  />
                )}
                <p
                  style={{
                    color: 'var(--crimson-base)',
                    fontSize: 12,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right — more button */}
        {hasMore && (
          <button
            onClick={onMore}
            className="flex items-center justify-center"
            style={{
              color: 'var(--charcoal-base)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-8)',
            }}
            aria-label="More options"
          >
            <MoreHorizontal size={20} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  )
}
