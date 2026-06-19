import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { Badge, Textarea, type BadgeColour } from '@/components/atoms'
import { WaveformPlayer } from '@/components/molecules'
import { ScreenHeader } from '@/components/organisms'
import { getPatient, getNote } from '@/lib/mockData'
import type { NoteType } from '@/types'

const typeBadge: Record<NoteType, { label: string; colour: BadgeColour }> = {
  progress:  { label: 'Progress Note',      colour: 'red'   },
  initial:   { label: 'Initial Assessment', colour: 'green' },
  discharge: { label: 'Discharge Note',     colour: 'blue'  },
}

export function NoteDetailPage() {
  const { id = 'p-1', noteId = '' } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const note = getNote(noteId)

  const [editing, setEditing] = useState(false)
  const [body, setBody] = useState(note?.body ?? '')

  if (!note) {
    return (
      <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
        <ScreenHeader variant="default" title="Note" onBack={() => navigate(-1)} />
      </div>
    )
  }

  const badge = typeBadge[note.type]

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader variant="default" title={patient.name} subtitle={`MRN ${patient.mrn}`} onBack={() => navigate(-1)} />

      <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar" style={{ padding: 'var(--space-12)' }}>
        <div className="flex flex-1 flex-col" style={{ background: 'var(--neutral-card)', borderRadius: 'var(--radius-12)', padding: 'var(--space-20) var(--space-16)', gap: 'var(--space-12)' }}>
          {/* Title + badge + date */}
          <span className="type-display-s" style={{ color: 'var(--color-text-primary)' }}>{note.title}</span>
          <div className="flex items-center justify-between">
            <Badge label={badge.label} colour={badge.colour} />
            <span className="type-overline-xs" style={{ color: 'var(--charcoal-50)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{note.date}</span>
          </div>

          <div style={{ height: 1, width: '100%', background: 'var(--neutral-stroke)' }} />

          {/* Voice note player */}
          {note.voice && <WaveformPlayer duration={note.voice.duration} />}

          {/* Transcript / body */}
          <span className="type-overline-xs" style={{ color: 'var(--crimson-base)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            {note.voice ? 'Transcript' : 'Note'}
          </span>

          {editing ? (
            <Textarea rows={8} autoFocus value={body} onChange={e => setBody(e.target.value)} />
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-left"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'text' }}
            >
              <span className="type-body-m" style={{ color: 'var(--color-text-primary)' }}>{body}</span>
            </button>
          )}

          <div className="flex-1" />

          {/* Edit affordance */}
          <div className="flex justify-center">
            {editing ? (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="type-action-s"
                style={{ background: 'var(--crimson-base)', color: 'var(--color-text-inverse)', border: 'none', cursor: 'pointer', padding: 'var(--space-8) var(--space-20)', borderRadius: 'var(--radius-full)' }}
              >
                Done
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="flex items-center"
                style={{ gap: 'var(--space-6)', background: 'var(--crimson-10)', color: 'var(--crimson-base)', border: 'none', cursor: 'pointer', padding: 'var(--space-8) var(--space-16)', borderRadius: 'var(--radius-full)' }}
              >
                <Pencil size={14} strokeWidth={1.5} />
                <span className="type-action-s">Tap to edit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
