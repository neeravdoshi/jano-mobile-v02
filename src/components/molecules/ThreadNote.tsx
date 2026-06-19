import { cn } from '@/lib/utils'

export interface ThreadNoteProps {
  children: React.ReactNode
  className?: string
}

/** Centered, muted system note inside a conversation (e.g. a merge/info banner). */
export function ThreadNote({ children, className }: ThreadNoteProps) {
  return (
    <div className={cn('flex justify-center', className)}>
      <p
        className="type-body-text-m"
        style={{
          maxWidth: '88%',
          textAlign: 'center',
          color: 'var(--color-text-muted)',
          background: 'var(--neutral-sunken)',
          borderRadius: 'var(--radius-12)',
          padding: 'var(--space-12) var(--space-16)',
        }}
      >
        {children}
      </p>
    </div>
  )
}
