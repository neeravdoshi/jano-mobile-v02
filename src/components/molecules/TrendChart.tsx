import { useId } from 'react'
import { cn } from '@/lib/utils'
import type { ReferenceRange, TrendPoint } from '@/types'

export interface TrendChartProps {
  dataPoints: TrendPoint[]
  referenceRange: ReferenceRange
  className?: string
}

// SVG viewBox geometry. These are chart-coordinate constants (not layout spacing),
// and the in-chart font sizes are a deliberate data-viz exception to the type scale —
// the smallest type-* utility (12px) is too large for a dense mini chart.
const VW = 320
const VH = 150
const PAD = { l: 12, r: 12, t: 16, b: 34 }
const CW = VW - PAD.l - PAD.r
const CH = VH - PAD.t - PAD.b

const axisMonth = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short' }).toUpperCase()
const axisDay = (iso: string) => new Date(iso).getDate().toString()

/**
 * Pathology trend line chart — reference-range band, gridlines, a grey→status
 * gradient line, value-labelled points (latest emphasised, out-of-range in crimson),
 * and month/day axis labels. Scales fluidly to its container width.
 */
export function TrendChart({ dataPoints, referenceRange, className }: TrendChartProps) {
  const uid = useId().replace(/:/g, '')
  const values = dataPoints.map(d => d.value)
  const rawMin = Math.min(...values, referenceRange.low)
  const rawMax = Math.max(...values, referenceRange.high)
  const spread = Math.max(rawMax - rawMin, 0.5)
  const vMin = Math.max(0, rawMin - spread * 0.18)
  const vMax = rawMax + spread * 0.18
  const n = dataPoints.length
  const latest = dataPoints[n - 1].value
  const latestOut = latest < referenceRange.low || latest > referenceRange.high

  const xAt = (i: number) => PAD.l + (n === 1 ? CW / 2 : (CW / (n - 1)) * i)
  const yAt = (v: number) => PAD.t + CH - ((v - vMin) / (vMax - vMin)) * CH
  const bandTop = yAt(Math.min(referenceRange.high, vMax))
  const bandBot = yAt(Math.max(referenceRange.low, vMin))
  const linePath = dataPoints.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(2)} ${yAt(d.value).toFixed(2)}`).join(' ')

  const bandFill = 'color-mix(in srgb, var(--status-stable) 10%, transparent)'
  const gridStroke = 'color-mix(in srgb, var(--neutral-stroke) 55%, transparent)'
  const axisStroke = 'color-mix(in srgb, var(--neutral-stroke) 85%, transparent)'

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className={cn('block w-full', className)}
      style={{ height: 'auto' }}
      role="img"
      aria-label={`Trend over ${n} readings, latest ${latest} ${latestOut ? 'out of range' : 'within range'}`}
    >
      <defs>
        <linearGradient id={`${uid}-line`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" style={{ stopColor: 'var(--charcoal-oslo)' }} />
          <stop offset="100%" style={{ stopColor: latestOut ? 'var(--crimson-base)' : 'var(--status-stable)' }} />
        </linearGradient>
      </defs>

      {/* Horizontal gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map(r => {
        const y = PAD.t + CH * r
        return <line key={`gy-${r}`} x1={PAD.l} y1={y} x2={PAD.l + CW} y2={y} style={{ stroke: gridStroke }} strokeDasharray="4 6" strokeWidth={1} />
      })}
      {/* Vertical gridlines */}
      {dataPoints.map((_, i) => (
        <line key={`gx-${i}`} x1={xAt(i)} y1={PAD.t} x2={xAt(i)} y2={PAD.t + CH} style={{ stroke: gridStroke }} strokeDasharray="4 6" strokeWidth={1} />
      ))}

      {/* Reference-range band */}
      {bandBot > bandTop && <rect x={PAD.l} y={bandTop} width={CW} height={bandBot - bandTop} rx={10} style={{ fill: bandFill }} />}

      {/* Trend line */}
      <path d={linePath} fill="none" stroke={`url(#${uid}-line)`} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />

      {/* Points + value labels */}
      {dataPoints.map((d, i) => {
        const isLatest = i === n - 1
        const out = d.value < referenceRange.low || d.value > referenceRange.high
        return (
          <g key={d.date}>
            <circle
              cx={xAt(i)}
              cy={yAt(d.value)}
              r={isLatest ? 5.4 : 4.6}
              strokeWidth={2}
              style={{ fill: out ? 'var(--crimson-base)' : isLatest ? 'var(--status-stable)' : 'var(--charcoal-base)', stroke: 'var(--neutral-card)' }}
            />
            <text
              x={xAt(i)}
              y={yAt(d.value) - 9}
              textAnchor="middle"
              fontSize={8.8}
              fontWeight={isLatest ? 700 : 600}
              style={{ fill: out ? 'var(--crimson-base)' : 'var(--charcoal-50)', fontFamily: 'var(--font-sans)' }}
            >
              {d.value}
            </text>
          </g>
        )
      })}

      {/* Baseline */}
      <line x1={PAD.l} y1={PAD.t + CH} x2={PAD.l + CW} y2={PAD.t + CH} style={{ stroke: axisStroke }} strokeWidth={1} />

      {/* X-axis month / day labels */}
      {dataPoints.map((d, i) => (
        <g key={`lbl-${d.date}`}>
          <text x={xAt(i)} y={VH - 17} textAnchor="middle" fontSize={10.5} fontWeight={700} style={{ fill: 'var(--charcoal-oslo)', fontFamily: 'var(--font-sans)' }}>{axisMonth(d.date)}</text>
          <text x={xAt(i)} y={VH - 4} textAnchor="middle" fontSize={9.5} style={{ fill: 'var(--charcoal-oslo)', fontFamily: 'var(--font-sans)' }}>{axisDay(d.date)}</text>
        </g>
      ))}
    </svg>
  )
}
