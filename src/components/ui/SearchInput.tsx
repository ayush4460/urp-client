import { Search } from 'lucide-react'
import { cn } from '@/utils/cn'

interface Props { value: string; onChange: (v: string) => void; placeholder?: string; className?: string }

export const SearchInput = ({ value, onChange, placeholder = 'Search...', className }: Props) => (
  <div className={cn('relative', className)}>
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  </div>
)
