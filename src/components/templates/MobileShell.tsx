interface MobileShellProps {
  children: React.ReactNode
  bottomBar?: React.ReactNode
}

/**
 * Renders only the white card shape.
 * AppLayout handles the responsive wrapper and desktop centering.
 */
export function MobileShell({ children, bottomBar }: MobileShellProps) {
  return (
    <div
      style={{
        width: 'var(--shell-width)',
        height: 'var(--shell-height)',
        borderRadius: 'var(--shell-radius)',
        background: 'var(--neutral-card)',
        boxShadow: '0 8px 40px rgba(37,35,35,0.13), 0 2px 8px rgba(37,35,35,0.07)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Dynamic Island — light grey pill */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 120,
          height: 34,
          borderRadius: 20,
          background: 'var(--neutral-warm-grey)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Screen content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* Bottom navigation slot */}
      {bottomBar}

      {/* Home indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 10px' }}>
        <div style={{ width: 120, height: 5, borderRadius: 3, background: 'var(--neutral-warm-grey)' }} />
      </div>
    </div>
  )
}
