import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import markSrc from '@/assets/jano-mark.svg'
import { colorGroups, componentRegistry } from '@/lib/componentRegistry'
import type { ComponentDoc } from '@/lib/componentRegistry'
import { House, MessageSquare, SquarePen, Share2, Stethoscope, BedDouble, UserPlus, RotateCcw, TriangleAlert, Activity, Clock, Search, X } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Textarea } from '@/components/atoms/Textarea'
import { Badge } from '@/components/atoms/Badge'
import { Avatar } from '@/components/atoms/Avatar'
import { StatCard } from '@/components/atoms/StatCard'
import { Fab } from '@/components/atoms/Fab'
import { StatCardGroup } from '@/components/molecules/StatCardGroup'
import { UnreadPatientChatsCard } from '@/components/organisms/UnreadPatientChatsCard'
import { FormField } from '@/components/molecules/FormField'
import { DividerWithLabel } from '@/components/molecules/DividerWithLabel'
import { SocialAuthButton } from '@/components/molecules/SocialAuthButton'
import { FilterPill, FilterTabs } from '@/components/molecules/FilterPill'
import { SearchBar } from '@/components/molecules/SearchBar'
import { NavItem } from '@/components/molecules/NavItem'
import { BottomNavigation, type BottomNavTab } from '@/components/organisms/BottomNavigation'
import { ScreenHeader } from '@/components/organisms/ScreenHeader'
import { PatientCard } from '@/components/organisms/PatientCard'
import { MessageRow } from '@/components/organisms/MessageRow'
import { AlertCard } from '@/components/organisms/AlertCard'
import { SummaryCard } from '@/components/organisms/SummaryCard'
import { DayDivider } from '@/components/molecules/DayDivider'
import { ThreadNote } from '@/components/molecules/ThreadNote'
import { MessageBubble } from '@/components/molecules/MessageBubble'
import { MessageComposer } from '@/components/organisms/MessageComposer'
import { ChatThreadHeader } from '@/components/organisms/ChatThreadHeader'
import { EventCard } from '@/components/organisms/EventCard'
import { MedicationInset } from '@/components/molecules/MedicationInset'
import { AppointmentProgress } from '@/components/molecules/AppointmentProgress'
import { NextCheckupRow } from '@/components/molecules/NextCheckupRow'
import { DrawerOption } from '@/components/molecules/DrawerOption'
import { BottomDrawer } from '@/components/organisms/BottomDrawer'
import { RecordInset } from '@/components/molecules/RecordInset'
import { TimelineEntryHeader } from '@/components/molecules/TimelineEntryHeader'
import { QuickAccessChip } from '@/components/molecules/QuickAccessChip'
import { ReadStatusToggle } from '@/components/molecules/ReadStatusToggle'
import { Timeline } from '@/components/organisms/Timeline'
import { TrendChart } from '@/components/molecules/TrendChart'
import { LabParameterCard } from '@/components/organisms/LabParameterCard'
import { LabResultsTable } from '@/components/organisms/LabResultsTable'
import { PrescriptionCard } from '@/components/organisms/PrescriptionCard'
import { WaveformPlayer } from '@/components/molecules/WaveformPlayer'
import { SearchAskSwitch } from '@/components/molecules/SearchAskSwitch'
import { NoteCard } from '@/components/organisms/NoteCard'
import { AskDock } from '@/components/organisms/AskDock'
import { DayStrip } from '@/components/molecules/DayStrip'
import { SuggestionPill } from '@/components/molecules/SuggestionPill'
import { AskMessage } from '@/components/molecules/AskMessage'
import { AskAction } from '@/components/molecules/AskAction'
import { AppointmentCard } from '@/components/organisms/AppointmentCard'
import { pathologyParameters, trendDates, scheduleDays } from '@/lib/mockData'
import { Pill, FileText, LineChart, ClipboardList, FlaskConical, Sparkles, User, NotebookPen, Calendar } from 'lucide-react'

// ── Nav structure ────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',   label: 'Overview',  group: null },
  {
    id: 'colors', label: 'Colors', group: 'Colors',
    children: [
      { id: 'colors-crimson',   label: 'Crimson: brand accent' },
      { id: 'colors-charcoal',  label: 'Charcoal & ink' },
      { id: 'colors-neutrals',  label: 'Neutrals & surfaces' },
      { id: 'colors-status',    label: 'Status' },
    ],
  },
  {
    id: 'type', label: 'Typography', group: 'Typography',
    children: [
      { id: 'type-body',    label: 'Figtree: body & labels' },
      { id: 'type-display', label: 'Figtree: display & titles' },
    ],
  },
  {
    id: 'spacing', label: 'Spacing & Radius', group: 'Spacing & Radius',
    children: [
      { id: 'spacing-scale',  label: 'Spacing scale' },
      { id: 'radius-scale',   label: 'Border radius' },
    ],
  },
  {
    id: 'elevation', label: 'Elevation', group: 'Elevation',
    children: [
      { id: 'elevation-soft', label: 'Soft shadows' },
      { id: 'elevation-hard', label: 'Hard shadows' },
    ],
  },
  {
    id: 'icons', label: 'Iconography', group: 'Iconography',
    children: [
      { id: 'icons-library',   label: 'Lucide: icon library' },
    ],
  },
  {
    id: 'components', label: 'Components', group: 'Components',
    children: [
      { id: 'atoms',     label: 'Atoms' },
      { id: 'molecules', label: 'Molecules' },
      { id: 'organisms', label: 'Organisms' },
    ],
  },
]

const ALL_SECTION_IDS = [
  'overview',
  'colors-crimson', 'colors-charcoal', 'colors-neutrals', 'colors-status',
  'type-body', 'type-display',
  'spacing-scale', 'radius-scale',
  'elevation-soft', 'elevation-hard',
  'icons-library',
  'atoms', 'molecules', 'organisms',
]

// ── Sidebar search index ──────────────────────────────────────────────────
type SearchItem = {
  id: string
  label: string
  sublabel: string
  type: 'nav' | 'component'
}

const SEARCH_INDEX: SearchItem[] = [
  ...NAV.flatMap(item =>
    'children' in item && item.children
      ? item.children.map(child => ({ id: child.id, label: child.label, sublabel: item.label, type: 'nav' as const }))
      : [{ id: item.id, label: item.label, sublabel: '', type: 'nav' as const }]
  ),
  ...componentRegistry.flatMap(section =>
    section.components.map(comp => ({
      id: `comp-${comp.name}`,
      label: comp.name,
      sublabel: section.label.replace(/s$/, ''),
      type: 'component' as const,
    }))
  ),
]

const statusPill: Record<string, { bg: string; color: string; label: string }> = {
  built:         { bg: '#2D9B6F', color: '#fff', label: 'Built' },
  'in-progress': { bg: '#D97706', color: '#fff', label: 'In progress' },
  planned:       { bg: 'var(--neutral-warm-grey)', color: 'var(--charcoal-oslo)', label: 'Planned' },
}

// ── Preview icons (only used in the DS page) ─────────────────────────────
function GooglePreviewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M18.1 10.2c0-.6-.1-1.2-.2-1.8H10v3.4h4.6c-.2 1.1-.8 2-1.7 2.6v2.2h2.8c1.6-1.5 2.4-3.7 2.4-6.4z" fill="#4285F4" />
      <path d="M10 18.4c2.3 0 4.2-.8 5.6-2l-2.8-2.2c-.8.5-1.7.8-2.8.8-2.2 0-4-1.5-4.7-3.5H2.5v2.2C3.9 16.7 6.7 18.4 10 18.4z" fill="#34A853" />
      <path d="M5.3 11.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5V6.3H2.5C1.9 7.5 1.6 8.7 1.6 10s.3 2.5.9 3.7l2.8-2.2z" fill="#FBBC05" />
      <path d="M10 4.6c1.2 0 2.3.4 3.2 1.2l2.4-2.4C14.2 2.1 12.3 1.2 10 1.2 6.7 1.2 3.9 3 2.5 5.7l2.8 2.2C6 6.1 7.8 4.6 10 4.6z" fill="#EA4335" />
    </svg>
  )
}

// Stateful previews: components that need their own interactive state.
function FilterTabsPreview() {
  const [active, setActive] = useState('all')
  return (
    <FilterTabs
      active={active}
      onChange={setActive}
      options={[
        { id: 'all',     label: 'All Chats', count: 8 },
        { id: 'patient', label: 'Patients',  count: 5 },
        { id: 'team',    label: 'Team',      count: 3 },
      ]}
    />
  )
}

function BottomNavPreview() {
  const [active, setActive] = useState<BottomNavTab>('chat')
  return (
    <div style={{ maxWidth: 390, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--neutral-stroke)', background: 'var(--neutral-card)' }}>
      <BottomNavigation active={active} onTabChange={setActive} />
    </div>
  )
}

function BottomDrawerPreview() {
  const [open, setOpen] = useState(false)
  return (
    // Bounded relative frame — the scrim + sheet are positioned within it
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 420,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--neutral-stroke)',
        background: 'var(--neutral-app-bg)',
      }}
    >
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="primary" size="md" onClick={() => setOpen(true)}>Open drawer</Button>
      </div>
      <BottomDrawer open={open} onClose={() => setOpen(false)} title="Add New">
        <DrawerOption icon={FileText} title="Add Notes" subtitle="Capture a progress note" onClick={() => setOpen(false)} />
        <DrawerOption icon={LineChart} title="Add Reports" subtitle="Capture a new report" onClick={() => setOpen(false)} />
        <DrawerOption icon={ClipboardList} title="Add Prescription" subtitle="Capture a prescription" onClick={() => setOpen(false)} />
      </BottomDrawer>
    </div>
  )
}

function FabPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Fab open={false} />
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)' }}>closed</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Fab open />
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)' }}>open</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Fab open={open} onClick={() => setOpen(v => !v)} />
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)' }}>tap to toggle</span>
      </div>
    </div>
  )
}

function DayStripPreview() {
  const [key, setKey] = useState('4')
  return (
    <div style={{ maxWidth: 360 }}>
      <DayStrip days={scheduleDays} activeKey={key} onChange={setKey} />
    </div>
  )
}

// ── Live preview nodes per built component ───────────────────────────────
const componentPreviews: Record<string, React.ReactNode> = {
  Button: (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <Button variant="primary"     size="md">Sign in</Button>
      <Button variant="outline"     size="md">Cancel</Button>
      <Button variant="ghost"       size="md">Forgot password?</Button>
      <Button variant="destructive" size="md">Remove</Button>
      <div style={{ width: '100%', height: 1, background: 'var(--neutral-stroke)', margin: '4px 0' }} />
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),

  Input: (
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 6 }}>Default</p>
        <Input placeholder="dr.name@hospital.com" />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 6 }}>Error state</p>
        <Input placeholder="invalid-email" hasError defaultValue="not-an-email" />
      </div>
    </div>
  ),

  Textarea: (
    <div style={{ maxWidth: 360 }}>
      <Textarea rows={3} placeholder="Chief complaints & HPI…" />
    </div>
  ),

  FormField: (
    <div style={{ maxWidth: 320 }}>
      <FormField
        label="Email address"
        type="email"
        placeholder="dr.name@hospital.com"
        hint="Enter the email associated with your Jano account"
      />
    </div>
  ),

  DividerWithLabel: (
    <div style={{ maxWidth: 360 }}>
      <DividerWithLabel />
    </div>
  ),

  SocialAuthButton: (
    <div style={{ display: 'flex', gap: 12, maxWidth: 480 }}>
      <div style={{ flex: 1 }}>
        <SocialAuthButton icon={<GooglePreviewIcon />} label="Continue with Google" />
      </div>
    </div>
  ),

  Badge: (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Badge label="Stable" colour="green" />
      <Badge label="Caution" colour="yellow" />
      <Badge label="OPD" colour="blue" />
      <Badge label="Prescription" colour="red" />
      <Badge label="High" colour="crimson" />
      <Badge label="Pending" colour="grey" />
      <Badge label="IPD" colour="black" />
    </div>
  ),

  Avatar: (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {/* Initials — one uniform brand tint */}
      <Avatar initials="GS" size={30} />
      <Avatar initials="RS" size={30} />
      <Avatar initials="VS" size={30} />
      <Avatar initials="DR" size={56} />
      {/* Photo, with initials fallback on error */}
      <Avatar initials="AM" imageUrl="https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=160&h=160&fit=crop&crop=faces&q=80" size={56} />
    </div>
  ),

  StatCard: (
    <div style={{ display: 'flex', gap: 8, maxWidth: 360 }}>
      <StatCard value={6} label="Referrals" icon={Share2} className="flex-1" />
      <StatCard value={23} label="OPD" icon={Stethoscope} className="flex-1" />
      <StatCard value={9} label="Inpatient" icon={BedDouble} className="flex-1" />
    </div>
  ),

  Fab: <FabPreview />,

  StatCardGroup: (
    <div style={{ maxWidth: 360 }}>
      <StatCardGroup
        items={[
          { value: 6, label: 'Referrals', icon: Share2 },
          { value: 23, label: 'OPD', icon: Stethoscope },
          { value: 9, label: 'Inpatient', icon: BedDouble },
        ]}
      />
    </div>
  ),

  FilterPill: (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <FilterPill label="All" selected />
      <FilterPill label="IPD" />
      <FilterPill label="All Chats" count={8} selected />
      <FilterPill label="Team" count={3} />
    </div>
  ),

  FilterTabs: <FilterTabsPreview />,

  SearchBar: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <SearchBar placeholder="Search" />
      <SearchBar showFilter placeholder="Search by Name, MRN or Phone" />
      <SearchBar variant="ask" placeholder="Ask me anything" />
      <SearchBar variant="ask" showFilter placeholder="Ask me anything" />
    </div>
  ),

  SearchAskSwitch: (
    <div style={{ maxWidth: 420 }}>
      <SearchAskSwitch />
    </div>
  ),

  NavItem: (
    <div style={{ display: 'flex', gap: 24, background: 'var(--neutral-card)', padding: '8px 24px', borderRadius: 12, border: '1px solid var(--neutral-stroke)' }}>
      <NavItem icon={House} label="Home" active />
      <NavItem icon={MessageSquare} label="Chat" />
    </div>
  ),

  BottomNavigation: <BottomNavPreview />,

  ScreenHeader: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 390 }}>
      <div style={{ border: '1px solid var(--neutral-stroke)', borderRadius: 12, overflow: 'hidden' }}>
        <ScreenHeader variant="doctor" title="Dr. Girish Sharma" subtitle="Sparsh Yelahanka" />
      </div>
      <div style={{ border: '1px solid var(--neutral-stroke)', borderRadius: 12, overflow: 'hidden' }}>
        <ScreenHeader variant="chat" title="Ritika Sharma" subtitle="Online now" />
      </div>
      <div style={{ border: '1px solid var(--neutral-stroke)', borderRadius: 12, overflow: 'hidden', background: 'var(--neutral-app-bg)', paddingTop: 8 }}>
        <ScreenHeader variant="title" title="Messages" actionIcon={SquarePen} actionLabel="New message" />
      </div>
    </div>
  ),

  PatientCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <PatientCard name="Arjun Patel" encounterType="IPD" ward="Nephrology Ward A" bed="Bed 12" mrn="UGI56212" />
      <PatientCard name="Meera Reddy" encounterType="OPD" ward="Nephrology Ward A" bed="Bed 4" mrn="UGI56240" variant="highlighted" />
    </div>
  ),

  PrescriptionCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420, background: 'var(--neutral-app-bg)', padding: 12, borderRadius: 12 }}>
      <PrescriptionCard title="Nephrology follow-up Rx" createdAt="12 May 2026" status="draft" summary="Dry-weight review, appetite decline, and potassium follow-up after the last dialysis week." department="Nephrology" doctor="Dr. Mehta" />
      <PrescriptionCard title="Anemia management Rx" createdAt="28 Apr 2026" status="signed" summary="Iron and erythropoietin adjustment after the latest haemoglobin and ferritin trend." department="Nephrology" doctor="Dr. Girish Sharma" />
    </div>
  ),

  NoteCard: (
    <div style={{ display: 'flex', gap: 8, maxWidth: 380, background: 'var(--neutral-app-bg)', padding: 12, borderRadius: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <NoteCard type="progress" title="Physio Report" body="Patient reports improved mobility and reduced pain in the left knee after starting the new physical therapy regimen." department="Physiotherapy" />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <NoteCard type="initial" title="Nephrology Assessment" body="Baseline assessment for CKD stage 5 with dialysis tolerance review." department="Nephrology" />
        <NoteCard type="discharge" title="Discharge Note" body="Cleared for home exercises and a 2-week review." department="Physiotherapy" />
      </div>
    </div>
  ),

  WaveformPlayer: (
    <div style={{ maxWidth: 360 }}>
      <WaveformPlayer duration="1:24" />
    </div>
  ),

  AskDock: (
    <div style={{ maxWidth: 390, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--neutral-stroke)', background: 'var(--neutral-app-bg)' }}>
      <AskDock placeholder="Ask me anything" onActivate={() => {}} />
    </div>
  ),

  MessageRow: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 420 }}>
      {/* card — floating rounded rows (Chat V1) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-oslo)' }}>card · unread + read</p>
        <MessageRow initials="RS" avatarColour="red" name="Ritika Sharma" time="09:10AM" preview="Starting the new physical therapy regimen this week." unreadCount={2} />
        <MessageRow initials="AM" avatarColour="grey" name="Arjun Mehta" time="Yesterday" preview="Can we reschedule tomorrow’s follow-up to the afternoon?" />
      </div>

      {/* flat — one full-bleed white band with indented hairline dividers (Chat V2) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-oslo)' }}>flat · one band, indented dividers</p>
        <div style={{ background: 'var(--neutral-card)', borderRadius: 'var(--radius-12)', overflow: 'hidden', border: '1px solid var(--neutral-stroke)' }}>
          <MessageRow variant="flat" initials="RS" avatarColour="red" name="Ritika Sharma" time="09:10AM" preview="Starting the new physical therapy regimen this week." unreadCount={2} />
          <MessageRow variant="flat" showDivider initials="AM" avatarColour="grey" name="Arjun Mehta" time="Yesterday" preview="Can we reschedule tomorrow’s follow-up to the afternoon?" />
        </div>
      </div>
    </div>
  ),

  UnreadPatientChatsCard: (
    <div style={{ maxWidth: 420 }}>
      <UnreadPatientChatsCard
        items={[
          { id: 'c-1', initials: 'RS', avatarColour: 'red', name: 'Ritika Sharma', time: '09:10AM', preview: 'Starting the new physical therapy regimen this week.', unreadCount: 2 },
          { id: 'c-2', initials: 'SI', avatarColour: 'green', name: 'Sneha Iyer', time: '08:20AM', preview: 'Thank you doctor, the swelling has gone down a lot.', unreadCount: 1 },
          { id: 'c-3', initials: 'VS', avatarColour: 'blue', name: 'Dr. Vikram Singh', time: '06:14AM', preview: 'Reviewed the MRI — let’s discuss at morning rounds.', unreadCount: 4 },
        ]}
      />
    </div>
  ),

  AlertCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <AlertCard
        eyebrow="Urgent lab alert"
        title="High potassium: 5.3 mEq/L"
        description="Latest pathology value is elevated and needs confirmation before prescription changes."
        tag="Elevated 1 hr ago"
        actionLabel="View trends"
        index={1}
        total={3}
      />
      <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--charcoal-oslo)' }}>
        <strong style={{ color: 'var(--charcoal-base)', fontWeight: 600 }}>One card, no variants.</strong>{' '}
        The Figma frame shows three stacked layers in descending shades
        (<code>--charcoal-base</code> → <code>--charcoal-warm</code> → <code>--charcoal-50</code>),
        each slightly smaller, a purely decorative depth cue for a pile of alerts, not three
        component states. This card always uses the front layer (<code>--charcoal-base</code>); the{' '}
        <code>index</code>/<code>total</code> props drive the “1 / 3” counter. A literal stacked deck
        is a page-level wrapper, not a card variant.
      </p>
    </div>
  ),

  SummaryCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <SummaryCard
        count={18}
        title="Dialysis appointments scheduled today"
        items={[
          { label: 'Queue', value: 5 },
          { label: 'Pre-Session', value: 2 },
          { label: 'Monitoring', value: 6 },
          { label: 'Post', value: 1 },
          { label: 'Completed', value: 4 },
        ]}
      />
      <SummaryCard
        defaultExpanded
        count={18}
        title="Dialysis appointments scheduled today"
        items={[
          { label: 'Queue', value: 5 },
          { label: 'Pre-Session', value: 2 },
          { label: 'Monitoring', value: 6 },
          { label: 'Post', value: 1 },
          { label: 'Completed', value: 4 },
        ]}
      />
      <SummaryCard
        variant="agenda"
        eyebrow="Today"
        meta="Tue, 19 Jun"
        count={24}
        title="patients across 2 hospitals"
        segments={[
          { id: 'new',       label: 'New patients', value: 5,  icon: UserPlus },
          { id: 'followup',  label: 'Follow-ups',   value: 14, icon: RotateCcw },
          { id: 'urgent',    label: 'Urgent',       value: 3,  icon: TriangleAlert, tone: 'urgent' },
          { id: 'procedure', label: 'Procedures',   value: 2,  icon: Activity },
        ]}
        footnote={{ icon: Clock, text: 'Next: Ward A rounds · 9:30 AM', accent: true }}
      />
    </div>
  ),

  DayDivider: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DayDivider label="Yesterday" />
      <DayDivider label="Today" />
    </div>
  ),

  ThreadNote: (
    <ThreadNote>Patient messages from WhatsApp, SMS, and app are merged into one care thread.</ThreadNote>
  ),

  MessageComposer: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 420 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 8 }}>variant="floating"</p>
        <MessageComposer variant="floating" placeholder="Reply as Dr. Girish Sharma" />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 8 }}>variant="docked"</p>
        <div style={{ border: '1px solid var(--neutral-stroke)', borderRadius: 12, overflow: 'hidden' }}>
          <MessageComposer variant="docked" placeholder="Message" />
        </div>
      </div>
    </div>
  ),

  ChatThreadHeader: (
    <div style={{ maxWidth: 393, border: '1px solid var(--neutral-stroke)', borderRadius: 12, overflow: 'hidden' }}>
      <ChatThreadHeader
        title="Ritika Sharma"
        subtitle="MRN UGI56778"
        participants={['Dr. Mehta', 'Asha', 'Nurse Priya']}
      />
    </div>
  ),

  MessageBubble: (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {/* Classic — care thread V1: sender + time above, squared outer-top corner */}
      <div style={{ flex: '1 1 300px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 8 }}>variant="classic"</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <MessageBubble
            variant="classic"
            direction="incoming"
            senderName="Ritika Sharma"
            time="08:14 AM"
            text="Good morning doctor, I felt a little dizzy after yesterday’s dialysis. It improved after breakfast."
          />
          <MessageBubble
            variant="classic"
            direction="outgoing"
            senderName="Dr. Mehta"
            time="06:40 PM"
            channel="Delivered through SMS"
            text="Yes, continue it with dinner tonight. We’ll review the dose again after the next phosphorus report."
          />
        </div>
      </div>

      {/* WhatsApp — chat V2: tail, inline time + read ticks */}
      <div style={{ flex: '1 1 300px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 8 }}>variant="whatsapp"</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <MessageBubble
            variant="whatsapp"
            direction="incoming"
            senderName="Ritika Sharma"
            text="Good morning doctor, I felt a little dizzy after yesterday’s dialysis."
            time="08:14 AM"
          />
          <MessageBubble
            variant="whatsapp"
            direction="outgoing"
            text="Thanks. Please check your BP now and again 30 minutes after standing."
            time="08:32 AM"
            status="read"
          />
        </div>
      </div>
    </div>
  ),

  EventCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      {/* Icon header, light — full medication inset + status */}
      <EventCard
        icon={Pill}
        title="CKD medications started"
        meta="Initial renal regimen · Dr. Mehta · Nephrology"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      >
        <MedicationInset
          status="New start"
          name="Torsemide + sodium bicarbonate"
          detail="20 mg / 650 mg · Morning / Twice daily · Oral"
        />
      </EventCard>

      {/* Icon header, light — no inset */}
      <EventCard
        icon={Pill}
        title="CKD medications started"
        meta="Initial renal regimen · Dr. Mehta · Nephrology"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      />

      {/* Collapsible, light — collapsed + expanded with inset */}
      <EventCard
        collapsible
        title="CKD medications started"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      >
        <MedicationInset name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      </EventCard>
      <EventCard
        collapsible
        defaultExpanded
        title="CKD medications started"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      >
        <MedicationInset name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      </EventCard>

      {/* Collapsible, dark — collapsed + expanded with inset */}
      <EventCard
        collapsible
        theme="dark"
        title="CKD medications started"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      >
        <MedicationInset theme="dark" name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      </EventCard>
      <EventCard
        collapsible
        defaultExpanded
        theme="dark"
        title="CKD medications started"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      >
        <MedicationInset theme="dark" name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      </EventCard>

      {/* Collapsible, light — appointment progress + next checkup footer */}
      <EventCard
        collapsible
        defaultExpanded
        title="CKD medications started"
        description="Torsemide and sodium bicarbonate started for volume control and metabolic acidosis management."
      >
        <AppointmentProgress
          steps={[
            { label: 'Appointment Confirmed', time: '08:40AM' },
            { label: 'Vitals Checked', time: '08:50AM' },
            { label: 'Waiting in lobby', time: '08:55AM' },
            { label: 'Consultation Started', time: '09:00AM' },
            { label: 'Consultation Ended', time: '09:16AM' },
          ]}
        />
        <NextCheckupRow date="12 June 2026" />
      </EventCard>
    </div>
  ),

  MedicationInset: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <MedicationInset status="New start" name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      <MedicationInset name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      <div style={{ background: 'var(--charcoal-base)', borderRadius: 12, padding: 12 }}>
        <MedicationInset theme="dark" name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
      </div>
    </div>
  ),

  AppointmentProgress: (
    <div style={{ maxWidth: 320 }}>
      <AppointmentProgress
        steps={[
          { label: 'Appointment Confirmed', time: '08:40AM' },
          { label: 'Vitals Checked', time: '08:50AM' },
          { label: 'Waiting in lobby', time: '08:55AM' },
          { label: 'Consultation Started', time: '09:00AM' },
          { label: 'Consultation Ended', time: '09:16AM' },
        ]}
      />
    </div>
  ),

  NextCheckupRow: (
    <div style={{ maxWidth: 320 }}>
      <NextCheckupRow date="12 June 2026" />
    </div>
  ),

  RecordInset: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <RecordInset title="Outside lab bundle" meta="CBC, KFT, urine protein" onAction={() => {}} />
      <RecordInset title="Follow-up lab order" meta="Iron profile · PTH · Viral markers" />
      <div style={{ background: 'var(--charcoal-base)', borderRadius: 12, padding: 12 }}>
        <RecordInset theme="dark" title="Outside lab bundle" meta="CBC, KFT, urine protein" onAction={() => {}} />
      </div>
    </div>
  ),

  TimelineEntryHeader: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TimelineEntryHeader date="20 Aug 2025" badgeLabel="Medication" badgeColour="yellow" />
      <TimelineEntryHeader date="05 Jul 2025" badgeLabel="Lab" badgeColour="blue" />
      <TimelineEntryHeader date="28 Jun 2025" badgeLabel="Report" badgeColour="green" />
    </div>
  ),

  QuickAccessChip: (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 360, background: 'var(--neutral-app-bg)', padding: 12, borderRadius: 12 }}>
      <QuickAccessChip icon={ClipboardList} label="Prescription" />
      <QuickAccessChip icon={Pill} label="Medications" />
      <QuickAccessChip icon={FileText} label="Reports" />
      <QuickAccessChip icon={Activity} label="Dialysis" />
    </div>
  ),

  ReadStatusToggle: (
    <div style={{ maxWidth: 360, background: 'var(--neutral-app-bg)', padding: 12, borderRadius: 12 }}>
      <ReadStatusToggle />
    </div>
  ),

  DrawerOption: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360, background: 'var(--neutral-app-bg)', padding: 12, borderRadius: 12 }}>
      <DrawerOption icon={FileText} title="Add Notes" subtitle="Capture a progress note" />
      <DrawerOption icon={LineChart} title="Add Reports" subtitle="Capture a new report" />
      <DrawerOption icon={ClipboardList} title="Add Prescription" subtitle="Capture a prescription" />
    </div>
  ),

  BottomDrawer: <BottomDrawerPreview />,

  Timeline: (
    <div style={{ maxWidth: 340, background: 'var(--neutral-card)', padding: 16, borderRadius: 12 }}>
      <Timeline
        entries={[
          {
            id: 'demo-1',
            date: '20 Aug 2025',
            badgeLabel: 'Medication',
            badgeColour: 'yellow',
            active: true,
            content: (
              <EventCard
                icon={Pill}
                title="CKD medications started"
                meta="Initial renal regimen · Dr. Mehta · Nephrology"
                description="Torsemide and sodium bicarbonate started for volume control."
              >
                <MedicationInset status="New start" name="Torsemide + sodium bicarbonate" detail="20 mg / 650 mg · Morning / Twice daily · Oral" />
              </EventCard>
            ),
          },
          {
            id: 'demo-2',
            date: '28 Jun 2025',
            badgeLabel: 'Report',
            badgeColour: 'green',
            content: (
              <EventCard
                icon={FlaskConical}
                title="Baseline reports uploaded"
                meta="Creatinine 5.8 · eGFR 11 · Hb 8.9"
                description="Initial outside reports were added and marked for urgent nephrology review."
              >
                <RecordInset title="Outside lab bundle" meta="CBC, KFT, urine protein" onAction={() => {}} />
              </EventCard>
            ),
          },
        ]}
      />
    </div>
  ),

  TrendChart: (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {['creatinine', 'ferritin'].map(pid => {
        const p = pathologyParameters.find(x => x.id === pid)!
        return (
          <div key={pid} style={{ flex: '1 1 260px', maxWidth: 320, background: 'var(--neutral-card)', border: '1px solid var(--neutral-stroke)', borderRadius: 12, padding: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', marginBottom: 8 }}>
              {p.name} — {pid === 'creatinine' ? 'out of range' : 'within range'}
            </p>
            <TrendChart dataPoints={p.dataPoints} referenceRange={p.referenceRange} />
          </div>
        )
      })}
    </div>
  ),

  LabParameterCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <LabParameterCard parameter={pathologyParameters.find(p => p.id === 'potassium')!} />
      <LabParameterCard parameter={pathologyParameters.find(p => p.id === 'ferritin')!} />
    </div>
  ),

  LabResultsTable: (
    <div style={{ maxWidth: 420 }}>
      <LabResultsTable parameters={pathologyParameters.slice(0, 5)} dates={trendDates} />
    </div>
  ),

  DayStrip: <DayStripPreview />,

  SuggestionPill: (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, maxWidth: 360, background: 'var(--neutral-app-bg)', padding: 16, borderRadius: 12 }}>
      <SuggestionPill label="How does my day look?" icon={Sparkles} />
      <SuggestionPill label="Who needs me first?" icon={Sparkles} />
      <SuggestionPill label="Summarise the out-of-range values" />
    </div>
  ),

  AskMessage: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360, background: 'var(--neutral-app-bg)', padding: 16, borderRadius: 12 }}>
      <AskMessage author="user" text="How does my day look?" />
      <AskMessage author="assistant" text="You have **24 patients across 2 hospitals** today: 5 new, 14 follow-ups and **3 urgent**, ~2 procedures~. Want me to line up the urgent cases?">
        <AskAction label="Open today’s schedule" icon={Calendar} />
      </AskMessage>
      <AskMessage author="assistant" loading />
    </div>
  ),

  AskAction: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320, background: 'var(--neutral-app-bg)', padding: 16, borderRadius: 12 }}>
      <AskAction label="Open Arjun’s profile" icon={User} />
      <AskAction label="View Arjun’s reports" icon={FlaskConical} />
      <AskAction label="Add a note" icon={NotebookPen} />
    </div>
  ),

  AppointmentCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360 }}>
      <AppointmentCard appointment={scheduleDays[2].appointments[1]} active onClick={() => {}} />
      <AppointmentCard appointment={scheduleDays[2].appointments[2]} onClick={() => {}} />
      <AppointmentCard appointment={scheduleDays[2].appointments[0]} onClick={() => {}} />
    </div>
  ),
}

// ── Component ────────────────────────────────────────────────────────────
export function DesignSystemPage() {
  const [active, setActive] = useState('overview')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ALL_SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { root: contentRef.current, threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', fontFamily: 'var(--font-sans)' }}>

      {/* ── Header ── */}
      <header style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', borderBottom: '1px solid var(--neutral-stroke)',
        background: '#fff', flexShrink: 0, position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={markSrc} alt="Jano" style={{ height: 28, width: 'auto', flexShrink: 0 }} />
          <div>
            <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--charcoal-base)', letterSpacing: -0.3 }}>
              Jano
            </span>
            <span style={{ fontSize: 16, color: 'var(--charcoal-oslo)', marginLeft: 6 }}>
              Design System
            </span>
          </div>
        </div>

        <Link
          to="/"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--charcoal-base)',
            textDecoration: 'none', padding: '6px 14px',
            borderRadius: 20, border: '1px solid var(--neutral-stroke)',
            transition: 'border-color 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="var(--charcoal-base)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to app
        </Link>
      </header>

      {/* ── Body: sidebar + content ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <nav style={{
          width: 240, flexShrink: 0, overflowY: 'auto',
          borderRight: '1px solid var(--neutral-stroke)',
          padding: '16px 0 40px',
        }} className="no-scrollbar">
          <SidebarSearch items={SEARCH_INDEX} onSelect={scrollTo} />
          <div style={{ height: 1, background: 'var(--neutral-stroke)', margin: '4px 0 8px' }} />
          {NAV.map(item => (
            <div key={item.id} style={{ marginBottom: 4 }}>
              {'children' in item && item.children ? (
                <>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
                    color: 'var(--charcoal-oslo)', padding: '12px 20px 4px',
                  }}>
                    {item.label}
                  </p>
                  {item.children.map(child => (
                    <NavLink
                      key={child.id}
                      id={child.id}
                      label={child.label}
                      active={active === child.id}
                      onClick={() => scrollTo(child.id)}
                      indent
                    />
                  ))}
                </>
              ) : (
                <NavLink
                  id={item.id}
                  label={item.label}
                  active={active === item.id}
                  onClick={() => scrollTo(item.id)}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main
          ref={contentRef}
          style={{ flex: 1, overflowY: 'auto', padding: '40px 56px 80px' }}
          className="no-scrollbar"
        >
          <div style={{ maxWidth: 760 }}>

            {/* Overview */}
            <Section id="overview" eyebrow="Documentation" title="Design System" description="The single source of truth for the Jano visual language: colours, typography, spacing, and every component built for the Doctor Companion prototype." />

            {/* Colors */}
            <Divider label="Colors" />

            {colorGroups.map((group, i) => {
              const sectionId = ['colors-crimson', 'colors-charcoal', 'colors-neutrals', 'colors-status'][i]
              return (
                <div key={group.label} id={sectionId} style={{ marginBottom: 48, scrollMarginTop: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                    {group.label}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', marginBottom: 20 }}>
                    {group.description}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {group.swatches.map(swatch => (
                      <div key={swatch.name} style={{ flex: 1 }}>
                        <div style={{
                          height: 80, borderRadius: 10, background: swatch.hex, marginBottom: 8,
                          border: swatch.hex === '#FFFFFF' ? '1px solid var(--neutral-stroke)' : 'none',
                        }} />
                        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-base)', marginBottom: 2 }}>
                          {swatch.name}
                        </p>
                        <p style={{ fontSize: 11, color: 'var(--charcoal-oslo)', fontFamily: 'monospace' }}>
                          {swatch.hex}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Typography */}
            <Divider label="Typography" />

            <div id="type-body" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                Figtree: body & labels
              </h2>
              <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', marginBottom: 24 }}>
                Used for all body copy, captions, labels, and UI text.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { cls: 'type-body-m',      label: 'Body M · 16px Regular',    sample: 'Patient admitted with acute chest pain, vitals stable.' },
                  { cls: 'type-body-text-m', label: 'Body Text M · 14px Regular', sample: 'Progress note: patient responding well to beta-blocker therapy.' },
                  { cls: 'type-body-s',      label: 'Body S · 14px Semibold',   sample: 'Ward 3B · Bed 12' },
                  { cls: 'type-body-xs',     label: 'Body XS · 12px Regular',   sample: 'Last updated 08:42 AM' },
                  { cls: 'type-overline-xs', label: 'Overline XS · 12px Medium', sample: 'PATIENT DETAILS' },
                ].map(t => <TypeRow key={t.cls} {...t} />)}
              </div>
            </div>

            <div id="type-display" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                Figtree: display & titles
              </h2>
              <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', marginBottom: 24 }}>
                Used for screen headers, card titles, and key data points.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { cls: 'type-title-xl', label: 'Title XL · 20px Medium',   sample: 'Good morning, Dr. Sharma' },
                  { cls: 'type-title-l',  label: 'Title L · 18px Semibold',  sample: 'Patient Overview' },
                  { cls: 'type-title-m',  label: 'Title M · 16px Semibold',  sample: 'Current Medications' },
                  { cls: 'type-title-s',  label: 'Title S · 14px Semibold',  sample: 'Ritika Sharma' },
                  { cls: 'type-title-xs', label: 'Title XS · 12px Medium',   sample: 'MRN 00291847' },
                ].map(t => <TypeRow key={t.cls} {...t} />)}
              </div>
            </div>

            {/* Spacing & Radius */}
            <Divider label="Spacing & Radius" />

            <div id="spacing-scale" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                Spacing scale
              </h2>
              <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', lineHeight: 1.6, marginBottom: 8 }}>
                All padding, margin, gap, and layout spacing must use one of these tokens. No arbitrary pixel values.
              </p>
              <div style={{
                background: 'var(--crimson-5)', border: '1px solid var(--crimson-30)',
                borderRadius: 10, padding: '10px 16px', marginBottom: 24, fontSize: 13,
                color: 'var(--crimson-deep)', fontWeight: 600,
              }}>
                Strict rule: arbitrary px values are forbidden in components.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { token: '--space-2',  px: '2px',  use: 'Icon gap, hairline insets' },
                  { token: '--space-4',  px: '4px',  use: 'Tight chip padding, badge insets' },
                  { token: '--space-6',  px: '6px',  use: 'Variant tag padding' },
                  { token: '--space-8',  px: '8px',  use: 'Small component padding, icon size' },
                  { token: '--space-12', px: '12px', use: 'Default horizontal button padding' },
                  { token: '--space-14', px: '14px', use: 'Vertical button / input padding' },
                  { token: '--space-16', px: '16px', use: 'Screen horizontal padding' },
                  { token: '--space-18', px: '18px', use: 'Section row padding' },
                  { token: '--space-20', px: '20px', use: 'Card padding (tight)' },
                  { token: '--space-24', px: '24px', use: 'Card padding (standard)' },
                  { token: '--space-28', px: '28px', use: 'Section gap' },
                  { token: '--space-32', px: '32px', use: 'Large section gap' },
                  { token: '--space-40', px: '40px', use: 'Section vertical padding' },
                  { token: '--space-48', px: '48px', use: 'Page top padding' },
                  { token: '--space-56', px: '56px', use: 'Header height' },
                  { token: '--space-64', px: '64px', use: 'Tab bar clearance' },
                  { token: '--space-80', px: '80px', use: 'Large hero spacing' },
                  { token: '--space-96', px: '96px', use: 'Extra-large layout gap' },
                ].map(({ token, px, use }) => (
                  <div key={token} style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '8px 12px', borderRadius: 8, background: 'var(--neutral-sunken)',
                  }}>
                    <div style={{
                      height: 20, background: 'var(--crimson-30)', borderRadius: 3, flexShrink: 0,
                      width: `calc(${px} * 1.5)`,
                      minWidth: 3,
                    }} />
                    <code style={{ fontSize: 12, color: 'var(--crimson-base)', fontFamily: 'monospace', width: 110, flexShrink: 0 }}>{token}</code>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-base)', width: 36, flexShrink: 0 }}>{px}</span>
                    <span style={{ fontSize: 12, color: 'var(--charcoal-oslo)' }}>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="radius-scale" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                Border radius
              </h2>
              <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', lineHeight: 1.6, marginBottom: 24 }}>
                All border-radius values must use one of these tokens.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[
                  { token: '--radius-2',    px: '2px',    use: 'Hairline, inner nested' },
                  { token: '--radius-4',    px: '4px',    use: 'Chips, tags, code' },
                  { token: '--radius-6',    px: '6px',    use: 'Small badges, swatches' },
                  { token: '--radius-8',    px: '8px',    use: 'Icon containers' },
                  { token: '--radius-10',   px: '10px',   use: 'Inputs, list rows' },
                  { token: '--radius-12',   px: '12px',   use: 'Cards, modals' },
                  { token: '--radius-16',   px: '16px',   use: 'Large cards, panels' },
                  { token: '--radius-20',   px: '20px',   use: 'Pill buttons, tabs' },
                  { token: '--radius-24',   px: '24px',   use: 'FAB, large pills' },
                  { token: '--radius-32',   px: '32px',   use: 'Drawers, sheets' },
                  { token: '--radius-44',   px: '44px',   use: 'Phone shell' },
                  { token: '--radius-full', px: '9999px', use: 'Circles, full pills' },
                ].map(({ token, px, use }) => (
                  <div key={token} style={{ background: 'var(--neutral-sunken)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{
                      width: 48, height: 48, background: 'var(--neutral-warm-grey)',
                      borderRadius: px === '9999px' ? '9999px' : px,
                      marginBottom: 10, border: '2px solid var(--neutral-stroke)',
                    }} />
                    <code style={{ fontSize: 11, color: 'var(--crimson-base)', fontFamily: 'monospace', display: 'block', marginBottom: 2 }}>{token}</code>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-base)', display: 'block', marginBottom: 2 }}>{px}</span>
                    <span style={{ fontSize: 11, color: 'var(--charcoal-oslo)' }}>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Elevation */}
            <Divider label="Elevation" />

            {(['soft', 'hard'] as const).map(type => {
              const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
              const labels: Record<string, string> = {
                xs: 'X-Small', sm: 'Small', md: 'Medium', lg: 'Large', xl: 'X-Large',
              }
              const descriptions: Record<string, Record<string, string>> = {
                soft: {
                  xs: 'Tight list rows',
                  sm: 'Default card',
                  md: 'Floating panel',
                  lg: 'Modal / sheet',
                  xl: 'Phone shell',
                },
                hard: {
                  xs: 'Subtle press',
                  sm: 'Small interactive',
                  md: 'Focused / active',
                  lg: 'FAB / action',
                  xl: 'Max emphasis',
                },
              }
              return (
                <div key={type} id={`elevation-${type}`} style={{ marginBottom: 48, scrollMarginTop: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                    {type === 'soft' ? 'Soft shadows' : 'Hard shadows'}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', lineHeight: 1.6, marginBottom: 24 }}>
                    {type === 'soft'
                      ? 'Diffuse, ambient depth. Use for cards, panels, modals, and bottom sheets.'
                      : 'Sharp, defined edges. Use for FAB buttons, active states, and tooltips.'}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
                    {sizes.map(size => (
                      <div key={size} style={{
                        background: 'var(--neutral-sunken)',
                        borderRadius: 12,
                        padding: '32px 16px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 20,
                      }}>
                        {/* Shadow demo card */}
                        <div style={{
                          width: 80,
                          height: 80,
                          background: 'var(--neutral-card)',
                          borderRadius: 10,
                          boxShadow: `var(--shadow-${type}-${size})`,
                        }} />
                        <div style={{ textAlign: 'center' }}>
                          <code style={{ fontSize: 11, color: 'var(--crimson-base)', fontFamily: 'monospace', display: 'block', marginBottom: 3 }}>
                            {`--shadow-${type}-${size}`}
                          </code>
                          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-base)', display: 'block', marginBottom: 2 }}>
                            {labels[size]}
                          </span>
                          <span style={{ fontSize: 11, color: 'var(--charcoal-oslo)' }}>
                            {descriptions[type][size]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Iconography */}
            <Divider label="Iconography" />

            <div id="icons-library" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                Lucide: icon library
              </h2>
              <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', lineHeight: 1.6, marginBottom: 24 }}>
                All icons in Jano use <strong style={{ color: 'var(--charcoal-base)' }}>Lucide</strong> via the <code style={{ fontSize: 12, background: 'var(--neutral-sunken)', padding: '2px 6px', borderRadius: 4 }}>lucide-react</code> package.
                No inline SVGs, no other icon libraries. Import named icons directly.
              </p>

              <div style={{ background: 'var(--neutral-sunken)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--charcoal-oslo)', marginBottom: 10 }}>Usage</p>
                <pre style={{ fontSize: 13, color: 'var(--charcoal-base)', lineHeight: 1.6, fontFamily: 'monospace', overflowX: 'auto' }}>{`import { Stethoscope, Calendar, User } from 'lucide-react'

<Stethoscope size={20} strokeWidth={1.5} />
<Calendar size={16} strokeWidth={1.5} />
<User size={20} strokeWidth={1.5} />`}</pre>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Size', rule: '20px nav/action · 16px inline/label · 24px empty state' },
                  { label: 'Stroke', rule: '1.5 default · 2.0 for emphasis only' },
                  { label: 'Colour', rule: 'Inherit from parent, never hardcode on the icon' },
                ].map(r => (
                  <div key={r.label} style={{ background: 'var(--neutral-sunken)', borderRadius: 10, padding: '14px 16px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--crimson-base)', marginBottom: 4 }}>{r.label}</p>
                    <p style={{ fontSize: 13, color: 'var(--charcoal-base)', lineHeight: 1.5 }}>{r.rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Components */}
            <Divider label="Components" />

            {componentRegistry.map(section => {
              const sectionId = section.label.toLowerCase()
              return (
                <div key={section.label} id={sectionId} style={{ marginBottom: 48, scrollMarginTop: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--charcoal-base)', marginBottom: 4 }}>
                    {section.label}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--charcoal-oslo)', marginBottom: 24 }}>
                    {section.label === 'Atoms'     && 'Primitive building blocks, not further decomposable.'}
                    {section.label === 'Molecules'  && 'Groups of atoms that form simple, functional UI units.'}
                    {section.label === 'Organisms'  && 'Complex UI sections composed of molecules and atoms.'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {section.components.map(comp => (
                      <ComponentRow
                        key={comp.name}
                        comp={comp}
                        preview={componentPreviews[comp.name]}
                      />
                    ))}
                  </div>
                </div>
              )
            })}

          </div>
        </main>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────

const SUBLABEL_COLOR: Record<string, string> = {
  Atom: 'var(--status-stable)',
  Molecule: 'var(--status-caution)',
  Organism: 'var(--crimson-base)',
}

function SidebarSearch({ items, onSelect }: { items: SearchItem[]; onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return items.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.sublabel.toLowerCase().includes(q)
    ).slice(0, 9)
  }, [query, items])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (id: string) => {
    onSelect(id)
    setQuery('')
    setOpen(false)
    setHoveredIdx(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); setQuery('') }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHoveredIdx(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHoveredIdx(i => Math.max(i - 1, 0)) }
    if (e.key === 'Enter' && hoveredIdx >= 0 && results[hoveredIdx]) handleSelect(results[hoveredIdx].id)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', padding: '0 12px 12px' }}>
      <div style={{ position: 'relative' }}>
        <Search size={13} strokeWidth={2} style={{
          position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--charcoal-oslo)', pointerEvents: 'none',
        }} />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setHoveredIdx(-1) }}
          onFocus={() => { if (query) setOpen(true) }}
          onKeyDown={handleKeyDown}
          placeholder="Search…"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '7px 28px 7px 28px',
            fontSize: 12, fontFamily: 'var(--font-sans)',
            color: 'var(--charcoal-base)',
            background: 'var(--neutral-sunken)',
            border: '1px solid var(--neutral-stroke)',
            borderRadius: 'var(--radius-8)',
            outline: 'none',
          }}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus() }}
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 2,
              color: 'var(--charcoal-oslo)', display: 'flex', alignItems: 'center',
            }}
          >
            <X size={12} strokeWidth={2} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% - 4px)',
          left: 12, right: 12,
          background: 'var(--neutral-card)',
          border: '1px solid var(--neutral-stroke)',
          borderRadius: 'var(--radius-10)',
          boxShadow: 'var(--shadow-soft-md)',
          zIndex: 300,
          maxHeight: 280,
          overflowY: 'auto',
        }} className="no-scrollbar">
          {results.length > 0 ? results.map((item, idx) => (
            <button
              key={item.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(-1)}
              onClick={() => handleSelect(item.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', textAlign: 'left', gap: 6,
                padding: '8px 10px',
                background: hoveredIdx === idx ? 'var(--crimson-5)' : 'transparent',
                border: 'none',
                borderBottom: idx < results.length - 1 ? '1px solid var(--neutral-sunken)' : 'none',
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--charcoal-base)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
              {item.sublabel && (
                <span style={{
                  fontSize: 9, fontWeight: 700, flexShrink: 0,
                  color: SUBLABEL_COLOR[item.sublabel] ?? 'var(--charcoal-oslo)',
                  background: 'var(--neutral-sunken)',
                  padding: '2px 5px', borderRadius: 'var(--radius-4)',
                  textTransform: 'uppercase', letterSpacing: 0.4,
                }}>
                  {item.sublabel}
                </span>
              )}
            </button>
          )) : (
            <p style={{ fontSize: 12, color: 'var(--charcoal-oslo)', textAlign: 'center', padding: '12px 10px' }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function NavLink({ label, active, onClick, indent = false }: {
  id?: string; label: string; active: boolean; onClick: () => void; indent?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: indent ? '5px 20px 5px 28px' : '6px 20px',
        fontSize: 'var(--text-size-s)', fontWeight: active ? 600 : 400,
        color: active ? 'var(--crimson-base)' : 'var(--charcoal-base)',
        background: active ? 'var(--crimson-5)' : 'transparent',
        borderLeft: active ? '2px solid var(--crimson-base)' : '2px solid transparent',
        cursor: 'pointer', border: 'none', borderRadius: 0,
        fontFamily: 'var(--font-sans)',
        transition: 'color 0.12s, background 0.12s',
      }}
    >
      {label}
    </button>
  )
}

function Section({ id, eyebrow, title, description }: {
  id: string; eyebrow: string; title: string; description: string
}) {
  return (
    <div id={id} style={{ marginBottom: 56, scrollMarginTop: 24 }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--crimson-base)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.6 }}>
        {eyebrow}
      </p>
      <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--charcoal-base)', letterSpacing: -0.8, marginBottom: 12 }}>
        {title}
      </h1>
      <p style={{ fontSize: 16, color: 'var(--charcoal-oslo)', lineHeight: 1.6, maxWidth: 540 }}>
        {description}
      </p>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, marginTop: 8 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--charcoal-oslo)', whiteSpace: 'nowrap' }}>
        {label}
      </p>
      <div style={{ flex: 1, height: 1, background: 'var(--neutral-stroke)' }} />
    </div>
  )
}

function TypeRow({ cls, label, sample }: { cls: string; label: string; sample: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '16px 0', borderBottom: '1px solid var(--neutral-stroke)' }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--charcoal-oslo)', width: 180, flexShrink: 0 }}>
        {label}
      </p>
      <p className={cls} style={{ color: 'var(--charcoal-base)' }}>
        {sample}
      </p>
    </div>
  )
}

function ComponentRow({ comp, preview }: { comp: ComponentDoc; preview?: React.ReactNode }) {
  const pill = statusPill[comp.status]
  return (
    <div id={`comp-${comp.name}`} style={{
      borderRadius: 10,
      background: 'var(--neutral-sunken)',
      border: '1px solid var(--neutral-stroke)',
      overflow: 'hidden',
      scrollMarginTop: 32,
    }}>
      {/* Meta row */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '14px 16px', gap: 16,
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal-base)', marginBottom: 2 }}>
            {comp.name}
          </p>
          <p style={{ fontSize: 13, color: 'var(--charcoal-oslo)', lineHeight: 1.5 }}>
            {comp.description}
          </p>
          {comp.variants && comp.variants.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
              {comp.variants.map(v => (
                <span key={v.name} style={{
                  fontSize: 10, fontWeight: 500, background: 'var(--neutral-warm-grey)',
                  color: 'var(--charcoal-base)', borderRadius: 4, padding: '2px 6px',
                }}>
                  {v.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <span style={{
          flexShrink: 0, fontSize: 10, fontWeight: 700,
          background: pill.bg, color: pill.color,
          borderRadius: 20, padding: '3px 10px',
        }}>
          {pill.label}
        </span>
      </div>

      {/* Live preview, only for built components that have a preview */}
      {preview && comp.status === 'built' && (
        <>
          <div style={{ height: 1, background: 'var(--neutral-warm-grey)', margin: '0 16px' }} />
          <div style={{ padding: '16px', background: '#fff' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--charcoal-oslo)', marginBottom: 12 }}>
              Preview
            </p>
            {preview}
          </div>
        </>
      )}
    </div>
  )
}
