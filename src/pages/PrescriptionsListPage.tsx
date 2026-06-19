import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FileText, UploadCloud } from 'lucide-react'
import { Fab } from '@/components/atoms'
import { SearchBar, FilterTabs, DrawerOption, type FilterTabOption } from '@/components/molecules'
import { ScreenHeader, PrescriptionCard, BottomDrawer } from '@/components/organisms'
import { getPatient, getPrescriptions } from '@/lib/mockData'
import type { PrescriptionStatus } from '@/types'

type Filter = 'all' | PrescriptionStatus

// Time buckets, rendered in this order.
const GROUP_ORDER = ['This week', 'This month', 'Earlier']

export function PrescriptionsListPage() {
  const { id = 'p-1' } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const all = getPrescriptions(id)

  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const tabs: FilterTabOption<Filter>[] = useMemo(() => {
    const by = (s: PrescriptionStatus) => all.filter(r => r.status === s).length
    return [
      { id: 'all',    label: 'All',    count: all.length },
      { id: 'draft',  label: 'Drafts', count: by('draft') },
      { id: 'signed', label: 'Signed', count: by('signed') },
    ]
  }, [all])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter(r => {
      const matchesFilter = filter === 'all' || r.status === filter
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.doctor.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [all, filter, query])

  const groups = GROUP_ORDER
    .map(label => ({ label, items: visible.filter(r => r.group === label) }))
    .filter(g => g.items.length > 0)

  return (
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader
        variant="default"
        title="Prescriptions"
        subtitle={`MRN ${patient.mrn}`}
        onBack={() => navigate(-1)}
      />

      <div
        className="flex flex-col"
        style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        <div style={{ padding: '0 var(--space-16)' }}>
          <SearchBar
            placeholder="Search prescriptions"
            value={query}
            onChange={setQuery}
          />
        </div>
        <FilterTabs className="px-[var(--space-16)]" options={tabs} active={filter} onChange={setFilter} />
      </div>

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ gap: 'var(--space-20)', padding: '0 var(--space-16) var(--space-80)' }}
      >
        {groups.map(group => (
          <div key={group.label} className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
            <span
              className="type-overline-xs"
              style={{ color: 'var(--charcoal-oslo)', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              {group.label}
            </span>
            {group.items.map(r => (
              <PrescriptionCard
                key={r.id}
                title={r.title}
                createdAt={r.createdAt}
                status={r.status}
                summary={r.summary}
                department={r.department}
                doctor={r.doctor}
                onClick={() => navigate(`/patients/${id}/prescriptions/${r.id}`)}
              />
            ))}
          </div>
        ))}

        {groups.length === 0 && (
          <p
            className="type-body-text-m"
            style={{ color: 'var(--color-text-muted)', padding: 'var(--space-24) 0', textAlign: 'center' }}
          >
            No prescriptions match your search.
          </p>
        )}
      </div>

      {/* FAB → new-prescription drawer */}
      <div className="absolute" style={{ right: 'var(--space-16)', bottom: 'var(--space-24)' }}>
        <Fab open={drawerOpen} onClick={() => setDrawerOpen(v => !v)} aria-label="New prescription" />
      </div>

      <BottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="New prescription">
        <DrawerOption
          icon={FileText}
          title="Type prescription"
          subtitle="Write a new prescription"
          onClick={() => navigate(`/patients/${id}/prescriptions/new`)}
        />
        <DrawerOption
          icon={UploadCloud}
          title="Upload prescription"
          subtitle="Attach a scanned Rx or PDF"
          onClick={() => navigate(`/patients/${id}/prescriptions/upload`)}
        />
      </BottomDrawer>
    </div>
  )
}
