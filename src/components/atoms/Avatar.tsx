import { useState } from 'react'
import { cn } from '@/lib/utils'

export type AvatarColour = 'grey' | 'red' | 'green' | 'blue' | 'yellow'

export interface AvatarProps {
  initials: string
  colour?: AvatarColour
  /** Diameter in px. Initials scale relative to this. */
  size?: number
  /** When provided, renders a circular photo; falls back to initials on load error. */
  imageUrl?: string
  className?: string
}

// Shares the Badge colour tokens — the avatar is a circular tinted chip.
const colourStyles: Record<AvatarColour, { bg: string; text: string }> = {
  grey:   { bg: 'var(--badge-grey-bg)',   text: 'var(--badge-grey-text)'   },
  red:    { bg: 'var(--badge-red-bg)',    text: 'var(--badge-red-text)'    },
  green:  { bg: 'var(--badge-green-bg)',  text: 'var(--badge-green-text)'  },
  blue:   { bg: 'var(--badge-blue-bg)',   text: 'var(--badge-blue-text)'   },
  yellow: { bg: 'var(--badge-yellow-bg)', text: 'var(--badge-yellow-text)' },
}

export function Avatar({ initials, colour = 'grey', size = 40, imageUrl, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = imageUrl && !imgError
  const { bg, text } = colourStyles[colour]

  if (showImage) {
    return (
      <img
        src={imageUrl}
        alt={initials}
        onError={() => setImgError(true)}
        className={cn('shrink-0 object-cover', className)}
        style={{
          width: size,
          height: size,
          borderRadius: 'var(--radius-full)',
        }}
      />
    )
  }

  return (
    <span
      className={cn('inline-flex items-center justify-center shrink-0', className)}
      style={{
        width: size,
        height: size,
        background: bg,
        color: text,
        borderRadius: 'var(--radius-full)',
        fontSize: Math.max(10, Math.round(size * 0.34)),
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.576px',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {initials}
    </span>
  )
}
