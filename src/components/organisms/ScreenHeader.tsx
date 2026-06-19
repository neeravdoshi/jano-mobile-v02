import { ChevronLeft, Building2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ScreenHeaderVariant = 'default' | 'no-arrow' | 'doctor' | 'chat'

export interface ScreenHeaderProps {
  variant?: ScreenHeaderVariant
  title: string
  subtitle?: string
  onBack?: () => void
  onMore?: () => void
  className?: string
}

export function ScreenHeader({
  variant = 'default',
  title,
  subtitle,
  onBack,
  onMore,
  className,
}: ScreenHeaderProps) {
  const hasBack = variant === 'default' || variant === 'chat'
  const hasMore = variant === 'chat'
  const isDoctor = variant === 'doctor'

  return (
    <div
      className={cn('flex flex-col w-full', className)}
      style={{
        background: 'var(--neutral-card)',
        borderBottom: '1px solid var(--neutral-app-bg)',
      }}
    >
      {/* Safe-area spacer — clears Dynamic Island (pill ends at ~48px) */}
      <div style={{ height: 'var(--space-48)' }} />

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
              className="type-title-xl"
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
