import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchBarProps {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  /** Show the trailing circular filter button (Figma "Default" variant). */
  showFilter?: boolean
  onFilter?: () => void
  className?: string
}

export function SearchBar({
  value,
  placeholder = 'Search',
  onChange,
  showFilter = false,
  onFilter,
  className,
}: SearchBarProps) {
  // crimson-80 at 10% — the Figma stroke for both field and filter button
  const ring = 'color-mix(in srgb, var(--crimson-80) 10%, transparent)'

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
          placeholder={placeholder}
          className="type-body-m w-full bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
          style={{ color: 'var(--charcoal-base)' }}
        />
      </label>

      {showFilter && (
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
      )}
    </div>
  )
}
