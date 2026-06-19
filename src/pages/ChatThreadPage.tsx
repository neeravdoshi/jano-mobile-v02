import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatThreadHeader, MessageComposer } from '@/components/organisms'
import { MessageBubble, DayDivider, ThreadNote } from '@/components/molecules'
import { currentDoctor, getConversation } from '@/lib/mockData'

export function ChatThreadPage() {
  const { id = 'c-1' } = useParams()
  const navigate = useNavigate()
  const conversation = getConversation(id)
  const [draft, setDraft] = useState('')

  // Open at the most recent message, like a real chat — jump to the bottom on load.
  const transcriptRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = transcriptRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [id])

  return (
    <div className="relative flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ChatThreadHeader
        title={conversation.patientName}
        subtitle={`MRN ${conversation.mrn}`}
        participants={conversation.participants}
        onBack={() => navigate('/chat')}
      />

      {/* Scrolling transcript — extra bottom padding so the last message clears the floating composer */}
      <div
        ref={transcriptRef}
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ gap: 'var(--space-16)', padding: 'var(--space-20) var(--space-16) var(--space-96)' }}
      >
        {conversation.items.map((item, i) => {
          if (item.kind === 'day') return <DayDivider key={`d-${i}`} label={item.label} />
          if (item.kind === 'note') return <ThreadNote key={`n-${i}`}>{item.text}</ThreadNote>
          const m = item.message
          return (
            <MessageBubble
              key={m.id}
              variant="classic"
              senderName={m.senderName}
              time={m.time}
              text={m.text}
              direction={m.direction}
              channel={m.channel}
            />
          )
        })}
      </div>

      {/* Floating composer — sits above the transcript, which scrolls behind it */}
      <div
        className="absolute right-0 bottom-0 left-0"
        style={{ padding: '0 var(--space-16) var(--space-16)' }}
      >
        <MessageComposer
          variant="floating"
          placeholder={`Reply as ${currentDoctor.name}`}
          value={draft}
          onChange={setDraft}
          onSend={() => setDraft('')}
        />
      </div>
    </div>
  )
}
