import type { LucideIcon } from 'lucide-react'
import { House, Users, Calendar, MessageSquare, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavItem } from '@/components/molecules/NavItem'

export type BottomNavTab = 'home' | 'patients' | 'schedule' | 'chat'

export interface BottomNavigationProps {
  active: BottomNavTab
  onTabChange?: (tab: BottomNavTab) => void
  onQuickAction?: () => void
  className?: string
}

// Figma's custom nav icons → closest Lucide equivalents
const TABS: { id: BottomNavTab; label: string; icon: LucideIcon }[] = [
  { id: 'home',     label: 'Home',     icon: House },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'chat',     label: 'Chat',     icon: MessageSquare },
]

export function BottomNavigation({ active, onTabChange, onQuickAction, className }: BottomNavigationProps) {
  const item = (id: BottomNavTab) => {
    const tab = TABS.find(t => t.id === id)!
    return (
      <NavItem
        icon={tab.icon}
        label={tab.label}
        active={active === id}
        onClick={() => onTabChange?.(id)}
      />
    )
  }

  return (
    <nav
      className={cn(
        'grid w-full grid-cols-[minmax(0,1fr)_var(--space-56)_minmax(0,1fr)] items-center',
        'gap-[var(--space-12)] px-[var(--space-16)] pt-[var(--space-12)] pb-[var(--space-16)]',
        'border-t border-[var(--crimson-10)] bg-[var(--color-surface-card)] backdrop-blur-[7px]',
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-[var(--space-8)]">
        {item('home')}
        {item('patients')}
      </div>

      {/* Center quick action — sparkle / AI assistant */}
      <button
        type="button"
        onClick={onQuickAction}
        aria-label="Quick action"
        className={cn(
          'grid size-[var(--space-56)] cursor-pointer place-items-center',
          'rounded-[var(--radius-20)] bg-[var(--crimson-80)] text-[var(--color-text-inverse)]',
          'transition-transform duration-150 active:scale-95',
        )}
        style={{
          border: '1px solid color-mix(in srgb, var(--color-brand) 5%, transparent)',
          boxShadow: '0 14px 12px color-mix(in srgb, var(--color-brand) 15%, transparent)',
        }}
      >
        <Sparkles size={22} strokeWidth={1.5} />
      </button>

      <div className="grid grid-cols-2 gap-[var(--space-8)]">
        {item('schedule')}
        {item('chat')}
      </div>
    </nav>
  )
}
