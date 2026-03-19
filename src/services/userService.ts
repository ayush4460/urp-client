import { apiClient } from '@/lib/axios'
import type { ApiResponse, PaginatedResponse, PaginationQuery } from '@/types/api.types'
import type { UserResponse, CreateUserDto, UpdateUserDto } from '@/types/user.types'

export const userService = {
  getAll: async (q: PaginationQuery = {}): Promise<PaginatedResponse<UserResponse>> => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<UserResponse>>>('/users', {
      params: { page: q.page ?? 1, pageSize: q.pageSize ?? 20,
        ...(q.search && { search: q.search }),
        ...(q.sortBy && { sortBy: q.sortBy }),
        ...(q.sortDescending !== undefined && { sortDescending: q.sortDescending }) },
    })
    return data.data
  },
  getById: async (id: number): Promise<UserResponse> => {
    const { data } = await apiClient.get<ApiResponse<UserResponse>>(`/users/${id}`)
    return data.data
  },
  create: async (dto: CreateUserDto): Promise<UserResponse> => {
    const { data } = await apiClient.post<ApiResponse<UserResponse>>('/users/register', dto)
    return data.data
  },
  update: async (id: number, dto: UpdateUserDto): Promise<UserResponse> => {
    const { data } = await apiClient.put<ApiResponse<UserResponse>>(`/users/${id}`, dto)
    return data.data
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },
}
