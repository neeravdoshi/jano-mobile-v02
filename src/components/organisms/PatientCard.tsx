import { MapPin, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, type BadgeColour } from '@/components/atoms/Badge'
import type { EncounterType } from '@/types'

export type PatientCardVariant = 'default' | 'highlighted'

export interface PatientCardProps {
  name: string
  encounterType: EncounterType
  ward?: string
  bed?: string
  mrn: string
  variant?: PatientCardVariant
  onClick?: () => void
  className?: string
}

const encounterColour: Record<EncounterType, BadgeColour> = {
  IPD: 'red',
  OPD: 'blue',
  Referral: 'yellow',
}

export function PatientCard({
  name,
  encounterType,
  ward,
  bed,
  mrn,
  variant = 'default',
  onClick,
  className,
}: PatientCardProps) {
  const highlighted = variant === 'highlighted'

  const meta = [ward, bed, mrn && `MRN ${mrn}`].filter(Boolean).join(' · ')

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex w-full items-center text-left transition-colors duration-150', className)}
      style={{
        gap: 'var(--space-12)',
        padding: 'var(--space-20) var(--space-16)',
        borderRadius: 'var(--radius-12)',
        background: highlighted ? 'var(--charcoal-50)' : 'var(--neutral-card)',
        border: `1px solid ${highlighted ? 'rgba(255,255,255,0.1)' : 'var(--neutral-stroke)'}`,
        cursor: 'pointer',
      }}
    >
      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-8)' }}>
        <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
          <span
            className="type-title-m truncate"
            style={{ color: highlighted ? 'var(--color-text-inverse)' : 'var(--color-text-primary)' }}
          >
            {name}
          </span>
          <Badge label={encounterType} colour={encounterColour[encounterType]} className="shrink-0" />
        </div>

        <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
          <MapPin
            size={12}
            strokeWidth={1.5}
            style={{ color: highlighted ? 'var(--neutral-app-bg)' : 'var(--charcoal-oslo)', flexShrink: 0 }}
          />
          <span
            className="type-body-xs truncate"
            style={{ color: highlighted ? 'var(--neutral-app-bg)' : 'var(--charcoal-oslo)' }}
          >
            {meta}
          </span>
        </div>
      </div>

      <ChevronRight
        size={18}
        strokeWidth={1.5}
        style={{ color: highlighted ? 'var(--neutral-app-bg)' : 'var(--charcoal-oslo)', flexShrink: 0 }}
      />
    </button>
  )
}
