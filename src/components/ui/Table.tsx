import { cn } from '@/utils/cn'
import { Spinner } from './Spinner'

interface Column<T> { key: string; header: string; cell: (row: T) => React.ReactNode; className?: string }
interface TableProps<T> { columns: Column<T>[]; data: T[]; isLoading?: boolean; emptyMessage?: string; keyExtractor: (row: T) => string | number }

export function Table<T>({ columns, data, isLoading, emptyMessage = 'No data found', keyExtractor }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-full text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>{columns.map(col => (
            <th key={col.key} className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500', col.className)}>
              {col.header}
            </th>
          ))}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr><td colSpan={columns.length} className="px-4 py-12 text-center">
              <div className="flex justify-center"><Spinner size="lg" /></div>
            </td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-slate-400">{emptyMessage}</td></tr>
          ) : data.map(row => (
            <tr key={keyExtractor(row)} className="bg-white transition-colors hover:bg-slate-50">
              {columns.map(col => (
                <td key={col.key} className={cn('px-4 py-3 text-slate-700', col.className)}>{col.cell(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
