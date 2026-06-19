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

// ── Registry — updated as components are built ────────────────────────────
export const componentRegistry: RegistrySection[] = [
  {
    label: 'Atoms',
    components: [
      { name: 'Icon', description: 'Lucide icon (lucide-react). Use named imports only — never inline SVGs or other libraries.', atomicLevel: 'atom', status: 'planned' },
      { name: 'Badge', description: 'Label badge — 6 colour variants, full-pill, 10px uppercase', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Badge.tsx', variants: [{ name: 'yellow' }, { name: 'green' }, { name: 'grey' }, { name: 'blue' }, { name: 'red' }, { name: 'black' }] },
      { name: 'Button', description: 'Primary, outline, ghost and destructive actions', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Button.tsx', variants: [{ name: 'primary' }, { name: 'outline' }, { name: 'ghost' }, { name: 'destructive' }] },
      { name: 'Input', description: 'Bare text input with error state', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Input.tsx', variants: [{ name: 'default' }, { name: 'error' }] },
      { name: 'Avatar', description: 'Circular initials avatar — colour variants share the Badge tokens', atomicLevel: 'atom', status: 'built', path: 'components/atoms/Avatar.tsx', variants: [{ name: 'grey' }, { name: 'red' }, { name: 'green' }, { name: 'blue' }, { name: 'yellow' }] },
    ],
  },
  {
    label: 'Molecules',
    components: [
      { name: 'SearchBar', description: 'Pill search field — with or without trailing filter button', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/SearchBar.tsx', variants: [{ name: 'default' }, { name: 'with-filter' }] },
      { name: 'FormField', description: 'Label + Input + error/hint — spreads all input props', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/FormField.tsx' },
      { name: 'DividerWithLabel', description: 'Horizontal rule with centered text label (e.g. OR)', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/DividerWithLabel.tsx' },
      { name: 'SocialAuthButton', description: 'Outline button with icon + label for OAuth providers', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/SocialAuthButton.tsx' },
      { name: 'FilterPill', description: 'Filter chip — selected/unselected × with/without count', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/FilterPill.tsx', variants: [{ name: 'selected' }, { name: 'unselected' }, { name: 'selected+count' }, { name: 'unselected+count' }] },
      { name: 'FilterTabs', description: 'Horizontal scrollable row of FilterPills with active state', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/FilterTabs.tsx' },
      { name: 'NavItem', description: 'Single bottom-nav item — icon + label, active/inactive', atomicLevel: 'molecule', status: 'built', path: 'components/molecules/NavItem.tsx', variants: [{ name: 'active' }, { name: 'inactive' }] },
    ],
  },
  {
    label: 'Organisms',
    components: [
      { name: 'BottomNavigation', description: 'Bottom tab bar — Home, Patients, Schedule, Chat + center quick action', atomicLevel: 'organism', status: 'built', path: 'components/organisms/BottomNavigation.tsx', variants: [{ name: 'home' }, { name: 'patients' }, { name: 'schedule' }, { name: 'chat' }] },
      { name: 'ScreenHeader', description: 'App header — 4 variants: Default, No Arrow, Doctor, Chat', atomicLevel: 'organism', status: 'built', path: 'components/organisms/ScreenHeader.tsx', variants: [{ name: 'default' }, { name: 'no-arrow' }, { name: 'doctor' }, { name: 'chat' }] },
      { name: 'PatientCard', description: 'Patient list card — name, encounter badge, ward/bed/MRN; default + highlighted', atomicLevel: 'organism', status: 'built', path: 'components/organisms/PatientCard.tsx', variants: [{ name: 'default' }, { name: 'highlighted' }] },
      { name: 'MessageRow', description: 'Chat list row — avatar, name, time, preview; optional unread count badge', atomicLevel: 'organism', status: 'built', path: 'components/organisms/MessageRow.tsx', variants: [{ name: 'read' }, { name: 'unread' }] },
      { name: 'NoteCard', description: 'Clinical progress note card', atomicLevel: 'organism', status: 'planned' },
      { name: 'AlertCard', description: 'Feedback alert — info, warning, critical', atomicLevel: 'organism', status: 'planned' },
    ],
  },
]

// ── Design token groups (for the docs colour swatches) ───────────────────
export const colorGroups = [
  {
    label: 'Crimson — brand accent',
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
