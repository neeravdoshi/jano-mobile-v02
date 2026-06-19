import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { ScreenHeader } from '@/components/organisms'
import { Badge, type BadgeColour } from '@/components/atoms'
import { SearchBar, FilterTabs, type FilterTabOption } from '@/components/molecules'
import { currentDoctor, patients } from '@/lib/mockData'
import type { EncounterType } from '@/types'

type Filter = 'All' | EncounterType

const encounterColour: Record<EncounterType, BadgeColour> = {
  IPD: 'red',
  OPD: 'blue',
  Referral: 'yellow',
}

/**
 * Distilled patients list (V2).
 * Same content as PatientsPage — header, search, filter tabs, every patient field —
 * but the eight bordered cards collapse into one calm surface with hairline-divided
 * rows, so the eye scans names instead of counting boxes.
 */
export function PatientsV2Page() {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const tabs: FilterTabOption<Filter>[] = useMemo(() => {
    const by = (t: EncounterType) => patients.filter(p => p.encounterType === t).length
    return [
      { id: 'All',      label: 'All',      count: patients.length },
      { id: 'IPD',      label: 'IPD',      count: by('IPD') },
      { id: 'OPD',      label: 'OPD',      count: by('OPD') },
      { id: 'Referral', label: 'Referral', count: by('Referral') },
    ]
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return patients.filter(p => {
      const matchesFilter = filter === 'All' || p.encounterType === filter
      const matchesQuery =
        !q || p.name.toLowerCase().includes(q) || p.mrn.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="doctor" title={currentDoctor.name} subtitle={currentDoctor.hospital} />

      <div
        className="flex flex-col"
        style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        <div style={{ padding: '0 var(--space-16)' }}>
          <SearchBar
            showFilter
            placeholder="Search by name, MRN, or phone"
            value={query}
            onChange={setQuery}
          />
        </div>
        <FilterTabs
          className="px-[var(--space-16)]"
          options={tabs}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div
        className="flex-1 overflow-y-auto no-scrollbar"
        style={{ padding: '0 var(--space-16) var(--space-24)' }}
      >
        {visible.length > 0 ? (
          <div
            style={{
              background: 'var(--neutral-card)',
              borderRadius: 'var(--radius-16)',
              overflow: 'hidden',
            }}
          >
            {visible.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="flex w-full items-center text-left transition-colors duration-150 hover:bg-[var(--neutral-sunken)]"
                style={{
                  gap: 'var(--space-12)',
                  padding: 'var(--space-20) var(--space-16)',
                  borderTop: i === 0 ? 'none' : '1px solid var(--neutral-stroke)',
                  cursor: 'pointer',
                }}
              >
                {/* space-8 between the name/badge line and the meta line — a touch more
                    breathing room than the v1 card (page-level choice, not the shared PatientCard) */}
                <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-8)' }}>
                  <div className="flex items-center" style={{ gap: 'var(--space-8)' }}>
                    <span className="type-title-m truncate" style={{ color: 'var(--color-text-primary)' }}>
                      {p.name}
                    </span>
                    <Badge label={p.encounterType} colour={encounterColour[p.encounterType]} className="shrink-0" />
                  </div>
                  <span className="type-body-text-m truncate" style={{ color: 'var(--charcoal-oslo)' }}>
                    {[p.ward, p.bed, `MRN ${p.mrn}`].filter(Boolean).join(' · ')}
                  </span>
                </div>
                <ChevronRight size={18} strokeWidth={1.5} style={{ color: 'var(--charcoal-oslo)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        ) : (
          <p
            className="type-body-text-m"
            style={{ color: 'var(--color-text-muted)', padding: 'var(--space-24) 0', textAlign: 'center' }}
          >
            No patients match your search. Try a different name or MRN.
          </p>
        )}
      </div>
    </div>
  )
}
