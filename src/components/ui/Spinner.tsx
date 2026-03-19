import { cn } from '@/utils/cn'

const sizes = { sm: 'h-4 w-4 border-2', md: 'h-6 w-6 border-2', lg: 'h-10 w-10 border-4' }

export const Spinner = ({ size = 'md', className }: { size?: keyof typeof sizes; className?: string }) => (
  <div className={cn('animate-spin rounded-full border-slate-200 border-t-blue-600', sizes[size], className)} />
)
