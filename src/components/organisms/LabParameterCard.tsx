import { cn } from '@/lib/utils'
import { Badge } from '@/components/atoms'
import { TrendChart } from '@/components/molecules'
import type { PathologyParameter } from '@/types'

export interface LabParameterCardProps {
  parameter: PathologyParameter
  className?: string
}

const fmt = (v: number) => (Math.abs(v) >= 100 ? Math.round(v).toString() : v.toFixed(1))
const monthYear = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', year: 'numeric' })

/**
 * A single pathology parameter card for the Reports section: name + unit, status
 * badge, reference range + clinical area, the trend delta, and an embedded
 * TrendChart (which carries the actual readings). Out-of-range parameters take a
 * crimson edge and an urgent crimson status badge.
 */
export function LabParameterCard({ parameter, className }: LabParameterCardProps) {
  const { dataPoints, referenceRange } = parameter
  const latest = dataPoints[dataPoints.length - 1]
  const previous = dataPoints[dataPoints.length - 2]
  const { low, high, label } = referenceRange

  const out = latest.value < low || latest.value > high
  const statusLabel = latest.value > high ? 'High' : latest.value < low ? 'Low' : 'Normal'
  const delta = previous ? latest.value - previous.value : null
  const deltaLabel = delta === null ? null : `${delta > 0 ? '+' : delta < 0 ? '−' : ''}${fmt(Math.abs(delta))}`
  const movement =
    delta === null
      ? 'Single reading'
      : delta === 0
        ? `No change since ${monthYear(previous.date)}`
        : `${delta > 0 ? 'Increased' : 'Decreased'} since ${monthYear(previous.date)}`

  return (
    <div
      className={cn('flex w-full flex-col', className)}
      style={{
        background: 'var(--neutral-card)',
        border: `1px solid ${out ? 'color-mix(in srgb, var(--crimson-30) 55%, transparent)' : 'var(--neutral-stroke)'}`,
        borderRadius: 'var(--radius-12)',
        padding: 'var(--space-16)',
        gap: 'var(--space-16)',
      }}
    >
      {/* Header — name + unit, reference range + clinical area, status badge */}
      <div className="flex items-start justify-between" style={{ gap: 'var(--space-12)' }}>
        <div className="flex min-w-0 flex-col" style={{ gap: 'var(--space-4)' }}>
          <p className="type-title-m" style={{ color: 'var(--color-text-primary)' }}>
            {parameter.name}{' '}
            <span className="type-body-text-m" style={{ color: 'var(--color-text-muted)' }}>({parameter.unit})</span>
          </p>
          <span className="type-body-text-m" style={{ color: 'var(--color-text-secondary)' }}>
            Range {label} {parameter.unit} · {parameter.clinicalLabel}
          </span>
        </div>
        <Badge label={statusLabel} colour={out ? 'crimson' : 'green'} className="shrink-0" />
      </div>

      {/* Trend delta */}
      <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
        {deltaLabel && (
          <span
            className="type-body-s inline-flex items-center"
            style={{
              background: out ? 'var(--badge-red-bg)' : 'var(--badge-green-bg)',
              color: out ? 'var(--badge-red-text)' : 'var(--badge-green-text)',
              borderRadius: 'var(--radius-full)',
              padding: 'var(--space-2) var(--space-8)',
              whiteSpace: 'nowrap',
            }}
          >
            {deltaLabel}
          </span>
        )}
        <span className="type-body-text-m" style={{ color: 'var(--color-text-muted)' }}>{movement}</span>
      </div>

      {/* Trend chart — carries the per-date readings */}
      <TrendChart dataPoints={dataPoints} referenceRange={referenceRange} />
    </div>
  )
}
