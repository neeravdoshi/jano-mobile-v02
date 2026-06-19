import { cn } from '@/lib/utils'
import type { ChatMessageDirection } from '@/types'

export interface ChatBubbleProps {
  senderName: string
  time: string
  text: string
  direction?: ChatMessageDirection
  /** Delivery note shown inside the bubble, e.g. "Delivered through SMS". */
  channel?: string
  className?: string
}

export function ChatBubble({
  senderName,
  time,
  text,
  direction = 'incoming',
  channel,
  className,
}: ChatBubbleProps) {
  const outgoing = direction === 'outgoing'

  return (
    <div
      className={cn('flex flex-col', className)}
      style={{
        gap: 'var(--space-6)',
        maxWidth: '82%',
        alignSelf: outgoing ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Sender + time */}
      <div className="flex items-baseline" style={{ gap: 'var(--space-8)', paddingInline: 'var(--space-4)' }}>
        <span className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>
          {senderName}
        </span>
        <span className="type-title-xs shrink-0" style={{ color: 'var(--color-text-muted)' }}>
          {time}
        </span>
      </div>

      {/* Bubble — the outer-top corner is squared to anchor the sender side */}
      <div
        className="flex flex-col"
        style={{
          gap: 'var(--space-8)',
          padding: 'var(--space-12) var(--space-16)',
          background: outgoing ? 'var(--crimson-5)' : 'var(--neutral-card)',
          border: `1px solid ${outgoing ? 'var(--crimson-10)' : 'var(--neutral-stroke)'}`,
          borderRadius: outgoing
            ? 'var(--radius-16) var(--radius-4) var(--radius-16) var(--radius-16)'
            : 'var(--radius-4) var(--radius-16) var(--radius-16) var(--radius-16)',
        }}
      >
        <p className="type-body-text-m" style={{ color: 'var(--color-text-primary)' }}>
          {text}
        </p>
        {channel && (
          <p className="type-body-xs" style={{ color: 'var(--color-text-muted)' }}>
            {channel}
          </p>
        )}
      </div>
    </div>
  )
}
