import { colorGroups, componentRegistry } from '@/lib/componentRegistry'

const statusStyles: Record<string, string> = {
  built:       'bg-[#2D9B6F] text-white',
  'in-progress': 'bg-[#D97706] text-white',
  planned:     'bg-[var(--neutral-warm-grey)] text-[var(--charcoal-oslo)]',
}

const statusLabel: Record<string, string> = {
  built:       'Built',
  'in-progress': 'In progress',
  planned:     'Planned',
}

export function DocsPanel() {
  return (
    <aside
      className="no-scrollbar overflow-y-auto h-full flex flex-col"
      style={{
        width: 300,
        flexShrink: 0,
        background: 'var(--neutral-card)',
        borderLeft: '1px solid var(--neutral-stroke)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 20px 16px', borderBottom: '1px solid var(--neutral-stroke)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          {/* Jano logomark */}
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'var(--neutral-sunken)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'var(--charcoal-base)',
            letterSpacing: -0.5,
          }}>
            j<sup style={{ fontSize: 8, color: 'var(--crimson-base)', verticalAlign: 'super' }}>+</sup>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--charcoal-base)', letterSpacing: -0.3 }}>
            Design System
          </span>
        </div>
        <p style={{ fontSize: 11, color: 'var(--charcoal-oslo)', marginTop: 4 }}>
          Jano — Doctor Companion
        </p>
      </div>

      <div style={{ padding: '0 0 32px' }}>

        {/* ── Colors ── */}
        <Section title="Colors">
          {colorGroups.map(group => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-base)', padding: '0 20px', marginBottom: 2 }}>
                {group.label}
              </p>
              <p style={{ fontSize: 11, color: 'var(--charcoal-oslo)', padding: '0 20px', marginBottom: 8 }}>
                {group.description}
              </p>
              <div style={{ display: 'flex', padding: '0 20px', gap: 4 }}>
                {group.swatches.map(swatch => (
                  <div key={swatch.name} style={{ flex: 1, minWidth: 0 }}>
                    <div
                      title={swatch.hex}
                      style={{
                        height: 36,
                        borderRadius: 6,
                        background: swatch.hex,
                        border: swatch.hex === '#FFFFFF' ? '1px solid var(--neutral-stroke)' : 'none',
                        marginBottom: 4,
                      }}
                    />
                    <p style={{
                      fontSize: 9,
                      color: 'var(--charcoal-oslo)',
                      fontWeight: 500,
                      textAlign: 'center',
                      lineHeight: 1.2,
                    }}>
                      {swatch.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ── Typography ── */}
        <Section title="Type">
          <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <TypeSample label="Display / Titles" sample="Patient Overview" style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }} />
            <TypeSample label="Body" sample="Progress note: patient stable, vitals improving." style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.5 }} />
            <TypeSample label="Label / Caption" sample="MRN · 00291847" style={{ fontSize: 11, fontWeight: 500, color: 'var(--charcoal-oslo)' }} />
          </div>
        </Section>

        {/* ── Components ── */}
        {componentRegistry.map(section => (
          <Section key={section.label} title={section.label}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {section.components.map(comp => (
                <div
                  key={comp.name}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '8px 20px',
                    gap: 8,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--charcoal-base)', marginBottom: 1 }}>
                      {comp.name}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--charcoal-oslo)', lineHeight: 1.4 }}>
                      {comp.description}
                    </p>
                    {comp.variants && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                        {comp.variants.map(v => (
                          <span key={v.name} style={{
                            fontSize: 9, fontWeight: 500,
                            background: 'var(--neutral-sunken)',
                            color: 'var(--charcoal-oslo)',
                            borderRadius: 4, padding: '1px 5px',
                          }}>
                            {v.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span style={{ flexShrink: 0 }} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${statusStyles[comp.status]}`}>
                    {statusLabel[comp.status]}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        ))}

      </div>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 24 }}>
      <p style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 0.8,
        textTransform: 'uppercase', color: 'var(--charcoal-oslo)',
        padding: '0 20px', marginBottom: 10,
      }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function TypeSample({ label, sample, style }: { label: string; sample: string; style?: React.CSSProperties }) {
  return (
    <div>
      <p style={{ fontSize: 9, fontWeight: 600, color: 'var(--charcoal-oslo)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 3 }}>
        {label} — Figtree
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--charcoal-base)', ...style }}>
        {sample}
      </p>
    </div>
  )
}
