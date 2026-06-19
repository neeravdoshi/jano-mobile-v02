import { cn } from '@/lib/utils'

export interface DividerWithLabelProps {
  label?: string
  className?: string
}

export function DividerWithLabel({ label = 'OR', className }: DividerWithLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
      <span className="type-overline-xs" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
    </div>
  )
}
