import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Share2, Stethoscope, BedDouble, UserPlus, RotateCcw, TriangleAlert, Activity, Clock } from 'lucide-react'
import { ScreenHeader, SummaryCard, UnreadPatientChatsCard, AskDock, type DaySegment } from '@/components/organisms'
import { StatCardGroup, type StatItem } from '@/components/molecules'
import { currentDoctor, chatThreads } from '@/lib/mockData'

/**
 * Home screen — Version 2.
 * Same scaffold as HomePage, but the flat "18 dialysis" banner is replaced by the
 * agenda SummaryCard: the doctor's day broken into who they're seeing (new /
 * follow-up / urgent / procedures) plus what's next — a richer use of the prime slot.
 */
export function HomeV2Page() {
  const navigate = useNavigate()

  // The day's shape: who the doctor is actually seeing.
  const daySegments: DaySegment[] = [
    { id: 'new',       label: 'New patients', value: 5,  icon: UserPlus },
    { id: 'followup',  label: 'Follow-ups',   value: 14, icon: RotateCcw },
    { id: 'urgent',    label: 'Urgent',       value: 3,  icon: TriangleAlert, tone: 'urgent' },
    { id: 'procedure', label: 'Procedures',   value: 2,  icon: Activity },
  ]

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
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="doctor" title={currentDoctor.name} subtitle={currentDoctor.hospital} />

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ padding: 'var(--space-12) var(--space-12) var(--space-80)', gap: 'var(--space-12)' }}
      >
        <SummaryCard
          variant="agenda"
          eyebrow="Today"
          meta="Tue, 19 Jun"
          count={24}
          title="patients across 2 hospitals"
          segments={daySegments}
          footnote={{ icon: Clock, text: 'Next: Ward A rounds at Sparsh Yelahanka · 9:30 AM', accent: true }}
        />

        <StatCardGroup items={stats} />

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

      <AskDock className="absolute inset-x-0 bottom-0" onActivate={() => navigate('/ask?from=home')} />
    </div>
  )
}
