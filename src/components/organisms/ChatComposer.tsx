import { Plus, Camera, Mic, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatComposerProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSend?: () => void
  onAttach?: () => void
  onCamera?: () => void
  onVoice?: () => void
  className?: string
}

/**
 * Docked, WhatsApp-style composer. The trailing button is a mic while the field
 * is empty and flips to a crimson send the moment there's text to send.
 */
export function ChatComposer({
  placeholder = 'Message',
  value = '',
  onChange,
  onSend,
  onAttach,
  onCamera,
  onVoice,
  className,
}: ChatComposerProps) {
  const hasText = value.trim().length > 0

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
