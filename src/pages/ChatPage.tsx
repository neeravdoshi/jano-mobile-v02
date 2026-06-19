import { useMemo, useState } from 'react'
import { ScreenHeader, MessageRow } from '@/components/organisms'
import { SearchBar, FilterTabs, type FilterTabOption } from '@/components/molecules'
import { currentDoctor, chatThreads } from '@/lib/mockData'
import type { ChatChannel } from '@/types'

type Filter = 'all' | ChatChannel

export function ChatPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const tabs: FilterTabOption<Filter>[] = useMemo(() => {
    const by = (c: ChatChannel) => chatThreads.filter(t => t.channel === c).length
    return [
      { id: 'all',     label: 'All Chats', count: chatThreads.length },
      { id: 'patient', label: 'Patients',  count: by('patient') },
      { id: 'team',    label: 'Team',      count: by('team') },
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
      <ScreenHeader variant="doctor" title={currentDoctor.name} subtitle={currentDoctor.hospital} />

      <div
        className="flex flex-col"
        style={{ padding: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        <SearchBar
          showFilter
          placeholder="Search by Name, MRN or Phone"
          value={query}
          onChange={setQuery}
        />
        <FilterTabs options={tabs} active={filter} onChange={setFilter} />
      </div>

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ gap: 'var(--space-8)', padding: '0 var(--space-16) var(--space-24)' }}
      >
        {visible.map(t => (
          <MessageRow
            key={t.id}
            initials={t.initials}
            avatarColour={t.avatarColour}
            avatarUrl={t.avatarUrl}
            name={t.name}
            time={t.time}
            preview={t.preview}
            unreadCount={t.unreadCount}
            onClick={() => {}}
          />
        ))}

        {visible.length === 0 && (
          <p
            className="type-body-text-m"
            style={{ color: 'var(--color-text-muted)', padding: 'var(--space-24) 0', textAlign: 'center' }}
          >
            No conversations match your search.
          </p>
        )}
      </div>
    </div>
  )
}
