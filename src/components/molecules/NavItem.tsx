import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function NavItem({ icon: Icon, label, active = false, onClick, className }: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex w-full cursor-pointer select-none flex-col items-center',
        'gap-[var(--space-4)] rounded-[var(--radius-16)] px-[var(--space-8)] pt-[var(--space-6)] pb-[var(--space-4)]',
        'transition-colors duration-150',
        active ? 'text-[var(--color-brand)]' : 'text-[var(--warm-grey)]',
        className,
      )}
    >
      <Icon size={20} strokeWidth={1.5} fill={active ? 'currentColor' : 'none'} />
      <span className="type-overline-xs">{label}</span>
    </button>
  )
}
