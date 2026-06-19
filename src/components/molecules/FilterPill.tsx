import { cn } from '@/lib/utils'

export interface FilterPillProps {
  label: string
  selected?: boolean
  count?: number
  onClick?: () => void
  className?: string
}

export function FilterPill({ label, selected = false, count, onClick, className }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn('inline-flex items-center gap-1 cursor-pointer transition-all duration-150', className)}
      style={{
        background: selected ? 'var(--crimson-base)' : 'var(--neutral-card)',
        color: selected ? '#FFFFFF' : 'var(--charcoal-base)',
        borderRadius: 'var(--radius-full)',
        padding: 'var(--space-8) var(--space-16)',
        border: selected ? 'none' : '1px solid var(--neutral-stroke)',
        fontSize: 14,
        fontWeight: 400,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.35px',
        lineHeight: '21px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            background: selected ? 'rgba(255,255,255,0.3)' : 'var(--crimson-20)',
            color: selected ? '#FFFFFF' : 'var(--charcoal-base)',
            borderRadius: 'var(--radius-full)',
            padding: '0 var(--space-8)',
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '21px',
          }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export interface FilterTabOption<T extends string = string> {
  id: T
  label: string
  count?: number
}

export interface FilterTabsProps<T extends string = string> {
  options: FilterTabOption<T>[]
  active: T
  onChange?: (id: T) => void
  className?: string
}

export function FilterTabs<T extends string = string>({
  options,
  active,
  onChange,
  className,
}: FilterTabsProps<T>) {
  return (
    <div
      className={cn('flex items-center overflow-x-auto no-scrollbar', className)}
      style={{ gap: 'var(--space-8)' }}
    >
      {options.map(opt => (
        <FilterPill
          key={opt.id}
          label={opt.label}
          count={opt.count}
          selected={opt.id === active}
          onClick={() => onChange?.(opt.id)}
        />
      ))}
    </div>
  )
}
