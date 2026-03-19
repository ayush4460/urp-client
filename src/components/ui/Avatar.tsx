import { cn } from '@/utils/cn'

const colors = ['bg-blue-500','bg-purple-500','bg-green-500','bg-orange-500','bg-pink-500','bg-teal-500']
const sizes  = { sm: 'h-7 w-7 text-xs', md: 'h-9 w-9 text-sm', lg: 'h-12 w-12 text-base' }

export const Avatar = ({ name, size = 'md' }: { name: string; size?: keyof typeof sizes }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const color    = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={cn('flex shrink-0 items-center justify-center rounded-full font-semibold text-white', color, sizes[size])}>
      {initials}
    </div>
  )
}
