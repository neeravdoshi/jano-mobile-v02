import { useState } from 'react'
import { cn } from '@/lib/utils'

// Kept for back-compat with existing call sites; no longer drives the colour.
export type AvatarColour = 'grey' | 'red' | 'green' | 'blue' | 'yellow'

export interface AvatarProps {
  initials: string
  /** @deprecated Initials avatars now use a single uniform brand tint. */
  colour?: AvatarColour
  /** Diameter in px. Initials scale relative to this. */
  size?: number
  /** When provided, renders a circular photo; falls back to initials on load error. */
  imageUrl?: string
  className?: string
}

export function Avatar({ initials, size = 40, imageUrl, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = imageUrl && !imgError

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
        // Uniform brand tint for every initials avatar (no per-person pastels).
        background: 'var(--crimson-10)',
        color: 'var(--crimson-deep)',
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
