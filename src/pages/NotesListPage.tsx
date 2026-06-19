import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { NotebookPen, FileCheck2, ClipboardList } from 'lucide-react'
import { Fab } from '@/components/atoms'
import { SearchBar, FilterTabs, DrawerOption, type FilterTabOption } from '@/components/molecules'
import { ScreenHeader, NoteCard, BottomDrawer } from '@/components/organisms'
import { getPatient, getNotes } from '@/lib/mockData'
import type { Note, NoteType } from '@/types'

type Filter = 'all' | NoteType

export function NotesListPage() {
  const { id = 'p-1' } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const all = getNotes(id)

  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const tabs: FilterTabOption<Filter>[] = useMemo(() => {
    const by = (t: NoteType) => all.filter(n => n.type === t).length
    return [
      { id: 'all',       label: 'All',                count: all.length },
      { id: 'progress',  label: 'Progress Note',      count: by('progress') },
      { id: 'initial',   label: 'Initial Assessment', count: by('initial') },
      { id: 'discharge', label: 'Discharge Note',     count: by('discharge') },
    ]
  }, [all])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter(n => {
      const matchesFilter = filter === 'all' || n.type === filter
      const matchesQuery =
        !q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q) || n.department.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [all, filter, query])

  // Two-column masonry: split by index so heights stagger naturally.
  const colA = visible.filter((_, i) => i % 2 === 0)
  const colB = visible.filter((_, i) => i % 2 === 1)

  const card = (n: Note) => (
    <NoteCard
      key={n.id}
      type={n.type}
      title={n.title}
      body={n.body}
      department={n.department}
      onClick={() => navigate(`/patients/${id}/notes/${n.id}`)}
    />
  )

  const startNote = (type: NoteType) => navigate(`/patients/${id}/notes/new?type=${type}`)

  return (
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="default" title={patient.name} subtitle={`MRN ${patient.mrn}`} onBack={() => navigate(-1)} />

      <div className="flex flex-col" style={{ paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)', gap: 'var(--space-16)' }}>
        <div style={{ padding: '0 var(--space-16)' }}>
          <SearchBar placeholder="Search notes" value={query} onChange={setQuery} />
        </div>
        <FilterTabs className="px-[var(--space-16)]" options={tabs} active={filter} onChange={setFilter} />
      </div>

      <div className="flex flex-1 overflow-y-auto no-scrollbar" style={{ gap: 'var(--space-8)', padding: '0 var(--space-16) var(--space-80)' }}>
        {visible.length > 0 ? (
          <>
            <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-8)' }}>{colA.map(card)}</div>
            <div className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-8)' }}>{colB.map(card)}</div>
          </>
        ) : (
          <p className="type-body-text-m" style={{ color: 'var(--color-text-muted)', padding: 'var(--space-24) 0', textAlign: 'center', width: '100%' }}>
            No notes match your search.
          </p>
        )}
      </div>

      {/* FAB → new-note drawer */}
      <div className="absolute" style={{ right: 'var(--space-16)', bottom: 'var(--space-24)' }}>
        <Fab open={drawerOpen} onClick={() => setDrawerOpen(v => !v)} aria-label="Add note" />
      </div>

      <BottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Add note">
        <DrawerOption icon={NotebookPen}    title="Progress note"      subtitle="Capture today's progress"    onClick={() => startNote('progress')} />
        <DrawerOption icon={FileCheck2}     title="Discharge note"     subtitle="Summarise the discharge"     onClick={() => startNote('discharge')} />
        <DrawerOption icon={ClipboardList}  title="Initial assessment" subtitle="First clinical assessment"   onClick={() => startNote('initial')} />
      </BottomDrawer>
    </div>
  )
}
