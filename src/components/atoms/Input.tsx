import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export function Input({ hasError, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-xl px-4 py-3.5 outline-none transition-colors duration-150 type-body-m',
        'bg-[var(--color-surface-sunken)] text-[var(--color-text-primary)]',
        'placeholder:text-[var(--color-text-muted)]',
        'border-[1.5px]',
        hasError
          ? 'border-[var(--color-error)]'
          : 'border-[var(--color-border)] focus:border-[var(--color-brand)]',
        className,
      )}
      {...props}
    />
  )
}
