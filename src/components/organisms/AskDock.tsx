import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SearchBar } from '@/components/molecules'

export interface AskDockProps {
  placeholder?: string
  /** Launcher mode — tap opens the full Ask AI page. */
  onActivate?: () => void
  /** Composer mode — Enter / send submits the current value. */
  onSubmit?: (value: string) => void
  /** Override the docked bar — e.g. a SearchAskSwitch instead of the default ask SearchBar. */
  children?: ReactNode
  className?: string
}

/**
 * AskDock — the "Ask me anything" bar pinned to the bottom of a screen, just
 * above the tab bar (ChatGPT / Claude pattern).
 *
 * The container is transparent (no opaque fill). A soft white gradient sits
 * *behind* the bar — fading from transparent at the top into the app surface at
 * the bottom — so content scrolling up dissolves into white as it nears the bar,
 * while the bar itself stays crisp in front (it's layered above the gradient).
 * To get the floating look, give it `className="absolute inset-x-0 bottom-0"` on
 * a `relative` page and pad the scroll area's bottom so content can scroll
 * continuously *behind* the bar (no hard clip line above it).
 */
export function AskDock({ placeholder = 'Ask me anything', onActivate, onSubmit, children, className }: AskDockProps) {
  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ padding: 'var(--space-48) var(--space-16) var(--space-8)' }}
    >
      {/* White fade behind the bar — transparent (top) → app surface (bottom). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--neutral-card) 60%)' }}
      />
      <div className="relative">
        {children ?? <SearchBar variant="ask" placeholder={placeholder} onActivate={onActivate} onSubmit={onSubmit} />}
      </div>
    </div>
  )
}
