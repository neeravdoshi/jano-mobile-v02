import { cn } from '@/lib/utils'

export type BadgeColour = 'yellow' | 'green' | 'grey' | 'blue' | 'red' | 'black' | 'crimson'

export interface BadgeProps {
  label: string
  colour?: BadgeColour
  className?: string
}

const colourStyles: Record<BadgeColour, { bg: string; text: string }> = {
  yellow: { bg: 'var(--badge-yellow-bg)', text: 'var(--badge-yellow-text)' },
  green:  { bg: 'var(--badge-green-bg)',  text: 'var(--badge-green-text)'  },
  grey:   { bg: 'var(--badge-grey-bg)',   text: 'var(--badge-grey-text)'   },
  blue:   { bg: 'var(--badge-blue-bg)',   text: 'var(--badge-blue-text)'   },
  red:    { bg: 'var(--badge-red-bg)',    text: 'var(--badge-red-text)'    },
  black:  { bg: 'var(--badge-black-bg)',  text: 'var(--badge-black-text)'  },
  crimson:{ bg: 'var(--badge-crimson-bg)', text: 'var(--badge-crimson-text)' },
}

export function Badge({ label, colour = 'grey', className }: BadgeProps) {
  const { bg, text } = colourStyles[colour]
  return (
    <span
      className={cn('inline-flex items-center', className)}
      style={{
        background: bg,
        color: text,
        borderRadius: 'var(--radius-full)',
        padding: 'var(--space-4) var(--space-8)',
        fontSize: 10,
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.576px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  )
}
