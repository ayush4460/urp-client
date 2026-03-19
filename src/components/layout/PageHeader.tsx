import { ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string; subtitle?: string; children?: React.ReactNode
  breadcrumb?: { label: string; to?: string }[]
}

export const PageHeader = ({ title, subtitle, children, breadcrumb }: PageHeaderProps) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="mb-1 flex items-center gap-1 text-xs text-slate-500">
          {breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              <span className={cn(i === breadcrumb.length - 1 ? 'text-slate-700 font-medium' : '')}>{b.label}</span>
            </span>
          ))}
        </div>
      )}
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {children && <div className="flex items-center gap-2">{children}</div>}
  </div>
)
