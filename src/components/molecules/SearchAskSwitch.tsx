import { useState } from 'react'
import { Search, Sparkles, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SearchBar } from './SearchBar'

type Mode = 'ask' | 'search'

export interface SearchAskSwitchProps {
  /** Which side starts expanded. Defaults to the AI bar. */
  defaultActive?: Mode
  askPlaceholder?: string
  searchPlaceholder?: string
  /** ask — launcher (opens the Ask AI page) and/or composer (Enter / send). */
  onAskActivate?: () => void
  onAskSubmit?: (value: string) => void
  /** search — live field value. */
  searchValue?: string
  onSearchChange?: (value: string) => void
  className?: string
}

// crimson-80 @ 10% — the shared Figma field/button stroke.
const RING = 'color-mix(in srgb, var(--crimson-80) 10%, transparent)'

function SegmentButton({ icon: Icon, accent, label, onClick }: { icon: LucideIcon; accent?: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center transition-colors duration-150"
      style={{
        background: 'var(--neutral-card)',
        border: `1px solid ${RING}`,
        borderRadius: 'var(--radius-full)',
        color: accent ? 'var(--crimson-base)' : 'var(--charcoal-oslo)',
        cursor: 'pointer',
      }}
    >
      <Icon size={18} strokeWidth={1.5} />
    </button>
  )
}

/**
 * SearchAskSwitch — a Framer-Motion switch between the AI "ask" bar and a plain
 * search field. One side is the full bar, the other collapses to an icon button;
 * tapping the button expands it and pushes the other side closed. AI open by default.
 * `useReducedMotion` collapses the morph to an instant swap.
 */
export function SearchAskSwitch({
  defaultActive = 'ask',
  askPlaceholder = 'Ask me anything',
  searchPlaceholder = 'Search',
  onAskActivate,
  onAskSubmit,
  searchValue,
  onSearchChange,
  className,
}: SearchAskSwitchProps) {
  const [active, setActive] = useState<Mode>(defaultActive)
  const reduce = useReducedMotion()
  const transition = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 400, damping: 34 }

  return (
    <div className={cn('flex items-center', className)} style={{ gap: 'var(--space-8)' }}>
      {/* AI segment (left) */}
      <motion.div layout transition={transition} style={{ flex: active === 'ask' ? '1 1 0%' : '0 0 auto', minWidth: 0 }}>
        {active === 'ask' ? (
          <SearchBar variant="ask" placeholder={askPlaceholder} onActivate={onAskActivate} onSubmit={onAskSubmit} />
        ) : (
          <SegmentButton icon={Sparkles} accent label="Ask AI" onClick={() => setActive('ask')} />
        )}
      </motion.div>

      {/* Search segment (right) */}
      <motion.div layout transition={transition} style={{ flex: active === 'search' ? '1 1 0%' : '0 0 auto', minWidth: 0 }}>
        {active === 'search' ? (
          <SearchBar placeholder={searchPlaceholder} value={searchValue} onChange={onSearchChange} />
        ) : (
          <SegmentButton icon={Search} label="Search" onClick={() => setActive('search')} />
        )}
      </motion.div>
    </div>
  )
}
