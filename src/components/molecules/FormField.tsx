import { cn } from '@/lib/utils'
import { Input } from '@/components/atoms/Input'

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  hint?: string
  fieldId?: string
  className?: string
}

export function FormField({ label, error, hint, fieldId, className, ...inputProps }: FormFieldProps) {
  const id = fieldId ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className="type-title-s"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </label>
      <Input id={id} hasError={!!error} {...inputProps} />
      {(error || hint) && (
        <p
          className="type-body-xs"
          style={{ color: error ? 'var(--color-error)' : 'var(--color-text-muted)' }}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}
