import type { RoleResponse } from './role.types'

export interface UserResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  isActive: boolean
  lastLoginAt: number | null   // Unix epoch seconds (UTC) — frontend shows as IST
  createdAt: number            // Unix epoch seconds (UTC)
  updatedAt: number            // Unix epoch seconds (UTC)
  roles: RoleResponse[]
  permissions: string[]
}

export interface CreateUserDto {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  username?: string
  isActive?: boolean
  currentPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}
