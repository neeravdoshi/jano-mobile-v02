import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'

export interface SocialAuthButtonProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

export function SocialAuthButton({ icon, label, onClick, className }: SocialAuthButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      fullWidth
      onClick={onClick}
      className={cn('justify-center gap-3', className)}
    >
      <span className="flex-shrink-0 flex items-center">{icon}</span>
      <span>{label}</span>
    </Button>
  )
}
