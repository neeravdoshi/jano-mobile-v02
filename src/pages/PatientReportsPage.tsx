import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { ScreenHeader, LabParameterCard, LabResultsTable, AskDock } from '@/components/organisms'
import { FilterTabs, SearchAskSwitch } from '@/components/molecules'
import { getPatient, getPathologyParameters, pathologyCategories, trendDates } from '@/lib/mockData'
import type { PathologyParameter } from '@/types'

const INITIAL_VISIBLE = 3

const latestValue = (p: PathologyParameter) => p.dataPoints[p.dataPoints.length - 1].value
const isOutOfRange = (p: PathologyParameter) => {
  const v = latestValue(p)
  return v < p.referenceRange.low || v > p.referenceRange.high
}
const changeMagnitude = (p: PathologyParameter) => {
  const pts = p.dataPoints
  const prev = pts[pts.length - 2]?.value
  return prev === undefined ? 0 : Math.abs(pts[pts.length - 1].value - prev)
}
const rankParameters = (a: PathologyParameter, b: PathologyParameter) =>
  b.severityScore - a.severityScore || changeMagnitude(b) - changeMagnitude(a)

type ViewMode = 'chart' | 'table'
type CategoryFilter = 'all' | PathologyParameter['category']

function ViewToggle({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  const options: { id: ViewMode; label: string }[] = [
    { id: 'chart', label: 'Chart' },
    { id: 'table', label: 'Table' },
  ]
  return (
    <div
      className="inline-flex self-start"
      style={{ background: 'var(--neutral-sunken)', borderRadius: 'var(--radius-full)', padding: 'var(--space-2)', gap: 'var(--space-2)' }}
    >
      {options.map(opt => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-pressed={active}
            className="type-action-s"
            style={{
              padding: 'var(--space-6) var(--space-16)',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              background: active ? 'var(--neutral-card)' : 'transparent',
              color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              boxShadow: active ? 'var(--shadow-soft-xs)' : 'none',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function ParameterGroup({
  title,
  tone,
  params,
  visibleCount,
  onShowMore,
}: {
  title: string
  tone: 'danger' | 'ok'
  params: PathologyParameter[]
  visibleCount: number
  onShowMore: () => void
}) {
  if (params.length === 0) return null
  const visible = params.slice(0, visibleCount)
  const remaining = params.length - visible.length

  return (
    <section className="flex flex-col" style={{ gap: 'var(--space-12)' }}>
      <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
        <span
          style={{
            width: 'var(--space-4)',
            height: 'var(--space-16)',
            borderRadius: 'var(--radius-full)',
            background: tone === 'danger' ? 'var(--crimson-base)' : 'var(--status-stable)',
            flexShrink: 0,
          }}
        />
        <h2 className="type-title-s" style={{ color: 'var(--color-text-primary)' }}>
          {params.length} {title}
        </h2>
      </div>
      <div className="flex flex-col" style={{ gap: 'var(--space-12)' }}>
        {visible.map(p => (
          <LabParameterCard key={p.id} parameter={p} />
        ))}
      </div>
      {remaining > 0 && (
        <button
          type="button"
          onClick={onShowMore}
          className="type-action-s inline-flex items-center justify-center self-start"
          style={{
            gap: 'var(--space-4)',
            padding: 'var(--space-8) var(--space-16)',
            background: 'transparent',
            color: 'var(--crimson-base)',
            border: '1px solid var(--neutral-stroke)',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
          }}
        >
          Show {remaining} more
          <ChevronDown size={16} strokeWidth={1.5} />
        </button>
      )}
    </section>
  )
}

export function PatientReportsPage() {
  const { id = 'p-1' } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const all = getPathologyParameters(id)

  const [view, setView] = useState<ViewMode>('chart')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState({ out: INITIAL_VISIBLE, in: INITIAL_VISIBLE })

  const resetVisible = () => setVisible({ out: INITIAL_VISIBLE, in: INITIAL_VISIBLE })
  const handleCategory = (c: CategoryFilter) => { resetVisible(); setCategory(c) }
  const handleQuery = (q: string) => { resetVisible(); setQuery(q) }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all
      .filter(p => category === 'all' || p.category === category)
      .filter(p => !q || p.name.toLowerCase().includes(q) || p.clinicalLabel.toLowerCase().includes(q))
      .sort(rankParameters)
  }, [all, category, query])

  const outParams = filtered.filter(isOutOfRange)
  const inParams = filtered.filter(p => !isOutOfRange(p))

  const categoryTabs = [
    { id: 'all' as CategoryFilter, label: 'All', count: all.length },
    ...pathologyCategories.map(c => ({ id: c as CategoryFilter, label: c, count: all.filter(p => p.category === c).length })),
  ]

  return (
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="default" title="Reports" subtitle={`${patient.name} · MRN ${patient.mrn}`} onBack={() => navigate(-1)} />

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ padding: 'var(--space-12) var(--space-12) var(--space-80)', gap: 'var(--space-16)' }}
      >
        <div className="flex items-center justify-between" style={{ gap: 'var(--space-8)' }}>
          <span className="type-overline-xs" style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pathology
          </span>
          <ViewToggle value={view} onChange={setView} />
        </div>

        <FilterTabs className="shrink-0" options={categoryTabs} active={category} onChange={handleCategory} />

        {filtered.length === 0 ? (
          <p className="type-body-text-m" style={{ color: 'var(--color-text-muted)', padding: 'var(--space-16)', textAlign: 'center' }}>
            No parameters match your filters.
          </p>
        ) : view === 'table' ? (
          <LabResultsTable parameters={filtered} dates={trendDates} />
        ) : (
          <div className="flex flex-col" style={{ gap: 'var(--space-24)' }}>
            <ParameterGroup
              title="out of range"
              tone="danger"
              params={outParams}
              visibleCount={visible.out}
              onShowMore={() => setVisible(v => ({ ...v, out: v.out + INITIAL_VISIBLE }))}
            />
            <ParameterGroup
              title="within range"
              tone="ok"
              params={inParams}
              visibleCount={visible.in}
              onShowMore={() => setVisible(v => ({ ...v, in: v.in + INITIAL_VISIBLE }))}
            />
          </div>
        )}
      </div>

      <AskDock className="absolute inset-x-0 bottom-0">
        <SearchAskSwitch
          askPlaceholder="Ask AI about these results"
          searchPlaceholder="Search parameters"
          onAskActivate={() => navigate(`/ask?from=reports&patient=${id}`)}
          searchValue={query}
          onSearchChange={handleQuery}
        />
      </AskDock>
    </div>
  )
}
