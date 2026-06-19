import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import markSrc from '@/assets/jano-mark.svg'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
import { DividerWithLabel } from '@/components/molecules/DividerWithLabel'
import { SocialAuthButton } from '@/components/molecules/SocialAuthButton'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M18.1 10.2c0-.6-.1-1.2-.2-1.8H10v3.4h4.6c-.2 1.1-.8 2-1.7 2.6v2.2h2.8c1.6-1.5 2.4-3.7 2.4-6.4z" fill="#4285F4" />
      <path d="M10 18.4c2.3 0 4.2-.8 5.6-2l-2.8-2.2c-.8.5-1.7.8-2.8.8-2.2 0-4-1.5-4.7-3.5H2.5v2.2C3.9 16.7 6.7 18.4 10 18.4z" fill="#34A853" />
      <path d="M5.3 11.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5V6.3H2.5C1.9 7.5 1.6 8.7 1.6 10s.3 2.5.9 3.7l2.8-2.2z" fill="#FBBC05" />
      <path d="M10 4.6c1.2 0 2.3.4 3.2 1.2l2.4-2.4C14.2 2.1 12.3 1.2 10 1.2 6.7 1.2 3.9 3 2.5 5.7l2.8 2.2C6 6.1 7.8 4.6 10 4.6z" fill="#EA4335" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M13.47 2c-.77 0-1.74.52-2.31 1.14-.52.55-.95 1.37-.82 2.17.88.07 1.78-.46 2.33-1.06.52-.57.88-1.38.8-2.25zM15.83 10.44c-.02-1.55.79-2.29 1.17-2.72-.69-1.01-1.74-1.58-2.73-1.61-1.16-.04-1.56.52-2.47.52-.91 0-1.49-.51-2.52-.49-1.92.03-3.85 1.59-3.85 4.62 0 1.87.73 3.85 1.63 5.12.78 1.07 1.46 1.97 2.48 1.95 1.01-.02 1.39-.62 2.54-.62 1.15 0 1.4.62 2.52.6 1.06-.02 1.77-1.02 2.5-2.12.48-.68.68-1.28.85-1.76-.02-.01-2.13-.8-2.16-3.49z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LoginPage() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  // Prototype: simulate auth — sign in jumps straight to the doctor home screen.
  const signIn = () => navigate('/dashboard')

  return (
    <div
      className="flex flex-col h-full px-6"
      style={{ background: 'var(--color-surface-card)', paddingTop: 'var(--space-64)' }}
    >
      {/* Brand mark */}
      <img
        src={markSrc}
        alt="Jano"
        style={{ height: 48, width: 'auto', alignSelf: 'flex-start' }}
      />

      {/* Hero */}
      <div className="mt-8">
        <h1 className="type-display-s" style={{ color: 'var(--color-text-primary)' }}>
          Welcome back.
        </h1>
        <p className="type-body-m mt-3" style={{ color: 'var(--color-text-muted)' }}>
          Sign in to your doctor account
        </p>
      </div>

      {/* Form group — field + CTA are one unit */}
      <div className="mt-10 flex flex-col gap-4">
        <FormField
          label="Email address"
          type="email"
          placeholder="dr.name@hospital.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Button variant="primary" size="lg" fullWidth onClick={signIn}>
          Sign in
        </Button>
      </div>

      {/* Social auth alternatives */}
      <div className="mt-8 flex flex-col gap-5">
        <DividerWithLabel />
        <div className="flex flex-col gap-3">
          <SocialAuthButton icon={<GoogleIcon />} label="Continue with Google" />
          <SocialAuthButton icon={<AppleIcon />} label="Continue with Apple" />
        </div>
      </div>

      {/* Push footer to bottom */}
      <div className="flex-1" />

      {/* Footer links */}
      <div className="flex flex-col items-center gap-2 pb-10">
        <div className="flex items-center gap-1.5">
          <Link
            to="#"
            className="type-action-m"
            style={{ color: 'var(--color-brand)' }}
          >
            Forgot password?
          </Link>
          <span className="type-body-s" style={{ color: 'var(--color-text-muted)' }}>
            ·
          </span>
          <Link
            to="#"
            className="type-action-m"
            style={{ color: 'var(--color-brand)' }}
          >
            Forgot username?
          </Link>
        </div>
        <p className="type-action-m" style={{ color: 'var(--color-text-muted)' }}>
          New to Jano?{' '}
          <Link
            to="#"
            className="type-action-m"
            style={{ color: 'var(--color-brand)' }}
          >
            Request access
          </Link>
        </p>
      </div>
    </div>
  )
}
