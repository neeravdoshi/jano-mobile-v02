import { Badge, type BadgeColour } from '@/components/atoms'
import { cn } from '@/lib/utils'
import type { NoteType } from '@/types'

export interface NoteCardProps {
  type: NoteType
  title: string
  body: string
  department: string
  onClick?: () => void
  className?: string
}

const typeBadge: Record<NoteType, { label: string; colour: BadgeColour }> = {
  progress:  { label: 'Progress Note',      colour: 'red'   },
  initial:   { label: 'Initial Assessment', colour: 'green' },
  discharge: { label: 'Discharge Note',     colour: 'blue'  },
}

/**
 * NoteCard (Figma 153:2736) — a clinical-note card for the notes grid.
 * Edited meta + time, a type badge, title + body preview, and a department tag.
 */
export function NoteCard({ type, title, body, department, onClick, className }: NoteCardProps) {
  const badge = typeBadge[type]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex w-full flex-col text-left transition-colors duration-150', className)}
      style={{
        background: 'var(--neutral-card)',
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-12)',
        gap: 'var(--space-8)',
        boxShadow: 'var(--shadow-soft-xs)',
        cursor: 'pointer',
      }}
    >
      <Badge label={badge.label} colour={badge.colour} className="self-start" />

      <span className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
        <span className="type-title-s" style={{ color: 'var(--color-text-primary)' }}>{title}</span>
        <span
          className="type-body-text-m"
          style={{ color: 'var(--color-text-primary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {body}
        </span>
      </span>

      <span className="type-overline-xs" style={{ color: 'var(--charcoal-oslo)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        {department}
      </span>
    </button>
  )
}
