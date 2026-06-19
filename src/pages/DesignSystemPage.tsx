import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import markSrc from '@/assets/jano-mark.svg'
import { colorGroups, componentRegistry } from '@/lib/componentRegistry'
import type { ComponentDoc } from '@/lib/componentRegistry'
import { House, MessageSquare } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Badge } from '@/components/atoms/Badge'
import { Avatar } from '@/components/atoms/Avatar'
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
import { ChatBubble } from '@/components/molecules/ChatBubble'
import { DayDivider } from '@/components/molecules/DayDivider'
import { ThreadNote } from '@/components/molecules/ThreadNote'
import { MessageBubble } from '@/components/molecules/MessageBubble'
import { MessageComposer } from '@/components/organisms/MessageComposer'
import { ChatThreadHeader } from '@/components/organisms/ChatThreadHeader'
import { ChatComposer } from '@/components/organisms/ChatComposer'

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
      <Badge label="Critical" colour="red" />
      <Badge label="Pending" colour="grey" />
      <Badge label="IPD" colour="black" />
    </div>
  ),

  Avatar: (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar initials="GS" colour="grey" size={30} />
      <Avatar initials="RS" colour="red" size={30} />
      <Avatar initials="VS" colour="green" size={30} />
      <Avatar initials="AM" colour="blue" size={30} />
      <Avatar initials="PN" colour="yellow" size={30} />
      <Avatar initials="DR" colour="grey" size={56} />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <SearchBar placeholder="Search" />
      <SearchBar showFilter placeholder="Search by Name, MRN or Phone" />
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
    </div>
  ),

  PatientCard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <PatientCard name="Arjun Patel" encounterType="IPD" ward="Nephrology Ward A" bed="Bed 12" mrn="UGI56212" />
      <PatientCard name="Meera Reddy" encounterType="OPD" ward="Nephrology Ward A" bed="Bed 4" mrn="UGI56240" variant="highlighted" />
    </div>
  ),

  MessageRow: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
      <MessageRow initials="RS" avatarColour="red" name="Ritika Sharma" time="09:10AM" preview="Starting the new physical therapy regimen this week." unreadCount={2} />
      <MessageRow initials="AM" avatarColour="grey" name="Arjun Mehta" time="Yesterday" preview="Can we reschedule tomorrow’s follow-up to the afternoon?" />
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
    </div>
  ),

  ChatBubble: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
      <ChatBubble
        direction="incoming"
        senderName="Ritika Sharma"
        time="08:14 AM"
        text="Good morning doctor, I felt a little dizzy after yesterday’s dialysis. It improved after breakfast."
      />
      <ChatBubble
        direction="outgoing"
        senderName="Dr. Mehta"
        time="06:40 PM"
        channel="Delivered through SMS"
        text="Yes, continue it with dinner tonight. We’ll review the dose again after the next phosphorus report."
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
    <div style={{ maxWidth: 420 }}>
      <MessageComposer placeholder="Reply as Dr. Girish Sharma" />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 420 }}>
      <MessageBubble
        direction="incoming"
        senderName="Ritika Sharma"
        text="Good morning doctor, I felt a little dizzy after yesterday’s dialysis."
        time="08:14 AM"
      />
      <MessageBubble
        direction="outgoing"
        text="Thanks. Please check your BP now and again 30 minutes after standing."
        time="08:32 AM"
        status="read"
      />
    </div>
  ),

  ChatComposer: (
    <div style={{ maxWidth: 420, border: '1px solid var(--neutral-stroke)', borderRadius: 12, overflow: 'hidden' }}>
      <ChatComposer placeholder="Message" />
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
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--charcoal-base)', letterSpacing: -0.3 }}>
              Jano
            </span>
            <span style={{ fontSize: 14, color: 'var(--charcoal-oslo)', marginLeft: 6 }}>
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
          padding: '20px 0 40px',
        }} className="no-scrollbar">
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
    <div style={{
      borderRadius: 10,
      background: 'var(--neutral-sunken)',
      border: '1px solid var(--neutral-stroke)',
      overflow: 'hidden',
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
