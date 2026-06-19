import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import { Avatar } from '@/components/atoms'
import { SearchBar, FilterTabs, type FilterTabOption } from '@/components/molecules'
import { chatThreads } from '@/lib/mockData'
import type { ChatChannel } from '@/types'

type Filter = 'all' | ChatChannel

/**
 * Chat list — Version 2 (WhatsApp-style).
 * Same threads as ChatPage, but the doctor header is replaced by a large
 * "Messages" title, and the floating per-row cards collapse into one
 * full-bleed white band with indented hairline dividers — denser and flatter,
 * so the eye scans names and unread weight instead of counting cards.
 */
export function ChatV2Page() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const tabs: FilterTabOption<Filter>[] = useMemo(() => {
    const by = (c: ChatChannel) => chatThreads.filter(t => t.channel === c).length
    return [
      { id: 'all',     label: 'All',      count: chatThreads.length },
      { id: 'patient', label: 'Patients', count: by('patient') },
      { id: 'team',    label: 'Team',     count: by('team') },
    ]
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return chatThreads.filter(t => {
      const matchesFilter = filter === 'all' || t.channel === filter
      const matchesQuery = !q || t.name.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      {/* Header zone — big title + compose, search, filters (on the warm surface) */}
      <div className="header-safe-top" />

      <div
        className="flex items-center justify-between"
        style={{ padding: '0 var(--space-16) var(--space-16)' }}
      >
        <h1 className="type-display-m" style={{ color: 'var(--color-text-primary)' }}>
          Messages
        </h1>
        <button
          type="button"
          aria-label="New message"
          className="grid place-items-center transition-colors duration-150"
          style={{
            height: 'var(--space-40)',
            width: 'var(--space-40)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--crimson-5)',
            border: '1px solid var(--crimson-20)',
            color: 'var(--crimson-base)',
            cursor: 'pointer',
          }}
        >
          <SquarePen size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div
        className="flex flex-col"
        style={{ paddingBottom: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        <div style={{ padding: '0 var(--space-16)' }}>
          <SearchBar
            showFilter
            placeholder="Search by name, MRN, or phone"
            value={query}
            onChange={setQuery}
          />
        </div>
        <FilterTabs
          className="px-[var(--space-16)]"
          options={tabs}
          active={filter}
          onChange={setFilter}
        />
      </div>

      {/* List — one full-bleed white band, indented hairline dividers */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {visible.length > 0 ? (
          <div style={{ background: 'var(--neutral-card)' }}>
            {visible.map((t, i) => {
              const hasUnread = t.unreadCount !== undefined && t.unreadCount > 0
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => navigate(`/chat/${t.id}/v2`)}
                  className="flex w-full items-center text-left transition-colors duration-150 hover:bg-[var(--neutral-sunken)]"
                  style={{ gap: 'var(--space-12)', padding: '0 var(--space-16)', cursor: 'pointer' }}
                >
                  <Avatar initials={t.initials} colour={t.avatarColour} imageUrl={t.avatarUrl} size={48} />

                  {/* Divider rides the content column so it indents past the avatar */}
                  <div
                    className="flex min-w-0 flex-1 flex-col"
                    style={{
                      gap: 'var(--space-4)',
                      padding: 'var(--space-12) 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--neutral-stroke)',
                    }}
                  >
                    <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
                      <span className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>
                        {t.name}
                      </span>
                      <span
                        className="type-body-xs shrink-0"
                        style={{ color: hasUnread ? 'var(--crimson-base)' : 'var(--charcoal-oslo)' }}
                      >
                        {t.time}
                      </span>
                    </div>

                    <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
                      <span
                        className={`${hasUnread ? 'type-body-s' : 'type-body-text-m'} min-w-0 flex-1 truncate`}
                        style={{ color: hasUnread ? 'var(--charcoal-50)' : 'var(--charcoal-oslo)' }}
                      >
                        {t.preview}
                      </span>
                      {hasUnread && (
                        <span
                          className="flex shrink-0 items-center justify-center"
                          style={{
                            minWidth: 20,
                            height: 20,
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
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <p
            className="type-body-text-m"
            style={{ color: 'var(--color-text-muted)', padding: 'var(--space-24) var(--space-16)', textAlign: 'center' }}
          >
            No conversations match your search.
          </p>
        )}
      </div>
    </div>
  )
}
