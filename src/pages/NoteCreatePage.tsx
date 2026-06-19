import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Mic, Square, Keyboard, X } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/atoms'
import { WaveformPlayer } from '@/components/molecules'
import { ScreenHeader } from '@/components/organisms'
import { getPatient } from '@/lib/mockData'
import type { NoteType } from '@/types'

type Mode = 'choose' | 'recording' | 'recorded' | 'typing'

const TYPE_LABEL: Record<NoteType, string> = {
  progress: 'progress note',
  initial: 'initial assessment',
  discharge: 'discharge note',
}

const MOCK_TRANSCRIPT =
  'The patient has shown significant improvement in mobility and a noticeable decrease in pain in the left knee after starting the new physical therapy regimen.'

// Live-recording waveform heights (px), cycled by a tick to fake audio levels.
const LIVE = [6, 12, 18, 10, 22, 14, 8, 16, 24, 12, 6, 18, 14, 10, 20, 8, 16, 12, 22, 10, 14, 18, 8, 12, 20, 16, 10, 14]

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function NoteCreatePage() {
  const { id = 'p-1' } = useParams()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const type = (params.get('type') as NoteType) ?? 'progress'
  const patient = getPatient(id)

  const [mode, setMode] = useState<Mode>('choose')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [tick, setTick] = useState(0)

  // Recording clock + waveform animation.
  useEffect(() => {
    if (mode !== 'recording') return
    const clock = setInterval(() => setElapsed(e => e + 1), 1000)
    const anim = setInterval(() => setTick(t => t + 1), 120)
    return () => { clearInterval(clock); clearInterval(anim) }
  }, [mode])

  const startRecording = () => { setElapsed(0); setMode('recording') }
  const stopRecording = () => {
    if (!body) setBody(MOCK_TRANSCRIPT)
    setMode('recorded')
  }
  const reset = () => { setElapsed(0); setMode('choose') }

  const save = () => navigate(`/patients/${id}/notes`)
  const canSave = mode === 'recorded' || (mode === 'typing' && body.trim().length > 0)

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader
        variant="default"
        title={`New ${TYPE_LABEL[type]}`}
        subtitle={`MRN ${patient.mrn}`}
        onBack={() => navigate(-1)}
      />

      <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar" style={{ padding: 'var(--space-16)', gap: 'var(--space-16)' }}>
        <Input placeholder="Note title" value={title} onChange={e => setTitle(e.target.value)} />

        {/* Body surface */}
        <div
          className="flex flex-1 flex-col"
          style={{ background: 'var(--neutral-card)', borderRadius: 'var(--radius-16)', padding: 'var(--space-20)', gap: 'var(--space-16)', minHeight: 280 }}
        >
          {mode === 'choose' && (
            <div className="flex flex-1 flex-col items-center justify-center" style={{ gap: 'var(--space-16)' }}>
              <button
                type="button"
                aria-label="Record voice note"
                onClick={startRecording}
                className="flex items-center justify-center transition-transform duration-150 active:scale-95"
                style={{ width: 'var(--space-64)', height: 'var(--space-64)', borderRadius: 'var(--radius-full)', background: 'var(--crimson-base)', color: 'var(--color-text-inverse)', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-hard-lg)' }}
              >
                <Mic size={26} strokeWidth={1.5} />
              </button>
              <span className="type-body-text-m" style={{ color: 'var(--color-text-muted)' }}>Tap to record a voice note</span>
              <button
                type="button"
                onClick={() => setMode('typing')}
                className="flex items-center"
                style={{ gap: 'var(--space-6)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--crimson-base)', padding: 'var(--space-4)' }}
              >
                <Keyboard size={16} strokeWidth={1.5} />
                <span className="type-action-s">Type instead</span>
              </button>
            </div>
          )}

          {mode === 'recording' && (
            <div className="flex flex-1 flex-col items-center justify-center" style={{ gap: 'var(--space-20)' }}>
              {/* Live recording bar */}
              <div className="flex w-full items-center" style={{ gap: 'var(--space-12)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 'var(--radius-full)', background: 'var(--crimson-base)', flexShrink: 0 }} className="animate-pulse" />
                <div className="flex min-w-0 flex-1 items-center" style={{ gap: 'var(--space-2)', height: 'var(--space-24)' }}>
                  {LIVE.map((_, i) => (
                    <span key={i} style={{ flex: 1, minWidth: 2, height: LIVE[(i + tick) % LIVE.length], borderRadius: 'var(--radius-full)', background: 'var(--crimson-30)' }} />
                  ))}
                </div>
                <span className="type-overline-xs shrink-0" style={{ color: 'var(--charcoal-50)', letterSpacing: '0.5px' }}>{fmt(elapsed)}</span>
              </div>

              <div className="flex items-center" style={{ gap: 'var(--space-24)' }}>
                <button
                  type="button"
                  aria-label="Discard recording"
                  onClick={reset}
                  className="flex items-center justify-center"
                  style={{ width: 'var(--space-48)', height: 'var(--space-48)', borderRadius: 'var(--radius-full)', background: 'var(--neutral-sunken)', color: 'var(--charcoal-base)', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Stop recording"
                  onClick={stopRecording}
                  className="flex items-center justify-center"
                  style={{ width: 'var(--space-64)', height: 'var(--space-64)', borderRadius: 'var(--radius-full)', background: 'var(--crimson-base)', color: 'var(--color-text-inverse)', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-hard-lg)' }}
                >
                  <Square size={24} strokeWidth={1.5} fill="currentColor" />
                </button>
              </div>
              <span className="type-body-text-m" style={{ color: 'var(--color-text-muted)' }}>Recording… tap to stop</span>
            </div>
          )}

          {mode === 'recorded' && (
            <div className="flex flex-1 flex-col" style={{ gap: 'var(--space-12)' }}>
              <WaveformPlayer duration={fmt(elapsed) === '0:00' ? '0:06' : fmt(elapsed)} />
              <div className="flex items-center justify-between">
                <span className="type-overline-xs" style={{ color: 'var(--crimson-base)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Transcript</span>
                <button type="button" onClick={reset} className="type-action-s" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal-oslo)' }}>Re-record</button>
              </div>
              <Textarea rows={6} value={body} onChange={e => setBody(e.target.value)} placeholder="Transcript…" />
            </div>
          )}

          {mode === 'typing' && (
            <div className="flex flex-1 flex-col" style={{ gap: 'var(--space-12)' }}>
              <Textarea rows={8} autoFocus value={body} onChange={e => setBody(e.target.value)} placeholder="Write the note…" />
              <button
                type="button"
                onClick={() => { setBody(''); setMode('choose') }}
                className="flex items-center self-start"
                style={{ gap: 'var(--space-6)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--crimson-base)', padding: 'var(--space-4)' }}
              >
                <Mic size={16} strokeWidth={1.5} />
                <span className="type-action-s">Record instead</span>
              </button>
            </div>
          )}
        </div>

        <Button variant="primary" size="md" fullWidth disabled={!canSave} onClick={save}>Save note</Button>
      </div>
    </div>
  )
}
