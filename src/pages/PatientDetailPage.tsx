import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Pill, ClipboardList, FlaskConical, FileText, Stethoscope, Activity,
  Calendar, MessageSquare, NotebookPen, type LucideIcon,
} from 'lucide-react'
import { Fab, type BadgeColour } from '@/components/atoms'
import {
  SearchBar, QuickAccessChip, ReadStatusToggle, MedicationInset, RecordInset, DrawerOption,
} from '@/components/molecules'
import {
  ScreenHeader, AlertCard, EventCard, Timeline, BottomDrawer, type TimelineRenderEntry,
} from '@/components/organisms'
import { getPatient, getPatientTimeline } from '@/lib/mockData'
import type { TimelineCategory } from '@/types'

// Category → leading icon + badge colour for each timeline event.
const categoryStyle: Record<TimelineCategory, { icon: LucideIcon; colour: BadgeColour }> = {
  Medication:   { icon: Pill,          colour: 'yellow' },
  Prescription: { icon: ClipboardList, colour: 'red'    },
  Lab:          { icon: FlaskConical,  colour: 'blue'   },
  Report:       { icon: FileText,      colour: 'green'  },
  Visit:        { icon: Stethoscope,   colour: 'grey'   },
  Dialysis:     { icon: Activity,      colour: 'red'    },
}

const QUICK_ACCESS: { icon: LucideIcon; label: string }[] = [
  { icon: ClipboardList, label: 'Prescription' },
  { icon: Pill,          label: 'Medications' },
  { icon: FileText,      label: 'Reports' },
  { icon: Activity,      label: 'Dialysis' },
  { icon: NotebookPen,   label: 'Notes' },
  { icon: MessageSquare, label: 'Chat' },
]

export function PatientDetailPage() {
  const { id = 'p-1' } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const timeline = getPatientTimeline(id)
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Map the journey data into the generic Timeline render shape.
  const entries: TimelineRenderEntry[] = timeline.map((e, i) => {
    const { icon, colour } = categoryStyle[e.category]
    return {
      id: e.id,
      date: e.date,
      badgeLabel: e.category,
      badgeColour: colour,
      active: i === 0,
      content: (
        <EventCard icon={icon} title={e.title} meta={e.meta} description={e.body}>
          {e.inset?.kind === 'medication' && (
            <MedicationInset name={e.inset.name} detail={e.inset.detail} status={e.inset.status} />
          )}
          {e.inset?.kind === 'record' && (
            <RecordInset title={e.inset.title} meta={e.inset.meta} onAction={() => {}} />
          )}
        </EventCard>
      ),
    }
  })

  return (
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader
        variant="default"
        title={patient.name}
        subtitle={`MRN ${patient.mrn}`}
        onBack={() => navigate(-1)}
      />

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ padding: 'var(--space-12)', gap: 'var(--space-16)' }}
      >
        {/* Urgent alert + read-status toggle */}
        <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
          <AlertCard
            eyebrow="Urgent lab alert"
            title="High potassium: 5.3 mEq/L"
            description="Latest pathology value is elevated and needs confirmation before prescription changes."
            tag="Elevated 1 hr ago"
            actionLabel="View trends"
            index={1}
            total={3}
          />
          <ReadStatusToggle />
        </div>

        {/* Quick Access */}
        <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
          <h2 className="type-title-l" style={{ color: 'var(--color-text-primary)' }}>Quick Access</h2>
          <div className="flex flex-wrap" style={{ gap: 'var(--space-8)' }}>
            {QUICK_ACCESS.map(item => (
              <QuickAccessChip key={item.label} icon={item.icon} label={item.label} />
            ))}
          </div>
        </div>

        {/* Clinical Record — search + timeline */}
        <div
          className="flex flex-col"
          style={{
            background: 'var(--neutral-card)',
            borderRadius: 'var(--radius-12)',
            padding: 'var(--space-20) var(--space-12)',
            gap: 'var(--space-12)',
          }}
        >
          <h2 className="type-title-l" style={{ color: 'var(--color-text-primary)' }}>Clinical Record</h2>
          <SearchBar
            showFilter
            placeholder="Search history"
            value={query}
            onChange={setQuery}
          />
          <Timeline entries={entries} />
        </div>
      </div>

      {/* FAB — floats over the scroll area; opens the add-to-record drawer */}
      <div className="absolute" style={{ right: 'var(--space-16)', bottom: 'var(--space-24)' }}>
        <Fab open={drawerOpen} onClick={() => setDrawerOpen(v => !v)} aria-label="Add to record" />
      </div>

      <BottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Add to record">
        <DrawerOption icon={NotebookPen} title="Add note" subtitle="Progress note or observation" onClick={() => setDrawerOpen(false)} />
        <DrawerOption icon={FlaskConical} title="Order lab" subtitle="Request tests or a panel" onClick={() => setDrawerOpen(false)} />
        <DrawerOption icon={ClipboardList} title="New prescription" subtitle="Start or adjust medication" onClick={() => setDrawerOpen(false)} />
        <DrawerOption icon={Calendar} title="Schedule visit" subtitle="Book a follow-up or procedure" onClick={() => setDrawerOpen(false)} />
      </BottomDrawer>
    </div>
  )
}
