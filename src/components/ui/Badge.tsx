import { cn } from '@/utils/cn'

const variants = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger:  'bg-red-100 text-red-800',
  info:    'bg-blue-100 text-blue-800',
  purple:  'bg-purple-100 text-purple-800',
  orange:  'bg-orange-100 text-orange-800',
}

interface BadgeProps { variant?: keyof typeof variants; className?: string; children: React.ReactNode }

export const Badge = ({ variant = 'default', className, children }: BadgeProps) => (
  <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', variants[variant], className)}>
    {children}
  </span>
)
