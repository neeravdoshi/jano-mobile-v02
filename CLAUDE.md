# Jano — Doctor Companion · Claude Standing Brief

## What this project is

A healthcare mobile PWA prototype for doctors. Doctors use it to track their day, patients, medications, prescriptions, lab results, and schedule. Built as a **Progressive Web Application** — mimics a native mobile app on both desktop (phone card frame) and real mobile (full screen).

This is a **prototype**. No backend. All data is mocked/static.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Vite + React + TypeScript | Lighter than Next.js; no SSR needed for a prototype |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first; maps cleanly to atomic design |
| Routing | React Router v7 | Simple client-side routing |
| PWA | `vite-plugin-pwa` | Service worker + manifest |
| Class utility | `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts` | Safe conditional Tailwind merging |
| Animations | Framer Motion — **not yet added, deferred** | Add only when user requests |

---

## Design tokens

All tokens live as CSS custom properties in `src/index.css`. **Never hard-code hex values in components** — always use `var(--token-name)`.

### Crimson — brand accent
The Jano red. Primary actions, links, FAB, urgent states.

Values are Figma-accurate (synced from the Jano working file, Crimson frame).

| Token | Hex |
|---|---|
| `--crimson-5` | `#FCF8F8` |
| `--crimson-10` | `#F6E7E7` |
| `--crimson-20` | `#FADBDB` |
| `--crimson-30` | `#F4AEAE` |
| `--crimson-base` | `#E54B4B` |
| `--crimson-deep` | `#C71212` |
| `--crimson-60` | `#B21010` |
| `--crimson-80` | `#722525` |
| `--error-red` | `#FF4F04` (distinct error hue, not a crimson tint) |

### Charcoal & ink
Primary text, dark surfaces, alert spotlight.

Values are Figma-accurate (synced from the Jano working file, Charcoal frame). `--charcoal-base` also backs Figma's "Base Action" and "Base Text" aliases. `--charcoal-spotlight` and `--charcoal-oslo` are pre-existing app tokens not present in the Charcoal frame — kept because components rely on them.

| Token | Hex |
|---|---|
| `--charcoal-base` | `#252323` |
| `--charcoal-warm` | `#343131` |
| `--charcoal-50` | `#4F4D4D` (was `--charcoal-80`; renamed to match Figma "Charcoal 50") |
| `--charcoal-20` | `#25232333` (20% alpha of base) |
| `--charcoal-spotlight` | `#1E1E24` |
| `--charcoal-oslo` | `#6D7576` |
| `--warm-grey-130` | `#BABAB5` |
| `--warm-grey-120` | `#C9C9C5` |
| `--warm-grey` | `#B6BBBC` (Figma "Warm Grey" — inactive bottom-nav items, muted icons) |

### Neutrals & surfaces
Warm off-white backgrounds, cards, strokes, dividers.

| Token | Hex |
|---|---|
| `--neutral-app-bg` | `#F6F3F3` |
| `--neutral-card` | `#FFFFFF` |
| `--neutral-sunken` | `#EFEFED` |
| `--neutral-warm-grey` | `#DEDEDC` |
| `--neutral-stroke` | `#D6DBDB` |

### Status
| Token | Hex |
|---|---|
| `--status-stable` | `#2D9B6F` |
| `--status-caution` | `#D97706` |
| `--status-critical` | `#E54B4B` (= crimson-base) |
| `--status-pending` | `#6D7576` (= charcoal-oslo) |

### Semantic aliases (use these in components, not raw tokens above)
```
--color-brand           → --crimson-base
--color-brand-deep      → --crimson-deep
--color-brand-light     → --crimson-20
--color-brand-subtle    → --crimson-5
--color-surface         → --neutral-app-bg
--color-surface-card    → --neutral-card
--color-surface-sunken  → --neutral-sunken
--color-border          → --neutral-stroke
--color-border-muted    → --neutral-warm-grey
--color-text-primary    → --charcoal-base
--color-text-secondary  → --charcoal-50
--color-text-muted      → --charcoal-oslo
--color-text-inverse    → #FFFFFF
--color-error           → --error-red
```

---

## Typography

**Font: Figtree only** — single typeface across the whole prototype, loaded via `<link>` in `index.html`. (Noto Sans Display from the original Figma export is intentionally dropped.)

**Variables:** Raw tokens in `:root` — `--text-size-*`, `--text-weight-*`, `--text-lh-*`, `--font-sans`.

**Text style utilities** — apply as a single class, mirrors Figma text styles. Defined in `src/index.css` via `@layer utilities`. All Figtree.

**Display scale** — added for mobile screen hero titles and big metric numbers (the original Figma scale topped out at 20px, too small for page headers). Bold, with negative letter-spacing.

| Class | Size | Weight | Line Height | Use for |
|---|---|---|---|---|
| `type-display-l` | 48px | 700 | 1.1 | Hero metric numbers (step count, big stats) |
| `type-display-m` | 32px | 700 | 1.1 | Screen / page hero titles |
| `type-display-s` | 24px | 700 | 1.2 | Card stat values, secondary screen titles |

**UI scale** — unchanged from the Figma export. For list rows, cards, buttons, labels.

| Class | Size | Weight | Line Height |
|---|---|---|---|
| `type-title-xl` | 20px | 500 | auto |
| `type-title-l` | 18px | 600 | auto |
| `type-title-m` | 16px | 600 | auto |
| `type-title-s` | 14px | 600 | auto |
| `type-title-xs` | 12px | 500 | 1.2 |
| `type-body-m` | 16px | 400 | auto |
| `type-body-text-m` | 14px | 400 | 20px |
| `type-body-s` | 14px | 600 | 20px |
| `type-body-xs` | 12px | 400 | auto |
| `type-action-l` | 18px | 600 | auto |
| `type-action-m` | 16px | 600 | 20px |
| `type-action-s` | 14px | 600 | 20px |
| `type-overline-xs` | 12px | 500 | auto |

**Rule:** never hard-code font sizes or weights in components — always use a `type-*` class.

---

## Spacing & radius tokens

> **STRICT RULE — no exceptions:** Every padding, margin, gap, inset, width/height derived from spacing, and border-radius value in every component MUST use one of the tokens below. Arbitrary pixel values (`px-3`, `gap-[13px]`, `rounded-[11px]`, `style={{ padding: 15 }}`) are forbidden. If a value is needed that doesn't exist in the scale, raise it — don't work around it.

All tokens live in `src/index.css` `:root`.

### Spacing scale (`--space-*`)
Derived from Figma's Size token frame (2 px base, values visible: 2 / 4 / 6 / 8 / 12 / 14 / 16 / 18 / …).

| Token | Value | Common use |
|---|---|---|
| `--space-2`  | 2px  | Icon gap, hairline insets |
| `--space-4`  | 4px  | Tight chip padding, badge insets |
| `--space-6`  | 6px  | Variant tag padding |
| `--space-8`  | 8px  | Small component padding, icon size |
| `--space-12` | 12px | Default horizontal button padding |
| `--space-14` | 14px | Vertical button / input padding |
| `--space-16` | 16px | Screen horizontal padding |
| `--space-18` | 18px | Section row padding |
| `--space-20` | 20px | Card padding (tight) |
| `--space-24` | 24px | Card padding (standard) |
| `--space-28` | 28px | Section gap |
| `--space-32` | 32px | Large section gap |
| `--space-40` | 40px | Section vertical padding |
| `--space-48` | 48px | Page top padding |
| `--space-56` | 56px | Header height |
| `--space-64` | 64px | Tab bar clearance |
| `--space-80` | 80px | Large hero spacing |
| `--space-96` | 96px | Extra-large layout gap |

### Border radius scale (`--radius-*`)

| Token | Value | Common use |
|---|---|---|
| `--radius-2`    | 2px    | Inner nested elements, hairline |
| `--radius-4`    | 4px    | Chips, variant tags, code blocks |
| `--radius-6`    | 6px    | Small badges, colour swatches |
| `--radius-8`    | 8px    | Icon containers, thumbnails |
| `--radius-10`   | 10px   | Inputs, list rows, small cards |
| `--radius-12`   | 12px   | Cards, modals, bottom sheets |
| `--radius-16`   | 16px   | Large cards, panels |
| `--radius-20`   | 20px   | Pill buttons, tab items |
| `--radius-24`   | 24px   | FAB, large pills |
| `--radius-32`   | 32px   | Drawers, sheets |
| `--radius-44`   | 44px   | Phone shell (= `--shell-radius`) |
| `--radius-full` | 9999px | Circles, fully-rounded pills |

### Elevation / shadows (`--shadow-*`)

All `box-shadow` values must use one of these tokens — no raw rgba strings in components.

**Soft** — diffuse, ambient. Use for cards, panels, bottom sheets, modals.

| Token | Use |
|---|---|
| `--shadow-soft-xs` | Barely lifted — tight list rows |
| `--shadow-soft-sm` | Default card shadow |
| `--shadow-soft-md` | Floating panel, dropdown |
| `--shadow-soft-lg` | Modal, bottom sheet |
| `--shadow-soft-xl` | Phone shell, large overlay |

**Hard** — sharp, defined edges. Use for FAB, active states, tooltips.

| Token | Use |
|---|---|
| `--shadow-hard-xs` | Subtle button press |
| `--shadow-hard-sm` | Small interactive element |
| `--shadow-hard-md` | Focused input, active card |
| `--shadow-hard-lg` | FAB, elevated action |
| `--shadow-hard-xl` | Maximum emphasis |

---

## Iconography

**Library: [Lucide](https://lucide.dev) via `lucide-react`.**  
Use Lucide for every icon in the app — no inline SVGs, no other icon libraries.

```tsx
import { Stethoscope, Calendar, User, Bell } from 'lucide-react'

<Stethoscope size={20} strokeWidth={1.5} />
```

**Rules:**
- Always import the named icon directly from `lucide-react` — never import the whole library.
- Default `size`: 20 for nav/action icons, 16 for inline/label icons, 24 for empty states.
- Default `strokeWidth`: 1.5 (lighter, matches the Figma icon style). Use 2 only for emphasis.
- Default `color`: inherit from the parent's `color` CSS property — don't hardcode colours on the icon.
- The Figma design system has a custom icon set; when implementing, find the closest Lucide equivalent and note the mapping in the component file.

**Frequently used icons in Jano context:**

| Concept | Lucide icon |
|---|---|
| Home / Dashboard | `House` |
| Patients | `Users` |
| Schedule / Calendar | `Calendar` |
| Medications | `Pill` |
| Prescriptions | `ClipboardList` |
| Notes | `FileText` |
| Alerts / Notifications | `Bell` |
| Search | `Search` |
| Filter | `SlidersHorizontal` |
| Settings | `Settings` |
| User / Profile | `User` |
| Vitals / Activity | `Activity` |
| Lab results | `FlaskConical` |
| Stethoscope | `Stethoscope` |
| Add / Plus | `Plus` |
| Close | `X` |
| Back / Chevron | `ChevronLeft` |
| More options | `MoreHorizontal` |
| Clock / Time | `Clock` |

---

## Atomic design structure

```
src/
  components/
    atoms/          # Primitives: Button, Badge, Input, Icon, Avatar, StatusDot…
    molecules/      # Composed: SearchBar, FormField, NavItem…
    organisms/      # Full sections: TabBar, ScreenHeader, PatientRow, NoteCard, AlertCard…
    templates/      # MobileShell, AppLayout, DocsPanel
  pages/            # One file per route: DashboardPage, PatientsPage, SchedulePage…
  hooks/            # Custom React hooks
  lib/              # utils.ts (cn), componentRegistry.ts
  types/            # Domain types: Patient, Medication, Prescription, DoctorTask, etc.
  routes/           # React Router config (index.tsx)
```

**Rule:** every component lives in the correct atomic layer. Identify the level from Figma before writing any code.

---

## Mobile shell & desktop layout

### Phone shell (`MobileShell.tsx`)
- **Desktop:** white card (`--neutral-card`), 390 × 844 px, 44 px border-radius, soft box-shadow. Light grey (`--neutral-warm-grey`) Dynamic Island pill at top. Home indicator bar at bottom.
- **Mobile:** full-screen, no chrome.
- Background behind the card: `--neutral-app-bg` (warm off-white `#F6F3F3`).

### Desktop layout (`AppLayout.tsx`)
- Phone card centred in the full viewport on `--neutral-app-bg`.
- **Design System button** — pill (grid icon + "Design System" label) anchored to the top-right corner of the phone card, sticking out to the right via `top: 0; left: 100%; margin-left: 20px`. Desktop-only. Links to `/design-system`.
- No persistent docs sidebar — docs are a separate route.

### Design System page (`/design-system` → `DesignSystemPage.tsx`)
A full-page documentation experience — completely outside the phone shell layout. Structure:
- **Fixed header** — Jano logo + "Design System" wordmark, "← Back to app" link.
- **Left sidebar (240 px)** — sticky nav with anchor links: Overview, Colors (4 sub-items), Typography (2 sub-items), Components (Atoms / Molecules / Organisms). Active item highlighted in crimson with a left border.
- **Main content (scrollable)** — all sections rendered as a single long page with `scrollIntoView` navigation. IntersectionObserver tracks the active section.

> **STRICT RULE — every component must be documented in the design system.** No component is "done" until it appears on the `/design-system` page. This is two steps, both required:
> 1. **Register it** — update `componentRegistry.ts`: set status to `'built'` and list its variant names. This adds the metadata row (name, description, status pill, variant tags).
> 2. **Add a live preview** — add an entry to the `componentPreviews` map in `DesignSystemPage.tsx`, keyed by the exact component name, showing every meaningful variant/state. Built components without a preview entry render only a bare metadata row — that is considered incomplete. If the preview needs state (controlled inputs, active tabs, etc.), add a small stateful preview wrapper component (see `FilterTabsPreview` / `BottomNavPreview`).
>
> The registry feeds the row; the preview map feeds the rendered example. Both must be updated in the same change that builds the component.

---

## Design reference screenshots (Dribbble, Mobbin, etc.)

Screenshots from Dribbble, Mobbin, or similar inspiration sites are **layout references only** — not design specs. When one arrives:

1. **Ignore the source app's branding** — colours, fonts, logos, and any Mobbin/Dribbble chrome (including the black Mobbin bar at the bottom) are irrelevant.
2. **Extract layout intent only** — identify the structural pattern: what sections exist, how they are arranged, what hierarchy is conveyed.
3. **Adapt strictly to the Jano design system** — rebuild every element using Jano tokens (`--color-*`, `--crimson-*`, `--charcoal-*`, etc.), `type-*` classes, and existing components. Never copy the reference's colours, font sizes, or spacing literally.
4. **Apply Jano content** — replace all copy, data, and imagery with doctor-context content appropriate to a healthcare companion app.
5. Follow the same atomic-level identification and component conventions as the Figma workflow below.

---

## Figma workflow

When a Figma artifact arrives:
1. Identify its atomic level (atom / molecule / organism / template).
2. Build it as a **reusable, variant-driven** component in the correct folder.
3. Export it from an `index.ts` barrel in that folder.
4. Use design tokens via CSS variables — not Tailwind's built-in colour palette for brand colours.
5. Accept a `className` prop (via `cn()`) on every component for override flexibility.
6. Update `componentRegistry.ts`: set status to `'built'`, add variants.
7. **Add a live preview to the `componentPreviews` map in `DesignSystemPage.tsx`** — every built component must render an example on `/design-system` (see the strict rule above).
8. Update CLAUDE.md update log.

---

## Component conventions

- One component per file, named identically to the file.
- Props interface: `<ComponentName>Props`, defined in the same file.
- Use `cn()` from `@/lib/utils` for all conditional className logic.
- No comments unless the *why* is genuinely non-obvious.
- No inline styles except for CSS variable references Tailwind can't express.
- Variants expressed as a `variant` prop with a variants map object — not separate components.
- **Every component must be added to the design system docs** — register it in `componentRegistry.ts` *and* add a live preview to `componentPreviews` in `DesignSystemPage.tsx`. A component is not done until it renders on `/design-system`.

---

## Preview & verification

A dev server runs as **`jano-dev`** (`.claude/launch.json`, port 5173; server ID varies per session). When confirming a change works, **always use the cheapest tool that answers the question.** Screenshots are the last resort, never the default.

### Verification cost ladder — cheapest first

| # | Tool | Use for | Cost |
|---|---|---|---|
| 1 | `npx tsc --noEmit` | Type correctness. Run after every change. | Free |
| 2 | `preview_inspect` (Claude Preview MCP) | Verifying colours, font sizes, spacing, dimensions — returns computed styles + box for a selector. Exact, no image. | Cheap |
| 3 | `preview_eval` (Claude Preview MCP) | Verifying interaction / active-state / routing — runs JS in the page, reads DOM/state/classes, can click & navigate. Returns JSON. | Cheap |
| 4 | **Claude Chrome extension** (`mcp__Claude_in_Chrome__*`) | DOM/text reads (`get_page_text`, `read_page`, `find`) when checking "is the right text/element present?". | Cheap |
| 5 | `preview_screenshot` *or* Chrome screenshot | Layout / visual composition that genuinely needs human eyes. | Expensive |

### Rules
- **Check for the Claude Chrome extension first** whenever a visual check is tempting. The user has it installed; if it's connected, a DOM/text read there is usually a cheaper preview path than rendering a screenshot. Reach for a screenshot only after ruling out the cheaper rungs.
- **Prefer `preview_inspect`/`preview_eval` over screenshots** to verify colours, sizes, spacing, and state — they give exact values a screenshot can only approximate.
- **Screenshot frugality** — take one only when multiple components land at once, a full page is implemented, or a visually significant change needs verifying. Skip for single small atoms, config/type tweaks, or any change where the diff makes the result obvious.

### Commands

```bash
npm run dev      # dev server → http://localhost:5173
npm run build    # production build
npm run preview  # preview production build locally
npx tsc --noEmit # type-check only
```

---

## What is not built yet

- [x] Login screen (`/login` → `LoginPage.tsx`)
- [x] Button atom (primary / outline / ghost / destructive, sizes sm/md/lg)
- [x] Input atom (bare input with error state)
- [x] FormField molecule (label + Input + error/hint)
- [x] DividerWithLabel molecule (OR separator)
- [x] SocialAuthButton molecule (OAuth provider button)
- [x] Bottom tab bar navigation (BottomNavigation organism + NavItem molecule)
- [x] Badge atom (yellow / green / grey / blue / red / black, full-pill, 10px uppercase)
- [x] FilterPill molecule (selected/unselected × with/without count)
- [x] ScreenHeader organism (Default / No Arrow / Doctor / Chat variants)
- [x] SearchBar molecule (default + with-filter variants)
- [x] FilterTabs molecule (scrollable row of FilterPills, active state)
- [x] PatientCard organism (default + highlighted variants)
- [x] Patients list page (`/patients`) — header + search + filter tabs + live filtered list; Sign in routes here
- [x] Avatar atom (circular initials, colour variants sharing Badge tokens)
- [x] MessageRow organism (chat list row — read + unread variants)
- [x] Chat page (`/chat`) — header + search + filter tabs + white-card message list; live filter + name search
- [x] AlertCard organism (critical alert spotlight — dark card, crimson eyebrow + counter, status tag + ghost action)
- [x] Open chat conversation (`/chat/:id`) — ChatThreadHeader + day dividers + bubbles + thread note + floating MessageComposer (transcript scrolls behind it)
- [ ] Remaining atoms: Icon
- [ ] Any organisms: NoteCard
- [ ] Framer Motion page transitions (deliberately deferred)
- [ ] Real PWA icons (placeholder paths in vite.config.ts)
- [ ] Dark mode

---

## Update log

| Date | Change |
|---|---|
| 2026-06-19 | Initial scaffold: Vite + React + Tailwind + PWA + atomic structure |
| 2026-06-19 | Applied Jano design system: Figtree font, Crimson/Charcoal/Neutral tokens, white-card phone shell |
| 2026-06-19 | Design System page at `/design-system` — docs layout with sidebar nav, color swatches, type scale, component registry. DS button on phone frame corner. |
| 2026-06-19 | Applied Jano design system: Figtree font, Crimson/Charcoal/Neutral tokens, simplified white-card phone shell, desktop docs panel |
| 2026-06-19 | Added typography system: named `type-*` utility classes + raw size/weight/line-height tokens |
| 2026-06-19 | Typography: dropped Noto (Figtree-only); added `type-display-s/m/l` (24/32/48px) for mobile screen titles & hero numbers |
| 2026-06-19 | Colors synced to Figma: added crimson-10/60, error-red, charcoal-20, warm-grey-130/120; renamed charcoal-80 → charcoal-50 |
| 2026-06-19 | Built Button + Input atoms; FormField, DividerWithLabel, SocialAuthButton molecules; LoginPage at /login |
| 2026-06-19 | Built BottomNavigation organism + NavItem molecule (Figma node 153-2917). Wired route-aware into MobileShell/AppLayout; added /chat route + ChatPage; added `--warm-grey` token |
| 2026-06-19 | Documented Preview & verification cost ladder (tsc → inspect → eval → Chrome extension → screenshot); check Claude Chrome extension before screenshotting |
| 2026-06-19 | Added spacing + radius + elevation tokens; Spacing & Radius and Elevation sections in Design System docs |
| 2026-06-19 | Button radius fixed to `--radius-12` (Figma); Badge atom (6 colours); FilterPill molecule (4 states); ScreenHeader organism (4 variants, Dynamic Island safe-area) |
| 2026-06-19 | Login uses real `jano-mark.svg` logo (left-aligned); Sign in simulates auth → `/patients` |
| 2026-06-19 | Built SearchBar + FilterTabs molecules, PatientCard organism (Figma 178-5983 / 181-6450 / 181-6899 / 112-2337); assembled Patients list page with live encounter-type filter + name/MRN search; added `encounterType`/`bed` to Patient type + mock roster |
| 2026-06-19 | Built Avatar atom + MessageRow organism (Figma 181-6548 / 206-7984); assembled Chat page `/chat` (Figma 206-7488) reusing ScreenHeader/SearchBar/FilterTabs — white-card message list, data-driven channel counts, live filter + name search; added `ChatThread` type + `chatThreads` mock |
| 2026-06-19 | Added live previews for all built components to `/design-system` (Badge, Avatar, FilterPill, FilterTabs, SearchBar, NavItem, BottomNavigation, ScreenHeader, PatientCard, MessageRow); made design-system documentation a strict rule — every component must register + add a `componentPreviews` entry |
| 2026-06-19 | Built AlertCard organism (Figma 155-3302) — critical alert spotlight: charcoal-base card, crimson-30/25% border, crimson eyebrow + "1 / 3" counter, white title, warm-white body, crimson status tag + ghost action; live preview in DS |
| 2026-06-19 | Built SummaryCard organism (Figma 181-7113 collapsed / 182-6514 expanded) — collapsible charcoal banner: count + title + chevron toggle, expands to a crimson-20/10% panel of label/value rows with hairline dividers; collapsed + expanded previews in DS |
| 2026-06-19 | Added distilled Patients list via /distill — same content, but the 8 bordered cards collapse into one white surface with hairline-divided rows (badge inline beside name, map-pin dropped, `--space-8` between name & meta lines); /clarify copy (sentence-case search placeholder, actionable empty state). Crimson "Version" toggle pill in AppLayout, desktop-only, shown only on the patients screens |
| 2026-06-19 | Made the distilled list the **default** patients screen = "Version 1" (`/patients` → `PatientsV2Page`); classic boxed cards demoted to "Version 2" (`/patients-v2` → `PatientsPage`). Note the file names are now inverted vs the labels — route comments document the mapping |
| 2026-06-19 | Built open chat conversation `/chat/:id` (Figma 206-7780, adapted to the preferred older look). Molecules: ChatBubble (incoming/outgoing, squared outer-top corner, white vs crimson-5 tint), DayDivider, ThreadNote. Organisms: MessageComposer (floating: attach/input/voice/crimson-send), ChatThreadHeader (back, name+MRN, expand, care-thread participants). Composer floats absolutely; transcript scrolls behind it (bottom padding clears it). Added ChatMessage/ChatConversation types + `careConversation` mock; ChatPage rows now navigate into the thread. DS previews + registry for all 5 new components |
