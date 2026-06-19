export type AtomicLevel = 'atom' | 'molecule' | 'organism' | 'template'

export interface ComponentVariant {
  name: string
  description?: string
}

export interface ComponentDoc {
  name: string
  description: string
  atomicLevel: AtomicLevel
  variants?: ComponentVariant[]
  status: 'built' | 'in-progress' | 'planned'
  path?: string
}

export interface RegistrySection {
  label: string
  components: ComponentDoc[]
}

// ── Registry, updated as components are built ─────────────────────────────
export const componentRegistry: RegistrySection[] = [
  {
    label: 'Atoms',
    components: [
      { name: 'Badge', description: 'Label badge: 7 colour variants, full-pill, 10px uppercase (crimson = solid urgent red for critical/out-of-range)', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Badge.tsx', variants: [{ name: 'yellow' }, { name: 'green' }, { name: 'grey' }, { name: 'blue' }, { name: 'red' }, { name: 'black' }, { name: 'crimson' }] },
      { name: 'Button', description: 'Primary, outline, ghost and destructive actions', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Button.tsx', variants: [{ name: 'primary' }, { name: 'outline' }, { name: 'ghost' }, { name: 'destructive' }] },
      { name: 'Input', description: 'Bare text input with error state', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Input.tsx', variants: [{ name: 'default' }, { name: 'error' }] },
      { name: 'Textarea', description: 'Multi-line input — same sunken field / border / focus as Input', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Textarea.tsx', variants: [{ name: 'default' }, { name: 'error' }] },
      { name: 'Avatar', description: 'Circular avatar: photo, or initials fallback in a single uniform crimson tint', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Avatar.tsx', variants: [{ name: 'initials' }, { name: 'photo' }] },
      { name: 'StatCard', description: 'Home-screen metric tile: big value over a Lucide icon + uppercase caption', atomicLevel: 'atom', status: 'built', path: 'components/atoms/StatCard.tsx' },
      { name: 'Fab', description: 'Floating action button: 64px crimson circle + white plus; morphs to a white surface with an × when open', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Fab.tsx', variants: [{ name: 'closed' }, { name: 'open' }] },
    ],
  },
  {
    label: 'Molecules',
    components: [
      { name: 'SearchBar', description: 'Pill search field (default / with-filter) + "ask": a magical AI bar with a Framer-Motion gradient stroke (colours pan in place). `showFilter` adds the plain trailing filter button to either field — so ask + filter pairs the gradient bar with a glow-free filter. The ask bar doubles as a launcher (onActivate → Ask AI page) or a composer (onSubmit → Enter / send button)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/SearchBar.tsx', variants: [{ name: 'default' }, { name: 'with-filter' }, { name: 'ask' }, { name: 'ask+filter' }] },
      { name: 'FormField', description: 'Label + Input + error/hint, spreads all input props', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/FormField.tsx' },
      { name: 'DividerWithLabel', description: 'Horizontal rule with centered text label (e.g. OR)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/DividerWithLabel.tsx' },
      { name: 'SocialAuthButton', description: 'Outline button with icon + label for OAuth providers', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/SocialAuthButton.tsx' },
      { name: 'FilterPill', description: 'Filter chip: selected/unselected, with/without count', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/FilterPill.tsx', variants: [{ name: 'selected' }, { name: 'unselected' }, { name: 'selected+count' }, { name: 'unselected+count' }] },
      { name: 'FilterTabs', description: 'Horizontal scrollable row of FilterPills with active state', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/FilterTabs.tsx' },
      { name: 'NavItem', description: 'Single bottom-nav item: icon + label, active/inactive', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/NavItem.tsx', variants: [{ name: 'active' }, { name: 'inactive' }] },
      { name: 'MessageBubble', description: 'Conversation bubble with two layout variants: classic (sender + time above, squared outer-top corner) and whatsapp (tail, inline time + read ticks, colour-coded group sender); each incoming + outgoing', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/MessageBubble.tsx', variants: [{ name: 'classic' }, { name: 'whatsapp' }, { name: 'incoming' }, { name: 'outgoing' }] },
      { name: 'DayDivider', description: 'Centered uppercase day pill (Yesterday / Today) for a transcript', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/DayDivider.tsx' },
      { name: 'ThreadNote', description: 'Centered muted system note inside a conversation', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/ThreadNote.tsx' },
      { name: 'StatCardGroup', description: 'Equal-width row of StatCards (Referrals / OPD / Inpatient)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/StatCardGroup.tsx' },
      { name: 'MedicationInset', description: 'Nested medication detail card for EventCard: name + dosage line, optional status pill; light + dark', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/MedicationInset.tsx', variants: [{ name: 'light' }, { name: 'dark' }, { name: 'with-status' }] },
      { name: 'AppointmentProgress', description: 'Crimson-tinted appointment timeline for EventCard: connected step ticks + labels + times', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/AppointmentProgress.tsx' },
      { name: 'NextCheckupRow', description: 'EventCard footer row: label + crimson date pill + crimson arrow action', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/NextCheckupRow.tsx' },
      { name: 'DrawerOption', description: 'Base BottomDrawer row: crimson-tinted icon tile + title over a muted subtitle', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/DrawerOption.tsx' },
      { name: 'WaveformPlayer', description: 'Voice-note bar: play/pause + crimson waveform that fills as it plays + duration (simulated playback)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/WaveformPlayer.tsx' },
      { name: 'SearchAskSwitch', description: 'Framer-Motion switch between the AI ask bar and a plain search field — active side is the full bar, the other collapses to an icon button; tapping morphs them (AI open by default)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/SearchAskSwitch.tsx', variants: [{ name: 'ask-open' }, { name: 'search-open' }] },
      { name: 'RecordInset', description: 'Lab / report / prescription card nested in an EventCard: title + meta + optional trailing crimson action; light + dark', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/RecordInset.tsx', variants: [{ name: 'light' }, { name: 'dark' }, { name: 'with-action' }] },
      { name: 'TimelineEntryHeader', description: 'Date + category-badge row above each timeline event card', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/TimelineEntryHeader.tsx' },
      { name: 'QuickAccessChip', description: 'White pill shortcut on the patient screen: crimson icon + label', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/QuickAccessChip.tsx' },
      { name: 'ReadStatusToggle', description: 'Pair of pills under the alert: Keep Unread (leading arrow) + Mark as Read (trailing arrow)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/ReadStatusToggle.tsx' },
      { name: 'TrendChart', description: 'Pathology trend line chart (Reports): reference-range band, gridlines, grey→status gradient line, value-labelled points (latest emphasised, out-of-range crimson), month/day axis', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/TrendChart.tsx' },
      { name: 'DayStrip', description: 'Schedule date picker: horizontal scrollable day tiles (dow + date), active crimson + today accent, dot when the day has appointments', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/DayStrip.tsx' },
      { name: 'SuggestionPill', description: 'Tappable prompt suggestion on the Ask AI page: soft white pill with a hairline crimson edge + optional leading icon', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/SuggestionPill.tsx' },
      { name: 'AskMessage', description: 'One Ask AI turn: the doctor’s prompt as a crimson bubble (right) or the assistant reply behind a Sparkles mark (left), with a "thinking" dots state; rich emphasis (**bold** / ~muted~) + a children slot for embedded widgets/CTAs; fades + rises in', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/AskMessage.tsx', variants: [{ name: 'user' }, { name: 'assistant' }, { name: 'thinking' }] },
      { name: 'AskAction', description: 'Call-to-action under an Ask AI answer — a pathway to act on it (open a profile / report / note): white card, hairline crimson edge, leading icon + label + trailing chevron', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/AskAction.tsx' },
    ],
  },
  {
    label: 'Organisms',
    components: [
      { name: 'BottomNavigation', description: 'Bottom tab bar: Home, Patients, Schedule, Chat + center quick action', atomicLevel: 'organism', status: 'built', path: 'components/organisms/BottomNavigation.tsx', variants: [{ name: 'home' }, { name: 'patients' }, { name: 'schedule' }, { name: 'chat' }] },
      { name: 'ScreenHeader', description: 'App header with 5 variants: Default, No Arrow, Doctor, Chat, Title (large display title + optional action)', atomicLevel: 'organism', status: 'built', path: 'components/organisms/ScreenHeader.tsx', variants: [{ name: 'default' }, { name: 'no-arrow' }, { name: 'doctor' }, { name: 'chat' }, { name: 'title' }] },
      { name: 'PatientCard', description: 'Patient list card: name, encounter badge, ward/bed/MRN; default + highlighted', atomicLevel: 'organism', status: 'built', path: 'components/organisms/PatientCard.tsx', variants: [{ name: 'default' }, { name: 'highlighted' }] },
      { name: 'MessageRow', description: 'Chat list row: avatar, name, time, preview; card or flat layout, optional unread count badge', atomicLevel: 'organism', status: 'built', path: 'components/organisms/MessageRow.tsx', variants: [{ name: 'card' }, { name: 'flat' }, { name: 'read' }, { name: 'unread' }] },
      { name: 'AlertCard', description: 'Critical alert spotlight: dark card, crimson eyebrow + counter, status tag + ghost action', atomicLevel: 'organism', status: 'built', path: 'components/organisms/AlertCard.tsx' },
      { name: 'SummaryCard', description: 'Dark day-summary banner. breakdown: collapsible count + label/value rows. agenda: doctor’s-day grid (new / follow-up / urgent / procedures) + next-up row', atomicLevel: 'organism', status: 'built', path: 'components/organisms/SummaryCard.tsx', variants: [{ name: 'breakdown' }, { name: 'agenda' }] },
      { name: 'MessageComposer', description: 'Chat composer with two layout variants: floating (pill over the transcript — attach + input + voice + crimson send) and docked (WhatsApp-style bar — attach + input + camera, trailing mic↔send toggle, Enter sends)', atomicLevel: 'organism', status: 'built', path: 'components/organisms/MessageComposer.tsx', variants: [{ name: 'floating' }, { name: 'docked' }] },
      { name: 'ChatThreadHeader', description: 'Open-chat header: back, patient name + MRN, expand action, care-thread participants', atomicLevel: 'organism', status: 'built', path: 'components/organisms/ChatThreadHeader.tsx' },
      { name: 'UnreadPatientChatsCard', description: 'Home "Needs Attention" card: crimson eyebrow + View All, inset unread-chat rows', atomicLevel: 'organism', status: 'built', path: 'components/organisms/UnreadPatientChatsCard.tsx' },
      { name: 'EventCard', description: 'Clinical timeline event card: icon or collapsible header, light/dark surface, pluggable inset detail (medication, appointment progress, next checkup)', atomicLevel: 'organism', status: 'built', path: 'components/organisms/EventCard.tsx', variants: [{ name: 'icon' }, { name: 'collapsible' }, { name: 'light' }, { name: 'dark' }, { name: 'medication' }, { name: 'appointment' }] },
      { name: 'BottomDrawer', description: 'Bottom sheet over a dimmed scrim: drag handle, title + close, stacked DrawerOption rows; taps on scrim/close dismiss', atomicLevel: 'organism', status: 'built', path: 'components/organisms/BottomDrawer.tsx' },
      { name: 'Timeline', description: 'Vertical clinical timeline: connected rail of dots (active crimson, rest grey) pairing a date + category badge with each event card', atomicLevel: 'organism', status: 'built', path: 'components/organisms/Timeline.tsx' },
      { name: 'LabParameterCard', description: 'Reports parameter card: name + unit, reference range + clinical area, urgent High/Low (crimson) or Normal (green) badge, trend delta, embedded TrendChart; crimson edge when out of range', atomicLevel: 'organism', status: 'built', path: 'components/organisms/LabParameterCard.tsx' },
      { name: 'LabResultsTable', description: 'Reports table view: pathology parameters (rows) × sampling dates (columns, newest first), out-of-range readings in crimson, horizontal scroll', atomicLevel: 'organism', status: 'built', path: 'components/organisms/LabResultsTable.tsx' },
      { name: 'PrescriptionCard', description: 'Prescription list row: status badge + date, title, summary, department · doctor footer', atomicLevel: 'organism', status: 'built', path: 'components/organisms/PrescriptionCard.tsx', variants: [{ name: 'draft' }, { name: 'signed' }] },
      { name: 'NoteCard', description: 'Clinical-note grid card: type badge (progress / initial / discharge), title, body preview, department tag', atomicLevel: 'organism', status: 'built', path: 'components/organisms/NoteCard.tsx', variants: [{ name: 'progress' }, { name: 'initial' }, { name: 'discharge' }] },
      { name: 'AskDock', description: 'Bottom-anchored "Ask me anything" bar (ChatGPT / Claude pattern): wraps the ask SearchBar in a footer that pins just above the tab bar', atomicLevel: 'organism', status: 'built', path: 'components/organisms/AskDock.tsx' },
      { name: 'AppointmentCard', description: 'Schedule day-timeline row: time, type badge (OPD/HD/REF) + status (Scheduled/In lobby/In consult/Completed), patient name, reason · doctor; crimson edge for the in-progress patient', atomicLevel: 'organism', status: 'built', path: 'components/organisms/AppointmentCard.tsx' },
    ],
  },
]

// ── Design token groups (for the docs colour swatches) ───────────────────
export const colorGroups = [
  {
    label: 'Crimson: brand accent',
    description: 'Primary actions, links, FAB, urgent',
    swatches: [
      { name: '5',     hex: '#FCF8F8', dark: false },
      { name: '10',    hex: '#F6E7E7', dark: false },
      { name: '20',    hex: '#FADBDB', dark: false },
      { name: '30',    hex: '#F4AEAE', dark: false },
      { name: 'Base',  hex: '#E54B4B', dark: true  },
      { name: 'Deep',  hex: '#C71212', dark: true  },
      { name: '60',    hex: '#B21010', dark: true  },
      { name: '80',    hex: '#722525', dark: true  },
      { name: 'Error', hex: '#FF4F04', dark: true  },
    ],
  },
  {
    label: 'Charcoal & ink',
    description: 'Primary text, dark surfaces, alert spotlight',
    swatches: [
      { name: 'Base',      hex: '#252323', dark: true  },
      { name: 'Warm',      hex: '#343131', dark: true  },
      { name: '50',        hex: '#4F4D4D', dark: true  },
      { name: 'Spotlight', hex: '#1E1E24', dark: true  },
      { name: 'Oslo',      hex: '#6D7576', dark: true  },
      { name: '20',        hex: '#25232333', dark: false },
      { name: 'WG 130',    hex: '#BABAB5', dark: false },
      { name: 'WG 120',    hex: '#C9C9C5', dark: false },
      { name: 'Warm Grey', hex: '#B6BBBC', dark: false },
    ],
  },
  {
    label: 'Neutrals & surfaces',
    description: 'Warm off-white backgrounds, cards, strokes',
    swatches: [
      { name: 'App bg',    hex: '#F6F3F3', dark: false },
      { name: 'Card',      hex: '#FFFFFF', dark: false },
      { name: 'Sunken',    hex: '#EFEFED', dark: false },
      { name: 'Warm grey', hex: '#DEDEDC', dark: false },
      { name: 'Stroke',    hex: '#D6DBDB', dark: false },
    ],
  },
  {
    label: 'Status',
    description: 'Stable, caution, critical patient states',
    swatches: [
      { name: 'Stable',   hex: '#2D9B6F', dark: true  },
      { name: 'Caution',  hex: '#D97706', dark: true  },
      { name: 'Critical', hex: '#E54B4B', dark: true  },
      { name: 'Pending',  hex: '#6D7576', dark: true  },
    ],
  },
]
