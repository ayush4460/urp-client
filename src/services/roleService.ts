import { apiClient } from '@/lib/axios'
import type { ApiResponse } from '@/types/api.types'
import type { UserResponse } from '@/types/user.types'
import type { RoleResponse, CreateRoleDto, AssignRoleDto, RemoveRoleDto } from '@/types/role.types'

export const roleService = {
  getAll: async (): Promise<RoleResponse[]> => {
    const { data } = await apiClient.get<ApiResponse<RoleResponse[]>>('/roles')
    return data.data
  },
  getById: async (id: number): Promise<RoleResponse> => {
    const { data } = await apiClient.get<ApiResponse<RoleResponse>>(`/roles/${id}`)
    return data.data
  },
  create: async (dto: CreateRoleDto): Promise<RoleResponse> => {
    const { data } = await apiClient.post<ApiResponse<RoleResponse>>('/roles', dto)
    return data.data
  },
  update: async (id: number, dto: CreateRoleDto): Promise<RoleResponse> => {
    const { data } = await apiClient.put<ApiResponse<RoleResponse>>(`/roles/${id}`, dto)
    return data.data
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/roles/${id}`)
  },
  assign: async (dto: AssignRoleDto): Promise<void> => {
    await apiClient.post('/roles/assign', dto)
  },
  remove: async (dto: RemoveRoleDto): Promise<void> => {
    await apiClient.delete('/roles/remove', { data: dto })
  },
  getUsersByRole: async (roleId: number): Promise<UserResponse[]> => {
    const { data } = await apiClient.get<ApiResponse<UserResponse[]>>(`/roles/${roleId}/users`)
    return data.data
  },
}
