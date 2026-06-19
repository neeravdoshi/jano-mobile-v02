import { ChevronLeft, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatThreadHeaderProps {
  title: string
  subtitle?: string
  participants?: string[]
  onBack?: () => void
  onExpand?: () => void
  className?: string
}

export function ChatThreadHeader({
  title,
  subtitle,
  participants,
  onBack,
  onExpand,
  className,
}: ChatThreadHeaderProps) {
  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{ background: 'var(--neutral-card)', borderBottom: '1px solid var(--neutral-stroke)' }}
    >
      {/* Safe-area spacer — desktop clears the Dynamic Island; mobile uses the OS safe-area inset */}
      <div className="header-safe-top" />

      {/* Title row */}
      <div
        className="flex items-center"
        style={{ gap: 'var(--space-8)', padding: '0 var(--space-16)' }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="grid shrink-0 place-items-center"
          style={{
            width: 'var(--space-40)',
            height: 'var(--space-40)',
            marginLeft: 'calc(var(--space-8) * -1)',
            borderRadius: 'var(--radius-8)',
            color: 'var(--charcoal-base)',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>

        <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-2)' }}>
          <span className="type-title-l truncate" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </span>
          {subtitle && (
            <span className="type-body-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              {subtitle}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onExpand}
          aria-label="Open patient record"
          className="grid shrink-0 place-items-center transition-colors duration-150"
          style={{
            width: 'var(--space-40)',
            height: 'var(--space-40)',
            borderRadius: 'var(--radius-12)',
            border: '1px solid var(--neutral-stroke)',
            color: 'var(--charcoal-base)',
            background: 'var(--neutral-card)',
            cursor: 'pointer',
          }}
        >
          <ArrowUpRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Participants row */}
      {participants && participants.length > 0 && (
        <div
          className="flex items-center"
          style={{ gap: 'var(--space-6)', padding: 'var(--space-12) var(--space-16)', paddingBottom: 'var(--space-14)' }}
        >
          <span
            className="type-overline-xs shrink-0"
            style={{ color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}
          >
            Care thread
          </span>
          <span className="type-overline-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
            · {participants.join(' · ')}
          </span>
        </div>
      )}
    </div>
  )
}
