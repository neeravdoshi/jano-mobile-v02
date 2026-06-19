import { Plus, Camera, Mic, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MessageComposerVariant = 'floating' | 'docked'

export interface MessageComposerProps {
  /**
   * `floating` — pill that hovers over the transcript (care thread V1): attach + input + voice + crimson send.
   * `docked` — WhatsApp-style bar pinned to the bottom (chat V2): attach + input + camera inside a sunken
   * field, with a trailing button that is a mic while empty and a crimson send once there's text (Enter sends).
   */
  variant?: MessageComposerVariant
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSend?: () => void
  onAttach?: () => void
  onVoice?: () => void
  /** Docked only — camera action inside the input field. */
  onCamera?: () => void
  className?: string
}

export function MessageComposer({
  variant = 'floating',
  placeholder = 'Message',
  value = '',
  onChange,
  onSend,
  onAttach,
  onVoice,
  onCamera,
  className,
}: MessageComposerProps) {
  const hasText = value.trim().length > 0

  if (variant === 'docked') {
    return (
      <div
        className={cn('flex items-center', className)}
        style={{
          gap: 'var(--space-8)',
          padding: 'var(--space-8) var(--space-12)',
          background: 'var(--neutral-card)',
          borderTop: '1px solid var(--neutral-stroke)',
        }}
      >
        <div
          className="flex flex-1 items-center"
          style={{
            gap: 'var(--space-8)',
            minWidth: 0,
            padding: 'var(--space-8) var(--space-12)',
            background: 'var(--neutral-sunken)',
            borderRadius: 'var(--radius-20)',
          }}
        >
          <button
            type="button"
            onClick={onAttach}
            aria-label="Add attachment"
            className="grid shrink-0 place-items-center"
            style={{ color: 'var(--charcoal-oslo)', background: 'transparent', cursor: 'pointer' }}
          >
            <Plus size={22} strokeWidth={1.5} />
          </button>

          <input
            type="text"
            value={value}
            onChange={e => onChange?.(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && hasText) {
                e.preventDefault()
                onSend?.()
              }
            }}
            placeholder={placeholder}
            className="type-body-m min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
            style={{ color: 'var(--charcoal-base)' }}
          />

          <button
            type="button"
            onClick={onCamera}
            aria-label="Camera"
            className="grid shrink-0 place-items-center"
            style={{ color: 'var(--charcoal-oslo)', background: 'transparent', cursor: 'pointer' }}
          >
            <Camera size={20} strokeWidth={1.5} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => (hasText ? onSend?.() : onVoice?.())}
          aria-label={hasText ? 'Send message' : 'Record voice message'}
          className="grid shrink-0 place-items-center transition-transform duration-150 active:scale-95"
          style={{
            width: 'var(--space-40)',
            height: 'var(--space-40)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--crimson-base)',
            color: 'var(--color-text-inverse)',
            cursor: 'pointer',
          }}
        >
          {hasText ? <Send size={18} strokeWidth={1.5} /> : <Mic size={20} strokeWidth={1.5} />}
        </button>
      </div>
    )
  }

  // Floating variant
  return (
    <div
      className={cn('flex items-center', className)}
      style={{
        gap: 'var(--space-8)',
        padding: 'var(--space-8)',
        background: 'var(--neutral-card)',
        border: '1px solid var(--neutral-stroke)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-soft-lg)',
      }}
    >
      <button
        type="button"
        onClick={onAttach}
        aria-label="Add attachment"
        className="grid shrink-0 place-items-center"
        style={{
          width: 'var(--space-40)',
          height: 'var(--space-40)',
          borderRadius: 'var(--radius-full)',
          background: 'var(--neutral-sunken)',
          color: 'var(--charcoal-base)',
          cursor: 'pointer',
        }}
      >
        <Plus size={20} strokeWidth={1.5} />
      </button>

      <input
        type="text"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="type-body-m min-w-0 flex-1 bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
        style={{ color: 'var(--charcoal-base)' }}
      />

      <button
        type="button"
        onClick={onVoice}
        aria-label="Record voice message"
        className="grid shrink-0 place-items-center"
        style={{
          width: 'var(--space-40)',
          height: 'var(--space-40)',
          borderRadius: 'var(--radius-full)',
          background: 'transparent',
          color: 'var(--charcoal-oslo)',
          cursor: 'pointer',
        }}
      >
        <Mic size={20} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={onSend}
        aria-label="Send message"
        className="grid shrink-0 place-items-center transition-transform duration-150 active:scale-95"
        style={{
          width: 'var(--space-40)',
          height: 'var(--space-40)',
          borderRadius: 'var(--radius-full)',
          background: 'var(--crimson-base)',
          color: 'var(--color-text-inverse)',
          cursor: 'pointer',
        }}
      >
        <Send size={18} strokeWidth={1.5} />
      </button>
    </div>
  )
}
