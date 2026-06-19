import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

/** Multi-line counterpart to Input — same sunken field, border, and focus treatment. */
export function Textarea({ hasError, rows = 3, className, ...props }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'w-full resize-none rounded-xl px-4 py-3 outline-none transition-colors duration-150 type-body-m',
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
