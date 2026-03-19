export interface PermissionResponse {
  id: number
  name: string
  description: string | null
  group: string
  createdAt: number            // Unix epoch seconds (UTC)
}

export interface CreatePermissionDto {
  name: string
  description?: string
  group: string
}

export interface AssignPermissionDto {
  roleId: number
  permissionId: number
}
