import { useEffect, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

// Fixed bar heights (px) — a stable "waveform" so playback looks consistent.
const WAVE = [4, 10, 14, 4, 10, 14, 14, 10, 14, 10, 10, 14, 14, 20, 14, 20, 14, 20, 14, 10, 14, 10, 14, 10, 10, 14, 14, 20, 14, 14, 20, 10, 8, 12, 16, 8, 18, 10, 14, 6]

export interface WaveformPlayerProps {
  /** Display duration, e.g. "1:24". */
  duration: string
  className?: string
}

/**
 * WaveformPlayer (Figma 156:3753) — a voice-note bar: play/pause, a crimson
 * waveform that fills as it plays, and the duration. Prototype playback is
 * simulated (the progress sweeps, then resets); no real audio.
 */
export function WaveformPlayer({ duration, className }: WaveformPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 1) return 0
        return Math.min(1, p + 0.018)
      })
    }, 70)
    return () => clearInterval(t)
  }, [playing])

  // Stop at the end.
  useEffect(() => {
    if (progress >= 1) setPlaying(false)
  }, [progress])

  const Icon = playing ? Pause : Play

  return (
    <div
      className={cn('flex w-full items-center', className)}
      style={{
        background: 'var(--crimson-10)',
        borderRadius: 'var(--radius-full)',
        padding: 'var(--space-8) var(--space-12)',
        gap: 'var(--space-12)',
      }}
    >
      <button
        type="button"
        aria-label={playing ? 'Pause' : 'Play'}
        onClick={() => setPlaying(p => !p)}
        className="flex shrink-0 items-center justify-center"
        style={{
          width: 'var(--space-32)',
          height: 'var(--space-32)',
          borderRadius: 'var(--radius-full)',
          background: 'var(--neutral-card)',
          color: 'var(--crimson-base)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <Icon size={16} strokeWidth={2} fill="currentColor" />
      </button>

      <div className="flex min-w-0 flex-1 items-center" style={{ gap: 'var(--space-2)', height: 'var(--space-20)' }}>
        {WAVE.map((h, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              minWidth: 2,
              height: h,
              borderRadius: 'var(--radius-full)',
              background: i / WAVE.length < progress ? 'var(--crimson-base)' : 'var(--crimson-30)',
            }}
          />
        ))}
      </div>

      <span
        className="type-overline-xs shrink-0"
        style={{ color: 'var(--charcoal-50)', letterSpacing: '0.5px' }}
      >
        {duration}
      </span>
    </div>
  )
}
