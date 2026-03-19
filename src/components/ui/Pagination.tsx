import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

export const Pagination = ({ page, totalPages, totalCount, onPageChange }: {
  page: number; totalPages: number; totalCount: number; onPageChange: (p: number) => void
}) => {
  if (totalPages <= 1) return null
  return (
    <div className="flex flex-col items-center justify-between gap-3 pt-3 sm:flex-row">
      <p className="text-sm text-slate-500">Page {page} of {totalPages} ({totalCount} total)</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)} leftIcon={<ChevronLeft className="h-4 w-4" />}>Prev</Button>
        <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} rightIcon={<ChevronRight className="h-4 w-4" />}>Next</Button>
      </div>
    </div>
  )
}
