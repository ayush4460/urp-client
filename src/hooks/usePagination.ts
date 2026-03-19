import { useState } from 'react'
import type { PaginationQuery } from '@/types/api.types'

export const usePagination = (initialPageSize = 20) => {
  const [page,     setPage]     = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [search,   setSearch]   = useState('')
  const [sortBy,   setSortBy]   = useState('createdAt')
  const [sortDesc, setSortDesc] = useState(true)

  const params: PaginationQuery = {
    page, pageSize, search: search || undefined, sortBy, sortDescending: sortDesc,
  }
  const reset = () => setPage(1)

  return { page, pageSize, search, sortBy, sortDesc, params,
           setPage, setPageSize, setSearch, setSortBy, setSortDesc, reset }
}
