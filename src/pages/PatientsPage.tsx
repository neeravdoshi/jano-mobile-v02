import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenHeader, PatientCard } from '@/components/organisms'
import { SearchBar, FilterTabs, type FilterTabOption } from '@/components/molecules'
import { currentDoctor, patients } from '@/lib/mockData'
import type { EncounterType } from '@/types'

type Filter = 'All' | EncounterType

export function PatientsPage() {
  const navigate = useNavigate()
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
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.mrn.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader
        variant="doctor"
        title={currentDoctor.name}
        subtitle={currentDoctor.hospital}
      />

      <div
        className="flex flex-col"
        style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        <div style={{ padding: '0 var(--space-16)' }}>
          <SearchBar
            showFilter
            placeholder="Search by Name, MRN or Phone"
            value={query}
            onChange={setQuery}
          />
        </div>
        {/* Full-bleed so the row scrolls to the screen edge; left inset matches the search field */}
        <FilterTabs
          className="px-[var(--space-16)]"
          options={tabs}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ gap: 'var(--space-8)', padding: '0 var(--space-16) var(--space-24)' }}
      >
        {visible.map(p => (
          <PatientCard
            key={p.id}
            name={p.name}
            encounterType={p.encounterType}
            ward={p.ward}
            bed={p.bed}
            mrn={p.mrn}
            onClick={() => navigate(`/patients/${p.id}`)}
          />
        ))}

        {visible.length === 0 && (
          <p
            className="type-body-text-m"
            style={{ color: 'var(--color-text-muted)', padding: 'var(--space-24) 0', textAlign: 'center' }}
          >
            No patients match your search.
          </p>
        )}
      </div>
    </div>
  )
}
