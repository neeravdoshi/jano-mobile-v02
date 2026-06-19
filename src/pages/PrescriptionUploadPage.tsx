import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UploadCloud, FileText, X } from 'lucide-react'
import { Button } from '@/components/atoms'
import { ScreenHeader } from '@/components/organisms'
import { getPatient } from '@/lib/mockData'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function PrescriptionUploadPage() {
  const { id = 'p-1' } = useParams()
  const navigate = useNavigate()
  const patient = getPatient(id)
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--neutral-app-bg)' }}>
      <ScreenHeader
        variant="default"
        title="Upload prescription"
        subtitle={`MRN ${patient.mrn}`}
        onBack={() => navigate(-1)}
      />

      <div
        className="flex flex-1 flex-col overflow-y-auto no-scrollbar"
        style={{ padding: 'var(--space-16)', gap: 'var(--space-16)' }}
      >
        {/* Upload panel */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            background: 'var(--neutral-card)',
            borderRadius: 'var(--radius-16)',
            padding: 'var(--space-32) var(--space-24)',
            gap: 'var(--space-16)',
          }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 'var(--space-64)',
              height: 'var(--space-64)',
              borderRadius: 'var(--radius-full)',
              background: 'var(--crimson-10)',
              color: 'var(--crimson-base)',
            }}
          >
            <UploadCloud size={28} strokeWidth={1.5} />
          </span>

          <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
            <h2 className="type-title-l" style={{ color: 'var(--color-text-primary)' }}>Upload prescription</h2>
            <p className="type-body-text-m" style={{ color: 'var(--color-text-muted)' }}>
              Add an outside prescription, scanned Rx, or PDF for this patient. Supported file types: PDF, JPG, PNG.
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] ?? null)}
          />
          <Button variant="outline" size="md" onClick={() => inputRef.current?.click()}>
            Select prescription
          </Button>
        </div>

        {/* Selected file preview */}
        {file && (
          <div
            className="flex items-center"
            style={{
              background: 'var(--neutral-card)',
              borderRadius: 'var(--radius-12)',
              padding: 'var(--space-12) var(--space-16)',
              gap: 'var(--space-12)',
              boxShadow: 'var(--shadow-soft-xs)',
            }}
          >
            <span
              className="flex shrink-0 items-center justify-center"
              style={{
                width: 'var(--space-40)',
                height: 'var(--space-40)',
                borderRadius: 'var(--radius-8)',
                background: 'var(--crimson-10)',
                color: 'var(--crimson-base)',
              }}
            >
              <FileText size={20} strokeWidth={1.5} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col" style={{ gap: 'var(--space-2)' }}>
              <span className="type-title-s truncate" style={{ color: 'var(--color-text-primary)' }}>{file.name}</span>
              <span className="type-body-xs" style={{ color: 'var(--charcoal-oslo)' }}>{formatFileSize(file.size)}</span>
            </span>
            <button
              type="button"
              aria-label="Remove file"
              onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = '' }}
              className="flex shrink-0 items-center justify-center"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal-oslo)', padding: 'var(--space-4)' }}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        )}

        <div className="flex-1" />

        <Button
          variant="primary"
          size="md"
          fullWidth
          disabled={!file}
          onClick={() => navigate(`/patients/${id}/prescriptions`)}
        >
          Attach to record
        </Button>
      </div>
    </div>
  )
}
