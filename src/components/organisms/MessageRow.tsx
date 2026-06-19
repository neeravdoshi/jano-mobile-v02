import { cn } from '@/lib/utils'
import { Avatar, type AvatarColour } from '@/components/atoms/Avatar'

export type MessageRowVariant = 'card' | 'flat'

export interface MessageRowProps {
  initials: string
  avatarColour?: AvatarColour
  avatarUrl?: string
  name: string
  time: string
  preview: string
  /** Unread message count — renders the crimson badge. Omit / 0 for the read variant. */
  unreadCount?: number
  /**
   * 'card' (default) — floating rounded card with a soft shadow (Chat V1).
   * 'flat' — full-bleed dense row inside one white band; pair with a parent
   * surface and `showDivider` for the indented hairline between rows (Chat V2).
   */
  variant?: MessageRowVariant
  /** Flat variant only — render the top hairline divider (omit it for the first row). */
  showDivider?: boolean
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
  variant = 'card',
  showDivider = false,
  onClick,
  className,
}: MessageRowProps) {
  const hasUnread = unreadCount !== undefined && unreadCount > 0
  const isFlat = variant === 'flat'

  const avatarSize = isFlat ? 48 : 40
  const badgeSize = isFlat ? 20 : 17

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center text-left transition-colors duration-150',
        isFlat && 'hover:bg-[var(--neutral-sunken)]',
        className,
      )}
      style={
        isFlat
          ? { gap: 'var(--space-12)', padding: '0 var(--space-16)', cursor: 'pointer' }
          : {
              gap: 'var(--space-12)',
              padding: 'var(--space-12) var(--space-16)',
              borderRadius: 'var(--radius-12)',
              background: 'var(--neutral-card)',
              boxShadow: 'var(--shadow-soft-xs)',
              cursor: 'pointer',
            }
      }
    >
      <Avatar initials={initials} colour={avatarColour} imageUrl={avatarUrl} size={avatarSize} />

      {/* In the flat variant the divider rides the content column so it indents past the avatar */}
      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{
          gap: 'var(--space-4)',
          ...(isFlat
            ? {
                padding: 'var(--space-12) 0',
                borderTop: showDivider ? '1px solid var(--neutral-stroke)' : 'none',
              }
            : {}),
        }}
      >
        <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
          <span className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>
            {name}
          </span>
          <span
            className={cn('shrink-0', isFlat ? 'type-body-xs' : 'type-body-text-m')}
            style={{
              color: isFlat && hasUnread ? 'var(--crimson-base)' : 'var(--charcoal-oslo)',
            }}
          >
            {time}
          </span>
        </div>

        <div className="flex items-center" style={{ gap: isFlat ? 'var(--space-8)' : 'var(--space-4)' }}>
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
                minWidth: badgeSize,
                height: badgeSize,
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
