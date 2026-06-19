import { MessageSquare, ChevronRight } from 'lucide-react'
import { Avatar, type AvatarColour } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface UnreadChatItem {
  id: string
  initials: string
  avatarColour?: AvatarColour
  avatarUrl?: string
  name: string
  time: string
  preview: string
  unreadCount: number
}

export interface UnreadPatientChatsCardProps {
  items: UnreadChatItem[]
  onViewAll?: () => void
  onSelect?: (id: string) => void
  className?: string
}

/**
 * UnreadPatientChatsCard (Figma 181:6412) — the home-screen "Needs Attention" card.
 * White surface with a crimson eyebrow header + "View All", wrapping a stack of
 * inset (warm-white) message rows. Unlike the chat-list rows, time + preview stay
 * muted even when unread — the crimson count badge alone carries the urgency.
 */
export function UnreadPatientChatsCard({ items, onViewAll, onSelect, className }: UnreadPatientChatsCardProps) {
  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
      }}
    >
      {/* Eyebrow header */}
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center" style={{ gap: 'var(--space-8)' }}>
          <MessageSquare size={14} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
          <span
            className="type-overline-xs"
            style={{ color: 'var(--crimson-base)', textTransform: 'uppercase', letterSpacing: '0.8px' }}
          >
            Unread Patient Chats
          </span>
        </span>

        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center"
          style={{ gap: 'var(--space-4)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <span
            className="type-overline-xs"
            style={{ color: 'var(--crimson-base)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            View All
          </span>
          <ChevronRight size={14} strokeWidth={1.5} style={{ color: 'var(--crimson-base)' }} />
        </button>
      </div>

      {/* Inset message rows */}
      {items.map(t => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect?.(t.id)}
          className="flex w-full items-center text-left transition-colors duration-150"
          style={{
            gap: 'var(--space-12)',
            padding: 'var(--space-12)',
            borderRadius: 'var(--radius-12)',
            background: 'var(--neutral-app-bg)',
            border: '1px solid color-mix(in srgb, var(--neutral-card) 25%, transparent)',
            cursor: 'pointer',
          }}
        >
          <Avatar initials={t.initials} colour={t.avatarColour} imageUrl={t.avatarUrl} size={30} />

          <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-4)' }}>
            <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
              <span className="type-title-m truncate" style={{ color: 'var(--color-text-primary)' }}>
                {t.name}
              </span>
              <span className="type-body-xs shrink-0" style={{ color: 'var(--charcoal-oslo)' }}>
                {t.time}
              </span>
            </div>

            <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
              <span className="type-body-xs min-w-0 flex-1 truncate" style={{ color: 'var(--charcoal-oslo)' }}>
                {t.preview}
              </span>
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
                {t.unreadCount}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
