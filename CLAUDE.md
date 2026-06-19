# Jano — Doctor Companion · Claude Standing Brief

## What this project is

A healthcare mobile PWA prototype for doctors. Doctors use it to track their day, patients, medications, prescriptions, lab results, and schedule. Built as a **Progressive Web Application** — mimics a native mobile app on both desktop (phone card frame) and real mobile (full screen).

This is a **prototype**. No backend. All data is mocked/static.

---

## Git workflow

> **STRICT RULE:** Never `git commit` or `git push` to `main` (or any branch) unless the user explicitly asks for it in that message. Make and verify changes in the working tree and stop there. Wait for an explicit "commit", "push", or equivalent instruction before running either command.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Vite + React + TypeScript | Lighter than Next.js; no SSR needed for a prototype |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first; maps cleanly to atomic design |
| Routing | React Router v7 | Simple client-side routing |
| PWA | `vite-plugin-pwa` | Service worker + manifest |
| Class utility | `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts` | Safe conditional Tailwind merging |
| Animations | Framer Motion — **added** (first use: SearchBar `ask` variant rotating gradient ring). Use sparingly + `useReducedMotion`; animate transform/opacity only | Added on user request |

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

## AI-native interaction — the Ask bar

Jano is built to feel **AI-native**: the "Ask me anything" bar is a primary, ever-present affordance, not a buried search box. It mirrors how people use ChatGPT and Claude — the prompt input lives **pinned at the bottom of the screen, just above the tab bar**, always within thumb reach.

- **Pattern:** the ask `SearchBar` (`variant="ask"`) is wrapped by the **`AskDock`** organism, which renders it as a footer that stays anchored at the bottom while page content scrolls behind it.
- **Placement rule:** on any screen that offers "Ask me anything", dock it at the bottom via `AskDock` — render it as the **last child of the full-height flex-column page**, after the scrollable content area, so it pins above the `BottomNavigation`. Never place the ask bar inline in the scroll flow.
- **Current screens:** Home (`/dashboard`, `/dashboard-v2`) and Patient Reports (`/patients/:id/reports`). Add the dock to future screens that warrant an AI entry point rather than re-inlining a search field.
- **Modes:** `AskDock` (via SearchBar) supports launcher mode (`onActivate` → opens the full Ask AI page `/ask`) and composer mode (`onSubmit`). The Ask AI page itself hides the tab bar and uses the ask bar as the live composer.

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
- **Pages compose components — never hand-roll shared chrome.** Headers, composers, list rows, etc. must come from the organism/molecule layer. If a screen (including a Version 2 / experimental variant) needs a header the current components can't express, **add a variant or prop to the existing component** (e.g. `ScreenHeader` `title` variant) rather than inlining a one-off `<h1>` + buttons in the page. Version variants are layout experiments, not an excuse to bypass the system.

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

## Build status

### Atoms
- [x] Button (primary / outline / ghost / destructive · sm/md/lg)
- [x] Input (bare input with error state)
- [x] Badge (yellow / green / grey / blue / red / black / **crimson** — solid urgent red, white text; full-pill, 10px uppercase)
- [x] Avatar (circular initials + image, colour variants sharing Badge tokens)
- [x] StatCard (white tile: value + Lucide icon + uppercase crimson-80 caption)
- [x] Fab (floating action button: 64px crimson circle + white plus; morphs to white surface + crimson × when `open`; pairs with BottomDrawer)
- [ ] Icon

### Molecules
- [x] FormField (label + Input + error/hint)
- [x] DividerWithLabel (OR separator)
- [x] SocialAuthButton (OAuth provider button)
- [x] FilterPill (selected/unselected × with/without count)
- [x] FilterTabs (scrollable row of FilterPills, active state)
- [x] SearchBar (default + with-filter variants)
- [x] NavItem (bottom-nav item, active/inactive)
- [x] StatCardGroup (equal-width row of StatCards)
- [x] MessageBubble (conversation bubble, two layout variants: `classic` — sender + time above, squared outer-top corner — and `whatsapp` — tail, inline time + read ticks; each incoming/outgoing)
- [x] DayDivider (centered uppercase day pill)
- [x] ThreadNote (centered muted system note)
- [x] RecordInset (lab/report/prescription inset for EventCard — title + meta + optional crimson action; light/dark)
- [x] TimelineEntryHeader (date + category-badge row above each timeline event)
- [x] QuickAccessChip (white pill shortcut — crimson icon + label)
- [x] ReadStatusToggle (Keep Unread / Mark as Read pill pair)
- [x] TrendChart (pathology trend line chart — reference band, gridlines, grey→status gradient line, value-labelled points, month/day axis)
- [x] DayStrip (Schedule date picker — horizontal day tiles, active crimson + today accent, appointment dot)
- [x] SuggestionPill (Ask AI prompt suggestion — soft white pill, hairline crimson edge, optional leading icon)
- [x] AskMessage (Ask AI turn — user crimson bubble / assistant Sparkles + text / "thinking" dots; fades + rises in)

### Organisms
- [x] BottomNavigation (Home / Patients / Schedule / Chat + center quick action)
- [x] ScreenHeader (default / no-arrow / doctor / chat / **title**)
- [x] PatientCard (default + highlighted)
- [x] MessageRow (chat list row — **card** + **flat** layouts, read/unread)
- [x] AlertCard (critical alert spotlight — dark card, eyebrow + counter, status tag + ghost action)
- [x] SummaryCard (dark day banner — **breakdown**: collapsible count + rows · **agenda**: doctor's-day grid + next-up)
- [x] MessageComposer (chat composer, two layout variants: `floating` — pill over the transcript, attach + input + voice + send — and `docked` — WhatsApp-style bar, attach + input + camera, trailing mic↔send toggle, Enter sends)
- [x] ChatThreadHeader (open-chat header: back, name+MRN, expand, participants)
- [x] UnreadPatientChatsCard ("Needs Attention" card with inset unread rows)
- [x] Timeline (vertical clinical rail — active crimson dot + line, grey for older; pairs date+badge with each EventCard)
- [x] LabParameterCard (Reports parameter card — status badge, range, latest vs previous + delta, embedded TrendChart; crimson edge out of range)
- [x] LabResultsTable (Reports table view — parameters × dates grid, newest-first, out-of-range in crimson, horizontal scroll)
- [x] AppointmentCard (Schedule day-timeline row — time, type badge + status chip, patient name, reason · doctor; crimson edge for the in-progress patient)
- [ ] NoteCard

### Pages
- [x] Login (`/` index → `LoginPage`) — real `jano-mark.svg` logo; Sign in simulates auth → `/dashboard`
- [x] Home / dashboard — **V1 agenda / doctor's-day summary** (`/dashboard`, default) + **V2 dialysis-breakdown summary** (`/dashboard-v2`); stat cards + search + needs-attention
- [x] Patients list — **V1 distilled** (`/patients`, default) + **V2 classic cards** (`/patients-v2`); live encounter-type filter + name/MRN search
- [x] Chat list — **V1 cards** (`/chat`, default) + **V2 WhatsApp-style flat** (`/chat-v2`); shared `ScreenHeader` title variant
- [x] Open chat conversation — **V1 floating composer** (`/chat/:id`) + **V2 WhatsApp-style** (`/chat/:id/v2`, functional send)
- [x] Patient detail (`/patients/:id`) — header + AlertCard + read-status toggle + Quick Access chips + Clinical Record timeline (EventCards on a rail) + FAB → add-to-record drawer; reached from the patient list
- [x] Patient reports (`/patients/:id/reports`) — pathology trends: Chart/Table toggle, search + category filter, out-of-range / within-range groups of LabParameterCards (with TrendChart line charts) or LabResultsTable; reached from the Reports quick-access chip
- [x] Ask AI (`/ask?from=home|reports`) — agent entry point reached by tapping the magical `ask` SearchBar anywhere; floating crimson glow, context greeting + suggestion pills, mocked clinical conversation (pill or typed prompt → scripted reply + follow-ups), back runs the entry animation in reverse. No bottom nav
- [x] Design System (`/design-system`) — live component previews
- [x] Schedule (`/schedule`) — doctor's-day appointments: DayStrip date picker + doctor filter + appointment timeline (AppointmentCard); tap → detail sheet (AppointmentProgress stage rail + last visit + View patient); FAB → new-appointment sheet

### Cross-cutting
- [x] Desktop "Version" toggle pill (AppLayout) — swaps V1/V2 on patients + chat screens
- [x] Real PWA icons (regenerated from `jano-logo.png`, square/centered + maskable)
- [ ] Framer Motion page transitions (deliberately deferred)
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
| 2026-06-19 | Composer reads `currentDoctor.name` ("Reply as Dr. Girish Sharma"); chat opens scrolled to the newest message |
| 2026-06-19 | Built open chat **V2** `/chat/:id/v2` — WhatsApp-inspired, in-token. New `MessageBubble` molecule (tail via radius, inline time + read ticks via Check/CheckCheck, crimson when read, colour-coded group sender) and `ChatComposer` organism (docked; attach + input + camera; trailing button is mic when empty, crimson send when typing; Enter sends). Functional: local message state, send appends an outgoing bubble + clears input + auto-scrolls + ticks flip to read after 1.2s. Added `ChatMessageStatus` to the type. AppLayout version-toggle pill generalized via `versionToggle(pathname)` to cover patients + chat-thread screens. DS previews + registry added |
| 2026-06-19 | V2 chat backdrop: faint Lucide-derived medical-glyph motif (`src/assets/chat-motif.svg`, ~5% opacity, 200×200 tile = even 3×3 grid of scale-0.7 glyphs, `backgroundSize: 150px` for a delicate dense texture) tiled behind the transcript, fixed so messages scroll over it. NOTE: Vite inlines small SVGs as `data:` URIs containing parens + single quotes — CSS `url()` must be **double-quoted** (`url("${motif}")`) or the browser silently drops it to `none`. On-screen icon size = glyphScale × (backgroundSize ÷ viewBox), so to change density without resizing icons, scale backgroundSize and viewBox together |
| 2026-06-19 | Built chat **list V2** `/chat-v2` (WhatsApp-style, in-token). Page `ChatV2Page` (rows inline, mirrors the `PatientsV2Page` distilled pattern — no shared component). Drops the doctor `ScreenHeader` for a `type-display-m` "Messages" title + crimson compose button (SquarePen); reuses SearchBar + FilterTabs (All/Patients/Team). The V1 floating row-cards collapse into one **full-bleed white band with indented hairline dividers** (border rides the content column so it insets past the 48px photo avatar). Unread keeps the MessageRow convention: crimson time, `type-body-s`/`charcoal-50` preview, crimson count badge. Rows open the V2 thread (`/chat/:id/v2`). `versionToggle()` extended for `/chat ↔ /chat-v2`; V1 stays default |
| 2026-06-19 | PWA install polish: regenerated icons from `jano-logo.png` (square, centered) so the home-screen icon isn't off-center; added separate `icon-512-maskable.png` (white bg) for PWABuilder. Headers: replaced the fixed 48px Dynamic-Island spacer with a responsive `.header-safe-top` (48px desktop to clear the island, `max(env(safe-area-inset-top),12px)` on mobile) — kills the dead white space at the top of the installed PWA. `ScreenHeader` title → `type-title-l` (18px) to match the patient-name header |
| 2026-06-19 | Folded the inline `/chat-v2` rows into `MessageRow` as a **`flat` variant** (vs the existing `card`): full-bleed, 48px avatar, `showDivider` hairline, crimson time on unread, 20px badge. `ChatV2Page` now composes `<MessageRow variant="flat" showDivider={i!==0} />` instead of bespoke markup; registry + DS preview updated to show card vs flat. (Earlier note above re "rows inline, no shared component" is now superseded.) |
| 2026-06-20 | Reports feedback pass on `LabParameterCard`: **dropped the latest/previous result grid** (the values already sit on the `TrendChart` below — was redundant), rebalanced the card (name → `type-title-m`, range+clinical → `type-body-text-m`, delta → `type-body-s`; merged clinical area into the range line; delta row now reads "+0.6 · Increased since Apr 2026"). Added a **`crimson` Badge colour** (`--badge-crimson-bg` = `--crimson-deep`, white text) for urgency — out-of-range High/Low now use solid crimson, Normal stays soft green. Badge registry/DS preview + token table updated. |
| 2026-06-20 | Built the **Schedule flow** `/schedule` → rebuilt `SchedulePage` (was a placeholder), adapted from the older prototype's schedule (`Jano_Prototype_Refined_ND/src/pages/schedule`) into the Jano design system, atomic. New molecule **`DayStrip`** (horizontal day-of-week picker: active crimson + today accent + appointment dot) and organism **`AppointmentCard`** (time gutter + divider, type `Badge` OPD/HD/REF + status chip Scheduled/Confirmed/In lobby[amber]/In consult[crimson]/Completed[grey], patient name, reason · doctor; crimson edge for the in-progress patient). Page: `ScreenHeader` title "Schedule" + day-label eyebrow → `DayStrip` → doctor `FilterTabs` → appointment list; tap a card → detail `BottomDrawer` (reuses **`AppointmentProgress`** for the reached-stage rail + last-visit summary + "View patient" → patient detail); `Fab` → new-appointment `BottomDrawer` (name `Input` + type/doctor/slot choice chips, appends to the active day's local state). Added `ScheduleAppointment`/`ScheduleDay`/`AppointmentType` types + `scheduleDays`/`scheduleStages`/`scheduleSlots`/`appointmentDoctors`/`getScheduleDays`/`sortByTime` mock. Registry + DS previews for both new components. |
| 2026-06-20 | Built the **pathology Reports section** `/patients/:id/reports` → `PatientReportsPage`, wired to the Reports quick-access chip on patient detail. Adapted from the older prototype's "Trends" page (`Jano_Prototype_Refined_ND`), rebuilt in the Jano design system, atomic. New molecule **`TrendChart`** (SVG line chart — `--status-stable` reference band, dashed gridlines, grey→status/crimson gradient line, value-labelled points with latest emphasised + out-of-range in crimson, month/day axis; fluid width via viewBox; in-chart font sizes are a documented data-viz exception to the type scale). New organisms **`LabParameterCard`** (name+unit, High/Low/Normal `Badge`, range, latest vs previous + delta + clinical label, embedded `TrendChart`; crimson edge when out of range) and **`LabResultsTable`** (params × dates grid, newest-first, out-of-range crimson, sticky first column, h-scroll). Page reuses `ScreenHeader`/`SearchBar`/`FilterTabs` + an inline Chart/Table segmented toggle; ranks by `severityScore`, splits out-of-range / within-range groups with Show-more. Added `PathologyParameter`/`TrendPoint`/`ReferenceRange` types + `pathologyParameters`/`trendDates`/`getPathologyParameters` mock. NOTE: `FilterTabs` (a scroll container) collapses to 0 height as a flex child of the scrolling column → needs `shrink-0`. Registry + DS previews for all 3 |
| 2026-06-19 | Built **patient detail** `/patients/:id` → `PatientDetailPage` (Figma 140-2673). Reuses ScreenHeader (default) + AlertCard + EventCard + MedicationInset + SearchBar; new molecules `RecordInset` (lab/report/prescription inset w/ trailing crimson action), `TimelineEntryHeader` (date + category badge), `QuickAccessChip`, `ReadStatusToggle`; new organism `Timeline` (generic rail — active crimson dot+line, grey for older — pairing date+badge with each `content` node). FAB (existing atom) opens an existing `BottomDrawer` of `DrawerOption` add-actions. Added `TimelineEntry`/inset types + Ritika's CKD journey (`patientTimeline`, newest-first) + `getPatient`/`getPatientTimeline` (shared across patients like `getConversation`). Both patient lists now navigate into it. Registry + DS previews for all 5 new components |
| 2026-06-19 | Built **EventCard** organism (Figma 160-3936 variant set, 8 variants) — clinical timeline event card. Two header modes: **icon** (crimson-20 chip + title + meta line; body sits *after* the inset) and **collapsible** (title + chevron; body *before* the inset, which toggles on expand). `theme` light (warm-white, charcoal title) / dark (charcoal-base, crimson-20 title, white body). Inset is a `children` slot, filled by 3 new molecules: **MedicationInset** (white/charcoal-warm detail card: name + dosage, optional green "New start" status pill), **AppointmentProgress** (crimson-20/25% panel, connected crimson tick rail + step labels + times via `justify-between` columns), **NextCheckupRow** (label + crimson-20/40% date pill + crimson arrow button). The 8 Figma variants map to combinations of `icon`/`collapsible`/`theme`/children (Variant5 & Variant7 are identical dark-expanded dupes). Registry + DS previews for all 4. NOTE: outer card padding is `--space-12` (Figma uses 13px, off-scale → rounded to nearest token); med-name uses `type-title-xs` (12/500, Figma 12/600 — no 12/600 class) |
| 2026-06-19 | Merged `ChatComposer` into **`MessageComposer`** as variants of one organism (per feedback, mirrors the bubble merge). `MessageComposer` now takes `variant: 'floating' | 'docked'` (default `floating`) — `floating` is the V1 pill (attach + input + voice + crimson send, soft-lg shadow), `docked` is the V2 WhatsApp bar (sunken field: attach + input + camera; trailing mic↔send toggle; Enter sends; added `onCamera`). `ChatThreadPage` → `variant="floating"`, `ChatThreadV2Page` → `variant="docked"`. Deleted `ChatComposer.tsx`; registry collapsed to one entry; DS preview shows both variants |
| 2026-06-19 | Built **`Fab`** atom (Figma 154-3160) — floating action button: 64px (`--space-64`) crimson circle + white `Plus`; when `open`, surface flips to white, plus colour to crimson, and the icon rotates 45° into an × (CSS transition, no Framer Motion). Shadows `--shadow-hard-lg` (closed) / `--shadow-hard-xl` (open). Positioning left to the caller via `className`. Intended to toggle the existing `BottomDrawer` (wiring deferred — "we'll use it later"). Registry + DS preview (closed / open / tap-to-toggle) |
| 2026-06-19 | Merged `ChatBubble` into **`MessageBubble`** as variants of one molecule (per feedback: "chat bubbles should be the same as message bubbles but variants of each other"). `MessageBubble` now takes `variant: 'classic' | 'whatsapp'` (default `whatsapp`) — `classic` is the old ChatBubble (sender + time above, squared outer-top corner, optional `channel` note); `whatsapp` is the V2 look (tail, inline time + read ticks, colour-coded group sender). `ChatThreadPage` → `variant="classic"`, `ChatThreadV2Page` → `variant="whatsapp"`. Deleted `ChatBubble.tsx`; registry collapsed to one entry; DS preview shows both variants side by side |
| 2026-06-19 | Built the **doctor home screen** `/dashboard` (Figma 181-6140), shown after sign-in (login now routes here, not `/patients`; replaced the placeholder `DashboardPage`). New `StatCard` atom (181-6797: white tile, 20px value over a Lucide icon + uppercase crimson-80 caption — Referrals/OPD/Inpatient → `Share2`/`Stethoscope`/`BedDouble`), `StatCardGroup` molecule (181-6796: equal-width row), `UnreadPatientChatsCard` organism (181-6412: white "Needs Attention" card, crimson `MessageSquare` eyebrow + "View All", warm-white inset rows). Inset rows keep time + preview **muted even when unread** — only the crimson count badge carries urgency (per Figma, unlike the chat-list rows). `HomePage` assembles header + reused `SummaryCard` (18 dialysis) + stats + `SearchBar` + needs-attention; unread list derives from `chatThreads`. Registry + DS previews for all 3. NOTE: stat value uses `type-title-xl` (20px/500) — Figma is 20px/600 but no 20/600 type class exists; size match chosen over weight |
| 2026-06-19 | Added **agenda** variant to `SummaryCard` + a **Home V2** (`/dashboard-v2`) — a richer "doctor's day" take on the prime banner (the flat "18 dialysis" was under-using the slot). Agenda layout: crimson eyebrow + date → hero ("24 patients across 2 hospitals") → 2×2 segment grid (New `UserPlus` / Follow-ups `RotateCcw` / **Urgent** `TriangleAlert` crimson-tinted tile + crimson value / Procedures `Activity`) on charcoal-warm tiles → a "Next up" footnote row (`Clock`, crimson accent). New `DaySegment` type + `variant: 'breakdown' \| 'agenda'` prop; breakdown layout untouched. `HomeV2Page` mirrors HomePage, swapping only the banner. `versionToggle()` extended for `/dashboard ↔ /dashboard-v2`; V1 stays the post-login default. Registry variants → breakdown/agenda; DS preview shows all three (collapsed, expanded, agenda) |
| 2026-06-19 | Made the **agenda summary the default home** (`/dashboard` → `HomeV2Page`; dialysis-breakdown demoted to `/dashboard-v2`) — mirrors the patients V1/V2 swap; login still lands on `/dashboard`. Compacted the agenda card height (/layout + /polish, no font-size or 2×2-grid change): icon moved from its own row to a quiet top-right accent inline with the value (label below); eyebrow+hero grouped (gap `--space-4`); section + tile + footnote vertical padding/gaps tightened (`--space-12` → `--space-8`). ~⅓ shorter, so stats + search + needs-attention now sit above the fold |
| 2026-06-20 | **Added Framer Motion** (first use; tech-stack note updated). New SearchBar `ask` variant — a magical "Ask me anything" AI bar: full crimson gradient stroke (border-box `linear-gradient`, padding-box card) that's always present, with the colour band panning in place via Framer Motion `backgroundPosition` (seamless mirror loop, `useReducedMotion` → static) — per feedback, NOT a rotating/trim-path sweep. Leading `Sparkles` + soft crimson glow. Registry variants → default/with-filter/ask; DS preview shows all three |
| 2026-06-20 | Reskinned `SummaryCard` from charcoal greys to **deep maroon** (per feedback — use the lovely crimson/maroon shades on the dark cards). Surfaces mixed from crimson tokens via `color-mix`, kept as local consts in SummaryCard: `MAROON_CARD` (subtle 155° gradient: crimson-80 55% → crimson-deep 22%, each over charcoal-base), `MAROON_RAISED` (crimson-80 32% over charcoal-warm — agenda tiles + next-up row), `MAROON_URGENT` (crimson-base 26% over charcoal-base). Urgent tile keeps its crimson value/icon; white title + warm-grey labels stay legible. Both breakdown + agenda variants share `cardStyle`. AlertCard left on charcoal (distinct critical-alert spotlight) for now |
| 2026-06-20 | **Animated `BottomDrawer` with Framer Motion** (per feedback — animations are added only where the user specifies; this is the first such instance). Wrapped the drawer in `AnimatePresence` so it animates on both open *and* close: scrim fades `0↔1` (0.2s easeOut), sheet slides `y:100%↔0` (0.32s, `[0.22,1,0.36,1]` ease-out, no bounce); `useReducedMotion` collapses to a plain fade with no translate. Direct child of `AnimatePresence` is a keyed `motion.div`; scrim + sheet carry explicit `initial/animate/exit` (parent→child variant *inheritance* did NOT drive the transition — needed per-element props). Being the one shared drawer organism, every drawer in the app inherits this (currently the patient-detail "Add to record" sheet). NOTE: HMR did not apply the motion swap cleanly — needed a full reload to verify |
| 2026-06-20 | Patient **Reports** page (`/patients/:id/reports`): swapped the parameter `SearchBar` (default) for the **`ask` variant** — placeholder "Ask AI about these results", crimson gradient stroke + Sparkles. Decoupled it from filtering (an AI prompt shouldn't empty the list as you type): it now drives its own `prompt` state, and the `filtered` memo narrows by **category tabs only** (dropped the name/clinicalLabel text-search). Category `FilterTabs` remain the list filter |
| 2026-06-20 | Built the **Ask AI entry point** (new — not in the old prototypes). The magical `ask` SearchBar is now a **launcher everywhere** (Home V1/V2 + Reports): added `onActivate` (launcher: readonly, the whole bar is a button) and `onSubmit` (composer: Enter / trailing send button) to SearchBar; the launchers `navigate('/ask?from=home|reports')`. New page **`AskPage`** (`/ask`, inside the shell, no bottom nav): a slow-floating crimson radial glow (two transform-only `motion` blobs, `useReducedMotion` aware), an empty state (context greeting + `SuggestionPill` openers) that gives way to a scrolling conversation, and the `ask` SearchBar as the docked composer. Sending a pill or typed prompt plays a **mocked clinical exchange** keyed by `?from=` (`askContexts` in mockData — home + reports scripts, anchored to real data: Arjun Patel, K⁺ 5.3); each assistant reply offers follow-up pills (~3 rounds). Entry fades/rises in; **Back** runs it in reverse then `navigate(-1)` (timed, not `onExitComplete` — reliable across AppLayout's twin desktop/mobile mounts). New molecules `SuggestionPill` + `AskMessage` (user bubble / assistant Sparkles+text / thinking dots). Types `AskContext`/`AskScriptTurn`/`AskMessageEntry`. Registry + DS previews for both molecules; SearchBar registry desc updated. NOTE: the assistant-append was first nested inside a `setTurn` updater → **StrictMode double-invoke duplicated every reply**; fixed by precomputing messages outside the (pure) updaters and tracking the turn index in a ref |
| 2026-06-20 | `AskDock`: fixed the **ask-bar "pasted-on cut-out" look** (per feedback, two passes). (1) Dropped the dock's opaque warm-app-bg fill → transparent container, even `--space-16` inset all around, so the SearchBar's crimson glow blends into the page. (2) But the dock was still a non-overlapping flex sibling below the scroll area, so content hard-clipped at a line just above it. Final fix: **float the dock over the content** — pages render `<AskDock className="absolute inset-x-0 bottom-0">` on a `relative` root, and the scroll area gets `--space-80` bottom padding so content scrolls *continuously behind* the bar (chat card / trend chart flow under it, no clip line). Applied to `HomeV2Page` / `HomePage` / `PatientReportsPage`; AskDock doc updated. (Superseded the earlier top-fade-gradient attempt.) |
| 2026-06-20 | `SearchBar`: **`showFilter` now works with the `ask` variant too** (per feedback) — the gradient "Ask me anything" bar (flex-1) paired with the plain trailing filter button, which deliberately keeps **no** glow stroke (just the `--crimson-80` 10% ring, same as the default with-filter). Refactored the filter button into one shared `filterButton` const reused by both the default and ask branches; ask renders `bar` alone, or `[bar][filterButton]` in a flex row when `showFilter`. Registry variants → default / with-filter / ask / **ask+filter**; DS preview adds the ask+filter row. NOTE: live preview couldn't be screenshotted (preview browser session was disconnected) — verified via `tsc` + source review |
| 2026-06-20 | **Ask AI polish pass** (/typeset + /layout). Typography hierarchy: assistant replies → `type-body-m` (16px, the primary AI voice) with a new `--text-lh-relaxed` (1.5) leading token for comfortable multi-line reading; doctor prompts stay `type-body-text-m` (14px) in a `--crimson-10` bubble (was the near-white crimson-5) for gentle presence; `SuggestionPill` → `type-action-s` (14/600 semibold, reads as a tappable action); header → `type-title-l` (18px) + 20px Sparkles. Layout: conversation column gap `16 → 20` for calmer turn rhythm, follow-up pills stacked (`flex-col items-start`) with `--space-8` top padding to separate the answer from the suggested next steps, roomier user-bubble padding. Copy: **removed all em dashes** from the Ask scripts/openers/follow-ups (colons in the urgent list, periods elsewhere; numeric range now "3.5 to 5.0") |
| 2026-06-20 | **Multi-modal Ask AI answers** (per feedback: answers should guide the doctor to *act*, not just inform — and carry widgets, not only text). Three layers now compose an assistant turn: (1) **in-answer typography** — a tiny `**bold**` / `~muted~` markup parsed in `AskMessage` (`renderRich`) so a reply carries hierarchy at one size (anchors/figures heavier via `--text-weight-semibold`, qualifiers lighter via `--color-text-secondary`); (2) **embedded widgets** — an answer can render a live, tappable component: `AskWidget` = `{kind:'patients'}` (tappable `PatientCard`s → profile) or `{kind:'lab'}` (the real `LabParameterCard` + `TrendChart`, e.g. the potassium chart inline); (3) **act-on-it CTAs** — new `AskAction` molecule (icon + label + chevron) opening a profile / report / note / prescription / schedule. Data: `AskAction`/`AskWidget` types + `actions?`/`widget?` on `AskScriptTurn` & `AskMessageEntry`; CTA routes use `:id` substituted with the active patient (`?patient=` from the Reports launcher, else Arjun p-1). `AskMessage` gained a `children` slot (page composes widget+CTAs there, so the molecule stays free of organism imports). `PatientCard` gained an optional **`meta`** override (the mock roster shares ward/bed/MRN, so the urgent widget shows the clinical reason instead). Registry + DS preview for `AskAction`; AskMessage preview shows the children slot. Verified both widgets render + navigate in-browser |
| 2026-06-20 | **Reports dock → `SearchAskSwitch`.** The Patient Reports page (`/patients/:id/reports`) bottom dock now hosts the new `SearchAskSwitch` molecule (Framer-Motion morph between the AI ask bar and a plain search field, AI open by default) instead of the bare `ask` SearchBar. `AskDock` gained an optional **`children`** slot — when provided it renders that bar in place of its default ask `SearchBar`, so the floating dock chrome (white fade + absolute bottom anchor) stays shared. The switch's **search side is wired live**: a new `query` state + `handleQuery` (resets show-more counts) and the `filtered` memo now narrows by name/clinicalLabel text *and* category tabs (reinstating the text-search dropped on 06-20). `onAskActivate` still launches `/ask?from=reports&patient=:id`. Verified in-browser: morph swaps the two sides, typing "creat" narrows to Serum Creatinine |
| 2026-06-20 | **Ask AI /polish pass — visually rich + a third modality.** (1) New **note widget** (`AskWidget` `{kind:'note'}`) — surfaces an existing `NoteCard` inline (Arjun's "Dialysis Round Note", n-4) on the home detail turn, tappable → the note; rounds out the modality set (patients / lab / note). (2) **Branded AI orb** in the empty state — a crimson→deep gradient disc with a white Sparkles that gently breathes (scale loop, `useReducedMotion`-static), anchoring the greeting over the glow. (3) **Richer CTAs** — `AskAction` icon sits in a crimson-subtle rounded tile (mirrors `DrawerOption`) with a `whileTap` press. (4) **Warmer assistant avatar** — Sparkles on a `crimson-10→20` gradient disc with a faint crimson ring (was flat crimson-5). (5) **Tactile micro-interactions** — `SuggestionPill` + `AskAction` are `motion.button` with a gated `whileTap` scale; pills gained `--shadow-soft-xs`. All transform/opacity-only, reduced-motion aware. tsc clean; verified the orb empty state + the note-widget answer in-browser |
