import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, Sparkles, User, FlaskConical, NotebookPen, ClipboardList, Calendar, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SearchBar, SuggestionPill, AskMessage, AskAction } from '@/components/molecules'
import { PatientCard, LabParameterCard, NoteCard } from '@/components/organisms'
import { getAskContext, getPatient, getNote, pathologyParameters } from '@/lib/mockData'
import type { AskMessageEntry, AskWidget, AskActionIcon } from '@/types'

// Semantic action-icon key → Lucide glyph.
const ACTION_ICON: Record<AskActionIcon, LucideIcon> = {
  profile: User,
  report: FlaskConical,
  note: NotebookPen,
  prescription: ClipboardList,
  schedule: Calendar,
}

const THINKING_MS = 850

/**
 * Ask AI — the agent entry point. Reached by tapping the magical `ask` SearchBar
 * anywhere (Home, Reports …); `?from=` picks the greeting, suggestion pills and
 * the mocked reply script. Sending a prompt (pill or typed) plays a canned
 * clinical exchange. A slow crimson glow floats behind it; the back button
 * runs the entry animation in reverse before returning to the previous screen.
 */
export function AskPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const context = getAskContext(params.get('from'))
  // The patient an answer's CTAs act on (`:id` in routes). Reports passes it; the
  // home script is about Arjun, so default there.
  const patientId = params.get('patient') ?? 'p-1'
  const reduce = useReducedMotion()

  const [show, setShow] = useState(true)
  const [messages, setMessages] = useState<AskMessageEntry[]>([])
  const [turn, setTurn] = useState(0)
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState('')

  const idRef = useRef(0)
  const turnRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Back — play the exit, then return. Timed (not onExitComplete) so it stays
  // reliable across AppLayout's twin desktop/mobile mounts of this page.
  const EXIT_MS = 300
  const handleBack = () => {
    if (!show) return
    setShow(false)
    window.setTimeout(() => navigate(-1), EXIT_MS)
  }

  const hasStarted = messages.length > 0 || thinking
  // Pills: openers before the first message, then the follow-ups the last reply offered.
  const followups = !hasStarted
    ? context.openers
    : thinking
      ? []
      : context.script[turn - 1]?.followups ?? []

  // Keep the newest turn in view as the conversation grows.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, thinking, reduce])

  const send = (text: string) => {
    if (thinking) return
    // Precompute the message objects outside the state updaters — the updaters
    // stay pure (StrictMode double-invokes them; side effects inside would double-fire).
    const userMsg: AskMessageEntry = { id: `m${idRef.current++}`, author: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)
    window.setTimeout(() => {
      const t = turnRef.current
      const turnData = context.script[t]
      const reply = turnData?.reply ??
        'I’ve noted that. In the full product I’d pull this from the patient record and respond here.'
      const aiMsg: AskMessageEntry = {
        id: `m${idRef.current++}`,
        author: 'assistant',
        text: reply,
        widget: turnData?.widget,
        actions: turnData?.actions,
      }
      turnRef.current = t + 1
      setTurn(t + 1)
      setMessages(prev => [...prev, aiMsg])
      setThinking(false)
    }, THINKING_MS)
  }

  // Resolve an answer's embedded widget to a live, tappable component.
  const renderWidget = (widget: AskWidget) => {
    if (widget.kind === 'patients') {
      return (
        <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
          {widget.patients.map(p => {
            const patient = getPatient(p.id)
            return (
              <PatientCard
                key={p.id}
                name={patient.name}
                encounterType={patient.encounterType}
                mrn={patient.mrn}
                meta={p.reason}
                onClick={() => navigate(`/patients/${p.id}`)}
              />
            )
          })}
        </div>
      )
    }
    if (widget.kind === 'lab') {
      const param = pathologyParameters.find(p => p.id === widget.parameterId)
      return param ? <LabParameterCard parameter={param} /> : null
    }
    const note = getNote(widget.noteId)
    return note ? (
      <NoteCard
        type={note.type}
        title={note.title}
        body={note.body}
        department={note.department}
        onClick={() => navigate(`/patients/${patientId}/notes/${note.id}`)}
      />
    ) : null
  }

  const float = (a: number, b: number, dur: number) =>
    reduce
      ? undefined
      : { animate: { x: [0, a, -a * 0.6, 0], y: [0, b, -b * 0.5, 0], scale: [1, 1.08, 0.96, 1] },
          transition: { duration: dur, ease: 'easeInOut' as const, repeat: Infinity } }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="ask"
          className="relative flex h-full flex-col overflow-hidden"
          style={{ background: 'var(--neutral-app-bg)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: 'easeOut' }}
        >
          {/* ── Floating magical glow ── */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: '50%',
              top: '34%',
              width: 360,
              height: 360,
              marginLeft: -180,
              marginTop: -180,
              borderRadius: 'var(--radius-full)',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--crimson-base) 38%, transparent), transparent 68%)',
              filter: 'blur(36px)',
            }}
            {...float(16, -18, 15)}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: '50%',
              top: '40%',
              width: 240,
              height: 240,
              marginLeft: -90,
              marginTop: -90,
              borderRadius: 'var(--radius-full)',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--error-red) 30%, transparent), transparent 66%)',
              filter: 'blur(40px)',
            }}
            {...float(-22, 14, 19)}
          />

          {/* Safe-area spacer — clears the Dynamic Island / status bar */}
          <div className="header-safe-top shrink-0" />

          {/* ── Header ── */}
          <header
            className="relative flex shrink-0 items-center"
            style={{ paddingLeft: 'var(--space-16)', paddingRight: 'var(--space-16)', paddingBottom: 'var(--space-8)', gap: 'var(--space-12)' }}
          >
            <button
              type="button"
              onClick={handleBack}
              aria-label="Back"
              className="grid place-items-center transition-colors duration-150 hover:bg-[var(--neutral-sunken)]"
              style={{
                width: 'var(--space-40)',
                height: 'var(--space-40)',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <span className="flex items-center" style={{ gap: 'var(--space-6)' }}>
              <Sparkles size={20} strokeWidth={1.5} style={{ color: 'var(--crimson-base)' }} />
              <span className="type-title-l" style={{ color: 'var(--color-text-primary)' }}>Jano AI</span>
            </span>
          </header>

          {/* ── Body ── */}
          {!hasStarted ? (
            // Empty state — greeting + opener suggestions, centred over the glow.
            <div
              className="relative flex flex-1 flex-col items-center justify-center"
              style={{ padding: 'var(--space-24) var(--space-24) var(--space-32)', gap: 'var(--space-24)' }}
            >
              {/* Branded AI orb — a soft crimson gradient disc that gently breathes */}
              <motion.div
                className="grid place-items-center"
                style={{
                  width: 'var(--space-64)',
                  height: 'var(--space-64)',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(150deg, var(--crimson-base), var(--crimson-deep))',
                  boxShadow: '0 var(--space-8) var(--space-24) color-mix(in srgb, var(--crimson-base) 38%, transparent)',
                }}
                initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, scale: [1, 1.06, 1] }}
                transition={reduce ? undefined : { opacity: { duration: 0.4, ease: 'easeOut' }, scale: { duration: 4, ease: 'easeInOut', repeat: Infinity } }}
              >
                <Sparkles size={28} strokeWidth={1.5} style={{ color: 'var(--color-text-inverse)' }} />
              </motion.div>

              <motion.h1
                className="type-display-s text-center"
                style={{ color: 'var(--color-text-primary)', maxWidth: '18ch' }}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
              >
                {context.greeting}
              </motion.h1>
              <motion.div
                className="flex flex-col items-center"
                style={{ gap: 'var(--space-8)' }}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.18 }}
              >
                {context.openers.map(p => (
                  <SuggestionPill key={p} label={p} icon={Sparkles} onClick={() => send(p)} />
                ))}
              </motion.div>
            </div>
          ) : (
            // Conversation — scrolling thread + follow-up suggestions.
            <div
              ref={scrollRef}
              className="relative flex flex-1 flex-col overflow-y-auto no-scrollbar"
              style={{ padding: 'var(--space-16) var(--space-16) var(--space-24)', gap: 'var(--space-20)' }}
            >
              {messages.map(m => (
                <AskMessage key={m.id} author={m.author} text={m.text}>
                  {m.author === 'assistant' && m.widget && renderWidget(m.widget)}
                  {m.author === 'assistant' && m.actions && m.actions.length > 0 && (
                    <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
                      {m.actions.map(a => (
                        <AskAction
                          key={a.to + a.label}
                          label={a.label}
                          icon={ACTION_ICON[a.icon ?? 'profile']}
                          onClick={() => navigate(a.to.replace(':id', patientId))}
                        />
                      ))}
                    </div>
                  )}
                </AskMessage>
              ))}
              {thinking && <AskMessage author="assistant" loading />}
              {followups.length > 0 && (
                <div className="flex flex-col items-start" style={{ gap: 'var(--space-8)', paddingTop: 'var(--space-8)' }}>
                  {followups.map(p => (
                    <SuggestionPill key={p} label={p} onClick={() => send(p)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Composer ── */}
          <div className="relative" style={{ padding: 'var(--space-12) var(--space-16) var(--space-20)' }}>
            <SearchBar
              variant="ask"
              placeholder="Ask anything"
              value={input}
              onChange={setInput}
              onSubmit={send}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
