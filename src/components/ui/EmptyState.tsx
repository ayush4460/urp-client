import { Search } from 'lucide-react'

export const EmptyState = ({ title = 'No results', description = 'Nothing to show here.', action }: {
  title?: string; description?: string; action?: React.ReactNode
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
      <Search className="h-6 w-6 text-slate-400" />
    </div>
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 text-sm text-slate-500">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
)
