import { apiClient } from '@/lib/axios'
import type { ApiResponse } from '@/types/api.types'
import type { PermissionResponse, CreatePermissionDto, AssignPermissionDto } from '@/types/permission.types'

export const permissionService = {
  getAll: async (group?: string): Promise<PermissionResponse[]> => {
    const { data } = await apiClient.get<ApiResponse<PermissionResponse[]>>('/permissions', {
      params: group ? { group } : undefined,
    })
    return data.data
  },
  getById: async (id: number): Promise<PermissionResponse> => {
    const { data } = await apiClient.get<ApiResponse<PermissionResponse>>(`/permissions/${id}`)
    return data.data
  },
  create: async (dto: CreatePermissionDto): Promise<PermissionResponse> => {
    const { data } = await apiClient.post<ApiResponse<PermissionResponse>>('/permissions', dto)
    return data.data
  },
  assign: async (dto: AssignPermissionDto): Promise<void> => {
    await apiClient.post('/permissions/assign', dto)
  },
  remove: async (dto: AssignPermissionDto): Promise<void> => {
    await apiClient.delete('/permissions/remove', { data: dto })
  },
  getByRole: async (roleId: number): Promise<PermissionResponse[]> => {
    const { data } = await apiClient.get<ApiResponse<PermissionResponse[]>>(`/permissions/role/${roleId}`)
    return data.data
  },
}
