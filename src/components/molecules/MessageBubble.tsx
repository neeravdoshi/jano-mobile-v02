import { Check, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatMessageDirection, ChatMessageStatus } from '@/types'

export type MessageBubbleVariant = 'classic' | 'whatsapp'

export interface MessageBubbleProps {
  text: string
  time: string
  direction?: ChatMessageDirection
  /**
   * `classic` — sender + time sit above a squared-outer-top bubble (care thread V1).
   * `whatsapp` — inline time + read ticks tuck into a tailed bubble (chat V2).
   */
  variant?: MessageBubbleVariant
  /**
   * Sender name. Classic: shown above the bubble. WhatsApp: shown inside for
   * incoming group messages (omit for 1:1 or grouped runs).
   */
  senderName?: string
  /** WhatsApp: colour for the sender name — lets a thread colour-code participants. */
  senderColor?: string
  /** Classic: delivery note shown inside the bubble, e.g. "Delivered through SMS". */
  channel?: string
  /** WhatsApp outgoing only — renders read ticks. */
  status?: ChatMessageStatus
  className?: string
}

/**
 * A single conversation bubble. Two layout variants share one component:
 * `classic` (care thread) and `whatsapp` (chat V2), each with incoming/outgoing direction.
 */
export function MessageBubble({
  text,
  time,
  direction = 'incoming',
  variant = 'whatsapp',
  senderName,
  senderColor = 'var(--crimson-deep)',
  channel,
  status,
  className,
}: MessageBubbleProps) {
  const outgoing = direction === 'outgoing'

  if (variant === 'classic') {
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
          {senderName && (
            <span className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>
              {senderName}
            </span>
          )}
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

  // WhatsApp variant
  return (
    <div
      className={cn('flex flex-col', className)}
      style={{
        maxWidth: '82%',
        alignSelf: outgoing ? 'flex-end' : 'flex-start',
        padding: 'var(--space-8) var(--space-12)',
        background: outgoing ? 'var(--crimson-5)' : 'var(--neutral-card)',
        border: `1px solid ${outgoing ? 'var(--crimson-10)' : 'var(--neutral-stroke)'}`,
        // Tail: square the bottom corner on the sender's side.
        borderRadius: outgoing
          ? 'var(--radius-12) var(--radius-12) var(--radius-2) var(--radius-12)'
          : 'var(--radius-12) var(--radius-12) var(--radius-12) var(--radius-2)',
        boxShadow: 'var(--shadow-soft-xs)',
      }}
    >
      {senderName && !outgoing && (
        <span className="type-title-s" style={{ color: senderColor, marginBottom: 'var(--space-2)' }}>
          {senderName}
        </span>
      )}

      {/* Text flows, with the meta tucked at the bottom-right like WhatsApp */}
      <p className="type-body-text-m" style={{ color: 'var(--color-text-primary)' }}>
        {text}
        <span style={{ display: 'inline-block', width: outgoing ? 64 : 44 }} aria-hidden />
      </p>

      <span
        className="flex items-center self-end"
        style={{ gap: 'var(--space-4)', marginTop: 'calc(var(--space-8) * -1)' }}
      >
        <span className="type-body-xs" style={{ color: 'var(--color-text-muted)' }}>
          {time}
        </span>
        {outgoing && status && (
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
