import { Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { AskAuthor } from '@/types'
import { cn } from '@/lib/utils'

export interface AskMessageProps {
  author: AskAuthor
  text?: string
  /** assistant only — show the animated "thinking" dots instead of text. */
  loading?: boolean
  /**
   * assistant only — rich content rendered in the reply column below the text
   * (embedded widgets, action CTAs). Kept as a slot so this molecule stays
   * free of organism imports; the page composes what goes here.
   */
  children?: React.ReactNode
  className?: string
}

// Lightweight inline emphasis for assistant copy — keeps one font size but lets
// the reply carry hierarchy: **anchor** reads heavier (semibold), ~detail~ reads
// lighter (muted). Markers live in the mock scripts.
const RICH = /(\*\*[^*]+\*\*|~[^~]+~)/g
function renderRich(text: string): React.ReactNode[] {
  return text.split(RICH).map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 'var(--text-weight-semibold)' }}>
          {seg.slice(2, -2)}
        </strong>
      )
    }
    if (seg.startsWith('~') && seg.endsWith('~')) {
      return (
        <span key={i} style={{ color: 'var(--color-text-secondary)' }}>
          {seg.slice(1, -1)}
        </span>
      )
    }
    return seg
  })
}

function ThinkingDots() {
  const reduce = useReducedMotion()
  return (
    <span className="flex items-center" style={{ gap: 'var(--space-4)', height: 'var(--space-20)' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{
            width: 'var(--space-6)',
            height: 'var(--space-6)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--crimson-30)',
            display: 'inline-block',
          }}
          animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={reduce ? undefined : { duration: 1, ease: 'easeInOut', repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

/**
 * One turn in the Ask AI conversation. The doctor's prompt renders as a soft
 * crimson bubble on the right; the assistant replies on the left behind a small
 * Sparkles mark (with a "thinking" state). Each turn fades + rises in on mount.
 */
export function AskMessage({ author, text, loading, children, className }: AskMessageProps) {
  const reduce = useReducedMotion()
  const entry = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } }

  if (author === 'user') {
    return (
      <motion.div className={cn('flex w-full justify-end', className)} {...entry}>
        <div
          className="type-body-text-m"
          style={{
            maxWidth: '85%',
            background: 'var(--crimson-10)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-16)',
            padding: 'var(--space-8) var(--space-14)',
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className={cn('flex w-full items-start', className)} style={{ gap: 'var(--space-8)' }} {...entry}>
      <span
        className="grid place-items-center"
        style={{
          width: 'var(--space-28)',
          height: 'var(--space-28)',
          flexShrink: 0,
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(150deg, var(--crimson-10), var(--crimson-20))',
          border: '1px solid color-mix(in srgb, var(--crimson-30) 60%, transparent)',
        }}
      >
        <Sparkles size={16} strokeWidth={1.5} style={{ color: 'var(--crimson-base)' }} />
      </span>
      {loading ? (
        <ThinkingDots />
      ) : (
        <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-12)', paddingTop: 'var(--space-2)' }}>
          <p
            className="type-body-m"
            style={{ color: 'var(--color-text-primary)', whiteSpace: 'pre-line', maxWidth: '34ch', lineHeight: 'var(--text-lh-relaxed)' }}
          >
            {renderRich(text ?? '')}
          </p>
          {children}
        </div>
      )}
    </motion.div>
  )
}
