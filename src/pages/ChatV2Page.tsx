import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import { ScreenHeader, MessageRow } from '@/components/organisms'
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
      {/* Large "Messages" title + compose action — systematic ScreenHeader (title variant) */}
      <ScreenHeader variant="title" title="Messages" actionIcon={SquarePen} actionLabel="New message" />

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
            {visible.map((t, i) => (
              <MessageRow
                key={t.id}
                variant="flat"
                showDivider={i !== 0}
                initials={t.initials}
                avatarColour={t.avatarColour}
                avatarUrl={t.avatarUrl}
                name={t.name}
                time={t.time}
                preview={t.preview}
                unreadCount={t.unreadCount}
                onClick={() => navigate(`/chat/${t.id}/v2`)}
              />
            ))}
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
