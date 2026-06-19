import { cn } from '@/lib/utils'
import { Avatar, type AvatarColour } from '@/components/atoms/Avatar'

export interface MessageRowProps {
  initials: string
  avatarColour?: AvatarColour
  avatarUrl?: string
  name: string
  time: string
  preview: string
  /** Unread message count — renders the crimson badge. Omit / 0 for the read variant. */
  unreadCount?: number
  onClick?: () => void
  className?: string
}

export function MessageRow({
  initials,
  avatarColour = 'grey',
  avatarUrl,
  name,
  time,
  preview,
  unreadCount,
  onClick,
  className,
}: MessageRowProps) {
  const hasUnread = unreadCount !== undefined && unreadCount > 0

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex w-full items-center text-left transition-colors duration-150', className)}
      style={{
        gap: 'var(--space-12)',
        padding: 'var(--space-12) var(--space-16)',
        borderRadius: 'var(--radius-12)',
        background: 'var(--neutral-card)',
        boxShadow: 'var(--shadow-soft-xs)',
        cursor: 'pointer',
      }}
    >
      <Avatar initials={initials} colour={avatarColour} imageUrl={avatarUrl} size={40} />

      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-4)' }}>
        <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
          <span className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>
            {name}
          </span>
          <span className="type-body-text-m shrink-0" style={{ color: 'var(--charcoal-oslo)' }}>
            {time}
          </span>
        </div>

        <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
          <span
            className={`${hasUnread ? 'type-body-s' : 'type-body-text-m'} min-w-0 flex-1 truncate`}
            style={{ color: hasUnread ? 'var(--charcoal-50)' : 'var(--charcoal-oslo)' }}
          >
            {preview}
          </span>
          {hasUnread && (
            <span
              className="flex shrink-0 items-center justify-center"
              style={{
                minWidth: 17,
                height: 17,
                padding: '0 var(--space-6)',
                borderRadius: 'var(--radius-full)',
                background: 'var(--crimson-base)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-size-xs)',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
