import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[var(--color-brand)] text-[var(--color-text-inverse)] hover:bg-[var(--color-brand-deep)] border-transparent',
  outline:
    'bg-transparent border-[1.5px] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-brand)] hover:bg-[var(--color-brand-subtle)]',
  ghost:
    'bg-transparent border-transparent text-[var(--color-brand)] hover:text-[var(--color-brand-deep)]',
  destructive:
    'bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:opacity-90 border-transparent',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 type-action-s',
  md: 'h-11 px-5 type-action-m',
  lg: 'h-[53px] px-6 type-action-l',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      style={{ borderRadius: 'var(--radius-12)' }}
      {...props}
    >
      {children}
    </button>
  )
}
