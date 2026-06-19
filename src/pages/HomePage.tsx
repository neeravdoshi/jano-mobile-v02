import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Share2, Stethoscope, BedDouble } from 'lucide-react'
import { ScreenHeader, SummaryCard, UnreadPatientChatsCard } from '@/components/organisms'
import { SearchBar, StatCardGroup, type StatItem } from '@/components/molecules'
import { currentDoctor, chatThreads } from '@/lib/mockData'

/**
 * Doctor home screen (Figma 181:6140) — what loads after sign-in.
 * Doctor header → dialysis summary banner → daily stat tiles → search →
 * "Needs Attention" unread-chats card. Assembled from existing + new components.
 */
export function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  // Lucide stand-ins for the Figma custom glyph set (Referrals / OPD / Inpatient).
  const stats: StatItem[] = [
    { value: 6,  label: 'Referrals', icon: Share2 },
    { value: 23, label: 'OPD',       icon: Stethoscope },
    { value: 9,  label: 'Inpatient', icon: BedDouble },
  ]

  const unread = useMemo(
    () => chatThreads.filter(t => (t.unreadCount ?? 0) > 0).slice(0, 3),
    [],
  )

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="doctor" title={currentDoctor.name} subtitle={currentDoctor.hospital} />

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ padding: 'var(--space-12)', gap: 'var(--space-12)' }}
      >
        <SummaryCard
          count={18}
          title="Dialysis appointments scheduled today"
          items={[
            { label: 'In queue',    value: 5 },
            { label: 'Pre-session', value: 2 },
            { label: 'On dialysis', value: 6 },
            { label: 'Post-session', value: 1 },
            { label: 'Completed',   value: 4 },
          ]}
        />

        <StatCardGroup items={stats} />

        <SearchBar
          showFilter
          placeholder="Search by Name, MRN or Phone"
          value={query}
          onChange={setQuery}
        />

        <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
          <h2 className="type-title-xl" style={{ color: 'var(--color-text-primary)' }}>
            Needs Attention
          </h2>
          <UnreadPatientChatsCard
            items={unread.map(t => ({
              id: t.id,
              initials: t.initials,
              avatarColour: t.avatarColour,
              avatarUrl: t.avatarUrl,
              name: t.name,
              time: t.time,
              preview: t.preview,
              unreadCount: t.unreadCount ?? 0,
            }))}
            onViewAll={() => navigate('/chat')}
            onSelect={id => navigate(`/chat/${id}`)}
          />
        </div>
      </div>
    </div>
  )
}
