import { apiClient } from '@/lib/axios'
import type { ApiResponse } from '@/types/api.types'
import type { LoginDto, LoginResponse } from '@/types/auth.types'
import type { CreateUserDto, UserResponse } from '@/types/user.types'

export const authService = {
  login: async (dto: LoginDto): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>('/users/login', dto)
    return data.data
  },
  register: async (dto: CreateUserDto): Promise<UserResponse> => {
    const { data } = await apiClient.post<ApiResponse<UserResponse>>('/users/register', dto)
    return data.data
  },
  getMe: async (): Promise<UserResponse> => {
    const { data } = await apiClient.get<ApiResponse<UserResponse>>('/users/me')
    return data.data
  },
}
