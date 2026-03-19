import type { PermissionResponse } from './permission.types'

export interface RoleResponse {
  id: number
  name: string
  description: string | null
  isActive: boolean
  createdAt: number            // Unix epoch seconds (UTC)
  permissions: PermissionResponse[]
}

export interface CreateRoleDto {
  name: string
  description?: string
}

export interface AssignRoleDto {
  userId: number
  roleId: number
}

export interface RemoveRoleDto {
  userId: number
  roleId: number
}
