import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { MobileShell } from './MobileShell'
import { BottomNavigation, type BottomNavTab } from '@/components/organisms'

const PATH_BY_TAB: Record<BottomNavTab, string> = {
  home: '/dashboard',
  patients: '/patients',
  schedule: '/schedule',
  chat: '/chat',
}

function tabFromPath(pathname: string): BottomNavTab {
  if (pathname.startsWith('/patients')) return 'patients'
  if (pathname.startsWith('/schedule')) return 'schedule'
  if (pathname.startsWith('/chat')) return 'chat'
  return 'home'
}

// The screens that ship two layouts and the link that swaps between them.
function versionToggle(pathname: string): { target: string; label: string } | null {
  if (pathname === '/patients') return { target: '/patients-v2', label: 'Version 2' }
  if (pathname === '/patients-v2') return { target: '/patients', label: 'Version 1' }

  // Chat list (WhatsApp-style V2)
  if (pathname === '/chat') return { target: '/chat-v2', label: 'Version 2' }
  if (pathname === '/chat-v2') return { target: '/chat', label: 'Version 1' }

  const chat = pathname.match(/^\/chat\/([^/]+?)(\/v2)?$/)
  if (chat) {
    const [, id, isV2] = chat
    return isV2 ? { target: `/chat/${id}`, label: 'Version 1' } : { target: `/chat/${id}/v2`, label: 'Version 2' }
  }
  return null
}

export function AppLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Version toggle (desktop affordance) — patients list + open chat thread.
  const version = versionToggle(pathname)

  // The login screen ('/') sits inside the shell but shows no bottom nav.
  const showNav = pathname !== '/'
  const nav = showNav ? (
    <BottomNavigation
      active={tabFromPath(pathname)}
      onTabChange={tab => navigate(PATH_BY_TAB[tab])}
    />
  ) : null

  return (
    <>
      {/* ── Desktop: centred phone card + DS button ── */}
      <div
        className="hidden sm:flex h-screen w-screen items-center justify-center"
        style={{ background: 'var(--neutral-app-bg)' }}
      >
        {/* Relative wrapper sizes exactly to the card so we can anchor the button */}
        <div className="relative" style={{ flexShrink: 0 }}>
          <MobileShell bottomBar={nav}>
            <div
              className="flex flex-col h-full w-full no-scrollbar"
              style={{ background: 'var(--neutral-app-bg)', overflowY: 'auto' }}
            >
              <Outlet />
            </div>
          </MobileShell>

          {/* Design System button — top-right corner of the card */}
          <Link
            to="/design-system"
            style={{
              position: 'absolute',
              top: 0,
              left: '100%',
              marginLeft: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '12px 20px',
              borderRadius: 28,
              background: 'var(--neutral-card)',
              border: '1px solid var(--neutral-stroke)',
              boxShadow: '0 2px 8px rgba(37,35,35,0.08)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'box-shadow 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--crimson-base)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(229,75,75,0.15)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--neutral-stroke)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(37,35,35,0.08)'
            }}
          >
            {/* Grid icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="1" width="7" height="7" rx="2" fill="var(--charcoal-oslo)" />
              <rect x="10" y="1" width="7" height="7" rx="2" fill="var(--charcoal-oslo)" />
              <rect x="1" y="10" width="7" height="7" rx="2" fill="var(--charcoal-oslo)" />
              <rect x="10" y="10" width="7" height="7" rx="2" fill="var(--charcoal-oslo)" />
            </svg>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--charcoal-base)',
              letterSpacing: -0.1,
            }}>
              Design System
            </span>
          </Link>

          {/* Version toggle — appears only on screens that ship two layouts */}
          {version && (
            <Link
              to={version.target}
              style={{
                position: 'absolute',
                top: 54,
                left: '100%',
                marginLeft: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '12px 20px',
                borderRadius: 28,
                background: 'var(--neutral-card)',
                border: '1px solid var(--crimson-30)',
                boxShadow: '0 2px 8px rgba(229,75,75,0.10)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'box-shadow 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--crimson-base)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(229,75,75,0.18)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--crimson-30)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(229,75,75,0.10)'
              }}
            >
              <Sparkles size={18} strokeWidth={1.5} style={{ color: 'var(--crimson-base)' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--crimson-deep)',
                letterSpacing: -0.1,
              }}>
                {version.label}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* ── Mobile: full screen ── */}
      <div
        className="sm:hidden flex flex-col h-full w-full"
        style={{ background: 'var(--neutral-app-bg)' }}
      >
        <div className="flex-1 no-scrollbar" style={{ overflowY: 'auto' }}>
          <Outlet />
        </div>
        {nav}
      </div>
    </>
  )
}
