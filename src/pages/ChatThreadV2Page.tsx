import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatThreadHeader, ChatComposer } from '@/components/organisms'
import { MessageBubble, DayDivider, ThreadNote } from '@/components/molecules'
import { currentDoctor, getConversation } from '@/lib/mockData'
import chatMotif from '@/assets/chat-motif.svg'
import type { ChatThreadItem } from '@/types'

// Colour-code thread participants, WhatsApp-group style.
const SENDER_COLORS = ['var(--crimson-deep)', 'var(--status-stable)', 'var(--badge-blue-text)']
function senderColor(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return SENDER_COLORS[h % SENDER_COLORS.length]
}

function formatNow() {
  const d = new Date()
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
  const h = d.getHours() % 12 || 12
  return `${h}:${d.getMinutes().toString().padStart(2, '0')} ${ampm}`
}

export function ChatThreadV2Page() {
  const { id = 'c-1' } = useParams()
  const navigate = useNavigate()
  const conversation = useMemo(() => getConversation(id), [id])
  const [items, setItems] = useState<ChatThreadItem[]>(conversation.items)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    setItems(conversation.items)
    setDraft('')
  }, [conversation])

  // Open at — and stay pinned to — the latest message, like a real chat.
  const transcriptRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = transcriptRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items, id])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const msgId = `local-${items.length}-${text.length}`
    setItems(prev => [
      ...prev,
      {
        kind: 'message',
        message: { id: msgId, senderName: currentDoctor.name, direction: 'outgoing', text, time: formatNow(), status: 'sent' },
      },
    ])
    setDraft('')
    // Simulate delivery → read so the ticks feel alive.
    setTimeout(() => {
      setItems(prev =>
        prev.map(it =>
          it.kind === 'message' && it.message.id === msgId
            ? { ...it, message: { ...it.message, status: 'read' } }
            : it,
        ),
      )
    }, 1200)
  }

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ChatThreadHeader
        title={conversation.patientName}
        subtitle={`MRN ${conversation.mrn}`}
        participants={conversation.participants}
        onBack={() => navigate('/chat')}
      />

      <div
        ref={transcriptRef}
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{
          gap: 'var(--space-6)',
          padding: 'var(--space-20) var(--space-16)',
          // Faint medical-glyph motif (Lucide-derived), fixed behind the scrolling messages — WhatsApp-style.
          // url() is double-quoted: Vite inlines the SVG as a data URI that contains parens + single quotes.
          backgroundColor: 'var(--neutral-app-bg)',
          backgroundImage: `url("${chatMotif}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
        }}
      >
        {items.map((item, i) => {
          if (item.kind === 'day') return <DayDivider key={`d-${i}`} label={item.label} />
          if (item.kind === 'note') return <ThreadNote key={`n-${i}`}>{item.text}</ThreadNote>

          const m = item.message
          const prev = items[i - 1]
          const showSender =
            m.direction === 'incoming' &&
            (!prev || prev.kind !== 'message' || prev.message.senderName !== m.senderName)

          return (
            <MessageBubble
              key={m.id}
              direction={m.direction}
              text={m.text}
              time={m.time}
              status={m.status}
              senderName={showSender ? m.senderName : undefined}
              senderColor={senderColor(m.senderName)}
            />
          )
        })}
      </div>

      <ChatComposer placeholder="Message" value={draft} onChange={setDraft} onSend={send} />
    </div>
  )
}
