import { Plus, Mic, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MessageComposerProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSend?: () => void
  onAttach?: () => void
  onVoice?: () => void
  className?: string
}

export function MessageComposer({
  placeholder = 'Message',
  value,
  onChange,
  onSend,
  onAttach,
  onVoice,
  className,
}: MessageComposerProps) {
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
