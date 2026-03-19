import { cn } from '@/utils/cn'

const groupColors: Record<string, string> = {
  Users: 'bg-blue-100 text-blue-800',
  Roles: 'bg-purple-100 text-purple-800',
  Permissions: 'bg-orange-100 text-orange-800',
}

export const PermissionBadge = ({ name, group }: { name: string; group?: string }) => (
  <span className={cn(
    'inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-medium',
    group ? (groupColors[group] ?? 'bg-slate-100 text-slate-700') : 'bg-slate-100 text-slate-700'
  )}>
    {name}
  </span>
)
