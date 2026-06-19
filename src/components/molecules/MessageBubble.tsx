import { Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatMessageDirection, ChatMessageStatus } from '@/types'

export interface MessageBubbleProps {
  text: string
  time: string
  direction?: ChatMessageDirection
  /** Shown above the text for incoming group messages (omit for 1:1 or grouped runs). */
  senderName?: string
  /** Colour for the sender name — lets a thread colour-code participants. */
  senderColor?: string
  /** Outgoing only — renders WhatsApp-style read ticks. */
  status?: ChatMessageStatus
  className?: string
}

export function MessageBubble({
  text,
  time,
  direction = 'incoming',
  senderName,
  senderColor = 'var(--crimson-deep)',
  status,
  className,
}: MessageBubbleProps) {
  const mine = direction === 'outgoing'

  return (
    <div
      className={cn('flex flex-col', className)}
      style={{
        maxWidth: '82%',
        alignSelf: mine ? 'flex-end' : 'flex-start',
        padding: 'var(--space-8) var(--space-12)',
        background: mine ? 'var(--crimson-5)' : 'var(--neutral-card)',
        border: `1px solid ${mine ? 'var(--crimson-10)' : 'var(--neutral-stroke)'}`,
        // Tail: square the bottom corner on the sender's side.
        borderRadius: mine
          ? 'var(--radius-12) var(--radius-12) var(--radius-2) var(--radius-12)'
          : 'var(--radius-12) var(--radius-12) var(--radius-12) var(--radius-2)',
        boxShadow: 'var(--shadow-soft-xs)',
      }}
    >
      {senderName && !mine && (
        <span className="type-title-s" style={{ color: senderColor, marginBottom: 'var(--space-2)' }}>
          {senderName}
        </span>
      )}

      {/* Text flows, with the meta tucked at the bottom-right like WhatsApp */}
      <p className="type-body-text-m" style={{ color: 'var(--color-text-primary)' }}>
        {text}
        <span style={{ display: 'inline-block', width: mine ? 64 : 44 }} aria-hidden />
      </p>

      <span
        className="flex items-center self-end"
        style={{ gap: 'var(--space-4)', marginTop: 'calc(var(--space-8) * -1)' }}
      >
        <span className="type-body-xs" style={{ color: 'var(--color-text-muted)' }}>
          {time}
        </span>
        {mine && status && (
          status === 'sent' ? (
            <Check size={14} strokeWidth={2} style={{ color: 'var(--charcoal-oslo)' }} />
          ) : (
            <CheckCheck
              size={14}
              strokeWidth={2}
              style={{ color: status === 'read' ? 'var(--crimson-base)' : 'var(--charcoal-oslo)' }}
            />
          )
        )}
      </span>
    </div>
  )
}
