import { cn } from '@/lib/utils'
import type { PathologyParameter } from '@/types'

export interface LabResultsTableProps {
  parameters: PathologyParameter[]
  /** Sampling dates (oldest → newest); the table shows them newest-first. */
  dates: string[]
  className?: string
}

const fmt = (v: number) => (Math.abs(v) >= 100 ? Math.round(v).toString() : v.toFixed(1))
const dayMonth = (iso: string) => {
  const d = new Date(iso)
  return { day: d.toLocaleString('en-US', { day: '2-digit' }), month: d.toLocaleString('en-US', { month: 'short' }) }
}

/**
 * Dense grid of every pathology parameter (rows) across sampling dates (columns,
 * newest first). Out-of-range readings are shown in crimson. Scrolls horizontally.
 */
export function LabResultsTable({ parameters, dates, className }: LabResultsTableProps) {
  const cols = [...dates].reverse()
  const cellStyle: React.CSSProperties = { padding: 'var(--space-8) var(--space-12)', textAlign: 'right', whiteSpace: 'nowrap' }

  return (
    <div
      className={cn('w-full overflow-x-auto no-scrollbar', className)}
      style={{ background: 'var(--neutral-card)', border: '1px solid var(--neutral-stroke)', borderRadius: 'var(--radius-12)' }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              className="type-overline-xs"
              style={{ ...cellStyle, textAlign: 'left', position: 'sticky', left: 0, background: 'var(--neutral-card)', color: 'var(--color-text-muted)' }}
            >
              Parameter
            </th>
            {cols.map(iso => {
              const { day, month } = dayMonth(iso)
              return (
                <th key={iso} style={{ ...cellStyle, textAlign: 'center' }}>
                  <span className="type-body-s block" style={{ color: 'var(--color-text-primary)' }}>{day}</span>
                  <span className="type-body-xs block" style={{ color: 'var(--color-text-muted)' }}>{month}</span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {parameters.map(param => (
            <tr key={param.id} style={{ borderTop: '1px solid var(--neutral-stroke)' }}>
              <td style={{ ...cellStyle, textAlign: 'left', position: 'sticky', left: 0, background: 'var(--neutral-card)' }}>
                <span className="type-body-s block" style={{ color: 'var(--color-text-primary)' }}>{param.name}</span>
                <span className="type-body-xs block" style={{ color: 'var(--color-text-muted)' }}>{param.unit}</span>
              </td>
              {cols.map(iso => {
                const point = param.dataPoints.find(pt => pt.date === iso)
                const danger = point !== undefined && (point.value < param.referenceRange.low || point.value > param.referenceRange.high)
                return (
                  <td key={iso} className="type-body-s" style={{ ...cellStyle, color: danger ? 'var(--crimson-base)' : 'var(--color-text-secondary)' }}>
                    {point ? fmt(point.value) : '—'}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
