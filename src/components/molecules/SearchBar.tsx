import { ArrowUp, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type SearchBarVariant = 'default' | 'ask'

export interface SearchBarProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  /** 'default' — plain search field. 'ask' — magical AI "Ask me anything" bar. */
  variant?: SearchBarVariant
  /** Show the trailing circular filter button (works with the default and ask variants). */
  showFilter?: boolean
  onFilter?: () => void
  /**
   * ask variant — launcher mode. When set, the bar is a button (not a field):
   * the input is replaced by muted placeholder text and a tap calls this. Used
   * everywhere the ask bar is an entry point into the full Ask AI page.
   */
  onActivate?: () => void
  /**
   * ask variant — composer mode. When set, Enter (and the trailing send button)
   * submit the current value. Used as the live input on the Ask AI page.
   */
  onSubmit?: (value: string) => void
  className?: string
}

export function SearchBar({
  value,
  placeholder,
  onChange,
  variant = 'default',
  showFilter = false,
  onFilter,
  onActivate,
  onSubmit,
  className,
}: SearchBarProps) {
  // crimson-80 at 10% — the Figma stroke for both field and filter button
  const ring = 'color-mix(in srgb, var(--crimson-80) 10%, transparent)'
  const reduce = useReducedMotion()

  // Plain trailing filter button — shared by the default and ask variants.
  // (No gradient glow even alongside the ask bar.)
  const filterButton = (
    <button
      type="button"
      onClick={onFilter}
      aria-label="Filter"
      className="grid h-11 w-11 shrink-0 place-items-center transition-colors duration-150"
      style={{
        background: 'var(--neutral-card)',
        border: `1px solid ${ring}`,
        borderRadius: 'var(--radius-full)',
        color: 'var(--crimson-80)',
        cursor: 'pointer',
      }}
    >
      <SlidersHorizontal size={18} strokeWidth={1.5} />
    </button>
  )

  // ── 'ask' — AI prompt bar with a full gradient stroke whose colours drift in place ──
  if (variant === 'ask') {
    const askPlaceholder = placeholder ?? 'Ask me anything'
    const canSend = !!onSubmit && !!value?.trim()
    const submit = () => {
      const v = value?.trim()
      if (v && onSubmit) onSubmit(v)
    }

    const bar = (
      <motion.div
        className={cn('relative', showFilter ? 'flex-1' : className)}
        style={{
          borderRadius: 'var(--radius-full)',
          // Gradient border: card fills the padding-box, the colour band lives on the border-box.
          border: 'var(--space-2) solid transparent',
          background:
            'linear-gradient(var(--neutral-card), var(--neutral-card)) padding-box, ' +
            'linear-gradient(110deg, var(--crimson-deep), var(--crimson-base), var(--crimson-30), var(--error-red), var(--crimson-base), var(--crimson-deep)) border-box',
          backgroundSize: '100% 100%, 220% 100%',
          boxShadow: '0 0 20px color-mix(in srgb, var(--crimson-base) 22%, transparent)',
        }}
        // The stroke is always fully there; only the colour band pans across it (seamless mirror loop).
        animate={reduce ? undefined : { backgroundPosition: ['0% 0%, 0% 0%', '0% 0%, 100% 0%'] }}
        transition={reduce ? undefined : { duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      >
        {onActivate ? (
          // Launcher — the whole bar is a button that opens the Ask AI page.
          <button
            type="button"
            onClick={onActivate}
            className="flex h-11 w-full items-center text-left"
            style={{ gap: 'var(--space-8)', padding: '0 var(--space-16)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Sparkles size={18} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
            <span className="type-body-m" style={{ color: 'var(--color-text-muted)' }}>{askPlaceholder}</span>
          </button>
        ) : (
          <label className="flex h-11 items-center" style={{ gap: 'var(--space-8)', padding: '0 var(--space-16)' }}>
            <Sparkles size={18} strokeWidth={1.5} style={{ color: 'var(--crimson-base)', flexShrink: 0 }} />
            <input
              type="text"
              value={value}
              onChange={e => onChange?.(e.target.value)}
              onKeyDown={e => {
                if (onSubmit && e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  submit()
                }
              }}
              placeholder={askPlaceholder}
              className="type-body-m w-full bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
              style={{ color: 'var(--charcoal-base)' }}
            />
            {onSubmit && (
              <button
                type="button"
                onClick={submit}
                disabled={!canSend}
                aria-label="Send"
                className="grid place-items-center transition-opacity duration-150"
                style={{
                  width: 'var(--space-32)',
                  height: 'var(--space-32)',
                  flexShrink: 0,
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: 'var(--crimson-base)',
                  color: 'var(--color-text-inverse)',
                  cursor: canSend ? 'pointer' : 'default',
                  opacity: canSend ? 1 : 0.35,
                }}
              >
                <ArrowUp size={18} strokeWidth={2} />
              </button>
            )}
          </label>
        )}
      </motion.div>
    )

    // ask + filter — the gradient bar paired with the plain filter button.
    if (showFilter) {
      return (
        <div className={cn('flex items-center', className)} style={{ gap: 'var(--space-12)' }}>
          {bar}
          {filterButton}
        </div>
      )
    }
    return bar
  }

  return (
    <div className={cn('flex items-center', className)} style={{ gap: 'var(--space-12)' }}>
      <label
        className="flex h-11 flex-1 items-center"
        style={{
          gap: 'var(--space-8)',
          background: 'var(--neutral-card)',
          border: `1px solid ${ring}`,
          borderRadius: 'var(--radius-full)',
          padding: '0 var(--space-16)',
        }}
      >
        <Search size={16} strokeWidth={1.5} style={{ color: 'var(--charcoal-oslo)', flexShrink: 0 }} />
        <input
          type="search"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder ?? 'Search'}
          className="type-body-m w-full bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
          style={{ color: 'var(--charcoal-base)' }}
        />
      </label>

      {showFilter && filterButton}
    </div>
  )
}
