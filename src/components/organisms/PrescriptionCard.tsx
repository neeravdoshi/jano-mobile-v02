import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/atoms'
import { cn } from '@/lib/utils'
import type { PrescriptionStatus } from '@/types'

export interface PrescriptionCardProps {
  title: string
  createdAt: string
  status: PrescriptionStatus
  summary: string
  department: string
  doctor: string
  onClick?: () => void
  className?: string
}

const statusBadge: Record<PrescriptionStatus, { label: string; colour: 'yellow' | 'green' }> = {
  draft:  { label: 'Draft',  colour: 'yellow' },
  signed: { label: 'Signed', colour: 'green' },
}

/**
 * PrescriptionCard — a row in the patient's prescription list.
 * Status badge + date, title, summary, and a department · doctor footer.
 */
export function PrescriptionCard({
  title, createdAt, status, summary, department, doctor, onClick, className,
}: PrescriptionCardProps) {
  const badge = statusBadge[status]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex w-full flex-col text-left transition-colors duration-150', className)}
      style={{
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-16)',
        gap: 'var(--space-8)',
        boxShadow: 'var(--shadow-soft-xs)',
        cursor: 'pointer',
      }}
    >
      <div className="flex w-full items-center justify-between" style={{ gap: 'var(--space-8)' }}>
        <Badge label={badge.label} colour={badge.colour} />
        <span className="type-body-xs shrink-0" style={{ color: 'var(--charcoal-oslo)' }}>
          {createdAt}
        </span>
      </div>

      <span className="type-title-m" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </span>

      <span
        className="type-body-text-m"
        style={{
          color: 'var(--charcoal-oslo)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {summary}
      </span>

      <div className="flex w-full items-center justify-between" style={{ gap: 'var(--space-8)' }}>
        <span className="type-body-xs truncate" style={{ color: 'var(--charcoal-oslo)' }}>
          {department} · {doctor}
        </span>
        <ChevronRight size={18} strokeWidth={1.5} style={{ color: 'var(--charcoal-oslo)', flexShrink: 0 }} />
      </div>
    </button>
  )
}
