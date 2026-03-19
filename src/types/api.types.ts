export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errors?: string[]
}

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginationQuery {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortDescending?: boolean
}
